import { assertEquals } from "@std/assert/equals";
import * as Env from "./env.ts";
import * as Value from "./value.ts";

Deno.test(function getBindingLength() {
    let binds = new Env.Bindings()
    assertEquals(binds.length,0);
    binds = binds.bind("test1",new Value.String("test1"));
    assertEquals(binds.length,1);
    binds = binds.bind("test2",new Value.String("test2"));
    assertEquals(binds.length,2);
});
