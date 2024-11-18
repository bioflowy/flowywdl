// WDL data types
//
// WDL has both atomic types such as `Int`, `Boolean`, and `String`; and
// parametric types like `Array[String]` and
// `Map[String, Array[Array[Float]]]`. Here, each type is represented by an
// immutable instance of a TypeScript class inheriting from `TypeBase`. Such
// types are associated with expressions, statically prior to evaluation, as well
// as with values and identifier bindings after evaluation.

export abstract class Base {
  protected _optional: boolean = false;

  // Abstract Typebase class for WDL types
  //
  // All instances are immutable.

  // True if this is the same type as, or can be coerced to, `rhs`.
  coerces(rhs: Base, checkQuant: boolean = true): boolean {
    try {
      this.check(rhs, checkQuant);
    } catch (e) {
      if (e instanceof TypeError) {
        return false;
      }
    }
    return true;
  }

  // Verify this is the same type as, or can be coerced to `rhs`.
  check(rhs: Base, checkQuant: boolean = true): void {
    if (
      !checkQuant &&
      rhs instanceof WDLArray &&
      this.coerces(rhs.itemType, checkQuant)
    ) {
      // coerce T to Array[T]
      return;
    }
    if (
      this.constructor.name !== rhs.constructor.name &&
      !(rhs instanceof Any)
    ) {
      throw new TypeError();
    }
    this.checkOptional(rhs, checkQuant);
  }

  protected checkOptional(rhs: Base, checkQuant: boolean): void {
    if (checkQuant && this.optional && !rhs.optional && !(rhs instanceof Any)) {
      throw new TypeError();
    }
  }

  get optional(): boolean {
    return this._optional;
  }

  get parameters(): Base[] {
    return [];
  }

  copy(optional?: boolean): Base {
    const newInstance = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this
    );
    if (optional !== undefined) {
      newInstance._optional = optional;
    }
    return newInstance;
  }

  toString(): string {
    return this.constructor.name + (this.optional ? "?" : "");
  }

  equals(rhs: any): boolean {
    return rhs instanceof Base && this.toString() === rhs.toString();
  }
}
export class Pair extends Base {
  /**
   * Pair type, parameterized by the left and right item types.
   */
  left_type: Base;
  right_type: Base;

  constructor(left_type: Base, right_type: Base, optional: boolean = false) {
      super();
      this._optional = optional;
      this.left_type = left_type;
      this.right_type = right_type;
  }

  override toString(): string {
      return `Pair[${this.left_type},${this.right_type}]${this.optional ? "?" : ""}`;
  }

  override get parameters(): Base[] {
      return [this.left_type, this.right_type];
  }

  override check(rhs: Base, check_quant: boolean = true): void {
      if (rhs instanceof Pair) {
          this.left_type.check(rhs.left_type, check_quant);
          this.right_type.check(rhs.right_type, check_quant);
          return this.checkOptional(rhs, check_quant);
      }
      super.check(rhs, check_quant);
  }
}

export class WDLObject extends Base {
  /**
   * Represents the type of object{} literals and the known-only-at-runtime return value of
   * read_json(). This type is expected to exist only transiently before coercion to a
   * StructInstance with known member types. This is used only to support struct initialization.
   */
  members: Record<string, Base>;

  constructor(members: Record<string, Base>) {
      super();
      this.members = members;
  }

