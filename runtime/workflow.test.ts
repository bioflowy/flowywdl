import { assertEquals, assertInstanceOf } from "@std/assert";
import { parseDocument } from "../parser/parser.ts";
import { logger } from "./logger.ts";
import { Loader } from "./config.ts";
import * as Env from "../env.ts";
import * as Value from "../value.ts";
import { runLocalWorkflow } from "./workflow.ts";
import { provisionRunDir } from "../utils.ts";
import { path } from "../runtimeutils.ts";
async function test(tempDir:string){
  const rundir = await provisionRunDir("provition",tempDir,true)
  console.log(`rundir=${rundir}`)

}
Deno.test(async function testGlob() {
  const tempDir = await Deno.makeTempDir({ prefix: "wdl-" });

  try {
    const cfg = new Loader(logger);
    let input = new Env.Bindings<Value.Base>();
    input = input.bind(
      "name",
      new Value.String("input string world"),
    );
    const doc = parseDocument(
      `version 1.0

workflow HelloInput {
  input {
    String name
  }
  call WriteGreeting {
    name = name
  }
}

task WriteGreeting {
  input {
    String name
  }
  
  # specify parameter value (name) in input.json file
  command {
    echo 'hello ~{name}!'
  }
  output {
    File response = stdout()
  }
  runtime {
   docker: 'ubuntu:latest'
  }
}
`,
    );
    console.log("Deno version:", Deno.version.deno);
    console.log("V8 version:", Deno.version.v8);
    console.log("TypeScript version:", Deno.version.typescript);
    if (doc.workflow) {

      await doc.typecheck(true);
      const rslt = await runLocalWorkflow(cfg, doc.workflow, input, {
        runDir: tempDir,
        runId: "test123",
      });
      console.log(rslt[0]);
    }
  } catch (e) {
    logger.error("error", e);
  }
});
