import * as Type from '../type.ts';
import * as Tree from '../tree.ts';
import * as Expr from '../expr.ts';
import * as WDLError from '../error.ts';
import {tok,apply,alt_sc,seq, opt,lazy,Token, alt, rep_sc, opt_sc, rule, lrec_sc, rep,list_sc,kmid, kright, expectEOF, expectSingleResult} from "typescript-parsec";
import { getTokens, TokenKind } from "../lexer.ts";
import { expr, expression_placeholder_option, string } from "./expr.ts";
import { tokenize } from "jsr:@std/internal@^1.0.4/diff-str";
import { CharStreamImpl } from "antlr4ng";
import { toSourcePos } from "./utils.ts";


// task_command_string_part
// : CommandStringPart*
// ;
export const task_command_string_part = rep_sc(tok(TokenKind.CommandStringPart))

// task_command_expr_part
// : StringCommandStart (expression_placeholder_option)* expr RBRACE
// ;
export const task_command_expr_part = apply(
    seq(tok(TokenKind.StringCommandStart),rep_sc(expression_placeholder_option),expr,tok(TokenKind.RBRACE)),([start,options,expr])=>{
        const ops:{[key:string]:string} ={}
        for(const [key,str] of options){
            ops[key] = str.literal?.value as string
        }
        return new Expr.Placeholder(toSourcePos(start),ops,expr)
    });

// task_command_expr_with_string
// : task_command_expr_part task_command_string_part
// ;
export const task_command_expr_with_string = seq(task_command_expr_part,task_command_string_part)

// task_command
// : COMMAND BeginLBrace task_command_string_part task_command_expr_with_string* EndCommand
// | COMMAND BeginHereDoc task_command_string_part task_command_expr_with_string* EndCommand
// ;
export const task_command = rule<TokenKind, [string,Expr.String]>();
task_command.setPattern(apply(
    alt_sc(
    seq(tok(TokenKind.COMMAND),tok(TokenKind.BeginLBrace),task_command_string_part,rep_sc(task_command_expr_with_string),tok(TokenKind.EndCommand)),
    seq(tok(TokenKind.COMMAND),tok(TokenKind.BeginHereDoc),task_command_string_part,rep_sc(task_command_expr_with_string),tok(TokenKind.EndCommand))),
    ([_1,qs,strToken,exprs,_2]):[string,Expr.String] => {
        const parts:(string|Expr.Placeholder)[] = strToken.map((t)=>t.text)
        for(const [expr,strs] of exprs){
            parts.push(expr)
            parts.push(...strs.map((s)=>s.text))
        }
        return ["command",new Expr.String(toSourcePos(qs),parts,true)];
}))

const meta_string = rule<TokenKind,string>();
const meta_array = rule<TokenKind,Array<unknown>>();
const meta_object = rule<TokenKind,{[key:string]:unknown}>();
// meta_value
//   : MetaNull
//   | MetaBool
//   | MetaInt
//   | MetaFloat
//   | meta_string
//   | meta_object
//   | meta_array
//   ;
const meta_value = apply(
    alt(tok(TokenKind.MetaNull),
    tok(TokenKind.MetaBool),
    tok(TokenKind.MetaInt),
    tok(TokenKind.MetaFloat)
),(token)=>{
    switch(token.kind){
        case TokenKind.MetaNull:
            return null;
        case TokenKind.MetaBool:
            return "true" == token.text;
        case TokenKind.MetaInt:
            return parseInt(token.text);
            
    }
    return ""
})

// meta_string_part
//   : MetaStringPart*
//   ;
const meta_string_part = rep_sc(tok(TokenKind.MetaStringPart))

// meta_string
//   : MetaDquote meta_string_part MetaDquote
//   | MetaSquote meta_string_part MetaSquote
//   ;
meta_string.setPattern(apply(alt(
    seq(tok(TokenKind.MetaDquote),meta_string_part,tok(TokenKind.MetaDquote)),
    seq(tok(TokenKind.MetaSquote),meta_string_part,tok(TokenKind.MetaSquote)),
),([_1,parts,_2]):string=>{
    let str_literal = ""
    for(const part of parts){
        str_literal += part.text
    }
    return str_literal;
}))
// meta_array
//   : MetaEmptyArray
//   | MetaLbrack meta_value (MetaArrayComma meta_value)* (MetaArrayCommaRbrack | MetaRbrack)
const meta_array_p = apply(seq(
    tok(TokenKind.MetaLbrack),
    meta_value,
    rep_sc(seq(tok(TokenKind.MetaArrayComma),meta_value)),
    alt(tok(TokenKind.MetaArrayCommaRbrack),tok(TokenKind.MetaRbrack))),([_1,first,rest,_2]):Array<unknown>=>{
    return [first]
});
//   ;
meta_array.setPattern(apply(alt_sc(tok(TokenKind.MetaEmptyArray),meta_array_p),(value)=>{
    if(value instanceof Array){
        return value
    }else{
        return []
    }
}));
    
