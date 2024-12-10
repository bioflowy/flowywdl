import { Trees } from "antlr4ng";
import { runner_input } from "./cli.ts";
import * as Tree from "./tree.ts"
import * as Value from "./value.ts"
import * as Env from "./env.ts"
import { runLocalWorkflow } from "./runtime/workflow.ts";
import { runLocalTask } from "./runtime/task.ts";
import { parseDocument } from "./parser/parser.ts";
import { Loader } from "./runtime/config.ts";
import { logger } from "./runtime/logger.ts";

Deno.test(async function testGlob() {
    const tempDir = await Deno.makeTempDir({ prefix: "wdl-" });
  
    try {
        let input = new Env.Bindings<Value.Base>();
    input = input.bind(
      "name",
      new Value.String("input string world"),
    );
      const cfg = new Loader(logger);
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
        const [target,input,options] = await runner_input(doc,[],"input.json",null,null)
        if(target instanceof Tree.Workflow){
            const rslt = await runLocalWorkflow(cfg, doc.workflow, input, {
                runDir: tempDir,
                runId: "test123",
              });
              console.log(rslt[0]);
        }else{
            const rslt = await runLocalTask(cfg, target, input,  tempDir,
                 "test123");
              console.log(rslt[0]);

        }
      }
    } catch (e) {
      logger.error("error", e);
    }
  });
  