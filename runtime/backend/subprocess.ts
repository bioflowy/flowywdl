import { getSystemInfo,path } from "../../runtimeutils.ts";
import type { Logger } from "../logger.ts";
import { Loader } from "../config.ts";
import { TaskContainer } from "../task_container.ts";
import { DownloadFailed } from "../error.ts";

/**
 * CLI subprocess based task container implementations のための抽象基底クラス
 */
export abstract class SubprocessBase extends TaskContainer {
    private static resourceLimits: { cpu: number; mem_bytes: number } | null = null;
    private static bindInputFiles = true;
    private static readonly pulledImages = new Set<string>();
  
    protected abstract readonly cliName: string;
  
    protected get cliExe(): string[] {
      return [this.cliName];
    }
  
    /**
     * ホストリソースの制限を検出
     */
    override detectResourceLimits(
      cfg: Loader,
      logger: Logger
    ): { cpu: number; mem_bytes: number } {
      if (!SubprocessBase.resourceLimits) {
        const sysinfo = getSystemInfo()
        SubprocessBase.resourceLimits = {
          cpu: sysinfo.cpuCount,
          mem_bytes: sysinfo.totalMemory,
        };
        
        logger.info({
          msg: "detected host resources",
          cpu: SubprocessBase.resourceLimits.cpu,
          mem_bytes: SubprocessBase.resourceLimits.mem_bytes,
        });
        
        // SubprocessScheduler.globalInit(this.resourceLimits);
      }
      return SubprocessBase.resourceLimits;
    }
  
    /**
     * サブプロセスを実行
     */
    protected async _run(
      logger: Logger,
      terminating: () => boolean,
      command: string
    ): Promise<number> {
      // const cleanup = new ExitStack();
      
      try {
        // CPU とメモリの利用可能性を待機
        const cpuReservation = this.runtimeValues.cpu ?? 0;
        const memoryReservation = this.runtimeValues.memory_reservation ?? 0;
        
        // const scheduler = new SubprocessScheduler(
        //   cpuReservation,
        //   memoryReservation
        // );
        
        // cleanup.enter(() => scheduler.release());
  
        logger.info({
          msg: "provisioned",
          // seconds_waited: scheduler.delay,
          cpu: cpuReservation,
          mem_bytes: memoryReservation,
        });
  
        // 必要に応じてイメージをプル
        const image = await this._pull(logger);
  
        // ロガーの準備
        const cliLogFilename = path.join(
          this.hostDir,
          `${this.cliName}.log.txt`
        );
        const cliLogger = logger // .child({ name: this.cliName });
        
        // prepare command & environment
        // we set the environment variables at the beginning of the command script because:
        // 1) --env is subject to command line length limitations
        // 2) --env-file isn't implemented consistently wrt quoting, escaping, etc.
        let command_str = ""
        for(const [k,v] of Object.entries(this.runtimeValues.env||{})){
          command_str += `export ${k}=${v}\n`
        }
        command_str += command
        await Deno.writeTextFile(
          path.join(this.hostDir, "command"),
          command_str
        );
        
  
        // サブプロセスの開始
        const invs = await this._runInvocation(logger, image)
        const invocation = [
          ...invs,
          "/bin/sh",
          "-c",
          this.cfg.get("task_runtime", "command_shell")
          + " ../command >> ../stdout.txt 2>> ../stderr.txt",
        ];
        logger.info("command = " + invocation.join(" "))
        const cmd = new Deno.Command(invocation[0],{args:invocation.slice(1)});
        const process = cmd.spawn()
        logger.info({
          msg: `${this.cliName} run`,
          pid: process.pid,
          log: cliLogFilename,
        });
        const output = await process.output()
        // 完了を待機
        const exitCode = output.code;
        logger.info("exitCode=" + exitCode)
        // if (terminating()) {
        //   throw new Terminated();
        // }
  
        return exitCode;
      } finally {
        // await cleanup.release();
      }
    }
  
    /**
     * プル用のコマンド生成
     */
    protected _pullInvocation(
      logger: Logger
    ): Promise<[string, string[]]> {
      const image = this.runtimeValues.docker ?? 
        this.cfg.getDict("task_runtime","defaults").docker as string;
      return Promise.resolve([image, [...this.cliExe, "pull", image]]);
    }
  