// meta_object_kv
//   : MetaObjectIdentifier MetaObjectColon meta_value
//   ;
const meta_object_kv = apply(
    seq(tok(TokenKind.MetaObjectIdentifier),tok(TokenKind.MetaObjectColon),meta_value),
    ([key,_,value]):[string,unknown]=>{
    return [key.text,value]
});
// meta_object
//   : MetaEmptyObject
//   | MetaLbrace meta_object_kv (MetaObjectComma meta_object_kv)* (MetaObjectCommaRbrace | MetaRbrace)
meta_object.setPattern(apply(
    seq(
        tok(TokenKind.MetaLbrace),meta_object_kv,
        rep_sc(seq(tok(TokenKind.MetaObjectComma),meta_object_kv)),alt(tok(TokenKind.MetaArrayCommaRbrack),tok(TokenKind.MetaRbrace))),
        ([_1,first,rest,_2]) =>{
            return Object.fromEntries([first,...rest.map(([_1,val])=>val)])
        }
    ));
//   ;


// meta_kv
//   : MetaIdentifier MetaColon meta_value
//   ;

// parameter_meta
//   : PARAMETERMETA BeginMeta meta_kv* EndMeta
//   ;
const parameter_meta = apply(
    seq(tok(TokenKind.PARAMETERMETA),rep(seq(tok(TokenKind.MetaIdentifier),meta_value)),tok(TokenKind.EndMeta)),
    ([_1,props]):['parameter_meta',{[key:string]:unknown}]=>{
        const ps = props.map(([key1,val])=>[key1.text,val]);
    return ['parameter_meta',Object.fromEntries(ps)]
});

// meta
//   :	META BeginMeta meta_kv* EndMeta
//   ;
const meta = apply(
    seq(tok(TokenKind.META),rep(seq(tok(TokenKind.MetaIdentifier),meta_value)),tok(TokenKind.EndMeta)),
    ([_1,props]):['meta',{[key:string]:unknown}]=>{
        const ps = props.map(([key1,val])=>[key1.text,val]);
    return ['meta',Object.fromEntries(ps)]
});
// task_runtime_kv
//   : Identifier COLON expr
//   ;

// task_runtime
//   : RUNTIME LBRACE (task_runtime_kv)* RBRACE
//   ;
export const task_runtime = apply(
    seq(tok(TokenKind.RUNTIME),tok(TokenKind.LBRACE),rep(seq(tok(TokenKind.Identifier),tok(TokenKind.COLON),expr)),tok(TokenKind.RBRACE)),
    ([_1,_2,props]):[string,{[key:string]:Expr.Base}]=>{
        const ps = props.map(([key1,_1,val])=>[key1.text,val]);
    return ['runtime',Object.fromEntries(ps)]
});



export const typeBase = rule<TokenKind, Type.Base>();
export const pairType= rule<TokenKind, Type.Pair>();
export const arrayType= rule<TokenKind, Type.WDLArray>();
export const mapType= rule<TokenKind, Type.Map>();

typeBase.setPattern(apply(alt_sc(
    tok(TokenKind.STRING),
    tok(TokenKind.FILE),
    tok(TokenKind.BOOLEAN),
    tok(TokenKind.INT),
    tok(TokenKind.FLOAT),
    pairType,
    arrayType,
    mapType
), (token):Type.Base => {
    if(token instanceof Type.Base){
        return token;
    }else{
        switch (token.kind) {
            case TokenKind.STRING:
                return new Type.String();
            case TokenKind.FILE:
                return new Type.File();
            case TokenKind.BOOLEAN:
                return new Type.Boolean();
            case TokenKind.INT:
                return new Type.Int();
            case TokenKind.FLOAT:
                return new Type.Float();
        }
    }
    throw new Error("unreachable");
}));

export const wdlType = lazy(()=>apply(
    seq(typeBase,opt(tok(TokenKind.OPTIONAL))),
    ([base,subType]):Type.Base => base.copy(subType !== undefined)))

