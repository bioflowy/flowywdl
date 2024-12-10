import * as WDLError from "./error.ts";
import * as Type from "./type.ts";
import * as Expr from "./expr.ts";
import * as Env from "./env.ts";
import * as Util from "./utils.ts";
import * as StdLib from "./stdlib.ts";
import { calcSHA256 } from "./utils.ts";
import { WDLArray } from "./type.ts";


function _build_workflow_type_env(
  doc: Document,
  stdlib: StdLib.Base,
  checkQuant: boolean,
  self?: Workflow | WorkflowSection | null,
  outerTypeEnv?: Env.Bindings<Type.Base> | null
): void {
  // Populate each Workflow, Scatter, and Conditional object with its
  // _type_env attribute containing the type environment available in the body
  // of the respective section. This is tricky because:
  // - forward-references to any declaration or call output in the workflow
  //   are valid, except
  //   - circular dependencies, direct or indirect
  //   - (corollary) scatter and conditional expressions can't refer to
  //     anything within the respective section
  // - a scatter variable is visible only inside the scatter
  // - declarations & call outputs of type T within a scatter have type
  //   Array[T] outside of the scatter
  // - declarations & call outputs of type T within a conditional have type T?
  //   outside of the conditional
  //
  // preconditions:
  // - _resolve_calls()
  //
  // postconditions:
  // - typechecks scatter and conditional expressions (recursively)
  // - sets _type_env attributes on each Workflow/Scatter/Conditional
  assert(doc.workflow);
  self = self || doc.workflow;
  if (!self) {
      return;
  }
  assert(self instanceof WorkflowSection || self === doc.workflow);
  assert(self._type_env === undefined);

  // When we've been called recursively on a scatter or conditional section,
  // the 'outer' type environment has everything available in the workflow
  // -except- the body of self.
  let typeEnv = outerTypeEnv || new Env.Bindings();

  if (self instanceof Workflow) {
      // start with workflow inputs
      for (const decl of self.inputs || []) {
          typeEnv = decl.add_to_type_env(doc._struct_types, typeEnv);
      }
  } else if (self instanceof Scatter) {
      // typecheck scatter array
      self.expr.inferType(
          typeEnv,
          stdlib,checkQuant,doc._struct_types
      );
      if (!(self.expr.type instanceof Type.WDLArray)) {
          throw new WDLError.NotAnArray(self.expr);
      }
      if (self.expr.type.itemType instanceof Type.Any) {
          throw new WDLError.IndeterminateType(self.expr, "can't infer item type of empty array");
      }
      // bind the scatter variable to the array item type within the body
      if (typeEnv.hasBinding(self.variable)) {
          throw new WDLError.MultipleDefinitions(
              self,
              "Name collision for scatter variable " + self.variable
          );
      }
      if (typeEnv.hasNamespace(self.variable)) {
          throw new WDLError.MultipleDefinitions(
              self,
              "Call name collision for scatter variable " + self.variable
          );
      }
      typeEnv = typeEnv.bind(self.variable, self.expr.type.itemType, self);
  } else if (self instanceof Conditional) {
      // typecheck the condition
      self.expr.inferType(
          typeEnv,
          stdlib,
          checkQuant,
          doc._struct_types
      );
      if (!self.expr.type.coerces(new Type.Boolean())) {
          throw new WDLError.StaticTypeMismatch(self.expr, new Type.Boolean(), self.expr.type);
      }
  } else {
      assert(false);
  }

  // descend into child scatter & conditional elements, if any.
  for (const child of self.body) {
      if (child instanceof WorkflowSection) {
          // prepare the 'outer' type environment for the child element, by
          // adding all its sibling declarations and call outputs
          let childOuterTypeEnv = typeEnv;
          for (const sibling of self.body) {
              if (sibling !== child) {
                  childOuterTypeEnv = sibling.add_to_type_env(
                      doc._struct_types,
                      childOuterTypeEnv
                  );
              }
          }
          _build_workflow_type_env(doc, stdlib, checkQuant, child, childOuterTypeEnv);
      } else if (child instanceof Decl && !child.type.optional && !child.expr) {
          if (doc.workflow.inputs !== null) {
              throw new WDLError.StrayInputDeclaration(
                  self,
                  `unbound non-optional declaration ${child.type.toString()} ${child.name} outside workflow input{} section`
              );
          } else if (!(self instanceof Workflow)) {
              throw new WDLError.StrayInputDeclaration(
                  self,
                  `unbound non-optional declaration ${child.type.toString()} ${child.name} inside scatter/conditional section`
              );
          }
      }
  }

  // finally, populate self._type_env with all our children
  for (const child of self.body) {
      typeEnv = child.add_to_type_env(doc._struct_types, typeEnv);
  }
  self._type_env = typeEnv;
}
export class StructTypeDef extends WDLError.SourceNode {
  name: string;
  members: Record<string, Type.Base>;
  imported?: [Document, StructTypeDef];

  constructor(
    pos: WDLError.SourcePosition,
    name: string,
    members: Record<string, Type.Base>,
    imported?: [Document, StructTypeDef]
  ) {
    super(pos);
    this.name = name;
    this.members = members;
    this.imported = imported;
  }

  get type_id(): string {
    return Type._struct_type_id(this.members);
  }
}

export abstract class WorkflowNode extends WDLError.SourceNode {
  workflowNodeId: string;
  scatterDepth: number;
  private _memo_workflow_node_dependencies?: Set<string>;

  constructor(workflow_node_id: string, pos: WDLError.SourcePosition) {
    super(pos);
    this.workflowNodeId = workflow_node_id;
    this.scatterDepth = 0;
  }

  get workflowNodeDependencies(): Set<string> {
    if (!this._memo_workflow_node_dependencies) {
      this._memo_workflow_node_dependencies = new Set(
        this._workflow_node_dependencies()
      );
    }
    return this._memo_workflow_node_dependencies;
  }

  protected abstract _workflow_node_dependencies(): Iterable<string>;

  abstract add_to_type_env(
    struct_types: Env.Bindings<Record<string, Type.Base>>,
    type_env: Env.Bindings<Type.Base>
  ): Env.Bindings<Type.Base>;