    /**
     * 実行用のコマンド生成
     */
    protected abstract _runInvocation(
      logger: Logger,
      image: string
    ): Promise<string[]>;
  
    /**
     * マウントポイントの準備
     */
    protected prepareMounts(): [string, string, boolean][] {
      const mounts: [string, string, boolean][] = [];
  
      // stdout, stderr, 作業ディレクトリを読み書き可能でマウント
      this.touchMountPoint(this.hostStdoutTxt());
      mounts.push([
        path.join(this.containerDir, "stdout.txt"),
        this.hostStdoutTxt(),
        true
      ]);
  
      this.touchMountPoint(this.hostStderrTxt());
      mounts.push([
        path.join(this.containerDir, "stderr.txt"),
        this.hostStderrTxt(),
        true
      ]);
  
      mounts.push([
        path.join(this.containerDir, "work"),
        this.hostWorkDir(),
        true
      ]);
  
      // コマンドを読み取り専用でマウント
      mounts.push([
        path.join(this.containerDir, "command"),
        path.join(this.hostDir, "command"),
        false
      ]);
  
      // 入力ファイルとディレクトリを読み取り専用でマウント
      if (SubprocessBase.bindInputFiles) {
        for (const [hostPath, containerPath] of Object.entries(this.inputPathMap)) {
          const isDir = hostPath.endsWith("/");
          const hostMountPoint = path.join(
            this.hostDir,
            path.relative(
              this.containerDir,
              containerPath.replace(/\/$/, "")
            )
          );
  
          if (!Deno.statSync(hostMountPoint).isFile) {
            this.touchMountPoint(
              hostMountPoint + (isDir ? "/" : "")
            );
          }
  
          mounts.push([
            containerPath.replace(/\/$/, ""),
            hostPath.replace(/\/$/, ""),
            false
          ]);
        }
      }
  
      return mounts;
    }
  
    /**
     * イメージをプル
     */
    async _pull(
      logger: Logger,
    ): Promise<string> {
      const [image, invocation] = await this._pullInvocation(logger);
  
      // グローバルロックの下でイメージを一度だけダウンロード
      // await SubprocessBase.pulledImagesLock.acquire();
      try {
        if (SubprocessBase.pulledImages.has(image)) {
          logger.info({
            msg: `${this.cliName} image already pulled`,
            image
          });
          return image;
        }
      } finally {
        // SubprocessBase.pulledImagesLock.release();
      }
  
      const t0 = Date.now();
      //await SubprocessBase.pullLock.acquire();
      try {
        const t1 = Date.now();
  
        //await SubprocessBase.pulledImagesLock.acquire();
        try {
          if (SubprocessBase.pulledImages.has(image)) {
            logger.info({
              msg: `${this.cliName} image already pulled`,
              image
            });
            return image;
          }
        } finally {
          //SubprocessBase.pulledImagesLock.release();
        }
  
        if (!invocation.length) {
          return image;
        }
  
        logger.info({
          msg: `begin ${this.cliName} pull`,
          command: invocation.join(" ")
        });
  
        try {
          const cmd = new Deno.Command(invocation[0],{args:invocation.slice(1)});
          const output = await cmd.output()
          logger.info(`podman pull result ${output.code}`,)
        } catch (error) {
          logger.error({
            msg: `${this.cliName} pull failed`,
            error: error
          });
          throw new DownloadFailed(image);
        }
  
        // await SubprocessBase.pulledImagesLock.acquire();
        try {
          SubprocessBase.pulledImages.add(image);
        } finally {
          // SubprocessBase.pulledImagesLock.release();
        }
  
        logger.info({
          msg: `${this.cliName} pull`,
          image,
          seconds_waited: Math.floor((t1 - t0) / 1000),
          seconds_pulling: Math.floor((Date.now() - t1) / 1000)
        });
  
        return image;
  
      } finally {
        // SubprocessBase.pullLock.release();
      }
    }
  
    // 他の必要なメソッド実装は省略...
  }