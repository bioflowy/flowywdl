import * as WDLError from './error.ts';
import * as Env from './env.ts';
import * as Tree from './tree.ts';
import * as Value from './value.ts';
import * as StdLib from './stdlib.ts';
import * as Type from './type.ts'; // Importing necessary classes and types.
import { decodeEscapes } from "./utils.ts";

export abstract class Base extends WDLError.SourceNode {
    protected _type: Type.Base | undefined = undefined;
    protected _check_quant: boolean = true;
    protected _stdlib: StdLib.Base | undefined = undefined;
    protected _struct_types: Env.Bindings<{ [key: string]: Type.Base }> | undefined = undefined;

    get checkQuant(): boolean {
        return this._check_quant;
    }
    get type(): Type.Base {
        if (!this._type) {
            throw new Error("Type not inferred yet.");
        }
        return this._type;
    }
    abstract _infer_type(type_env: Env.Bindings<Type.Base>): Type.Base;

    inferType(
        type_env: Env.Bindings<Type.Base>,
        stdlib: StdLib.Base,
        check_quant = true,
        struct_types?: Env.Bindings<{ [key: string]: Type.Base }>
    ): this {
        if (this._type !== undefined) throw new Error("Type already inferred.");
        this._check_quant = check_quant;
        this._stdlib = stdlib;
        this._struct_types = struct_types;

        for (const child of this.children) {
            if (child instanceof Base) child.inferType(type_env, stdlib, check_quant, struct_types);
        }

        try {
            this._type = this._infer_type(type_env);
        } finally {
            this._stdlib = undefined;
            this._struct_types = undefined;
        }
        return this;
    }

    typecheck(expected: Type.Base): Base {
        try {
            this.type.check(expected, this._check_quant);
        } catch (ex) {
            if(ex instanceof Error){
                throw new WDLError.StaticTypeMismatch(this, expected, this.type, ex.message);
            }else{
                throw ex;
            }
        }
        return this;
    }

    abstract _eval(env: Env.Bindings<Value.Base>, stdlib: StdLib.Base): Promise<Value.Base>;

    async eval(env: Env.Bindings<Value.Base>, stdlib: StdLib.Base): Promise<Value.Base> {
        try {
            const result = await this._eval(env, stdlib);
            result.expr = this;
            return result;
        } catch (ex) {
            console.log(ex);
            if(ex instanceof Error){
                throw new EvalError(ex.message);
            }else{
                throw ex;
            }
        }
    }
    get literal():Value.Base | null{
        return null
    }

}

export class BooleanLiteral extends Base {
    private value: boolean;

    constructor(pos: WDLError.SourcePosition, value: boolean) {
        super(pos);
        this.value = value;
    }

    _infer_type(_: Env.Bindings<Type.Base>): Type.Base {
        return new Type.Boolean();
    }

    _eval(_: Env.Bindings<Value.Base>, __: StdLib.Base): Promise<Value.Boolean> {
        return Promise.resolve(new Value.Boolean(this.value));
    }

    override toString(): string {
        return this.value.toString().toLowerCase();
    }

    override get literal(): Value.Base {
        return new Value.Boolean(this.value);
    }
}

export class IntLiteral extends Base {
    private value: number;

    constructor(pos: WDLError.SourcePosition, value: number) {
        super(pos);
        this.value = value;
    }

    _infer_type(_: Env.Bindings<Type.Base>): Type.Base {
        return new Type.Int();
    }

    _eval(_: Env.Bindings<Value.Base>, __: StdLib.Base): Promise<Value.Int> {
        return Promise.resolve(new Value.Int(this.value));
    }

    override toString(): string {
        return this.value.toString();
    }

    override get literal(): Value.Base {
        return new Value.Int(this.value);
    }
}

// Float literal class
export class FloatLiteral extends Base {
    private value: number;

    constructor(pos: WDLError.SourcePosition, value: number) {
        super(pos);
        this.value = value;
    }

    _infer_type(_: Env.Bindings<Type.Base>): Type.Base {
        return new Type.Float();
    }

    _eval(_: Env.Bindings<Value.Base>, __: StdLib.Base): Promise<Value.Float> {
        return Promise.resolve(new Value.Float(this.value));
    }

    override toString(): string {
        return this.value.toString();
    }

