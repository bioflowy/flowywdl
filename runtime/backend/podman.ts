// NOTE: this file is excluded from coverage analysis since alternate container backends may not be
//       available in the CI environment. To test locally: prove -v tests/podman.t

import { spawn } from 'node:child_process';
import { Logger } from '../logger.ts';
import { Loader } from '../config.ts';
import { SubprocessBase } from "./subprocess.ts";
import { getgid, getuid } from "../../runtimeutils.ts";
import { InputError, RuntimeError } from "../../error.ts";

interface Mount {
  containerPath: string;
  hostPath: string;
  writable: boolean;
}

interface RuntimeValues {
  cpu?: number;
  memory_limit?: number;
  privileged?: boolean;
}

export class PodmanContainer extends SubprocessBase {

  /**
   * podman task runtime based on cli_subprocess.SubprocessBase
   */
  static override async globalInit(cfg: Loader, logger: Logger): Promise<void> {
    const podmanVersionCmd = cfg.getList("podman", "exe");
    podmanVersionCmd.push("--version");

    try {
      const podmanVersion = await new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
        const process = spawn(podmanVersionCmd[0], podmanVersionCmd.slice(1), {
          stdio: ['pipe', 'pipe', 'pipe']
        });

        let stdout = '';
        let stderr = '';

        process.stdout.on('data', (data) => {
          stdout += data.toString();
        });

        process.stderr.on('data', (data) => {
          stderr += data.toString();
        });

        process.on('close', (code) => {
          if (code === 0) {
            resolve({ stdout, stderr });
          } else {
            reject(new Error(`Process exited with code ${code}`));
          }
        });
      });

      logger.info(
          "Podman runtime initialized (BETA)",
          { podman_version: podmanVersion.stdout.trim() }
      );

    } catch (error) {
      logger.error(
        podmanVersionCmd.join(" "),
        { stderr: (error as Error).message.trim().split("\n") }
      );
      
      let msg = `Unable to check \`${podmanVersionCmd.join(" ")}\`; verify Podman installation`;
      if (podmanVersionCmd[0] === "sudo") {
        msg += " with no-password sudo";
      }
      throw new RuntimeError(msg);
    }
  }

  get cliName(): string {
    return "podman";
  }

  override get cliExe(): string[] {
    return this.cfg.getList("podman", "exe");
  }

  protected override async _pullInvocation(logger: Logger): Promise<[string, string[]]> {
    const [image, invocation] = await super._pullInvocation(logger);
    if (invocation[0] === "sudo") {
      await sudoCanary();
    }
    return [image, invocation];
  }
  protected async _runInvocation(logger: Logger, image: string): Promise<string[]> {
    /**
     * Formulate `podman run` command-line invocation
     */
    const ans: string[] = [
      ...this.cliExe,
      "run",
      "--rm",
      "--workdir",
      `${this.containerDir}/work`,
    ];

    if (ans[0] === "sudo") {
      await sudoCanary();
    }

    const cpu = this.runtimeValues.cpu ?? 0;
    if (cpu > 0) {
      ans.push("--cpus", cpu.toString());
    }

    const memoryLimit = this.runtimeValues.memory_limit ?? 0;
    if (memoryLimit > 0) {
      ans.push("--memory", memoryLimit.toString());
    }

    if (this.cfg.getBoolean("task_runtime", "as_user")) {
      if (getuid() === 0) {
        logger.warn(
          "container command will run explicitly as root, since you are root and set --as-me"
        );
      }
      ans.push("--user", `${getuid()}:${getgid()}`);
    }

    if (this.runtimeValues.privileged === true) {
      logger.warn("runtime.privileged enabled (security & portability warning)");
      ans.push("--privileged");
    }

    const mounts = this.prepareMounts();
    logger.info(
        "podman invocation",
        {
          args: ans.concat([image]).map(s => this.shellQuote(s)).join(" "),
          binds: mounts.length
        }
      )

    for (const [ containerPath, hostPath, writable ] of mounts) {
      if (containerPath.includes(":") || hostPath.includes(":")) {
        throw new InputError("Podman input filenames cannot contain ':'");
      }
      ans.push("-v");
      let bindArg = `${hostPath}:${containerPath}`;
      if (!writable) {
        bindArg += ":ro";
      }
      ans.push(bindArg);
    }
    ans.push(image);

    return ans;
  }

  private async _chown(logger: Logger): Promise<void> {
    if (
      !this.cfg.getBoolean("file_io", "chown") ||
      this.cfg.getBoolean("task_runtime", "as_user") ||
      (getuid() === 0 && getgid() === 0)
    ) {
      return;
    }

    const paste = this.shellQuote(
      `${this.containerDir}/work${this.tryCounter > 1 ? this.tryCounter : ''}`
    );

    const script = `
      (find ${paste} -type d -print0 && find ${paste} -type f -print0 \
        && find ${paste} -type l -print0) \
        | xargs -0 -P 10 chown -Ph ${getuid()}:${getgid()}
    `.trim();

    try {
      await new Promise<void>((resolve, reject) => {
        const process = spawn(
          this.cliExe[0],
          [
            ...this.cliExe.slice(1),
            "run",
            "--rm",
            "-v",
            this.shellQuote(`${this.hostDir}:${this.containerDir}`),
            "alpine:3",
            "/bin/ash",
            "-eo",
            "pipefail",
            "-c",
            script
          ],
          { stdio: ['pipe', 'pipe', 'pipe'] }
        );

        let stderr = '';
        process.stderr.on('data', (data) => {
          stderr += data.toString();
        });

        process.on('close', (code) => {
          if (code === 0) {
            resolve();
          } else {
            reject(new Error(stderr));
          }
        });
      });

    } catch (error) {
      logger.error(
          "post-task chown failed; try setting [file_io] chown = false",
          { error: (error as Error).message.trim().split("\n") }
        )
    }
  }

  private shellQuote(str: string): string {
    // Simple shell quote implementation - for more complex cases consider using a library
    if (!str) return "''";
    if (!/[^A-Za-z0-9_\/:=-]/.test(str)) return str;
    return `'${str.replace(/'/g, "'\\''")}'`;
  }
}

async function sudoCanary(): Promise<void> {
  try {
    await new Promise<void>((resolve, reject) => {
      const process = spawn("sudo", ["-n", "id"], {
        stdio: ['pipe', 'pipe', 'pipe']
      });

      process.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Process exited with code ${code}`));
        }
      });
    });
  } catch (error) {
    throw new RuntimeError(
      "no-password sudo expired (required for Podman)" +
      "; see miniwdl/podman documentation for workarounds"
    );
  }
}