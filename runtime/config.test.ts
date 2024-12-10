import { assertEquals } from "@std/assert/equals";
import { Loader } from "./config.ts";
import {logger} from "./logger.ts"
Deno.test(function getTokensTest() {
    const loader = new Loader(logger)
    assertEquals(JSON.stringify(loader.getDict("task_runtime","defaults")),'{"docker":"ubuntu:20.04"}')
});
