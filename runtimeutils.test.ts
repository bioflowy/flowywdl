import { assertEquals } from "@std/assert/equals";
import { getSystemInfo } from "./runtimeutils.ts";

Deno.test(function getTokensTest() {
    const sysinfo = getSystemInfo();
    assertEquals(sysinfo.cpuCount,2);
});