    override get literal(): Value.Base {
        return new Value.Float(this.value);
    }
}
export class String extends Base {
    /**
     * String literal, possibly interleaved with expression placeholders for interpolation
     */
    parts: (string | Placeholder)[];
    /**
     * The parts list begins and ends with the original delimiters (quote marks, braces, or triple
     * angle brackets). Between these is a sequence of literal strings and/or interleaved placeholder
     * expressions. Escape sequences in the literals will NOT have been decoded (although the parser
     * will have checked they're valid). Strings arising from task commands leave escape sequences to
     * be interpreted by the shell in the task container. Other string literals have their escape
     * sequences interpreted upon evaluation to string values.
     * @type {Array<string | Placeholder>}
     */
    command: boolean;
    /**
     * True if this expression is a task command template, as opposed to a string expression anywhere
     * else. Controls whether backslash escape sequences are evaluated or (for commands) passed
     * through for shell interpretation.
     * @type {boolean}
     */

    constructor(pos: WDLError.SourcePosition, parts: (string | Placeholder)[], command: boolean = false) {
        super(pos);
        this.parts = parts;
        this.command = command;
    }

    override toString(): string {
        return this.parts.map((part) => (part instanceof Placeholder ? `${part}` : part)).join("");
    }

    override get children(): Iterable<WDLError.SourceNode> {
        return this.parts.filter((p) => p instanceof Base) as Base[];
    }

    _infer_type(_: Env.Bindings<Type.Base>): Type.Base {
        return new Type.String();
    }

    async _eval(env: Env.Bindings<Value.Base>, stdlib: StdLib.Base): Promise<Value.String> {
        const ans: string[] = [];
        for (const part of this.parts) {
            if (part instanceof Placeholder) {
                const rslt = await part.eval(env, stdlib)
                ans.push(rslt.value as string); // evaluate interpolated expression & stringify
            } else if (typeof part === "string") {
                if (this.command) {
                    ans.push(part);
                } else {
                    ans.push(decodeEscapes(this.pos, part));
                }
            } else {
                throw new Error("Unexpected part type");
            }
        }

        // Concatenate the stringified parts and trim the surrounding quotes
        if (this.command) {
            return new Value.String(ans.join(""));
        }
        const delim = this.parts[0];
        if (typeof delim !== "string" || !["'", '"', "{", "<<<"].includes(delim)) throw new Error("Invalid delimiter");
        const delim2 = this.parts[this.parts.length - 1];
        if (typeof delim2 !== "string" || !["'", '"', "}", ">>>"].includes(delim2) || delim.length !== delim2.length) {
            throw new Error("Delimiter mismatch");
        }
        return new Value.String(ans.join("").slice(delim.length, -delim.length));
    }

    override get literal(): Value.Base | null {
        if (this.parts.some((p) => !(typeof p === "string"))) return null;
        return new Value.String(this.parts.join(),this)
    }
}
let placeholderRe:RegExp|undefined = undefined;
export function setPlaceholderRegex(regex:RegExp|undefined){
    placeholderRe = regex
}
export class Placeholder extends Base {
    /**
     * Holds an expression interpolated within a string or command
     */

    /**
     * Placeholder options (sep, true, false, default)
     */
    options: { [key: string]: string };

    /**
     * Expression to be evaluated and substituted
     */
    expr: Base;

    constructor(pos: WDLError.SourcePosition, options: { [key: string]: string }, expr: Base) {
        super(pos);
        this.options = options;
        this.expr = expr;

        // preprocess expr to rewrite any Apply("_add") to Apply("_interpolation_add") for the
        // special interpolation-only behavior of + for String? operands.
        const rewriteAdds = (ch: Base): void => {
            if (ch instanceof Apply && ch.function_name === "_add") {
                ch.function_name = "_interpolation_add";
            }
            for (const ch2 of ch.children) {
                if (ch2 instanceof Base) {
                    rewriteAdds(ch2);
                }
            }
        };

        rewriteAdds(this.expr);
    }

    override toString(): string {
        const options: string[] = [];
        for (const option in this.options) {
            options.push(`${option}="${this.options[option]}"`);
        }
        options.push(this.expr.toString());
        return `~{${options.join(" ")}}`;
    }

