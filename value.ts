import * as Type from "./type.ts";
import * as Expr from "./expr.ts";
import * as WDLError from "./error.ts";

export abstract class Base {
  type: Type.Base;
  value: unknown;
  protected _expr: Expr.Base | undefined;

  constructor(type: Type.Base, value: unknown, expr: Expr.Base | null = null) {
    if (!(type instanceof Type.Base)) {
      throw new Error("Type must be instance of Type.Base");
    }
    this.type = type;
    if (this.type.optional && !(this instanceof Null)) {
      this.type = this.type.copy(false); // normalize runtime type
    }
    this.value = value;
    this._expr = undefined;
    if (expr) {
      this.expr = expr;
    }
  }

  equals(other: Base): boolean {
    if (this.value === null) {
      return other.value === null;
    }
    return this.type.equals(other.type) && this.value === other.value;
  }

  toString(): string {
    return JSON.stringify(this.json);
  }

  get expr(): Expr.Base | undefined {
    return this._expr;
  }

  set expr(rhs: Expr.Base) {
    const oldExpr = this._expr;
    if (rhs !== oldExpr) {
      this._expr = rhs;
      // recursively replace old_expr in children
      const stack = [...this.children];
      while (stack.length) {
        const desc = stack.pop()!;
        if (desc.expr === oldExpr) {
          desc._expr = rhs;
          stack.push(...desc.children);
        }
      }
    }
  }

  coerce(desiredType: Type.Base | null = null): Base {
    if (desiredType instanceof Type.String) {
      return new String(this.toString(), this.expr);
    }
    if (
      desiredType instanceof Type.WDLArray &&
      this.type.coerces(desiredType.itemType, false)
    ) {
      return new WDLArray(
        desiredType,
        [this.coerce(desiredType.itemType)],
        this.expr
      );
    }
    if (desiredType && !this.type.coerces(desiredType)) {
      throw new WDLError.InputError(
        `cannot coerce ${this.type.toString()} to ${desiredType.toString()}`
      );
    }
    return this;
  }

  expect(desiredType: Type.Base | null = null): Base {
    return this.coerce(desiredType);
  }

  get json(): unknown {
    return this.value;
  }

  get children(): Iterable<Base> {
    return [];
  }
}
export class Pair extends Base {
  override value: [Base, Base];
  override type: Type.Pair;

  constructor(
    left_type: Type.Base,
    right_type: Type.Base,
    value: [Base, Base],
    expr?: Expr.Base
  ) {
    super(new Type.Pair(left_type, right_type), value, expr);
    this.value = value;
    this.type = new Type.Pair(left_type, right_type);
  }

  override toString(): string {
    return `(${this.value[0]},${this.value[1]})`;
  }

  override get json(): unknown {
    return { left: this.value[0].json, right: this.value[1].json };
  }

  override get children(): Iterable<Base> {
    return [this.value[0], this.value[1]];
  }

  override coerce(desired_type?: Type.Base): Base {
    if (desired_type instanceof Type.Pair && desired_type !== this.type) {
      return new Pair(
        desired_type.left_type,
        desired_type.right_type,
        [
          this.value[0].coerce(desired_type.left_type),
          this.value[1].coerce(desired_type.right_type),
        ],
        this.expr
      );
    }
    return super.coerce(desired_type);
  }
}

export class Struct extends Base {
  override value: Record<string, Base>;
  extra: Set<string>;

  constructor(
    type: Type.WDLObject | Type.StructInstance,
    value: Record<string, Base>,
    expr?: Expr.Base,
    extra: Set<string> = new Set()
  ) {
    super(type, value, expr);
    this.value = { ...value };
    this.extra = extra;

    if (type instanceof Type.StructInstance) {
      if (type.members) {
        for (const k of Object.keys(type.members)) {
          if (!(k in this.value)) {
            if (!type.members[k].optional)
              throw new Error("Missing required member");
            this.value[k] = new Null();
          }
        }
      }
    }
  }

  override coerce(desired_type?: Type.Base): Base {
    if (desired_type instanceof Type.StructInstance) {
      return this._coerceToStruct(desired_type);
    }
    if (desired_type instanceof Type.Map) {
      return this._coerceToMap(desired_type);
    }
    if (
      !(
        desired_type instanceof Type.Any ||
        desired_type instanceof Type.WDLObject
      )
    ) {
      this._evalError(`cannot coerce struct to ${desired_type}`);
    }
    return this; // No-op for Object, awaiting further coercion
  }