arrayType.setPattern(apply(
    seq(
        tok(TokenKind.ARRAY),
        tok(TokenKind.LBRACK),
        wdlType,
        tok(TokenKind.RBRACK),
        opt(tok(TokenKind.PLUS))),  
    ([_1,_2,item,_3,nonempty]):Type.WDLArray => 
        new Type.WDLArray(item,false,nonempty!==undefined)))

pairType.setPattern(apply(
    seq(tok(TokenKind.PAIR),tok(TokenKind.LBRACK),wdlType,tok(TokenKind.COMMA),wdlType,tok(TokenKind.RBRACK)),  
    ([_1,_2,left,_3,right,__4]):Type.Pair => new Type.Pair(left,right)))

mapType.setPattern(apply(
    seq(
        tok(TokenKind.MAP),
        tok(TokenKind.LBRACK),
        wdlType,tok(TokenKind.COMMA),
        wdlType,tok(TokenKind.RBRACK)),  
    ([_1,_2,key,_3,value,__4]):Type.Map => new Type.Map([key,value])))
export const any_decls = rule<TokenKind, Tree.Decl>();
export const unbound_decls = rule<TokenKind, Tree.Decl>();
unbound_decls.setPattern(apply(seq(wdlType,tok(TokenKind.Identifier)),([wtype,ident])=>{
    return new Tree.Decl(toSourcePos(ident),wtype,ident.text)
}))
export const bound_decls = rule<TokenKind, Tree.Decl>();
bound_decls.setPattern(apply(seq(wdlType,tok(TokenKind.Identifier),tok(TokenKind.EQUAL),expr),([wtype,ident,_,expr])=>{
    return new Tree.Decl(toSourcePos(ident),wtype,ident.text,expr)
}))
any_decls.setPattern(alt_sc(bound_decls, unbound_decls));
export const task_input = rule<TokenKind, [string,Tree.Decl[]]>();
task_input.setPattern(apply(seq(tok(TokenKind.INPUT),tok(TokenKind.LBRACE),rep_sc(any_decls),tok(TokenKind.RBRACE)),([_1,_2,inputs,_3])=>["input",inputs]))

export const task_output = rule<TokenKind, [string,Tree.Decl[]]>();
task_output.setPattern(apply(seq(tok(TokenKind.OUTPUT),tok(TokenKind.LBRACE),rep_sc(bound_decls),tok(TokenKind.RBRACE)),([_1,_2,output,_3])=>["output",output]))

const task_noninput_decl = apply(bound_decls,(dec):[string,Tree.Decl]=>['noninput',dec])
export const task_element = alt_sc(
    task_command,
    task_input,
    task_output,
    meta,
    parameter_meta,
    task_noninput_decl,
    task_runtime
);

export const task = apply(
    seq(tok(TokenKind.TASK),tok(TokenKind.Identifier),tok(TokenKind.LBRACE),rep_sc(task_element),tok(TokenKind.RBRACE)),
    ([_1,ident,_2,elements,_3])=>{
        console.log(`ident=${ident}`)
        let inputs: Tree.Decl[] | null = null
        let outputs: Tree.Decl[] = []
        let command: Expr.String| undefined = undefined
        let meta: {[key:string]:unknown} = {}
        let parameter_meta: {[key:string]:unknown} = {}
        let runtime: {[key:string]:Expr.Base} = {}
        for(const [key,element] of elements){
            console.log(`key='${key}'`)
            console.log(`element='${element}'`)
            switch(key){
                case "input":
                    inputs = element as Tree.Decl[]
                    break;
                case "noninput":
                    inputs?.push(element as Tree.Decl)
                    break;
                case "output":
                    outputs = element as Tree.Decl[]
                    break;
                case "command":
                    command = element as Expr.String;
                    console.log(`command=${command}`)
                    break;
                 case "meta":
                    meta = element as {[key:string]:unknown};
                 break;
                 case "parameter_meta":
                    parameter_meta = element as {[key:string]:unknown};
                 break;
                 case "runtime":
                    runtime = element as {[key:string]:Expr.Base};
                 break;
            }
        }
        if(!command){
            throw new Error("command not found")
        }
    return new Tree.Task(toSourcePos(ident),ident.text,inputs,[],command,outputs,parameter_meta,runtime,meta);
});

// call_alias
//   : AS Identifier
//   ;

