import { encode as base32Encode } from "https://deno.land/std@0.201.0/encoding/base32.ts";
import { BadCharacterEncoding,SourcePosition } from "./error.ts";
import { lstat, mkdirsSync, mkdirSync, path,symlink, unlink, writeFileSync } from "./runtimeutils.ts";
import * as Value from './value.ts'
import * as Tree from './tree.ts'
import * as Type from './type.ts'
import * as Env from './env.ts'
import { existsSync } from "./runtimeutils.ts";
/**
 * Creates a directory for a run with timestamp-based naming.
 * @param name Base name for the run directory
 * @param parentDir Parent directory path (optional)
 * @param lastLink Whether to create/update a _LAST symlink (default: false)
 * @returns The absolute path to the created run directory
 */
export async function provisionRunDir(
    name: string,
    parentDir: string | null = null,
    lastLink: boolean = false
): Promise<string> {
    const here = parentDir
        ? (parentDir === "." || parentDir === "./" || 
           parentDir.endsWith("/.") || parentDir.endsWith("/./"))
        : false;

    parentDir = path.resolve(parentDir || Deno.cwd());

    let runDir: string | null = null;
    if (here) {
        // user wants to use parentDir exactly
        runDir = parentDir;
        mkdirsSync(runDir);
        parentDir = path.dirname(parentDir);
    } else {
        // create timestamp-named directory
        while (!runDir) {
            const timestamp = new Date().toISOString()
                .replace(/[-:]/g, "")
                .replace(/[T.]/g, "_")
                .split("_")[0] + "_" + 
                new Date().toTimeString().split(" ")[0].replace(/:/g, "");
            
            runDir = path.join(parentDir, `${timestamp}_${name}`);
            
            try {
                await Deno.mkdir(runDir,{recursive:true});
                console.log(`created ${runDir}`)
            } catch (error) {
                if ((error as NodeJS.ErrnoException).code === 'EEXIST') {
                    runDir = null;
                    await new Promise(resolve => setTimeout(resolve, 500));
                } else {
                    throw error;
                }
            }
        }
    }

    if (!runDir) {
        throw new Error("Failed to create run directory");
    }

    // update the _LAST link
    if (lastLink && runDir !== parentDir) {
        const lastLinkName = path.join(parentDir, "_LAST");
        try {
            const stats = await lstat(lastLinkName);
            if (stats.isSymlink) {
                await unlink(lastLinkName);
            }
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
                throw error;
            }
        }        
        
        await symlink(path.basename(runDir), lastLinkName);
    }

    return runDir;
}
export function writeValuesJson(
    valuesEnv: any,  // Type for Env.Bindings[Value.Base]
    filename: string, 
    namespace: string = ""
): void {
    writeFileSync(filename,JSON.stringify(
        valuesToJson(valuesEnv,  namespace),
        null,
        2
    ),
    )
}

export function valuesToJson(
    valuesEnv: Env.Bindings<Value.Base | Tree.Decl | Type.Base>,
    namespace: string = ""
): { [key: string]: any } {
    /**
     * Convert a WDL.Env.Bindings[WDL.Value.Base] to a dict which JSON.stringify to
     * Cromwell-style JSON.
     * 
     * @param namespace prefix this namespace to each key (e.g. workflow name)
     */
    // also can be used on Env.Bindings[Tree.Decl] or Env.Types, then the right-hand side of
    // each entry will be the type string.
    
    if (namespace && !namespace.endsWith(".")) {
        namespace += ".";
    }

    const ans: { [key: string]: any } = {};
    
    for (const item of valuesEnv) {
        const v = item.value;
        let j: any;
        
        if (v instanceof Value.Base) {
            j = v.json;
        } else if (v instanceof Tree.Decl) {
            j = String(v.type);
        } else {
            if (!(v instanceof Type.Base)) {
                throw new Error("Invalid value type");
            }
            j = String(v);
        }
        
        ans[(item.name.startsWith("_") ? "" : namespace) + item.name] = j;
    }
    
    return ans;
}

/**
 * Helper function to force create a symlink by removing existing one if necessary
 */
export async function symlinkForce(target: string, linkPath: string): Promise<void> {
    try {
        await unlink(linkPath);
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
            throw error;
        }
    }
    await symlink(target, linkPath);
}
/**
 * Helper function to force create a symlink by removing existing one if necessary
 */
export async function linkForce(target: string, linkPath: string): Promise<void> {
    try {
        await unlink(linkPath);
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
            throw error;
        }
    }
    await Deno.linkSync(target, linkPath);
}