  private _coerceToStruct(desired_type: Type.StructInstance): Base {
    if (
      this.type instanceof Type.StructInstance &&
      this.type.typeId === desired_type.typeId
    ) {
      return this;
    }

    try {
      this.type.check(desired_type);
    } catch (ex) {
      const msg =
        "unusable runtime struct initializer" +
        (ex instanceof Error ? `, ${ex.message}` : "");
      this._evalError(msg);
    }

    const members: Record<string, Base> = {};
    const extra = new Set<string>();
    for (const k of Object.keys(this.value)) {
        if(desired_type.members){
      if (!(k in desired_type.members)) {
        extra.add(k);
      } else {
        try {
          members[k] = this.value[k].coerce(desired_type.members[k]);
        } catch (exc) {
          if (exc instanceof Error && exc.message.includes("member of struct"))
            throw exc;
          const msg = `runtime type mismatch initializing ${desired_type.members[k]} ${k} member of struct ${desired_type.typeName}: ${exc}`;
          this._evalError(msg);
        }
      }
    }
    }
    return new Struct(desired_type, members, this.expr, extra);
  }

  private _coerceToMap(desired_type: Type.Map): Map {
    if (!(this.type instanceof Type.WDLObject))
      throw new Error("Type mismatch");

    const key_type = desired_type.itemType[0];
    if (!new Type.String().coerces(key_type)) {
      this._evalError(
        `cannot coerce struct member names to ${desired_type} keys`
      );
    }
    const value_type = desired_type.itemType[1];
    const entries: [Base, Base][] = [];

    for (const [k, v] of Object.entries(this.value)) {
      if (!(v instanceof Null) || value_type.optional) {
        const map_key = new String(k).coerce(key_type);
        const map_value = this.type.members[k]?.coerces(value_type)
          ? v.coerce(value_type)
          : (() => {
              this._evalError(
                `cannot coerce struct member ${this.type.members[k]} ${k} to ${value_type} map value`
              );
              return new Null();
            })();

        entries.push([map_key, map_value]);
      }
    }
    return new Map(desired_type.itemType, entries);
  }

  private _evalError(msg: string): void {
    if (this.expr) {
      throw new WDLError.EvalError(this.expr, msg);
    } else {
      throw new WDLError.RuntimeError(msg);
    }
  }

  override toString(): string {
    return `{${Object.entries(this.value)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ")}}`;
  }

  override get json(): unknown {
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(this.value)) {
      result[k] = v.json;
    }
    return result;
  }

  override get children(): Iterable<Base> {
    return Object.values(this.value);
  }
}

/**
 * Represents the missing value which optional inputs may take.
 * `type` and `value` are both null.
 */
export class Null extends Base {
  constructor(expr: Expr.Base | null = null) {
    super(new Type.Any(false, true), null, expr);
  }

  override coerce(desiredType: Type.Base | null = null): Base {
    if (
      desiredType &&
      !desiredType.optional &&
      !(desiredType instanceof Type.Any)
    ) {
      if (
        desiredType instanceof Type.File ||
        desiredType instanceof Type.Directory
      ) {
        // This case arises processing task outputs; we convert nonexistent paths to Null
        // before coercing to the declared output type (+ checking whether it's optional).
        throw new Error();
      }
      // normally the typechecker should prevent the following cases, but it might have had
      // check_quant=false
      if (desiredType instanceof Type.String) {
        return new String("", this.expr);
      }
      if (desiredType instanceof Type.WDLArray && desiredType.itemType.optional) {
        return new WDLArray(
          desiredType,
          [this.coerce(desiredType.itemType)],
          this.expr
        );
      }
      if (this.expr) {
        throw new WDLError.NullValue(this.expr);
      }
      throw new WDLError.InputError(
        "'null' for non-optional input/declaration"
      );
    }
    return this;
  }

  override toString(): string {
    return "null";
  }

  override get json(): unknown {
    return null;
  }
}
export class Boolean extends Base {
  constructor(value: boolean, expr: Expr.Base | null = null) {
    super(new Type.Boolean(), value, expr);
  }
}

export class Float extends Base {
  constructor(value: number, expr: Expr.Base | null = null) {
    super(new Type.Float(), value, expr);
  }

  override toString(): string {
    return (this.value as number).toFixed(6);
  }
}

export class Int extends Base {
    override value: number;
  constructor(value: number, expr: Expr.Base | null = null) {
    super(new Type.Int(), value, expr);
    this.value = value;
  }

  override coerce(desiredType: Type.Base | null = null): Base {
    if (desiredType instanceof Type.Float) {
      return new Float(this.value as number, this.expr);
    }
    return super.coerce(desiredType);
  }
}

export class String extends Base {
  override value: string;
  constructor(
    value: string,
    expr: Expr.Base | null = null,
    subtype: Type.Base | null = null
  ) {
    subtype = subtype || new Type.String();
    super(subtype, value, expr);
    this.value = value;
  }

