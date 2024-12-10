import { assertEquals, assertInstanceOf } from "@std/assert";
import { OutputStdLib, runLocalTask } from "./task.ts";
import { PodmanContainer } from "./backend/podman.ts";
import { Loader, } from "./config.ts";
import { logger } from "./logger.ts";
import * as Expr from "../expr.ts";
import * as Env from "../env.ts";
import * as Value from "../value.ts";
import * as Tree from "../tree.ts";
import { DummySourcePos } from "./testutils.ts";
import { task } from "../parser/parser.ts";
import { expectEOF, expectSingleResult, type Token } from "typescript-parsec";
import { getTokens, type TokenKind } from "../lexer.ts";
import { CharStreamImpl } from "antlr4ng";
// Deno.test(async function testGlob() {
//  const tempDir = await Deno.makeTempDir();
//  try{
//     const cfg = new Loader(logger);
//     const tsk = new PodmanContainer(cfg,"test",tempDir)
//     const filename = `${tempDir}/work/test123.txt`
//     await Deno.writeTextFile(filename, "Hello");
//     const stdLib = new OutputStdLib("test",logger,tsk)
//     const globcall = new Expr.Apply(DummySourcePos,"glob",[new Expr.StringLiteral(DummySourcePos,["test*.txt"])])
//     const env = new Env.Bindings<Value.Base>(undefined);
//     const ret = await stdLib.glob.call(globcall,env,stdLib)
//     assertInstanceOf(ret,Value.WDLArray)
//     assertEquals(ret.value[0].value, `${tsk.containerDir}/work/test123.txt`);
//  }catch(e){
//     if(e instanceof Error){
//         console.log(e.stack)
//     }
//  }finally{
//      await Deno.remove(tempDir, { recursive: true });
//  }
// });

Deno.test(async function testGlob() {
    const tempDir = await Deno.makeTempDir({prefix:"wdl-"});
    try{
       const cfg = new Loader(logger);
       const tokens: Token<TokenKind>| undefined = getTokens(new CharStreamImpl(
        `task t {
      input {
          String s1
      }
  
      command <<<
          echo "Hello ~{s1}"
      >>>
  
      output {
          File message = stdout()
      }
  }`));
       const task1 = expectSingleResult(expectEOF(task.parse(tokens)));
       let env = new Env.Bindings<Value.Base>();
       env = env.bind("s1",new Value.String("hellow input world"))
       const result = await runLocalTask(cfg,task1,env,"test123",tempDir)
       console.log(result)
    }catch(e){
       if(e instanceof Error){
           console.log(e.stack)
       }
    }finally{
        //await Deno.remove(tempDir, { recursive: true });
    }
   });
   
   