const byteSizeUnits: { [key: string]: number } = {
    'K': 1024,
    'KB': 1024,
    'KiB': 1024,
    'M': 1024 * 1024,
    'MB': 1024 * 1024,
    'MiB': 1024 * 1024,
    'G': 1024 * 1024 * 1024,
    'GB': 1024 * 1024 * 1024,
    'GiB': 1024 * 1024 * 1024,
    'T': 1024 * 1024 * 1024 * 1024,
    'TB': 1024 * 1024 * 1024 * 1024,
    'TiB': 1024 * 1024 * 1024 * 1024,
  };
  
  /**
   * "2000", "4G", "1.5 TiB" などの文字列をバイト数に変換する
   * @param s バイトサイズを表す文字列
   * @returns バイト数
   * @throws 無効な形式の場合はエラー
   */
export function parseByteSize(s: string): number {
    s = s.trim();
    let N: number | null = null;
    let unit: string | null = null;
  
    // 数値部分と単位部分を分離
    for (let i = 0; i < s.length; i++) {
      if (s[i].match(/[\d.]/) !== null) {
        N = parseFloat(s.slice(0, i + 1));
        unit = s.slice(i + 1).trim();
      } else {
        break;
      }
    }
  
    // 値と単位の検証と変換
    if (N !== null && unit) {
      if (unit in byteSizeUnits) {
        N *= byteSizeUnits[unit];
      } else {
        N = null;
      }
    }
  
    // エラーチェック
    if (N === null || N < 0) {
      throw new Error(`invalid byte size string, ${s}`);
    }
  
    return Math.floor(N);
  }
export async function calcSHA256(text: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    
    // SHA-256 ハッシュの生成
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    
    // Base32エンコード
    const base32Hash = base32Encode(Uint8Array.from(hashArray));
    return base32Hash;
}

export interface Writer {
    write(text: string): Promise<void>;
    close(): Promise<void>;
    isOpen(): boolean;
  }
  
export  class FileWriter implements Writer {
    private file: Deno.FsFile | null = null;
    private encoder = new TextEncoder();
    private closed = false;
  
    constructor(private filename: string) {
      this.file = Deno.createSync(filename);
    }
  
    async write(text: string): Promise<void> {
      if (this.closed || !this.file) {
        throw new Error("Writer is closed");
      }
      await this.file.write(this.encoder.encode(text));
    }
  
    async close(): Promise<void> {
      if (!this.closed && this.file) {
        this.file.close();
        this.file = null;
        this.closed = true;
      }
    }
  
    isOpen(): boolean {
      return !this.closed && this.file !== null;
    }
  }

/**
 * Decode backslash-escape sequences in a string that may also contain unescaped, non-ASCII unicode
 * characters. Inspired by: https://stackoverflow.com/a/24519338/13393076 however that solution
 * fails to reject some invalid escape sequences.
 */
const ASCII_PARTS_RE = /[\x01-\x7f]+/u;

// const INVALID_ESCAPE_RE = /\\(?=[^\n\\'"abfnrtv0-7xNuU])/;

export function decodeEscapes(pos: SourcePosition, s: string): string {
    // if (INVALID_ESCAPE_RE.test(s)) {
    //     throw new BadCharacterEncoding(pos);
    // }

    try {
        return s.replace(ASCII_PARTS_RE, match => {
            // Implement unicode-escape decoding for ASCII parts
            return decodeUnicodeEscape(match);
        });
    } catch (error) {
        throw new BadCharacterEncoding(pos);
    }
}

/**
 * Helper function to decode unicode escape sequences
 * This implementation handles common escape sequences
 */
