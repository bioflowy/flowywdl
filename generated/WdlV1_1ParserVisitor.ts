// Generated from WdlV1_1Parser.g4 by ANTLR 4.13.1

import { AbstractParseTreeVisitor } from "antlr4ng";


import { Map_typeContext } from "./WdlV1_1Parser.ts";
import { Array_typeContext } from "./WdlV1_1Parser.ts";
import { Pair_typeContext } from "./WdlV1_1Parser.ts";
import { Type_baseContext } from "./WdlV1_1Parser.ts";
import { Wdl_typeContext } from "./WdlV1_1Parser.ts";
import { Unbound_declsContext } from "./WdlV1_1Parser.ts";
import { Bound_declsContext } from "./WdlV1_1Parser.ts";
import { Any_declsContext } from "./WdlV1_1Parser.ts";
import { NumberContext } from "./WdlV1_1Parser.ts";
import { Expression_placeholder_optionContext } from "./WdlV1_1Parser.ts";
import { String_partContext } from "./WdlV1_1Parser.ts";
import { String_expr_partContext } from "./WdlV1_1Parser.ts";
import { String_expr_with_string_partContext } from "./WdlV1_1Parser.ts";
import { StringContext } from "./WdlV1_1Parser.ts";
import { Primitive_literalContext } from "./WdlV1_1Parser.ts";
import { ExprContext } from "./WdlV1_1Parser.ts";
import { Infix0Context } from "./WdlV1_1Parser.ts";
import { Infix1Context } from "./WdlV1_1Parser.ts";
import { LorContext } from "./WdlV1_1Parser.ts";
import { Infix2Context } from "./WdlV1_1Parser.ts";
import { LandContext } from "./WdlV1_1Parser.ts";
import { EqeqContext } from "./WdlV1_1Parser.ts";
import { LtContext } from "./WdlV1_1Parser.ts";
import { Infix3Context } from "./WdlV1_1Parser.ts";
import { GteContext } from "./WdlV1_1Parser.ts";
import { NeqContext } from "./WdlV1_1Parser.ts";
import { LteContext } from "./WdlV1_1Parser.ts";
import { GtContext } from "./WdlV1_1Parser.ts";
import { AddContext } from "./WdlV1_1Parser.ts";
import { SubContext } from "./WdlV1_1Parser.ts";
import { Infix4Context } from "./WdlV1_1Parser.ts";
import { ModContext } from "./WdlV1_1Parser.ts";
import { MulContext } from "./WdlV1_1Parser.ts";
import { DivideContext } from "./WdlV1_1Parser.ts";
import { Infix5Context } from "./WdlV1_1Parser.ts";
import { Expr_infix5Context } from "./WdlV1_1Parser.ts";
import { MemberContext } from "./WdlV1_1Parser.ts";
import { Pair_literalContext } from "./WdlV1_1Parser.ts";
import { UnarysignedContext } from "./WdlV1_1Parser.ts";
import { ApplyContext } from "./WdlV1_1Parser.ts";
import { Expression_groupContext } from "./WdlV1_1Parser.ts";
import { PrimitivesContext } from "./WdlV1_1Parser.ts";
import { Left_nameContext } from "./WdlV1_1Parser.ts";
import { AtContext } from "./WdlV1_1Parser.ts";
import { NegateContext } from "./WdlV1_1Parser.ts";
import { Map_literalContext } from "./WdlV1_1Parser.ts";
import { IfthenelseContext } from "./WdlV1_1Parser.ts";
import { Get_nameContext } from "./WdlV1_1Parser.ts";
import { Object_literalContext } from "./WdlV1_1Parser.ts";
import { Array_literalContext } from "./WdlV1_1Parser.ts";
import { Struct_literalContext } from "./WdlV1_1Parser.ts";
import { VersionContext } from "./WdlV1_1Parser.ts";
import { Import_aliasContext } from "./WdlV1_1Parser.ts";
import { Import_asContext } from "./WdlV1_1Parser.ts";
import { Import_docContext } from "./WdlV1_1Parser.ts";
import { StructContext } from "./WdlV1_1Parser.ts";
import { Meta_valueContext } from "./WdlV1_1Parser.ts";
import { Meta_string_partContext } from "./WdlV1_1Parser.ts";
import { Meta_stringContext } from "./WdlV1_1Parser.ts";
import { Meta_arrayContext } from "./WdlV1_1Parser.ts";
import { Meta_objectContext } from "./WdlV1_1Parser.ts";
import { Meta_object_kvContext } from "./WdlV1_1Parser.ts";
import { Meta_kvContext } from "./WdlV1_1Parser.ts";
import { Parameter_metaContext } from "./WdlV1_1Parser.ts";
import { MetaContext } from "./WdlV1_1Parser.ts";
import { Task_runtime_kvContext } from "./WdlV1_1Parser.ts";
import { Task_runtimeContext } from "./WdlV1_1Parser.ts";
import { Task_inputContext } from "./WdlV1_1Parser.ts";
import { Task_outputContext } from "./WdlV1_1Parser.ts";
import { Task_command_string_partContext } from "./WdlV1_1Parser.ts";
import { Task_command_expr_partContext } from "./WdlV1_1Parser.ts";
import { Task_command_expr_with_stringContext } from "./WdlV1_1Parser.ts";
import { Task_commandContext } from "./WdlV1_1Parser.ts";
import { Task_elementContext } from "./WdlV1_1Parser.ts";
import { TaskContext } from "./WdlV1_1Parser.ts";
import { Inner_workflow_elementContext } from "./WdlV1_1Parser.ts";
import { Call_aliasContext } from "./WdlV1_1Parser.ts";
import { Call_inputContext } from "./WdlV1_1Parser.ts";
import { Call_inputsContext } from "./WdlV1_1Parser.ts";
import { Call_bodyContext } from "./WdlV1_1Parser.ts";
import { Call_afterContext } from "./WdlV1_1Parser.ts";
import { Call_nameContext } from "./WdlV1_1Parser.ts";
import { CallContext } from "./WdlV1_1Parser.ts";
import { ScatterContext } from "./WdlV1_1Parser.ts";
import { ConditionalContext } from "./WdlV1_1Parser.ts";
import { Workflow_inputContext } from "./WdlV1_1Parser.ts";
import { Workflow_outputContext } from "./WdlV1_1Parser.ts";
import { InputContext } from "./WdlV1_1Parser.ts";
import { OutputContext } from "./WdlV1_1Parser.ts";
import { Inner_elementContext } from "./WdlV1_1Parser.ts";
import { Parameter_meta_elementContext } from "./WdlV1_1Parser.ts";
import { Meta_elementContext } from "./WdlV1_1Parser.ts";
import { WorkflowContext } from "./WdlV1_1Parser.ts";
import { Document_elementContext } from "./WdlV1_1Parser.ts";
import { DocumentContext } from "./WdlV1_1Parser.ts";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `WdlV1_1Parser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class WdlV1_1ParserVisitor<Result> extends AbstractParseTreeVisitor<Result> {
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.map_type`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMap_type?: (ctx: Map_typeContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.array_type`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitArray_type?: (ctx: Array_typeContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.pair_type`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPair_type?: (ctx: Pair_typeContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.type_base`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitType_base?: (ctx: Type_baseContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.wdl_type`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitWdl_type?: (ctx: Wdl_typeContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.unbound_decls`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUnbound_decls?: (ctx: Unbound_declsContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.bound_decls`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBound_decls?: (ctx: Bound_declsContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.any_decls`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAny_decls?: (ctx: Any_declsContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.number`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNumber?: (ctx: NumberContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.expression_placeholder_option`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpression_placeholder_option?: (ctx: Expression_placeholder_optionContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.string_part`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitString_part?: (ctx: String_partContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.string_expr_part`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitString_expr_part?: (ctx: String_expr_partContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.string_expr_with_string_part`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitString_expr_with_string_part?: (ctx: String_expr_with_string_partContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.string`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitString?: (ctx: StringContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.primitive_literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPrimitive_literal?: (ctx: Primitive_literalContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpr?: (ctx: ExprContext) => Result;
    /**
     * Visit a parse tree produced by the `infix0`
     * labeled alternative in `WdlV1_1Parser.expr_infix`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInfix0?: (ctx: Infix0Context) => Result;
    /**
     * Visit a parse tree produced by the `infix1`
     * labeled alternative in `WdlV1_1Parser.expr_infix0`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInfix1?: (ctx: Infix1Context) => Result;
    /**
     * Visit a parse tree produced by the `lor`
     * labeled alternative in `WdlV1_1Parser.expr_infix0`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLor?: (ctx: LorContext) => Result;
    /**
     * Visit a parse tree produced by the `infix2`
     * labeled alternative in `WdlV1_1Parser.expr_infix1`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInfix2?: (ctx: Infix2Context) => Result;
    /**
     * Visit a parse tree produced by the `land`
     * labeled alternative in `WdlV1_1Parser.expr_infix1`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLand?: (ctx: LandContext) => Result;
    /**
     * Visit a parse tree produced by the `eqeq`
     * labeled alternative in `WdlV1_1Parser.expr_infix2`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitEqeq?: (ctx: EqeqContext) => Result;
    /**
     * Visit a parse tree produced by the `lt`
     * labeled alternative in `WdlV1_1Parser.expr_infix2`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLt?: (ctx: LtContext) => Result;
    /**
     * Visit a parse tree produced by the `infix3`
     * labeled alternative in `WdlV1_1Parser.expr_infix2`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInfix3?: (ctx: Infix3Context) => Result;
    /**
     * Visit a parse tree produced by the `gte`
     * labeled alternative in `WdlV1_1Parser.expr_infix2`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitGte?: (ctx: GteContext) => Result;
    /**
     * Visit a parse tree produced by the `neq`
     * labeled alternative in `WdlV1_1Parser.expr_infix2`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNeq?: (ctx: NeqContext) => Result;
    /**
     * Visit a parse tree produced by the `lte`
     * labeled alternative in `WdlV1_1Parser.expr_infix2`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLte?: (ctx: LteContext) => Result;
    /**
     * Visit a parse tree produced by the `gt`
     * labeled alternative in `WdlV1_1Parser.expr_infix2`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitGt?: (ctx: GtContext) => Result;
    /**
     * Visit a parse tree produced by the `add`
     * labeled alternative in `WdlV1_1Parser.expr_infix3`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAdd?: (ctx: AddContext) => Result;
    /**
     * Visit a parse tree produced by the `sub`
     * labeled alternative in `WdlV1_1Parser.expr_infix3`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSub?: (ctx: SubContext) => Result;
    /**
     * Visit a parse tree produced by the `infix4`
     * labeled alternative in `WdlV1_1Parser.expr_infix3`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInfix4?: (ctx: Infix4Context) => Result;
    /**
     * Visit a parse tree produced by the `mod`
     * labeled alternative in `WdlV1_1Parser.expr_infix4`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMod?: (ctx: ModContext) => Result;
    /**
     * Visit a parse tree produced by the `mul`
     * labeled alternative in `WdlV1_1Parser.expr_infix4`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMul?: (ctx: MulContext) => Result;
    /**
     * Visit a parse tree produced by the `divide`
     * labeled alternative in `WdlV1_1Parser.expr_infix4`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDivide?: (ctx: DivideContext) => Result;
    /**
     * Visit a parse tree produced by the `infix5`
     * labeled alternative in `WdlV1_1Parser.expr_infix4`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInfix5?: (ctx: Infix5Context) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.expr_infix5`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpr_infix5?: (ctx: Expr_infix5Context) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.member`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMember?: (ctx: MemberContext) => Result;
    /**
     * Visit a parse tree produced by the `pair_literal`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPair_literal?: (ctx: Pair_literalContext) => Result;
    /**
     * Visit a parse tree produced by the `unarysigned`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUnarysigned?: (ctx: UnarysignedContext) => Result;
    /**
     * Visit a parse tree produced by the `apply`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitApply?: (ctx: ApplyContext) => Result;
    /**
     * Visit a parse tree produced by the `expression_group`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpression_group?: (ctx: Expression_groupContext) => Result;
    /**
     * Visit a parse tree produced by the `primitives`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPrimitives?: (ctx: PrimitivesContext) => Result;
    /**
     * Visit a parse tree produced by the `left_name`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLeft_name?: (ctx: Left_nameContext) => Result;
    /**
     * Visit a parse tree produced by the `at`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAt?: (ctx: AtContext) => Result;
    /**
     * Visit a parse tree produced by the `negate`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNegate?: (ctx: NegateContext) => Result;
    /**
     * Visit a parse tree produced by the `map_literal`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMap_literal?: (ctx: Map_literalContext) => Result;
    /**
     * Visit a parse tree produced by the `ifthenelse`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIfthenelse?: (ctx: IfthenelseContext) => Result;
    /**
     * Visit a parse tree produced by the `get_name`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitGet_name?: (ctx: Get_nameContext) => Result;
    /**
     * Visit a parse tree produced by the `object_literal`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitObject_literal?: (ctx: Object_literalContext) => Result;
    /**
     * Visit a parse tree produced by the `array_literal`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitArray_literal?: (ctx: Array_literalContext) => Result;
    /**
     * Visit a parse tree produced by the `struct_literal`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStruct_literal?: (ctx: Struct_literalContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.version`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitVersion?: (ctx: VersionContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.import_alias`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitImport_alias?: (ctx: Import_aliasContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.import_as`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitImport_as?: (ctx: Import_asContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.import_doc`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitImport_doc?: (ctx: Import_docContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.struct`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStruct?: (ctx: StructContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.meta_value`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMeta_value?: (ctx: Meta_valueContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.meta_string_part`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMeta_string_part?: (ctx: Meta_string_partContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.meta_string`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMeta_string?: (ctx: Meta_stringContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.meta_array`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMeta_array?: (ctx: Meta_arrayContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.meta_object`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMeta_object?: (ctx: Meta_objectContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.meta_object_kv`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMeta_object_kv?: (ctx: Meta_object_kvContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.meta_kv`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMeta_kv?: (ctx: Meta_kvContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.parameter_meta`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParameter_meta?: (ctx: Parameter_metaContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.meta`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMeta?: (ctx: MetaContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.task_runtime_kv`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTask_runtime_kv?: (ctx: Task_runtime_kvContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.task_runtime`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTask_runtime?: (ctx: Task_runtimeContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.task_input`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTask_input?: (ctx: Task_inputContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.task_output`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTask_output?: (ctx: Task_outputContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.task_command_string_part`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTask_command_string_part?: (ctx: Task_command_string_partContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.task_command_expr_part`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTask_command_expr_part?: (ctx: Task_command_expr_partContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.task_command_expr_with_string`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTask_command_expr_with_string?: (ctx: Task_command_expr_with_stringContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.task_command`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTask_command?: (ctx: Task_commandContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.task_element`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTask_element?: (ctx: Task_elementContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.task`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTask?: (ctx: TaskContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.inner_workflow_element`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInner_workflow_element?: (ctx: Inner_workflow_elementContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.call_alias`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCall_alias?: (ctx: Call_aliasContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.call_input`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCall_input?: (ctx: Call_inputContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.call_inputs`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCall_inputs?: (ctx: Call_inputsContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.call_body`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCall_body?: (ctx: Call_bodyContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.call_after`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCall_after?: (ctx: Call_afterContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.call_name`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCall_name?: (ctx: Call_nameContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.call`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCall?: (ctx: CallContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.scatter`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitScatter?: (ctx: ScatterContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.conditional`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitConditional?: (ctx: ConditionalContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.workflow_input`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitWorkflow_input?: (ctx: Workflow_inputContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.workflow_output`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitWorkflow_output?: (ctx: Workflow_outputContext) => Result;
    /**
     * Visit a parse tree produced by the `input`
     * labeled alternative in `WdlV1_1Parser.workflow_element`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInput?: (ctx: InputContext) => Result;
    /**
     * Visit a parse tree produced by the `output`
     * labeled alternative in `WdlV1_1Parser.workflow_element`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitOutput?: (ctx: OutputContext) => Result;
    /**
     * Visit a parse tree produced by the `inner_element`
     * labeled alternative in `WdlV1_1Parser.workflow_element`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInner_element?: (ctx: Inner_elementContext) => Result;
    /**
     * Visit a parse tree produced by the `parameter_meta_element`
     * labeled alternative in `WdlV1_1Parser.workflow_element`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParameter_meta_element?: (ctx: Parameter_meta_elementContext) => Result;
    /**
     * Visit a parse tree produced by the `meta_element`
     * labeled alternative in `WdlV1_1Parser.workflow_element`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMeta_element?: (ctx: Meta_elementContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.workflow`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitWorkflow?: (ctx: WorkflowContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.document_element`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDocument_element?: (ctx: Document_elementContext) => Result;
    /**
     * Visit a parse tree produced by `WdlV1_1Parser.document`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDocument?: (ctx: DocumentContext) => Result;
}

