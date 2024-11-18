import * as Value from './value.ts';
import * as Expr from './expr.ts'
import * as Env from './env.ts'
import * as Type from './type.ts'
import * as WDLError from './error.ts'
import { Writer } from "./utils.ts";

export class Base  {
    wdl_version: string;
    write_dir: string;
    constructor( wdl_version: string ="", write_dir: string = "") {
        this.wdl_version = wdl_version;
        this.write_dir = write_dir;
        this.functions.set("_at", new _At());
        this.functions.set("_land", new And());
        this.functions.set("_lor", new Or());
        this.functions.set("negate", new StaticFunction("_negate", [new Type.Boolean()], new Type.Boolean(), (x: Value.Boolean)=>! x.value));
        this.functions.set("_add", new _AddOperator());
        this.functions.set("_sub", new ArithmeticOperator("-", (l:number , r:number) => l - r));
        this.functions.set("_mul", new ArithmeticOperator("*",(l:number , r:number) => l * r));
        this.functions.set("_div", new ArithmeticOperator("/",(l:number , r:number) => l / r));
        this.functions.set("_rem", 
            new StaticFunction("_rem", [new Type.Int(),new Type.Int()], new Type.Int(), (l:number,r:number)=>new Value.Int(l % r)));
        this.functions.set("_add", new _AddOperator());
        this.functions.set("_eqeq",new _ComparisonOperator("==",(l:any,r:any)=>l === r));
        this.functions.set("_neq",new _ComparisonOperator("!=",(l:any,r:any)=>l !== r));
        this.functions.set("_lt",new _ComparisonOperator("<",(l:any,r:any)=>l < r));
        this.functions.set("_lte",new _ComparisonOperator("<=",(l:any,r:any)=>l <= r));
        this.functions.set("_gt",new _ComparisonOperator(">",(l:any,r:any)=>l > r));
        this.functions.set("_gte",new _ComparisonOperator(">=",(l:any,r:any)=>l >= r));

        this.functions.set("floor",
            new StaticFunction("floor",[new Type.Float()],new Type.Int(),(l:number)=>Math.floor(l)))
        this.functions.set("ceil",
            new StaticFunction("ceil",[new Type.Float()],new Type.Int(),(l:number)=>Math.ceil(l)));
        this.functions.set("round",
            new StaticFunction("round",[new Type.Float()],new Type.Int(),(l:number)=>Math.round(l)));
        this.functions.set("round",
            new StaticFunction("round",[new Type.Float()],new Type.Int(),(l:number)=>Math.round(l)));
        this.functions.set("length",
            new StaticFunction("length",[new Type.WDLArray(new Type.Any())],new Type.Int(),(l:Array<unknown>)=>l.length));
        this.functions.set("sub",
            new StaticFunction("sub",[new Type.String(),new Type.String(),new Type.String()],new Type.String(),
            (input:string,pattern:string,replace:string)=>{
                const r = new RegExp(pattern,'g');
                return input.replace(r,replace);
            }));
        
    } 
    functions = new Map<string, WDLFunction>();
    getFunction(name: string): WDLFunction | undefined{
        return this.functions.get(name)
    }
}
export class TaskOutputs extends Base {
    /**
    Defines type signatures for functions only available in task output sections.
    (Implementations left to by overridden by the task runtime)
     */

    constructor(wdl_version: string ="", write_dir: string = ""){
        super(wdl_version, write_dir);
        this.functions.set("stdout", new StaticFunction("stdout", [],new Type.File(), notImpl));
        this.functions.set("stderr", new StaticFunction("stderr", [],new Type.File(), notImpl));
        this.functions.set("glob", new StaticFunction("glob", [],new Type.WDLArray(new Type.File()), notImpl));
    }
}
// Abstract interface to a standard library function implementation
export abstract class WDLFunction {
    abstract inferType(expr: Expr.Apply): Type.Base;
    abstract call(expr: Expr.Apply, env: Env.Bindings<Value.Base>, stdlib: Base): Value.Base;
}

abstract class EagerFunction extends WDLFunction {
    abstract _callEager(expr: Expr.Apply, args: Value.Base[]): Value.Base;

    call(expr: Expr.Apply, env: Env.Bindings<Value.Base>, stdlib: Base): Value.Base {
        return this._callEager(expr, expr.arguments.map(arg => arg.eval(env,  stdlib )));
    }
}

