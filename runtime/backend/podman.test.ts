import { PodmanContainer } from "./podman.ts";
import { Loader } from "../config.ts";
import { logger } from "../logger.ts";
import { pathJoin, readFileSync, withTempDir } from "../../runtimeutils.ts";
import { assertEquals } from "@std/assert/equals";
Deno.test(async function podmanRunTest() {
    await withTempDir(async (tmpdir)=>{
        const cfg = new Loader(logger)
        const p = new PodmanContainer(cfg,"test",tmpdir)
        await p.run(logger,"echo test")
        const rslt = readFileSync(pathJoin(tmpdir,"stdout.txt"))
        assertEquals(rslt,"test\n")
    })
});
