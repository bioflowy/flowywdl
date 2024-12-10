import { assertEquals } from "@std/assert/equals";
import { ConfigParser } from "./configparser.ts";
Deno.test(function getTokensTest() {
    const cfg = new ConfigParser()
    const configStr = `[test]
key1 = value1
key2 = line1
    line2
key3 = line3\
line4
`
    cfg.read(configStr)
    assertEquals(cfg.get("test","key1"),"value1")
    assertEquals(cfg.get("test","key2"),"line1\nline2")
    assertEquals(cfg.get("test","key3"),"line3line4")
});
