import { assertEquals } from "@std/assert";
import {parseLines,parseTsv,parseMap,serializeLines,parseObjects, serializeTsv, serializeMap} from './stdlib.ts';
import type { Base } from "./type.ts";
import * as Value from "./value.ts";
import { StringWriter } from "./utils.ts";

Deno.test(function parseLineTest() {
    const tsv = parseLines("col1\tcol2\nval1\tval2\n");
    assertEquals((tsv.value as Array<unknown>).length , 2);
    const writer = new StringWriter();
    serializeLines(tsv, writer);
    assertEquals(writer.toString(), "col1\tcol2\nval1\tval2\n");
});

Deno.test(function parseTsvTest() {
    const tsv = parseTsv("col1\tcol2\nval1\tval2\n");
    const values : string[][]  = []
    tsv.value.forEach((value) => {
        const strs = (value.value as Value.String[]).map((v) => v.value as string)
        values.push(strs)
    });
    assertEquals(values , [["col1","col2"],["val1","val2"] ]);
    const writer = new StringWriter();
    serializeTsv(tsv, writer);
    assertEquals(writer.toString(), "col1\tcol2\nval1\tval2\n");
});

Deno.test(function parseMapTest() {
    const map = parseMap("key1\tvalue1\nkey2\tvalue2\n");
    console.log(map.value)
    assertEquals(map.value.toString() , '"key1","value1","key2","value2"');
    const writer = new StringWriter();
    serializeMap(map, writer);
    assertEquals(writer.toString(), "key1\tvalue1\nkey2\tvalue2\n");

});

Deno.test(function parseObjectsTest() {
    const objects = parseObjects("key1\tkey2\nvalue1-1\tvalue2-1\nvalue1-2\tvalue2-2\n");
    assertEquals(objects.value.toString() , '{"key1": "value1-1", "key2": "value2-1"},{"key1": "value1-2", "key2": "value2-2"}');
});
  