  _increment_scatter_depth(): void {
    for (const ch of this.children) {
      if (ch instanceof WorkflowNode) {
        ch._increment_scatter_depth();
      }
    }
    this.scatterDepth++;
  }
}
function _translate_struct_mismatch<T>(doc: Document, exc:WDLError.StaticTypeMismatch):WDLError.StaticTypeMismatch {
  // When we get a StaticTypeMismatch error during workflow typechecking,
  // which involves a struct type imported from another document, the error
  // message may require translation from the struct type's original name
  // within in the imported document to its aliased name in the current
  // document.
  let expected : Type.StructInstance|undefined = undefined
  if (exc.expected instanceof Type.StructInstance) {
    expected = exc.expected;
      for (const stb of doc.struct_typedefs) {
          assert(stb instanceof Env.Binding);
          assert(stb.value instanceof StructTypeDef);
          if (Object.is(stb.value.members, expected.members)) {
              expected = new Type.StructInstance(stb.name, 
                  expected.optional 
              );
              expected.members = stb.value.members;
          }
      }
  }
  let actual : Type.StructInstance|undefined = undefined
  if (exc.actual instanceof Type.StructInstance) {
    actual = exc.actual;
    for (const stb of doc.struct_typedefs) {
          assert(stb instanceof Env.Binding);
          assert(stb.value instanceof StructTypeDef);
          if (Object.is(stb.value.members, actual.members)) {
              actual = new Type.StructInstance(stb.name, actual.optional );
              actual.members = stb.value.members;
          }
      }
  }
  assert(expected!==undefined && actual!==undefined)
  return new WDLError.StaticTypeMismatch(
      exc.node,
      expected,
      actual,
      exc.message
  );
}
async function _typecheck_workflow_body(
  doc: Document,
  stdlib: StdLib.Base,
  checkQuant: boolean,
  self?: Workflow | WorkflowSection | null
): Promise<boolean> {
  // following _resolve_calls() and _build_workflow_type_env(), typecheck all
  // the declaration expressions and call inputs
  self = self || doc.workflow;
  assert(self && self._type_env !== null);
  let completeCalls = true;

  const errors = new WDLError.MultiContext();
  try {
      for (const child of self.body) {
          if (child instanceof Decl) {
            try{
              child.typecheck(
                self!._type_env!,
                stdlib,doc._struct_types,checkQuant)
            }catch(error){
              if(error instanceof WDLError.StaticTypeMismatch){
                throw _translate_struct_mismatch(doc,error)
              }
              throw error;
            }
      } else if (child instanceof Call) {
            const rslt = errors.try1(()=>{
              try{
                return child.typecheck_input(
                  doc._struct_types,
                  self!._type_env!,
                  stdlib,
                  checkQuant
                ) === false
              }catch(error){
                if(error instanceof WDLError.StaticTypeMismatch){
                  throw _translate_struct_mismatch(doc,error)
                }
                throw error;

              }
          })
          if (rslt) {
                  completeCalls = false;
              }
          } else if (child instanceof WorkflowSection) {
            const rslt = await _typecheck_workflow_body(
              doc,
              stdlib,
              checkQuant,
              child)
            if(rslt){
              completeCalls = false;
            }
          } else {
              assert(false);
          }
      }
  } finally {
      errors.maybeRaise()
  }

  return completeCalls;
}
/**
 * Position and text of a comment. The text includes the ``#`` and any preceding or trailing
 * spaces/tabs.
 */
interface SourceComment {
  pos: WDLError.SourcePosition;
  text: string;
}

export interface DocImport {
  pos: WDLError.SourcePosition;
  uri: string;
  namespace: string;
  aliases: [string, string][];
  doc: Document | null;
}
function _check_serializable_map_keys(
  t: Type.Base,
  name: string,
  node: WDLError.SourceNode
) {
  // TODO: implement
}

export class Task extends WDLError.SourceNode {
  /**
   * WDL Task
   */

  /**
   * :type: str
   */
  name: string;

  /**
   * :type: Optional[List[WDL.Tree.Decl]]
   *
   * Declarations in the ``input{}`` task section, if it's present
   */
  inputs: Decl[] | null;

  /**
   * :type: List[WDL.Tree.Decl]
   *
   * Declarations outside of the ``input{}`` task section
   */
  postinputs: Decl[];

  /**
   * :type: WDL.Expr.String
   */
  command: Expr.String;

  /**
   * Output declarations
   */
  outputs: Decl[];

  /**
   * :type: Dict[str,Any]
   *
   * ``parameter_meta{}`` section as a JSON-like dict
   */
  parameter_meta: { [key: string]: any };

  /**
   * :type: Dict[str,WDL.Expr.Base]
   *
   * ``runtime{}`` section, with keys and corresponding expressions to be evaluated
   */
  runtime: { [key: string]: Expr.Base };

  /**
   * :type: Dict[str,Any]
   *
   * ``meta{}`` section as a JSON-like dict
   */
  meta: { [key: string]: any };

  /**
   * :type: str
   *
   * Effective WDL version of the containing document
   */
  effective_wdl_version: string;

  private _digest: string = "";

  constructor(
    pos: WDLError.SourcePosition,
    name: string,
    inputs: Decl[] | null,
    postinputs: Decl[],
    command: Expr.String,
    outputs: Decl[],
    parameter_meta: { [key: string]: unknown },
    runtime: { [key: string]: Expr.Base },
    meta: { [key: string]: unknown }
  ) {
    super(pos);
    this.name = name;
    this.inputs = inputs;
    this.postinputs = postinputs;
    this.command = command;
    this.outputs = outputs;
    this.parameter_meta = parameter_meta;
    this.runtime = runtime;
    this.meta = meta;
    this.effective_wdl_version = "1.0"; // overridden by Document.__init__
    // TODO: enforce validity constraints on parameter_meta and runtime
    // TODO: if the input section exists, then all postinputs decls must be
    //       bound
  }

  /**
   * :type: WDL.Env.Bindings[WDL.Tree.Decl]
   *
   * Yields the task's input declarations. This is all declarations in the
   * task's ``input{}`` section, if it's present. Otherwise, it's all
   * declarations in the task, excluding outputs. (This dichotomy bridges
   * pre-1.0 and 1.0+ WDL versions.)
   *
   * Each input is at the top level of the Env, with no namespace.
   */
  get availableInputs(): Env.Bindings<Decl> {
    let ans: Env.Bindings<Decl> = new Env.Bindings();

    if (
      this.effective_wdl_version !== "draft-2" &&
      this.effective_wdl_version !== "1.0"
    ) {
      // synthetic placeholder to expose runtime overrides
      ans = ans.bind("_runtime", new Decl(this.pos, new Type.Any(), "_runtime"));
    }

    const declarations = this.inputs !== null ? this.inputs : this.postinputs;
    for (const decl of [...declarations].reverse()) {
      ans = ans.bind(decl.name, decl);
    }
    return ans;
  }

  /**
   * :type: WDL.Env.Bindings[WDL.Tree.Decl]
   *
   * Yields the input declarations which are required to call the task
   * (available inputs that are unbound and non-optional).
   *
   * Each input is at the top level of the Env, with no namespace.
   */
  get required_inputs(): Env.Bindings<Decl> {
    let ans: Env.Bindings<Decl> = new Env.Bindings();
    for (const b of [...this.availableInputs].reverse()) {
      const d: Decl = b.value;
      if (
        d.expr === null &&
        d.type.optional === false &&
        !d.name.startsWith("_")
      ) {
        ans = new Env.Bindings(b, ans);
      }
    }
    return ans;
  }

  /**
   * :type: WDL.Env.Bindings[Type]
   *
   * Yields each task output with its type, at the top level of the Env with
   * no namespace. (Present for isomorphism with
   * ``Workflow.effective_outputs``)
   */
  get effectiveOutputs(): Env.Bindings<Type.Base> {
    let ans: Env.Bindings<Type.Base> = new Env.Bindings();
    for (const decl of [...this.outputs].reverse()) {
      ans = ans.bind(decl.name, decl.type, decl);
    }
    return ans;
  }
  override get children(): Iterable<WDLError.SourceNode> {
    const children = [];
    if (this.inputs) {
      children.push(...this.inputs);
    }
    children.push(...this.postinputs);
    children.push(this.command);
    children.push(...this.outputs);
    for (const [_, ex] of Object.entries(this.runtime)) {
      children.push(ex);
    }
    return children;
  }