class StaticFunction extends EagerFunction {
    name: string;
    argumentTypes: Type.Base[];
    returnType: Type.Base;
    F: Function;

    constructor(
        name: string,
        argumentTypes: Type.Base[],
        returnType: Type.Base,
        F: Function
    ) {
        super();
        this.name = name;
        this.argumentTypes = argumentTypes;
        this.returnType = returnType;
        this.F = F;
    }

    inferType(expr: Expr.Apply): Type.Base {
        let minArgs = this.argumentTypes.length;
        for (let i = this.argumentTypes.length - 1; i >= 0; i--) {
            if (this.argumentTypes[i].optional) {
                minArgs--;
            } else {
                break;
            }
        }

        if (expr.arguments.length > this.argumentTypes.length || expr.arguments.length < minArgs) {
            throw new WDLError.WrongArity(expr, this.argumentTypes.length);
        }

        for (let i = 0; i < expr.arguments.length; i++) {
            try {
                expr.arguments[i].typecheck(this.argumentTypes[i]);
            } catch (e) {
                if (e instanceof WDLError.StaticTypeMismatch) {
                    throw new WDLError.StaticTypeMismatch(
                        expr.arguments[i],
                        this.argumentTypes[i],
                        expr.arguments[i].type,
                        `for ${this.name} argument #${i + 1}`
                    );
                }
            }
        }
        return this.returnType;
    }

    _callEager(expr: Expr.Apply, args: Value.Base[]): Value.Base {
        const argumentValues = args.map((arg, i) => arg.coerce(this.argumentTypes[i]));
        try {
            const ans: Value.Base = this.F(...argumentValues);
            return ans.coerce(this.returnType);
        } catch (e) {
            let msg = "function evaluation failed";
            if (e instanceof Error && e.message) {
                msg += ", " + e.message;
            }
            throw new WDLError.EvalError(expr, msg);
        }
    }
}
class _At extends EagerFunction {
    inferType(expr: Expr.Apply): Type.Base {
        if (expr.arguments.length !== 2) {
            throw new Error("Expected 2 arguments");
        }

        const lhs = expr.arguments[0];
        const rhs = expr.arguments[1];

        if (lhs.type instanceof Type.WDLArray) {
            if (lhs instanceof Expr.Array && !lhs.items.length) {
                throw new WDLError.OutOfBounds(expr, "Cannot access empty array");
            }
            try {
                rhs.typecheck(new Type.Int());
            } catch (e) {
                if (e instanceof WDLError.StaticTypeMismatch) {
                    throw new WDLError.StaticTypeMismatch(rhs,new Type.Int(), rhs.type, "Array index");
                }
                throw e;
            }
            return lhs.type.itemType;
        }

        if (lhs.type instanceof Type.Map) {
            if (!lhs.type.itemType) {
                throw new WDLError.OutOfBounds(expr, "Cannot access empty map");
            }
            try {
                rhs.typecheck(lhs.type.itemType[0]);
            } catch (e) {
                if (e instanceof WDLError.StaticTypeMismatch) {
                    throw new WDLError.StaticTypeMismatch(
                        rhs, 
                        lhs.type.itemType[0], 
                        rhs.type, 
                        "Map key"
                    );
                }
                throw e;
            }
            return lhs.type.itemType[1];
        }

        if (lhs.type instanceof Type.Any && !lhs.type.optional) {
            return new Type.Any();
        }

        throw new WDLError.NotAnArray(lhs);
    }