    override get children(): Iterable<Base>  {
        return [this.expr];
    }

     _infer_type(type_env: Env.Bindings<Type.Base>): Type.Base {
        if (this.expr.type instanceof Type.WDLArray) {
            if (!("sep" in this.options)) {
                throw new WDLError.IncompatibleOperand(
                    this,
                    "provide `sep'arator string to interpolate array items"
                );
            }
        } else if ("sep" in this.options) {
            throw new WDLError.StaticTypeMismatch(
                this,
                new Type.WDLArray(new Type.Any()),
                this.expr.type,
                "command placeholder has 'sep' option for non-Array expression"
            );
        }
        
        if ("true" in this.options || "false" in this.options) {
            if (!(this.expr.type instanceof Type.Boolean)) {
                throw new WDLError.StaticTypeMismatch(
                    this,
                    new Type.Boolean(),
                    this.expr.type,
                    "command placeholder 'true' and 'false' options used with non-Boolean expression"
                );
            }
            if (!("true" in this.options && "false" in this.options)) {
                throw new WDLError.StaticTypeMismatch(
                    this,
                    new Type.Boolean(),
                    this.expr.type,
                    "command placeholder with only one of 'true' and 'false' options"
                );
            }
        }
        return new Type.String();
    }

    async _eval_impl(env: Env.Bindings<Value.Base>, stdlib: StdLib.Base): Promise<Value.String> {
        const v = await this.expr.eval(env, stdlib);
        if (v instanceof Value.Null) {
            if ("default" in this.options) {
                return new Value.String(this.options["default"]);
            }
            return new Value.String("");
        }
        if (v instanceof Value.String) {
            return v;
        }
        if (v instanceof Value.WDLArray) {
            return new Value.String(
                v.value.map(item => item.coerce(new Type.String()).value).join(this.options["sep"])
            );
        }
        if ((v instanceof Value.Boolean) && v.value && "true" in this.options) {
            return new Value.String(this.options["true"]);
        }
        if ((v instanceof Value.Boolean) && v.value == false && "false" in this.options) {
            return new Value.String(this.options["false"]);
        }
        return new Value.String(v.toString());
    }

    async _eval(env: Env.Bindings<Value.Base>, stdlib: StdLib.Base): Promise<Value.String> {
        const ans = await this._eval_impl(env, stdlib);
        if(placeholderRe && !(ans.value as string).matchAll(placeholderRe)){
            throw new WDLError.InputError(
                "Task command placeholder value forbidden by configuration [task_runtime] placeholder_regex"
            )
        }
        return ans;
    }
}
export class Array extends Base {
    /**
     * Array literal
     */
    items: Base[];
    /**
     * Expression for each item in the array literal
     * @type {Base[]}
     */

    constructor(pos: WDLError.SourcePosition, items: Base[]) {
        super(pos);
        this.items = items;
    }

    override toString(): string {
        return `[${this.items.map((item) => `${item}`).join(", ")}]`;
    }

    override get children(): Iterable<WDLError.SourceNode> {
        return this.items;
    }

    _infer_type(_: Env.Bindings<Type.Base>): Type.Base {
        if (this.items.length === 0) {
            return new Type.WDLArray(new Type.Any());
        }
        const itemType = Type.unify(
            this.items.map((item) => item.type),
             this._check_quant,  true 
        );
        if (itemType instanceof Type.Any && !itemType.optional) {
            throw new WDLError.IndeterminateType(this, "unable to unify array item types");
        }
        return new Type.WDLArray(itemType, false,  true );
    }

    override typecheck(expected: Type.Base): Base {
        if (this.items.length === 0 && expected instanceof Type.WDLArray) {
            return this;
        }
        return super.typecheck(expected);
    }

    async _eval(env: Env.Bindings<Value.Base>, stdlib: StdLib.Base): Promise<Value.WDLArray> {
        if (!(this.type instanceof Type.WDLArray)) throw new Error("Type mismatch");
        const itemType = this.type.itemType;
        const values:Value.Base[] = []
        for(const item of this.items){
            const r = await item.eval(env, stdlib)
            values.push(r.coerce(itemType))
        }
        return new Value.WDLArray(
            itemType,
            values
        );
    }

