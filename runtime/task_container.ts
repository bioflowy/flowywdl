import { Logger } from './logger.ts';
import * as WDLError from '../error.ts';
import * as Value from '../value.ts';
import * as Type from '../type.ts';
import * as config from './config.ts'
import { existsSync, mkdirSync, copyFileSync, copyDir,mkdirsSync,path, pathReallyWithin, rmtreeSync } from "../runtimeutils.ts";
import { CommandFailed, OutputError } from "./error.ts";
import { parseByteSize } from "../utils.ts";
import { statSync } from "../runtimeutils.ts";
import { unlink } from "../runtimeutils.ts";

interface RuntimeValues {
  inlineDockerfile?: string;
  docker?: string;
  docker_network?: string;
  privileged?: boolean;
  cpu?: number;
  memory_reservation?: number;
  memory_limit?: number;
  maxRetries?: number;
  preemptible?: number;
  returnCodes?: number | number[] | string;
  gpu?: boolean;
  env?: { [key: string]: string };
  [key: string]: any;
}
/**
 * Base class for task containers, subclassed by runtime-specific backends (e.g. Docker).
 */
export abstract class TaskContainer {
  // Class fields
  runId: string;
  /**
   * The run directory (on the host)
   */
  hostDir: string;
  /**
   * The scratch directory inside the container. The task command's working directory will be
    ``{container_dir}/work/``
   */
  containerDir: string;
  /**
   *  A mapping of host input file/directory paths to in-container mounted paths, maintained by
    ``add_paths``. Directory paths are distinguished by trailing slashes on both keys and values;
    the slashes often should be trimmed for use elsewhere.
   */
  inputPathMap: { [key: string]: string };
  /**
   * Inverse of ``input_path_map`` (also maintained by ``add_paths``)
   */
  inputPathMapRev: { [key: string]: string };
  /**
   * Counter for number of retries; starts at 1 on the first attempt. On subsequent attempts, the
    names (on the host) of the working directory, stdout.txt, and stderr.txt may incorporate the
    count, to ensure their uniqueness.
   */
  tryCounter: number;
  /**
   * Evaluted task runtime{} section, to be populated by process_runtime(). Typically the
    TaskContainer backend needs to honor cpu, memory_limit, memory_reservation, docker, env.
    Retry logic (maxRetries, preemptible) is handled externally.
   */
  runtimeValues: RuntimeValues;
  stderrCallback: ((line: string) => void) | null;
  failureInfo: any | null;
  private _running: boolean;
  protected cfg: config.Loader;

  constructor(cfg: config.Loader, runId: string, hostDir: string) {
    this.cfg = cfg;
    this.runId = runId;
    this.hostDir = hostDir;
    this.containerDir = "/mnt/miniwdl_task_container";
    this.inputPathMap = {};
    this.inputPathMapRev = {};
    this.stderrCallback = null;
    this.tryCounter = 1;
    this._running = false;
    this.runtimeValues = {};
    this.failureInfo = null;
    mkdirSync(this.hostWorkDir(), { recursive: true });
  }

  // Class methods
  static globalInit(cfg: config.Loader, logger: Logger): void {
    // Perform any necessary one-time initialization of the underlying container backend. To be
    // invoked once per process prior to any instantiation of the class.
    throw new Error("Not implemented");
  }

  detectResourceLimits(cfg: config.Loader, logger: Logger): { cpu: number; mem_bytes: number } {
    // Detect the maximum resources ("cpu" and "mem_bytes") that the underlying container backend
    // will be able to provision for any one task.

    // If determining this is at all costly, then backend should memoize (thread-safely and
    // perhaps front-loaded in global_init).
    throw new Error("Not implemented");
  }

