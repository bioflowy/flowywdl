import * as denoPath from "https://deno.land/std/path/mod.ts";
import { walk } from "https://deno.land/std/fs/mod.ts";
import { lstatSync } from "node:fs";
import * as os from "node:os";

export function existsSync(path: string): boolean {
    try {
        Deno.statSync(path);
        return true;
    } catch {
        return false;
    }
}
export const realPathSync = (path:string)=>{
  try{
    return Deno.realPathSync(path);
  }catch{
    return path
  }
}
export const statSync = Deno.statSync;
export const lstat = Deno.lstat
export const symlink = Deno.symlink
export const unlink = Deno.remove
/**
 * Recursively removes a directory and all its contents.
 * Similar to Python's shutil.rmtree.
 * 
 * @param path Path to remove
 * @param options Configuration options
 * @returns Promise that resolves when deletion is complete
 */
export async function rmtree(
  path: string, 
  options: {
      ignoreErrors?: boolean;
      onerror?: (error: unknown) => void;
  } = {}
): Promise<void> {
  const { ignoreErrors = false, onerror } = options;

  try {
      const fileInfo = await Deno.stat(path);
      if (!fileInfo.isDirectory) {
          await Deno.remove(path);
          return;
      }

      for await (const entry of Deno.readDir(path)) {
          const entryPath = `${path}/${entry.name}`;
          if (entry.isDirectory) {
              await rmtree(entryPath, options);
          } else {
              try {
                  await Deno.remove(entryPath);
              } catch (error) {
                  if (onerror) {
                      onerror(error);
                  } else if (!ignoreErrors) {
                      throw error;
                  }
              }
          }
      }

      await Deno.remove(path);
  } catch (error) {
      if (onerror) {
          onerror(error);
      } else if (!ignoreErrors) {
          throw error;
      }
  }
}
/** 
 * recursive chmod to add permission bits (possibly different for files and subdirectiores)
 * does not follow symlinks
 */
export async function chmodRplus(path: string, file_bits = 0, dir_bits = 0): Promise<void> {
    const do1 = async (path1: string, bits: number): Promise<void> => {
      // ビット値の範囲チェック (8進数の0-7777)
      if (!(0 <= bits && bits < 0o10000)) {
        throw new Error("Invalid permission bits");
      }
  
      // シンボリックリンクでないことと、指定パス内であることを確認
      const fileInfo = lstatSync(path1);
      if (!fileInfo.isSymbolicLink && pathReallyWithin(path1, path)) {
        // 現在のパーミッションを取得し、新しいビットを追加
        const currentMode = (lstatSync(path1)).mode || 0;
        const newMode = (currentMode & 0o7777) | bits;
        await Deno.chmod(path1, newMode);
      }
    };
  
    // パスの種類を確認
    const pathInfo = await Deno.lstat(path);
    
    if (pathInfo.isDirectory) {
      // ディレクトリの場合、まず自身のパーミッションを変更
      await do1(path, dir_bits);
  
      // 再帰的にディレクトリ内を走査
      for await (const entry of walk(path, { followSymlinks: false })) {
        try {
          const entryInfo = await Deno.lstat(entry.path);
          if (entryInfo.isDirectory) {
            await do1(entry.path, dir_bits);
          } else if (entryInfo.isFile) {
            await do1(entry.path, file_bits);
          }
        } catch (error) {
          if (error instanceof Deno.errors.PermissionDenied) {
            throw error;
          }
        }
      }
    } else {
      // ファイルの場合、単純にパーミッションを変更
      await do1(path, file_bits);
    }
  }