  override toString(): string {
      const membersList = Object.keys(this.members)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([name, ty]) => `${name} : ${ty}`)
          .join(", ");
      return `object(${membersList})`;
  }

  override get parameters(): Base[] {
      return Object.values(this.members);
  }

  override check(rhs: Base, check_quant: boolean = true): void {
      if (rhs instanceof StructInstance) {
          return checkStructMembers(this.members, rhs, check_quant);
      }
      if (rhs instanceof Map) {
          // Member names must coerce to the map key type, and each member type must coerce to the map value type.
          new String().check(rhs.itemType[0]);
          for (const vt of Object.values(this.members)) {
              vt.check(rhs.itemType[1], check_quant);
          }
          return;
      }
      if (rhs instanceof Any || rhs instanceof WDLObject) {
          // Object coercion expects a further coercion to StructInstance to follow, constraining the expected member types.
          return;
      }
      throw new TypeError();
  }
}
function checkStructMembers(
  self_members: { [key: string]: Base },
  rhs: StructInstance,
  check_quant: boolean
): void {
  // shared routine for checking Map or Object type coercion, with useful error messages
  const rhs_members = rhs.members;
  if (!rhs_members) {
      throw new Error("rhs_members is undefined");
  }

  const rhs_keys = new Set(Object.keys(rhs_members));
  const self_keys = new Set(Object.keys(self_members));

  const missing_keys = Array.from(rhs_keys)
      .filter(k => !self_keys.has(k) && !rhs_members[k].optional);

  if (missing_keys.length) {
      throw new TypeError(
          "missing non-optional member(s) in struct " +
          `${rhs.typeName}: ${missing_keys.sort().join(' ')}`
      );
  }

  // Get intersection of keys
  const common_keys = Array.from(self_keys)
      .filter(k => rhs_keys.has(k));

  for (const k of common_keys) {
      try {
          self_members[k].check(rhs_members[k], check_quant);
      } catch (exn) {
          if (exn instanceof TypeError && exn.message) {
              throw exn;
          }
          throw new TypeError(
              `type mismatch using ${self_members[k]} to initialize ` +
              `${rhs_members[k]} ${k} member of struct ${rhs.typeName}`
          );
      }
  }
}
/**
 * Map type, parameterized by the (key,value) item type.
 */
export class Map extends Base {
  /**
   * The key and value types may be `Any` when not known statically, such as in a literal empty map `{}`.
   */
  itemType: [Base, Base];

  /**
   * Special use: Map[String,_] literal stores the key names here for potential use in
   * struct coercions where we need them. (Normally the Map type would record the common
   * type of the keys but not the keys themselves.)
   */
  literalKeys: Set<string> | null;

  constructor(
      itemType: [Base, Base],
      optional: boolean = false,
      literalKeys: Set<string> | null = null,
  ) {
      super();
      this._optional = optional;
      if (!itemType) {
          itemType = [new Any(), new Any()];
      }
      this.itemType = itemType;
      this.literalKeys = literalKeys;
  }

  override toString(): string {
      return (
          "Map[" +
          (
              this.itemType
                  ? `${this.itemType[0].toString()},${this.itemType[1].toString()}`
                  : ""
          ) +
          "]" +
          (this.optional ? "?" : "")
      );
  }

  override get parameters(): Base[] {
      return [this.itemType[0], this.itemType[1]];
  }

  /**
   * Type checking implementation
   */
  override check(rhs: Base, checkQuant: boolean = true): void {
      if (rhs instanceof Map) {
          this.itemType[0].check(rhs.itemType[0], checkQuant);
          this.itemType[1].check(rhs.itemType[1], checkQuant);
          return this.checkOptional(rhs, checkQuant);
      }

      if (rhs instanceof StructInstance && this.literalKeys !== null) {
          // struct assignment from map literal
          return checkStructMembers(
              Object.fromEntries(
                  Array.from(this.literalKeys).map(k => [k, this.itemType[1]])
              ),
              rhs,
              checkQuant,
          );
      }

      if (
          rhs instanceof StructInstance &&
          this.literalKeys === null &&
          this.itemType[0].equals(new String())
      ) {
          // Allow attempt to runtime-coerce a non-literal Map[String,_] to StructInstance.
          // Unlike a literal, we don't (during static validation) know what the keys will be, so
          // we can't typecheck it thoroughly (Lint warning will apply). This is used initializing
          // structs from read_map() or read_object[s]().
          return;
      }

      super.check(rhs, checkQuant);
  }
}

export class Directory extends Base {
  constructor(optional: boolean = false) {
      super();
      this._optional = optional;
  }

  /**
   * Type checking implementation
   */
  override check(rhs: Base, checkQuant: boolean = true): void {
      if (rhs instanceof String) {
          return this.checkOptional(rhs, checkQuant);
      }
      super.check(rhs, checkQuant);
  }
}
export function _struct_type_id(members: Record<string, Base>): string {
  // generates a content hash of the struct type definition, used to recognize
  // equivalent struct types going by different aliases
  const ans: string[] = [];
  const sm = Object.entries(members).sort(([a], [b]) => a.localeCompare(b));
  for (const [name, ty] of sm) {
    let sty = "";
    if (ty instanceof StructInstance) {
      if (!ty.members) {
        throw new Error("Members are not defined.");
      }
      sty = _struct_type_id(ty.members);
    } else {
      sty = ty.toString();
    }
    ans.push(name + " : " + sty);
  }
  return "struct(" + ans.join(", ") + ")";
}
export class Any extends Base {
  constructor(optional: boolean = false, nullLiteral: boolean = false) {
    super();
    this._optional = nullLiteral;
  }