  // Instance methods
    /**
        Use before running the container to add a list of host paths to mount inside the container
        as inputs. Directory paths should have a trailing slash. The host-to-container path mapping
        is maintained in ``input_path_map``.

        Although ``add_paths`` can be used multiple times, paths should be added together where
        possible, as this allows heuristics for dealing with any name collisions among them.
  */
  addPaths(hostPaths: string[]): void {
    if (this._running) {
      throw new Error("Cannot add paths while container is running");
    }

    // partition the files by host directory
    const hostPathsByDir: { [key: string]: Set<string> } = {};
    for (const hostPath of hostPaths) {
      const hostPathStrip = hostPath.replace(/\/$/, '');
      if (!(hostPath in this.inputPathMap) && !(hostPathStrip in this.inputPathMap)) {
        if (!existsSync(hostPathStrip)) {
          throw new WDLError.InputError("input path not found: " + hostPath);
        }
        const dirName = path.dirname(hostPathStrip);
        if (!hostPathsByDir[dirName]) {
          hostPathsByDir[dirName] = new Set();
        }
        hostPathsByDir[dirName].add(hostPath);
      }
    }

    // Process each directory partition
    for (const paths of Object.values(hostPathsByDir)) {
      const based = path.join(this.containerDir, "work/_miniwdl_inputs");
      let subd = "0";
      
      // Check for collisions
      for (const hostPath of paths) {
        let containerPath = path.join(based, subd, path.basename(hostPath.replace(/\/$/, '')));
        if (hostPath.endsWith("/")) {
          containerPath += "/";
        }
        if (containerPath in this.inputPathMapRev) {
          if (subd === "0") {
            subd = String(Object.keys(this.inputPathMap).length + 1);
          }
        }
      }

      // Add mappings
      for (const hostPath of paths) {
        let containerPath = path.join(based, subd, path.basename(hostPath.replace(/\/$/, '')));
        if (hostPath.endsWith("/")) {
          containerPath += "/";
        }
        if (containerPath in this.inputPathMapRev) {
          throw new Error("Unexpected path collision");
        }
        this.inputPathMap[hostPath] = containerPath;
        this.inputPathMapRev[containerPath] = hostPath;
      }
    }
  }
  /** 
    After add_paths has been used as needed, copy the input files from their original
    locations to the appropriate subdirectories of the container working directory. This may
    not be necessary e.g. if the container backend supports bind-mounting the input
    files from their original host paths.
    # called once per task run (attempt)
    */
    copyInputFiles(logger: Logger): void {
    for (const [hostPath, containerPath] of Object.entries(this.inputPathMap)) {
      if (!containerPath.startsWith(this.containerDir)) {
        throw new Error("Invalid container path");
      }
      const hostCopyPath = path.join(
        this.hostDir,
        path.relative(this.containerDir, containerPath.replace(/\/$/, ''))
      );

      logger.info({
        msg: "copy host input file",
        input: hostPath,
        copy: hostCopyPath
      });

      mkdirSync(path.dirname(hostCopyPath), { recursive: true });
      if (hostPath.endsWith("/")) {
        // Directory copy
        copyDir(hostPath.replace(/\/$/, ''), hostCopyPath);
      } else {
        // File copy
        copyFileSync(hostPath, hostCopyPath);
      }
    }
  }
  reset(_: Logger){
  /**
  After a container/command failure, reset the working directory state so that
  copy_input_files() and run() can be retried.
   */
  this.tryCounter += 1
  mkdirsSync(this.hostWorkDir())
  }
  /**
   * Implementation helper: touch a File or Directory mount point that might not already exist
    *　in the host directory. This ensures ownership by the invoking user:group.
   * @param host_path 
   */
  touchMountPoint( host_path: string){
  // assert host_path.startswith(self.host_dir + "/")
  if(host_path.endsWith("/")){  // Directory mount point
      mkdirSync(host_path)
    }else{ // File mount point
      mkdirsSync(path.dirname(host_path))
      const file = Deno.createSync(host_path);
      file.close()
  }
}
  /**
    * Given the evaluated WDL expressions from the task runtime{} section, populate
    * self.runtime_values with validated/postprocessed values that will be needed to configure
    * the container properly.

    * Subclasses may override this to process custom runtime entries (before or after invoking
    * this base version).
   * @param logger 
   * @param runtimeEval 
   */
  processRuntime(logger: Logger, runtimeEval: { [key: string]: Value.Base }): void {
    const ans: RuntimeValues = this.runtimeValues;

    // Process docker/container settings
    if ("inlineDockerfile" in runtimeEval) {
        const dockerValue = runtimeEval["inlineDockerfile"] as Value.Base;
        let dockerfile:Value.WDLArray;
      if (dockerValue instanceof Value.WDLArray) {
        dockerfile = dockerValue;
      }else{
        dockerfile = new Value.WDLArray(dockerValue.type, [dockerValue]);
      }
      ans.inlineDockerfile = dockerfile.value
        .map(elt => elt.coerce(new Type.String()).value)
        .join("\n");
    } else if ("docker" in runtimeEval || "container" in runtimeEval) {
      let dockerValue = runtimeEval["container" in runtimeEval ? "container" : "docker"];
      if (dockerValue instanceof Value.WDLArray && dockerValue.value.length) {
        dockerValue = dockerValue.value[0];
      }
      const v = dockerValue.coerce(new Type.String())
      ans.docker = v.value as string;
    }

    // Process other runtime values
    if ("docker_network" in runtimeEval) {
      ans.docker_network = runtimeEval.docker_network.coerce(new Type.String()).value as string;
    }

    // Handle privileged mode
    const privileged = runtimeEval.privileged;
    if (privileged instanceof Value.Boolean && privileged.value === true) {
      if (this.cfg.getBoolean("task_runtime","allow_privileged")) {
        ans.privileged = true;
      } else {
        logger.warn(
          "runtime.privileged ignored; to enable, set configuration [task_runtime] allow_privileged = true (security+portability warning)"
        );
      }
    }

      // Process resource limits
  const hostLimits = this.detectResourceLimits(this.cfg, logger);
  
  // Handle CPU limits
  if ("cpu" in runtimeEval) {
    const cpuValue = runtimeEval["cpu"].coerce(new Type.Int()).value as number;
    let cpuMax = this.cfg.getInt("task_runtime","cpu_max");
    if (cpuMax === 0) {
      cpuMax = hostLimits["cpu"];
    }
    const cpu = Math.max(1, cpuValue <= cpuMax || cpuMax < 0 ? cpuValue : cpuMax);
    if (cpu !== cpuValue) {
      logger.warn({
        msg: "runtime.cpu adjusted to host limit",
        original: cpuValue,
        adjusted: cpu
      });
    }
    ans["cpu"] = cpu;
  }

  // Handle memory limits
  if ("memory" in runtimeEval) {
    const memoryStr = runtimeEval["memory"].coerce(new Type.String()).value as string;
    let memoryBytes: number;
    try {
      memoryBytes = parseByteSize(memoryStr);
    } catch (error) {
      throw new WDLError.RuntimeError("invalid setting of runtime.memory, " + memoryStr);
    }

    const memoryMaxStr = this.cfg.get("task_runtime","memory_max").trim();
    let memoryMax = memoryMaxStr === "-1" ? -1 : parseByteSize(memoryMaxStr);
    if (memoryMax === 0) {
      memoryMax = hostLimits["mem_bytes"];
    }
    if (memoryMax > 0 && memoryBytes > memoryMax) {
      logger.warn({
        msg: "runtime.memory adjusted to host limit",
        original: memoryBytes,
        adjusted: memoryMax
      });
      memoryBytes = memoryMax;
    }
    ans["memory_reservation"] = memoryBytes;

    const memoryLimitMultiplier = this.cfg.getFloat("task_runtime","memory_limit_multiplier");
    if (memoryLimitMultiplier > 0.0) {
      ans["memory_limit"] = Math.floor(memoryLimitMultiplier * memoryBytes);
    }
  }

  // Handle retry and preemption settings
  if ("maxRetries" in runtimeEval) {
    ans["maxRetries"] = Math.max(0, runtimeEval["maxRetries"].coerce(new Type.Int()).value as number);
  }
  if ("preemptible" in runtimeEval) {
    ans["preemptible"] = Math.max(0, runtimeEval["preemptible"].coerce(new Type.Int()).value as number);
  }

  // Handle return codes
  if ("returnCodes" in runtimeEval) {
    const rcv = runtimeEval["returnCodes"];
    if (rcv instanceof Value.String && rcv.value === "*") {
      ans["returnCodes"] = "*";
    } else if (rcv instanceof Value.Int) {
      ans["returnCodes"] = rcv.value;
    } else if (rcv instanceof Value.WDLArray) {
      try {
        ans["returnCodes"] = rcv.value.map(v => v.coerce(new Type.Int()).value) as number[];
      } catch {
        // Handle conversion failure
        if (!("returnCodes" in ans)) {
          throw new WDLError.RuntimeError("invalid setting of runtime.returnCodes");
        }
      }
    }
    if (!("returnCodes" in ans)) {
      throw new WDLError.RuntimeError("invalid setting of runtime.returnCodes");
    }
  }

  // Handle GPU setting
  if ("gpu" in runtimeEval) {
    if (!(runtimeEval["gpu"] instanceof Value.Boolean)) {
      throw new WDLError.RuntimeError("invalid setting of runtime.gpu");
    }
    ans.gpu = runtimeEval["gpu"].value as boolean;
  }
  }