/**
* Synchronous version of rmtree.
* Recursively removes a directory and all its contents.
* 
* @param path Path to remove
* @param options Configuration options
*/
export function rmtreeSync(
  path: string,
  options: {
      ignoreErrors?: boolean;
      onerror?: (error: unknown) => void;
  } = {}
): void {
  const { ignoreErrors = false, onerror } = options;

  try {
      const fileInfo = Deno.statSync(path);
      if (!fileInfo.isDirectory) {
          Deno.removeSync(path);
          return;
      }

      for (const entry of Deno.readDirSync(path)) {
          const entryPath = `${path}/${entry.name}`;
          if (entry.isDirectory) {
              rmtreeSync(entryPath, options);
          } else {
              try {
                  Deno.removeSync(entryPath);
              } catch (error) {
                  if (onerror) {
                      onerror(error);
                  } else if (!ignoreErrors) {
                      throw error;
                  }
              }
          }
      }

      Deno.removeSync(path);
  } catch (error) {
      if (onerror) {
          onerror(error);
      } else if (!ignoreErrors) {
          throw error;
      }
  }
}
export function readFileSync(path: string):string{
    const decoder = new TextDecoder("utf-8");
    const text = decoder.decode(Deno.readFileSync(path));
    return text
}
export function writeFileSync(path: string,content:string){
  const encoder = new TextEncoder();
  Deno.writeFileSync(path,encoder.encode(content))
}
export async function withTempDir<T>(
  fn: (dir: string) => Promise<T>,
  options?: Deno.MakeTempOptions
): Promise<T> {
  const dir = await Deno.makeTempDir(options);
  try {
    return await fn(dir);
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
}

/**
 * Creates directories recursively at the specified path
 * @param path The directory path to create
 * @param options Options for directory creation
 * @returns Promise resolving to the created directory path
 * @throws Error if directory creation fails
 */
export function mkdirsSync(
    path: string,
    options: { mode?: number; recursive?: boolean } = {},
  ): string {
    try {
      // Normalize path separators
      const normalizedPath = path.replace(/\\/g, "/");
      
      // Default options
      const defaultOptions = {
        mode: 0o777,
        recursive: true,
      };
      
      const mergedOptions = { ...defaultOptions, ...options };
      
      // Check if directory already exists
      try {
        const stat = Deno.statSync(normalizedPath);
        if (stat.isDirectory) {
          return normalizedPath;
        }
        throw new Error(`Path exists but is not a directory: ${normalizedPath}`);
      } catch (error) {
        // Continue if file not found
        if (!(error instanceof Deno.errors.NotFound)) {
          throw error;
        }
      }
      
      // Create directory
      Deno.mkdirSync(normalizedPath, mergedOptions);
      return normalizedPath;
    } catch (error) {
      throw new Error(`Failed to create directory at ${path}: ${error}`);
    }
  }
export  function strip_leading_whitespace(txt: string): [number,string] {
    // Given a multi-line string, determine the largest w such that each line
    // begins with at least w whitespace characters. Return w and the string
    // with w characters removed from the beginning of each line.
    const lines = txt.split("\n");

    let to_strip: number | null = null;
    for (const line of lines) {
        const trimmedLine = line.trimStart();
        const lsl = trimmedLine.length;
        if (lsl) {
            const c = line.length - lsl;
            if (c < 0) {
                throw new Error("Unexpected negative whitespace count");
            }
            if (to_strip === null || to_strip > c) {
                to_strip = c;
            }
            // TODO: do something about mixed tabs & spaces
        }
    }

    if (!to_strip) {
        return [0, txt];
    }

    const processedLines = lines.map(line => {
        if (line.trimStart()) {
            return line.slice(to_strip);
        }
        return line;
    });

    return [to_strip, processedLines.join("\n")];
}
/**
 * Split a path into an array of its components
 */
function splitall(p: string): string[] {
  const parts = [];
  let current = p;
  while (true) {
      const [dir, base] = [path.dirname(current), path.basename(current)];
      if (base) parts.unshift(base);
      if (dir === current) {
          if (dir) parts.unshift(dir);
          break;
      }
      current = dir;
  }
  return parts;
}

/**
* After resolving symlinks, is path lhs either equal to or nested within path rhs?
*/
export function pathReallyWithin(lhs: string, rhs: string): boolean {
  try {
      const lhs_cmp = splitall(Deno.realPathSync(lhs));
      const rhs_cmp = splitall(Deno.realPathSync(rhs));
      return lhs_cmp.length >= rhs_cmp.length && 
             lhs_cmp.slice(0, rhs_cmp.length).every((v, i) => v === rhs_cmp[i]);
  } catch {
      return false;
  }
}
export const getuid = Deno.uid;
export const getgid = Deno.gid;
export const mkdirSync = Deno.mkdirSync
export const copyFileSync = Deno.copyFileSync
export const path = {
  dirname: denoPath.dirname,
  basename: denoPath.basename,
  relative: denoPath.relative,
  resolve: denoPath.resolve,
  isAbsolute: denoPath.isAbsolute,
  join: (...paths: string[]): string => {
    /**
     * emulate os.path.join of python 
     */
    if (paths.length === 0) {
      return '';
    }
  
    // Filter out empty segments, but keep the original order
    const filteredPaths = paths.filter(p => p !== '');
  
    if (filteredPaths.length === 0) {
      return '';
    }
  
    let result = filteredPaths[0];
  
    for (let i = 1; i < filteredPaths.length; i++) {
      const segment = filteredPaths[i];
  
      // If segment is an absolute path, discard everything before it
      if (segment.startsWith('/')) {
        result = segment;
        continue;
      }
  
      // Add separator if needed
      if (!result.endsWith('/')) {
        result += '/';
      }
  
      result += segment;
    }
  
    return result;
  }
};
export interface SystemInfo {
    cpuCount: number;
    totalMemory: number;
}
export function getSystemInfo():SystemInfo{
    const cpuInfo = os.cpus()
    const memInfo = Deno.systemMemoryInfo();
    return {
        cpuCount: cpuInfo.length,
        totalMemory: memInfo.total,
    }
}
export function getEnv(name: string): string | undefined {
    return Deno.env.get(name);
}
export function copyDir(src: string, dest: string): void {
    mkdirSync(dest, { recursive: true });
    const entries = Deno.readDirSync(src);
    
    for (const entry of entries) {
      const srcPath = denoPath.join(src, entry.name);
      const destPath = denoPath.join(dest, entry.name);
      const stat = Deno.statSync(srcPath);
      
      if (stat.isDirectory) {
        copyDir(srcPath, destPath);
      } else {
        Deno.copyFileSync(srcPath, destPath);
      }
    }
  }