  override check(rhs: Base, checkQuant: boolean = true): void {
    this.checkOptional(rhs, checkQuant);
  }
}

export class Boolean extends Base {
  constructor(optional: boolean = false) {
    super();
    this._optional = optional;
  }

  override check(rhs: Base, checkQuant: boolean = true): void {
    if (rhs instanceof String) {
      return this.checkOptional(rhs, checkQuant);
    }
    super.check(rhs, checkQuant);
  }
}

export class Float extends Base {
  constructor(optional: boolean = false) {
    super();
    this._optional = optional;
  }

  override check(rhs: Base, checkQuant: boolean = true): void {
    if (rhs instanceof String) {
      return this.checkOptional(rhs, checkQuant);
    }
    super.check(rhs, checkQuant);
  }
}

export class Int extends Base {
  constructor(optional: boolean = false) {
    super();
    this._optional = optional;
  }

  override check(rhs: Base, checkQuant: boolean = true): void {
    if (rhs instanceof Float) {
      return this.checkOptional(rhs, checkQuant);
    }
    if (rhs instanceof String) {
      return this.checkOptional(rhs, checkQuant);
    }
    super.check(rhs, checkQuant);
  }
}

export class File extends Base {
  constructor(optional: boolean = false) {
    super();
    this._optional = optional;
  }

  override check(rhs: Base, checkQuant: boolean = true): void {
    if (rhs instanceof String) {
      return this.checkOptional(rhs, checkQuant);
    }
    super.check(rhs, checkQuant);
  }
}

export class String extends Base {
  constructor(optional: boolean = false) {
    super();
    this._optional = optional;
  }

  override check(rhs: Base, checkQuant: boolean = true): void {
    if (
      rhs instanceof File ||
      rhs instanceof Int ||
      rhs instanceof Float
    ) {
      return this.checkOptional(rhs, checkQuant);
    }
    super.check(rhs, checkQuant);
  }
}
export class StructInstance extends Base {
  typeName: string;
  members: { [key: string]: Base } | null;

  constructor(typeName: string, optional: boolean = false) {
    super();
    this._optional = optional;
    this.typeName = typeName;
    this.members = null;
  }

  override toString(): string {
    return this.typeName + (this.optional ? "?" : "");
  }

  override check(rhs: Base, checkQuant: boolean = true): void {
    if (rhs instanceof StructInstance) {
      if (this.typeId !== rhs.typeId) {
        throw new TypeError();
      }
      return this.checkOptional(rhs, checkQuant);
    }
    super.check(rhs, checkQuant);
  }

  get typeId(): string {
    if (!this.members) {
      throw new Error("Members are not defined.");
    }
    return StructInstance.structTypeId(this.members);
  }

  override get parameters(): Base[] {
    if (!this.members) {
      throw new Error("Members are not defined.");
    }
    return Object.values(this.members);
  }

  static structTypeId(members: { [key: string]: Base }): string {
    const entries = Object.entries(members).sort(([a], [b]) =>
      a.localeCompare(b)
    );
    const ans = entries.map(([name, ty]) => {
      if (ty instanceof StructInstance) {
        return (
          name +
          " : " +
          StructInstance.structTypeId(ty.members!) +
          (ty.optional ? "?" : "")
        );
      } else {
        return name + " : " + ty.toString();
      }
    });
    return "struct(" + ans.join(", ") + ")";
  }
}

export class WDLArray extends Base {
  itemType: Base;
  private _nonempty: boolean;

  constructor(
    itemType: Base,
    optional: boolean = false,
    nonempty: boolean = false
  ) {
    super();
    this.itemType = itemType;
    this._optional = optional;
    this._nonempty = nonempty;
  }

  override toString(): string {
    return (
      `Array[${this.itemType}]` +
      (this._nonempty ? "+" : "") +
      (this.optional ? "?" : "")
    );
  }