// call_input
//   : Identifier (EQUAL expr)?
//   ;
const call_input = apply(seq(tok(TokenKind.Identifier),opt_sc(seq(tok(TokenKind.EQUAL),expr))),
([ident,expr]):[string,Expr.Base]=>{
    if(expr){
        return [ident.text,expr[1]];
    }else{
        const e = new Expr.Get(toSourcePos(ident),
        new Expr.Ident(toSourcePos(ident),ident.text),null);
        return [ident.text,e]
    }
});

// call_inputs
//   : INPUT COLON (call_input (COMMA call_input)* COMMA?)* / for wdl 1.1
//   ;
// call_inputs
//   : (call_input (COMMA call_input)* COMMA?)* / for wdl 1.2
//   ;
const call_inputs = apply(seq(list_sc(call_input,tok(TokenKind.COMMA)),opt(tok(TokenKind.COMMA))),([inputs])=>inputs);

// call_body
//   : LBRACE call_inputs? RBRACE
//   ;
const call_body = kmid(tok(TokenKind.LBRACE), call_inputs, tok(TokenKind.RBRACE))

// call_after
//   : AFTER Identifier
//   ;
const call_after = kright(tok(TokenKind.AFTER), tok(TokenKind.Identifier))

// call_name
//   : Identifier (DOT Identifier)*
//   ;
const call_name = apply(list_sc(tok(TokenKind.Identifier),tok(TokenKind.DOT)),(tokens)=>tokens.map((token)=>token.text));

// call
//   : CALL call_name call_alias? (call_after)*  call_body?
//   ;
export const call = apply(
    seq(
        tok(TokenKind.CALL),
        call_name,
        opt(kright(tok(TokenKind.AS),tok(TokenKind.Identifier))),
        rep_sc(call_after),
        opt(call_body)),
    ([c,name,alias,after,body])=>{
        const afters = after.map((a)=>a.text)
        return new Tree.Call(toSourcePos(c),name,alias?alias.text:null,body?Object.fromEntries(body):{},afters)
    }
);

const scatter = rule<TokenKind,Tree.Scatter>();
const conditional = rule<TokenKind,Tree.Conditional>();
// inner_workflow_element
//   : bound_decls
//   | call
//   | scatter
//   | conditional
//   ;
const inner_workflow_element = alt_sc(bound_decls,call,scatter,conditional)
// scatter
//   : SCATTER LPAREN Identifier In expr RPAREN LBRACE inner_workflow_element* RBRACE
//   ;
scatter.setPattern(apply(
    seq(tok(TokenKind.SCATTER),tok(TokenKind.LPAREN),
    tok(TokenKind.Identifier),tok(TokenKind.In),expr,tok(TokenKind.LBRACE),rep_sc(inner_workflow_element),tok(TokenKind.RBRACE)),
([_1,_2,variable,_3,expr1,_4,elems])=>{
    return new Tree.Scatter(toSourcePos(variable),variable.text,expr1,elems)}
));
// conditional
//   : IF LPAREN expr RPAREN LBRACE inner_workflow_element* RBRACE
//   ;
conditional.setPattern(apply(
    seq(tok(TokenKind.IF),tok(TokenKind.LPAREN),
    expr,tok(TokenKind.RPAREN),tok(TokenKind.LBRACE),rep_sc(inner_workflow_element),tok(TokenKind.RBRACE)),
([ifToken,_2,expr1,_3,_4,elems])=>{
    return new Tree.Conditional(toSourcePos(ifToken),expr1,elems)}
));

// workflow_input
//   : INPUT LBRACE (any_decls)* RBRACE
//   ;
export const workflow_input = apply(seq(tok(TokenKind.INPUT),tok(TokenKind.LBRACE),rep_sc(any_decls),tok(TokenKind.RBRACE)),
    ([_1,_2,decls]):['inputs',Tree.Decl[]]=>{
    return ['inputs',decls];
});
// workflow_output
//   : OUTPUT LBRACE (bound_decls)* RBRACE
//   ;
const workflow_output = apply(seq(tok(TokenKind.INPUT),tok(TokenKind.LBRACE),rep_sc(bound_decls),tok(TokenKind.RBRACE)),
    ([_1,_2,decls]):['outputs',Tree.Decl[]]=>{
    return ['outputs',decls];
});
export const inner_element = apply(inner_workflow_element,(token):['elements',Tree.WorkflowNode]=>['elements',token])
// workflow_element
//   : workflow_input #input
//   | workflow_output #output
//   | inner_workflow_element #inner_element
//   | parameter_meta #parameter_meta_element
//   | meta #meta_element
//   ;
export const workflow_element = alt_sc(workflow_input,workflow_output,inner_element,parameter_meta,meta)

