// Generated from WdlV1_1Parser.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { WdlV1_1ParserListener } from "./WdlV1_1ParserListener.ts";
import { WdlV1_1ParserVisitor } from "./WdlV1_1ParserVisitor.ts";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class WdlV1_1Parser extends antlr.Parser {
    public static readonly LINE_COMMENT = 1;
    public static readonly VERSION = 2;
    public static readonly IMPORT = 3;
    public static readonly WORKFLOW = 4;
    public static readonly TASK = 5;
    public static readonly STRUCT = 6;
    public static readonly SCATTER = 7;
    public static readonly CALL = 8;
    public static readonly IF = 9;
    public static readonly THEN = 10;
    public static readonly ELSE = 11;
    public static readonly ALIAS = 12;
    public static readonly AS = 13;
    public static readonly In = 14;
    public static readonly INPUT = 15;
    public static readonly OUTPUT = 16;
    public static readonly PARAMETERMETA = 17;
    public static readonly META = 18;
    public static readonly RUNTIME = 19;
    public static readonly BOOLEAN = 20;
    public static readonly INT = 21;
    public static readonly FLOAT = 22;
    public static readonly STRING = 23;
    public static readonly FILE = 24;
    public static readonly ARRAY = 25;
    public static readonly MAP = 26;
    public static readonly OBJECT = 27;
    public static readonly OBJECTLITERAL = 28;
    public static readonly SEPEQUAL = 29;
    public static readonly DEFAULTEQUAL = 30;
    public static readonly PAIR = 31;
    public static readonly AFTER = 32;
    public static readonly COMMAND = 33;
    public static readonly NONELITERAL = 34;
    public static readonly IntLiteral = 35;
    public static readonly FloatLiteral = 36;
    public static readonly BoolLiteral = 37;
    public static readonly LPAREN = 38;
    public static readonly RPAREN = 39;
    public static readonly LBRACE = 40;
    public static readonly RBRACE = 41;
    public static readonly LBRACK = 42;
    public static readonly RBRACK = 43;
    public static readonly ESC = 44;
    public static readonly COLON = 45;
    public static readonly LT = 46;
    public static readonly GT = 47;
    public static readonly GTE = 48;
    public static readonly LTE = 49;
    public static readonly EQUALITY = 50;
    public static readonly NOTEQUAL = 51;
    public static readonly EQUAL = 52;
    public static readonly AND = 53;
    public static readonly OR = 54;
    public static readonly OPTIONAL = 55;
    public static readonly STAR = 56;
    public static readonly PLUS = 57;
    public static readonly MINUS = 58;
    public static readonly DOLLAR = 59;
    public static readonly COMMA = 60;
    public static readonly SEMI = 61;
    public static readonly DOT = 62;
    public static readonly NOT = 63;
    public static readonly TILDE = 64;
    public static readonly DIVIDE = 65;
    public static readonly MOD = 66;
    public static readonly SQUOTE = 67;
    public static readonly DQUOTE = 68;
    public static readonly WHITESPACE = 69;
    public static readonly Identifier = 70;
    public static readonly StringPart = 71;
    public static readonly BeginWhitespace = 72;
    public static readonly BeginHereDoc = 73;
    public static readonly BeginLBrace = 74;
    public static readonly HereDocUnicodeEscape = 75;
    public static readonly CommandUnicodeEscape = 76;
    public static readonly StringCommandStart = 77;
    public static readonly EndCommand = 78;
    public static readonly CommandStringPart = 79;
    public static readonly VersionWhitespace = 80;
    public static readonly ReleaseVersion = 81;
    public static readonly BeginMeta = 82;
    public static readonly MetaWhitespace = 83;
    public static readonly MetaBodyComment = 84;
    public static readonly MetaIdentifier = 85;
    public static readonly MetaColon = 86;
    public static readonly EndMeta = 87;
    public static readonly MetaBodyWhitespace = 88;
    public static readonly MetaValueComment = 89;
    public static readonly MetaBool = 90;
    public static readonly MetaInt = 91;
    public static readonly MetaFloat = 92;
    public static readonly MetaNull = 93;
    public static readonly MetaSquote = 94;
    public static readonly MetaDquote = 95;
    public static readonly MetaEmptyObject = 96;
    public static readonly MetaEmptyArray = 97;
    public static readonly MetaLbrack = 98;
    public static readonly MetaLbrace = 99;
    public static readonly MetaValueWhitespace = 100;
    public static readonly MetaStringPart = 101;
    public static readonly MetaArrayComment = 102;
    public static readonly MetaArrayCommaRbrack = 103;
    public static readonly MetaArrayComma = 104;
    public static readonly MetaRbrack = 105;
    public static readonly MetaArrayWhitespace = 106;
    public static readonly MetaObjectIdentifier = 107;
    public static readonly MetaObjectColon = 108;
    public static readonly MetaObjectCommaRbrace = 109;
    public static readonly MetaObjectComma = 110;
    public static readonly MetaRbrace = 111;
    public static readonly MetaObjectWhitespace = 112;
    public static readonly HereDocEscapedEnd = 113;
    public static readonly RULE_map_type = 0;
    public static readonly RULE_array_type = 1;
    public static readonly RULE_pair_type = 2;
    public static readonly RULE_type_base = 3;
    public static readonly RULE_wdl_type = 4;
    public static readonly RULE_unbound_decls = 5;
    public static readonly RULE_bound_decls = 6;
    public static readonly RULE_any_decls = 7;
    public static readonly RULE_number = 8;
    public static readonly RULE_expression_placeholder_option = 9;
    public static readonly RULE_string_part = 10;
    public static readonly RULE_string_expr_part = 11;
    public static readonly RULE_string_expr_with_string_part = 12;
    public static readonly RULE_string = 13;
    public static readonly RULE_primitive_literal = 14;
    public static readonly RULE_expr = 15;
    public static readonly RULE_expr_infix = 16;
    public static readonly RULE_expr_infix0 = 17;
    public static readonly RULE_expr_infix1 = 18;
    public static readonly RULE_expr_infix2 = 19;
    public static readonly RULE_expr_infix3 = 20;
    public static readonly RULE_expr_infix4 = 21;
    public static readonly RULE_expr_infix5 = 22;
    public static readonly RULE_member = 23;
    public static readonly RULE_expr_core = 24;
    public static readonly RULE_version = 25;
    public static readonly RULE_import_alias = 26;
    public static readonly RULE_import_as = 27;
    public static readonly RULE_import_doc = 28;
    public static readonly RULE_struct = 29;
    public static readonly RULE_meta_value = 30;
    public static readonly RULE_meta_string_part = 31;
    public static readonly RULE_meta_string = 32;
    public static readonly RULE_meta_array = 33;
    public static readonly RULE_meta_object = 34;
    public static readonly RULE_meta_object_kv = 35;
    public static readonly RULE_meta_kv = 36;
    public static readonly RULE_parameter_meta = 37;
    public static readonly RULE_meta = 38;
    public static readonly RULE_task_runtime_kv = 39;
    public static readonly RULE_task_runtime = 40;
    public static readonly RULE_task_input = 41;
    public static readonly RULE_task_output = 42;
    public static readonly RULE_task_command_string_part = 43;
    public static readonly RULE_task_command_expr_part = 44;
    public static readonly RULE_task_command_expr_with_string = 45;
    public static readonly RULE_task_command = 46;
    public static readonly RULE_task_element = 47;
    public static readonly RULE_task = 48;
    public static readonly RULE_inner_workflow_element = 49;
    public static readonly RULE_call_alias = 50;
    public static readonly RULE_call_input = 51;
    public static readonly RULE_call_inputs = 52;
    public static readonly RULE_call_body = 53;
    public static readonly RULE_call_after = 54;
    public static readonly RULE_call_name = 55;
    public static readonly RULE_call = 56;
    public static readonly RULE_scatter = 57;
    public static readonly RULE_conditional = 58;
    public static readonly RULE_workflow_input = 59;
    public static readonly RULE_workflow_output = 60;
    public static readonly RULE_workflow_element = 61;
    public static readonly RULE_workflow = 62;
    public static readonly RULE_document_element = 63;
    public static readonly RULE_document = 64;

    public static readonly literalNames = [
        null, null, "'version'", "'import'", "'workflow'", "'task'", "'struct'", 
        "'scatter'", "'call'", "'if'", "'then'", "'else'", "'alias'", "'as'", 
        "'in'", "'input'", "'output'", "'parameter_meta'", "'meta'", "'runtime'", 
        "'Boolean'", "'Int'", "'Float'", "'String'", "'File'", "'Array'", 
        "'Map'", "'Object'", "'object'", "'sep='", "'default='", "'Pair'", 
        "'after'", "'command'", "'None'", null, null, null, "'('", "')'", 
        null, null, "'['", null, "'\\'", null, "'<'", "'>'", "'>='", "'<='", 
        "'=='", "'!='", "'='", "'&&'", "'||'", "'?'", "'*'", "'+'", "'-'", 
        null, null, "';'", "'.'", "'!'", null, "'/'", "'%'", null, null, 
        null, null, null, null, "'<<<'", null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, "'null'", null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, "'\\>>>'"
    ];

    public static readonly symbolicNames = [
        null, "LINE_COMMENT", "VERSION", "IMPORT", "WORKFLOW", "TASK", "STRUCT", 
        "SCATTER", "CALL", "IF", "THEN", "ELSE", "ALIAS", "AS", "In", "INPUT", 
        "OUTPUT", "PARAMETERMETA", "META", "RUNTIME", "BOOLEAN", "INT", 
        "FLOAT", "STRING", "FILE", "ARRAY", "MAP", "OBJECT", "OBJECTLITERAL", 
        "SEPEQUAL", "DEFAULTEQUAL", "PAIR", "AFTER", "COMMAND", "NONELITERAL", 
        "IntLiteral", "FloatLiteral", "BoolLiteral", "LPAREN", "RPAREN", 
        "LBRACE", "RBRACE", "LBRACK", "RBRACK", "ESC", "COLON", "LT", "GT", 
        "GTE", "LTE", "EQUALITY", "NOTEQUAL", "EQUAL", "AND", "OR", "OPTIONAL", 
        "STAR", "PLUS", "MINUS", "DOLLAR", "COMMA", "SEMI", "DOT", "NOT", 
        "TILDE", "DIVIDE", "MOD", "SQUOTE", "DQUOTE", "WHITESPACE", "Identifier", 
        "StringPart", "BeginWhitespace", "BeginHereDoc", "BeginLBrace", 
        "HereDocUnicodeEscape", "CommandUnicodeEscape", "StringCommandStart", 
        "EndCommand", "CommandStringPart", "VersionWhitespace", "ReleaseVersion", 
        "BeginMeta", "MetaWhitespace", "MetaBodyComment", "MetaIdentifier", 
        "MetaColon", "EndMeta", "MetaBodyWhitespace", "MetaValueComment", 
        "MetaBool", "MetaInt", "MetaFloat", "MetaNull", "MetaSquote", "MetaDquote", 
        "MetaEmptyObject", "MetaEmptyArray", "MetaLbrack", "MetaLbrace", 
        "MetaValueWhitespace", "MetaStringPart", "MetaArrayComment", "MetaArrayCommaRbrack", 
        "MetaArrayComma", "MetaRbrack", "MetaArrayWhitespace", "MetaObjectIdentifier", 
        "MetaObjectColon", "MetaObjectCommaRbrace", "MetaObjectComma", "MetaRbrace", 
        "MetaObjectWhitespace", "HereDocEscapedEnd"
    ];
    public static readonly ruleNames = [
        "map_type", "array_type", "pair_type", "type_base", "wdl_type", 
        "unbound_decls", "bound_decls", "any_decls", "number", "expression_placeholder_option", 
        "string_part", "string_expr_part", "string_expr_with_string_part", 
        "string", "primitive_literal", "expr", "expr_infix", "expr_infix0", 
        "expr_infix1", "expr_infix2", "expr_infix3", "expr_infix4", "expr_infix5", 
        "member", "expr_core", "version", "import_alias", "import_as", "import_doc", 
        "struct", "meta_value", "meta_string_part", "meta_string", "meta_array", 
        "meta_object", "meta_object_kv", "meta_kv", "parameter_meta", "meta", 
        "task_runtime_kv", "task_runtime", "task_input", "task_output", 
        "task_command_string_part", "task_command_expr_part", "task_command_expr_with_string", 
        "task_command", "task_element", "task", "inner_workflow_element", 
        "call_alias", "call_input", "call_inputs", "call_body", "call_after", 
        "call_name", "call", "scatter", "conditional", "workflow_input", 
        "workflow_output", "workflow_element", "workflow", "document_element", 
        "document",
    ];

    public get grammarFileName(): string { return "WdlV1_1Parser.g4"; }
    public get literalNames(): (string | null)[] { return WdlV1_1Parser.literalNames; }
    public get symbolicNames(): (string | null)[] { return WdlV1_1Parser.symbolicNames; }
    public get ruleNames(): string[] { return WdlV1_1Parser.ruleNames; }
    public get serializedATN(): number[] { return WdlV1_1Parser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, WdlV1_1Parser._ATN, WdlV1_1Parser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public map_type(): Map_typeContext {
        let localContext = new Map_typeContext(this.context, this.state);
        this.enterRule(localContext, 0, WdlV1_1Parser.RULE_map_type);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 130;
            this.match(WdlV1_1Parser.MAP);
            this.state = 131;
            this.match(WdlV1_1Parser.LBRACK);
            this.state = 132;
            this.wdl_type();
            this.state = 133;
            this.match(WdlV1_1Parser.COMMA);
            this.state = 134;
            this.wdl_type();
            this.state = 135;
            this.match(WdlV1_1Parser.RBRACK);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public array_type(): Array_typeContext {
        let localContext = new Array_typeContext(this.context, this.state);
        this.enterRule(localContext, 2, WdlV1_1Parser.RULE_array_type);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 137;
            this.match(WdlV1_1Parser.ARRAY);
            this.state = 138;
            this.match(WdlV1_1Parser.LBRACK);
            this.state = 139;
            this.wdl_type();
            this.state = 140;
            this.match(WdlV1_1Parser.RBRACK);
            this.state = 142;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 57) {
                {
                this.state = 141;
                this.match(WdlV1_1Parser.PLUS);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public pair_type(): Pair_typeContext {
        let localContext = new Pair_typeContext(this.context, this.state);
        this.enterRule(localContext, 4, WdlV1_1Parser.RULE_pair_type);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 144;
            this.match(WdlV1_1Parser.PAIR);
            this.state = 145;
            this.match(WdlV1_1Parser.LBRACK);
            this.state = 146;
            this.wdl_type();
            this.state = 147;
            this.match(WdlV1_1Parser.COMMA);
            this.state = 148;
            this.wdl_type();
            this.state = 149;
            this.match(WdlV1_1Parser.RBRACK);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public type_base(): Type_baseContext {
        let localContext = new Type_baseContext(this.context, this.state);
        this.enterRule(localContext, 6, WdlV1_1Parser.RULE_type_base);
        let _la: number;
        try {
            this.state = 155;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case WdlV1_1Parser.ARRAY:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 151;
                this.array_type();
                }
                break;
            case WdlV1_1Parser.MAP:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 152;
                this.map_type();
                }
                break;
            case WdlV1_1Parser.PAIR:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 153;
                this.pair_type();
                }
                break;
            case WdlV1_1Parser.BOOLEAN:
            case WdlV1_1Parser.INT:
            case WdlV1_1Parser.FLOAT:
            case WdlV1_1Parser.STRING:
            case WdlV1_1Parser.FILE:
            case WdlV1_1Parser.OBJECT:
            case WdlV1_1Parser.Identifier:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 154;
                _la = this.tokenStream.LA(1);
                if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 166723584) !== 0) || _la === 70)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public wdl_type(): Wdl_typeContext {
        let localContext = new Wdl_typeContext(this.context, this.state);
        this.enterRule(localContext, 8, WdlV1_1Parser.RULE_wdl_type);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 161;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 2, this.context) ) {
            case 1:
                {
                this.state = 157;
                this.type_base();
                this.state = 158;
                this.match(WdlV1_1Parser.OPTIONAL);
                }
                break;
            case 2:
                {
                this.state = 160;
                this.type_base();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public unbound_decls(): Unbound_declsContext {
        let localContext = new Unbound_declsContext(this.context, this.state);
        this.enterRule(localContext, 10, WdlV1_1Parser.RULE_unbound_decls);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 163;
            this.wdl_type();
            this.state = 164;
            this.match(WdlV1_1Parser.Identifier);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public bound_decls(): Bound_declsContext {
        let localContext = new Bound_declsContext(this.context, this.state);
        this.enterRule(localContext, 12, WdlV1_1Parser.RULE_bound_decls);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 166;
            this.wdl_type();
            this.state = 167;
            this.match(WdlV1_1Parser.Identifier);
            this.state = 168;
            this.match(WdlV1_1Parser.EQUAL);
            this.state = 169;
            this.expr();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public any_decls(): Any_declsContext {
        let localContext = new Any_declsContext(this.context, this.state);
        this.enterRule(localContext, 14, WdlV1_1Parser.RULE_any_decls);
        try {
            this.state = 173;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 171;
                this.unbound_decls();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 172;
                this.bound_decls();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public number_(): NumberContext {
        let localContext = new NumberContext(this.context, this.state);
        this.enterRule(localContext, 16, WdlV1_1Parser.RULE_number);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 175;
            _la = this.tokenStream.LA(1);
            if(!(_la === 35 || _la === 36)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expression_placeholder_option(): Expression_placeholder_optionContext {
        let localContext = new Expression_placeholder_optionContext(this.context, this.state);
        this.enterRule(localContext, 18, WdlV1_1Parser.RULE_expression_placeholder_option);
        try {
            this.state = 187;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case WdlV1_1Parser.BoolLiteral:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 177;
                this.match(WdlV1_1Parser.BoolLiteral);
                this.state = 178;
                this.match(WdlV1_1Parser.EQUAL);
                this.state = 179;
                this.string_();
                }
                break;
            case WdlV1_1Parser.DEFAULTEQUAL:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 180;
                this.match(WdlV1_1Parser.DEFAULTEQUAL);
                this.state = 183;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case WdlV1_1Parser.SQUOTE:
                case WdlV1_1Parser.DQUOTE:
                    {
                    this.state = 181;
                    this.string_();
                    }
                    break;
                case WdlV1_1Parser.IntLiteral:
                case WdlV1_1Parser.FloatLiteral:
                    {
                    this.state = 182;
                    this.number_();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                break;
            case WdlV1_1Parser.SEPEQUAL:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 185;
                this.match(WdlV1_1Parser.SEPEQUAL);
                this.state = 186;
                this.string_();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public string_part(): String_partContext {
        let localContext = new String_partContext(this.context, this.state);
        this.enterRule(localContext, 20, WdlV1_1Parser.RULE_string_part);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 192;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 71) {
                {
                {
                this.state = 189;
                this.match(WdlV1_1Parser.StringPart);
                }
                }
                this.state = 194;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public string_expr_part(): String_expr_partContext {
        let localContext = new String_expr_partContext(this.context, this.state);
        this.enterRule(localContext, 22, WdlV1_1Parser.RULE_string_expr_part);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 195;
            this.match(WdlV1_1Parser.StringCommandStart);
            this.state = 199;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 7, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 196;
                    this.expression_placeholder_option();
                    }
                    }
                }
                this.state = 201;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 7, this.context);
            }
            this.state = 202;
            this.expr();
            this.state = 203;
            this.match(WdlV1_1Parser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public string_expr_with_string_part(): String_expr_with_string_partContext {
        let localContext = new String_expr_with_string_partContext(this.context, this.state);
        this.enterRule(localContext, 24, WdlV1_1Parser.RULE_string_expr_with_string_part);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 205;
            this.string_expr_part();
            this.state = 206;
            this.string_part();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public string_(): StringContext {
        let localContext = new StringContext(this.context, this.state);
        this.enterRule(localContext, 26, WdlV1_1Parser.RULE_string);
        let _la: number;
        try {
            this.state = 228;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case WdlV1_1Parser.DQUOTE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 208;
                this.match(WdlV1_1Parser.DQUOTE);
                this.state = 209;
                this.string_part();
                this.state = 213;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 77) {
                    {
                    {
                    this.state = 210;
                    this.string_expr_with_string_part();
                    }
                    }
                    this.state = 215;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 216;
                this.match(WdlV1_1Parser.DQUOTE);
                }
                break;
            case WdlV1_1Parser.SQUOTE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 218;
                this.match(WdlV1_1Parser.SQUOTE);
                this.state = 219;
                this.string_part();
                this.state = 223;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 77) {
                    {
                    {
                    this.state = 220;
                    this.string_expr_with_string_part();
                    }
                    }
                    this.state = 225;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 226;
                this.match(WdlV1_1Parser.SQUOTE);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public primitive_literal(): Primitive_literalContext {
        let localContext = new Primitive_literalContext(this.context, this.state);
        this.enterRule(localContext, 28, WdlV1_1Parser.RULE_primitive_literal);
        try {
            this.state = 235;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case WdlV1_1Parser.BoolLiteral:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 230;
                this.match(WdlV1_1Parser.BoolLiteral);
                }
                break;
            case WdlV1_1Parser.IntLiteral:
            case WdlV1_1Parser.FloatLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 231;
                this.number_();
                }
                break;
            case WdlV1_1Parser.SQUOTE:
            case WdlV1_1Parser.DQUOTE:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 232;
                this.string_();
                }
                break;
            case WdlV1_1Parser.NONELITERAL:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 233;
                this.match(WdlV1_1Parser.NONELITERAL);
                }
                break;
            case WdlV1_1Parser.Identifier:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 234;
                this.match(WdlV1_1Parser.Identifier);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expr(): ExprContext {
        let localContext = new ExprContext(this.context, this.state);
        this.enterRule(localContext, 30, WdlV1_1Parser.RULE_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 237;
            this.expr_infix();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expr_infix(): Expr_infixContext {
        let localContext = new Expr_infixContext(this.context, this.state);
        this.enterRule(localContext, 32, WdlV1_1Parser.RULE_expr_infix);
        try {
            localContext = new Infix0Context(localContext);
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 239;
            this.expr_infix0(0);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public expr_infix0(): Expr_infix0Context;
    public expr_infix0(_p: number): Expr_infix0Context;
    public expr_infix0(_p?: number): Expr_infix0Context {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new Expr_infix0Context(this.context, parentState);
        let previousContext = localContext;
        let _startState = 34;
        this.enterRecursionRule(localContext, 34, WdlV1_1Parser.RULE_expr_infix0, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            localContext = new Infix1Context(localContext);
            this.context = localContext;
            previousContext = localContext;

            this.state = 242;
            this.expr_infix1(0);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 249;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 12, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    {
                    localContext = new LorContext(new Expr_infix0Context(parentContext, parentState));
                    this.pushNewRecursionContext(localContext, _startState, WdlV1_1Parser.RULE_expr_infix0);
                    this.state = 244;
                    if (!(this.precpred(this.context, 2))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                    }
                    this.state = 245;
                    this.match(WdlV1_1Parser.OR);
                    this.state = 246;
                    this.expr_infix1(0);
                    }
                    }
                }
                this.state = 251;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 12, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }

    public expr_infix1(): Expr_infix1Context;
    public expr_infix1(_p: number): Expr_infix1Context;
    public expr_infix1(_p?: number): Expr_infix1Context {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new Expr_infix1Context(this.context, parentState);
        let previousContext = localContext;
        let _startState = 36;
        this.enterRecursionRule(localContext, 36, WdlV1_1Parser.RULE_expr_infix1, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            localContext = new Infix2Context(localContext);
            this.context = localContext;
            previousContext = localContext;

            this.state = 253;
            this.expr_infix2(0);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 260;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 13, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    {
                    localContext = new LandContext(new Expr_infix1Context(parentContext, parentState));
                    this.pushNewRecursionContext(localContext, _startState, WdlV1_1Parser.RULE_expr_infix1);
                    this.state = 255;
                    if (!(this.precpred(this.context, 2))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                    }
                    this.state = 256;
                    this.match(WdlV1_1Parser.AND);
                    this.state = 257;
                    this.expr_infix2(0);
                    }
                    }
                }
                this.state = 262;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 13, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }

    public expr_infix2(): Expr_infix2Context;
    public expr_infix2(_p: number): Expr_infix2Context;
    public expr_infix2(_p?: number): Expr_infix2Context {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new Expr_infix2Context(this.context, parentState);
        let previousContext = localContext;
        let _startState = 38;
        this.enterRecursionRule(localContext, 38, WdlV1_1Parser.RULE_expr_infix2, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            localContext = new Infix3Context(localContext);
            this.context = localContext;
            previousContext = localContext;

            this.state = 264;
            this.expr_infix3(0);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 286;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 15, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 284;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 14, this.context) ) {
                    case 1:
                        {
                        localContext = new EqeqContext(new Expr_infix2Context(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, WdlV1_1Parser.RULE_expr_infix2);
                        this.state = 266;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 267;
                        this.match(WdlV1_1Parser.EQUALITY);
                        this.state = 268;
                        this.expr_infix3(0);
                        }
                        break;
                    case 2:
                        {
                        localContext = new NeqContext(new Expr_infix2Context(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, WdlV1_1Parser.RULE_expr_infix2);
                        this.state = 269;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 270;
                        this.match(WdlV1_1Parser.NOTEQUAL);
                        this.state = 271;
                        this.expr_infix3(0);
                        }
                        break;
                    case 3:
                        {
                        localContext = new LteContext(new Expr_infix2Context(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, WdlV1_1Parser.RULE_expr_infix2);
                        this.state = 272;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 273;
                        this.match(WdlV1_1Parser.LTE);
                        this.state = 274;
                        this.expr_infix3(0);
                        }
                        break;
                    case 4:
                        {
                        localContext = new GteContext(new Expr_infix2Context(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, WdlV1_1Parser.RULE_expr_infix2);
                        this.state = 275;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 276;
                        this.match(WdlV1_1Parser.GTE);
                        this.state = 277;
                        this.expr_infix3(0);
                        }
                        break;
                    case 5:
                        {
                        localContext = new LtContext(new Expr_infix2Context(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, WdlV1_1Parser.RULE_expr_infix2);
                        this.state = 278;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 279;
                        this.match(WdlV1_1Parser.LT);
                        this.state = 280;
                        this.expr_infix3(0);
                        }
                        break;
                    case 6:
                        {
                        localContext = new GtContext(new Expr_infix2Context(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, WdlV1_1Parser.RULE_expr_infix2);
                        this.state = 281;
                        if (!(this.precpred(this.context, 2))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                        }
                        this.state = 282;
                        this.match(WdlV1_1Parser.GT);
                        this.state = 283;
                        this.expr_infix3(0);
                        }
                        break;
                    }
                    }
                }
                this.state = 288;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 15, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }

    public expr_infix3(): Expr_infix3Context;
    public expr_infix3(_p: number): Expr_infix3Context;
    public expr_infix3(_p?: number): Expr_infix3Context {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new Expr_infix3Context(this.context, parentState);
        let previousContext = localContext;
        let _startState = 40;
        this.enterRecursionRule(localContext, 40, WdlV1_1Parser.RULE_expr_infix3, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            localContext = new Infix4Context(localContext);
            this.context = localContext;
            previousContext = localContext;

            this.state = 290;
            this.expr_infix4(0);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 300;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 17, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 298;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 16, this.context) ) {
                    case 1:
                        {
                        localContext = new AddContext(new Expr_infix3Context(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, WdlV1_1Parser.RULE_expr_infix3);
                        this.state = 292;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 293;
                        this.match(WdlV1_1Parser.PLUS);
                        this.state = 294;
                        this.expr_infix4(0);
                        }
                        break;
                    case 2:
                        {
                        localContext = new SubContext(new Expr_infix3Context(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, WdlV1_1Parser.RULE_expr_infix3);
                        this.state = 295;
                        if (!(this.precpred(this.context, 2))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                        }
                        this.state = 296;
                        this.match(WdlV1_1Parser.MINUS);
                        this.state = 297;
                        this.expr_infix4(0);
                        }
                        break;
                    }
                    }
                }
                this.state = 302;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 17, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }

    public expr_infix4(): Expr_infix4Context;
    public expr_infix4(_p: number): Expr_infix4Context;
    public expr_infix4(_p?: number): Expr_infix4Context {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new Expr_infix4Context(this.context, parentState);
        let previousContext = localContext;
        let _startState = 42;
        this.enterRecursionRule(localContext, 42, WdlV1_1Parser.RULE_expr_infix4, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            localContext = new Infix5Context(localContext);
            this.context = localContext;
            previousContext = localContext;

            this.state = 304;
            this.expr_infix5();
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 317;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 19, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 315;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 18, this.context) ) {
                    case 1:
                        {
                        localContext = new MulContext(new Expr_infix4Context(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, WdlV1_1Parser.RULE_expr_infix4);
                        this.state = 306;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 307;
                        this.match(WdlV1_1Parser.STAR);
                        this.state = 308;
                        this.expr_infix5();
                        }
                        break;
                    case 2:
                        {
                        localContext = new DivideContext(new Expr_infix4Context(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, WdlV1_1Parser.RULE_expr_infix4);
                        this.state = 309;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 310;
                        this.match(WdlV1_1Parser.DIVIDE);
                        this.state = 311;
                        this.expr_infix5();
                        }
                        break;
                    case 3:
                        {
                        localContext = new ModContext(new Expr_infix4Context(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, WdlV1_1Parser.RULE_expr_infix4);
                        this.state = 312;
                        if (!(this.precpred(this.context, 2))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                        }
                        this.state = 313;
                        this.match(WdlV1_1Parser.MOD);
                        this.state = 314;
                        this.expr_infix5();
                        }
                        break;
                    }
                    }
                }
                this.state = 319;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 19, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public expr_infix5(): Expr_infix5Context {
        let localContext = new Expr_infix5Context(this.context, this.state);
        this.enterRule(localContext, 44, WdlV1_1Parser.RULE_expr_infix5);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 320;
            this.expr_core(0);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public member(): MemberContext {
        let localContext = new MemberContext(this.context, this.state);
        this.enterRule(localContext, 46, WdlV1_1Parser.RULE_member);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 322;
            this.match(WdlV1_1Parser.Identifier);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public expr_core(): Expr_coreContext;
    public expr_core(_p: number): Expr_coreContext;
    public expr_core(_p?: number): Expr_coreContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new Expr_coreContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 48;
        this.enterRecursionRule(localContext, 48, WdlV1_1Parser.RULE_expr_core, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 453;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 35, this.context) ) {
            case 1:
                {
                localContext = new ApplyContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 325;
                this.match(WdlV1_1Parser.Identifier);
                this.state = 326;
                this.match(WdlV1_1Parser.LPAREN);
                this.state = 338;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (((((_la - 9)) & ~0x1F) === 0 && ((1 << (_la - 9)) & 3188195329) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 371294209) !== 0)) {
                    {
                    this.state = 327;
                    this.expr();
                    this.state = 332;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 328;
                            this.match(WdlV1_1Parser.COMMA);
                            this.state = 329;
                            this.expr();
                            }
                            }
                        }
                        this.state = 334;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
                    }
                    this.state = 336;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 60) {
                        {
                        this.state = 335;
                        this.match(WdlV1_1Parser.COMMA);
                        }
                    }

                    }
                }

                this.state = 340;
                this.match(WdlV1_1Parser.RPAREN);
                }
                break;
            case 2:
                {
                localContext = new Array_literalContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 341;
                this.match(WdlV1_1Parser.LBRACK);
                this.state = 355;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (((((_la - 9)) & ~0x1F) === 0 && ((1 << (_la - 9)) & 3188195329) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 371294209) !== 0)) {
                    {
                    {
                    this.state = 342;
                    this.expr();
                    this.state = 347;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 23, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 343;
                            this.match(WdlV1_1Parser.COMMA);
                            this.state = 344;
                            this.expr();
                            }
                            }
                        }
                        this.state = 349;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 23, this.context);
                    }
                    this.state = 351;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 60) {
                        {
                        this.state = 350;
                        this.match(WdlV1_1Parser.COMMA);
                        }
                    }

                    }
                    }
                    this.state = 357;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 358;
                this.match(WdlV1_1Parser.RBRACK);
                }
                break;
            case 3:
                {
                localContext = new Pair_literalContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 359;
                this.match(WdlV1_1Parser.LPAREN);
                this.state = 360;
                this.expr();
                this.state = 361;
                this.match(WdlV1_1Parser.COMMA);
                this.state = 362;
                this.expr();
                this.state = 363;
                this.match(WdlV1_1Parser.RPAREN);
                }
                break;
            case 4:
                {
                localContext = new Map_literalContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 365;
                this.match(WdlV1_1Parser.LBRACE);
                this.state = 384;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (((((_la - 9)) & ~0x1F) === 0 && ((1 << (_la - 9)) & 3188195329) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 371294209) !== 0)) {
                    {
                    {
                    this.state = 366;
                    this.expr();
                    this.state = 367;
                    this.match(WdlV1_1Parser.COLON);
                    this.state = 368;
                    this.expr();
                    this.state = 376;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 26, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 369;
                            this.match(WdlV1_1Parser.COMMA);
                            this.state = 370;
                            this.expr();
                            this.state = 371;
                            this.match(WdlV1_1Parser.COLON);
                            this.state = 372;
                            this.expr();
                            }
                            }
                        }
                        this.state = 378;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 26, this.context);
                    }
                    this.state = 380;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 60) {
                        {
                        this.state = 379;
                        this.match(WdlV1_1Parser.COMMA);
                        }
                    }

                    }
                    }
                    this.state = 386;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 387;
                this.match(WdlV1_1Parser.RBRACE);
                }
                break;
            case 5:
                {
                localContext = new Object_literalContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 388;
                this.match(WdlV1_1Parser.OBJECTLITERAL);
                this.state = 389;
                this.match(WdlV1_1Parser.LBRACE);
                this.state = 408;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 70) {
                    {
                    {
                    this.state = 390;
                    this.member();
                    this.state = 391;
                    this.match(WdlV1_1Parser.COLON);
                    this.state = 392;
                    this.expr();
                    this.state = 400;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 29, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 393;
                            this.match(WdlV1_1Parser.COMMA);
                            this.state = 394;
                            this.member();
                            this.state = 395;
                            this.match(WdlV1_1Parser.COLON);
                            this.state = 396;
                            this.expr();
                            }
                            }
                        }
                        this.state = 402;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 29, this.context);
                    }
                    this.state = 404;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 60) {
                        {
                        this.state = 403;
                        this.match(WdlV1_1Parser.COMMA);
                        }
                    }

                    }
                    }
                    this.state = 410;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 411;
                this.match(WdlV1_1Parser.RBRACE);
                }
                break;
            case 6:
                {
                localContext = new Struct_literalContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 412;
                this.match(WdlV1_1Parser.Identifier);
                this.state = 413;
                this.match(WdlV1_1Parser.LBRACE);
                this.state = 432;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 70) {
                    {
                    {
                    this.state = 414;
                    this.member();
                    this.state = 415;
                    this.match(WdlV1_1Parser.COLON);
                    this.state = 416;
                    this.expr();
                    this.state = 424;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 32, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 417;
                            this.match(WdlV1_1Parser.COMMA);
                            this.state = 418;
                            this.member();
                            this.state = 419;
                            this.match(WdlV1_1Parser.COLON);
                            this.state = 420;
                            this.expr();
                            }
                            }
                        }
                        this.state = 426;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 32, this.context);
                    }
                    this.state = 428;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 60) {
                        {
                        this.state = 427;
                        this.match(WdlV1_1Parser.COMMA);
                        }
                    }

                    }
                    }
                    this.state = 434;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 435;
                this.match(WdlV1_1Parser.RBRACE);
                }
                break;
            case 7:
                {
                localContext = new IfthenelseContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 436;
                this.match(WdlV1_1Parser.IF);
                this.state = 437;
                this.expr();
                this.state = 438;
                this.match(WdlV1_1Parser.THEN);
                this.state = 439;
                this.expr();
                this.state = 440;
                this.match(WdlV1_1Parser.ELSE);
                this.state = 441;
                this.expr();
                }
                break;
            case 8:
                {
                localContext = new Expression_groupContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 443;
                this.match(WdlV1_1Parser.LPAREN);
                this.state = 444;
                this.expr();
                this.state = 445;
                this.match(WdlV1_1Parser.RPAREN);
                }
                break;
            case 9:
                {
                localContext = new NegateContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 447;
                this.match(WdlV1_1Parser.NOT);
                this.state = 448;
                this.expr();
                }
                break;
            case 10:
                {
                localContext = new UnarysignedContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 449;
                _la = this.tokenStream.LA(1);
                if(!(_la === 57 || _la === 58)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 450;
                this.expr();
                }
                break;
            case 11:
                {
                localContext = new PrimitivesContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 451;
                this.primitive_literal();
                }
                break;
            case 12:
                {
                localContext = new Left_nameContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 452;
                this.match(WdlV1_1Parser.Identifier);
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 465;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 37, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 463;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 36, this.context) ) {
                    case 1:
                        {
                        localContext = new AtContext(new Expr_coreContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, WdlV1_1Parser.RULE_expr_core);
                        this.state = 455;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 456;
                        this.match(WdlV1_1Parser.LBRACK);
                        this.state = 457;
                        this.expr();
                        this.state = 458;
                        this.match(WdlV1_1Parser.RBRACK);
                        }
                        break;
                    case 2:
                        {
                        localContext = new Get_nameContext(new Expr_coreContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, WdlV1_1Parser.RULE_expr_core);
                        this.state = 460;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 461;
                        this.match(WdlV1_1Parser.DOT);
                        this.state = 462;
                        this.match(WdlV1_1Parser.Identifier);
                        }
                        break;
                    }
                    }
                }
                this.state = 467;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 37, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public version(): VersionContext {
        let localContext = new VersionContext(this.context, this.state);
        this.enterRule(localContext, 50, WdlV1_1Parser.RULE_version);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 468;
            this.match(WdlV1_1Parser.VERSION);
            this.state = 469;
            this.match(WdlV1_1Parser.ReleaseVersion);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public import_alias(): Import_aliasContext {
        let localContext = new Import_aliasContext(this.context, this.state);
        this.enterRule(localContext, 52, WdlV1_1Parser.RULE_import_alias);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 471;
            this.match(WdlV1_1Parser.ALIAS);
            this.state = 472;
            this.match(WdlV1_1Parser.Identifier);
            this.state = 473;
            this.match(WdlV1_1Parser.AS);
            this.state = 474;
            this.match(WdlV1_1Parser.Identifier);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public import_as(): Import_asContext {
        let localContext = new Import_asContext(this.context, this.state);
        this.enterRule(localContext, 54, WdlV1_1Parser.RULE_import_as);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 476;
            this.match(WdlV1_1Parser.AS);
            this.state = 477;
            this.match(WdlV1_1Parser.Identifier);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public import_doc(): Import_docContext {
        let localContext = new Import_docContext(this.context, this.state);
        this.enterRule(localContext, 56, WdlV1_1Parser.RULE_import_doc);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 479;
            this.match(WdlV1_1Parser.IMPORT);
            this.state = 480;
            this.string_();
            this.state = 482;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 13) {
                {
                this.state = 481;
                this.import_as();
                }
            }

            this.state = 487;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 12) {
                {
                {
                this.state = 484;
                this.import_alias();
                }
                }
                this.state = 489;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public struct(): StructContext {
        let localContext = new StructContext(this.context, this.state);
        this.enterRule(localContext, 58, WdlV1_1Parser.RULE_struct);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 490;
            this.match(WdlV1_1Parser.STRUCT);
            this.state = 491;
            this.match(WdlV1_1Parser.Identifier);
            this.state = 492;
            this.match(WdlV1_1Parser.LBRACE);
            this.state = 496;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2414870528) !== 0) || _la === 70) {
                {
                {
                this.state = 493;
                this.unbound_decls();
                }
                }
                this.state = 498;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 499;
            this.match(WdlV1_1Parser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public meta_value(): Meta_valueContext {
        let localContext = new Meta_valueContext(this.context, this.state);
        this.enterRule(localContext, 60, WdlV1_1Parser.RULE_meta_value);
        try {
            this.state = 508;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case WdlV1_1Parser.MetaNull:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 501;
                this.match(WdlV1_1Parser.MetaNull);
                }
                break;
            case WdlV1_1Parser.MetaBool:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 502;
                this.match(WdlV1_1Parser.MetaBool);
                }
                break;
            case WdlV1_1Parser.MetaInt:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 503;
                this.match(WdlV1_1Parser.MetaInt);
                }
                break;
            case WdlV1_1Parser.MetaFloat:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 504;
                this.match(WdlV1_1Parser.MetaFloat);
                }
                break;
            case WdlV1_1Parser.MetaSquote:
            case WdlV1_1Parser.MetaDquote:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 505;
                this.meta_string();
                }
                break;
            case WdlV1_1Parser.MetaEmptyObject:
            case WdlV1_1Parser.MetaLbrace:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 506;
                this.meta_object();
                }
                break;
            case WdlV1_1Parser.MetaEmptyArray:
            case WdlV1_1Parser.MetaLbrack:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 507;
                this.meta_array();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public meta_string_part(): Meta_string_partContext {
        let localContext = new Meta_string_partContext(this.context, this.state);
        this.enterRule(localContext, 62, WdlV1_1Parser.RULE_meta_string_part);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 513;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 101) {
                {
                {
                this.state = 510;
                this.match(WdlV1_1Parser.MetaStringPart);
                }
                }
                this.state = 515;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public meta_string(): Meta_stringContext {
        let localContext = new Meta_stringContext(this.context, this.state);
        this.enterRule(localContext, 64, WdlV1_1Parser.RULE_meta_string);
        try {
            this.state = 524;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case WdlV1_1Parser.MetaDquote:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 516;
                this.match(WdlV1_1Parser.MetaDquote);
                this.state = 517;
                this.meta_string_part();
                this.state = 518;
                this.match(WdlV1_1Parser.MetaDquote);
                }
                break;
            case WdlV1_1Parser.MetaSquote:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 520;
                this.match(WdlV1_1Parser.MetaSquote);
                this.state = 521;
                this.meta_string_part();
                this.state = 522;
                this.match(WdlV1_1Parser.MetaSquote);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public meta_array(): Meta_arrayContext {
        let localContext = new Meta_arrayContext(this.context, this.state);
        this.enterRule(localContext, 66, WdlV1_1Parser.RULE_meta_array);
        let _la: number;
        try {
            this.state = 538;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case WdlV1_1Parser.MetaEmptyArray:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 526;
                this.match(WdlV1_1Parser.MetaEmptyArray);
                }
                break;
            case WdlV1_1Parser.MetaLbrack:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 527;
                this.match(WdlV1_1Parser.MetaLbrack);
                this.state = 528;
                this.meta_value();
                this.state = 533;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 104) {
                    {
                    {
                    this.state = 529;
                    this.match(WdlV1_1Parser.MetaArrayComma);
                    this.state = 530;
                    this.meta_value();
                    }
                    }
                    this.state = 535;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 536;
                _la = this.tokenStream.LA(1);
                if(!(_la === 103 || _la === 105)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public meta_object(): Meta_objectContext {
        let localContext = new Meta_objectContext(this.context, this.state);
        this.enterRule(localContext, 68, WdlV1_1Parser.RULE_meta_object);
        let _la: number;
        try {
            this.state = 552;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case WdlV1_1Parser.MetaEmptyObject:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 540;
                this.match(WdlV1_1Parser.MetaEmptyObject);
                }
                break;
            case WdlV1_1Parser.MetaLbrace:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 541;
                this.match(WdlV1_1Parser.MetaLbrace);
                this.state = 542;
                this.meta_object_kv();
                this.state = 547;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 110) {
                    {
                    {
                    this.state = 543;
                    this.match(WdlV1_1Parser.MetaObjectComma);
                    this.state = 544;
                    this.meta_object_kv();
                    }
                    }
                    this.state = 549;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 550;
                _la = this.tokenStream.LA(1);
                if(!(_la === 109 || _la === 111)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public meta_object_kv(): Meta_object_kvContext {
        let localContext = new Meta_object_kvContext(this.context, this.state);
        this.enterRule(localContext, 70, WdlV1_1Parser.RULE_meta_object_kv);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 554;
            this.match(WdlV1_1Parser.MetaObjectIdentifier);
            this.state = 555;
            this.match(WdlV1_1Parser.MetaObjectColon);
            this.state = 556;
            this.meta_value();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public meta_kv(): Meta_kvContext {
        let localContext = new Meta_kvContext(this.context, this.state);
        this.enterRule(localContext, 72, WdlV1_1Parser.RULE_meta_kv);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 558;
            this.match(WdlV1_1Parser.MetaIdentifier);
            this.state = 559;
            this.match(WdlV1_1Parser.MetaColon);
            this.state = 560;
            this.meta_value();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public parameter_meta(): Parameter_metaContext {
        let localContext = new Parameter_metaContext(this.context, this.state);
        this.enterRule(localContext, 74, WdlV1_1Parser.RULE_parameter_meta);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 562;
            this.match(WdlV1_1Parser.PARAMETERMETA);
            this.state = 563;
            this.match(WdlV1_1Parser.BeginMeta);
            this.state = 567;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 85) {
                {
                {
                this.state = 564;
                this.meta_kv();
                }
                }
                this.state = 569;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 570;
            this.match(WdlV1_1Parser.EndMeta);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public meta(): MetaContext {
        let localContext = new MetaContext(this.context, this.state);
        this.enterRule(localContext, 76, WdlV1_1Parser.RULE_meta);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 572;
            this.match(WdlV1_1Parser.META);
            this.state = 573;
            this.match(WdlV1_1Parser.BeginMeta);
            this.state = 577;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 85) {
                {
                {
                this.state = 574;
                this.meta_kv();
                }
                }
                this.state = 579;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 580;
            this.match(WdlV1_1Parser.EndMeta);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public task_runtime_kv(): Task_runtime_kvContext {
        let localContext = new Task_runtime_kvContext(this.context, this.state);
        this.enterRule(localContext, 78, WdlV1_1Parser.RULE_task_runtime_kv);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 582;
            this.match(WdlV1_1Parser.Identifier);
            this.state = 583;
            this.match(WdlV1_1Parser.COLON);
            this.state = 584;
            this.expr();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public task_runtime(): Task_runtimeContext {
        let localContext = new Task_runtimeContext(this.context, this.state);
        this.enterRule(localContext, 80, WdlV1_1Parser.RULE_task_runtime);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 586;
            this.match(WdlV1_1Parser.RUNTIME);
            this.state = 587;
            this.match(WdlV1_1Parser.LBRACE);
            this.state = 591;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 70) {
                {
                {
                this.state = 588;
                this.task_runtime_kv();
                }
                }
                this.state = 593;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 594;
            this.match(WdlV1_1Parser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public task_input(): Task_inputContext {
        let localContext = new Task_inputContext(this.context, this.state);
        this.enterRule(localContext, 82, WdlV1_1Parser.RULE_task_input);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 596;
            this.match(WdlV1_1Parser.INPUT);
            this.state = 597;
            this.match(WdlV1_1Parser.LBRACE);
            this.state = 601;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2414870528) !== 0) || _la === 70) {
                {
                {
                this.state = 598;
                this.any_decls();
                }
                }
                this.state = 603;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 604;
            this.match(WdlV1_1Parser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public task_output(): Task_outputContext {
        let localContext = new Task_outputContext(this.context, this.state);
        this.enterRule(localContext, 84, WdlV1_1Parser.RULE_task_output);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 606;
            this.match(WdlV1_1Parser.OUTPUT);
            this.state = 607;
            this.match(WdlV1_1Parser.LBRACE);
            this.state = 611;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2414870528) !== 0) || _la === 70) {
                {
                {
                this.state = 608;
                this.bound_decls();
                }
                }
                this.state = 613;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 614;
            this.match(WdlV1_1Parser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public task_command_string_part(): Task_command_string_partContext {
        let localContext = new Task_command_string_partContext(this.context, this.state);
        this.enterRule(localContext, 86, WdlV1_1Parser.RULE_task_command_string_part);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 619;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 79) {
                {
                {
                this.state = 616;
                this.match(WdlV1_1Parser.CommandStringPart);
                }
                }
                this.state = 621;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public task_command_expr_part(): Task_command_expr_partContext {
        let localContext = new Task_command_expr_partContext(this.context, this.state);
        this.enterRule(localContext, 88, WdlV1_1Parser.RULE_task_command_expr_part);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 622;
            this.match(WdlV1_1Parser.StringCommandStart);
            this.state = 626;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 54, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 623;
                    this.expression_placeholder_option();
                    }
                    }
                }
                this.state = 628;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 54, this.context);
            }
            this.state = 629;
            this.expr();
            this.state = 630;
            this.match(WdlV1_1Parser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public task_command_expr_with_string(): Task_command_expr_with_stringContext {
        let localContext = new Task_command_expr_with_stringContext(this.context, this.state);
        this.enterRule(localContext, 90, WdlV1_1Parser.RULE_task_command_expr_with_string);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 632;
            this.task_command_expr_part();
            this.state = 633;
            this.task_command_string_part();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public task_command(): Task_commandContext {
        let localContext = new Task_commandContext(this.context, this.state);
        this.enterRule(localContext, 92, WdlV1_1Parser.RULE_task_command);
        let _la: number;
        try {
            this.state = 657;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 57, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 635;
                this.match(WdlV1_1Parser.COMMAND);
                this.state = 636;
                this.match(WdlV1_1Parser.BeginLBrace);
                this.state = 637;
                this.task_command_string_part();
                this.state = 641;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 77) {
                    {
                    {
                    this.state = 638;
                    this.task_command_expr_with_string();
                    }
                    }
                    this.state = 643;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 644;
                this.match(WdlV1_1Parser.EndCommand);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 646;
                this.match(WdlV1_1Parser.COMMAND);
                this.state = 647;
                this.match(WdlV1_1Parser.BeginHereDoc);
                this.state = 648;
                this.task_command_string_part();
                this.state = 652;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 77) {
                    {
                    {
                    this.state = 649;
                    this.task_command_expr_with_string();
                    }
                    }
                    this.state = 654;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 655;
                this.match(WdlV1_1Parser.EndCommand);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public task_element(): Task_elementContext {
        let localContext = new Task_elementContext(this.context, this.state);
        this.enterRule(localContext, 94, WdlV1_1Parser.RULE_task_element);
        try {
            this.state = 666;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case WdlV1_1Parser.INPUT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 659;
                this.task_input();
                }
                break;
            case WdlV1_1Parser.OUTPUT:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 660;
                this.task_output();
                }
                break;
            case WdlV1_1Parser.COMMAND:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 661;
                this.task_command();
                }
                break;
            case WdlV1_1Parser.RUNTIME:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 662;
                this.task_runtime();
                }
                break;
            case WdlV1_1Parser.BOOLEAN:
            case WdlV1_1Parser.INT:
            case WdlV1_1Parser.FLOAT:
            case WdlV1_1Parser.STRING:
            case WdlV1_1Parser.FILE:
            case WdlV1_1Parser.ARRAY:
            case WdlV1_1Parser.MAP:
            case WdlV1_1Parser.OBJECT:
            case WdlV1_1Parser.PAIR:
            case WdlV1_1Parser.Identifier:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 663;
                this.bound_decls();
                }
                break;
            case WdlV1_1Parser.PARAMETERMETA:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 664;
                this.parameter_meta();
                }
                break;
            case WdlV1_1Parser.META:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 665;
                this.meta();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public task(): TaskContext {
        let localContext = new TaskContext(this.context, this.state);
        this.enterRule(localContext, 96, WdlV1_1Parser.RULE_task);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 668;
            this.match(WdlV1_1Parser.TASK);
            this.state = 669;
            this.match(WdlV1_1Parser.Identifier);
            this.state = 670;
            this.match(WdlV1_1Parser.LBRACE);
            this.state = 672;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 671;
                this.task_element();
                }
                }
                this.state = 674;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 15)) & ~0x1F) === 0 && ((1 << (_la - 15)) & 335871) !== 0) || _la === 70);
            this.state = 676;
            this.match(WdlV1_1Parser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public inner_workflow_element(): Inner_workflow_elementContext {
        let localContext = new Inner_workflow_elementContext(this.context, this.state);
        this.enterRule(localContext, 98, WdlV1_1Parser.RULE_inner_workflow_element);
        try {
            this.state = 682;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case WdlV1_1Parser.BOOLEAN:
            case WdlV1_1Parser.INT:
            case WdlV1_1Parser.FLOAT:
            case WdlV1_1Parser.STRING:
            case WdlV1_1Parser.FILE:
            case WdlV1_1Parser.ARRAY:
            case WdlV1_1Parser.MAP:
            case WdlV1_1Parser.OBJECT:
            case WdlV1_1Parser.PAIR:
            case WdlV1_1Parser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 678;
                this.bound_decls();
                }
                break;
            case WdlV1_1Parser.CALL:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 679;
                this.call();
                }
                break;
            case WdlV1_1Parser.SCATTER:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 680;
                this.scatter();
                }
                break;
            case WdlV1_1Parser.IF:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 681;
                this.conditional();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public call_alias(): Call_aliasContext {
        let localContext = new Call_aliasContext(this.context, this.state);
        this.enterRule(localContext, 100, WdlV1_1Parser.RULE_call_alias);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 684;
            this.match(WdlV1_1Parser.AS);
            this.state = 685;
            this.match(WdlV1_1Parser.Identifier);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public call_input(): Call_inputContext {
        let localContext = new Call_inputContext(this.context, this.state);
        this.enterRule(localContext, 102, WdlV1_1Parser.RULE_call_input);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 687;
            this.match(WdlV1_1Parser.Identifier);
            this.state = 690;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 52) {
                {
                this.state = 688;
                this.match(WdlV1_1Parser.EQUAL);
                this.state = 689;
                this.expr();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public call_inputs(): Call_inputsContext {
        let localContext = new Call_inputsContext(this.context, this.state);
        this.enterRule(localContext, 104, WdlV1_1Parser.RULE_call_inputs);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 692;
            this.match(WdlV1_1Parser.INPUT);
            this.state = 693;
            this.match(WdlV1_1Parser.COLON);
            this.state = 707;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 70) {
                {
                {
                this.state = 694;
                this.call_input();
                this.state = 699;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 62, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 695;
                        this.match(WdlV1_1Parser.COMMA);
                        this.state = 696;
                        this.call_input();
                        }
                        }
                    }
                    this.state = 701;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 62, this.context);
                }
                this.state = 703;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 60) {
                    {
                    this.state = 702;
                    this.match(WdlV1_1Parser.COMMA);
                    }
                }

                }
                }
                this.state = 709;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public call_body(): Call_bodyContext {
        let localContext = new Call_bodyContext(this.context, this.state);
        this.enterRule(localContext, 106, WdlV1_1Parser.RULE_call_body);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 710;
            this.match(WdlV1_1Parser.LBRACE);
            this.state = 712;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 15) {
                {
                this.state = 711;
                this.call_inputs();
                }
            }

            this.state = 714;
            this.match(WdlV1_1Parser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public call_after(): Call_afterContext {
        let localContext = new Call_afterContext(this.context, this.state);
        this.enterRule(localContext, 108, WdlV1_1Parser.RULE_call_after);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 716;
            this.match(WdlV1_1Parser.AFTER);
            this.state = 717;
            this.match(WdlV1_1Parser.Identifier);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public call_name(): Call_nameContext {
        let localContext = new Call_nameContext(this.context, this.state);
        this.enterRule(localContext, 110, WdlV1_1Parser.RULE_call_name);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 719;
            this.match(WdlV1_1Parser.Identifier);
            this.state = 724;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 62) {
                {
                {
                this.state = 720;
                this.match(WdlV1_1Parser.DOT);
                this.state = 721;
                this.match(WdlV1_1Parser.Identifier);
                }
                }
                this.state = 726;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public call(): CallContext {
        let localContext = new CallContext(this.context, this.state);
        this.enterRule(localContext, 112, WdlV1_1Parser.RULE_call);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 727;
            this.match(WdlV1_1Parser.CALL);
            this.state = 728;
            this.call_name();
            this.state = 730;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 13) {
                {
                this.state = 729;
                this.call_alias();
                }
            }

            this.state = 735;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 32) {
                {
                {
                this.state = 732;
                this.call_after();
                }
                }
                this.state = 737;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 739;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40) {
                {
                this.state = 738;
                this.call_body();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public scatter(): ScatterContext {
        let localContext = new ScatterContext(this.context, this.state);
        this.enterRule(localContext, 114, WdlV1_1Parser.RULE_scatter);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 741;
            this.match(WdlV1_1Parser.SCATTER);
            this.state = 742;
            this.match(WdlV1_1Parser.LPAREN);
            this.state = 743;
            this.match(WdlV1_1Parser.Identifier);
            this.state = 744;
            this.match(WdlV1_1Parser.In);
            this.state = 745;
            this.expr();
            this.state = 746;
            this.match(WdlV1_1Parser.RPAREN);
            this.state = 747;
            this.match(WdlV1_1Parser.LBRACE);
            this.state = 751;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2414871424) !== 0) || _la === 70) {
                {
                {
                this.state = 748;
                this.inner_workflow_element();
                }
                }
                this.state = 753;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 754;
            this.match(WdlV1_1Parser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public conditional(): ConditionalContext {
        let localContext = new ConditionalContext(this.context, this.state);
        this.enterRule(localContext, 116, WdlV1_1Parser.RULE_conditional);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 756;
            this.match(WdlV1_1Parser.IF);
            this.state = 757;
            this.match(WdlV1_1Parser.LPAREN);
            this.state = 758;
            this.expr();
            this.state = 759;
            this.match(WdlV1_1Parser.RPAREN);
            this.state = 760;
            this.match(WdlV1_1Parser.LBRACE);
            this.state = 764;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2414871424) !== 0) || _la === 70) {
                {
                {
                this.state = 761;
                this.inner_workflow_element();
                }
                }
                this.state = 766;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 767;
            this.match(WdlV1_1Parser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public workflow_input(): Workflow_inputContext {
        let localContext = new Workflow_inputContext(this.context, this.state);
        this.enterRule(localContext, 118, WdlV1_1Parser.RULE_workflow_input);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 769;
            this.match(WdlV1_1Parser.INPUT);
            this.state = 770;
            this.match(WdlV1_1Parser.LBRACE);
            this.state = 774;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2414870528) !== 0) || _la === 70) {
                {
                {
                this.state = 771;
                this.any_decls();
                }
                }
                this.state = 776;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 777;
            this.match(WdlV1_1Parser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public workflow_output(): Workflow_outputContext {
        let localContext = new Workflow_outputContext(this.context, this.state);
        this.enterRule(localContext, 120, WdlV1_1Parser.RULE_workflow_output);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 779;
            this.match(WdlV1_1Parser.OUTPUT);
            this.state = 780;
            this.match(WdlV1_1Parser.LBRACE);
            this.state = 784;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2414870528) !== 0) || _la === 70) {
                {
                {
                this.state = 781;
                this.bound_decls();
                }
                }
                this.state = 786;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 787;
            this.match(WdlV1_1Parser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public workflow_element(): Workflow_elementContext {
        let localContext = new Workflow_elementContext(this.context, this.state);
        this.enterRule(localContext, 122, WdlV1_1Parser.RULE_workflow_element);
        try {
            this.state = 794;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case WdlV1_1Parser.INPUT:
                localContext = new InputContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 789;
                this.workflow_input();
                }
                break;
            case WdlV1_1Parser.OUTPUT:
                localContext = new OutputContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 790;
                this.workflow_output();
                }
                break;
            case WdlV1_1Parser.SCATTER:
            case WdlV1_1Parser.CALL:
            case WdlV1_1Parser.IF:
            case WdlV1_1Parser.BOOLEAN:
            case WdlV1_1Parser.INT:
            case WdlV1_1Parser.FLOAT:
            case WdlV1_1Parser.STRING:
            case WdlV1_1Parser.FILE:
            case WdlV1_1Parser.ARRAY:
            case WdlV1_1Parser.MAP:
            case WdlV1_1Parser.OBJECT:
            case WdlV1_1Parser.PAIR:
            case WdlV1_1Parser.Identifier:
                localContext = new Inner_elementContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 791;
                this.inner_workflow_element();
                }
                break;
            case WdlV1_1Parser.PARAMETERMETA:
                localContext = new Parameter_meta_elementContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 792;
                this.parameter_meta();
                }
                break;
            case WdlV1_1Parser.META:
                localContext = new Meta_elementContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 793;
                this.meta();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public workflow(): WorkflowContext {
        let localContext = new WorkflowContext(this.context, this.state);
        this.enterRule(localContext, 124, WdlV1_1Parser.RULE_workflow);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 796;
            this.match(WdlV1_1Parser.WORKFLOW);
            this.state = 797;
            this.match(WdlV1_1Parser.Identifier);
            this.state = 798;
            this.match(WdlV1_1Parser.LBRACE);
            this.state = 802;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2415362944) !== 0) || _la === 70) {
                {
                {
                this.state = 799;
                this.workflow_element();
                }
                }
                this.state = 804;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 805;
            this.match(WdlV1_1Parser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public document_element(): Document_elementContext {
        let localContext = new Document_elementContext(this.context, this.state);
        this.enterRule(localContext, 126, WdlV1_1Parser.RULE_document_element);
        try {
            this.state = 810;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case WdlV1_1Parser.IMPORT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 807;
                this.import_doc();
                }
                break;
            case WdlV1_1Parser.STRUCT:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 808;
                this.struct();
                }
                break;
            case WdlV1_1Parser.TASK:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 809;
                this.task();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public document(): DocumentContext {
        let localContext = new DocumentContext(this.context, this.state);
        this.enterRule(localContext, 128, WdlV1_1Parser.RULE_document);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 812;
            this.version();
            this.state = 816;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 104) !== 0)) {
                {
                {
                this.state = 813;
                this.document_element();
                }
                }
                this.state = 818;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 826;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 4) {
                {
                this.state = 819;
                this.workflow();
                this.state = 823;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 104) !== 0)) {
                    {
                    {
                    this.state = 820;
                    this.document_element();
                    }
                    }
                    this.state = 825;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 828;
            this.match(WdlV1_1Parser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public override sempred(localContext: antlr.ParserRuleContext | null, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
        case 17:
            return this.expr_infix0_sempred(localContext as Expr_infix0Context, predIndex);
        case 18:
            return this.expr_infix1_sempred(localContext as Expr_infix1Context, predIndex);
        case 19:
            return this.expr_infix2_sempred(localContext as Expr_infix2Context, predIndex);
        case 20:
            return this.expr_infix3_sempred(localContext as Expr_infix3Context, predIndex);
        case 21:
            return this.expr_infix4_sempred(localContext as Expr_infix4Context, predIndex);
        case 24:
            return this.expr_core_sempred(localContext as Expr_coreContext, predIndex);
        }
        return true;
    }
    private expr_infix0_sempred(localContext: Expr_infix0Context | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 2);
        }
        return true;
    }
    private expr_infix1_sempred(localContext: Expr_infix1Context | null, predIndex: number): boolean {
        switch (predIndex) {
        case 1:
            return this.precpred(this.context, 2);
        }
        return true;
    }
    private expr_infix2_sempred(localContext: Expr_infix2Context | null, predIndex: number): boolean {
        switch (predIndex) {
        case 2:
            return this.precpred(this.context, 7);
        case 3:
            return this.precpred(this.context, 6);
        case 4:
            return this.precpred(this.context, 5);
        case 5:
            return this.precpred(this.context, 4);
        case 6:
            return this.precpred(this.context, 3);
        case 7:
            return this.precpred(this.context, 2);
        }
        return true;
    }
    private expr_infix3_sempred(localContext: Expr_infix3Context | null, predIndex: number): boolean {
        switch (predIndex) {
        case 8:
            return this.precpred(this.context, 3);
        case 9:
            return this.precpred(this.context, 2);
        }
        return true;
    }
    private expr_infix4_sempred(localContext: Expr_infix4Context | null, predIndex: number): boolean {
        switch (predIndex) {
        case 10:
            return this.precpred(this.context, 4);
        case 11:
            return this.precpred(this.context, 3);
        case 12:
            return this.precpred(this.context, 2);
        }
        return true;
    }
    private expr_core_sempred(localContext: Expr_coreContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 13:
            return this.precpred(this.context, 6);
        case 14:
            return this.precpred(this.context, 5);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,113,831,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
        7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,
        13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
        20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,
        26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,
        33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,
        39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,
        46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,
        52,2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,
        59,7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,1,0,1,
        0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,3,1,143,8,1,1,2,1,2,1,
        2,1,2,1,2,1,2,1,2,1,3,1,3,1,3,1,3,3,3,156,8,3,1,4,1,4,1,4,1,4,3,
        4,162,8,4,1,5,1,5,1,5,1,6,1,6,1,6,1,6,1,6,1,7,1,7,3,7,174,8,7,1,
        8,1,8,1,9,1,9,1,9,1,9,1,9,1,9,3,9,184,8,9,1,9,1,9,3,9,188,8,9,1,
        10,5,10,191,8,10,10,10,12,10,194,9,10,1,11,1,11,5,11,198,8,11,10,
        11,12,11,201,9,11,1,11,1,11,1,11,1,12,1,12,1,12,1,13,1,13,1,13,5,
        13,212,8,13,10,13,12,13,215,9,13,1,13,1,13,1,13,1,13,1,13,5,13,222,
        8,13,10,13,12,13,225,9,13,1,13,1,13,3,13,229,8,13,1,14,1,14,1,14,
        1,14,1,14,3,14,236,8,14,1,15,1,15,1,16,1,16,1,17,1,17,1,17,1,17,
        1,17,1,17,5,17,248,8,17,10,17,12,17,251,9,17,1,18,1,18,1,18,1,18,
        1,18,1,18,5,18,259,8,18,10,18,12,18,262,9,18,1,19,1,19,1,19,1,19,
        1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,
        1,19,1,19,1,19,1,19,5,19,285,8,19,10,19,12,19,288,9,19,1,20,1,20,
        1,20,1,20,1,20,1,20,1,20,1,20,1,20,5,20,299,8,20,10,20,12,20,302,
        9,20,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,
        5,21,316,8,21,10,21,12,21,319,9,21,1,22,1,22,1,23,1,23,1,24,1,24,
        1,24,1,24,1,24,1,24,5,24,331,8,24,10,24,12,24,334,9,24,1,24,3,24,
        337,8,24,3,24,339,8,24,1,24,1,24,1,24,1,24,1,24,5,24,346,8,24,10,
        24,12,24,349,9,24,1,24,3,24,352,8,24,5,24,354,8,24,10,24,12,24,357,
        9,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,
        1,24,1,24,1,24,1,24,5,24,375,8,24,10,24,12,24,378,9,24,1,24,3,24,
        381,8,24,5,24,383,8,24,10,24,12,24,386,9,24,1,24,1,24,1,24,1,24,
        1,24,1,24,1,24,1,24,1,24,1,24,1,24,5,24,399,8,24,10,24,12,24,402,
        9,24,1,24,3,24,405,8,24,5,24,407,8,24,10,24,12,24,410,9,24,1,24,
        1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,5,24,423,8,24,
        10,24,12,24,426,9,24,1,24,3,24,429,8,24,5,24,431,8,24,10,24,12,24,
        434,9,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,
        1,24,1,24,1,24,1,24,1,24,1,24,1,24,3,24,454,8,24,1,24,1,24,1,24,
        1,24,1,24,1,24,1,24,1,24,5,24,464,8,24,10,24,12,24,467,9,24,1,25,
        1,25,1,25,1,26,1,26,1,26,1,26,1,26,1,27,1,27,1,27,1,28,1,28,1,28,
        3,28,483,8,28,1,28,5,28,486,8,28,10,28,12,28,489,9,28,1,29,1,29,
        1,29,1,29,5,29,495,8,29,10,29,12,29,498,9,29,1,29,1,29,1,30,1,30,
        1,30,1,30,1,30,1,30,1,30,3,30,509,8,30,1,31,5,31,512,8,31,10,31,
        12,31,515,9,31,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,3,32,525,
        8,32,1,33,1,33,1,33,1,33,1,33,5,33,532,8,33,10,33,12,33,535,9,33,
        1,33,1,33,3,33,539,8,33,1,34,1,34,1,34,1,34,1,34,5,34,546,8,34,10,
        34,12,34,549,9,34,1,34,1,34,3,34,553,8,34,1,35,1,35,1,35,1,35,1,
        36,1,36,1,36,1,36,1,37,1,37,1,37,5,37,566,8,37,10,37,12,37,569,9,
        37,1,37,1,37,1,38,1,38,1,38,5,38,576,8,38,10,38,12,38,579,9,38,1,
        38,1,38,1,39,1,39,1,39,1,39,1,40,1,40,1,40,5,40,590,8,40,10,40,12,
        40,593,9,40,1,40,1,40,1,41,1,41,1,41,5,41,600,8,41,10,41,12,41,603,
        9,41,1,41,1,41,1,42,1,42,1,42,5,42,610,8,42,10,42,12,42,613,9,42,
        1,42,1,42,1,43,5,43,618,8,43,10,43,12,43,621,9,43,1,44,1,44,5,44,
        625,8,44,10,44,12,44,628,9,44,1,44,1,44,1,44,1,45,1,45,1,45,1,46,
        1,46,1,46,1,46,5,46,640,8,46,10,46,12,46,643,9,46,1,46,1,46,1,46,
        1,46,1,46,1,46,5,46,651,8,46,10,46,12,46,654,9,46,1,46,1,46,3,46,
        658,8,46,1,47,1,47,1,47,1,47,1,47,1,47,1,47,3,47,667,8,47,1,48,1,
        48,1,48,1,48,4,48,673,8,48,11,48,12,48,674,1,48,1,48,1,49,1,49,1,
        49,1,49,3,49,683,8,49,1,50,1,50,1,50,1,51,1,51,1,51,3,51,691,8,51,
        1,52,1,52,1,52,1,52,1,52,5,52,698,8,52,10,52,12,52,701,9,52,1,52,
        3,52,704,8,52,5,52,706,8,52,10,52,12,52,709,9,52,1,53,1,53,3,53,
        713,8,53,1,53,1,53,1,54,1,54,1,54,1,55,1,55,1,55,5,55,723,8,55,10,
        55,12,55,726,9,55,1,56,1,56,1,56,3,56,731,8,56,1,56,5,56,734,8,56,
        10,56,12,56,737,9,56,1,56,3,56,740,8,56,1,57,1,57,1,57,1,57,1,57,
        1,57,1,57,1,57,5,57,750,8,57,10,57,12,57,753,9,57,1,57,1,57,1,58,
        1,58,1,58,1,58,1,58,1,58,5,58,763,8,58,10,58,12,58,766,9,58,1,58,
        1,58,1,59,1,59,1,59,5,59,773,8,59,10,59,12,59,776,9,59,1,59,1,59,
        1,60,1,60,1,60,5,60,783,8,60,10,60,12,60,786,9,60,1,60,1,60,1,61,
        1,61,1,61,1,61,1,61,3,61,795,8,61,1,62,1,62,1,62,1,62,5,62,801,8,
        62,10,62,12,62,804,9,62,1,62,1,62,1,63,1,63,1,63,3,63,811,8,63,1,
        64,1,64,5,64,815,8,64,10,64,12,64,818,9,64,1,64,1,64,5,64,822,8,
        64,10,64,12,64,825,9,64,3,64,827,8,64,1,64,1,64,1,64,0,6,34,36,38,
        40,42,48,65,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,
        38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,
        82,84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,118,
        120,122,124,126,128,0,5,3,0,20,24,27,27,70,70,1,0,35,36,1,0,57,58,
        2,0,103,103,105,105,2,0,109,109,111,111,882,0,130,1,0,0,0,2,137,
        1,0,0,0,4,144,1,0,0,0,6,155,1,0,0,0,8,161,1,0,0,0,10,163,1,0,0,0,
        12,166,1,0,0,0,14,173,1,0,0,0,16,175,1,0,0,0,18,187,1,0,0,0,20,192,
        1,0,0,0,22,195,1,0,0,0,24,205,1,0,0,0,26,228,1,0,0,0,28,235,1,0,
        0,0,30,237,1,0,0,0,32,239,1,0,0,0,34,241,1,0,0,0,36,252,1,0,0,0,
        38,263,1,0,0,0,40,289,1,0,0,0,42,303,1,0,0,0,44,320,1,0,0,0,46,322,
        1,0,0,0,48,453,1,0,0,0,50,468,1,0,0,0,52,471,1,0,0,0,54,476,1,0,
        0,0,56,479,1,0,0,0,58,490,1,0,0,0,60,508,1,0,0,0,62,513,1,0,0,0,
        64,524,1,0,0,0,66,538,1,0,0,0,68,552,1,0,0,0,70,554,1,0,0,0,72,558,
        1,0,0,0,74,562,1,0,0,0,76,572,1,0,0,0,78,582,1,0,0,0,80,586,1,0,
        0,0,82,596,1,0,0,0,84,606,1,0,0,0,86,619,1,0,0,0,88,622,1,0,0,0,
        90,632,1,0,0,0,92,657,1,0,0,0,94,666,1,0,0,0,96,668,1,0,0,0,98,682,
        1,0,0,0,100,684,1,0,0,0,102,687,1,0,0,0,104,692,1,0,0,0,106,710,
        1,0,0,0,108,716,1,0,0,0,110,719,1,0,0,0,112,727,1,0,0,0,114,741,
        1,0,0,0,116,756,1,0,0,0,118,769,1,0,0,0,120,779,1,0,0,0,122,794,
        1,0,0,0,124,796,1,0,0,0,126,810,1,0,0,0,128,812,1,0,0,0,130,131,
        5,26,0,0,131,132,5,42,0,0,132,133,3,8,4,0,133,134,5,60,0,0,134,135,
        3,8,4,0,135,136,5,43,0,0,136,1,1,0,0,0,137,138,5,25,0,0,138,139,
        5,42,0,0,139,140,3,8,4,0,140,142,5,43,0,0,141,143,5,57,0,0,142,141,
        1,0,0,0,142,143,1,0,0,0,143,3,1,0,0,0,144,145,5,31,0,0,145,146,5,
        42,0,0,146,147,3,8,4,0,147,148,5,60,0,0,148,149,3,8,4,0,149,150,
        5,43,0,0,150,5,1,0,0,0,151,156,3,2,1,0,152,156,3,0,0,0,153,156,3,
        4,2,0,154,156,7,0,0,0,155,151,1,0,0,0,155,152,1,0,0,0,155,153,1,
        0,0,0,155,154,1,0,0,0,156,7,1,0,0,0,157,158,3,6,3,0,158,159,5,55,
        0,0,159,162,1,0,0,0,160,162,3,6,3,0,161,157,1,0,0,0,161,160,1,0,
        0,0,162,9,1,0,0,0,163,164,3,8,4,0,164,165,5,70,0,0,165,11,1,0,0,
        0,166,167,3,8,4,0,167,168,5,70,0,0,168,169,5,52,0,0,169,170,3,30,
        15,0,170,13,1,0,0,0,171,174,3,10,5,0,172,174,3,12,6,0,173,171,1,
        0,0,0,173,172,1,0,0,0,174,15,1,0,0,0,175,176,7,1,0,0,176,17,1,0,
        0,0,177,178,5,37,0,0,178,179,5,52,0,0,179,188,3,26,13,0,180,183,
        5,30,0,0,181,184,3,26,13,0,182,184,3,16,8,0,183,181,1,0,0,0,183,
        182,1,0,0,0,184,188,1,0,0,0,185,186,5,29,0,0,186,188,3,26,13,0,187,
        177,1,0,0,0,187,180,1,0,0,0,187,185,1,0,0,0,188,19,1,0,0,0,189,191,
        5,71,0,0,190,189,1,0,0,0,191,194,1,0,0,0,192,190,1,0,0,0,192,193,
        1,0,0,0,193,21,1,0,0,0,194,192,1,0,0,0,195,199,5,77,0,0,196,198,
        3,18,9,0,197,196,1,0,0,0,198,201,1,0,0,0,199,197,1,0,0,0,199,200,
        1,0,0,0,200,202,1,0,0,0,201,199,1,0,0,0,202,203,3,30,15,0,203,204,
        5,41,0,0,204,23,1,0,0,0,205,206,3,22,11,0,206,207,3,20,10,0,207,
        25,1,0,0,0,208,209,5,68,0,0,209,213,3,20,10,0,210,212,3,24,12,0,
        211,210,1,0,0,0,212,215,1,0,0,0,213,211,1,0,0,0,213,214,1,0,0,0,
        214,216,1,0,0,0,215,213,1,0,0,0,216,217,5,68,0,0,217,229,1,0,0,0,
        218,219,5,67,0,0,219,223,3,20,10,0,220,222,3,24,12,0,221,220,1,0,
        0,0,222,225,1,0,0,0,223,221,1,0,0,0,223,224,1,0,0,0,224,226,1,0,
        0,0,225,223,1,0,0,0,226,227,5,67,0,0,227,229,1,0,0,0,228,208,1,0,
        0,0,228,218,1,0,0,0,229,27,1,0,0,0,230,236,5,37,0,0,231,236,3,16,
        8,0,232,236,3,26,13,0,233,236,5,34,0,0,234,236,5,70,0,0,235,230,
        1,0,0,0,235,231,1,0,0,0,235,232,1,0,0,0,235,233,1,0,0,0,235,234,
        1,0,0,0,236,29,1,0,0,0,237,238,3,32,16,0,238,31,1,0,0,0,239,240,
        3,34,17,0,240,33,1,0,0,0,241,242,6,17,-1,0,242,243,3,36,18,0,243,
        249,1,0,0,0,244,245,10,2,0,0,245,246,5,54,0,0,246,248,3,36,18,0,
        247,244,1,0,0,0,248,251,1,0,0,0,249,247,1,0,0,0,249,250,1,0,0,0,
        250,35,1,0,0,0,251,249,1,0,0,0,252,253,6,18,-1,0,253,254,3,38,19,
        0,254,260,1,0,0,0,255,256,10,2,0,0,256,257,5,53,0,0,257,259,3,38,
        19,0,258,255,1,0,0,0,259,262,1,0,0,0,260,258,1,0,0,0,260,261,1,0,
        0,0,261,37,1,0,0,0,262,260,1,0,0,0,263,264,6,19,-1,0,264,265,3,40,
        20,0,265,286,1,0,0,0,266,267,10,7,0,0,267,268,5,50,0,0,268,285,3,
        40,20,0,269,270,10,6,0,0,270,271,5,51,0,0,271,285,3,40,20,0,272,
        273,10,5,0,0,273,274,5,49,0,0,274,285,3,40,20,0,275,276,10,4,0,0,
        276,277,5,48,0,0,277,285,3,40,20,0,278,279,10,3,0,0,279,280,5,46,
        0,0,280,285,3,40,20,0,281,282,10,2,0,0,282,283,5,47,0,0,283,285,
        3,40,20,0,284,266,1,0,0,0,284,269,1,0,0,0,284,272,1,0,0,0,284,275,
        1,0,0,0,284,278,1,0,0,0,284,281,1,0,0,0,285,288,1,0,0,0,286,284,
        1,0,0,0,286,287,1,0,0,0,287,39,1,0,0,0,288,286,1,0,0,0,289,290,6,
        20,-1,0,290,291,3,42,21,0,291,300,1,0,0,0,292,293,10,3,0,0,293,294,
        5,57,0,0,294,299,3,42,21,0,295,296,10,2,0,0,296,297,5,58,0,0,297,
        299,3,42,21,0,298,292,1,0,0,0,298,295,1,0,0,0,299,302,1,0,0,0,300,
        298,1,0,0,0,300,301,1,0,0,0,301,41,1,0,0,0,302,300,1,0,0,0,303,304,
        6,21,-1,0,304,305,3,44,22,0,305,317,1,0,0,0,306,307,10,4,0,0,307,
        308,5,56,0,0,308,316,3,44,22,0,309,310,10,3,0,0,310,311,5,65,0,0,
        311,316,3,44,22,0,312,313,10,2,0,0,313,314,5,66,0,0,314,316,3,44,
        22,0,315,306,1,0,0,0,315,309,1,0,0,0,315,312,1,0,0,0,316,319,1,0,
        0,0,317,315,1,0,0,0,317,318,1,0,0,0,318,43,1,0,0,0,319,317,1,0,0,
        0,320,321,3,48,24,0,321,45,1,0,0,0,322,323,5,70,0,0,323,47,1,0,0,
        0,324,325,6,24,-1,0,325,326,5,70,0,0,326,338,5,38,0,0,327,332,3,
        30,15,0,328,329,5,60,0,0,329,331,3,30,15,0,330,328,1,0,0,0,331,334,
        1,0,0,0,332,330,1,0,0,0,332,333,1,0,0,0,333,336,1,0,0,0,334,332,
        1,0,0,0,335,337,5,60,0,0,336,335,1,0,0,0,336,337,1,0,0,0,337,339,
        1,0,0,0,338,327,1,0,0,0,338,339,1,0,0,0,339,340,1,0,0,0,340,454,
        5,39,0,0,341,355,5,42,0,0,342,347,3,30,15,0,343,344,5,60,0,0,344,
        346,3,30,15,0,345,343,1,0,0,0,346,349,1,0,0,0,347,345,1,0,0,0,347,
        348,1,0,0,0,348,351,1,0,0,0,349,347,1,0,0,0,350,352,5,60,0,0,351,
        350,1,0,0,0,351,352,1,0,0,0,352,354,1,0,0,0,353,342,1,0,0,0,354,
        357,1,0,0,0,355,353,1,0,0,0,355,356,1,0,0,0,356,358,1,0,0,0,357,
        355,1,0,0,0,358,454,5,43,0,0,359,360,5,38,0,0,360,361,3,30,15,0,
        361,362,5,60,0,0,362,363,3,30,15,0,363,364,5,39,0,0,364,454,1,0,
        0,0,365,384,5,40,0,0,366,367,3,30,15,0,367,368,5,45,0,0,368,376,
        3,30,15,0,369,370,5,60,0,0,370,371,3,30,15,0,371,372,5,45,0,0,372,
        373,3,30,15,0,373,375,1,0,0,0,374,369,1,0,0,0,375,378,1,0,0,0,376,
        374,1,0,0,0,376,377,1,0,0,0,377,380,1,0,0,0,378,376,1,0,0,0,379,
        381,5,60,0,0,380,379,1,0,0,0,380,381,1,0,0,0,381,383,1,0,0,0,382,
        366,1,0,0,0,383,386,1,0,0,0,384,382,1,0,0,0,384,385,1,0,0,0,385,
        387,1,0,0,0,386,384,1,0,0,0,387,454,5,41,0,0,388,389,5,28,0,0,389,
        408,5,40,0,0,390,391,3,46,23,0,391,392,5,45,0,0,392,400,3,30,15,
        0,393,394,5,60,0,0,394,395,3,46,23,0,395,396,5,45,0,0,396,397,3,
        30,15,0,397,399,1,0,0,0,398,393,1,0,0,0,399,402,1,0,0,0,400,398,
        1,0,0,0,400,401,1,0,0,0,401,404,1,0,0,0,402,400,1,0,0,0,403,405,
        5,60,0,0,404,403,1,0,0,0,404,405,1,0,0,0,405,407,1,0,0,0,406,390,
        1,0,0,0,407,410,1,0,0,0,408,406,1,0,0,0,408,409,1,0,0,0,409,411,
        1,0,0,0,410,408,1,0,0,0,411,454,5,41,0,0,412,413,5,70,0,0,413,432,
        5,40,0,0,414,415,3,46,23,0,415,416,5,45,0,0,416,424,3,30,15,0,417,
        418,5,60,0,0,418,419,3,46,23,0,419,420,5,45,0,0,420,421,3,30,15,
        0,421,423,1,0,0,0,422,417,1,0,0,0,423,426,1,0,0,0,424,422,1,0,0,
        0,424,425,1,0,0,0,425,428,1,0,0,0,426,424,1,0,0,0,427,429,5,60,0,
        0,428,427,1,0,0,0,428,429,1,0,0,0,429,431,1,0,0,0,430,414,1,0,0,
        0,431,434,1,0,0,0,432,430,1,0,0,0,432,433,1,0,0,0,433,435,1,0,0,
        0,434,432,1,0,0,0,435,454,5,41,0,0,436,437,5,9,0,0,437,438,3,30,
        15,0,438,439,5,10,0,0,439,440,3,30,15,0,440,441,5,11,0,0,441,442,
        3,30,15,0,442,454,1,0,0,0,443,444,5,38,0,0,444,445,3,30,15,0,445,
        446,5,39,0,0,446,454,1,0,0,0,447,448,5,63,0,0,448,454,3,30,15,0,
        449,450,7,2,0,0,450,454,3,30,15,0,451,454,3,28,14,0,452,454,5,70,
        0,0,453,324,1,0,0,0,453,341,1,0,0,0,453,359,1,0,0,0,453,365,1,0,
        0,0,453,388,1,0,0,0,453,412,1,0,0,0,453,436,1,0,0,0,453,443,1,0,
        0,0,453,447,1,0,0,0,453,449,1,0,0,0,453,451,1,0,0,0,453,452,1,0,
        0,0,454,465,1,0,0,0,455,456,10,6,0,0,456,457,5,42,0,0,457,458,3,
        30,15,0,458,459,5,43,0,0,459,464,1,0,0,0,460,461,10,5,0,0,461,462,
        5,62,0,0,462,464,5,70,0,0,463,455,1,0,0,0,463,460,1,0,0,0,464,467,
        1,0,0,0,465,463,1,0,0,0,465,466,1,0,0,0,466,49,1,0,0,0,467,465,1,
        0,0,0,468,469,5,2,0,0,469,470,5,81,0,0,470,51,1,0,0,0,471,472,5,
        12,0,0,472,473,5,70,0,0,473,474,5,13,0,0,474,475,5,70,0,0,475,53,
        1,0,0,0,476,477,5,13,0,0,477,478,5,70,0,0,478,55,1,0,0,0,479,480,
        5,3,0,0,480,482,3,26,13,0,481,483,3,54,27,0,482,481,1,0,0,0,482,
        483,1,0,0,0,483,487,1,0,0,0,484,486,3,52,26,0,485,484,1,0,0,0,486,
        489,1,0,0,0,487,485,1,0,0,0,487,488,1,0,0,0,488,57,1,0,0,0,489,487,
        1,0,0,0,490,491,5,6,0,0,491,492,5,70,0,0,492,496,5,40,0,0,493,495,
        3,10,5,0,494,493,1,0,0,0,495,498,1,0,0,0,496,494,1,0,0,0,496,497,
        1,0,0,0,497,499,1,0,0,0,498,496,1,0,0,0,499,500,5,41,0,0,500,59,
        1,0,0,0,501,509,5,93,0,0,502,509,5,90,0,0,503,509,5,91,0,0,504,509,
        5,92,0,0,505,509,3,64,32,0,506,509,3,68,34,0,507,509,3,66,33,0,508,
        501,1,0,0,0,508,502,1,0,0,0,508,503,1,0,0,0,508,504,1,0,0,0,508,
        505,1,0,0,0,508,506,1,0,0,0,508,507,1,0,0,0,509,61,1,0,0,0,510,512,
        5,101,0,0,511,510,1,0,0,0,512,515,1,0,0,0,513,511,1,0,0,0,513,514,
        1,0,0,0,514,63,1,0,0,0,515,513,1,0,0,0,516,517,5,95,0,0,517,518,
        3,62,31,0,518,519,5,95,0,0,519,525,1,0,0,0,520,521,5,94,0,0,521,
        522,3,62,31,0,522,523,5,94,0,0,523,525,1,0,0,0,524,516,1,0,0,0,524,
        520,1,0,0,0,525,65,1,0,0,0,526,539,5,97,0,0,527,528,5,98,0,0,528,
        533,3,60,30,0,529,530,5,104,0,0,530,532,3,60,30,0,531,529,1,0,0,
        0,532,535,1,0,0,0,533,531,1,0,0,0,533,534,1,0,0,0,534,536,1,0,0,
        0,535,533,1,0,0,0,536,537,7,3,0,0,537,539,1,0,0,0,538,526,1,0,0,
        0,538,527,1,0,0,0,539,67,1,0,0,0,540,553,5,96,0,0,541,542,5,99,0,
        0,542,547,3,70,35,0,543,544,5,110,0,0,544,546,3,70,35,0,545,543,
        1,0,0,0,546,549,1,0,0,0,547,545,1,0,0,0,547,548,1,0,0,0,548,550,
        1,0,0,0,549,547,1,0,0,0,550,551,7,4,0,0,551,553,1,0,0,0,552,540,
        1,0,0,0,552,541,1,0,0,0,553,69,1,0,0,0,554,555,5,107,0,0,555,556,
        5,108,0,0,556,557,3,60,30,0,557,71,1,0,0,0,558,559,5,85,0,0,559,
        560,5,86,0,0,560,561,3,60,30,0,561,73,1,0,0,0,562,563,5,17,0,0,563,
        567,5,82,0,0,564,566,3,72,36,0,565,564,1,0,0,0,566,569,1,0,0,0,567,
        565,1,0,0,0,567,568,1,0,0,0,568,570,1,0,0,0,569,567,1,0,0,0,570,
        571,5,87,0,0,571,75,1,0,0,0,572,573,5,18,0,0,573,577,5,82,0,0,574,
        576,3,72,36,0,575,574,1,0,0,0,576,579,1,0,0,0,577,575,1,0,0,0,577,
        578,1,0,0,0,578,580,1,0,0,0,579,577,1,0,0,0,580,581,5,87,0,0,581,
        77,1,0,0,0,582,583,5,70,0,0,583,584,5,45,0,0,584,585,3,30,15,0,585,
        79,1,0,0,0,586,587,5,19,0,0,587,591,5,40,0,0,588,590,3,78,39,0,589,
        588,1,0,0,0,590,593,1,0,0,0,591,589,1,0,0,0,591,592,1,0,0,0,592,
        594,1,0,0,0,593,591,1,0,0,0,594,595,5,41,0,0,595,81,1,0,0,0,596,
        597,5,15,0,0,597,601,5,40,0,0,598,600,3,14,7,0,599,598,1,0,0,0,600,
        603,1,0,0,0,601,599,1,0,0,0,601,602,1,0,0,0,602,604,1,0,0,0,603,
        601,1,0,0,0,604,605,5,41,0,0,605,83,1,0,0,0,606,607,5,16,0,0,607,
        611,5,40,0,0,608,610,3,12,6,0,609,608,1,0,0,0,610,613,1,0,0,0,611,
        609,1,0,0,0,611,612,1,0,0,0,612,614,1,0,0,0,613,611,1,0,0,0,614,
        615,5,41,0,0,615,85,1,0,0,0,616,618,5,79,0,0,617,616,1,0,0,0,618,
        621,1,0,0,0,619,617,1,0,0,0,619,620,1,0,0,0,620,87,1,0,0,0,621,619,
        1,0,0,0,622,626,5,77,0,0,623,625,3,18,9,0,624,623,1,0,0,0,625,628,
        1,0,0,0,626,624,1,0,0,0,626,627,1,0,0,0,627,629,1,0,0,0,628,626,
        1,0,0,0,629,630,3,30,15,0,630,631,5,41,0,0,631,89,1,0,0,0,632,633,
        3,88,44,0,633,634,3,86,43,0,634,91,1,0,0,0,635,636,5,33,0,0,636,
        637,5,74,0,0,637,641,3,86,43,0,638,640,3,90,45,0,639,638,1,0,0,0,
        640,643,1,0,0,0,641,639,1,0,0,0,641,642,1,0,0,0,642,644,1,0,0,0,
        643,641,1,0,0,0,644,645,5,78,0,0,645,658,1,0,0,0,646,647,5,33,0,
        0,647,648,5,73,0,0,648,652,3,86,43,0,649,651,3,90,45,0,650,649,1,
        0,0,0,651,654,1,0,0,0,652,650,1,0,0,0,652,653,1,0,0,0,653,655,1,
        0,0,0,654,652,1,0,0,0,655,656,5,78,0,0,656,658,1,0,0,0,657,635,1,
        0,0,0,657,646,1,0,0,0,658,93,1,0,0,0,659,667,3,82,41,0,660,667,3,
        84,42,0,661,667,3,92,46,0,662,667,3,80,40,0,663,667,3,12,6,0,664,
        667,3,74,37,0,665,667,3,76,38,0,666,659,1,0,0,0,666,660,1,0,0,0,
        666,661,1,0,0,0,666,662,1,0,0,0,666,663,1,0,0,0,666,664,1,0,0,0,
        666,665,1,0,0,0,667,95,1,0,0,0,668,669,5,5,0,0,669,670,5,70,0,0,
        670,672,5,40,0,0,671,673,3,94,47,0,672,671,1,0,0,0,673,674,1,0,0,
        0,674,672,1,0,0,0,674,675,1,0,0,0,675,676,1,0,0,0,676,677,5,41,0,
        0,677,97,1,0,0,0,678,683,3,12,6,0,679,683,3,112,56,0,680,683,3,114,
        57,0,681,683,3,116,58,0,682,678,1,0,0,0,682,679,1,0,0,0,682,680,
        1,0,0,0,682,681,1,0,0,0,683,99,1,0,0,0,684,685,5,13,0,0,685,686,
        5,70,0,0,686,101,1,0,0,0,687,690,5,70,0,0,688,689,5,52,0,0,689,691,
        3,30,15,0,690,688,1,0,0,0,690,691,1,0,0,0,691,103,1,0,0,0,692,693,
        5,15,0,0,693,707,5,45,0,0,694,699,3,102,51,0,695,696,5,60,0,0,696,
        698,3,102,51,0,697,695,1,0,0,0,698,701,1,0,0,0,699,697,1,0,0,0,699,
        700,1,0,0,0,700,703,1,0,0,0,701,699,1,0,0,0,702,704,5,60,0,0,703,
        702,1,0,0,0,703,704,1,0,0,0,704,706,1,0,0,0,705,694,1,0,0,0,706,
        709,1,0,0,0,707,705,1,0,0,0,707,708,1,0,0,0,708,105,1,0,0,0,709,
        707,1,0,0,0,710,712,5,40,0,0,711,713,3,104,52,0,712,711,1,0,0,0,
        712,713,1,0,0,0,713,714,1,0,0,0,714,715,5,41,0,0,715,107,1,0,0,0,
        716,717,5,32,0,0,717,718,5,70,0,0,718,109,1,0,0,0,719,724,5,70,0,
        0,720,721,5,62,0,0,721,723,5,70,0,0,722,720,1,0,0,0,723,726,1,0,
        0,0,724,722,1,0,0,0,724,725,1,0,0,0,725,111,1,0,0,0,726,724,1,0,
        0,0,727,728,5,8,0,0,728,730,3,110,55,0,729,731,3,100,50,0,730,729,
        1,0,0,0,730,731,1,0,0,0,731,735,1,0,0,0,732,734,3,108,54,0,733,732,
        1,0,0,0,734,737,1,0,0,0,735,733,1,0,0,0,735,736,1,0,0,0,736,739,
        1,0,0,0,737,735,1,0,0,0,738,740,3,106,53,0,739,738,1,0,0,0,739,740,
        1,0,0,0,740,113,1,0,0,0,741,742,5,7,0,0,742,743,5,38,0,0,743,744,
        5,70,0,0,744,745,5,14,0,0,745,746,3,30,15,0,746,747,5,39,0,0,747,
        751,5,40,0,0,748,750,3,98,49,0,749,748,1,0,0,0,750,753,1,0,0,0,751,
        749,1,0,0,0,751,752,1,0,0,0,752,754,1,0,0,0,753,751,1,0,0,0,754,
        755,5,41,0,0,755,115,1,0,0,0,756,757,5,9,0,0,757,758,5,38,0,0,758,
        759,3,30,15,0,759,760,5,39,0,0,760,764,5,40,0,0,761,763,3,98,49,
        0,762,761,1,0,0,0,763,766,1,0,0,0,764,762,1,0,0,0,764,765,1,0,0,
        0,765,767,1,0,0,0,766,764,1,0,0,0,767,768,5,41,0,0,768,117,1,0,0,
        0,769,770,5,15,0,0,770,774,5,40,0,0,771,773,3,14,7,0,772,771,1,0,
        0,0,773,776,1,0,0,0,774,772,1,0,0,0,774,775,1,0,0,0,775,777,1,0,
        0,0,776,774,1,0,0,0,777,778,5,41,0,0,778,119,1,0,0,0,779,780,5,16,
        0,0,780,784,5,40,0,0,781,783,3,12,6,0,782,781,1,0,0,0,783,786,1,
        0,0,0,784,782,1,0,0,0,784,785,1,0,0,0,785,787,1,0,0,0,786,784,1,
        0,0,0,787,788,5,41,0,0,788,121,1,0,0,0,789,795,3,118,59,0,790,795,
        3,120,60,0,791,795,3,98,49,0,792,795,3,74,37,0,793,795,3,76,38,0,
        794,789,1,0,0,0,794,790,1,0,0,0,794,791,1,0,0,0,794,792,1,0,0,0,
        794,793,1,0,0,0,795,123,1,0,0,0,796,797,5,4,0,0,797,798,5,70,0,0,
        798,802,5,40,0,0,799,801,3,122,61,0,800,799,1,0,0,0,801,804,1,0,
        0,0,802,800,1,0,0,0,802,803,1,0,0,0,803,805,1,0,0,0,804,802,1,0,
        0,0,805,806,5,41,0,0,806,125,1,0,0,0,807,811,3,56,28,0,808,811,3,
        58,29,0,809,811,3,96,48,0,810,807,1,0,0,0,810,808,1,0,0,0,810,809,
        1,0,0,0,811,127,1,0,0,0,812,816,3,50,25,0,813,815,3,126,63,0,814,
        813,1,0,0,0,815,818,1,0,0,0,816,814,1,0,0,0,816,817,1,0,0,0,817,
        826,1,0,0,0,818,816,1,0,0,0,819,823,3,124,62,0,820,822,3,126,63,
        0,821,820,1,0,0,0,822,825,1,0,0,0,823,821,1,0,0,0,823,824,1,0,0,
        0,824,827,1,0,0,0,825,823,1,0,0,0,826,819,1,0,0,0,826,827,1,0,0,
        0,827,828,1,0,0,0,828,829,5,0,0,1,829,129,1,0,0,0,80,142,155,161,
        173,183,187,192,199,213,223,228,235,249,260,284,286,298,300,315,
        317,332,336,338,347,351,355,376,380,384,400,404,408,424,428,432,
        453,463,465,482,487,496,508,513,524,533,538,547,552,567,577,591,
        601,611,619,626,641,652,657,666,674,682,690,699,703,707,712,724,
        730,735,739,751,764,774,784,794,802,810,816,823,826
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!WdlV1_1Parser.__ATN) {
            WdlV1_1Parser.__ATN = new antlr.ATNDeserializer().deserialize(WdlV1_1Parser._serializedATN);
        }

        return WdlV1_1Parser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(WdlV1_1Parser.literalNames, WdlV1_1Parser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return WdlV1_1Parser.vocabulary;
    }

    private static readonly decisionsToDFA = WdlV1_1Parser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class Map_typeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public MAP(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.MAP, 0)!;
    }
    public LBRACK(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.LBRACK, 0)!;
    }
    public wdl_type(): Wdl_typeContext[];
    public wdl_type(i: number): Wdl_typeContext | null;
    public wdl_type(i?: number): Wdl_typeContext[] | Wdl_typeContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Wdl_typeContext);
        }

        return this.getRuleContext(i, Wdl_typeContext);
    }
    public COMMA(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.COMMA, 0)!;
    }
    public RBRACK(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RBRACK, 0)!;
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_map_type;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterMap_type) {
             listener.enterMap_type(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitMap_type) {
             listener.exitMap_type(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitMap_type) {
            return visitor.visitMap_type(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Array_typeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ARRAY(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.ARRAY, 0)!;
    }
    public LBRACK(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.LBRACK, 0)!;
    }
    public wdl_type(): Wdl_typeContext {
        return this.getRuleContext(0, Wdl_typeContext)!;
    }
    public RBRACK(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RBRACK, 0)!;
    }
    public PLUS(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.PLUS, 0);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_array_type;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterArray_type) {
             listener.enterArray_type(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitArray_type) {
             listener.exitArray_type(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitArray_type) {
            return visitor.visitArray_type(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Pair_typeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PAIR(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.PAIR, 0)!;
    }
    public LBRACK(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.LBRACK, 0)!;
    }
    public wdl_type(): Wdl_typeContext[];
    public wdl_type(i: number): Wdl_typeContext | null;
    public wdl_type(i?: number): Wdl_typeContext[] | Wdl_typeContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Wdl_typeContext);
        }

        return this.getRuleContext(i, Wdl_typeContext);
    }
    public COMMA(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.COMMA, 0)!;
    }
    public RBRACK(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RBRACK, 0)!;
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_pair_type;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterPair_type) {
             listener.enterPair_type(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitPair_type) {
             listener.exitPair_type(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitPair_type) {
            return visitor.visitPair_type(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Type_baseContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public array_type(): Array_typeContext | null {
        return this.getRuleContext(0, Array_typeContext);
    }
    public map_type(): Map_typeContext | null {
        return this.getRuleContext(0, Map_typeContext);
    }
    public pair_type(): Pair_typeContext | null {
        return this.getRuleContext(0, Pair_typeContext);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.STRING, 0);
    }
    public FILE(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.FILE, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.BOOLEAN, 0);
    }
    public INT(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.INT, 0);
    }
    public FLOAT(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.FLOAT, 0);
    }
    public OBJECT(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.OBJECT, 0);
    }
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.Identifier, 0);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_type_base;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterType_base) {
             listener.enterType_base(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitType_base) {
             listener.exitType_base(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitType_base) {
            return visitor.visitType_base(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Wdl_typeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public type_base(): Type_baseContext | null {
        return this.getRuleContext(0, Type_baseContext);
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_wdl_type;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterWdl_type) {
             listener.enterWdl_type(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitWdl_type) {
             listener.exitWdl_type(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitWdl_type) {
            return visitor.visitWdl_type(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Unbound_declsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public wdl_type(): Wdl_typeContext {
        return this.getRuleContext(0, Wdl_typeContext)!;
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.Identifier, 0)!;
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_unbound_decls;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterUnbound_decls) {
             listener.enterUnbound_decls(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitUnbound_decls) {
             listener.exitUnbound_decls(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitUnbound_decls) {
            return visitor.visitUnbound_decls(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Bound_declsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public wdl_type(): Wdl_typeContext {
        return this.getRuleContext(0, Wdl_typeContext)!;
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.Identifier, 0)!;
    }
    public EQUAL(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.EQUAL, 0)!;
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_bound_decls;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterBound_decls) {
             listener.enterBound_decls(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitBound_decls) {
             listener.exitBound_decls(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitBound_decls) {
            return visitor.visitBound_decls(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Any_declsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unbound_decls(): Unbound_declsContext | null {
        return this.getRuleContext(0, Unbound_declsContext);
    }
    public bound_decls(): Bound_declsContext | null {
        return this.getRuleContext(0, Bound_declsContext);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_any_decls;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterAny_decls) {
             listener.enterAny_decls(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitAny_decls) {
             listener.exitAny_decls(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitAny_decls) {
            return visitor.visitAny_decls(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class NumberContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IntLiteral(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.IntLiteral, 0);
    }
    public FloatLiteral(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.FloatLiteral, 0);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_number;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterNumber) {
             listener.enterNumber(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitNumber) {
             listener.exitNumber(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitNumber) {
            return visitor.visitNumber(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Expression_placeholder_optionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public BoolLiteral(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.BoolLiteral, 0);
    }
    public EQUAL(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.EQUAL, 0);
    }
    public string(): StringContext | null {
        return this.getRuleContext(0, StringContext);
    }
    public DEFAULTEQUAL(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.DEFAULTEQUAL, 0);
    }
    public number(): NumberContext | null {
        return this.getRuleContext(0, NumberContext);
    }
    public SEPEQUAL(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.SEPEQUAL, 0);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_expression_placeholder_option;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterExpression_placeholder_option) {
             listener.enterExpression_placeholder_option(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitExpression_placeholder_option) {
             listener.exitExpression_placeholder_option(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitExpression_placeholder_option) {
            return visitor.visitExpression_placeholder_option(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class String_partContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public StringPart(): antlr.TerminalNode[];
    public StringPart(i: number): antlr.TerminalNode | null;
    public StringPart(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(WdlV1_1Parser.StringPart);
    	} else {
    		return this.getToken(WdlV1_1Parser.StringPart, i);
    	}
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_string_part;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterString_part) {
             listener.enterString_part(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitString_part) {
             listener.exitString_part(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitString_part) {
            return visitor.visitString_part(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class String_expr_partContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public StringCommandStart(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.StringCommandStart, 0)!;
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RBRACE, 0)!;
    }
    public expression_placeholder_option(): Expression_placeholder_optionContext[];
    public expression_placeholder_option(i: number): Expression_placeholder_optionContext | null;
    public expression_placeholder_option(i?: number): Expression_placeholder_optionContext[] | Expression_placeholder_optionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Expression_placeholder_optionContext);
        }

        return this.getRuleContext(i, Expression_placeholder_optionContext);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_string_expr_part;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterString_expr_part) {
             listener.enterString_expr_part(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitString_expr_part) {
             listener.exitString_expr_part(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitString_expr_part) {
            return visitor.visitString_expr_part(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class String_expr_with_string_partContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public string_expr_part(): String_expr_partContext {
        return this.getRuleContext(0, String_expr_partContext)!;
    }
    public string_part(): String_partContext {
        return this.getRuleContext(0, String_partContext)!;
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_string_expr_with_string_part;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterString_expr_with_string_part) {
             listener.enterString_expr_with_string_part(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitString_expr_with_string_part) {
             listener.exitString_expr_with_string_part(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitString_expr_with_string_part) {
            return visitor.visitString_expr_with_string_part(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StringContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DQUOTE(): antlr.TerminalNode[];
    public DQUOTE(i: number): antlr.TerminalNode | null;
    public DQUOTE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(WdlV1_1Parser.DQUOTE);
    	} else {
    		return this.getToken(WdlV1_1Parser.DQUOTE, i);
    	}
    }
    public string_part(): String_partContext {
        return this.getRuleContext(0, String_partContext)!;
    }
    public string_expr_with_string_part(): String_expr_with_string_partContext[];
    public string_expr_with_string_part(i: number): String_expr_with_string_partContext | null;
    public string_expr_with_string_part(i?: number): String_expr_with_string_partContext[] | String_expr_with_string_partContext | null {
        if (i === undefined) {
            return this.getRuleContexts(String_expr_with_string_partContext);
        }

        return this.getRuleContext(i, String_expr_with_string_partContext);
    }
    public SQUOTE(): antlr.TerminalNode[];
    public SQUOTE(i: number): antlr.TerminalNode | null;
    public SQUOTE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(WdlV1_1Parser.SQUOTE);
    	} else {
    		return this.getToken(WdlV1_1Parser.SQUOTE, i);
    	}
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_string;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterString) {
             listener.enterString(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitString) {
             listener.exitString(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitString) {
            return visitor.visitString(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Primitive_literalContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public BoolLiteral(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.BoolLiteral, 0);
    }
    public number(): NumberContext | null {
        return this.getRuleContext(0, NumberContext);
    }
    public string(): StringContext | null {
        return this.getRuleContext(0, StringContext);
    }
    public NONELITERAL(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.NONELITERAL, 0);
    }
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.Identifier, 0);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_primitive_literal;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterPrimitive_literal) {
             listener.enterPrimitive_literal(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitPrimitive_literal) {
             listener.exitPrimitive_literal(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitPrimitive_literal) {
            return visitor.visitPrimitive_literal(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr_infix(): Expr_infixContext {
        return this.getRuleContext(0, Expr_infixContext)!;
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_expr;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterExpr) {
             listener.enterExpr(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitExpr) {
             listener.exitExpr(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitExpr) {
            return visitor.visitExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Expr_infixContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_expr_infix;
    }
    public override copyFrom(ctx: Expr_infixContext): void {
        super.copyFrom(ctx);
    }
}
export class Infix0Context extends Expr_infixContext {
    public constructor(ctx: Expr_infixContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr_infix0(): Expr_infix0Context {
        return this.getRuleContext(0, Expr_infix0Context)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterInfix0) {
             listener.enterInfix0(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitInfix0) {
             listener.exitInfix0(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitInfix0) {
            return visitor.visitInfix0(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Expr_infix0Context extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_expr_infix0;
    }
    public override copyFrom(ctx: Expr_infix0Context): void {
        super.copyFrom(ctx);
    }
}
export class Infix1Context extends Expr_infix0Context {
    public constructor(ctx: Expr_infix0Context) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr_infix1(): Expr_infix1Context {
        return this.getRuleContext(0, Expr_infix1Context)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterInfix1) {
             listener.enterInfix1(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitInfix1) {
             listener.exitInfix1(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitInfix1) {
            return visitor.visitInfix1(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class LorContext extends Expr_infix0Context {
    public constructor(ctx: Expr_infix0Context) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr_infix0(): Expr_infix0Context {
        return this.getRuleContext(0, Expr_infix0Context)!;
    }
    public OR(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.OR, 0)!;
    }
    public expr_infix1(): Expr_infix1Context {
        return this.getRuleContext(0, Expr_infix1Context)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterLor) {
             listener.enterLor(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitLor) {
             listener.exitLor(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitLor) {
            return visitor.visitLor(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Expr_infix1Context extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_expr_infix1;
    }
    public override copyFrom(ctx: Expr_infix1Context): void {
        super.copyFrom(ctx);
    }
}
export class Infix2Context extends Expr_infix1Context {
    public constructor(ctx: Expr_infix1Context) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr_infix2(): Expr_infix2Context {
        return this.getRuleContext(0, Expr_infix2Context)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterInfix2) {
             listener.enterInfix2(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitInfix2) {
             listener.exitInfix2(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitInfix2) {
            return visitor.visitInfix2(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class LandContext extends Expr_infix1Context {
    public constructor(ctx: Expr_infix1Context) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr_infix1(): Expr_infix1Context {
        return this.getRuleContext(0, Expr_infix1Context)!;
    }
    public AND(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.AND, 0)!;
    }
    public expr_infix2(): Expr_infix2Context {
        return this.getRuleContext(0, Expr_infix2Context)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterLand) {
             listener.enterLand(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitLand) {
             listener.exitLand(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitLand) {
            return visitor.visitLand(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Expr_infix2Context extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_expr_infix2;
    }
    public override copyFrom(ctx: Expr_infix2Context): void {
        super.copyFrom(ctx);
    }
}
export class EqeqContext extends Expr_infix2Context {
    public constructor(ctx: Expr_infix2Context) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr_infix2(): Expr_infix2Context {
        return this.getRuleContext(0, Expr_infix2Context)!;
    }
    public EQUALITY(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.EQUALITY, 0)!;
    }
    public expr_infix3(): Expr_infix3Context {
        return this.getRuleContext(0, Expr_infix3Context)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterEqeq) {
             listener.enterEqeq(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitEqeq) {
             listener.exitEqeq(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitEqeq) {
            return visitor.visitEqeq(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class LtContext extends Expr_infix2Context {
    public constructor(ctx: Expr_infix2Context) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr_infix2(): Expr_infix2Context {
        return this.getRuleContext(0, Expr_infix2Context)!;
    }
    public LT(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.LT, 0)!;
    }
    public expr_infix3(): Expr_infix3Context {
        return this.getRuleContext(0, Expr_infix3Context)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterLt) {
             listener.enterLt(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitLt) {
             listener.exitLt(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitLt) {
            return visitor.visitLt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class Infix3Context extends Expr_infix2Context {
    public constructor(ctx: Expr_infix2Context) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr_infix3(): Expr_infix3Context {
        return this.getRuleContext(0, Expr_infix3Context)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterInfix3) {
             listener.enterInfix3(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitInfix3) {
             listener.exitInfix3(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitInfix3) {
            return visitor.visitInfix3(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class GteContext extends Expr_infix2Context {
    public constructor(ctx: Expr_infix2Context) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr_infix2(): Expr_infix2Context {
        return this.getRuleContext(0, Expr_infix2Context)!;
    }
    public GTE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.GTE, 0)!;
    }
    public expr_infix3(): Expr_infix3Context {
        return this.getRuleContext(0, Expr_infix3Context)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterGte) {
             listener.enterGte(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitGte) {
             listener.exitGte(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitGte) {
            return visitor.visitGte(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class NeqContext extends Expr_infix2Context {
    public constructor(ctx: Expr_infix2Context) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr_infix2(): Expr_infix2Context {
        return this.getRuleContext(0, Expr_infix2Context)!;
    }
    public NOTEQUAL(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.NOTEQUAL, 0)!;
    }
    public expr_infix3(): Expr_infix3Context {
        return this.getRuleContext(0, Expr_infix3Context)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterNeq) {
             listener.enterNeq(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitNeq) {
             listener.exitNeq(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitNeq) {
            return visitor.visitNeq(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class LteContext extends Expr_infix2Context {
    public constructor(ctx: Expr_infix2Context) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr_infix2(): Expr_infix2Context {
        return this.getRuleContext(0, Expr_infix2Context)!;
    }
    public LTE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.LTE, 0)!;
    }
    public expr_infix3(): Expr_infix3Context {
        return this.getRuleContext(0, Expr_infix3Context)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterLte) {
             listener.enterLte(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitLte) {
             listener.exitLte(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitLte) {
            return visitor.visitLte(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class GtContext extends Expr_infix2Context {
    public constructor(ctx: Expr_infix2Context) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr_infix2(): Expr_infix2Context {
        return this.getRuleContext(0, Expr_infix2Context)!;
    }
    public GT(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.GT, 0)!;
    }
    public expr_infix3(): Expr_infix3Context {
        return this.getRuleContext(0, Expr_infix3Context)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterGt) {
             listener.enterGt(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitGt) {
             listener.exitGt(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitGt) {
            return visitor.visitGt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Expr_infix3Context extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_expr_infix3;
    }
    public override copyFrom(ctx: Expr_infix3Context): void {
        super.copyFrom(ctx);
    }
}
export class AddContext extends Expr_infix3Context {
    public constructor(ctx: Expr_infix3Context) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr_infix3(): Expr_infix3Context {
        return this.getRuleContext(0, Expr_infix3Context)!;
    }
    public PLUS(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.PLUS, 0)!;
    }
    public expr_infix4(): Expr_infix4Context {
        return this.getRuleContext(0, Expr_infix4Context)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterAdd) {
             listener.enterAdd(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitAdd) {
             listener.exitAdd(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitAdd) {
            return visitor.visitAdd(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class SubContext extends Expr_infix3Context {
    public constructor(ctx: Expr_infix3Context) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr_infix3(): Expr_infix3Context {
        return this.getRuleContext(0, Expr_infix3Context)!;
    }
    public MINUS(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.MINUS, 0)!;
    }
    public expr_infix4(): Expr_infix4Context {
        return this.getRuleContext(0, Expr_infix4Context)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterSub) {
             listener.enterSub(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitSub) {
             listener.exitSub(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitSub) {
            return visitor.visitSub(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class Infix4Context extends Expr_infix3Context {
    public constructor(ctx: Expr_infix3Context) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr_infix4(): Expr_infix4Context {
        return this.getRuleContext(0, Expr_infix4Context)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterInfix4) {
             listener.enterInfix4(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitInfix4) {
             listener.exitInfix4(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitInfix4) {
            return visitor.visitInfix4(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Expr_infix4Context extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_expr_infix4;
    }
    public override copyFrom(ctx: Expr_infix4Context): void {
        super.copyFrom(ctx);
    }
}
export class ModContext extends Expr_infix4Context {
    public constructor(ctx: Expr_infix4Context) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr_infix4(): Expr_infix4Context {
        return this.getRuleContext(0, Expr_infix4Context)!;
    }
    public MOD(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.MOD, 0)!;
    }
    public expr_infix5(): Expr_infix5Context {
        return this.getRuleContext(0, Expr_infix5Context)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterMod) {
             listener.enterMod(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitMod) {
             listener.exitMod(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitMod) {
            return visitor.visitMod(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class MulContext extends Expr_infix4Context {
    public constructor(ctx: Expr_infix4Context) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr_infix4(): Expr_infix4Context {
        return this.getRuleContext(0, Expr_infix4Context)!;
    }
    public STAR(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.STAR, 0)!;
    }
    public expr_infix5(): Expr_infix5Context {
        return this.getRuleContext(0, Expr_infix5Context)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterMul) {
             listener.enterMul(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitMul) {
             listener.exitMul(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitMul) {
            return visitor.visitMul(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DivideContext extends Expr_infix4Context {
    public constructor(ctx: Expr_infix4Context) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr_infix4(): Expr_infix4Context {
        return this.getRuleContext(0, Expr_infix4Context)!;
    }
    public DIVIDE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.DIVIDE, 0)!;
    }
    public expr_infix5(): Expr_infix5Context {
        return this.getRuleContext(0, Expr_infix5Context)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterDivide) {
             listener.enterDivide(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitDivide) {
             listener.exitDivide(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitDivide) {
            return visitor.visitDivide(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class Infix5Context extends Expr_infix4Context {
    public constructor(ctx: Expr_infix4Context) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr_infix5(): Expr_infix5Context {
        return this.getRuleContext(0, Expr_infix5Context)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterInfix5) {
             listener.enterInfix5(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitInfix5) {
             listener.exitInfix5(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitInfix5) {
            return visitor.visitInfix5(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Expr_infix5Context extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr_core(): Expr_coreContext {
        return this.getRuleContext(0, Expr_coreContext)!;
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_expr_infix5;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterExpr_infix5) {
             listener.enterExpr_infix5(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitExpr_infix5) {
             listener.exitExpr_infix5(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitExpr_infix5) {
            return visitor.visitExpr_infix5(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class MemberContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.Identifier, 0)!;
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_member;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterMember) {
             listener.enterMember(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitMember) {
             listener.exitMember(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitMember) {
            return visitor.visitMember(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Expr_coreContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_expr_core;
    }
    public override copyFrom(ctx: Expr_coreContext): void {
        super.copyFrom(ctx);
    }
}
export class Pair_literalContext extends Expr_coreContext {
    public constructor(ctx: Expr_coreContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.LPAREN, 0)!;
    }
    public expr(): ExprContext[];
    public expr(i: number): ExprContext | null;
    public expr(i?: number): ExprContext[] | ExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        }

        return this.getRuleContext(i, ExprContext);
    }
    public COMMA(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.COMMA, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RPAREN, 0)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterPair_literal) {
             listener.enterPair_literal(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitPair_literal) {
             listener.exitPair_literal(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitPair_literal) {
            return visitor.visitPair_literal(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class UnarysignedContext extends Expr_coreContext {
    public constructor(ctx: Expr_coreContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public PLUS(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.PLUS, 0);
    }
    public MINUS(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.MINUS, 0);
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterUnarysigned) {
             listener.enterUnarysigned(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitUnarysigned) {
             listener.exitUnarysigned(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitUnarysigned) {
            return visitor.visitUnarysigned(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ApplyContext extends Expr_coreContext {
    public constructor(ctx: Expr_coreContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.Identifier, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RPAREN, 0)!;
    }
    public expr(): ExprContext[];
    public expr(i: number): ExprContext | null;
    public expr(i?: number): ExprContext[] | ExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        }

        return this.getRuleContext(i, ExprContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(WdlV1_1Parser.COMMA);
    	} else {
    		return this.getToken(WdlV1_1Parser.COMMA, i);
    	}
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterApply) {
             listener.enterApply(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitApply) {
             listener.exitApply(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitApply) {
            return visitor.visitApply(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class Expression_groupContext extends Expr_coreContext {
    public constructor(ctx: Expr_coreContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.LPAREN, 0)!;
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RPAREN, 0)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterExpression_group) {
             listener.enterExpression_group(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitExpression_group) {
             listener.exitExpression_group(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitExpression_group) {
            return visitor.visitExpression_group(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class PrimitivesContext extends Expr_coreContext {
    public constructor(ctx: Expr_coreContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public primitive_literal(): Primitive_literalContext {
        return this.getRuleContext(0, Primitive_literalContext)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterPrimitives) {
             listener.enterPrimitives(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitPrimitives) {
             listener.exitPrimitives(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitPrimitives) {
            return visitor.visitPrimitives(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class Left_nameContext extends Expr_coreContext {
    public constructor(ctx: Expr_coreContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.Identifier, 0)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterLeft_name) {
             listener.enterLeft_name(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitLeft_name) {
             listener.exitLeft_name(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitLeft_name) {
            return visitor.visitLeft_name(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class AtContext extends Expr_coreContext {
    public constructor(ctx: Expr_coreContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr_core(): Expr_coreContext {
        return this.getRuleContext(0, Expr_coreContext)!;
    }
    public LBRACK(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.LBRACK, 0)!;
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public RBRACK(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RBRACK, 0)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterAt) {
             listener.enterAt(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitAt) {
             listener.exitAt(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitAt) {
            return visitor.visitAt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class NegateContext extends Expr_coreContext {
    public constructor(ctx: Expr_coreContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public NOT(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.NOT, 0)!;
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterNegate) {
             listener.enterNegate(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitNegate) {
             listener.exitNegate(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitNegate) {
            return visitor.visitNegate(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class Map_literalContext extends Expr_coreContext {
    public constructor(ctx: Expr_coreContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RBRACE, 0)!;
    }
    public expr(): ExprContext[];
    public expr(i: number): ExprContext | null;
    public expr(i?: number): ExprContext[] | ExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        }

        return this.getRuleContext(i, ExprContext);
    }
    public COLON(): antlr.TerminalNode[];
    public COLON(i: number): antlr.TerminalNode | null;
    public COLON(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(WdlV1_1Parser.COLON);
    	} else {
    		return this.getToken(WdlV1_1Parser.COLON, i);
    	}
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(WdlV1_1Parser.COMMA);
    	} else {
    		return this.getToken(WdlV1_1Parser.COMMA, i);
    	}
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterMap_literal) {
             listener.enterMap_literal(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitMap_literal) {
             listener.exitMap_literal(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitMap_literal) {
            return visitor.visitMap_literal(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class IfthenelseContext extends Expr_coreContext {
    public constructor(ctx: Expr_coreContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.IF, 0)!;
    }
    public expr(): ExprContext[];
    public expr(i: number): ExprContext | null;
    public expr(i?: number): ExprContext[] | ExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        }

        return this.getRuleContext(i, ExprContext);
    }
    public THEN(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.THEN, 0)!;
    }
    public ELSE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.ELSE, 0)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterIfthenelse) {
             listener.enterIfthenelse(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitIfthenelse) {
             listener.exitIfthenelse(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitIfthenelse) {
            return visitor.visitIfthenelse(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class Get_nameContext extends Expr_coreContext {
    public constructor(ctx: Expr_coreContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr_core(): Expr_coreContext {
        return this.getRuleContext(0, Expr_coreContext)!;
    }
    public DOT(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.DOT, 0)!;
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.Identifier, 0)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterGet_name) {
             listener.enterGet_name(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitGet_name) {
             listener.exitGet_name(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitGet_name) {
            return visitor.visitGet_name(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class Object_literalContext extends Expr_coreContext {
    public constructor(ctx: Expr_coreContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public OBJECTLITERAL(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.OBJECTLITERAL, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RBRACE, 0)!;
    }
    public member(): MemberContext[];
    public member(i: number): MemberContext | null;
    public member(i?: number): MemberContext[] | MemberContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MemberContext);
        }

        return this.getRuleContext(i, MemberContext);
    }
    public COLON(): antlr.TerminalNode[];
    public COLON(i: number): antlr.TerminalNode | null;
    public COLON(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(WdlV1_1Parser.COLON);
    	} else {
    		return this.getToken(WdlV1_1Parser.COLON, i);
    	}
    }
    public expr(): ExprContext[];
    public expr(i: number): ExprContext | null;
    public expr(i?: number): ExprContext[] | ExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        }

        return this.getRuleContext(i, ExprContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(WdlV1_1Parser.COMMA);
    	} else {
    		return this.getToken(WdlV1_1Parser.COMMA, i);
    	}
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterObject_literal) {
             listener.enterObject_literal(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitObject_literal) {
             listener.exitObject_literal(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitObject_literal) {
            return visitor.visitObject_literal(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class Array_literalContext extends Expr_coreContext {
    public constructor(ctx: Expr_coreContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public LBRACK(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.LBRACK, 0)!;
    }
    public RBRACK(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RBRACK, 0)!;
    }
    public expr(): ExprContext[];
    public expr(i: number): ExprContext | null;
    public expr(i?: number): ExprContext[] | ExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        }

        return this.getRuleContext(i, ExprContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(WdlV1_1Parser.COMMA);
    	} else {
    		return this.getToken(WdlV1_1Parser.COMMA, i);
    	}
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterArray_literal) {
             listener.enterArray_literal(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitArray_literal) {
             listener.exitArray_literal(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitArray_literal) {
            return visitor.visitArray_literal(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class Struct_literalContext extends Expr_coreContext {
    public constructor(ctx: Expr_coreContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.Identifier, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RBRACE, 0)!;
    }
    public member(): MemberContext[];
    public member(i: number): MemberContext | null;
    public member(i?: number): MemberContext[] | MemberContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MemberContext);
        }

        return this.getRuleContext(i, MemberContext);
    }
    public COLON(): antlr.TerminalNode[];
    public COLON(i: number): antlr.TerminalNode | null;
    public COLON(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(WdlV1_1Parser.COLON);
    	} else {
    		return this.getToken(WdlV1_1Parser.COLON, i);
    	}
    }
    public expr(): ExprContext[];
    public expr(i: number): ExprContext | null;
    public expr(i?: number): ExprContext[] | ExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        }

        return this.getRuleContext(i, ExprContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(WdlV1_1Parser.COMMA);
    	} else {
    		return this.getToken(WdlV1_1Parser.COMMA, i);
    	}
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterStruct_literal) {
             listener.enterStruct_literal(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitStruct_literal) {
             listener.exitStruct_literal(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitStruct_literal) {
            return visitor.visitStruct_literal(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class VersionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public VERSION(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.VERSION, 0)!;
    }
    public ReleaseVersion(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.ReleaseVersion, 0)!;
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_version;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterVersion) {
             listener.enterVersion(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitVersion) {
             listener.exitVersion(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitVersion) {
            return visitor.visitVersion(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Import_aliasContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ALIAS(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.ALIAS, 0)!;
    }
    public Identifier(): antlr.TerminalNode[];
    public Identifier(i: number): antlr.TerminalNode | null;
    public Identifier(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(WdlV1_1Parser.Identifier);
    	} else {
    		return this.getToken(WdlV1_1Parser.Identifier, i);
    	}
    }
    public AS(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.AS, 0)!;
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_import_alias;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterImport_alias) {
             listener.enterImport_alias(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitImport_alias) {
             listener.exitImport_alias(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitImport_alias) {
            return visitor.visitImport_alias(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Import_asContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public AS(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.AS, 0)!;
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.Identifier, 0)!;
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_import_as;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterImport_as) {
             listener.enterImport_as(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitImport_as) {
             listener.exitImport_as(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitImport_as) {
            return visitor.visitImport_as(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Import_docContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IMPORT(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.IMPORT, 0)!;
    }
    public string(): StringContext {
        return this.getRuleContext(0, StringContext)!;
    }
    public import_as(): Import_asContext | null {
        return this.getRuleContext(0, Import_asContext);
    }
    public import_alias(): Import_aliasContext[];
    public import_alias(i: number): Import_aliasContext | null;
    public import_alias(i?: number): Import_aliasContext[] | Import_aliasContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Import_aliasContext);
        }

        return this.getRuleContext(i, Import_aliasContext);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_import_doc;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterImport_doc) {
             listener.enterImport_doc(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitImport_doc) {
             listener.exitImport_doc(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitImport_doc) {
            return visitor.visitImport_doc(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StructContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public STRUCT(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.STRUCT, 0)!;
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.Identifier, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RBRACE, 0)!;
    }
    public unbound_decls(): Unbound_declsContext[];
    public unbound_decls(i: number): Unbound_declsContext | null;
    public unbound_decls(i?: number): Unbound_declsContext[] | Unbound_declsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Unbound_declsContext);
        }

        return this.getRuleContext(i, Unbound_declsContext);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_struct;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterStruct) {
             listener.enterStruct(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitStruct) {
             listener.exitStruct(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitStruct) {
            return visitor.visitStruct(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Meta_valueContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public MetaNull(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.MetaNull, 0);
    }
    public MetaBool(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.MetaBool, 0);
    }
    public MetaInt(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.MetaInt, 0);
    }
    public MetaFloat(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.MetaFloat, 0);
    }
    public meta_string(): Meta_stringContext | null {
        return this.getRuleContext(0, Meta_stringContext);
    }
    public meta_object(): Meta_objectContext | null {
        return this.getRuleContext(0, Meta_objectContext);
    }
    public meta_array(): Meta_arrayContext | null {
        return this.getRuleContext(0, Meta_arrayContext);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_meta_value;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterMeta_value) {
             listener.enterMeta_value(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitMeta_value) {
             listener.exitMeta_value(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitMeta_value) {
            return visitor.visitMeta_value(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Meta_string_partContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public MetaStringPart(): antlr.TerminalNode[];
    public MetaStringPart(i: number): antlr.TerminalNode | null;
    public MetaStringPart(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(WdlV1_1Parser.MetaStringPart);
    	} else {
    		return this.getToken(WdlV1_1Parser.MetaStringPart, i);
    	}
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_meta_string_part;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterMeta_string_part) {
             listener.enterMeta_string_part(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitMeta_string_part) {
             listener.exitMeta_string_part(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitMeta_string_part) {
            return visitor.visitMeta_string_part(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Meta_stringContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public MetaDquote(): antlr.TerminalNode[];
    public MetaDquote(i: number): antlr.TerminalNode | null;
    public MetaDquote(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(WdlV1_1Parser.MetaDquote);
    	} else {
    		return this.getToken(WdlV1_1Parser.MetaDquote, i);
    	}
    }
    public meta_string_part(): Meta_string_partContext {
        return this.getRuleContext(0, Meta_string_partContext)!;
    }
    public MetaSquote(): antlr.TerminalNode[];
    public MetaSquote(i: number): antlr.TerminalNode | null;
    public MetaSquote(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(WdlV1_1Parser.MetaSquote);
    	} else {
    		return this.getToken(WdlV1_1Parser.MetaSquote, i);
    	}
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_meta_string;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterMeta_string) {
             listener.enterMeta_string(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitMeta_string) {
             listener.exitMeta_string(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitMeta_string) {
            return visitor.visitMeta_string(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Meta_arrayContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public MetaEmptyArray(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.MetaEmptyArray, 0);
    }
    public MetaLbrack(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.MetaLbrack, 0);
    }
    public meta_value(): Meta_valueContext[];
    public meta_value(i: number): Meta_valueContext | null;
    public meta_value(i?: number): Meta_valueContext[] | Meta_valueContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Meta_valueContext);
        }

        return this.getRuleContext(i, Meta_valueContext);
    }
    public MetaArrayCommaRbrack(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.MetaArrayCommaRbrack, 0);
    }
    public MetaRbrack(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.MetaRbrack, 0);
    }
    public MetaArrayComma(): antlr.TerminalNode[];
    public MetaArrayComma(i: number): antlr.TerminalNode | null;
    public MetaArrayComma(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(WdlV1_1Parser.MetaArrayComma);
    	} else {
    		return this.getToken(WdlV1_1Parser.MetaArrayComma, i);
    	}
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_meta_array;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterMeta_array) {
             listener.enterMeta_array(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitMeta_array) {
             listener.exitMeta_array(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitMeta_array) {
            return visitor.visitMeta_array(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Meta_objectContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public MetaEmptyObject(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.MetaEmptyObject, 0);
    }
    public MetaLbrace(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.MetaLbrace, 0);
    }
    public meta_object_kv(): Meta_object_kvContext[];
    public meta_object_kv(i: number): Meta_object_kvContext | null;
    public meta_object_kv(i?: number): Meta_object_kvContext[] | Meta_object_kvContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Meta_object_kvContext);
        }

        return this.getRuleContext(i, Meta_object_kvContext);
    }
    public MetaObjectCommaRbrace(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.MetaObjectCommaRbrace, 0);
    }
    public MetaRbrace(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.MetaRbrace, 0);
    }
    public MetaObjectComma(): antlr.TerminalNode[];
    public MetaObjectComma(i: number): antlr.TerminalNode | null;
    public MetaObjectComma(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(WdlV1_1Parser.MetaObjectComma);
    	} else {
    		return this.getToken(WdlV1_1Parser.MetaObjectComma, i);
    	}
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_meta_object;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterMeta_object) {
             listener.enterMeta_object(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitMeta_object) {
             listener.exitMeta_object(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitMeta_object) {
            return visitor.visitMeta_object(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Meta_object_kvContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public MetaObjectIdentifier(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.MetaObjectIdentifier, 0)!;
    }
    public MetaObjectColon(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.MetaObjectColon, 0)!;
    }
    public meta_value(): Meta_valueContext {
        return this.getRuleContext(0, Meta_valueContext)!;
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_meta_object_kv;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterMeta_object_kv) {
             listener.enterMeta_object_kv(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitMeta_object_kv) {
             listener.exitMeta_object_kv(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitMeta_object_kv) {
            return visitor.visitMeta_object_kv(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Meta_kvContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public MetaIdentifier(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.MetaIdentifier, 0)!;
    }
    public MetaColon(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.MetaColon, 0)!;
    }
    public meta_value(): Meta_valueContext {
        return this.getRuleContext(0, Meta_valueContext)!;
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_meta_kv;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterMeta_kv) {
             listener.enterMeta_kv(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitMeta_kv) {
             listener.exitMeta_kv(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitMeta_kv) {
            return visitor.visitMeta_kv(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Parameter_metaContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PARAMETERMETA(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.PARAMETERMETA, 0)!;
    }
    public BeginMeta(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.BeginMeta, 0)!;
    }
    public EndMeta(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.EndMeta, 0)!;
    }
    public meta_kv(): Meta_kvContext[];
    public meta_kv(i: number): Meta_kvContext | null;
    public meta_kv(i?: number): Meta_kvContext[] | Meta_kvContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Meta_kvContext);
        }

        return this.getRuleContext(i, Meta_kvContext);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_parameter_meta;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterParameter_meta) {
             listener.enterParameter_meta(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitParameter_meta) {
             listener.exitParameter_meta(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitParameter_meta) {
            return visitor.visitParameter_meta(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class MetaContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public META(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.META, 0)!;
    }
    public BeginMeta(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.BeginMeta, 0)!;
    }
    public EndMeta(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.EndMeta, 0)!;
    }
    public meta_kv(): Meta_kvContext[];
    public meta_kv(i: number): Meta_kvContext | null;
    public meta_kv(i?: number): Meta_kvContext[] | Meta_kvContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Meta_kvContext);
        }

        return this.getRuleContext(i, Meta_kvContext);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_meta;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterMeta) {
             listener.enterMeta(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitMeta) {
             listener.exitMeta(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitMeta) {
            return visitor.visitMeta(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Task_runtime_kvContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.Identifier, 0)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.COLON, 0)!;
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_task_runtime_kv;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterTask_runtime_kv) {
             listener.enterTask_runtime_kv(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitTask_runtime_kv) {
             listener.exitTask_runtime_kv(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitTask_runtime_kv) {
            return visitor.visitTask_runtime_kv(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Task_runtimeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public RUNTIME(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RUNTIME, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RBRACE, 0)!;
    }
    public task_runtime_kv(): Task_runtime_kvContext[];
    public task_runtime_kv(i: number): Task_runtime_kvContext | null;
    public task_runtime_kv(i?: number): Task_runtime_kvContext[] | Task_runtime_kvContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Task_runtime_kvContext);
        }

        return this.getRuleContext(i, Task_runtime_kvContext);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_task_runtime;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterTask_runtime) {
             listener.enterTask_runtime(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitTask_runtime) {
             listener.exitTask_runtime(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitTask_runtime) {
            return visitor.visitTask_runtime(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Task_inputContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INPUT(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.INPUT, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RBRACE, 0)!;
    }
    public any_decls(): Any_declsContext[];
    public any_decls(i: number): Any_declsContext | null;
    public any_decls(i?: number): Any_declsContext[] | Any_declsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Any_declsContext);
        }

        return this.getRuleContext(i, Any_declsContext);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_task_input;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterTask_input) {
             listener.enterTask_input(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitTask_input) {
             listener.exitTask_input(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitTask_input) {
            return visitor.visitTask_input(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Task_outputContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public OUTPUT(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.OUTPUT, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RBRACE, 0)!;
    }
    public bound_decls(): Bound_declsContext[];
    public bound_decls(i: number): Bound_declsContext | null;
    public bound_decls(i?: number): Bound_declsContext[] | Bound_declsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Bound_declsContext);
        }

        return this.getRuleContext(i, Bound_declsContext);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_task_output;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterTask_output) {
             listener.enterTask_output(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitTask_output) {
             listener.exitTask_output(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitTask_output) {
            return visitor.visitTask_output(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Task_command_string_partContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CommandStringPart(): antlr.TerminalNode[];
    public CommandStringPart(i: number): antlr.TerminalNode | null;
    public CommandStringPart(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(WdlV1_1Parser.CommandStringPart);
    	} else {
    		return this.getToken(WdlV1_1Parser.CommandStringPart, i);
    	}
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_task_command_string_part;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterTask_command_string_part) {
             listener.enterTask_command_string_part(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitTask_command_string_part) {
             listener.exitTask_command_string_part(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitTask_command_string_part) {
            return visitor.visitTask_command_string_part(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Task_command_expr_partContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public StringCommandStart(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.StringCommandStart, 0)!;
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RBRACE, 0)!;
    }
    public expression_placeholder_option(): Expression_placeholder_optionContext[];
    public expression_placeholder_option(i: number): Expression_placeholder_optionContext | null;
    public expression_placeholder_option(i?: number): Expression_placeholder_optionContext[] | Expression_placeholder_optionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Expression_placeholder_optionContext);
        }

        return this.getRuleContext(i, Expression_placeholder_optionContext);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_task_command_expr_part;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterTask_command_expr_part) {
             listener.enterTask_command_expr_part(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitTask_command_expr_part) {
             listener.exitTask_command_expr_part(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitTask_command_expr_part) {
            return visitor.visitTask_command_expr_part(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Task_command_expr_with_stringContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public task_command_expr_part(): Task_command_expr_partContext {
        return this.getRuleContext(0, Task_command_expr_partContext)!;
    }
    public task_command_string_part(): Task_command_string_partContext {
        return this.getRuleContext(0, Task_command_string_partContext)!;
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_task_command_expr_with_string;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterTask_command_expr_with_string) {
             listener.enterTask_command_expr_with_string(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitTask_command_expr_with_string) {
             listener.exitTask_command_expr_with_string(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitTask_command_expr_with_string) {
            return visitor.visitTask_command_expr_with_string(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Task_commandContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public COMMAND(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.COMMAND, 0)!;
    }
    public BeginLBrace(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.BeginLBrace, 0);
    }
    public task_command_string_part(): Task_command_string_partContext {
        return this.getRuleContext(0, Task_command_string_partContext)!;
    }
    public EndCommand(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.EndCommand, 0)!;
    }
    public task_command_expr_with_string(): Task_command_expr_with_stringContext[];
    public task_command_expr_with_string(i: number): Task_command_expr_with_stringContext | null;
    public task_command_expr_with_string(i?: number): Task_command_expr_with_stringContext[] | Task_command_expr_with_stringContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Task_command_expr_with_stringContext);
        }

        return this.getRuleContext(i, Task_command_expr_with_stringContext);
    }
    public BeginHereDoc(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.BeginHereDoc, 0);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_task_command;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterTask_command) {
             listener.enterTask_command(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitTask_command) {
             listener.exitTask_command(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitTask_command) {
            return visitor.visitTask_command(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Task_elementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public task_input(): Task_inputContext | null {
        return this.getRuleContext(0, Task_inputContext);
    }
    public task_output(): Task_outputContext | null {
        return this.getRuleContext(0, Task_outputContext);
    }
    public task_command(): Task_commandContext | null {
        return this.getRuleContext(0, Task_commandContext);
    }
    public task_runtime(): Task_runtimeContext | null {
        return this.getRuleContext(0, Task_runtimeContext);
    }
    public bound_decls(): Bound_declsContext | null {
        return this.getRuleContext(0, Bound_declsContext);
    }
    public parameter_meta(): Parameter_metaContext | null {
        return this.getRuleContext(0, Parameter_metaContext);
    }
    public meta(): MetaContext | null {
        return this.getRuleContext(0, MetaContext);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_task_element;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterTask_element) {
             listener.enterTask_element(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitTask_element) {
             listener.exitTask_element(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitTask_element) {
            return visitor.visitTask_element(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TaskContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public TASK(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.TASK, 0)!;
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.Identifier, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RBRACE, 0)!;
    }
    public task_element(): Task_elementContext[];
    public task_element(i: number): Task_elementContext | null;
    public task_element(i?: number): Task_elementContext[] | Task_elementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Task_elementContext);
        }

        return this.getRuleContext(i, Task_elementContext);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_task;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterTask) {
             listener.enterTask(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitTask) {
             listener.exitTask(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitTask) {
            return visitor.visitTask(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Inner_workflow_elementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public bound_decls(): Bound_declsContext | null {
        return this.getRuleContext(0, Bound_declsContext);
    }
    public call(): CallContext | null {
        return this.getRuleContext(0, CallContext);
    }
    public scatter(): ScatterContext | null {
        return this.getRuleContext(0, ScatterContext);
    }
    public conditional(): ConditionalContext | null {
        return this.getRuleContext(0, ConditionalContext);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_inner_workflow_element;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterInner_workflow_element) {
             listener.enterInner_workflow_element(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitInner_workflow_element) {
             listener.exitInner_workflow_element(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitInner_workflow_element) {
            return visitor.visitInner_workflow_element(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Call_aliasContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public AS(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.AS, 0)!;
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.Identifier, 0)!;
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_call_alias;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterCall_alias) {
             listener.enterCall_alias(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitCall_alias) {
             listener.exitCall_alias(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitCall_alias) {
            return visitor.visitCall_alias(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Call_inputContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.Identifier, 0)!;
    }
    public EQUAL(): antlr.TerminalNode | null {
        return this.getToken(WdlV1_1Parser.EQUAL, 0);
    }
    public expr(): ExprContext | null {
        return this.getRuleContext(0, ExprContext);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_call_input;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterCall_input) {
             listener.enterCall_input(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitCall_input) {
             listener.exitCall_input(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitCall_input) {
            return visitor.visitCall_input(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Call_inputsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INPUT(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.INPUT, 0)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.COLON, 0)!;
    }
    public call_input(): Call_inputContext[];
    public call_input(i: number): Call_inputContext | null;
    public call_input(i?: number): Call_inputContext[] | Call_inputContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Call_inputContext);
        }

        return this.getRuleContext(i, Call_inputContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(WdlV1_1Parser.COMMA);
    	} else {
    		return this.getToken(WdlV1_1Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_call_inputs;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterCall_inputs) {
             listener.enterCall_inputs(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitCall_inputs) {
             listener.exitCall_inputs(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitCall_inputs) {
            return visitor.visitCall_inputs(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Call_bodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RBRACE, 0)!;
    }
    public call_inputs(): Call_inputsContext | null {
        return this.getRuleContext(0, Call_inputsContext);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_call_body;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterCall_body) {
             listener.enterCall_body(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitCall_body) {
             listener.exitCall_body(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitCall_body) {
            return visitor.visitCall_body(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Call_afterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public AFTER(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.AFTER, 0)!;
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.Identifier, 0)!;
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_call_after;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterCall_after) {
             listener.enterCall_after(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitCall_after) {
             listener.exitCall_after(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitCall_after) {
            return visitor.visitCall_after(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Call_nameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Identifier(): antlr.TerminalNode[];
    public Identifier(i: number): antlr.TerminalNode | null;
    public Identifier(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(WdlV1_1Parser.Identifier);
    	} else {
    		return this.getToken(WdlV1_1Parser.Identifier, i);
    	}
    }
    public DOT(): antlr.TerminalNode[];
    public DOT(i: number): antlr.TerminalNode | null;
    public DOT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(WdlV1_1Parser.DOT);
    	} else {
    		return this.getToken(WdlV1_1Parser.DOT, i);
    	}
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_call_name;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterCall_name) {
             listener.enterCall_name(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitCall_name) {
             listener.exitCall_name(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitCall_name) {
            return visitor.visitCall_name(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CallContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CALL(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.CALL, 0)!;
    }
    public call_name(): Call_nameContext {
        return this.getRuleContext(0, Call_nameContext)!;
    }
    public call_alias(): Call_aliasContext | null {
        return this.getRuleContext(0, Call_aliasContext);
    }
    public call_after(): Call_afterContext[];
    public call_after(i: number): Call_afterContext | null;
    public call_after(i?: number): Call_afterContext[] | Call_afterContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Call_afterContext);
        }

        return this.getRuleContext(i, Call_afterContext);
    }
    public call_body(): Call_bodyContext | null {
        return this.getRuleContext(0, Call_bodyContext);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_call;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterCall) {
             listener.enterCall(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitCall) {
             listener.exitCall(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitCall) {
            return visitor.visitCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ScatterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SCATTER(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.SCATTER, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.LPAREN, 0)!;
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.Identifier, 0)!;
    }
    public In(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.In, 0)!;
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RPAREN, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RBRACE, 0)!;
    }
    public inner_workflow_element(): Inner_workflow_elementContext[];
    public inner_workflow_element(i: number): Inner_workflow_elementContext | null;
    public inner_workflow_element(i?: number): Inner_workflow_elementContext[] | Inner_workflow_elementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Inner_workflow_elementContext);
        }

        return this.getRuleContext(i, Inner_workflow_elementContext);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_scatter;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterScatter) {
             listener.enterScatter(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitScatter) {
             listener.exitScatter(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitScatter) {
            return visitor.visitScatter(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ConditionalContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.IF, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.LPAREN, 0)!;
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RPAREN, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RBRACE, 0)!;
    }
    public inner_workflow_element(): Inner_workflow_elementContext[];
    public inner_workflow_element(i: number): Inner_workflow_elementContext | null;
    public inner_workflow_element(i?: number): Inner_workflow_elementContext[] | Inner_workflow_elementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Inner_workflow_elementContext);
        }

        return this.getRuleContext(i, Inner_workflow_elementContext);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_conditional;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterConditional) {
             listener.enterConditional(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitConditional) {
             listener.exitConditional(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitConditional) {
            return visitor.visitConditional(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Workflow_inputContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INPUT(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.INPUT, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RBRACE, 0)!;
    }
    public any_decls(): Any_declsContext[];
    public any_decls(i: number): Any_declsContext | null;
    public any_decls(i?: number): Any_declsContext[] | Any_declsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Any_declsContext);
        }

        return this.getRuleContext(i, Any_declsContext);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_workflow_input;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterWorkflow_input) {
             listener.enterWorkflow_input(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitWorkflow_input) {
             listener.exitWorkflow_input(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitWorkflow_input) {
            return visitor.visitWorkflow_input(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Workflow_outputContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public OUTPUT(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.OUTPUT, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RBRACE, 0)!;
    }
    public bound_decls(): Bound_declsContext[];
    public bound_decls(i: number): Bound_declsContext | null;
    public bound_decls(i?: number): Bound_declsContext[] | Bound_declsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Bound_declsContext);
        }

        return this.getRuleContext(i, Bound_declsContext);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_workflow_output;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterWorkflow_output) {
             listener.enterWorkflow_output(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitWorkflow_output) {
             listener.exitWorkflow_output(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitWorkflow_output) {
            return visitor.visitWorkflow_output(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Workflow_elementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_workflow_element;
    }
    public override copyFrom(ctx: Workflow_elementContext): void {
        super.copyFrom(ctx);
    }
}
export class OutputContext extends Workflow_elementContext {
    public constructor(ctx: Workflow_elementContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public workflow_output(): Workflow_outputContext {
        return this.getRuleContext(0, Workflow_outputContext)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterOutput) {
             listener.enterOutput(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitOutput) {
             listener.exitOutput(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitOutput) {
            return visitor.visitOutput(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class InputContext extends Workflow_elementContext {
    public constructor(ctx: Workflow_elementContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public workflow_input(): Workflow_inputContext {
        return this.getRuleContext(0, Workflow_inputContext)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterInput) {
             listener.enterInput(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitInput) {
             listener.exitInput(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitInput) {
            return visitor.visitInput(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class Parameter_meta_elementContext extends Workflow_elementContext {
    public constructor(ctx: Workflow_elementContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public parameter_meta(): Parameter_metaContext {
        return this.getRuleContext(0, Parameter_metaContext)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterParameter_meta_element) {
             listener.enterParameter_meta_element(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitParameter_meta_element) {
             listener.exitParameter_meta_element(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitParameter_meta_element) {
            return visitor.visitParameter_meta_element(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class Meta_elementContext extends Workflow_elementContext {
    public constructor(ctx: Workflow_elementContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public meta(): MetaContext {
        return this.getRuleContext(0, MetaContext)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterMeta_element) {
             listener.enterMeta_element(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitMeta_element) {
             listener.exitMeta_element(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitMeta_element) {
            return visitor.visitMeta_element(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class Inner_elementContext extends Workflow_elementContext {
    public constructor(ctx: Workflow_elementContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public inner_workflow_element(): Inner_workflow_elementContext {
        return this.getRuleContext(0, Inner_workflow_elementContext)!;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterInner_element) {
             listener.enterInner_element(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitInner_element) {
             listener.exitInner_element(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitInner_element) {
            return visitor.visitInner_element(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class WorkflowContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public WORKFLOW(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.WORKFLOW, 0)!;
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.Identifier, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.RBRACE, 0)!;
    }
    public workflow_element(): Workflow_elementContext[];
    public workflow_element(i: number): Workflow_elementContext | null;
    public workflow_element(i?: number): Workflow_elementContext[] | Workflow_elementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Workflow_elementContext);
        }

        return this.getRuleContext(i, Workflow_elementContext);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_workflow;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterWorkflow) {
             listener.enterWorkflow(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitWorkflow) {
             listener.exitWorkflow(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitWorkflow) {
            return visitor.visitWorkflow(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Document_elementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public import_doc(): Import_docContext | null {
        return this.getRuleContext(0, Import_docContext);
    }
    public struct(): StructContext | null {
        return this.getRuleContext(0, StructContext);
    }
    public task(): TaskContext | null {
        return this.getRuleContext(0, TaskContext);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_document_element;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterDocument_element) {
             listener.enterDocument_element(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitDocument_element) {
             listener.exitDocument_element(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitDocument_element) {
            return visitor.visitDocument_element(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DocumentContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public version(): VersionContext {
        return this.getRuleContext(0, VersionContext)!;
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(WdlV1_1Parser.EOF, 0)!;
    }
    public document_element(): Document_elementContext[];
    public document_element(i: number): Document_elementContext | null;
    public document_element(i?: number): Document_elementContext[] | Document_elementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Document_elementContext);
        }

        return this.getRuleContext(i, Document_elementContext);
    }
    public workflow(): WorkflowContext | null {
        return this.getRuleContext(0, WorkflowContext);
    }
    public override get ruleIndex(): number {
        return WdlV1_1Parser.RULE_document;
    }
    public override enterRule(listener: WdlV1_1ParserListener): void {
        if(listener.enterDocument) {
             listener.enterDocument(this);
        }
    }
    public override exitRule(listener: WdlV1_1ParserListener): void {
        if(listener.exitDocument) {
             listener.exitDocument(this);
        }
    }
    public override accept<Result>(visitor: WdlV1_1ParserVisitor<Result>): Result | null {
        if (visitor.visitDocument) {
            return visitor.visitDocument(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
