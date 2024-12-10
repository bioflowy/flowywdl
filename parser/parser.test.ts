import { assert, assertEquals, assertInstanceOf } from "@std/assert";
import * as Env from "../env.ts";
import * as Expr from "../expr.ts";
import * as StdLib from "../stdlib.ts";
import * as Tree from "../tree.ts";
import { getTokens, TokenKind } from "../lexer.ts";
import { CharStreamImpl } from "antlr4ng";
import { call, inner_element, parseDocument, task, task_runtime, wdlType, workflow, workflow_element } from "./parser.ts";
import { expectEOF, expectSingleResult, type Token } from "typescript-parsec";
import { Bindings } from "../env.ts";
import { OutputStdLib } from "../runtime/task.ts";

Deno.test(function parseTest() {
    const tokens = getTokens(new CharStreamImpl(`workflow HelloInput {
  input {
    String name
  }
  call WriteGreeting {
    name = name
  }
}`));
    const type = expectSingleResult(expectEOF(workflow.parse(tokens)));

    assertInstanceOf(type,Tree.Workflow)
});

// Deno.test(async function parseDeclr() {
// const doc =`version 1.0 

// workflow HelloWorld {
//   call WriteGreeting
// }

// task WriteGreeting {
//   command {
//      echo "Hello World"
//   }
//   output {
//      # Write output to standard out
//      File output_greeting = stdout()
//   }
// }`
//   const docs = await parseDocument(doc);
//     assert(docs.workflow!==null)
// });

// Deno.test(function parseDeclr() {
//     const tokens: Token<TokenKind>| undefined = getTokens(new CharStreamImpl(
// `runtime {    
//   # Use this container, pull from DockerHub   
//   docker: "ubuntu:latest"    
// } `));
//     const type = expectSingleResult(expectEOF(task_runtime.parse(tokens)));

// //    assertEquals(type?.toString(), " echo \"hellow ~{name}\" ");
//     assertInstanceOf(type, Array);
// });
// Deno.test(function parseCall() {
//   const tokens: Token<TokenKind>| undefined = getTokens(new CharStreamImpl(
//       `call lib.repeat as repeat2 `));
//   const type = expectSingleResult(expectEOF(call.parse(tokens)));

//   assertInstanceOf(type, Tree.Call);
// });
// Deno.test(function parseDocumenTest() {
//   const doc = parseDocument(`
// version development

// task t {
//     input {
//         String s1
//     }

//     command <<<
//         echo "Hello ~{s1}"
//     >>>

//     output {
//         File message = stdout()
//     }
// }
//     `)
//   assertInstanceOf(doc, Tree.Document);
// });