  get nonempty(): boolean {
    return this._nonempty;
  }

  override get parameters(): Base[] {
    return [this.itemType];
  }

  override check(rhs: Base, checkQuant: boolean = true): void {
    if (rhs instanceof WDLArray) {
      this.itemType.check(rhs.itemType, checkQuant);
      return this.checkOptional(rhs, checkQuant);
    }
    if (rhs instanceof String) {
      this.itemType.check(new String());
      return this.checkOptional(rhs, checkQuant);
    }
    super.check(rhs, checkQuant);
  }

  override copy(optional?: boolean, nonempty?: boolean): Base {
    const newInstance = super.copy(optional) as WDLArray;
    if (nonempty !== undefined) {
      newInstance._nonempty = nonempty;
    }
    return newInstance;
  }
}
export function unify(types: Base[], check_quant: boolean = true, force_string: boolean = false): Base {
  /**
   * Given a list of types, compute a type to which they're all coercible, or :class:`WDL.Type.Any`
   * if no more-specific inference is possible.
   * @param force_string permit last-resort unification to ``String`` even if no item is currently
   *                    a ``String``, but all can be coerced
   */
  if (!types.length) {
      return new Any();
  }
  // begin with first non-String type (as almost everything is coercible to string); or if
  // --no-quant-check, the first array type (as we can try to promote other T to Array[T])
  let t = types.find(t => !(t instanceof String || t instanceof Any)) || types[0];
  if (!check_quant) {
      t = types.find(a => 
          a instanceof WDLArray && 
          !(a.itemType instanceof Any)
      ) || t;
  }
  t = t.copy();

  // potentially promote/generalize t to other types seen
  let optional = false;
  let all_nonempty = true;
  let all_stringifiable = true;

  for (const t2 of types) {
      // recurse on parameters of compound types
      const t_was_array_any = t instanceof WDLArray && t.itemType instanceof Any;
      
      if (t instanceof WDLArray && t2 instanceof WDLArray && !(t2.itemType instanceof Any)) {
          t.itemType = unify([t.itemType, t2.itemType], check_quant, force_string);
      }
      if (t instanceof Pair && t2 instanceof Pair) {
          t.left_type = unify([t.left_type, t2.left_type], check_quant, force_string);
          t.right_type = unify([t.right_type, t2.right_type], check_quant, force_string);
      }
      if (t instanceof Map && t2 instanceof Map) {
          t.itemType = [
              unify([t.itemType[0], t2.itemType[0]], check_quant, force_string),
              unify([t.itemType[1], t2.itemType[1]], check_quant, force_string),
          ];
      }

      if (!t_was_array_any && 
          ('parameters' in t) && 
          t.parameters?.some(pt => pt instanceof Any)) {
          return new Any();
      }

      if (t instanceof WDLObject && t2 instanceof WDLObject) {
          // unifying Object types (generally transient, pending coercion to a StructInstance)
          for (const k in t2.members) {
              if (k in t.members) {
                  t.members[k] = unify([t.members[k], t2.members[k]]);
              } else {
                  // infer optionality of fields present only in some types
                  t.members[k] = t2.members[k].copy( true );
              }
          }
      }

      // Int/Float, String/File
      if (t instanceof Int && t2 instanceof Float) {
          t = new Float();
      }

      // String
      if (t2 instanceof String && 
          (!check_quant || !(t instanceof WDLArray)) && 
          (!(t instanceof Pair || t instanceof Map))) {
          t = new String();
      }

      if (!t2.coerces(new String( true ), check_quant )) {
          all_stringifiable = false;
      }

      // optional/nonempty
      if (t.optional || t2.optional) {
          optional = true;
      }
      if ((t instanceof WDLArray && !t.nonempty) || 
          (t2 instanceof WDLArray && !t2.nonempty)) {
          all_nonempty = false;
      }
  }

  if (t instanceof WDLArray) {
      t = t.copy(undefined, all_nonempty );
  }
  t = t.copy(optional );

  // check all types are coercible to t
  for (const t2 of types) {
      if (!t2.coerces(t,  check_quant )) {
          if (all_stringifiable && force_string) {
              return new String( optional );
          }
          return new Any();
      }
  }
  return t;
}