    _callEager(expr: Expr.Apply, args: Value.Base[]): Value.Base {
        if (args.length !== 2 || expr.arguments.length !== 2) {
            throw new Error("Expected 2 arguments");
        }

        const lhs = args[0];
        const rhs = args[1];

        if (lhs instanceof Value.Map) {
            const mty = expr.arguments[0].type;
            let mkey = rhs;
            
            if (mty instanceof Type.Map && mty.itemType) {
                mkey = mkey.coerce(mty.itemType[0]);
            }

            let ans: Value.Base | null = null;
            for (const [k, v] of lhs.value) {
                if (mkey === k) {
                    ans = v;
                    break;
                }
            }

            if (ans === null) {
                throw new WDLError.OutOfBounds(expr.arguments[1], "Map key not found");
            }
            return ans;
        } 
        
        if (lhs instanceof Value.Struct) {
            let skey: string | null = null;
            
            if (rhs.type.coerces(new Type.String())) {
                try {
                    skey = rhs.coerce(new Type.String()).value as string;
                } catch (e) {
                    if (!(e instanceof WDLError.RuntimeError)) throw e;
                }
            }

            if (skey === null || !(skey in lhs.value)) {
                throw new WDLError.OutOfBounds(expr.arguments[1], "struct member not found");
            }
            return lhs.value[skey];
        } 
        
        const arrayLhs = lhs.coerce(new Type.WDLArray(new Type.Any()));
        const intRhs = rhs.coerce(new Type.Int());

        if (
            !(arrayLhs instanceof Value.WDLArray) ||
            !(intRhs instanceof Value.Int) ||
            intRhs.value < 0 ||
            intRhs.value >= arrayLhs.value.length
        ) {
            throw new WDLError.OutOfBounds(expr.arguments[1], "Array index out of bounds");
        }

        return arrayLhs.value[intRhs.value];
    }
}
function notImpl(...args: any[]): void {
    throw new Error("NotImplementedError: function not available in this context");
}
// Arithmetic operator classes
export class ArithmeticOperator extends EagerFunction {
    name: string;
    op: Function;

    constructor(name: string, op: Function) {
        super();
        this.name = name;
        this.op = op;
    }

    inferType(expr: Expr.Apply): Type.Base {
        if (expr.arguments.length !== 2) {
            throw new WDLError.WrongArity(expr, 2);
        }

        let rt: Type.Base = new Type.Int();
        if (expr.arguments[0].type instanceof Type.Float || 
            expr.arguments[1].type instanceof Type.Float) {
            rt = new Type.Float();
        }

        try {
            expr.arguments[0].typecheck(rt);
            expr.arguments[1].typecheck(rt);
        } catch (e) {
            throw new WDLError.IncompatibleOperand(
                expr,
                "Non-numeric operand to " + this.name + " operator"
            );
        }

        return rt;
    }

    _callEager(expr: Expr.Apply, args: Value.Base[]): Value.Base {
        const ansType = this.inferType(expr);
        const ans = this.op(
            args[0].coerce(ansType).value,
            args[1].coerce(ansType).value
        );

        if (ansType instanceof Type.Int) {
            return new Value.Int(ans as number);
        }
        return new Value.Float(ans as number);
    }
}
class _AddOperator extends ArithmeticOperator {
    constructor() {
        super("+", (l:number , r:number) => l + r);
    }

    infer_type(expr: Expr.Apply): Type.Base {
        if (expr.arguments.length !== 2) {
            throw new Error("Add operator requires exactly 2 arguments");
        }

        let t2: Type.Base | null = null;
        
        if (expr.arguments[0].type instanceof Type.String) {
            t2 = expr.arguments[1].type;
        } else if (expr.arguments[1].type instanceof Type.String) {
            t2 = expr.arguments[0].type;
        }

        if (t2 === null) {
            // neither operand is a string; defer to _ArithmeticOperator
            return super.inferType(expr);
        }

        if (!t2.coerces(new Type.String(),  expr.checkQuant )) {
            throw new WDLError.IncompatibleOperand(
                expr,
                `Cannot add/concatenate ${String(expr.arguments[0].type)} and ${String(expr.arguments[1].type)}`
            );
        }

        return new Type.String();
    }

    _call_eager(expr: Expr.Apply, args: Value.Base[]): Value.Base {
        const ans_type = this.infer_type(expr);
        
        if (!(ans_type instanceof Type.String)) {
            return super._callEager(expr, args);
        }

        const ans = this.op(
            String(arguments[0].coerce(new Type.String()).value),
            String(arguments[1].coerce(new Type.String()).value)
        );

        if (typeof ans !== 'string') {
            throw new Error("Expected string result from string concatenation");
        }

        return new Value.String(ans);
    }
}
class _ComparisonOperator extends EagerFunction {
    private name: string;
    private op: (a: any, b: any) => boolean;

    constructor(name: string, op: (a: any, b: any) => boolean) {
        super();
        this.name = name;
        this.op = op;
    }