    override get literal(): Value.Base | null {
        if (!(this.type instanceof Type.WDLArray)) throw new Error("Type mismatch");
        const literals = this.items.map((item) => item.literal);
        return literals.includes(null) ? null : new Value.WDLArray(this.type.itemType, literals as Value.Base[]);
    }
}
/**
 * Map literal
 */
export class Map extends Base {
    /**
     * Expressions for the map literal keys and values
     * 
     * :type: List[Tuple[WDL.Expr.Base,WDL.Expr.Base]]
     */
    items: [Base, Base][];

    constructor(pos: WDLError.SourcePosition, items: [Base, Base][]) {
        super(pos);
        this.items = items;
    }

    override toString(): string {
        const items = this.items.map(([key, value]) => 
            `${key.toString()}: ${value.toString()}`
        );
        return `{${items.join(", ")}}`;
    }

    override get children(): Iterable<WDLError.SourceNode> {
        const nodes: WDLError.SourceNode[] = [];
        for (const [key, value] of this.items) {
            nodes.push(key);
            nodes.push(value);
        }
        return nodes;
    }

    _infer_type(_: Env.Bindings<Type.Base>): Type.Base {
        if (!this.items.length) {
            return new Type.Map([new Type.Any(), new Type.Any()], false, new Set());
        }

        const keyTypes = this.items.map(([key, _]) => key.type);
        const kty = Type.unify(keyTypes,  this._check_quant);

        if (kty instanceof Type.Any) {
            throw new WDLError.IndeterminateType(this, "unable to unify map key types");
        }

        const valueTypes = this.items.map(([_, value]) => value.type);
        const vty = Type.unify(valueTypes,  
             this._check_quant, 
             true 
        );

        if (vty instanceof Type.Any) {
            throw new WDLError.IndeterminateType(this, "unable to unify map value types");
        }

        let literal_keys: Set<string> | null = null;
        
        if (kty instanceof Type.String) {
            // If the keys are string constants, record them in the Type object
            // for potential later use in struct coercion. (Normally the Type
            // encodes the common type of the keys, but not the keys themselves)
            literal_keys = new Set<string>();
            
            for (const [key, _] of this.items) {
                if (
                    literal_keys !== null &&
                    key instanceof String &&
                    key.parts.length === 3 &&
                    typeof key.parts[1] === "string"
                ) {
                    literal_keys.add(key.parts[1]);
                } else {
                    literal_keys = null;
                    break;
                }
            }
        }

        return new Type.Map([kty, vty],false,  literal_keys);
    }
    async _eval(env: Env.Bindings<Value.Base>, stdlib: StdLib.Base):Promise<Value.Base>{
    const keystrs = new Set()
    const eitems:[Value.Base,Value.Base][] = []
    for(const [ k, v ] of this.items){
        const ek = await k.eval(env, stdlib)
        const sk = ek.toString
        if(keystrs.has(sk)){
            throw new WDLError.EvalError(this, "duplicate keys in Map literal")
        }
        const rslt = await v.eval(env, stdlib)
        eitems.push([ek, rslt])
        keystrs.add(sk)
    }
    const itemType = (this.type as Type.Map).itemType
    return new Value.Map(itemType, eitems,this)
    }

    override get literal(): Value.Base | null {
        const items:[Value.Base,Value.Base][] = []
        for(const[k, v] of this.items){
        const kl = k.literal
        const vl = v.literal
        if( kl && vl){
            items.push([kl, vl])
        }else{
            return null
        }
    }
    const itemType = (this.type as Type.Map).itemType
    return new Value.Map(itemType, items,this)
    }

}
export class Ident extends Base {
    /**
     * An identifier referencing a named value or call output.
     *
     * `Ident` nodes are wrapped in `Get` nodes, as discussed below.
     */
    name: string;
    /**
     * Name, possibly including a dot-separated namespace
     * @type {string}
     */
    referee: Tree.Decl | Tree.Call | Tree.Scatter | Tree.Gather | null = null;
    /**
     * After typechecking within a task or workflow, stores the AST node to which the identifier
     * refers.
     */

    constructor(pos: WDLError.SourcePosition, name: string) {
        super(pos);
        if (!name || name.endsWith(".") || name.startsWith(".") || name.includes("..")) {
            throw new Error("Invalid identifier name");
        }
        this.name = name;
    }

