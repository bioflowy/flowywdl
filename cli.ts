import * as Tree from "./tree.ts"
import * as Env from "./env.ts"
import * as Expr from "./expr.ts"
import * as Value from "./value.ts"
import * as Type from "./type.ts"
import * as WDLError from "./error.ts"
import {path as fspath, readFileSync} from "./runtimeutils.ts"
import { valuesToJson } from "./utils.ts";
import { bold as denoBold } from "https://deno.land/std/fmt/colors.ts";
import { walk } from "https://deno.land/std/fs/mod.ts";
import { readAll } from "https://deno.land/std@0.99.0/io/util.ts";
import { parse as parseYaml } from "https://deno.land/std/yaml/mod.ts";
import { pathReallyWithin } from "./runtimeutils.ts";
function runner_exe(doc: Tree.Document, task_name: string | null = null): Tree.Task | Tree.Workflow {
    /**
     * Resolve the workflow or task to run:
     * 1. user setting of --task (task_name), if any
     * 2. workflow if present
     * 3. the lone task, if there's exactly one
     * 4. otherwise error.
     */
    let target: Tree.Task | Tree.Workflow | undefined = undefined;
    
    if (task_name) {
        target = doc.tasks.find(t => t.name === task_name);
        if (!target) {
            throw new WDLError.InputError(`no such task ${task_name} in document`);
        }
    } else if (doc.workflow) {
        target = doc.workflow;
    } else if (doc.tasks.length === 1) {
        target = doc.tasks[0];
    } else if (doc.tasks.length > 1) {
        throw new WDLError.InputError(
            "specify --task for WDL document with multiple tasks and no workflow"
        );
    } else {
        throw new WDLError.InputError("Empty WDL document");
    }
    
    return target;
}
function valuesFromJson(
    values_json: Record<string, any>,
    available: Env.Bindings<Tree.Decl | Type.Base>,
    options: {
        required?: Env.Bindings<Tree.Decl | Type.Base>;
        namespace?: string;
    } = {}
): Env.Bindings<Value.Base> {
    /**
     * Given a dict parsed from Cromwell-style JSON and the available input (or
     * output) declarations of a task or workflow, create a
     * WDL.Env.Bindings[Value.Base].
     * 
     * @param required - raise an error if any of these required inputs aren't present
     * @param namespace - expect each key to start with this namespace prefixed to
     *                   the input/output names (e.g. the workflow name)
     */
    const { required, namespace = "" } = options;
    const namespaceDot = namespace && !namespace.endsWith(".") ? namespace + "." : namespace;
    
    let ans = new Env.Bindings<Value.Base>();
    
    for (const [key, value] of Object.entries(values_json)) {
        // ignore "comments"
        if (!key.startsWith("#")) {
            let key2 = key;
            if (namespaceDot && key.startsWith(namespaceDot)) {
                key2 = key.slice(namespaceDot.length);
            }

            let ty: Type.Base | Tree.Decl | null = null;
            
            if (available.hasBinding(key2)) {
                ty = available.get(key2);
            } else {
                const key2parts = key2.split(".");
                
                const runtime_idx = key2parts.findIndex(term => term === "runtime");
                if (
                    runtime_idx >= 0 &&
                    key2parts.length > (runtime_idx + 1) &&
                    key2parts.slice(0, runtime_idx).concat(["_runtime"]).join(".") in available
                ) {
                    // allow arbitrary keys for runtime
                    ty = new Type.Any();
                } else if (key2parts.length === 3 && key2parts[0] && key2parts[1] && key2parts[2]) {
                    // attempt to simplify <call>.<subworkflow>.<input> from old Cromwell JSON
                    key2 = [key2parts[0], key2parts[2]].join(".");
                    if (key2 in available) {
                        ty = available.get(key2);
                    }
                }
            }

            if (!ty) {
                throw new WDLError.InputError("unknown input/output: " + key);
            }

            if (ty instanceof Tree.Decl) {
                // treat input with default as optional, with or without the ? type quantifier
                ty = ty.expr ? ty.type.copy( true ) : ty.type;
            }

            try {
                const v = Value.fromJson(ty, value);
                try {
                    v.type.check(ty);
                } catch {
                    throw new Error("Value.from_json validation failed");
                }
                ans = ans.bind(key2, v);
            } catch (exn) {
                if (exn instanceof WDLError.InputError) {
                    throw new WDLError.InputError(`${exn.message} (in ${key})`);
                }
                throw exn;
            }
        }
    }

    if (required) {
        const missing = required.subtract(ans);
        if (missing.length > 0) {
            throw new WDLError.InputError(
                "missing required inputs/outputs: " + Object.keys(valuesToJson(missing)).join(", ")
            );
        }
    }

    return ans;
}
async function validate_input_path(
    directory: boolean,
    path: string,
    downloadable: ((path: string, directory: boolean) => boolean) | null,
    root: string
): Promise<string> {
    /**
     * If the path is downloadable, return it back. Otherwise, return the absolute path after checking
     * 1. exists and is a file or directory (according to directory: bool)
     * 2. resides within root
     * 3. contains no symlinks pointing outside or to absolute paths
     */
    if (downloadable && downloadable(path, directory)) {
        return path;
    }

    try {
        const fileInfo = Deno.statSync(path);
        if (directory && !fileInfo.isDirectory || !directory && !fileInfo.isFile) {
            throw new WDLError.InputError(
                `${directory ? "Directory" : "File"} not found: ${path}`
            );
        }
    } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
            throw new WDLError.InputError(
                `${directory ? "Directory" : "File"} not found: ${path}`
            );
        }
        throw error;
    }

    // Get absolute path
    path = await Deno.realPath(path);

    // Check if path is within root
    if (!await pathReallyWithin(path, root)) {
        throw new WDLError.InputError(
            `File & Directory inputs must be located within the configured 'file_io.root' directory '${root}' ` +
            `unlike '${path}'`
        );
    }

    if (directory) {
        try {
            // Walk through directory recursively
            for await (const entry of walk(path, { followSymlinks: false })) {
                if (entry.isSymlink) {
                    const linkPath = await Deno.readLink(entry.path);
                    
                    // Check if symlink exists
                    try {
                        await Deno.stat(entry.path);
                    } catch {
                        throw new WDLError.InputError(
                            "Input Directory contains broken symlink: " + path
                        );
                    }

                    // Check if symlink is absolute
                    if (fspath.isAbsolute(linkPath)) {
                        throw new WDLError.InputError(
                            "Input Directory contains absolute symlink: " + path
                        );
                    }

                    // Check if symlink points within the directory
                    if (!await pathReallyWithin(entry.path, path)) {
                        throw new WDLError.InputError(
                            "Input Directory contains symlink pointing outside: " + path
                        );
                    }
                }
            }
        } catch (error) {
            if (!(error instanceof WDLError.InputError)) {
                if(error instanceof Error){
                    throw new WDLError.InputError(
                        "Error walking directory: " + path + " - " + error.message
                    );    
                }else{
                    throw error
                }
            }
            throw error;
        }
    }

    return path;
}

