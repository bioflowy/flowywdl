import { RuntimeError } from "../error.ts";
import * as Tree from "../tree.ts"
/**
 * Task command failure error
 */
export class CommandFailed extends RuntimeError {
    readonly exitStatus: number;
    readonly stderrFile: string;
    readonly stdoutFile: string;
  
    constructor(
      exitStatus: number,
      stderrFile: string,
      stdoutFile: string,
      message: string = "",
      options: Record<string, any> = {}
    ) {
      const oomHint = exitStatus === 137 ? 
        ", a possible indication that it ran out of memory" : 
        "";
      super(
        message || `task command failed with exit status ${exitStatus}${oomHint}`,
        options
      );
      this.name = 'CommandFailed';
      this.exitStatus = exitStatus;
      this.stderrFile = stderrFile;
      this.stdoutFile = stdoutFile;
    }
  }
  
  /**
   * Workflow/task intentional termination error
   */
  export class Terminated extends RuntimeError {
    readonly quiet: boolean;
  
    constructor(
      { quiet = false, ...options }: { quiet?: boolean } & Record<string, any> = {}
    ) {
      super("",options);
      this.name = 'Terminated';
      this.quiet = quiet;
    //   _statusbar.abort();
    }
  }
  
  /**
   * Task interruption error
   */
  export class Interrupted extends RuntimeError {
    constructor(message: string = "", options: Record<string, any> = {}) {
      super(message, options);
      this.name = 'Interrupted';
    }
  }
  
  /**
   * Task output gathering error
   */
  export class OutputError extends RuntimeError {
    constructor(message: string = "", options: Record<string, any> = {}) {
      super(message, options);
      this.name = 'OutputError';
    }
  }
  
  /**
   * URI input file download failure
   */
  export class DownloadFailed extends RuntimeError {
    readonly uri: string;
  
    constructor(uri: string, message: string = "") {
      super(message || `unable to download ${uri}`);
      this.name = 'DownloadFailed';
      this.uri = uri;
    //   _statusbar.abort();
    }
  }
  
  /**
   * Task or workflow run failure
   */
  export class RunFailed extends RuntimeError {
    readonly exe: Tree.Task | Tree.Workflow;
    readonly runId: string;
    readonly runDir: string;
  
    constructor(
      exe: Tree.Task | Tree.Workflow,
      runId: string, 
      runDir: string,
      options: Record<string, any> = {}
    ) {
      const exeType = 'isTask' in exe ? 'task' : 'workflow';
      super(
        `${exeType} ${exe.name} (${exe.pos.uri} Ln ${exe.pos.line} Col ${exe.pos.column}) failed`,
        options
      );
      this.name = 'RunFailed';
      this.exe = exe;
      this.runId = runId;
      this.runDir = runDir;
    //   _statusbar.abort();
    }
  }
  