    override toString(): string {
        return this.name;
    }

    _infer_type(type_env: Env.Bindings<Type.Base>): Type.Base {
        const binding = type_env.resolveBinding(this.name);
        const ans = binding.value;
        this.referee = binding.info as Tree.Decl | Tree.Call | Tree.Scatter | Tree.Gather | null;
        return ans;
    }

    _eval(env: Env.Bindings<Value.Base>, _: StdLib.Base): Promise<Value.Base> {
        return Promise.resolve(env.resolve(this.name));
    }

    get _ident(): string {
        return this.name;
    }
}

export class LeftName extends Base {
    /**
     * Placeholder for resolving dot-separated identifiers.
     */
    name: string;

    constructor(pos: WDLError.SourcePosition, name: string) {
        super(pos);
        if (!name) throw new Error("Invalid name");
        this.name = name;
    }

    override toString(): string {
        return this.name;
    }

    _infer_type(type_env: Env.Bindings<Type.Base>): Type.Base {
        throw new Error("NotImplementedError");
    }

    _eval(env: Env.Bindings<Value.Base>, stdlib: StdLib.Base): Promise<Value.Base> {
        throw new Error("NotImplementedError");
    }

    get _ident(): string {
        return this.name;
    }
}
/**
 * Struct literal
 */
export class Struct extends Base {
    /**
     * The struct literal is modelled initially as a bag of keys and values, which
     * can be coerced to a specific struct type during typechecking.
     * 
     * :type: Dict[str,WDL.Expr.Base]
     */
    members: { [key: string]: Base };

    /**
     * In WDL 2.0+ each struct literal may specify the intended struct type name.
     * 
     * :type: Optional[str]
     */
    struct_type_name: string | null;

    constructor(
        pos: WDLError.SourcePosition,
        members: [string, Base][],
        struct_type_name: string | null = null
    ) {
        super(pos);
        this.members = {};
        
        for (const [key, value] of members) {
            if (key in this.members) {
                throw new WDLError.MultipleDefinitions(this.pos, "duplicate keys " + key);
            }
            this.members[key] = value;
        }
        
        this.struct_type_name = struct_type_name;
        
        if (struct_type_name !== null && typeof struct_type_name !== 'string') {
            throw new Error(`Invalid struct_type_name: ${struct_type_name}`);
        }
    }

    override toString(): string {
        const memberStrings = Object.entries(this.members).map(
            ([member, value]) => `"${member}": ${value.toString()}`
        );
        // Returns a Map literal instead of a struct literal as these are version dependant
        return `{${memberStrings.join(", ")}}`;
    }

    override get children(): Iterable<WDLError.SourceNode> {
        return Object.values(this.members);
    }

    _infer_type(_: Env.Bindings<Type.Base>): Type.Base {
        const object_type = new Type.WDLObject(
            Object.entries(this.members).reduce((acc, [key, value]) => {
                acc[key] = value.type;
                return acc;
            }, {} as { [key: string]: Type.Base })
        );

        if (!this.struct_type_name) {
            // pre-WDL 2.0: object literal with deferred typechecking
            return object_type;
        }

        // resolve struct type
        let struct_type_members: {[key:string]: Type.Base} | null = null;
        if (this._struct_types && this.struct_type_name in this._struct_types) {
            struct_type_members = this._struct_types.get(this.struct_type_name);
        }
        if (struct_type_members === null) {
            throw new WDLError.InvalidType(this, "Unknown type " + this.struct_type_name);
        }

        const struct_type = new Type.StructInstance(this.struct_type_name);
        struct_type.members = struct_type_members;

        // typecheck members vs struct declaration
        try {
            object_type.check(struct_type, this._check_quant);
        } catch (exn) {
            if (exn instanceof TypeError) {
                throw new WDLError.StaticTypeMismatch(
                    this,
                    struct_type,
                    object_type,
                    exn.message || ""
                );
            }
            throw exn;
        }

        return struct_type;
    }

