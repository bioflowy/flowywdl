// Generated from WdlV1_1Parser.g4 by ANTLR 4.13.1

import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


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
 * This interface defines a complete listener for a parse tree produced by
 * `WdlV1_1Parser`.
 */
export class WdlV1_1ParserListener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.map_type`.
     * @param ctx the parse tree
     */
    enterMap_type?: (ctx: Map_typeContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.map_type`.
     * @param ctx the parse tree
     */
    exitMap_type?: (ctx: Map_typeContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.array_type`.
     * @param ctx the parse tree
     */
    enterArray_type?: (ctx: Array_typeContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.array_type`.
     * @param ctx the parse tree
     */
    exitArray_type?: (ctx: Array_typeContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.pair_type`.
     * @param ctx the parse tree
     */
    enterPair_type?: (ctx: Pair_typeContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.pair_type`.
     * @param ctx the parse tree
     */
    exitPair_type?: (ctx: Pair_typeContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.type_base`.
     * @param ctx the parse tree
     */
    enterType_base?: (ctx: Type_baseContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.type_base`.
     * @param ctx the parse tree
     */
    exitType_base?: (ctx: Type_baseContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.wdl_type`.
     * @param ctx the parse tree
     */
    enterWdl_type?: (ctx: Wdl_typeContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.wdl_type`.
     * @param ctx the parse tree
     */
    exitWdl_type?: (ctx: Wdl_typeContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.unbound_decls`.
     * @param ctx the parse tree
     */
    enterUnbound_decls?: (ctx: Unbound_declsContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.unbound_decls`.
     * @param ctx the parse tree
     */
    exitUnbound_decls?: (ctx: Unbound_declsContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.bound_decls`.
     * @param ctx the parse tree
     */
    enterBound_decls?: (ctx: Bound_declsContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.bound_decls`.
     * @param ctx the parse tree
     */
    exitBound_decls?: (ctx: Bound_declsContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.any_decls`.
     * @param ctx the parse tree
     */
    enterAny_decls?: (ctx: Any_declsContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.any_decls`.
     * @param ctx the parse tree
     */
    exitAny_decls?: (ctx: Any_declsContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.number`.
     * @param ctx the parse tree
     */
    enterNumber?: (ctx: NumberContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.number`.
     * @param ctx the parse tree
     */
    exitNumber?: (ctx: NumberContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.expression_placeholder_option`.
     * @param ctx the parse tree
     */
    enterExpression_placeholder_option?: (ctx: Expression_placeholder_optionContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.expression_placeholder_option`.
     * @param ctx the parse tree
     */
    exitExpression_placeholder_option?: (ctx: Expression_placeholder_optionContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.string_part`.
     * @param ctx the parse tree
     */
    enterString_part?: (ctx: String_partContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.string_part`.
     * @param ctx the parse tree
     */
    exitString_part?: (ctx: String_partContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.string_expr_part`.
     * @param ctx the parse tree
     */
    enterString_expr_part?: (ctx: String_expr_partContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.string_expr_part`.
     * @param ctx the parse tree
     */
    exitString_expr_part?: (ctx: String_expr_partContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.string_expr_with_string_part`.
     * @param ctx the parse tree
     */
    enterString_expr_with_string_part?: (ctx: String_expr_with_string_partContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.string_expr_with_string_part`.
     * @param ctx the parse tree
     */
    exitString_expr_with_string_part?: (ctx: String_expr_with_string_partContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.string`.
     * @param ctx the parse tree
     */
    enterString?: (ctx: StringContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.string`.
     * @param ctx the parse tree
     */
    exitString?: (ctx: StringContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.primitive_literal`.
     * @param ctx the parse tree
     */
    enterPrimitive_literal?: (ctx: Primitive_literalContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.primitive_literal`.
     * @param ctx the parse tree
     */
    exitPrimitive_literal?: (ctx: Primitive_literalContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.expr`.
     * @param ctx the parse tree
     */
    enterExpr?: (ctx: ExprContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.expr`.
     * @param ctx the parse tree
     */
    exitExpr?: (ctx: ExprContext) => void;
    /**
     * Enter a parse tree produced by the `infix0`
     * labeled alternative in `WdlV1_1Parser.expr_infix`.
     * @param ctx the parse tree
     */
    enterInfix0?: (ctx: Infix0Context) => void;
    /**
     * Exit a parse tree produced by the `infix0`
     * labeled alternative in `WdlV1_1Parser.expr_infix`.
     * @param ctx the parse tree
     */
    exitInfix0?: (ctx: Infix0Context) => void;
    /**
     * Enter a parse tree produced by the `infix1`
     * labeled alternative in `WdlV1_1Parser.expr_infix0`.
     * @param ctx the parse tree
     */
    enterInfix1?: (ctx: Infix1Context) => void;
    /**
     * Exit a parse tree produced by the `infix1`
     * labeled alternative in `WdlV1_1Parser.expr_infix0`.
     * @param ctx the parse tree
     */
    exitInfix1?: (ctx: Infix1Context) => void;
    /**
     * Enter a parse tree produced by the `lor`
     * labeled alternative in `WdlV1_1Parser.expr_infix0`.
     * @param ctx the parse tree
     */
    enterLor?: (ctx: LorContext) => void;
    /**
     * Exit a parse tree produced by the `lor`
     * labeled alternative in `WdlV1_1Parser.expr_infix0`.
     * @param ctx the parse tree
     */
    exitLor?: (ctx: LorContext) => void;
    /**
     * Enter a parse tree produced by the `infix2`
     * labeled alternative in `WdlV1_1Parser.expr_infix1`.
     * @param ctx the parse tree
     */
    enterInfix2?: (ctx: Infix2Context) => void;
    /**
     * Exit a parse tree produced by the `infix2`
     * labeled alternative in `WdlV1_1Parser.expr_infix1`.
     * @param ctx the parse tree
     */
    exitInfix2?: (ctx: Infix2Context) => void;
    /**
     * Enter a parse tree produced by the `land`
     * labeled alternative in `WdlV1_1Parser.expr_infix1`.
     * @param ctx the parse tree
     */
    enterLand?: (ctx: LandContext) => void;
    /**
     * Exit a parse tree produced by the `land`
     * labeled alternative in `WdlV1_1Parser.expr_infix1`.
     * @param ctx the parse tree
     */
    exitLand?: (ctx: LandContext) => void;
    /**
     * Enter a parse tree produced by the `eqeq`
     * labeled alternative in `WdlV1_1Parser.expr_infix2`.
     * @param ctx the parse tree
     */
    enterEqeq?: (ctx: EqeqContext) => void;
    /**
     * Exit a parse tree produced by the `eqeq`
     * labeled alternative in `WdlV1_1Parser.expr_infix2`.
     * @param ctx the parse tree
     */
    exitEqeq?: (ctx: EqeqContext) => void;
    /**
     * Enter a parse tree produced by the `lt`
     * labeled alternative in `WdlV1_1Parser.expr_infix2`.
     * @param ctx the parse tree
     */
    enterLt?: (ctx: LtContext) => void;
    /**
     * Exit a parse tree produced by the `lt`
     * labeled alternative in `WdlV1_1Parser.expr_infix2`.
     * @param ctx the parse tree
     */
    exitLt?: (ctx: LtContext) => void;
    /**
     * Enter a parse tree produced by the `infix3`
     * labeled alternative in `WdlV1_1Parser.expr_infix2`.
     * @param ctx the parse tree
     */
    enterInfix3?: (ctx: Infix3Context) => void;
    /**
     * Exit a parse tree produced by the `infix3`
     * labeled alternative in `WdlV1_1Parser.expr_infix2`.
     * @param ctx the parse tree
     */
    exitInfix3?: (ctx: Infix3Context) => void;
    /**
     * Enter a parse tree produced by the `gte`
     * labeled alternative in `WdlV1_1Parser.expr_infix2`.
     * @param ctx the parse tree
     */
    enterGte?: (ctx: GteContext) => void;
    /**
     * Exit a parse tree produced by the `gte`
     * labeled alternative in `WdlV1_1Parser.expr_infix2`.
     * @param ctx the parse tree
     */
    exitGte?: (ctx: GteContext) => void;
    /**
     * Enter a parse tree produced by the `neq`
     * labeled alternative in `WdlV1_1Parser.expr_infix2`.
     * @param ctx the parse tree
     */
    enterNeq?: (ctx: NeqContext) => void;
    /**
     * Exit a parse tree produced by the `neq`
     * labeled alternative in `WdlV1_1Parser.expr_infix2`.
     * @param ctx the parse tree
     */
    exitNeq?: (ctx: NeqContext) => void;
    /**
     * Enter a parse tree produced by the `lte`
     * labeled alternative in `WdlV1_1Parser.expr_infix2`.
     * @param ctx the parse tree
     */
    enterLte?: (ctx: LteContext) => void;
    /**
     * Exit a parse tree produced by the `lte`
     * labeled alternative in `WdlV1_1Parser.expr_infix2`.
     * @param ctx the parse tree
     */
    exitLte?: (ctx: LteContext) => void;
    /**
     * Enter a parse tree produced by the `gt`
     * labeled alternative in `WdlV1_1Parser.expr_infix2`.
     * @param ctx the parse tree
     */
    enterGt?: (ctx: GtContext) => void;
    /**
     * Exit a parse tree produced by the `gt`
     * labeled alternative in `WdlV1_1Parser.expr_infix2`.
     * @param ctx the parse tree
     */
    exitGt?: (ctx: GtContext) => void;
    /**
     * Enter a parse tree produced by the `add`
     * labeled alternative in `WdlV1_1Parser.expr_infix3`.
     * @param ctx the parse tree
     */
    enterAdd?: (ctx: AddContext) => void;
    /**
     * Exit a parse tree produced by the `add`
     * labeled alternative in `WdlV1_1Parser.expr_infix3`.
     * @param ctx the parse tree
     */
    exitAdd?: (ctx: AddContext) => void;
    /**
     * Enter a parse tree produced by the `sub`
     * labeled alternative in `WdlV1_1Parser.expr_infix3`.
     * @param ctx the parse tree
     */
    enterSub?: (ctx: SubContext) => void;
    /**
     * Exit a parse tree produced by the `sub`
     * labeled alternative in `WdlV1_1Parser.expr_infix3`.
     * @param ctx the parse tree
     */
    exitSub?: (ctx: SubContext) => void;
    /**
     * Enter a parse tree produced by the `infix4`
     * labeled alternative in `WdlV1_1Parser.expr_infix3`.
     * @param ctx the parse tree
     */
    enterInfix4?: (ctx: Infix4Context) => void;
    /**
     * Exit a parse tree produced by the `infix4`
     * labeled alternative in `WdlV1_1Parser.expr_infix3`.
     * @param ctx the parse tree
     */
    exitInfix4?: (ctx: Infix4Context) => void;
    /**
     * Enter a parse tree produced by the `mod`
     * labeled alternative in `WdlV1_1Parser.expr_infix4`.
     * @param ctx the parse tree
     */
    enterMod?: (ctx: ModContext) => void;
    /**
     * Exit a parse tree produced by the `mod`
     * labeled alternative in `WdlV1_1Parser.expr_infix4`.
     * @param ctx the parse tree
     */
    exitMod?: (ctx: ModContext) => void;
    /**
     * Enter a parse tree produced by the `mul`
     * labeled alternative in `WdlV1_1Parser.expr_infix4`.
     * @param ctx the parse tree
     */
    enterMul?: (ctx: MulContext) => void;
    /**
     * Exit a parse tree produced by the `mul`
     * labeled alternative in `WdlV1_1Parser.expr_infix4`.
     * @param ctx the parse tree
     */
    exitMul?: (ctx: MulContext) => void;
    /**
     * Enter a parse tree produced by the `divide`
     * labeled alternative in `WdlV1_1Parser.expr_infix4`.
     * @param ctx the parse tree
     */
    enterDivide?: (ctx: DivideContext) => void;
    /**
     * Exit a parse tree produced by the `divide`
     * labeled alternative in `WdlV1_1Parser.expr_infix4`.
     * @param ctx the parse tree
     */
    exitDivide?: (ctx: DivideContext) => void;
    /**
     * Enter a parse tree produced by the `infix5`
     * labeled alternative in `WdlV1_1Parser.expr_infix4`.
     * @param ctx the parse tree
     */
    enterInfix5?: (ctx: Infix5Context) => void;
    /**
     * Exit a parse tree produced by the `infix5`
     * labeled alternative in `WdlV1_1Parser.expr_infix4`.
     * @param ctx the parse tree
     */
    exitInfix5?: (ctx: Infix5Context) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.expr_infix5`.
     * @param ctx the parse tree
     */
    enterExpr_infix5?: (ctx: Expr_infix5Context) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.expr_infix5`.
     * @param ctx the parse tree
     */
    exitExpr_infix5?: (ctx: Expr_infix5Context) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.member`.
     * @param ctx the parse tree
     */
    enterMember?: (ctx: MemberContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.member`.
     * @param ctx the parse tree
     */
    exitMember?: (ctx: MemberContext) => void;
    /**
     * Enter a parse tree produced by the `pair_literal`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    enterPair_literal?: (ctx: Pair_literalContext) => void;
    /**
     * Exit a parse tree produced by the `pair_literal`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    exitPair_literal?: (ctx: Pair_literalContext) => void;
    /**
     * Enter a parse tree produced by the `unarysigned`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    enterUnarysigned?: (ctx: UnarysignedContext) => void;
    /**
     * Exit a parse tree produced by the `unarysigned`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    exitUnarysigned?: (ctx: UnarysignedContext) => void;
    /**
     * Enter a parse tree produced by the `apply`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    enterApply?: (ctx: ApplyContext) => void;
    /**
     * Exit a parse tree produced by the `apply`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    exitApply?: (ctx: ApplyContext) => void;
    /**
     * Enter a parse tree produced by the `expression_group`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    enterExpression_group?: (ctx: Expression_groupContext) => void;
    /**
     * Exit a parse tree produced by the `expression_group`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    exitExpression_group?: (ctx: Expression_groupContext) => void;
    /**
     * Enter a parse tree produced by the `primitives`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    enterPrimitives?: (ctx: PrimitivesContext) => void;
    /**
     * Exit a parse tree produced by the `primitives`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    exitPrimitives?: (ctx: PrimitivesContext) => void;
    /**
     * Enter a parse tree produced by the `left_name`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    enterLeft_name?: (ctx: Left_nameContext) => void;
    /**
     * Exit a parse tree produced by the `left_name`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    exitLeft_name?: (ctx: Left_nameContext) => void;
    /**
     * Enter a parse tree produced by the `at`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    enterAt?: (ctx: AtContext) => void;
    /**
     * Exit a parse tree produced by the `at`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    exitAt?: (ctx: AtContext) => void;
    /**
     * Enter a parse tree produced by the `negate`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    enterNegate?: (ctx: NegateContext) => void;
    /**
     * Exit a parse tree produced by the `negate`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    exitNegate?: (ctx: NegateContext) => void;
    /**
     * Enter a parse tree produced by the `map_literal`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    enterMap_literal?: (ctx: Map_literalContext) => void;
    /**
     * Exit a parse tree produced by the `map_literal`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    exitMap_literal?: (ctx: Map_literalContext) => void;
    /**
     * Enter a parse tree produced by the `ifthenelse`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    enterIfthenelse?: (ctx: IfthenelseContext) => void;
    /**
     * Exit a parse tree produced by the `ifthenelse`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    exitIfthenelse?: (ctx: IfthenelseContext) => void;
    /**
     * Enter a parse tree produced by the `get_name`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    enterGet_name?: (ctx: Get_nameContext) => void;
    /**
     * Exit a parse tree produced by the `get_name`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    exitGet_name?: (ctx: Get_nameContext) => void;
    /**
     * Enter a parse tree produced by the `object_literal`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    enterObject_literal?: (ctx: Object_literalContext) => void;
    /**
     * Exit a parse tree produced by the `object_literal`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    exitObject_literal?: (ctx: Object_literalContext) => void;
    /**
     * Enter a parse tree produced by the `array_literal`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    enterArray_literal?: (ctx: Array_literalContext) => void;
    /**
     * Exit a parse tree produced by the `array_literal`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    exitArray_literal?: (ctx: Array_literalContext) => void;
    /**
     * Enter a parse tree produced by the `struct_literal`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    enterStruct_literal?: (ctx: Struct_literalContext) => void;
    /**
     * Exit a parse tree produced by the `struct_literal`
     * labeled alternative in `WdlV1_1Parser.expr_core`.
     * @param ctx the parse tree
     */
    exitStruct_literal?: (ctx: Struct_literalContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.version`.
     * @param ctx the parse tree
     */
    enterVersion?: (ctx: VersionContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.version`.
     * @param ctx the parse tree
     */
    exitVersion?: (ctx: VersionContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.import_alias`.
     * @param ctx the parse tree
     */
    enterImport_alias?: (ctx: Import_aliasContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.import_alias`.
     * @param ctx the parse tree
     */
    exitImport_alias?: (ctx: Import_aliasContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.import_as`.
     * @param ctx the parse tree
     */
    enterImport_as?: (ctx: Import_asContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.import_as`.
     * @param ctx the parse tree
     */
    exitImport_as?: (ctx: Import_asContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.import_doc`.
     * @param ctx the parse tree
     */
    enterImport_doc?: (ctx: Import_docContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.import_doc`.
     * @param ctx the parse tree
     */
    exitImport_doc?: (ctx: Import_docContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.struct`.
     * @param ctx the parse tree
     */
    enterStruct?: (ctx: StructContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.struct`.
     * @param ctx the parse tree
     */
    exitStruct?: (ctx: StructContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.meta_value`.
     * @param ctx the parse tree
     */
    enterMeta_value?: (ctx: Meta_valueContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.meta_value`.
     * @param ctx the parse tree
     */
    exitMeta_value?: (ctx: Meta_valueContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.meta_string_part`.
     * @param ctx the parse tree
     */
    enterMeta_string_part?: (ctx: Meta_string_partContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.meta_string_part`.
     * @param ctx the parse tree
     */
    exitMeta_string_part?: (ctx: Meta_string_partContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.meta_string`.
     * @param ctx the parse tree
     */
    enterMeta_string?: (ctx: Meta_stringContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.meta_string`.
     * @param ctx the parse tree
     */
    exitMeta_string?: (ctx: Meta_stringContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.meta_array`.
     * @param ctx the parse tree
     */
    enterMeta_array?: (ctx: Meta_arrayContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.meta_array`.
     * @param ctx the parse tree
     */
    exitMeta_array?: (ctx: Meta_arrayContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.meta_object`.
     * @param ctx the parse tree
     */
    enterMeta_object?: (ctx: Meta_objectContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.meta_object`.
     * @param ctx the parse tree
     */
    exitMeta_object?: (ctx: Meta_objectContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.meta_object_kv`.
     * @param ctx the parse tree
     */
    enterMeta_object_kv?: (ctx: Meta_object_kvContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.meta_object_kv`.
     * @param ctx the parse tree
     */
    exitMeta_object_kv?: (ctx: Meta_object_kvContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.meta_kv`.
     * @param ctx the parse tree
     */
    enterMeta_kv?: (ctx: Meta_kvContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.meta_kv`.
     * @param ctx the parse tree
     */
    exitMeta_kv?: (ctx: Meta_kvContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.parameter_meta`.
     * @param ctx the parse tree
     */
    enterParameter_meta?: (ctx: Parameter_metaContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.parameter_meta`.
     * @param ctx the parse tree
     */
    exitParameter_meta?: (ctx: Parameter_metaContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.meta`.
     * @param ctx the parse tree
     */
    enterMeta?: (ctx: MetaContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.meta`.
     * @param ctx the parse tree
     */
    exitMeta?: (ctx: MetaContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.task_runtime_kv`.
     * @param ctx the parse tree
     */
    enterTask_runtime_kv?: (ctx: Task_runtime_kvContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.task_runtime_kv`.
     * @param ctx the parse tree
     */
    exitTask_runtime_kv?: (ctx: Task_runtime_kvContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.task_runtime`.
     * @param ctx the parse tree
     */
    enterTask_runtime?: (ctx: Task_runtimeContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.task_runtime`.
     * @param ctx the parse tree
     */
    exitTask_runtime?: (ctx: Task_runtimeContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.task_input`.
     * @param ctx the parse tree
     */
    enterTask_input?: (ctx: Task_inputContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.task_input`.
     * @param ctx the parse tree
     */
    exitTask_input?: (ctx: Task_inputContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.task_output`.
     * @param ctx the parse tree
     */
    enterTask_output?: (ctx: Task_outputContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.task_output`.
     * @param ctx the parse tree
     */
    exitTask_output?: (ctx: Task_outputContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.task_command_string_part`.
     * @param ctx the parse tree
     */
    enterTask_command_string_part?: (ctx: Task_command_string_partContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.task_command_string_part`.
     * @param ctx the parse tree
     */
    exitTask_command_string_part?: (ctx: Task_command_string_partContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.task_command_expr_part`.
     * @param ctx the parse tree
     */
    enterTask_command_expr_part?: (ctx: Task_command_expr_partContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.task_command_expr_part`.
     * @param ctx the parse tree
     */
    exitTask_command_expr_part?: (ctx: Task_command_expr_partContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.task_command_expr_with_string`.
     * @param ctx the parse tree
     */
    enterTask_command_expr_with_string?: (ctx: Task_command_expr_with_stringContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.task_command_expr_with_string`.
     * @param ctx the parse tree
     */
    exitTask_command_expr_with_string?: (ctx: Task_command_expr_with_stringContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.task_command`.
     * @param ctx the parse tree
     */
    enterTask_command?: (ctx: Task_commandContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.task_command`.
     * @param ctx the parse tree
     */
    exitTask_command?: (ctx: Task_commandContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.task_element`.
     * @param ctx the parse tree
     */
    enterTask_element?: (ctx: Task_elementContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.task_element`.
     * @param ctx the parse tree
     */
    exitTask_element?: (ctx: Task_elementContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.task`.
     * @param ctx the parse tree
     */
    enterTask?: (ctx: TaskContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.task`.
     * @param ctx the parse tree
     */
    exitTask?: (ctx: TaskContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.inner_workflow_element`.
     * @param ctx the parse tree
     */
    enterInner_workflow_element?: (ctx: Inner_workflow_elementContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.inner_workflow_element`.
     * @param ctx the parse tree
     */
    exitInner_workflow_element?: (ctx: Inner_workflow_elementContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.call_alias`.
     * @param ctx the parse tree
     */
    enterCall_alias?: (ctx: Call_aliasContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.call_alias`.
     * @param ctx the parse tree
     */
    exitCall_alias?: (ctx: Call_aliasContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.call_input`.
     * @param ctx the parse tree
     */
    enterCall_input?: (ctx: Call_inputContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.call_input`.
     * @param ctx the parse tree
     */
    exitCall_input?: (ctx: Call_inputContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.call_inputs`.
     * @param ctx the parse tree
     */
    enterCall_inputs?: (ctx: Call_inputsContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.call_inputs`.
     * @param ctx the parse tree
     */
    exitCall_inputs?: (ctx: Call_inputsContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.call_body`.
     * @param ctx the parse tree
     */
    enterCall_body?: (ctx: Call_bodyContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.call_body`.
     * @param ctx the parse tree
     */
    exitCall_body?: (ctx: Call_bodyContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.call_after`.
     * @param ctx the parse tree
     */
    enterCall_after?: (ctx: Call_afterContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.call_after`.
     * @param ctx the parse tree
     */
    exitCall_after?: (ctx: Call_afterContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.call_name`.
     * @param ctx the parse tree
     */
    enterCall_name?: (ctx: Call_nameContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.call_name`.
     * @param ctx the parse tree
     */
    exitCall_name?: (ctx: Call_nameContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.call`.
     * @param ctx the parse tree
     */
    enterCall?: (ctx: CallContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.call`.
     * @param ctx the parse tree
     */
    exitCall?: (ctx: CallContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.scatter`.
     * @param ctx the parse tree
     */
    enterScatter?: (ctx: ScatterContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.scatter`.
     * @param ctx the parse tree
     */
    exitScatter?: (ctx: ScatterContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.conditional`.
     * @param ctx the parse tree
     */
    enterConditional?: (ctx: ConditionalContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.conditional`.
     * @param ctx the parse tree
     */
    exitConditional?: (ctx: ConditionalContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.workflow_input`.
     * @param ctx the parse tree
     */
    enterWorkflow_input?: (ctx: Workflow_inputContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.workflow_input`.
     * @param ctx the parse tree
     */
    exitWorkflow_input?: (ctx: Workflow_inputContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.workflow_output`.
     * @param ctx the parse tree
     */
    enterWorkflow_output?: (ctx: Workflow_outputContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.workflow_output`.
     * @param ctx the parse tree
     */
    exitWorkflow_output?: (ctx: Workflow_outputContext) => void;
    /**
     * Enter a parse tree produced by the `input`
     * labeled alternative in `WdlV1_1Parser.workflow_element`.
     * @param ctx the parse tree
     */
    enterInput?: (ctx: InputContext) => void;
    /**
     * Exit a parse tree produced by the `input`
     * labeled alternative in `WdlV1_1Parser.workflow_element`.
     * @param ctx the parse tree
     */
    exitInput?: (ctx: InputContext) => void;
    /**
     * Enter a parse tree produced by the `output`
     * labeled alternative in `WdlV1_1Parser.workflow_element`.
     * @param ctx the parse tree
     */
    enterOutput?: (ctx: OutputContext) => void;
    /**
     * Exit a parse tree produced by the `output`
     * labeled alternative in `WdlV1_1Parser.workflow_element`.
     * @param ctx the parse tree
     */
    exitOutput?: (ctx: OutputContext) => void;
    /**
     * Enter a parse tree produced by the `inner_element`
     * labeled alternative in `WdlV1_1Parser.workflow_element`.
     * @param ctx the parse tree
     */
    enterInner_element?: (ctx: Inner_elementContext) => void;
    /**
     * Exit a parse tree produced by the `inner_element`
     * labeled alternative in `WdlV1_1Parser.workflow_element`.
     * @param ctx the parse tree
     */
    exitInner_element?: (ctx: Inner_elementContext) => void;
    /**
     * Enter a parse tree produced by the `parameter_meta_element`
     * labeled alternative in `WdlV1_1Parser.workflow_element`.
     * @param ctx the parse tree
     */
    enterParameter_meta_element?: (ctx: Parameter_meta_elementContext) => void;
    /**
     * Exit a parse tree produced by the `parameter_meta_element`
     * labeled alternative in `WdlV1_1Parser.workflow_element`.
     * @param ctx the parse tree
     */
    exitParameter_meta_element?: (ctx: Parameter_meta_elementContext) => void;
    /**
     * Enter a parse tree produced by the `meta_element`
     * labeled alternative in `WdlV1_1Parser.workflow_element`.
     * @param ctx the parse tree
     */
    enterMeta_element?: (ctx: Meta_elementContext) => void;
    /**
     * Exit a parse tree produced by the `meta_element`
     * labeled alternative in `WdlV1_1Parser.workflow_element`.
     * @param ctx the parse tree
     */
    exitMeta_element?: (ctx: Meta_elementContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.workflow`.
     * @param ctx the parse tree
     */
    enterWorkflow?: (ctx: WorkflowContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.workflow`.
     * @param ctx the parse tree
     */
    exitWorkflow?: (ctx: WorkflowContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.document_element`.
     * @param ctx the parse tree
     */
    enterDocument_element?: (ctx: Document_elementContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.document_element`.
     * @param ctx the parse tree
     */
    exitDocument_element?: (ctx: Document_elementContext) => void;
    /**
     * Enter a parse tree produced by `WdlV1_1Parser.document`.
     * @param ctx the parse tree
     */
    enterDocument?: (ctx: DocumentContext) => void;
    /**
     * Exit a parse tree produced by `WdlV1_1Parser.document`.
     * @param ctx the parse tree
     */
    exitDocument?: (ctx: DocumentContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