function decodeUnicodeEscape(s: string): string {
    return s.replace(/\\([\\'"abfnrtv0]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/g, 
        (match, escape) => {
            switch (escape[0]) {
                case '\\': return '\\';
                case "'": return "'";
                case '"': return '"';
                case 'a': return '\x07';
                case 'b': return '\b';
                case 'f': return '\f';
                case 'n': return '\n';
                case 'r': return '\r';
                case 't': return '\t';
                case 'v': return '\v';
                case '0': return '\0';
                case 'x': 
                    return String.fromCharCode(parseInt(escape.slice(1), 16));
                case 'u':
                    return String.fromCharCode(parseInt(escape.slice(1), 16));
                case 'U':
                    // For Unicode code points above 0xFFFF
                    const cp = parseInt(escape.slice(1), 16);
                    return String.fromCodePoint(cp);
                default:
                    throw new Error('Invalid escape sequence');
            }
        }
    );
}
/**
 * A sparse adjacency matrix for topological sorting
 * which we should not have implemented ourselves
 */
export class AdjM<T> {
  private _forward: Map<T, Set<T>>;
  private _reverse: Map<T, Set<T>>;
  private _unconstrained: Set<T>;

  constructor() {
      this._forward = new Map();
      this._reverse = new Map();
      this._unconstrained = new Set();
  }

  *sinks(source: T): IterableIterator<T> {
      const sinkSet = this._forward.get(source);
      if (sinkSet) {
          yield* sinkSet;
      }
  }

  *sources(sink: T): IterableIterator<T> {
      const sourceSet = this._reverse.get(sink);
      if (sourceSet) {
          yield* sourceSet;
      }
  }

  get nodes(): T[] {
      return this._forward.keys().toArray();
  }

  get unconstrained(): IterableIterator<T> {
      const self = this;
      return (function* () {
          for (const n of self._unconstrained) {
              const reverseSet = self._reverse.get(n);
              if (!reverseSet || reverseSet.size === 0) {
                  yield n;
              } else {
                  throw new Error("Constrained node in unconstrained set");
              }
          }
      })();
  }

  add_node(node: T): void {
      if (!this._forward.has(node)) {
          if (this._reverse.has(node)) {
              throw new Error("Inconsistent state: node in reverse but not forward");
          }
          this._forward.set(node, new Set());
          this._reverse.set(node, new Set());
          this._unconstrained.add(node);
      } else {
          if (!this._reverse.has(node)) {
              throw new Error("Inconsistent state: node in forward but not reverse");
          }
      }
  }

  add_edge(source: T, sink: T): void {
      this.add_node(source);
      this.add_node(sink);
      
      const forwardSet = this._forward.get(source)!;
      if (!forwardSet.has(sink)) {
          forwardSet.add(sink);
          this._reverse.get(sink)!.add(source);
          if (this._unconstrained.has(sink)) {
              this._unconstrained.delete(sink);
          }
      } else {
          const reverseSet = this._reverse.get(sink)!;
          if (!reverseSet.has(source)) {
              throw new Error("Inconsistent state: edge in forward but not reverse");
          }
          if (this._unconstrained.has(sink)) {
              throw new Error("Constrained node in unconstrained set");
          }
      }
  }

  remove_edge(source: T, sink: T): void {
      const forwardSet = this._forward.get(source);
      if (forwardSet?.has(sink)) {
          forwardSet.delete(sink);
          const reverseSet = this._reverse.get(sink)!;
          reverseSet.delete(source);
          if (reverseSet.size === 0) {
              this._unconstrained.add(sink);
          }
      } else {
          const reverseSet = this._reverse.get(sink);
          if (reverseSet?.has(source)) {
              throw new Error("Inconsistent state: edge in reverse but not forward");
          }
      }
  }

  remove_node(node: T): void {
      const sources = Array.from(this.sources(node));
      for (const source of sources) {
          this.remove_edge(source, node);
      }
      
      const sinks = Array.from(this.sinks(node));
      for (const sink of sinks) {
          this.remove_edge(node, sink);
      }
      
      this._forward.delete(node);
      this._reverse.delete(node);
      this._unconstrained.delete(node);
  }
}
export class StopIteration<T> extends Error {
    node:T; 
    constructor(node:T) {
        super("StopIteration");
        this.node = node;
    }
}
/**
* Topologically sort node IDs in adj (destroys adj)
* If there's a cycle, raises an error with the node property set to the ID of a
* node involved in a cycle.
*/
export function topsort<T>(adj: AdjM<T>): T[] {
  const ans: T[] = [];
  let node: T | undefined = undefined;
  
  for (const n of adj.unconstrained) {
      node = n;
      break;
  }
  
  while (node !== undefined) {
      adj.remove_node(node);
      ans.push(node);
      
      node = undefined;
      for (const n of adj.unconstrained) {
          node = n;
          break;
      }
  }

  for (const n of adj.nodes) {
      const error = new StopIteration<T>(n);
      throw error;
  }
  
  return ans;
}
export  class StringWriter implements Writer {
    private chunks: string[] = [];
    private closed = false;
  
    async write(text: string): Promise<void> {
      if (this.closed) {
        throw new Error("Writer is closed");
      }
      this.chunks.push(text);
    }
  
    async close(): Promise<void> {
      this.closed = true;
    }
  
    isOpen(): boolean {
      return !this.closed;
    }
  
    toString(): string {
      if (this.closed) {
        throw new Error("Writer is closed");
      }
      return this.chunks.join("");
    }
  }