    async _eval(env: Env.Bindings<Value.Base>, stdlib: StdLib.Base): Promise<Value.Base> {
        if (!(this.type instanceof Type.WDLObject) && 
            !(this.type instanceof Type.StructInstance)) {
            throw new Error("Expected Object or StructInstance type");
        }

        const ans: { [key: string]: Value.Base } = {};
        
        for (const [key, value] of Object.entries(this.members)) {
            ans[key] = await value.eval(env, stdlib);
            
            if (this.type instanceof Type.StructInstance) {
                if (!this.type.members) {
                    throw new Error("StructInstance missing members");
                }
                ans[key] = ans[key].coerce(this.type.members[key]);
            }
        }

        return new Value.Struct(this.type, ans);
    }

    override get literal(): Value.Base | null {
        const ans: { [key: string]: Value.Base } = {};
        
        for (const [key, value] of Object.entries(this.members)) {
            const valueLiteral = value.literal;
            if (valueLiteral) {
                ans[key] = valueLiteral;
            } else {
                return null;
            }
        }

        if (!(this.type instanceof Type.WDLObject) && 
            !(this.type instanceof Type.StructInstance)) {
            throw new Error("Expected Object or StructInstance type");
        }

        return new Value.Struct(this.type, ans);
    }
}
export class Get extends Base {
    /**
     * AST node representing access to a value by identifier (including namespaced ones), or accessing
     * a member of a pair or struct as `.member`.
     */
    expr: Base;
    /**
     * The expression whose value is accessed
     */
    member: string | null;

    constructor(pos: WDLError.SourcePosition, expr: Base, member: string | null) {
        super(pos);
        this.expr = expr;
        this.member = member;
    }

    override toString(): string {
        return this.member ? `${this.expr}.${this.member}` : `${this.expr}`;
    }

    override get children(): Iterable<WDLError.SourceNode> {
        if (this._type){
            return [this.expr];
        }else{
            return []
        }
    }

    _infer_type(type_env: Env.Bindings<Type.Base>): Type.Base {
        if (this.expr instanceof LeftName) {
            if (type_env.hasBinding(this.expr.name)) {
                this.expr = new Ident(this.expr.pos, this.expr.name);
            } else if (!this.member) {
                throw new WDLError.UnknownIdentifier(this);
            }
        }

        try {
            if(this._stdlib === undefined){
                throw new Error("unexpected")
            }
            this.expr.inferType(type_env,this._stdlib,this._check_quant);
        } catch (err) {
            if (!(this.expr instanceof LeftName || this.expr instanceof Get) || !this.expr._ident || !this.member) {
                throw err;
            }
            const fullName = `${this.expr._ident}.${this.member}`;
            if (!type_env.hasBinding(fullName)) {
                const message = type_env.hasNamespace(this.expr._ident)
                    ? `No ${this.member} in namespace ${this.expr._ident}`
                    : undefined;
                throw new WDLError.UnknownIdentifier(this, message);
            }
            this.expr = new Ident(this.pos, fullName);
            this.expr._infer_type(type_env);
            this.member = null;
        }

        const ety = this.expr.type;
        if (!this.member) {
            if (!(this.expr instanceof Ident)) throw new Error("Type mismatch");
            return ety;
        }

        if (!(ety instanceof Type.Pair || ety instanceof Type.StructInstance)) {
            throw new WDLError.NoSuchMember(this, this.member);
        }
        if (this._check_quant && ety.optional) {
            throw new WDLError.StaticTypeMismatch(this.expr, ety.copy( false ), ety);
        }
        if (["left", "right"].includes(this.member)) {
            if (ety instanceof Type.Pair) {
                return this.member === "left" ? ety.left_type : ety.right_type;
            }
            throw new WDLError.NoSuchMember(this, this.member);
        }
        if (ety instanceof Type.StructInstance && ety.members && this.member in ety.members) {
            return ety.members[this.member];
        }
        throw new WDLError.NoSuchMember(this, this.member);
    }

    _eval(env: Env.Bindings<Value.Base>, stdlib: StdLib.Base): Promise<Value.Base> {
        const innard_value = this.expr._eval(env, stdlib);
        if (!this.member) {
            return innard_value;
        }
        if (innard_value instanceof Value.Pair) {
            return Promise.resolve(innard_value.value[this.member === "left" ? 0 : 1]);
        }
        if (innard_value instanceof Value.Struct && this.member in innard_value.value) {
            return Promise.resolve(innard_value.value[this.member]);
        }
        throw new Error("NotImplementedError");
    }

