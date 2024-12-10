import { CharStreamImpl } from "antlr4ng";
import { getTokens } from "../lexer.ts";
import { expectEOF, expectSingleResult } from "typescript-parsec";
import { string } from "./expr.ts";
import { assertInstanceOf } from "@std/assert/instance-of";
import * as Value from '../value.ts'
import * as Env from '../env.ts'
import * as Expr from '../expr.ts'
import * as StdLib from '../stdlib.ts'
import { assertEquals } from "@std/assert/equals";
import { Base } from "../type.ts";
import { DummySourcePos } from "../runtime/testutils.ts";

Deno.test(async function parseLiteral() {
    const tokens = getTokens(new CharStreamImpl("\"this is test\""));
    const type = expectSingleResult(expectEOF(string.parse(tokens)));
    assertInstanceOf(type, Expr.String);
    const str = type as Expr.String;
    const rslt  = await str.eval(new Env.Bindings(),new StdLib.Base())
    assertEquals(rslt.value, "this is test");
 });
Deno.test(async function parseLiteral2() {
    const tokens = getTokens(new CharStreamImpl("'Hello ~{name}'"));
    const type = expectSingleResult(expectEOF(string.parse(tokens)));

    assertEquals(type?.toString(), "'Hello ~{name}'");
    assertInstanceOf(type, Expr.String);
    const str = type as Expr.String;
    let env = new Env.Bindings<Value.Base>()
    env = env.bind("name",new Value.String("world"))
    const rslt  = await str.eval(env,new StdLib.Base())
    assertEquals(rslt.value, "Hello world");
});
