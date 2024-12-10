import * as Type from "./type.ts";
import * as Expr from "./expr.ts";
import * as Env from "./env.ts";
import * as WDLError from "./error.ts";
import { logger } from "./runtime/logger.ts";

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
  abstract clone():Base;
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
  override clone(): Base {
    return new Pair(this.type.left_type,this.type.right_type,this.value,this.expr);
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
  override clone(): Base {
    return new Struct(this.type as Type.WDLObject | Type.StructInstance,this.value,this.expr,this.extra);
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
  override clone(): Base {
    return new Null(this.expr)
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
  override clone(): Base {
    return new Boolean(this.value as boolean,this.expr);
  }
}

export class Float extends Base {
  constructor(value: number, expr: Expr.Base | null = null) {
    super(new Type.Float(), value, expr);
  }
  override clone(): Base {
    return new Float(this.value as number,this.expr);
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
  override clone(): Base {
    return new Int(this.value as number,this.expr);
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
  override clone(): Base {
    return new String(this.value as string,this.expr,this.type);
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
  override clone(): Base {
    return new File(this.value as string,this.expr);
  }

}

export class Directory extends String {
  constructor(value: string, expr: Expr.Base | null = null) {
    super(value, expr, new Type.Directory());
  }
  override clone(): Directory {
    return new Directory(this.value as string,this.expr);
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
  override clone(): Base {
    return new WDLArray(this.type.itemType,this.value,this.expr)
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
  override clone(): Base {
    return new Map(this.type.itemType,this.value,this.expr);
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
function _infer_from_json(j: any): Base {
  if (typeof j === "string") {
      return new String(j);
  }
  if (typeof j === "boolean") {
      return new Boolean(j); 
  }
  if (Number.isInteger(j)) {
      return new Int(j);
  }
  if (typeof j === "number") {
      return new Float(j);
  }
  if (j === null) {
      return new Null();
  }
  
  // compound: don't yet try to infer unified types for nested values, since we expect a coercion
  // to a StructInstance type to follow in short order, providing the expected item/member types
  if (Array.isArray(j)) {
      return new WDLArray(
          new Type.Any(),
          j.map(v => _infer_from_json(v))
      );
  }
  
  if (typeof j === "object") {
      const members: Record<string, Base> = {};
      const member_types: Record<string, Type.Base> = {};
      
      for (const [k, v] of Object.entries(j)) {
          members[k] = _infer_from_json(v);
          member_types[k] = members[k].type;
      }
      
      return new Struct(
          new Type.WDLObject(member_types),
          members
      );
  }
  
  throw new WDLError.InputError(`couldn't construct value from: ${JSON.stringify(j)}`);
}
export function fromJson(type: Type.Base, value: any): Base {
  /**
   * Instantiate a WDL value of the specified type from a parsed JSON value (str, int, float, list,
   * dict, or null).
   *
   * If type is Type.Any(), attempts to infer a WDL type & value from the JSON's
   * intrinsic types. This isn't ideal; for example, Files can't be distinguished from Strings, and
   * JSON lists and dicts with heterogeneous item types may give undefined results.
   *
   * @throws InputError if the given value isn't coercible to the specified type
   */
  
  if (type instanceof Type.Any) {
      return _infer_from_json(value);
  }
  
  if ((type instanceof Type.Boolean || type instanceof Type.Any) && 
      typeof value === "boolean") {
      return new Boolean(value);
  }
  
  if ((type instanceof Type.Int || type instanceof Type.Any) && 
      Number.isInteger(value)) {
      return new Int(value);
  }
  
  if ((type instanceof Type.Float || type instanceof Type.Any) && 
      (typeof value === "number")) {
      return new Float(Number(value));
  }
  
  if (type instanceof Type.File && typeof value === "string") {
      return new File(value);
  }
  
  if (type instanceof Type.Directory && typeof value === "string") {
      return new Directory(value);
  }
  
  if ((type instanceof Type.String || type instanceof Type.Any) && 
      typeof value === "string") {
      return new String(value);
  }
  
  if (type instanceof Type.WDLArray && Array.isArray(value)) {
      return new WDLArray(
          type.itemType,
          value.map(item => fromJson(type.itemType, item))
      );
  }
  
  if (type instanceof Type.Pair && 
      typeof value === "object" && 
      value !== null &&
      Object.keys(value).length === 2 && 
      "left" in value && 
      "right" in value) {
      return new Pair(
          type.left_type,
          type.right_type,
          [
              fromJson(type.left_type, value.left),
              fromJson(type.right_type, value.right)
          ]
      );
  }
  
  if (type instanceof Type.Map && 
      new Type.String().coerces(type.itemType[0]) && 
      typeof value === "object" && 
      value !== null) {
      const items: [Base, Base][] = [];
      for (const [k, v] of Object.entries(value)) {
          items.push([
              new String(k).coerce(type.itemType[0]),
              fromJson(type.itemType[1], v)
          ]);
      }
      return new Map(type.itemType, items);
  }
  
  if (type instanceof Type.StructInstance && 
      typeof value === "object" && 
      value !== null && 
      type.members !== null && 
      Object.keys(type.members).length > 0) {
      // Check required fields
      for (const [k, ty] of Object.entries(type.members)) {
          if (!(k in value) && !ty.optional) {
              throw new WDLError.InputError(
                  `initializer for struct ${type.toString()} omits required field(s)`
              );
          }
      }

      const members: Record<string, Base> = {};
      const extra = new Set<string>();
      
      for (const [k, v] of Object.entries(value)) {
          if (!(k in type.members)) {
              extra.add(k);
          } else {
              try {
                  members[k] = fromJson(type.members[k], v);
              } catch (error) {
                  if (error instanceof WDLError.InputError) {
                      throw new WDLError.InputError(
                          `couldn't initialize struct ${type.toString()} ${type.members[k]} ${k} from ${JSON.stringify(v)}`
                      );
                  }
                  throw error;
              }
          }
      }
      
      return new Struct(type, members,undefined, extra );
  }
  
  if (type.optional && value === null) {
      return new Null();
  }
  
  throw new WDLError.InputError(
      `couldn't construct ${type.toString()} from ${JSON.stringify(value)}`
  );
}
type PathRewriteFunction = (v: File | Directory) => string | null;
export type FileOrDirectory = File | Directory
export function isFileOrDirectory(v:Base):v is FileOrDirectory {
  return v instanceof File || v instanceof Directory;
}
export function isDirectory(v:Base):v is Directory {
  return v instanceof Directory;
}
function isTuple(arr: unknown):arr is [unknown,unknown] {
  // タプルは'length'プロパティが読み取り専用
  return Object.getOwnPropertyDescriptor(arr, 'length')?.writable === false;
}
function isObject(value: unknown): value is Record<string, Base> {
  return typeof value === 'object' && value !== null;
}
function isBase(value: unknown): value is Base {
  return value instanceof Base;
}
export function rewritePaths(v: Base, f: PathRewriteFunction): Base {
  /**
   * Produce a deep copy of the given Value with all File & Directory paths (including those nested
   * inside compound Values) rewritten by the given function. The function may return null to
   * replace the File/Directory value with null.
   */
  function mapPaths(w: Base): Base {
    const copy:Base = w.clone();
    const value = copy.value    
    if (isFileOrDirectory(copy)) {
        const fw = f(copy);
        if (fw === null) {
            return new Null(copy.expr);
        }
        copy.value = fw;
    }
    // recursive descent into compound Values
    else if (isTuple(value) && value.length === 2) {
      if (!value.every(x => x instanceof Base)) {
          throw new Error("Invalid tuple value");
      }
      copy.value = [mapPaths(value[0] as Base), mapPaths(value[1] as Base)];
    }
    else if (Array.isArray(value)) {
          const value2: any[] = [];
          for (const elt of value) {
              if (Array.isArray(elt)) {
                  if (elt.length !== 2 || !elt.every(x => x instanceof Base)) {
                      throw new Error("Invalid tuple structure");
                  }
                  value2.push([mapPaths(elt[0]), mapPaths(elt[1])]);
              } else {
                  if (!(elt instanceof Base)){
                      throw new Error("Invalid array element");
                  }
                  value2.push(mapPaths(elt));
              }
          }
          copy.value = value2;
      }
      else if (isObject(value)) {
          const value3: { [key: string]: Base } = {};
          for (const key in value) {
              const val = value[key]
              if (!isBase(val)) {
                  throw new Error(`Invalid value for key: ${key}`);
              }
              value3[key] = mapPaths(val);
          }
          copy.value = value3;
      }
      else {
          if (!(copy.value === null ||
            typeof value === "string" || typeof value === "number" || typeof value === "boolean" )) {
              throw new Error(`Invalid value=${copy.value} type=${Object.getPrototypeOf(copy).constructor.name}`);
          }
      }
      return copy;
  }

  return mapPaths(v);
}
export function rewriteEnvPaths(
  env: Env.Bindings<Base>, f: PathRewriteFunction
) : Env.Bindings<Base>{
  /*
  Produce a deep copy of the given Value Env with all File & Directory paths rewritten by the
  given function.
  */
  return env.map((binding)=>new Env.Binding(binding.name, rewritePaths(binding.value, f)))
}