    get _ident(): string {
        return this.expr instanceof LeftName || this.expr instanceof Get
            ? `${this.expr._ident}${this.member ? `.${this.member}` : ""}`
            : "";
    }
}
/**
 * Pair literal
 */
export class Pair extends Base {
    /**
     * Left-hand expression in the pair literal
     * 
     * :type: WDL.Expr.Base
     */
    left: Base;

    /**
     * Right-hand expression in the pair literal
     * 
     * :type: WDL.Expr.Base
     */
    right: Base;

    constructor(pos: WDLError.SourcePosition, left: Base, right: Base) {
        super(pos);
        this.left = left;
        this.right = right;
    }

    override toString(): string {
        return `(${this.left.toString()}, ${this.right.toString()})`;
    }

    override get children(): Iterable<WDLError.SourceNode> {
        return [this.left, this.right];
    }

    _infer_type(_: Env.Bindings<Type.Base>): Type.Base {
        return new Type.Pair(this.left.type, this.right.type);
    }

    async _eval(env: Env.Bindings<Value.Base>, stdlib: StdLib.Base): Promise<Value.Base> {
        if (!(this.type instanceof Type.Pair)) {
            throw new Error("Expected Pair type");
        }
        const lv = await this.left.eval(env, stdlib);
        const rv = await this.right.eval(env, stdlib);
        return new Value.Pair(this.left.type, this.right.type, [lv, rv]);
    }

    override get literal(): Value.Base | null {
        if (!(this.type instanceof Type.Pair)) {
            throw new Error("Expected Pair type");
        }
        const lv = this.left.literal;
        const rv = this.right.literal;
        if (lv && rv) {
            return new Value.Pair(this.left.type, this.right.type, [lv, rv]);
        }
        return null;
    }
}
export class IfThenElse extends Base {
    /**
     * Ternary conditional expression
     */

    condition: Base;
    /**
     * :type: WDL.Expr.Base
     *
     * A Boolean expression for the condition
     */

    consequent: Base;
    /**
     * :type: WDL.Expr.Base
     *
     * Expression evaluated when the condition is true
     */

    alternative: Base;
    /**
     * :type: WDL.Expr.Base
     *
     * Expression evaluated when the condition is false
     */

    constructor(pos: WDLError.SourcePosition, condition: Base, consequent: Base, alternative: Base) {
        super(pos);
        this.condition = condition;
        this.consequent = consequent;
        this.alternative = alternative;
    }

    override toString(): string {
        return `if ${this.condition.toString()} then ${this.consequent.toString()} else ${this.alternative.toString()}`;
    }

    override get children(): Base[] {
        return [this.condition, this.consequent, this.alternative];
    }

    override _infer_type(_: Env.Bindings<Type.Base>): Type.Base {
        // Check for Boolean condition
        if (this.condition.type !== new Type.Boolean()) {
            throw new Error(`Static type mismatch: expected Boolean in if condition`);
        }
        const typeConsequent = this.consequent.type;
        const typeAlternative = this.alternative.type;
        const ty = Type.unify([typeConsequent, typeAlternative], this.checkQuant);

        if (ty instanceof Type.Any) {
            throw new Error(`Unable to unify consequent and alternative types`);
        }

        return ty;
    }

    override async _eval(env: Env.Bindings<Value.Base>, stdlib: StdLib.Base): Promise<Value.Base> {
        const rslt = await this.condition.eval(env, stdlib)
        if (rslt.expect(new Type.Boolean()).value) {
            return this.consequent.eval(env, stdlib);
        } else {
            return this.alternative.eval(env, stdlib);
        }
    }
}

export class StringLiteral extends Base {
    parts: (string | Placeholder)[];
    command: boolean;

    constructor(pos: WDLError.SourcePosition, parts: (string | Placeholder)[], command = false) {
        super(pos);
        this.parts = parts;
        this.command = command;
    }

    _infer_type(_: Env.Bindings<Type.Base>): Type.Base {
        return new Type.String();
    }

    async _eval(env: Env.Bindings<Value.Base>, stdlib: StdLib.Base): Promise<Value.String> {
        let result = '';
        for (const part of this.parts) {
            if (typeof part === 'string') result += part;
            else{ 
                const rslt = await part.eval(env, stdlib)
                result += rslt.value;
            }
        }
        return Promise.resolve(new Value.String(result));
    }