    inferType(expr: Expr.Apply): Type.Base {
        if (expr.arguments.length !== 2) {
            throw new Error("Expected 2 arguments");
        }

        const [arg0, arg1] = expr.arguments;
        const isEqualityOp = this.name === "==" || this.name === "!=";

        // 型の互換性チェック
        const incompatible = (
            (!isEqualityOp && (arg0.type.optional || arg1.type.optional)) ||
            !(
                // 同じ型（optional フラグを無視）
                arg0.type.copy(false ).equals(
                    arg1.type.copy( false )
                ) ||
                // null との比較
                (arg0 instanceof Expr.Null || arg1 instanceof Expr.Null) ||
                // Int と Float の比較
                (arg0.type instanceof Type.Int && arg1.type instanceof Type.Float) ||
                (arg0.type instanceof Type.Float && arg1.type instanceof Type.Int) ||
                // Array 型の比較（optional と nonempty フラグを無視）
                (
                    arg0.type instanceof Type.WDLArray &&
                    arg1.type instanceof Type.WDLArray &&
                    arg0.type.copy().equals(
                        arg1.type.copy()
                    )
                )
            )
        );

        if (incompatible) {
            throw new WDLError.IncompatibleOperand(
                expr,
                `Cannot compare ${String(arg0.type)} and ${String(arg1.type)}`
            );
        }

        return new Type.Boolean();
    }

    _callEager(_: Expr.Apply, args: Value.Base[]): Value.Base {
        if (args.length !== 2) {
            throw new Error("Expected 2 arguments");
        }

        return new Value.Boolean(
            this.op(args[0].value, args[1].value)
        );
    }
}
export class And extends WDLFunction {
    // logical && with short-circuit evaluation
    inferType(expr: Expr.Apply): Type.Base {
        if (expr.arguments.length !== 2) {
            throw new Error("Expected 2 args");
        }

        for (const arg of expr.arguments) {
            if (!(arg.type instanceof Type.Boolean)) {
                throw new WDLError.IncompatibleOperand(arg, "non-Boolean operand to &&");
            }
            if (expr.checkQuant && arg.type.optional) {
                throw new WDLError.IncompatibleOperand(arg, "optional Boolean? operand to &&");
            }
        }
        return new Type.Boolean();
    }

    call(expr: Expr.Apply, env: Env.Bindings<Value.Base>, stdlib: Base): Value.Base {
        const lhs = expr.arguments[0].eval(env,  stdlib ).expect(new Type.Boolean()).value;
        if (!lhs) {
            return new Value.Boolean(false);
        }
        return expr.arguments[1].eval(env, stdlib).expect(new Type.Boolean());
    }
}
export class Or extends WDLFunction {
    // logical && with short-circuit evaluation
    inferType(expr: Expr.Apply): Type.Base {
        if (expr.arguments.length !== 2) {
            throw new Error("Expected 2 args");
        }

        for (const arg of expr.arguments) {
            if (!(arg.type instanceof Type.Boolean)) {
                throw new WDLError.IncompatibleOperand(arg, "non-Boolean operand to ||");
            }
            if (expr.checkQuant && arg.type.optional) {
                throw new WDLError.IncompatibleOperand(arg, "optional Boolean? operand to ||");
            }
        }
        return new Type.Boolean();
    }

    call(expr: Expr.Apply, env: Env.Bindings<Value.Base>, stdlib: Base): Value.Base {
        const lhs = expr.arguments[0].eval(env,  stdlib ).expect(new Type.Boolean()).value;
        if (lhs) {
            return new Value.Boolean(true);
        }
        return expr.arguments[1].eval(env, stdlib).expect(new Type.Boolean());
    }
}