  override coerce(desiredType: Type.Base | null = null): Base {
    if (desiredType instanceof Type.String) {
      return new String(this.value, this.expr);
    }
    if (desiredType instanceof Type.File && !(this instanceof File)) {
      return new File(this.value, this.expr);
    }
    if (desiredType instanceof Type.Directory && !(this instanceof Directory)) {
      return new Directory(this.value, this.expr);
    }
    try {
      if (desiredType instanceof Type.Int) {
        return new Int(parseInt(this.value), this.expr);
      }
      if (desiredType instanceof Type.Float) {
        return new Float(parseFloat(this.value), this.expr);
      }
    } catch (exn) {
      const msg = `coercing String to ${desiredType}: ${exn}`;
      throw this.expr
        ? new WDLError.EvalError(this.expr, msg)
        : new WDLError.RuntimeError(msg);
    }
    return super.coerce(desiredType);
  }
}

export class File extends String {
  constructor(value: string, expr: Expr.Base | null = null) {
    super(value, expr, new Type.File());
    if (value !== value.replace(/\/+$/, "")) {
      throw new WDLError.InputError("WDL.Value.File invalid path: " + value);
    }
  }
}

export class Directory extends String {
  constructor(value: string, expr: Expr.Base | null = null) {
    super(value, expr, new Type.Directory());
  }
}

export class WDLArray extends Base {
  override value: Base[];
  override type: Type.WDLArray;

  constructor(
    itemType: Type.Base,
    value: Base[],
    expr: Expr.Base | null = null
  ) {
    const arrayType = new Type.WDLArray(itemType, false, value.length > 0);
    super(arrayType, value, expr);
    this.value = value;
    this.type = arrayType;
  }

  override get json(): unknown {
    return this.value.map((item) => item.json);
  }

  override toString(): string {
    return "[" + this.value.map((item) => item.toString()).join(", ") + "]";
  }

  override get children(): Iterable<Base> {
    return this.value;
  }

  override coerce(desiredType: Type.Base | null = null): Base {
    if (desiredType instanceof Type.WDLArray) {
      if (desiredType.nonempty && !this.value.length) {
        if (this.expr) {
          throw new WDLError.EmptyArray(this.expr);
        } else {
          throw new Error("Empty array for Array+ input/declaration");
        }
      }
      if (
        desiredType.itemType === this.type.itemType ||
        desiredType.itemType instanceof Type.Any
      ) {
        return this;
      }
      return new WDLArray(
        desiredType,
        this.value.map((v) => v.coerce(desiredType.itemType)),
        this.expr
      );
    }
    return super.coerce(desiredType);
  }
}

export class Map extends Base {
  override value: [Base, Base][];
  override type: Type.Map;

  constructor(
    itemType: [Type.Base, Type.Base],
    value: [Base, Base][],
    expr: Expr.Base | null = null
  ) {
    const mapType = new Type.Map(itemType);
    super(mapType, value, expr);
    this.value = value;
    this.type = mapType;
  }

  override get json(): unknown {
    const ans: { [key: string]: unknown } = {};
    if (!this.type.itemType[0].coerces(new Type.String())) {
      const msg = `cannot write ${this.type.toString()} to JSON`;
      throw this.expr
        ? new WDLError.EvalError(this.expr, msg)
        : new WDLError.RuntimeError(msg);
    }
    for (const [k, v] of this.value) {
      const kstr = k.coerce(new Type.String()).value as string;
      if (!(kstr in ans)) {
        ans[kstr] = v.json;
      }
    }
    return ans;
  }

  override toString(): string {
    const items: { [key: string]: string } = {};
    for (const [k, v] of this.value) {
      items[k.toString()] = v.toString();
    }
    return (
      "{" +
      Object.entries(items)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ") +
      "}"
    );
  }

  override get children(): Iterable<Base> {
    return this.value.flatMap(([k, v]) => [k, v]);
  }

  override coerce(desiredType: Type.Base | null = null): Base {
    if (desiredType instanceof Type.Map && !desiredType.equals(this.type)) {
      return new Map(
        desiredType.itemType,
        this.value.map(([k, v]) => [
          k.coerce(desiredType.itemType[0]),
          v.coerce(desiredType.itemType[1]),
        ]),
        this.expr
      );
    }
    // ... rest of coerce implementation for Map
    return super.coerce(desiredType);
  }
}

// Utility functions
export function fromJson(type: Type.Base, value: any): Base {
  if (value === null && type.optional) {
    return new Null();
  }

  if (type instanceof Type.Boolean && typeof value === "boolean") {
    return new Boolean(value);
  }

  if (type instanceof Type.Int && Number.isInteger(value)) {
    return new Int(value);
  }

  // ... その他の型変換の実装

  throw new WDLError.InputError(
    `Couldn't construct ${type.toString()} from ${JSON.stringify(value)}`
  );
}

// Additional utility functions would follow...