async function runner_input_json_file(
    available_inputs: Env.Bindings<Tree.Decl>,
    namespace: string,
    input_file: string | null,
    downloadable: any,
    root: string
): Promise<Env.Bindings<Value.Base>> {
    /**
     * Load user-supplied inputs JSON file, if any
     */
    let ans = new Env.Bindings<Value.Base>();

    if (input_file) {
        input_file = input_file.trim();
    }
    
    if (input_file) {
        let input_json: string | object;
        
        if (input_file[0] === "{") {
            // 直接JSONとしてパース
            input_json = JSON.parse(input_file);
        } else if (input_file === "-") {
            // 標準入力から読み込み
            const decoder = new TextDecoder();
            const buffer = await readAll(Deno.stdin);
            input_json = decoder.decode(buffer);
        } else {
            // ファイルから読み込み
            input_json = readFileSync(input_file);
        }
        // Parse JSON/YAML input
        if (typeof input_json === 'string') {
            input_json = parseYaml(input_json) as object;
        }
        
        if (!input_json || typeof input_json !== 'object' || Array.isArray(input_json)) {
            throw new WDLError.InputError("check JSON input; expected top-level object");
        }

        try {
            ans = valuesFromJson(input_json as Record<string, any>, available_inputs, { namespace });
        } catch (exn) {
            if (exn instanceof WDLError.InputError) {
                throw new WDLError.InputError("check JSON input; " + exn.message);
            }
            throw exn;
        }

        // ans = Value.rewriteEnvPaths(
        //     ans,
        //     async (v: Value.Base) => {
        //         validate_input_path(
        //         (v as any).value,
        //         v instanceof Value.Directory,
        //         downloadable,
        //         root
        //     )
        //     }
        // );
    }

    return ans;
}
function add_wrapped_parameter_meta(
    target: Tree.Workflow | Tree.Task,
    input_name: string,
    output_list: string[]
): void {
    let ans = "";
    if (input_name in target.parameter_meta) {
        const entry = target.parameter_meta[input_name];
        if (typeof entry === "string") {
            ans = entry;
        } else if (typeof entry === "object" && typeof entry.help === "string") {
            ans = entry.help;
        }
    }
    if (ans) {
        // テキストを指定幅で折り返す簡易実装
        // Note: 完全なtextwrap.wrapの再現には、より複雑な実装が必要です
        const wrap = (text: string, width: number): string[] => {
            const words = text.split(/\s+/);
            const lines: string[] = [];
            let currentLine = "";

            for (const word of words) {
                if (currentLine.length + word.length + 1 <= width) {
                    currentLine += (currentLine ? " " : "") + word;
                } else {
                    if (currentLine) lines.push(currentLine);
                    currentLine = word;
                }
            }
            if (currentLine) lines.push(currentLine);
            return lines;
        };

        output_list.push(
            ...wrap(ans, 96).map(line => "    " + line)
        );
    }
}

