import * as Expr from './expr.ts';
import * as Env from './env.ts';
import * as Type from './type.ts';
import * as Value from './value.ts';
import * as Stdlib from './stdlib.ts';
import * as WDLError from "./error.ts";
import { assert } from "@std/assert/assert";
import { assertEquals } from "@std/assert/equals";

const dummyPosition: WDLError.SourcePosition ={
    uri: "file:///tmp/test.wdl",
    abspath: "/tmp/test.wdl",
    line: 0,
    column: 0,
    end_line: 0,
    end_column: 1
};
Deno.test(function testApply() {
    const test:string[] = []

    if(test===undefined){
        console.log("test")
    }
    const apply = new Expr.Apply(dummyPosition,"_add", [new Expr.IntLiteral(dummyPosition,1), new Expr.IntLiteral(dummyPosition,2)]);
    const stdlib = new Stdlib.Base()
    const typeEnv = new Env.Bindings<Type.Base>();
    apply.inferType(typeEnv,stdlib);
    const valueEnv = new Env.Bindings<Value.Base>();
    const rslt = apply.eval(valueEnv,stdlib)
    assertEquals(rslt.toString(), "3");
});
Deno.test(function testCompareAnd() {
    const lhs = new Expr.Apply(dummyPosition,"_lt", [new Expr.IntLiteral(dummyPosition,1), new Expr.IntLiteral(dummyPosition,2)]);
    const rhs = new Expr.Apply(dummyPosition,"_gt", [new Expr.IntLiteral(dummyPosition,3), new Expr.IntLiteral(dummyPosition,2)]);
    const apply = new Expr.Apply(dummyPosition,"_land", [lhs, rhs]);
    const stdlib = new Stdlib.Base()
    const typeEnv = new Env.Bindings<Type.Base>();
    apply.inferType(typeEnv,stdlib);
    const valueEnv = new Env.Bindings<Value.Base>();
    const rslt = apply.eval(valueEnv,stdlib)
    assertEquals(rslt.toString(), "true");
});
