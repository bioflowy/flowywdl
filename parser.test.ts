import { assertEquals, assertInstanceOf } from "@std/assert";
import {parseLines,parseTsv,parseMap,serializeLines,parseObjects, serializeTsv, serializeMap} from './stdlib.ts';
import type { Base } from "./type.ts";
import * as Expr from "./expr.ts";
import { StringWriter } from "./utils.ts";
import { getTokens } from "./lexer.ts";
import { CharStreamImpl } from "antlr4ng";
import { expr, mapMemberArgs, wdlType } from "./parser.ts";
import { expectEOF, expectSingleResult } from "typescript-parsec";

Deno.test(function parseTest() {
    const tokens = getTokens(new CharStreamImpl("Map[String,Int]"));
    const type = expectSingleResult(expectEOF(wdlType.parse(tokens)));

    assertEquals(type?.toString(), "Map[String,Int]");
});

Deno.test(function parseLiteral() {
    const tokens = getTokens(new CharStreamImpl("2*3 == 6"));
    const type = expectSingleResult(expectEOF(expr.parse(tokens)));

    assertEquals(type?.toString(), "2 * 3 == 6");
    assertInstanceOf(type, Expr.Apply);
});
