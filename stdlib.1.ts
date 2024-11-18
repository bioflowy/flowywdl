import * as Value from './value.ts';
import * as Type from './type.ts'
import * as Env from "./env.ts";
import * as Expr from "./expr.ts";
import * as WDLError from "./error.ts";
import { Writer } from "io/types.ts";

export class TaskOutputs extends Base {
    constructor(...args: any[]) {
        super(...args);
        [
            ["stdout", [], new Type.File(), notImpl],
            ["stderr", [], new Type.File(), notImpl],
            ["glob", [new Type.String()], new Type.WDLArray(new Type.File()), notImpl],
        ].forEach(([name, argumentTypes, returnType, F]) => {
            Object.defineProperty(this, name, {
                value: new StaticFunction(name, argumentTypes, returnType, F)
            });
        });
    }
}




class At extends EagerFunction {
    // Special function for array access arr[index], returning the element type
    //                   or map access map[key], returning the value type

    inferType(expr: Expr.Apply): Type.Base {
        if (expr.arguments.length !== 2) {
            throw new Error("Expected 2 args");
        }

        const lhs = expr.arguments[0];
        const rhs = expr.arguments[1];

        if (lhs.type instanceof Type.WDLArray) {
            if (lhs instanceof Expr.WDLArray && !lhs.items) {
                // the user wrote: [][idx]
                throw new WDLError.OutOfBounds(expr, "Cannot access empty array");
            }
            try {
                rhs.typecheck(new Type.Int());
            } catch (e) {
                if (e instanceof WDLError.StaticTypeMismatch) {
                    throw new WDLError.StaticTypeMismatch(rhs, new Type.Int(), rhs.type, "Array index");
                }
                throw e;
            }
            return lhs.type.itemType;
        }

        if (lhs.type instanceof Type.Map) {
            if (lhs.type.itemType === null) {
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
            // e.g. read_json(): assume lhs is Array[Any] or Struct
            return new Type.Any();
        }

        throw new WDLError.NotAnArray(lhs);
    }

    _callEager(expr: Expr.Apply, args: Value.Base[]): Value.Base {
        if (expr.arguments.length !== 2 || args.length !== 2) {
            throw new Error("Expected 2 args");
        }

        const lhs = args[0];
        const rhs = args[1];

        if (lhs instanceof Value.Map) {
            const mty = expr.arguments[0].type;
            let mkey = rhs;
            if (mty instanceof Type.Map) {
                mkey = mkey.coerce(mty.itemType[0]);
            }
            let ans = null;
            for (const [k, v] of lhs.value) {
                if (mkey.equals(k)) {
                    ans = v;
                    break;
                }
            }
            if (ans === null) {
                throw new WDLError.OutOfBounds(expr.arguments[1], "Map key not found");
            }
            return ans;
        } else if (lhs instanceof Value.Struct) {
            // allow member access from read_json() (issue #320)
            let skey :string | null = null;
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
        } else {
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
}


export class Or extends WDLFunction {
    // logical || with short-circuit evaluation
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
        const lhs = expr.arguments[0].eval(env, stdlib ).expect(new Type.Boolean()).value;
        if (lhs) {
            return new Value.Boolean(true);
        }
        return expr.arguments[1].eval(env, stdlib).expect(new Type.Boolean());
    }
}


class SelectFirst extends EagerFunction {
    inferType(expr: Expr.Apply): Type.Base {
        if (expr.arguments.length !== 1) {
            throw new WDLError.WrongArity(expr, 1);
        }

        const arg0ty = expr.arguments[0].type;
        if (!(arg0ty instanceof Type.WDLArray) ||
            (expr.arguments[0]._checkQuant && arg0ty.optional)) {
            throw new WDLError.StaticTypeMismatch(
                expr.arguments[0],
                new Type.WDLArray(new Type.Any()),
                arg0ty
            );
        }

        if (arg0ty.itemType instanceof Type.Any) {
            throw new WDLError.IndeterminateType(
                expr.arguments[0],
                "can't infer item type of empty array"
            );
        }

        return arg0ty.itemType.copy(false);
    }

    _callEager(expr: Expr.Apply, args: Value.Base[]): Value.Base {
        const arr = args[0].coerce(new Type.WDLArray(new Type.Any()));
        if (!(arr instanceof Value.WDLArray)) {
            throw new Error("Expected array value");
        }

        for (const arg of arr.value) {
            if (!(arg instanceof Value.Null)) {
                return arg;
            }
        }

        throw new WDLError.EvalError(
            expr,
            "select_first() given empty or all-null array; prevent this or append a default value"
        );
    }
}

class SelectAll extends EagerFunction {
    inferType(expr: Expr.Apply): Type.Base {
        if (expr.arguments.length !== 1) {
            throw new WDLError.WrongArity(expr, 1);
        }

        const arg0ty = expr.arguments[0].type;
        if (!(arg0ty instanceof Type.WDLArray) ||
            (expr.arguments[0]._checkQuant && arg0ty.optional)) {
            throw new WDLError.StaticTypeMismatch(
                expr.arguments[0],
                new Type.WDLArray(new Type.Any()),
                arg0ty
            );
        }

        if (arg0ty.itemType instanceof Type.Any) {
            throw new WDLError.IndeterminateType(
                expr.arguments[0],
                "can't infer item type of empty array"
            );
        }

        return new Type.WDLArray(arg0ty.itemType.copy(false ));
    }

    _callEager(expr: Expr.Apply, args: Value.Base[]): Value.Base {
        const arr = args[0].coerce(new Type.WDLArray(new Type.Any()));
        if (!(arr instanceof Value.WDLArray)) {
            throw new Error("Expected array value");
        }

        const arrty = arr.type;
        if (!(arrty instanceof Type.WDLArray)) {
            throw new Error("Expected array type");
        }

        return new Value.WDLArray(
            arrty.itemType.copy(false),
            arr.value.filter(arg => !(arg instanceof Value.Null))
        );
    }
}
class _ZipOrCross extends EagerFunction {
    // 'a array -> 'b array -> ('a,'b) array
    inferType(expr: Expr.Apply): Type.Base {
        if (expr.arguments.length !== 2) {
            throw new WDLError.WrongArity(expr, 2);
        }
        const arg0ty: Type.Base = expr.arguments[0].type;
        if (!(arg0ty instanceof Type.WDLArray) || (expr._check_quant && arg0ty.optional)) {
            throw new WDLError.StaticTypeMismatch(expr.arguments[0], new Type.WDLArray(new Type.Any()), arg0ty);
        }
        if (arg0ty.itemType instanceof Type.Any) {
            throw new WDLError.IndeterminateType(expr.arguments[0], "can't infer item type of empty array");
        }
        const arg1ty: Type.Base = expr.arguments[1].type;
        if (!(arg1ty instanceof Type.WDLArray) || (expr._check_quant && arg1ty.optional)) {
            throw new WDLError.StaticTypeMismatch(expr.arguments[1], new Type.WDLArray(new Type.Any()), arg1ty);
        }
        if (arg1ty.itemType instanceof Type.Any) {
            throw new WDLError.IndeterminateType(expr.arguments[1], "can't infer item type of empty array");
        }
        return new Type.WDLArray(
            new Type.Pair(arg0ty.itemType, arg1ty.itemType),
            arg0ty.nonempty || arg1ty.nonempty
        );
    }

    _coerceArgs(
        expr: Expr.Apply,
        args: Value.Base[]
    ): [Type.WDLArray, Value.WDLArray, Value.WDLArray] {
        const ty = this.inferType(expr);
        if (!(ty instanceof Type.WDLArray && ty.itemType instanceof Type.Pair)) {
            throw new Error("Type mismatch");
        }
        const lhs = args[0].coerce(new Type.WDLArray(ty.itemType.left_type));
        const rhs = args[1].coerce(new Type.WDLArray(ty.itemType.right_type));
        if (!(lhs instanceof Value.WDLArray && rhs instanceof Value.WDLArray)) {
            throw new Error("Argument type mismatch");
        }
        return [ty, lhs, rhs];
    }
}

class _Zip extends _ZipOrCross {
    _callEager(expr: Expr.Apply, args: Value.Base[]): Value.WDLArray {
        const [ty, lhs, rhs] = this._coerceArgs(expr, args);
        if (!(ty instanceof Type.WDLArray && ty.itemType instanceof Type.Pair)) {
            throw new Error("Type mismatch");
        }
        if (lhs.value.length !== rhs.value.length) {
            throw new WDLError.EvalError(expr, "zip(): input arrays must have equal length");
        }
        return new Value.WDLArray(
            ty.itemType,
            lhs.value.map((_, i) =>
                new Value.Pair(
                    ty.itemType.left_type, 
                    ty.itemType.right_type, 
                    [lhs.value[i], rhs.value[i]]
                )
            )
        );
    }
}

class _Cross extends _ZipOrCross {
    _callEager(expr: Expr.Apply, args: Value.Base[]): Value.WDLArray {
        const [ty, lhs, rhs] = this._coerceArgs(expr, args);
        if (!(ty instanceof Type.WDLArray && ty.itemType instanceof Type.Pair)) {
            throw new Error("Type mismatch");
        }
        return new Value.WDLArray(
            ty.itemType,
            lhs.value.flatMap(lhsItem =>
                rhs.value.map(rhsItem =>
                    new Value.Pair(ty.itemType.left_type, ty.itemType.right_type, [lhsItem, rhsItem])
                )
            )
        );
    }
}

class _Unzip extends EagerFunction {
    // Array[Pair[X,Y]] -> Pair[Array[X],Array[Y]]
    inferType(expr: Expr.Apply): Type.Base {
        if (expr.arguments.length !== 1) {
            throw new WDLError.WrongArity(expr, 1);
        }
        const arg0ty: Type.Base = expr.arguments[0].type;
        if (!(arg0ty instanceof Type.WDLArray) || 
            (expr._check_quant && arg0ty.optional) || 
            !(arg0ty.itemType instanceof Type.Pair) || 
            (expr._check_quant && arg0ty.itemType.optional)
        ) {
            throw new WDLError.StaticTypeMismatch(
                expr.arguments[0],
                new Type.WDLArray(new Type.Pair(new Type.Any(), new Type.Any())),
                arg0ty
            );
        }
        return new Type.Pair(
            new Type.WDLArray(arg0ty.itemType.left_type, arg0ty.nonempty),
            new Type.WDLArray(arg0ty.itemType.right_type, arg0ty.nonempty)
        );
    }

    _callEager(expr: Expr.Apply, args: Value.Base[]): Value.Pair {
        const pty = this.inferType(expr);
        if (!(pty instanceof Type.Pair)) {
            throw new Error("Type mismatch");
        }
        const lty = pty.left_type;
        const rty = pty.right_type;
        const arr = args[0];
        if (!(lty instanceof Type.WDLArray && rty instanceof Type.WDLArray && arr instanceof Value.WDLArray)) {
            throw new Error("Argument type mismatch");
        }
        return new Value.Pair(
            lty,
            rty,
            [
                new Value.WDLArray(lty.itemType, arr.value.map(p => p.value[0])),
                new Value.WDLArray(rty.itemType, arr.value.map(p => p.value[1]))
            ]
        );
    }
}

class _Flatten extends EagerFunction {
    // t array array -> t array
    inferType(expr: Expr.Apply): Type.Base {
        if (expr.arguments.length !== 1) {
            throw new WDLError.WrongArity(expr, 1);
        }
        expr.arguments[0].typecheck(new Type.WDLArray(new Type.Any()));
        const arg0ty = expr.arguments[0].type;
        if (!(arg0ty instanceof Type.WDLArray)) {
            throw new Error("Type mismatch");
        }
        if (arg0ty.itemType instanceof Type.Any) {
            return new Type.WDLArray(new Type.Any());
        }
        if (!(arg0ty.itemType instanceof Type.WDLArray) || (expr._check_quant && arg0ty.itemType.optional)) {
            throw new WDLError.StaticTypeMismatch(
                expr.arguments[0],
                new Type.WDLArray(new Type.WDLArray(new Type.Any())),
                arg0ty
            );
        }
        return new Type.WDLArray(arg0ty.itemType.itemType);
    }

    _callEager(expr: Expr.Apply, args: Value.Base[]): Value.Base {
        const ty = this.inferType(expr);
        if (!(ty instanceof Type.WDLArray)) {
            throw new Error("Type mismatch");
        }
        const ans: any[] = [];
        for (const row of args[0].coerce(new Type.WDLArray(ty)).value) {
            ans.push(...row.value);
        }
        return new Value.WDLArray(ty.itemType, ans);
    }
}

class _Transpose extends EagerFunction {
    // t array array -> t array array
    inferType(expr: Expr.Apply): Type.Base {
        if (expr.arguments.length !== 1) {
            throw new WDLError.WrongArity(expr, 1);
        }
        expr.arguments[0].typecheck(new Type.WDLArray(new Type.Any()));
        const arg0ty = expr.arguments[0].type;
        if (!(arg0ty instanceof Type.WDLArray)) {
            throw new Error("Type mismatch");
        }
        if (arg0ty.itemType instanceof Type.Any) {
            return new Type.WDLArray(new Type.Any());
        }
        if (!(arg0ty.itemType instanceof Type.WDLArray) || (expr._check_quant && arg0ty.itemType.optional)) {
            throw new WDLError.StaticTypeMismatch(
                expr.arguments[0],
                new Type.WDLArray(new Type.WDLArray(new Type.Any())),
                arg0ty
            );
        }
        return new Type.WDLArray(new Type.WDLArray(arg0ty.itemType.itemType));
    }

    _callEager(expr: Expr.Apply, args: Value.Base[]): Value.Base {
        const ty = this.inferType(expr);
        if (!(ty instanceof Type.WDLArray && ty.itemType instanceof Type.WDLArray)) {
            throw new Error("Type mismatch");
        }
        const mat = args[0].coerce(ty);
        if (!(mat instanceof Value.WDLArray)) {
            throw new Error("Argument type mismatch");
        }
        let n: number | null = null;
        const ans: Value.Base[] = [];
        for (const row of mat.value) {
            if (!(row instanceof Value.WDLArray)) {
                throw new Error("Argument type mismatch");
            }
            if (n === null) {
                n = row.value.length;
                for (let i = 0; i < row.value.length; i++) {
                    ans.push(new Value.WDLArray(ty.itemType, []));
                }
            }
            if (row.value.length !== n) {
                throw new WDLError.EvalError(expr, "transpose(): ragged input matrix");
            }
            for (let i = 0; i < row.value.length; i++) {
                ans[i].value.push(row.value[i]);
            }
        }
        return new Value.WDLArray(ty.itemType, ans);
    }
}

class _Range extends EagerFunction {
    // int -> int array
    inferType(expr: Expr.Apply): Type.Base {
        if (expr.arguments.length !== 1) {
            throw new WDLError.WrongArity(expr, 1);
        }
        expr.arguments[0].typecheck(new Type.Int());
        let nonempty = false;
        const arg0 = expr.arguments[0];
        if (arg0 instanceof Expr.Int && arg0.value > 0) {
            nonempty = true;
        }
        if (arg0 instanceof Expr.Apply && arg0.function_name === "length") {
            const arg00ty = arg0.args[0].type;
            if (arg00ty instanceof Type.WDLArray && arg00ty.nonempty) {
                nonempty = true;
            }
        }
        return new Type.WDLArray(new Type.Int(), nonempty);
    }

    _callEager(expr: Expr.Apply, args: Value.Base[]): Value.Base {
        const arg0 = args[0].coerce(new Type.Int());
        if (!(arg0 instanceof Value.Int)) {
            throw new Error("Argument type mismatch");
        }
        if (arg0.value < 0) {
            throw new WDLError.EvalError(expr, "range() got negative argument");
        }
        return new Value.WDLArray(new Type.Int(), Array.from({ length: arg0.value }, (_, x) => new Value.Int(x)));
    }
}
class _Prefix extends EagerFunction {
    // string -> t array -> string array
    // if input array is nonempty then so is output

    inferType(expr: Expr.Apply): Type.Base {
        if (expr.arguments.length !== 2) {
            throw new WDLError.WrongArity(expr, 2);
        }
        expr.arguments[0].typecheck(new Type.String());
        expr.arguments[1].typecheck(new Type.WDLArray(new Type.String()));
        const arg1ty = expr.arguments[1].type;
        return new Type.WDLArray(new Type.String(), arg1ty instanceof Type.WDLArray && arg1ty.nonempty);
    }

    _callEager(expr: Expr.Apply, args: Value.Base[]): Value.Base {
        const pfx = args[0].coerce(new Type.String()).value;
        return new Value.WDLArray(
            new Type.String(),
            args[1].value.map((s) => new Value.String(pfx + s.coerce(new Type.String()).value))
        );
    }
}

class _Suffix extends EagerFunction {
    // string -> t array -> string array
    // if input array is nonempty then so is output
    // Append a suffix to every element within the array

    inferType(expr: Expr.Apply): Type.Base {
        if (expr.arguments.length !== 2) {
            throw new WDLError.WrongArity(expr, 2);
        }
        expr.arguments[0].typecheck(new Type.String());
        expr.arguments[1].typecheck(new Type.WDLArray(new Type.String()));
        const arg1ty = expr.arguments[1].type;
        return new Type.WDLArray(new Type.String(), arg1ty instanceof Type.WDLArray && arg1ty.nonempty);
    }

    _callEager(expr: Expr.Apply, args: Value.Base[]): Value.Base {
        const sfx = args[0].coerce(new Type.String()).value;
        return new Value.WDLArray(
            new Type.String(),
            args[1].value.map((s) => new Value.String(s.coerce(new Type.String()).value + sfx))
        );
    }
}

class _Quote extends EagerFunction {
    // t array -> string array
    // if input array is nonempty then so is output
    // Append a suffix to every element within the array

    private quote: string;

    constructor(squote: boolean = false) {
        super();
        this.quote = squote ? "'" : '"';
    }

    inferType(expr: Expr.Apply): Type.Base {
        if (expr.arguments.length !== 1) {
            throw new WDLError.WrongArity(expr, 1);
        }
        expr.arguments[0].typecheck(new Type.WDLArray(new Type.String()));
        const arg0ty = expr.arguments[0].type;
        const nonempty = arg0ty instanceof Type.WDLArray && arg0ty.nonempty;
        return new Type.WDLArray(new Type.String(), nonempty);
    }

    _callEager(expr: Expr.Apply, args: Value.Base[]): Value.Base {
        return new Value.WDLArray(
            new Type.String(),
            args[0].value.map(
                (s) => new Value.String(`${this.quote}${s.coerce(new Type.String()).value}${this.quote}`)
            )
        );
    }
}

class _Keys extends EagerFunction {
    inferType(expr: Expr.Apply): Type.Base {
        if (expr.arguments.length !== 1) {
            throw new WDLError.WrongArity(expr, 1);
        }
        const arg0ty = expr.arguments[0].type;
        if (!(arg0ty instanceof Type.Map) || (expr._check_quant && arg0ty.optional)) {
            throw new WDLError.StaticTypeMismatch(expr.arguments[0], new Type.Map([new Type.Any(), new Type.Any()]), arg0ty);
        }
        return new Type.WDLArray(arg0ty.itemType[0].copy());
    }

    _callEager(expr: Expr.Apply, args: Value.Base[]): Value.Base {
        if (!(args[0] instanceof Value.Map)) throw new Error("Type mismatch");
        const mapty = args[0].type;
        if (!(mapty instanceof Type.Map)) throw new Error("Type mismatch");
        return new Value.WDLArray(
            mapty.itemType[0],
            args[0].value.map((p) => p[0].coerce(mapty.itemType[0]))
        );
    }
}

class _AsPairs extends EagerFunction {
    inferType(expr: Expr.Apply): Type.Base {
        if (expr.arguments.length !== 1) {
            throw new WDLError.WrongArity(expr, 1);
        }
        const arg0ty = expr.arguments[0].type;
        if (!(arg0ty instanceof Type.Map) || (expr._check_quant && arg0ty.optional)) {
            throw new WDLError.StaticTypeMismatch(expr.arguments[0], new Type.Map([new Type.Any(), new Type.Any()]), arg0ty);
        }
        return new Type.WDLArray(new Type.Pair(arg0ty.itemType[0], arg0ty.itemType[1]));
    }

    _callEager(expr: Expr.Apply, args: Value.Base[]): Value.Base {
        if (!(args[0] instanceof Value.Map)) throw new Error("Type mismatch");
        const mapty = args[0].type;
        if (!(mapty instanceof Type.Map)) throw new Error("Type mismatch");
        const pairty = new Type.Pair(mapty.itemType[0], mapty.itemType[1]);
        return new Value.WDLArray(
            pairty,
            args[0].value.map((p) => new Value.Pair(mapty.itemType[0], mapty.itemType[1], p))
        ).coerce(this.inferType(expr));
    }
}

class _CollectByKey extends EagerFunction {
    inferType(expr: Expr.Apply): Type.Base {
        if (expr.arguments.length !== 1) {
            throw new WDLError.WrongArity(expr, 1);
        }
        const arg0ty = expr.arguments[0].type;
        if (
            !(arg0ty instanceof Type.WDLArray) ||
            !(arg0ty.itemType instanceof Type.Pair) ||
            (expr._check_quant && (arg0ty.optional || arg0ty.itemType.optional))
        ) {
            throw new WDLError.StaticTypeMismatch(expr.arguments[0], new Type.WDLArray(new Type.Pair(new Type.Any(), new Type.Any())), arg0ty);
        }
        return new Type.Map([arg0ty.itemType.left_type, new Type.WDLArray(arg0ty.itemType.right_type)]);
    }

    _callEager(expr: Expr.Apply, args: Value.Base[]): Value.Base {
        if (!(args[0] instanceof Value.WDLArray)) throw new Error("Type mismatch");
        const arg0ty = args[0].type;
        if (!(arg0ty instanceof Type.WDLArray && arg0ty.itemType instanceof Type.Pair)) throw new Error("Type mismatch");

        const items: Record<string, [Value.Base, Value.Base[]]> = {};
        for (const p of args[0].value) {
            if (!(p instanceof Value.Pair)) throw new Error("Type mismatch");
            const ek = p.value[0].coerce(arg0ty.itemType.left_type);
            const ev = p.value[1].coerce(arg0ty.itemType.right_type);
            const sk = String(ek);
            if (items[sk]) {
                items[sk][1].push(ev);
            } else {
                items[sk] = [ek, [ev]];
            }
        }

        return new Value.Map(
            [arg0ty.itemType.left_type, new Type.WDLArray(arg0ty.itemType.right_type)],
            Object.values(items).map(([ek, evs]) => [ek, new Value.WDLArray(arg0ty.itemType.right_type, evs)])
        );
    }
}

class _AsMap extends _CollectByKey {
    // as_map(): run collect_by_key() and pluck the values out of the length-1 arrays

    inferType(expr: Expr.Apply): Type.Base {
        const collectedty = super.inferType(expr);
        if (!(collectedty instanceof Type.Map)) throw new Error("Type mismatch");
        const arrayty = collectedty.itemType[1];
        if (!(arrayty instanceof Type.WDLArray)) throw new Error("Type mismatch");
        return new Type.Map([collectedty.itemType[0], arrayty.itemType]);
    }

    _callEager(expr: Expr.Apply, args: Value.Base[]): Value.Base {
        const collected = super._callEager(expr, args);
        if (!(collected instanceof Value.Map)) throw new Error("Type mismatch");
        const collectedty = collected.type;
        if (!(collectedty instanceof Type.Map)) throw new Error("Type mismatch");
        const arrayty = collectedty.itemType[1];
        if (!(arrayty instanceof Type.WDLArray)) throw new Error("Type mismatch");

        const singletons = collected.value.map(([k, vs]) => {
            if (!(vs instanceof Value.WDLArray && vs.value.length > 0)) throw new Error("Type mismatch");
            if (vs.value.length > 1) {
                throw new WDLError.EvalError(expr, `duplicate keys supplied to as_map(): ${k}`);
            }
            return [k, vs.value[0]];
        });

        return new Value.Map([collectedty.itemType[0], arrayty.itemType], singletons);
    }
}