  typecheck(
    struct_types: Env.Bindings<{ [key: string]: Type.Base }> | null = null,
    check_quant: boolean = true
  ): void {
    struct_types = struct_types || new Env.Bindings();

    // warm-up check: if input{} section exists then all postinput decls
    // must be bound
    if (this.inputs !== null) {
      for (const decl of this.postinputs) {
        if (!decl.type.optional && !decl.expr) {
          throw new WDLError.StrayInputDeclaration(
            this,
            `unbound non-optional declaration ${decl.type} ${decl.name} outside task input{} section`
          );
        }
      }
    }

    // First collect a type environment for all the input & postinput
    // declarations, so that we're prepared for possible forward-references
    // in their right-hand side expressions.
    let type_env: Env.Bindings<Type.Base> = new Env.Bindings();
    for (const decl of (this.inputs || []).concat(this.postinputs)) {
      type_env = decl.add_to_type_env(struct_types, type_env);
    }

    WDLError.multiContext((errors)=>{
      const stdlib = new StdLib.Base(this.effective_wdl_version);

      // Pass through input & postinput declarations again, typecheck their
      // right-hand side expressions against the type environment.
      for (const decl of (this.inputs || []).concat(this.postinputs)) {
        errors.try1(() => {
          decl.typecheck(type_env, stdlib, struct_types, check_quant);
        });
      }
  
      // Typecheck the command (string)
      errors.try1(() => {
        this.command
          .inferType(type_env, stdlib, check_quant, struct_types)
          .typecheck(new Type.String());
      });
  
      for (const b of this.availableInputs) {
        errors.try1(() =>
          _check_serializable_map_keys(b.value.type, b.name, b.value)
        );
      }
  
      // Typecheck runtime expressions
      for (const [_, runtime_expr] of Object.entries(this.runtime)) {
        errors.try1(() => {
          runtime_expr.inferType(type_env, stdlib, check_quant, struct_types);
        });
      }
  
      // Add output declarations to type environment
      for (const decl of this.outputs) {
        const type_env2 = errors.try1(() =>
          decl.add_to_type_env(struct_types, type_env)
        );
        if (type_env2) {
          type_env = type_env2;
        }
      }
  
      errors.maybeRaise();
  
      // Typecheck the output expressions
      const stdlibOutputs = new StdLib.TaskOutputs(this.effective_wdl_version);
      for (const decl of this.outputs) {
        errors.try1(() => {
          decl.typecheck(type_env, stdlibOutputs, struct_types, check_quant);
        });
        errors.try1(() =>
          _check_serializable_map_keys(decl.type, decl.name, decl)
        );
      }
  
    });

    // check for cyclic dependencies among decls
    _detect_cycles(
      _decl_dependency_matrix(
        Array.from(this.children).filter(
          (item): item is Decl => item instanceof Decl
      )
      )
    );
  }

  /**
   * Content digest of the task, for use e.g. as a cache key. The digest is an opaque string of
   * a few dozen alphanumeric characters, sensitive to the task's source code (with best effort
   * to exclude comments and whitespace).
   */
  async digest(): Promise<string> {
    if (this._digest) {
      return this._digest;
    }
    this._digest = await calcSHA256(this._digest_source());
    return this._digest;
  }

  private _digest_source(): string {
    const doc = (this as any).parent as Document;

    // For now we just excerpt the task's source code, minus comments and blank lines, plus
    // annotations for the WDL version and struct types.
    const source_lines: string[] = [];
    if (doc.wdl_version) {
      source_lines.push("version " + doc.wdl_version);
    }

    // Insert comments describing struct types used in the task.
    const structs = _describe_struct_types(this);
    for (const struct_name of Object.keys(structs).sort()) {
      source_lines.push(`# ${struct_name} :: ${structs[struct_name]}`);
    }

    // excerpt task{} from document
    // Possible future improvements:
    // excise the meta & parameter_meta sections
    // normalize order of declarations
    // normalize whitespace within lines (not leading/trailing)
    source_lines.push(..._source_excerpt(doc, this.pos, [this.command.pos]));
    return source_lines.join("\n").trim();
  }
}
export class Call extends WorkflowNode {
  /** A call (within a workflow) to a task or sub-workflow */

  callee_id: string[];
  /** The called task; either one string naming a task in the current document, or an import namespace and task name. */

  name: string;
  /** Call name, defaults to task/workflow name */

  after: string[];
  /** Call names on which this call depends (even if none of their outputs are used in this call's inputs) */

  _after_node_ids: Set<string>;
  inputs: { [key: string]: Expr.Base };
  /** Call inputs provided */

  callee: Task | Workflow | null;
  /** Refers to the `Task` or imported `Workflow` object to be called (after AST typechecking) */

  constructor(
    pos: WDLError.SourcePosition,
    callee_id: string[],
    alias: string | null,
    inputs: { [key: string]: Expr.Base },
    after: string[] | null = null
  ) {
    super("call-" + (alias || callee_id[callee_id.length - 1]), pos);
    this.callee_id = callee_id;
    this.name = alias || this.callee_id[this.callee_id.length - 1];
    this.inputs = inputs;
    this.callee = null;
    this.after = after || [];
    this._after_node_ids = new Set();
  }

  override get children(): Iterable<WDLError.SourceNode> {
    return Object.values(this.inputs);
  }

  resolve(doc: Document): void {
    if (this.callee) return;
    let callee_doc: Document | null = null;
    if (this.callee_id.length === 1) {
      callee_doc = doc;
    } else if (this.callee_id.length === 2) {
      for (const imp of doc.imports) {
        if (imp.namespace === this.callee_id[0]) {
          callee_doc = imp.doc;
          break;
        }
      }
    }
    if (callee_doc) {
      const wf = callee_doc.workflow;
      if (
        wf instanceof Workflow &&
        wf.name === this.callee_id[this.callee_id.length - 1]
      ) {
        if (callee_doc === doc) throw new WDLError.CircularDependencies(this);
        if (!wf.complete_calls || (!wf.outputs && wf.effectiveOutputs))
          throw new WDLError.UncallableWorkflow(this, this.callee_id.join("."));
        this.callee = wf;
      } else {
        for (const task of callee_doc.tasks) {
          if (task.name === this.callee_id[this.callee_id.length - 1]) {
            this.callee = task;
            break;
          }
        }
      }
    }
    if (!this.callee)
      throw new WDLError.NoSuchTask(this, this.callee_id.join("."));
    if (this.name === doc.workflow?.name)
      throw new WDLError.MultipleDefinitions(
        this,
        "Call's name may not equal the containing workflow's"
      );

    if (!(this.callee instanceof Task || this.callee instanceof Workflow))
      throw new Error("Callee must be a Task or Workflow");
  }

  add_to_type_env(
    _: Env.Bindings<{ [key: string]: Type.Base }>,
    type_env: Env.Bindings<Type.Base>
  ): Env.Bindings<Type.Base> {
    if (!this.callee) throw new Error("Callee not resolved");

    if (this.name in type_env)
      throw new WDLError.MultipleDefinitions(
        this,
        "Value/call name collision on " + this.name
      );

    if (type_env.hasNamespace(this.name))
      throw new WDLError.MultipleDefinitions(
        this,
        `Workflow has multiple calls named ${this.name}; give calls distinct names using \`call ${this.callee.name} as NAME ...\``
      );

    return Env.merge(
      this.effectiveOutputs,
      type_env.bind(this.name + "." + "_present", new Type.Any(), this)
    );
  }

  typecheck_input(
    struct_types: Env.Bindings<{ [key: string]: Type.Base }>,
    type_env: Env.Bindings<Type.Base>,
    stdlib: StdLib.Base,
    check_quant: boolean
  ): boolean {
    if (!this.callee) throw new Error("Callee not resolved");

    for (const call_after of this.after) {
      try {
        this._after_node_ids.add(
          type_env.resolveBinding(call_after + "._present").info
            .workflow_node_id
        );
      } catch (err) {
        throw new WDLError.NoSuchCall(this, call_after);
      }
    }

    const required_inputs = new Set(
      [...this.callee.required_inputs].map((decl) => decl.name)
    );

    const all_required_inputsProvided = true;
    WDLError.multiContext((errors) => {
    for (const [name, expr] of Object.entries(this.inputs)) {
      const decl = this.callee?.availableInputs.get(name);
      if (!decl) {
        errors.append(new WDLError.NoSuchInput(expr, name));
      }else{
        const decltype = decl.expr?decl.type.copy(true):decl.type;
          errors.try1(() => {
            ((expr: Expr.Base, decltype: Type.Base) => {
              expr.inferType(type_env, stdlib,
                  check_quant,
                  struct_types
              ).typecheck(decltype);
          })(expr, decltype);
        });
      if (required_inputs.has(name)) required_inputs.delete(name);
    }
  }})
  return required_inputs.size === 0;
}

