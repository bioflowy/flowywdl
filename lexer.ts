import type { Token, TokenPosition } from "typescript-parsec";
import { WdlV1_1Lexer } from "./generated/WdlV1_1Lexer.ts";
import { CharStream } from "antlr4ng";

export enum TokenKind {
  LINE_COMMENT = 1,
  VERSION = 2,
  IMPORT = 3,
  WORKFLOW = 4,
  TASK = 5,
  STRUCT = 6,
  SCATTER = 7,
  CALL = 8,
  IF = 9,
  THEN = 10,
  ELSE = 11,
  ALIAS = 12,
  AS = 13,
  In = 14,
  INPUT = 15,
  OUTPUT = 16,
  PARAMETERMETA = 17,
  META = 18,
  RUNTIME = 19,
  BOOLEAN = 20,
  INT = 21,
  FLOAT = 22,
  STRING = 23,
  FILE = 24,
  ARRAY = 25,
  MAP = 26,
  OBJECT = 27,
  OBJECTLITERAL = 28,
  SEPEQUAL = 29,
  DEFAULTEQUAL = 30,
  PAIR = 31,
  AFTER = 32,
  COMMAND = 33,
  NONELITERAL = 34,
  IntLiteral = 35,
  FloatLiteral = 36,
  BoolLiteral = 37,
  LPAREN = 38,
  RPAREN = 39,
  LBRACE = 40,
  RBRACE = 41,
  LBRACK = 42,
  RBRACK = 43,
  ESC = 44,
  COLON = 45,
  LT = 46,
  GT = 47,
  GTE = 48,
  LTE = 49,
  EQUALITY = 50,
  NOTEQUAL = 51,
  EQUAL = 52,
  AND = 53,
  OR = 54,
  OPTIONAL = 55,
  STAR = 56,
  PLUS = 57,
  MINUS = 58,
  DOLLAR = 59,
  COMMA = 60,
  SEMI = 61,
  DOT = 62,
  NOT = 63,
  TILDE = 64,
  DIVIDE = 65,
  MOD = 66,
  SQUOTE = 67,
  DQUOTE = 68,
  WHITESPACE = 69,
  Identifier = 70,
  StringPart = 71,
  BeginWhitespace = 72,
  BeginHereDoc = 73,
  BeginLBrace = 74,
  HereDocUnicodeEscape = 75,
  CommandUnicodeEscape = 76,
  StringCommandStart = 77,
  EndCommand = 78,
  CommandStringPart = 79,
  VersionWhitespace = 80,
  ReleaseVersion = 81,
  BeginMeta = 82,
  MetaWhitespace = 83,
  MetaBodyComment = 84,
  MetaIdentifier = 85,
  MetaColon = 86,
  EndMeta = 87,
  MetaBodyWhitespace = 88,
  MetaValueComment = 89,
  MetaBool = 90,
  MetaInt = 91,
  MetaFloat = 92,
  MetaNull = 93,
  MetaSquote = 94,
  MetaDquote = 95,
  MetaEmptyObject = 96,
  MetaEmptyArray = 97,
  MetaLbrack = 98,
  MetaLbrace = 99,
  MetaValueWhitespace = 100,
  MetaStringPart = 101,
  MetaArrayComment = 102,
  MetaArrayCommaRbrack = 103,
  MetaArrayComma = 104,
  MetaRbrack = 105,
  MetaArrayWhitespace = 106,
  MetaObjectIdentifier = 107,
  MetaObjectColon = 108,
  MetaObjectCommaRbrace = 109,
  MetaObjectComma = 110,
  MetaRbrace = 111,
  MetaObjectWhitespace = 112,
  HereDocEscapedEnd = 113,
}
export class WdlToken implements Token<TokenKind> {
  private _next: WdlToken | undefined;
  constructor(
    public readonly kind: TokenKind,
    public readonly text: string,
    public readonly pos: TokenPosition
  ) {}
  setNext(next: WdlToken) {
    this._next = next;
  }
  get next(): WdlToken | undefined {
    return this._next;
  }
}
export function getTokens(stream: CharStream): WdlToken {
  const lexer = new WdlV1_1Lexer(stream);

  let rootToken: WdlToken | undefined = undefined;
  let prevToken: WdlToken | undefined = undefined;
  while (true) {
    const token = lexer.nextToken();
    if (token.type < 0) {
      break;
    }
    if (token.type === TokenKind.WHITESPACE) {
      continue;
    }
    const text = token.text||""
    const wdlToken = new WdlToken(token.type as TokenKind, text, {
      index: token.start,
      rowBegin: token.line,
      rowEnd: token.line,
      columnBegin: token.column,
      columnEnd: token.column + text.length,
    });
    if (prevToken !== undefined) {
      prevToken.setNext(wdlToken);
    } else {
      rootToken = wdlToken;
    }
    prevToken = wdlToken;
  }
  if(rootToken === undefined) {
    throw new Error("No tokens found");
  }
  return rootToken;
}