export function parseLines(s: string): Value.WDLArray {
    const lines: Value.Base[] = [];
    if (s) {
        const text = s.endsWith("\n") ? s.slice(0, -1) : s;
        lines.push(...text.split("\n").map(line => new Value.String(line)));
    }
    return new Value.WDLArray(new Type.String(), lines);
}
export function parseTsv(s: string): Value.WDLArray {
    const ans: Value.Base[] = parseLines(s).value
        .filter(line => (line.value as string) !== "")
        .map(line => {
            return new Value.WDLArray(
                new Type.WDLArray(new Type.String()),
                (line.value as string).split("\t").map(field => new Value.String(field))
            );
        });
    return new Value.WDLArray(new Type.WDLArray(new Type.String()), ans);
}
export function parseMap(s: string): Value.Map {
    const keys = new Set<string>();
    const ans: [Value.Base, Value.Base][] = [];

    for (const line of parseTsv(s).value) {
        if (!(line instanceof Value.WDLArray)) {
            throw new Error("Expected Value.Array instance");
        }
        if (line.value.length !== 2) {
            throw new WDLError.InputError("read_map(): each line must have two fields");
        }
        if (keys.has(line.value[0].value as string)) {
            throw new WDLError.InputError("read_map(): duplicate key");
        }
        keys.add(line.value[0].value as string);
        ans.push([line.value[0], line.value[1]]);
    }

    return new Value.Map([new Type.String(), new Type.String()], ans);
}
export function serializeLines(array: Value.Base, outfile: Writer): void {
    if (!(array instanceof Value.WDLArray)) {
        throw new Error("Expected Value.Array instance");
    }
    for (const item of array.value) {
        const line = item.coerce(new Type.String()).value;
        outfile.write(line + "\n");
    }
}
export function parseObjects(s: string): Value.WDLArray {
    const strmat = parseTsv(s);
    if (strmat.value.length < 1 || (strmat.value[0].value as unknown[]).length < 1) {
        return new Value.WDLArray(new Type.Map([new Type.String(), new Type.String()]), []);
    }
    const keys = strmat.value[0].value as Value.String[];
    const literalKeys = new Set(
        keys.filter(key => key.value)
            .map(key => key.value)
    );

    if (literalKeys.size < keys.length) {
        throw new WDLError.InputError("read_objects(): file has empty or duplicate column names");
    }

    const maps: Value.Base[] = [];
    for (const row of strmat.value.slice(1)) {
        const values = row.value as Value.String[];
        if (values.length !== keys.length) {
            throw new WDLError.InputError("read_objects(): file's tab-separated lines are ragged");
        }
        maps.push(new Value.Map(
            [new Type.String(),new Type.String()],
            keys.map((key, i) => [key, values[i]])
        ));
    }

    return new Value.WDLArray(new Type.Map([new Type.String(), new Type.String()]), maps);
}
export function parseObject(s: string): Value.Map {
    const maps = parseObjects(s);
    if (maps.value.length !== 1) {
        throw new WDLError.InputError("read_object(): file must have exactly one object");
    }
    const map0 = maps.value[0];
    if (!(map0 instanceof Value.Map)) {
        throw new Error("Expected Value.Map instance");
    }
    return map0;
}
export function serializeTsv(v: Value.Base, writer: Writer): void {
    if (!(v instanceof Value.WDLArray)) {
        throw new Error("Expected Value.Array instance");
    }
    const formattedArray = new Value.WDLArray(
        new Type.String(),
        v.value.map(parts => {
            const formattedLine = (parts.value as Value.Base[])
                .map(part => part.coerce(new Type.String()).value)
                .join("\t");
            return new Value.String(formattedLine);
        })
    );
    serializeLines(formattedArray, writer);
}

export function serializeMap(map: Value.Base, outfile: Writer): void {
    if (!(map instanceof Value.Map)) {
        throw new Error("Expected Value.Map instance");
    }

    const lines: Value.Base[] = [];
    for (const [k, v] of map.value) {
        const ks = k.coerce(new Type.String()).value as string;
        const vs = v.coerce(new Type.String()).value as string;

        if (ks.includes("\n") || ks.includes("\t") || vs.includes("\n") || vs.includes("\t")) {
            throw new Error("write_map(): keys & values must not contain tab or newline characters");
        }

        lines.push(new Value.String(ks + "\t" + vs));
    }

    serializeLines(new Value.WDLArray(new Type.String(), lines), outfile);
}
export function basename(...args: any[]): Value.String {
    if (args.length < 1 || args.length > 2) throw new Error("Invalid number of args");
    if (!(args[0] instanceof Value.String)) throw new Error("First argument must be string");

    let path = args[0].value;
    
    if (args.length > 1) {
        if (!(args[1] instanceof Value.String)) throw new Error("Second argument must be string");
        const suffix = args[1].value;
        if (path.endsWith(suffix)) {
            path = path.slice(0, -suffix.length);
        }
    }

    return new Value.String(path.split('/').pop() || '');
}


export function parseBoolean(s: string): Value.Boolean {
    const value = s.trim().toLowerCase();
    if (value === "true") return new Value.Boolean(true);
    if (value === "false") return new Value.Boolean(false);
    throw new WDLError.InputError('read_boolean(): file content is not "true" or "false"');
}

export function parseJson(s: string): Value.Base {
    return Value.fromJson(new Type.Any(), JSON.parse(s));
}