  get availableInputs(): Env.Bindings<Decl> {
    if (!this.callee) throw new Error("Callee not resolved");

    const supplied_inputs = new Set(Object.keys(this.inputs));
    return this.callee.availableInputs
      .filter((b) => !supplied_inputs.has(b.name))
      .wrapNamespace(this.name);
  }

  get required_inputs(): Env.Bindings<Decl> {
    if (!this.callee) throw new Error("Callee not resolved");

    const supplied_inputs = new Set(Object.keys(this.inputs));
    return this.callee.required_inputs
      .filter((b) => !supplied_inputs.has(b.name))
      .wrapNamespace(this.name);
  }

  get effectiveOutputs(): Env.Bindings<Type.Base> {
    if (!this.callee) throw new Error("Callee not resolved");

    let ans = new Env.Bindings<Type.Base>();
    for (const outp of [...this.callee.effectiveOutputs].reverse()) {
      ans = ans.bind(this.name + "." + outp.name, outp.value, this);
    }
    return ans;
  }

  _workflow_node_dependencies(): Iterable<string> {
    return function* (this: Call) {
      if (this.after.length !== this._after_node_ids.size)
        throw new Error("Mismatched after node IDs");

      yield* this._after_node_ids;

      for (const expr of Object.values(this.inputs)) {
        yield* _expr_workflow_node_dependencies(expr);
      }
    }.call(this);
  }
}