  public hostPath(container_path: string, inputs_only: boolean = false): string | null {
    /**
     * Map the in-container path of an output File/Directory to a host path under ``host_dir``.
     * Directory paths should be given a trailing "/". Return None if the path does not exist.
     *
     * SECURITY: except for inputs, this method must only return host paths under ``host_dir``
     * and prevent any reference to other host files (e.g. /etc/passwd), including via symlinks.
     */
    if (path.isAbsolute(container_path)) {
        // handle output of std{out,err}.txt
        if (container_path === path.join(this.containerDir, "stdout.txt")) {
            return this.hostStdoutTxt();
        }
        if (container_path === path.join(this.containerDir, "stderr.txt")) {
            return this.hostStderrTxt();
        }
        // handle output of an input File or Directory
        if (container_path in this.inputPathMapRev) {
            return this.inputPathMapRev[container_path];
        }
        // handle output of a File or subDirectory found within an input Directory
        const container_path_components = container_path.replace(/^\/+|\/+$/g, '').split('/');
        for (let i = container_path_components.length - 1; i > 5; i--) {
            // 5 == len(['mnt', 'miniwdl_task_container', 'work', '_miniwdl_inputs', '0'])
            const container_path_prefix = '/' + container_path_components.slice(0, i).join('/') + '/';
            if (container_path_prefix in this.inputPathMapRev) {
                let ans = this.inputPathMapRev[container_path_prefix];
                ans += container_path_components.slice(i).join('/');
                if (container_path.endsWith('/')) {
                    ans += '/';
                }
                if (!pathReallyWithin(ans, this.inputPathMapRev[container_path_prefix])) {
                    throw new Error('Path verification failed');
                }
                return ans;
            }
        }
        if (inputs_only) {
            throw new WDLError.InputError(
                "task inputs attempted to use a non-input or non-existent path " +
                container_path
            );
        }
        // relativize the path to the provisioned working directory
        let container_relpath = path.relative(
            path.join(this.containerDir, "work"),
            container_path
        );
        if (container_path.endsWith('/') && !container_relpath.endsWith('/')) {
            container_relpath += '/';
        }
        if (container_relpath.startsWith('../')) {
            // see issue #214
            throw new OutputError(
                "task outputs attempted to use a path outside its working directory: " +
                container_path
            );
        }
        container_path = container_relpath;
    }

    let ans = path.join(this.hostWorkDir(), container_path);
    if (container_path.endsWith('/') && !ans.endsWith('/')) {
        ans += '/';
    }

    try {
        const stats = statSync(ans);
        if (!((container_path.endsWith('/') && stats.isDirectory) ||
            (!container_path.endsWith('/') && stats.isFile))) {
            return null;
        }
    } catch {
        return null;
    }

    if (!pathReallyWithin(ans, this.hostWorkDir())) {
        // fail-safe guard against some weird symlink to host file
        throw new OutputError(
            "task outputs attempted to use a path outside its working directory: " +
            container_path
        );
    }

    if (ans.endsWith('/') &&
        this.inputPathMap &&
        (pathReallyWithin(this.hostWorkDir(), ans.slice(0, -1)) ||
         pathReallyWithin(
             ans.slice(0, -1),
             path.join(this.hostWorkDir(), "_miniwdl_inputs")
         ))
    ) {
        // prevent output of an input mount point
        throw new OutputError("unusable output directory: " + container_path);
    }

    return ans;
}