    override toString(): string {
        return this.parts.map((part) => (typeof part === 'string' ? part : part.toString())).join('');
    }

    override get children(): Iterable<Base | Placeholder> {
        return this.parts.filter((part) => typeof part !== 'string') as Iterable<Placeholder>;
    }
}
export class Null extends Base{
    /*
    WDL ``None`` literal

    (called ``Null`` to avoid conflict with Python ``None``)
    */

    value: null;

    constructor(pos: WDLError.SourcePosition){
        super(pos)
        this.value = null
    }
    override toString() {
        return "None";
    }

    _infer_type(_: Env.Bindings<Type.Base>):Type.Base{
        return new Type.Any(false,true)
    }

    _eval(_: Env.Bindings<Value.Base>, _2: StdLib.Base) :Promise<Value.Null>{
        return Promise.resolve(new Value.Null())
    }
    override get children(): Iterable<WDLError.SourceNode> {
        return []
    }
}
function addParentheses(ars: Base[], parentOperator: string): string[] {
    const precedence: { [key: string]: number } = {
        "_mul": 7,
        "_div": 7,
        "_rem": 7,
        "_add": 6,
        "_interpolation_add": 6,
        "_sub": 6,
        "_lt": 5,
        "_lte": 5,
        "_gt": 5,
        "_gte": 5,
        "_eqeq": 4,
        "_neq": 4,
        "_land": 3,
        "_lor": 3,
    };

    const argumentsOut: string[] = [];
    ars.forEach((argument, index) => {
        if (argument instanceof IfThenElse && parentOperator in precedence && index === 0) {
            argumentsOut.push(`(${argument.toString()})`);
        } else if (argument instanceof Apply) {
            if ((precedence[parentOperator] ?? 100) > (precedence[argument.function_name] ?? 100)) {
                argumentsOut.push(`(${argument.toString()})`);
            } else {
                argumentsOut.push(argument.toString());
            }
        } else {
            argumentsOut.push(argument.toString());
        }
    });

    return argumentsOut;
}
export const infix: Record<string, string> = {
    "_mul": "*",
    "_div": "/",
    "_rem": "%",
    "_add": "+",
    "_interpolation_add": "+",
    "_sub": "-",
    "_lt": "<",
    "_lte": "<=",
    "_gt": ">",
    "_gte": ">=",
    "_eqeq": "==",
    "_neq": "!=",
    "_land": "&&",
    "_lor": "||",
};

export class Apply extends Base {
    /** Application of a built-in or standard library function */

    function_name: string;
    /** Name of the function applied
     * @type {string}
     */
    arguments: Base[];
    /**
     * Expressions for each function argument
     * @type {Base[]}
     */

    constructor(pos: WDLError.SourcePosition, func: string, args: Base[]) {
        super(pos);
        this.function_name = func;
        this.arguments = args;
    }

    override toString(): string {
        const argumentsStr = addParentheses(this.arguments, this.function_name);
        if (this.function_name in infix) {
            return `${argumentsStr[0]} ${infix[this.function_name]} ${argumentsStr[1]}`;
        } else if (this.function_name === "_at") {
            return `${argumentsStr[0]}[${argumentsStr[1]}]`;
        } else if (this.function_name === "_negate") {
            return `!${argumentsStr[0]}`;
        } else {
            return `${this.function_name}(${argumentsStr.join(",")})`;
        }
    }

    override get children(): Iterable<Base> {
        return this.arguments;
    }

    _infer_type(type_env: Env.Bindings<Type.Base>): Type.Base {
        const f = this._stdlib?.getFunction(this.function_name);
        if (!f) {
            throw new WDLError.NoSuchFunction(this, this.function_name);
        }
        if (!(f instanceof StdLib.WDLFunction)) throw new Error("Type mismatch");
        return f.inferType(this);
    }

    _eval(env: Env.Bindings<Value.Base>, stdlib: StdLib.Base): Promise<Value.Base> {
        const f = stdlib.getFunction(this.function_name);
        if (!(f instanceof StdLib.WDLFunction)) throw new Error(`Type mismatch ${this.function_name} ${f}`);
        return f.call(this, env, stdlib);
    }
}