// workflow
//   : WORKFLOW Identifier LBRACE workflow_element* RBRACE
//   ;
export const workflow =  apply(seq(tok(TokenKind.WORKFLOW),tok(TokenKind.Identifier),tok(TokenKind.LBRACE),rep_sc(workflow_element),tok(TokenKind.RBRACE)),
    ([_1,name,_2,elements])=>{
        const inputs: Tree.Decl[] = []
        const outputs: Tree.Decl[] = []
        const body : Tree.WorkflowNode[] = []
        let meta: {[key:string]:unknown} = {}
        let parameter_meta: {[key:string]:unknown} = {}
        for(const [key,value] of elements){
            switch(key){
                case "inputs":
                    inputs.push(...value)
                    break;
                case "outputs":
                    outputs.push(...value)
                    break;
                case "elements":
                    body.push(value)
                    break;
                case "parameter_meta":
                    parameter_meta = value
                    break;
                case "meta":
                    meta = value
                    break;
            }
        }
        return new Tree.Workflow(toSourcePos(name),name.text,inputs,body,outputs,parameter_meta,meta)
    })
//     version
//     : VERSION ReleaseVersion
//     ;
const version = kright(tok(TokenKind.VERSION),tok(TokenKind.ReleaseVersion))

//   import_alias
//     : ALIAS Identifier AS Identifier
//     ;
const import_alias = apply(seq(tok(TokenKind.ALIAS),tok(TokenKind.Identifier),tok(TokenKind.AS),tok(TokenKind.Identifier)),([_1,alias,_2,ident]):[string,string]=>{
    return [alias.text,ident.text]
})  
//   import_as
//     : AS Identifier
//     ;
const import_as = kright(tok(TokenKind.AS),tok(TokenKind.Identifier))
  
//   import_doc
//     : IMPORT string import_as? (import_alias)*
//     ;
const import_doc = apply(seq(tok(TokenKind.IMPORT),string,opt_sc(import_as),rep_sc(import_alias)),([_1,str,as,aliases])=>{
    const namespace = str.literal?.toString() || ""
    const importDoc:Tree.DocImport = {
        pos: str.pos,
        namespace: namespace,
        uri: namespace,
        aliases: aliases,
        doc: null,
    }
    return importDoc;
});
  
//   struct
//     : STRUCT Identifier LBRACE (unbound_decls)* RBRACE
//     ;
const struct = apply(seq(tok(TokenKind.STRUCT),tok(TokenKind.Identifier),tok(TokenKind.LBRACE),rep_sc(unbound_decls),tok(TokenKind.RBRACE)),
([_1,name,_2,decls])=> {
    const defs = Object.fromEntries(decls.map((decl)=> [decl.name,decl.type]))
    return new Tree.StructTypeDef(toSourcePos(name),name.text,defs)
})

// document_element
//   : import_doc
//   | struct
//   | task
//   ;
const document_element = alt_sc(import_doc,struct,task)
// document
//   : version document_element* (workflow document_element*)? EOF
//   ;
export function parseDocument(document_str:string){
    const tokens: Token<TokenKind>| undefined = getTokens(new CharStreamImpl(document_str));
    const document = apply(seq(version,rep_sc(document_element),opt_sc(seq(workflow,rep_sc(document_element)))),
    ([ver,docelm1,wf])=>{
        const elements = docelm1;
        const imports : Tree.DocImport[] = []
        const decls : Tree.Decl[] = []
        const tasks : Tree.Task[] = []
        const struct_typedefs: {[key:string]:Tree.StructTypeDef} = {}
        let workflow: Tree.Workflow | null = null;
        if(wf){
            const [w,el2] = wf;
            workflow = w;
            elements.push(...el2)
        }
        for(const elm of elements){
            if(elm instanceof Tree.Decl){
                decls.push(elm);
            }else if(elm instanceof Tree.StructTypeDef){
                struct_typedefs[elm.name] = elm;
            }else if(elm instanceof Tree.Task){
                tasks.push(elm);
            }else{
                imports.push(elm)
            }
        }
        return new Tree.Document(document_str,toSourcePos(ver),imports,struct_typedefs,tasks,workflow,[],ver.text)
    })
    const doc = expectSingleResult(expectEOF(document.parse(tokens)))
    return doc
}