  async run(logger: Logger, command: string): Promise<void> {
    if (!command.trim()) {
      return;
    }

    if (!this._running) {
      const preamble = this.cfg.get("task_runtime","command_preamble");
      if (preamble.trim()) {
        command = preamble + "\n" + command;
      }

      // const terminating = new TerminationSignalFlag(logger);
      // if (terminating.isSet()) {
      //   throw new Terminated({ quiet: true });
      // }

      this._running = true;
      try {
        const exitCode = await this._run(logger, () => false, command);
        if (!this.successExitCode(exitCode)) {
          throw new CommandFailed(
            exitCode,
            this.hostStderrTxt(),
            this.hostStdoutTxt(),
            this.failureInfo
          );
      }
      } finally {
        this._running = false;
      }
    }
  }

  protected abstract _run(
    logger: Logger,
    terminating: () => boolean,
    command: string
  ): Promise<number>;

  protected successExitCode(exitCode: number): boolean {
    if (!("returnCodes" in this.runtimeValues)) {
      return exitCode === 0;
    }
    const rcv = this.runtimeValues.returnCodes;
    if (typeof rcv === "string" && rcv === "*") {
      return true;
    }
    return Array.isArray(rcv) ? rcv.includes(exitCode) : rcv === exitCode;
  }
  delete_work(logger: Logger, delete_streams: boolean = false){
  /**
  After the container exits, delete all filesystem traces of it except for task.log. That
  includes successful output files!
  delete_streams: if True, delete stdout.txt and stderr.txt as well
 */
  const to_delete = [this.hostWorkDir(), path.join(this.hostDir, "write_")]
  to_delete.push(path.join(this.hostDir, "command"))
  if(delete_streams){
      to_delete.push(this.hostStdoutTxt())
      to_delete.push(this.hostStderrTxt())
      to_delete.push(this.hostStderrTxt() + ".offset")
  }
  const deleted = []
  for(const p of to_delete){
    const stat = statSync(p)
      if(stat.isDirectory){
          rmtreeSync(p)
          deleted.push(p)
      }else if(stat.isFile){
          unlink(p)
          deleted.push(p)
      }
    if(deleted)
      logger.info("deleted task work artifacts", deleted)
    }
  }
  // Helper methods
  hostWorkDir(): string {
    return path.join(this.hostDir, `work${this.tryCounter > 1 ? this.tryCounter : ''}`);
  }

  protected hostStdoutTxt(): string {
    return path.join(this.hostDir, `stdout${this.tryCounter > 1 ? this.tryCounter : ''}.txt`);
  }

  protected hostStderrTxt(): string {
    return path.join(this.hostDir, `stderr${this.tryCounter > 1 ? this.tryCounter : ''}.txt`);
  }

}

