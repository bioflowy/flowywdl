import { Token,TokenPosition } from 'typescript-parsec';
import {WdlV1_1Lexer} from "./generated/WdlV1_1Lexer.ts"
import { buildLexer, expectEOF, expectSingleResult, rule } from 'typescript-parsec';
import { alt, apply, kmid, lrec_sc, seq, str, tok } from 'typescript-parsec';
import { CharStream, CharStreamImpl } from "antlr4ng";

export function add(a: number, b: number): number {
  return a + b;
}
const stream = new CharStreamImpl("task test { }");