function assert(
  condition: unknown,
  message: string = "Assertion failed"
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
function* _calls(element: Workflow | WorkflowSection): Generator<Call> {
  // Yield each Call in the workflow, including those nested within scatter/conditional sections
  for (const ch of element.children) {
    if (ch instanceof Call) {
      yield ch;
    } else if (ch instanceof WorkflowSection) {
      yield* _calls(ch);
    }
  }
}
function _resolve_calls(doc: Document) {
    // Resolve all calls in the workflow (descending into scatter & conditional
    // sections).
    const wf = doc.workflow
    if(wf!==null){
        WDLError.multiContext((errors)=>{
            for(const c of _calls(wf)){
                errors.try1(()=> c.resolve(doc))
            }
          })
    }
  }
function reverse<T>(gen: Generator<T>): Generator<T> {
  // Generatorの出力を配列に格納
  const items = [...gen];
  // 配列を逆順にして新しいGeneratorを返す
  return (function* () {
    for (let i = items.length - 1; i >= 0; i--) {
      yield items[i];
    }
  })();
}

export class Workflow extends WDLError.SourceNode {
  name: string;
  inputs: Decl[];
  body: WorkflowNode[]; // List<Union<Decl, Call, Scatter, Conditional>>
  outputs: Decl[];
  _output_idents: string[][];
  _output_idents_pos: WDLError.SourcePosition | undefined;
  parameter_meta: { [key: string]: unknown }; // Dict<string, any>
  meta: { [key: string]: unknown }; // Dict<string, any>
  _type_env: Env.Bindings<Type.Base> | undefined = undefined;
  /**
   * After typechecking: the type environment in the main workflow body,
    - declarations at the top level of the workflow body
    - outputs of calls at the top level the workflow body
    - declarations & outputs inside scatter sections (as arrays)
    - declarations & outputs inside conditional sections (as optionals)
   */
  complete_calls: boolean;
  _nodes_by_id: { [key: string]: WorkflowNode } = {};
  effectiveWdlVersion: string;

  constructor(
    pos: WDLError.SourcePosition,
    name: string,
    inputs: Decl[],
    body: WorkflowNode[],
    outputs: Decl[],
    parameter_meta: { [key: string]: unknown },
    meta: { [key: string]: unknown },
    output_idents: string[][] | undefined = [],
    output_idents_pos: WDLError.SourcePosition | undefined = undefined
  ) {
    super(pos);
    this.name = name;
    this.inputs = inputs;
    this.body = body;
    this.outputs = outputs;
    this._output_idents = output_idents || [];
    this._output_idents_pos = output_idents_pos;
    this.parameter_meta = parameter_meta;
    this.meta = meta;
    this.complete_calls = true;
    this.effectiveWdlVersion = ""; // overridden by Document.__init__

    for (const output_decl of this.outputs || []) {
      output_decl.workflowNodeId = output_decl.workflowNodeId.replace(
        "decl-",
        "output-"
      );
    }
  }

  get availableInputs(): Env.Bindings<Decl> {
    let ans = new Env.Bindings<Decl>();

    for (const c of reverse(_calls(this))) {
      ans = Env.merge(c.availableInputs, ans);
    }

    if (this.inputs !== undefined) {
      for (const decl of this.inputs.reverse()) {
        ans = ans.bind(decl.name, decl);
      }
    } else {
      for (const elt of this.body.reverse()) {
        if (elt instanceof Decl) {
          ans = ans.bind(elt.name, elt);
        }
      }
    }

    return ans;
  }

  get required_inputs(): Env.Bindings<Decl> {
    let ans = new Env.Bindings<Decl>();

    for (const c of reverse(_calls(this))) {
      ans = Env.merge(c.required_inputs, ans);
    }

    for (const b of this.availableInputs) {
      if (!b.name.includes(".")) {
        const d = b.value;
        if (d instanceof Decl && !d.type.optional && !d.expr) {
          ans = ans.bind(b.name, b.value);
        }
      }
    }

    return ans;
  }

  get effectiveOutputs(): Env.Bindings<Type.Base> {
    let ans = new Env.Bindings<Type.Base>();

    if (this.outputs !== undefined) {
      for (const decl of this.outputs.reverse()) {
        ans = ans.bind(decl.name, decl.type, decl);
      }
    } else {
      for (const elt of this.body.reverse()) {
        if (elt instanceof Call || elt instanceof WorkflowSection) {
          ans = Env.merge(elt.effectiveOutputs, ans);
        }
      }
    }

    return ans;
  }

  override get children(): Iterable<WDLError.SourceNode> {
    const children = [];
    children.push(...this.inputs);
    children.push(...this.body);
    children.push(...this.outputs);
    return children;
  }

  async typecheck(doc: Document, checkQuant: boolean): Promise<void> {
    assert(doc.workflow === this);
    
    // 1. resolve all calls and check for call name collisions
    _resolve_calls(doc);
    
    // 2. build type environments in the workflow and each scatter &
    //    conditional section therein
    const stdlib = new StdLib.Base(this.effectiveWdlVersion);
    _build_workflow_type_env(doc, stdlib, checkQuant);
    if(this._type_env === undefined){
      throw new Error("unexpected")
    }
    
    const errors = new WDLError.MultiContext();
    try {
        // 3. typecheck the right-hand side expressions of each declaration
        //    and the inputs to each call (descending into scatter & conditional
        //    sections)
        for (const decl of this.inputs || []) {
            errors.try1(
                () => decl.typecheck(
                        this._type_env!,
                        stdlib,doc._struct_types,checkQuant))
        }

        if (await errors.try1(() => _typecheck_workflow_body(doc, stdlib, checkQuant)) === false) {
            this.complete_calls = false;
        }

        for (const b of this.availableInputs) {
            errors.try1(() => _check_serializable_map_keys(b.value.type, b.name, b.value));
        }

        // 4. convert deprecated output_idents, if any, to output declarations
        if (this._output_idents) {
            this._rewrite_output_idents();
        }

        // 5. typecheck the output expressions
        if (this.outputs) {
            const outputNames: Set<string> = new Set();
            const outputTypeEnv = this._type_env;
            assert(outputTypeEnv !== null);

            for (const output of this.outputs) {
                assert(output.expr);
                if (outputNames.has(output.name)) {
                    errors.append(
                        new WDLError.MultipleDefinitions(
                            output ,
                            "multiple workflow outputs named " + output.name
                        )
                    );
                }
                outputNames.add(output.name);

                // tricky sequence here: we need to call Decl.add_to_type_env to resolve
                // potential struct type, but:
                // 1. we may not want it to check for name collision in the usual way in order to
                //    handle a quirk of draft-2 workflow output style, where an output may take
                //    the name of another decl in the workflow. Instead we've tracked and
                //    rejected any duplicate names among the workflow outputs.
                // 2. we still want to typecheck the output expression againsnt the 'old' type
                //    environment
                const outputTypeEnv2 = output.add_to_type_env(
                    doc._struct_types,
                    outputTypeEnv,
                   (output as any)._rewritten_ident || false 
                );

                errors.try1(
                    () => output.typecheck(
                        outputTypeEnv,
                        stdlib,doc._struct_types,checkQuant)
                );

                errors.try1(
                    () => _check_serializable_map_keys(output.type, output.name, output)
                );
            }
        }
    } finally {
         errors.maybeRaise();
    }

    // 6. check for cyclic dependencies
    _detect_cycles(_workflow_dependency_matrix(this));
}
  _rewrite_output_idents(): void {
    assert(this._type_env !== undefined);

    const output_ident_decls = [];
    for (const output_ident of this._output_idents) {
      assert(this._output_idents_pos);
      const output_idents = [output_ident];

      if (output_idents[0][output_idents[0].length-1] === "*") {
        const wildcard_namespace_parts = output_idents[0].slice(0, -1);
        const wildcard_namespace = wildcard_namespace_parts.join(".");
        const output_idents2 = [];
        if (!this._type_env.hasNamespace(wildcard_namespace)) {
          throw new WDLError.NoSuchTask(
            this._output_idents_pos,
            wildcard_namespace
          );
        }
        for (const binding of this._type_env.enterNamespace(
          wildcard_namespace
        )) {
          const binding_name = binding.name;
          if (!binding_name.startsWith("_")) {
            output_idents2.push([...wildcard_namespace_parts, binding_name]);
          }
        }
      }

      for (const output_ident1 of output_idents) {
        const synthetic_output_name = output_ident1.join(".");
        const ty = this._type_env.get(synthetic_output_name);
        if (!ty) {
          throw new WDLError.UnknownIdentifier(
            new Expr.Ident(this._output_idents_pos, synthetic_output_name)
          );
        }
        output_ident_decls.push(
          new Decl(
            this.pos,
            ty,
            synthetic_output_name,
            new Expr.Ident(this._output_idents_pos, synthetic_output_name),
            "output"
          )
        );
      }
    }

    for (const decl of output_ident_decls) {
      (decl as any)._rewritten_ident = true;
    }

    this.outputs = output_ident_decls.concat(this.outputs || []);
    this._output_idents = [];
  }

  getNode(workflow_node_id: string): WorkflowNode {
    if (!this._nodes_by_id) {
      const visit = (node: WDLError.SourceNode): void => {
        if (node instanceof WorkflowNode) {
          this._nodes_by_id[node.workflowNodeId] = node;
          for (const ch of node.children) {
            visit(ch);
          }
        }
      };

      for (const ch of this.children) {
        visit(ch);
      }
    }
    return this._nodes_by_id[workflow_node_id];
  }

  private _digest: string = "";

  async digest(): Promise<string> {
    if (this._digest) return this._digest;
    this._digest = await calcSHA256(this._digest_source());
    return this._digest;
  }

  private _digest_source(): string {
    const doc = this.parent as Document;
    assert(doc instanceof Document);

    const source_lines: string[] = [];
    if (doc.wdl_version) {
      source_lines.push("version " + doc.wdl_version);
    }

    const structs = _describe_struct_types(this);
    for (const struct_name of Object.keys(structs).sort()) {
      source_lines.push(`# ${struct_name} :: ${structs[struct_name]}`);
    }

    for (const call of _calls(this)) {
      const callee = call.callee;
      source_lines.push(`# ${call.callee_id.join(".")} :: ${callee?.digest}`);
    }

    source_lines.push(..._source_excerpt(doc, this.pos));
    return source_lines.join("\n").trim();
  }
}
export class Gather extends WorkflowNode {
  /**
   * A `Gather` node symbolizes the operation to gather an array of declared values or call
   * outputs in a scatter section, or optional values from a conditional section. These operations
   * are implicit in the WDL syntax, but explicating them in the AST facilitates analysis of the
   * workflow's data types and dependency structure.
   *
   * Each scatter/conditional section provides `Gather` nodes to expose the section body's
   * products to the rest of the workflow. When a :class:`WDL.Expr.Ident` elsewhere identifies a
   * node inside the section, its `referee` attribute is the corresponding `Gather` node, which
   * in turn references the interior node. The interior node might itself be another `Gather`
   * node, from a nested scatter/conditional section.
   */

  section: WorkflowSection;
  /**
   * The `Scatter`/`Conditional` section implying this Gather operation
   */
  referee: Decl | Call | Gather;
  /**
   * The `Decl`, `Call`, or sub-`Gather` node from which this operation "gathers"
   */

  constructor(section: WorkflowSection, referee: Decl | Call | Gather) {
    super("gather-" + referee.workflowNodeId, referee.pos);
    this.section = section;
    this.referee = referee;
  }

  add_to_type_env(
    _: Env.Bindings<{ [key: string]: Type.Base }>,
    _1: Env.Bindings<Type.Base>
  ): Env.Bindings<Type.Base> {
    throw new Error("NotImplementedError");
  }

  _workflow_node_dependencies(): Iterable<string> {
    return function* (this: Gather) {
      yield this.referee.workflowNodeId;
    }.call(this);
  }

  override get children(): Iterable<WDLError.SourceNode> {
    return []
  }

  get finalReferee(): Decl | Call {
    /**
     * The `Decl` or `Call` node found at the end of the referee chain through any nested
     * `Gather` nodes
     */
    let ans = this.referee;
    while (ans instanceof Gather) {
      ans = ans.referee;
    }
    if (!(ans instanceof Decl || ans instanceof Call)) {
      throw new Error("Expected final referee to be a Decl or Call");
    }
    return ans;
  }
}

export abstract class WorkflowSection extends WorkflowNode {
  /**
   * Base class for workflow nodes representing scatter and conditional sections
   */

  body: WorkflowNode[];
  /**
   * Section body, potentially including nested sections.
   */
  gathers: { [key: string]: Gather };
  /**
   * `Gather` nodes exposing the section body's products to the rest of the workflow.
   * The dict is keyed by `workflow_node_id` of the interior node.
   */
  _type_env?: Env.Bindings<Type.Base>;
  /**
   * After typechecking: the type environment, INSIDE the section.
   */

  constructor(body: WorkflowNode[], workflow_node_id: string, pos: WDLError.SourcePosition) {
    super(workflow_node_id,pos);
    this.body = body;
    this.gathers = {};
    for (const elt of this.body) {
      if (elt instanceof Decl || elt instanceof Call) {
        this.gathers[elt.workflowNodeId] = new Gather(this, elt);
      } else if (elt instanceof WorkflowSection) {
        for (const subgather of Object.values(elt.gathers)) {
          this.gathers[subgather.workflowNodeId] = new Gather(
            this,
            subgather
          );
        }
      }
    }
  }

  override get children(): Iterable<WDLError.SourceNode> {
    const children = [];
    children.push(...this.body);
    children.push(...Object.values(this.gathers));
    return children;
  }

  abstract get effectiveOutputs(): Env.Bindings<Type.Base>;
}

export class Scatter extends WorkflowSection {
  /** Workflow scatter section */
  variable: string;
  /** Scatter variable name */
  expr: Expr.Base;
  /** Expression for the array over which to scatter */

  constructor(
    pos: WDLError.SourcePosition,
    variable: string,
    expr: Expr.Base,
    body: WorkflowNode[]
  ) {
    super(body, `scatter-L${pos.line}C${pos.column}-${variable}`, pos);
    this.variable = variable;
    this.expr = expr;

    for (const body_node of this.body) {
      body_node._increment_scatter_depth();
    }
  }

  override get children(): Iterable<WDLError.SourceNode> {
    const children = [];
    children.push(this.expr);
    children.push(...super.children);
    return children
  }

  add_to_type_env(
    struct_types: Env.Bindings<{ [key: string]: Type.Base }>,
    type_env: Env.Bindings<Type.Base>
  ): Env.Bindings<Type.Base> {
    let inner_type_env = new Env.Bindings<Type.Base>();
    for (const elt of this.body) {
      inner_type_env = elt.add_to_type_env(struct_types, inner_type_env);
    }
    const nonempty =
      this.expr.type instanceof WDLArray && this.expr.type.nonempty;

    const arrayize = (
      binding: Env.Binding<Type.Base>
    ): Env.Binding<Type.Base> => {
      return new Env.Binding(
        binding.name,
        new WDLArray(binding.value, nonempty),
        this.gathers[binding.info.workflow_node_id]
      );
    };

    return Env.merge(inner_type_env.map(arrayize), type_env);
  }

  get effectiveOutputs(): Env.Bindings<Type.Base> {
    const nonempty =
      this.expr.type instanceof WDLArray && this.expr.type.nonempty;
    let inner_outputs = new Env.Bindings<Type.Base>();
    for (const elt of this.body) {
      if (!(elt instanceof Decl)) {
        if(elt instanceof Call ||elt instanceof Scatter || elt instanceof Conditional){
          inner_outputs = Env.merge(elt.effectiveOutputs, inner_outputs);
        }
      }
    }

    const arrayize = (
      binding: Env.Binding<Type.Base>
    ): Env.Binding<Type.Base> => {
      return new Env.Binding(
        binding.name,
        new WDLArray(binding.value, nonempty),
        this.gathers[binding.info.workflow_node_id]
      );
    };

    return inner_outputs.map(arrayize);
  }

  _workflow_node_dependencies(): Iterable<string> {
    return _expr_workflow_node_dependencies(this.expr);
  }
}

export class Conditional extends WorkflowSection {
  /** Workflow conditional (if) section */
  expr: Expr.Base;
  /** Boolean expression */

  constructor(
    pos: WDLError.SourcePosition,
    expr: Expr.Base,
    body: WorkflowNode[]
  ) {
    super(body, `if-L${pos.line}C${pos.column}`, pos);
    this.expr = expr;
  }

  override get children(): Iterable<WDLError.SourceNode> {
    const children = [];
    children.push(this.expr);
    children.push(...super.children);
    return children;
  }

  add_to_type_env(
    struct_types: Env.Bindings<{ [key: string]: Type.Base }>,
    type_env: Env.Bindings<Type.Base>
  ): Env.Bindings<Type.Base> {
    let inner_type_env = new Env.Bindings<Type.Base>();
    for (const elt of this.body) {
      inner_type_env = elt.add_to_type_env(struct_types, inner_type_env);
    }

    const optionalize = (
      binding: Env.Binding<Type.Base>
    ): Env.Binding<Type.Base> => {
      return new Env.Binding(
        binding.name,
        binding.value.copy(true ),
        this.gathers[binding.info.workflow_node_id]
      );
    };

    return Env.merge(inner_type_env.map(optionalize), type_env);
  }

  get effectiveOutputs(): Env.Bindings<Type.Base> {
    let inner_outputs = new Env.Bindings<Type.Base>();
    for (const elt of this.body) {
      if (elt instanceof Call || elt instanceof WorkflowSection) {
        inner_outputs = Env.merge(elt.effectiveOutputs, inner_outputs);
      }
    }

    const optionalize = (
      binding: Env.Binding<Type.Base>
    ): Env.Binding<Type.Base> => {
      return new Env.Binding(
        binding.name,
        binding.value.copy( true ),
        this.gathers[binding.info.workflow_node_id]
      );
    };

    return inner_outputs.map(optionalize);
  }

  _workflow_node_dependencies(): Iterable<string> {
    return _expr_workflow_node_dependencies(this.expr);
  }
}

/**
 * Represents one imported document, with position of the import statement, import URI, namespace,
 * struct type aliases, and (after typechecking) the ``Document`` object.
 */

export class Document extends WDLError.SourceNode {
  /**
   * Top-level document, with imports, tasks, and up to one workflow. Typically returned by
   * :func:`~WDL.load`.
   */

  /**
   * :type: str
   *
   * Original WDL source code text
   */
  source_text: string;

  /**
   * :type: List[str]
   *
   * Original WDL source code text split by newlines. ``SourcePosition`` line numbers are
   * one-based, so line number ``L`` corresponds to ``source_lines[L-1]``.
   */
  source_lines: string[];

  /**
   * :type: List[Optional[SourceComment]]
   *
   * Lookup table for source code comments. ``source_comments`` has the same length as
   * ``source_lines``, and each entry is the :class:`WDL.Tree.SourceComment` found on the
   * corresponding source line, or ``None`` if the line has no comment.
   */
  source_comments: (SourceComment | null)[];

  /**
   * :type: Optional[str]
   *
   * Declared WDL language version, if any
   */
  wdl_version: string | null;

  /**
   * :type"
   *
   * ``wdl_version if wdl_version is not None else "draft-2"``
   */
  effective_wdl_version: string;

  /**
   * :type: List[DocImport]
   *
   * Imported documents
   */
  imports: DocImport[];

  /**
   * :type: Env.Bindings[WDL.Tree.StructTypeDef]
   */
  struct_typedefs: Env.Bindings<StructTypeDef>;

  // simpler mapping of struct names to their members, used for typechecking ops
  _struct_types: Env.Bindings<{ [key: string]: Type.Base }>;

  /**
   * :type: List[WDL.Tree.Task]
   */
  tasks: Task[];

  /**
   * :type: Optional[WDL.Tree.Workflow]
   */
  workflow: Workflow | null;

  constructor(
    source_text: string,
    pos: WDLError.SourcePosition,
    imports: DocImport[],
    struct_typedefs: { [key: string]: StructTypeDef },
    tasks: Task[],
    workflow: Workflow | null,
    comments: SourceComment[],
    wdl_version: string | null
  ) {
    super(pos);
    this.imports = imports;
    this.struct_typedefs = new Env.Bindings();
    for (const [name, struct_typedef] of Object.entries(struct_typedefs)) {
      this.struct_typedefs = this.struct_typedefs.bind(name, struct_typedef);
    }
    this._struct_types = new Env.Bindings();
    this.tasks = tasks;
    this.workflow = workflow;
    this.source_text = source_text;
    this.source_lines = source_text.split("\n");
    this.source_comments = this.source_lines.map(() => null);
    for(const comment of comments) {
      this.source_comments[comment.pos.line-1] = comment;
    }
    this.wdl_version = wdl_version;
    this.effective_wdl_version = wdl_version !== null ? wdl_version : "draft-2";

    for (const task of this.tasks) {
      task.effective_wdl_version = this.effective_wdl_version;
    }
    if (this.workflow) {
      this.workflow.effectiveWdlVersion = this.effective_wdl_version;
    }

    for (const comment of comments) {
      if (this.source_comments[comment.pos.line - 1] !== null) {
        throw new Error("Duplicate comment on line");
      }
      if (!this.source_lines[comment.pos.line - 1].endsWith(comment.text)) {
        throw new Error("Comment text mismatch");
      }
      this.source_comments[comment.pos.line - 1] = comment;
    }
  }

  override get children(): Iterable<WDLError.SourceNode> {
    const children = [];
    for (const imp of this.imports) {
      if (imp.doc) {
        children.push(imp.doc);
      }
    }
    for (const stb of this.struct_typedefs) {
        children.push(stb.value);
    }
    children.push(...this.tasks);
    if(this.workflow) {
        children.push(...this.workflow.children);
    }
    return children;
  }

  /**
   * Typecheck each task in the document, then the workflow, if any.
   *
   * Documents returned by :func:`~WDL.load` have already been typechecked.
   */
  async typecheck(check_quant: boolean = true): Promise<void> {
    const names = new Set<string>();
    for (const imp of this.imports) {
      if (names.has(imp.namespace)) {
        throw new WDLError.MultipleDefinitions(
          this,
          "Multiple imports with namespace " + imp.namespace
        );
      }
      names.add(imp.namespace);
    }
    _import_structs(this);
    for (const struct_binding of this.struct_typedefs) {
      this._struct_types = this._struct_types.bind(
        struct_binding.name,
        struct_binding.value.members
      );
    }
    _initialize_struct_typedefs(this.struct_typedefs, this._struct_types);

    const taskNames = new Set<string>();
    // typecheck each task
    WDLError.multiContext((errors)=>{
    for (const task of this.tasks) {
      if (taskNames.has(task.name)) {
        errors.append(
          new WDLError.MultipleDefinitions(
            task,
            "Multiple tasks named " + task.name
          )
        );
      }
      taskNames.add(task.name);
      errors.try1(() => task.typecheck(this._struct_types, check_quant));
    }
    });

    // typecheck the workflow
    if (this.workflow) {
      if (taskNames.has(this.workflow.name)) {
        throw new WDLError.MultipleDefinitions(
          this.workflow,
          "Workflow name collides with a task also named " + this.workflow.name
        );
      }
      await this.workflow.typecheck(this, check_quant);
    }
  }
}
export class Decl extends WorkflowNode {
  type: Type.Base;
  name: string;
  expr?: Expr.Base;
  decor: Record<string, any> = {};

  constructor(
    pos: WDLError.SourcePosition,
    type: Type.Base,
    name: string,
    expr?: Expr.Base,
    id_prefix: string = "decl"
  ) {
    super(`${id_prefix}-${name}`, pos);
    this.type = type;
    this.name = name;
    this.expr = expr;
  }

  override toString(): string {
    if (!this.expr) {
      return `${this.type} ${this.name}`;
    }
    return `${this.type} ${this.name} = ${this.expr}`;
  }

  override get children(): Iterable<WDLError.SourceNode> {
    if(this.expr) {
        return [this.expr]
    }else{
        return []
    }
  }

  add_to_type_env(
    struct_types: Env.Bindings<Record<string, Type.Base>>,
    type_env: Env.Bindings<Type.Base>,
    collision_ok: boolean = false
  ): Env.Bindings<Type.Base> {
    if (!collision_ok) {
      if (type_env.hasBinding(this.name)) {
        throw new WDLError.MultipleDefinitions(
          this,
          `Multiple declarations of ${this.name}`
        );
      }
      if (type_env.hasNamespace(this.name)) {
        throw new WDLError.MultipleDefinitions(
          this,
          `Value/call name collision on ${this.name}`
        );
      }
    }
    _resolve_struct_types(this.pos, this.type, struct_types);
    if (this.type instanceof Type.StructInstance) {
      return _add_struct_instance_to_type_env(
        this.name,
        this.type,
        type_env,
        this
      );
    }
    return type_env.bind(this.name, this.type, this);
  }

  typecheck(
    type_env: Env.Bindings<Type.Base>,
    stdlib: StdLib.Base,
    struct_types: Env.Bindings<Record<string, Type.Base>>,
    check_quant: boolean = true
  ): void {
    if (this.expr) {
      this.expr
        .inferType(type_env, stdlib, check_quant, struct_types)
        .typecheck(this.type);
    }
  }

  protected *_workflow_node_dependencies(): Generator<string> {
    yield* _expr_workflow_node_dependencies(this.expr);
  }
}

function* _expr_workflow_node_dependencies(
  expr: Expr.Base | undefined
): Iterable<string> {
  // Given some Expr within a workflow, yield the workflow node IDs of the referees of each
  // Expr.Ident subexpression. These referees can include
  //   - Decl: reference to a named value
  //   - Call: reference to a call output
  //   - Gather: reference to values(s) (array/optional) gathered from a scatter or conditional
  //             section
  if (expr instanceof Expr.Ident) {
    if (!(expr.referee instanceof WorkflowNode))
      throw new Error("Expected WorkflowNode referee");
    if (!(expr.referee instanceof WorkflowSection)) {
      yield expr.referee.workflowNodeId;
    }
  }
  for (const ch of expr?.children || []) {
    if (!(ch instanceof Expr.Base)) throw new Error("Expected Expr.Base child");
    yield* _expr_workflow_node_dependencies(ch);
  }
}

export function _decl_dependency_matrix(
  decls: Decl[]
): [Record<string, Decl>, Util.AdjM<string>] {
  // Given decls (e.g. in a task), produce mapping of workflow node id to the objects, and the
  // AdjM of their dependencies (edge from o1 to o2 = o2 depends on o1)
  const objs_by_id: Record<string, Decl> = Object.fromEntries(
    decls.map((decl) => [decl.workflowNodeId, decl])
  );
  if (Object.keys(objs_by_id).length !== decls.length)
    throw new Error("Duplicate workflow node IDs in decls");

  const adj = new Util.AdjM<string>();

  for (const obj of decls) {
    const oid = obj.workflowNodeId;
    adj.add_node(oid);
    for (const dep_id of obj.workflowNodeDependencies) {
      if (dep_id in objs_by_id) adj.add_edge(dep_id, oid);
    }
  }

  if (new Set(Object.keys(objs_by_id)).size !== adj.nodes.length)
    throw new Error("Mismatch between obj IDs and adj nodes");
  return [objs_by_id, adj];
}

function _workflow_dependency_matrix(
  workflow: Workflow
): [Record<string, WorkflowNode>, Util.AdjM<string>] {
  // Given workflow, produce mapping of workflow node id to each node, and the AdjM of their
  // dependencies (edge from o1 to o2 = o2 depends on o1). Considers each Scatter and Conditional
  // node a dependency of each of its body nodes.
  const objs_by_id: Record<string, WorkflowNode> = {};
  const adj = new Util.AdjM<string>();

  function visit(obj: WorkflowNode): void {
    const oid = obj.workflowNodeId;
    objs_by_id[oid] = obj;
    adj.add_node(oid);
    if (obj instanceof WorkflowSection) {
      for (const ch of [...obj.body, ...Object.values(obj.gathers)]) {
        visit(ch);
        adj.add_edge(oid, ch.workflowNodeId);
      }
    }
    for (const dep_id of obj.workflowNodeDependencies) {
      adj.add_edge(dep_id, oid);
    }
  }

  for (const inp of workflow.inputs || []) visit(inp);
  for (const obj of workflow.body) visit(obj);
  for (const outp of workflow.outputs || []) visit(outp);

  if (new Set(Object.keys(objs_by_id)).size !== adj.nodes.length)
    throw new Error("Mismatch between obj IDs and adj nodes");
  return [objs_by_id, adj];
}

function _detect_cycles(
  p: [Record<string, WorkflowNode>, Util.AdjM<string>]
): void {
  // given the result of _dependency_matrix, detect if there exists a cycle
  // and if so, then raise WDL.Error.CircularDependencies with a relevant
  // SourceNode.
  const [nodes, adj] = p;
  try {
    Util.topsort(adj);
  } catch (err) {
    if (err instanceof Util.StopIteration) {
      throw new WDLError.CircularDependencies(nodes[err.node as string]);
    }
    throw err;
  }
}

function _import_structs(doc: Document): void {
  // Add imported structs to doc.struct_typedefs, with collision checks
  for (const imp of doc.imports.filter((imp) => imp.doc)) {
    const imported_structs: Record<string, StructTypeDef> = {};
    for (const stb of imp.doc!.struct_typedefs) {
      if (
        !(stb instanceof Env.Binding) ||
        !(stb.value instanceof StructTypeDef)
      )
        throw new Error("Invalid struct typedef binding");
      imported_structs[stb.name] = stb.value;
    }
    for (const [name, alias] of imp.aliases) {
      if (!(name in imported_structs))
        throw new WDLError.NoSuchMember(imp.pos, name);
      if (alias in imported_structs) {
        throw new WDLError.MultipleDefinitions(
          imp.pos,
          `struct type alias ${alias} collides with another struct type in the imported document`
        );
      }
      const collider = doc.struct_typedefs.get(alias);
      if (collider) {
        throw new WDLError.MultipleDefinitions(
          imp.pos,
          `struct type alias ${alias} collides with a struct ${
            collider.imported
              ? "type/alias from another imported"
              : "type in this"
          } document`
        );
      }
      if (alias !== name) {
        imported_structs[alias] = imported_structs[name];
        delete imported_structs[name];
      }
    }
    for (const [name, st] of Object.entries(imported_structs)) {
      const existing = doc.struct_typedefs.get(name);
      if (existing && existing.type_id !== st.type_id) {
        throw new WDLError.MultipleDefinitions(
          imp.pos,
          `imported struct ${name} must be aliased because it collides with a struct ${
            existing.imported
              ? "type/alias from another imported"
              : "type in this"
          } document`
        );
      }
      if (!existing) {
        if(!imp.doc){
          throw new Error("Unexpected undefined imp.doc");
        }
        const st2 = new StructTypeDef(imp.pos, name, st.members,
          [imp.doc, st]
        );
        doc.struct_typedefs = doc.struct_typedefs.bind(name, st2);
      }
    }
  }
}

function _resolve_struct_type(
  pos: WDLError.SourcePosition,
  ty: Type.StructInstance,
  struct_types: Env.Bindings<Record<string, Type.Base>>
): void {
  // Resolve struct types within StructInstance, populating 'members' if not already populated.
  if (!ty.members) {
    const members = struct_types.get(ty.typeName);
    if (!members)
      throw new WDLError.InvalidType(pos, "Unknown type " + ty.typeName);
    ty.members = members;
  }
}
function id(_:unknown):number{
  // TODO implement a better hash function
  return 0;
}
function _resolve_struct_types(
  pos: WDLError.SourcePosition,
  ty: Type.Base,
  struct_types: Env.Bindings<Record<string, Type.Base>>,
  members_dict_ids: number[] = []
): void {
  if (ty instanceof Type.StructInstance) {
    _resolve_struct_type(pos, ty, struct_types);
    if (members_dict_ids.includes(id(ty.members)))
      throw new Error("Circular struct types detected");
    members_dict_ids = [id(ty.members), ...members_dict_ids];
  }
  for (const p of ty.parameters) {
    _resolve_struct_types(pos, p, struct_types, members_dict_ids);
  }
}

function _initialize_struct_typedefs(
  struct_typedefs: Env.Bindings<StructTypeDef>,
  struct_types: Env.Bindings<Record<string, Type.Base>>
): void {
  // Bootstrap struct typechecking, resolving all StructInstance members of the struct types
  for (const b of struct_typedefs) {
    if (!(b instanceof Env.Binding)) throw new Error("Expected Env.Binding");
    for (const member_ty of Object.values(b.value.members)) {
      try {
        _resolve_struct_types(b.value.pos, member_ty, struct_types);
      } catch {
        throw new WDLError.CircularDependencies(b.value);
      }
    }
  }
}

function _add_struct_instance_to_type_env(
  namespace: string,
  ty: Type.StructInstance,
  type_env: Env.Bindings<Type.Base>,
  ctx: any
): Env.Bindings<Type.Base> {
  if (!(ty.members instanceof Object))
    throw new Error("Expected struct members to be a dictionary");
  let ans = type_env.bind(namespace, ty, ctx);
  for (const [member_name, member_type] of Object.entries(ty.members)) {
    ans =
      member_type instanceof Type.StructInstance
        ? _add_struct_instance_to_type_env(
            `${namespace}.${member_name}`,
            member_type,
            ans,
            ctx
          )
        : ans.bind(`${namespace}.${member_name}`, member_type, ctx);
  }
  return ans;
}
/**
 * Traverse the task/workflow AST to find all struct types used; produce a mapping from struct
 * name to its type_id (a string describing the struct's members, independent of the struct name,
 * as the latter can differ across documents).
 */
function _describe_struct_types(exe: Task | Workflow): { [key: string]: string } {
  const structs: { [key: string]: string } = {};
  const items: any[] = Array.from(exe.children);

  while (items.length > 0) {
      const item = items.pop();
      
      if (item instanceof Type.StructInstance) {
          structs[item.typeName] = item.typeId;
      }
      else if (item instanceof Type.Base) {
          // descent into compound types so we'll cover e.g. Array[MyStructType]
          for (const par_ty of item.parameters) {
              items.push(par_ty);
          }
      }
      else if (item instanceof Expr.Base) {
          // descent into expressions to find struct literals
          if (item instanceof Expr.Struct) {
              items.push(item.type);
          }
          items.push(...item.children);
      }
      else if (item instanceof Decl) {
          items.push(item.type);
          items.push(item.expr);
      }
      else if (items instanceof WorkflowSection) {
          items.push(...item.children);
      }
      else if (item instanceof Call) {
          items.push(...item.availableInputs);
          for (const b of item.effectiveOutputs) {
              items.push(b.value);
          }
      }
  }

  return structs;
}

/**
 * Excerpt the document's source lines indicated by pos : WDL.SourcePosition. Delete comments,
 * blank lines, and leading/trailing whitespace from each line -- except those indicated by
 * literals.
 */
function _source_excerpt(
  doc: Document, 
  pos: WDLError.SourcePosition, 
  literals: WDLError.SourcePosition[] = []
): string[] {
  function clean(
      line: number, 
      column: number = 1, 
      end_column?: number
  ): string[] {
      // Check if line is in literals
      const literal = literals.some(lit => 
          line >= lit.line && line <= lit.end_line
      );

      const comment = doc.source_comments[line - 1];
      if (comment && !literal) {
          if (comment.pos.line !== line) {
              throw new Error("Comment position mismatch");
          }
          
          if (end_column === undefined) {
              end_column = comment.pos.column - 1;
          } else {
              end_column = Math.min(end_column, comment.pos.column - 1);
          }
      }

      const sourceText = doc.source_lines[line - 1];
      const txt = sourceText.slice(
          column - 1,
          end_column
      );

      if (literal) {
          return [txt];
      }

      const trimmedText = txt.trim();
      return trimmedText ? [trimmedText] : [];
  }

  if (pos.end_line === pos.line) {
      return clean(pos.line, pos.column, pos.end_column);
  }

  const result: string[] = [];

  // First line
  result.push(...clean(pos.line, pos.column));

  // Middle lines
  for (let line_nr = pos.line + 1; line_nr < pos.end_line; line_nr++) {
      result.push(...clean(line_nr));
  }

  // Last line
  result.push(...clean(pos.end_line, 1, pos.end_column));

  return result;
}