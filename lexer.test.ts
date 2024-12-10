import { assertEquals } from "@std/assert";
import { add } from "./main.ts";
import { WdlV1_1Lexer } from "./generated/WdlV1_1Lexer.ts";
import { CharStreamImpl, Token } from "antlr4ng";
import { getTokens, TokenKind } from "./lexer.ts";

Deno.test(function getTokensTest() {
  const tokens = getTokens(new CharStreamImpl("task test { } #test"));
  assertEquals(tokens.kind,TokenKind.TASK);
  assertEquals(tokens.next?.kind,TokenKind.Identifier);
  assertEquals(tokens.next?.next?.kind,TokenKind.LBRACE);
  assertEquals(tokens.next?.next?.next?.kind,TokenKind.RBRACE);
});