function is_constant_expr(expr: Expr.Base): boolean {
    /**
     * Decide if the expression is "constant" for the above purposes
     */
    if (expr instanceof Expr.IntLiteral || expr instanceof Expr.FloatLiteral || expr instanceof Expr.BooleanLiteral) {
        return true;
    }
    
    if (expr instanceof Expr.String) {
        return expr.parts.length === 2 || 
               (expr.parts.length === 3 && typeof expr.parts[1] === "string");
    }
    
    if (expr instanceof Expr.Array) {
        return !expr.items.some(item => !is_constant_expr(item));
    }
    
    // TODO: Pair, Map, Struct???
    return false;
}
function runner_input_help(target: Tree.Task | Tree.Workflow): void {
    const bold = (line: string): string => {
        if (Deno.stderr.isTerminal()) {
            return denoBold(line);
        }
        return line;
    };

    const ans: string[] = [
        "",
        bold(`${target.name} (${target.pos.uri})`),
        bold(`${'-'.repeat(target.name.length + target.pos.uri.length + 3)}`)
    ];

    const required_inputs = target.required_inputs;
    ans.push(bold("\nrequired inputs:"));
    for (const b of required_inputs) {
        ans.push(bold(`  ${String(b.value.type)} ${b.name}`));
        add_wrapped_parameter_meta(target, b.name, ans);
    }

    let optional_inputs = target.availableInputs.subtract(target.required_inputs);
    optional_inputs = optional_inputs.filter(b => !b.value.name?.startsWith("_"));

    if (target.inputs === null) {
        // if the target doesn't have an input{} section (pre WDL 1.0), exclude
        // declarations bound to a non-constant expression (heuristic)
        optional_inputs = optional_inputs.filter(
            b => !b.value.expr || is_constant_expr(b.value.expr)
        );
    }

    if (optional_inputs.length > 0) {
        ans.push(bold("\noptional inputs:"));
        for (const b of optional_inputs) {
            const d = bold(`  ${String(b.value.type)} ${b.name}`);
            if (b.value.expr) {
                ans.push(`${d} = ${b.value.expr}`);
            } else {
                ans.push(d);
            }
            add_wrapped_parameter_meta(target, b.name, ans);
        }
    }

    ans.push(bold("\noutputs:"));
    for (const b of target.effectiveOutputs) {
        ans.push(bold(`  ${String(b.value)} ${b.name}`));
    }

    ans.forEach(line => console.error(line));
}
async function runner_input_value(
    s_value: string,
    ty: Type.Base,
    downloadable: ((path: string, directory: boolean) => boolean) | null,
    root: string
): Promise<Value.Base> {
    /**
     * Given an input value from the command line (right-hand side of =) and the
     * WDL type of the corresponding input decl, create an appropriate Value.
     */
    
    if (ty instanceof Type.String) {
        return new Value.String(s_value);
    }
    
    if (ty instanceof Type.File || ty instanceof Type.Directory) {
        // check existence and absolutify path
        const directory = ty instanceof Type.Directory;
        const expandedPath = s_value.replace(/^~/, Deno.env.get("HOME") || "~");
        const validatedPath = await validate_input_path(
            directory,
            expandedPath,
            downloadable,
            root
        );
        return directory 
            ? new Value.Directory(validatedPath)
            : new Value.File(validatedPath);
    }
    
    if (ty instanceof Type.Boolean) {
        if (s_value === "true") {
            return new Value.Boolean(true);
        }
        if (s_value === "false") {
            return new Value.Boolean(false);
        }
        throw new WDLError.InputError(
            `Boolean input should be true or false instead of '${s_value}'`
        );
    }
    
    if (ty instanceof Type.Int) {
        const value = parseInt(s_value, 10);
        if (isNaN(value)) {
            throw new WDLError.InputError(`Cannot convert '${s_value}' to Int`);
        }
        return new Value.Int(value);
    }
    
    if (ty instanceof Type.Float) {
        const value = parseFloat(s_value);
        if (isNaN(value)) {
            throw new WDLError.InputError(`Cannot convert '${s_value}' to Float`);
        }
        return new Value.Float(value);
    }
    
    if (ty instanceof Type.WDLArray &&
        (ty.itemType instanceof Type.String ||
         ty.itemType instanceof Type.File ||
         ty.itemType instanceof Type.Directory ||
         ty.itemType instanceof Type.Int ||
         ty.itemType instanceof Type.Float)) {
        // just produce a length-1 array, to be combined ex post facto
        return new Value.WDLArray(
            ty.itemType,
            [await runner_input_value(s_value, ty.itemType, downloadable, root)]
        );
    }
    
    if (ty instanceof Type.Pair ||
        ty instanceof Type.Map ||
        ty instanceof Type.StructInstance) {
        // parse JSON for compound types
        try {
            const jsonValue = JSON.parse(s_value);
            return Value.fromJson(ty, jsonValue);
        } catch (error) {
            throw new WDLError.InputError(
                `Invalid JSON for input of type ${ty}, check syntax and shell quoting: ${error}`
            );
        }
    }
    
    if (ty instanceof Type.Any) {
        // infer dynamically-typed runtime overrides
        const intValue = parseInt(s_value, 10);
        if (!isNaN(intValue) && intValue.toString() === s_value) {
            return new Value.Int(intValue);
        }
        
        const floatValue = parseFloat(s_value);
        if (!isNaN(floatValue) && floatValue.toString() === s_value) {
            return new Value.Float(floatValue);
        }
        
        return new Value.String(s_value);
    }
    
    throw new WDLError.InputError(
        `No command-line support yet for inputs of type ${ty}; workaround: specify in JSON file with --input`
    );
}
interface RunnerInputOptions {
    task: string|undefined,
    check_required: boolean|undefined,
    downloadable: any|undefined,
    root:string|undefined,
}
const RunnerInputOptionsDefault ={
    task : undefined,
        check_required : true,
        downloadable : undefined,
        root : "/"
}
export async function runner_input(
    doc: Tree.Document,
    inputs: string[],
    input_file: string,
    empty: string[] | null,
    none: string[] | null,
    options: RunnerInputOptions = RunnerInputOptionsDefault
): Promise<[Tree.Workflow|Tree.Task, Env.Bindings<Value.Base>, Record<string, any>]> {
    const {
        task = undefined,
        check_required = true,
        downloadable = undefined,
        root = "/"
    } = options;

    // resolve target
    const target = runner_exe(doc, task);

    // build up an values env of the provided inputs
    const available_inputs = target.availableInputs;
    let input_env = await runner_input_json_file(
        available_inputs,
        (target instanceof Tree.Workflow ? target.name : ""),
        input_file,
        downloadable,
        root
    );
    const json_keys = new Set(Array.from(input_env, b => b.name));

    // set explicitly empty arrays or strings
    for (const empty_name of empty || []) {
        try {
            const decl = available_inputs.get(empty_name);
            if (!decl) throw new Error();
            
            if (decl.type instanceof Type.WDLArray) {
                if (decl.type.nonempty) {
                    throw new WDLError.InputError(
                        `Cannot set input ${String(decl.type)} ${decl.name} to empty array`
                    );
                }
                input_env = input_env.bind(empty_name,new Value.WDLArray(decl.type,[]),decl) ;
            } else if (decl.type instanceof Type.String) {
                input_env = input_env.bind(empty_name,new  Value.String("",null,decl.type), decl);
            } else {
                let msg = `Cannot set ${String(decl.type)} ${decl.name} to empty array or string`;
                if (decl.type.optional) {
                    msg += `; perhaps you want --none ${decl.name}`;
                }
                throw new WDLError.InputError(msg);
            }
        } catch {
            runner_input_help(target);
            throw new WDLError.InputError(`No such input to ${target.name}: ${empty_name}`);
        }
    }

    // set explicitly None values
    for (const none_name of none || []) {
        try {
            const decl = available_inputs.get(none_name);
            if (!decl) throw new Error();

            if (!decl.type.optional) {
                throw new WDLError.InputError(
                    `Cannot set non-optional input ${String(decl.type)} ${decl.name} to None`
                );
            }
            input_env = input_env.bind(none_name, new Value.Null(), decl);
        } catch {
            runner_input_help(target);
            throw new WDLError.InputError(`No such input to ${target.name}: ${none_name}`);
        }
    }

    // preprocess command-line inputs: merge adjacent elements ("x=", "y") into ("x=y")
    const processedInputs = [...inputs];
    let i = 0;
    while (i < processedInputs.length) {
        const len_i = processedInputs[i].length;
        if (len_i > 1 && processedInputs[i].indexOf("=") === len_i - 1 && i + 1 < processedInputs.length) {
            processedInputs[i] = processedInputs[i] + processedInputs[i + 1];
            processedInputs.splice(i + 1, 1);
        }
        i++;
    }

    // add in command-line inputs
    for (const one_input of processedInputs) {
        // parse [namespace], name, and value
        const buf = one_input.split("=", 2);
        if (!one_input || !one_input[0].match(/^[a-zA-Z]/) || buf.length !== 2 || !buf[0]) {
            runner_input_help(target);
            throw new WDLError.InputError("Invalid input name=value pair: " + one_input);
        }
        const [name, s_value] = buf;

        // find corresponding input declaration
        let decl = available_inputs.get(name);

        if (!decl) {
            // allow arbitrary runtime overrides
            const nmparts = name.split(".");
            const runtime_idx = nmparts.findIndex(term => term === "runtime");
            if (runtime_idx >= 0 && nmparts.length > (runtime_idx + 1)) {
                decl = available_inputs.get(nmparts.slice(0, runtime_idx).concat(["_runtime"]).join("."));
            }
        }

        if (!decl) {
            runner_input_help(target);
            throw new WDLError.InputError(`No such input to ${target.name}: ${buf[0]}`);
        }

        // create a Value based on the expected type
        const v = await runner_input_value(s_value, decl.type, downloadable, root);

        // insert value into input_env
        const existing = input_env.get(name);
        if (existing && !json_keys.has(name)) {
            if ("value" in v && Array.isArray(v.value)) {
                if ("value" in existing && Array.isArray(existing.value) && v.type.coerces(existing.type)) {
                    existing.value.push(...v.value);
                } else {
                    runner_input_help(target);
                    throw new WDLError.InputError(`non-array input ${buf[0]} duplicated`);
                }
            } else {
                runner_input_help(target);
                throw new WDLError.InputError(`non-array input ${buf[0]} duplicated`);
            }
        } else {
            input_env = input_env.bind(name, v, decl);
            json_keys.delete(name); // command-line overrides JSON input
        }
    }

    // check for missing inputs
    if (check_required) {
        const missing_inputs = valuesToJson(target.required_inputs.subtract(input_env));
        if (Object.keys(missing_inputs).length > 0) {
            runner_input_help(target);
            throw new WDLError.InputError(
                `missing required inputs for ${target.name}: ${Object.keys(missing_inputs).join(", ")}`
            );
        }
    }

    // make a pass over the Env to create a dict for Cromwell-style input JSON
    return [
        target,
        input_env,
        valuesToJson(input_env,target instanceof Tree.Workflow ? target.name : "")
    ];
}