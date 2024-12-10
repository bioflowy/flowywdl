import {tok,apply,alt_sc,seq, opt,lazy,Token, alt, rep_sc, opt_sc, rule, lrec_sc} from "typescript-parsec";
import { TokenKind } from "../lexer.ts";
import * as Expr from '../expr.ts';
import { toSourcePos } from "./utils.ts";

// Literals
export const expr = rule<TokenKind, Expr.Base>();
export const string = rule<TokenKind, Expr.String>();
export const number = rule<TokenKind, Expr.Base>();

// expression_placeholder_option
//  : BoolLiteral EQUAL string
//  | DEFAULTEQUAL (string | number)
//  | SEPEQUAL string
//  ;
const booleanOption = apply(seq(tok(TokenKind.BoolLiteral),tok(TokenKind.EQUAL),string),
    ([key,_2,str]):[string,Expr.String]=>{
    return [key.text,str]
})
const defaultOption = apply(seq(tok(TokenKind.DEFAULTEQUAL),string),
    ([_,str]):[string,Expr.String]=>{
    return ["default",str]
})
const sepEqualOption = apply(seq(tok(TokenKind.SEPEQUAL),string),
    ([_,str]):[string,Expr.String]=>{
    return ["sep",str]
})
export const expression_placeholder_option = alt_sc(booleanOption,defaultOption,sepEqualOption);

//string_part
//  : StringPart*
//  ;
export const string_part = rep_sc(tok(TokenKind.StringPart))


// string_expr_part
//   : StringCommandStart (expression_placeholder_option)* expr RBRACE
//   ;
export const string_expr_part = apply(
    seq(tok(TokenKind.StringCommandStart),rep_sc(expression_placeholder_option),expr,tok(TokenKind.RBRACE)),([start,options,expr])=>{
        const ops:{[key:string]:string} ={}
        for(const [key,str] of options){
            ops[key] = str.literal?.value as string
        }
        return new Expr.Placeholder(toSourcePos(start),ops,expr)
});

// string_expr_with_string_part
//   : string_expr_part string_part
//   ;
export const string_expr_with_string_part = seq(string_expr_part,string_part)

// string
//   : DQUOTE string_part string_expr_with_string_part* DQUOTE
//   | SQUOTE string_part string_expr_with_string_part* SQUOTE
//   ;
string.setPattern(apply(
    alt_sc(
    seq(tok(TokenKind.DQUOTE),string_part,rep_sc(string_expr_with_string_part),tok(TokenKind.DQUOTE)),
    seq(tok(TokenKind.SQUOTE),string_part,rep_sc(string_expr_with_string_part),tok(TokenKind.SQUOTE))),
    ([qs,strToken,exprs,qe]):Expr.String => {
        const parts:(string|Expr.Placeholder)[] = []
        parts.push(qs.text);
        parts.push(...strToken.map((s)=>s.text));
        for(const [expr,strs] of exprs){
            parts.push(expr)
            parts.push(...strs.map((s)=>s.text))
        }
        parts.push(qe.text);
        return new Expr.String(toSourcePos(qs),parts);
}))

// primitive_literal
//   : BoolLiteral
//   | number
//   | string
//   | NONELITERAL
//   | Identifier
//   ;
export const primitiveLiteral = apply(alt_sc(
    tok(TokenKind.BoolLiteral),
    number,
    string,
    tok(TokenKind.NONELITERAL),
    tok(TokenKind.Identifier),
),
    (token):Expr.Base => {
        if(token instanceof Expr.Base){
            // string | number
            return token;
        }else{
            // BoolLiteral | NONELITERAL | Identifier
            switch(token.kind){
                case TokenKind.BoolLiteral:
                    return new Expr.BooleanLiteral(toSourcePos(token),token.text === "true");
                case TokenKind.Identifier:
                    // why primitive_literal has identifier ?
                    return new Expr.Get(toSourcePos(token),new Expr.Ident(toSourcePos(token),token.text),null);
                case TokenKind.NONELITERAL:
                    return new Expr.Null(toSourcePos(token));
                    }
        }
        throw new Error("unexpected")
    })



number.setPattern(apply(alt_sc(
    tok(TokenKind.IntLiteral),
    tok(TokenKind.FloatLiteral)),
    (token):Expr.Base => {
        token.pos
        if(token.kind === TokenKind.IntLiteral){
            return new Expr.IntLiteral(toSourcePos(token),parseInt(token.text));
        }else{
            return new Expr.FloatLiteral(toSourcePos(token),parseFloat(token.text));
        }
    }));

export const infix: Record<string, string> = {
    "*":"_mul",
    "/":"_div" ,
    "%":"_rem" ,
    "+":"_add" ,
    "-":"_sub" ,
    "<":"_lt" ,
    "<=":"_lte" ,
    ">":"_gt" ,
    ">=":"_gte" ,
    "==":"_eqeq" ,
    "!=": "_neq" ,
    "&&":"_land" ,
    "||":"_lor"  ,
};
function applyBinary(lhs:Expr.Base,rhs:[Token<TokenKind>,Expr.Base]):Expr.Base{
    
    const op2 = infix[rhs[0].text];
    return new Expr.Apply(toSourcePos(rhs[0]),op2,[lhs,rhs[1]]);
}

 export const exprCore = rule<TokenKind, Expr.Base>();
export const exprInfix0 = rule<TokenKind, Expr.Base>();
export const exprInfix1 = rule<TokenKind, Expr.Base>();
export const exprInfix2 = rule<TokenKind, Expr.Base>();
export const exprInfix3 = rule<TokenKind, Expr.Base>();
export const exprInfix4 = rule<TokenKind, Expr.Base>();

// expr
//   : expr_infix
//   ;

// expr_infix
//   : expr_infix0 #infix0
//   ;

// expr_infix0
//   : expr_infix0 OR expr_infix1 #lor
//   | expr_infix1 #infix1
//   ;
exprInfix0.setPattern(lrec_sc(exprInfix1,
    seq(tok(TokenKind.OR),exprInfix1),applyBinary))

// expr_infix1
//   : expr_infix1 AND expr_infix2 #land
//   | expr_infix2 #infix2
//   ;
exprInfix1.setPattern(lrec_sc(exprInfix2,
    seq(tok(TokenKind.OR),exprInfix2),applyBinary))

// expr_infix2
//   : expr_infix2 EQUALITY expr_infix3 #eqeq
//   | expr_infix2 NOTEQUAL expr_infix3 #neq
//   | expr_infix2 LTE expr_infix3 #lte
//   | expr_infix2 GTE expr_infix3 #gte
//   | expr_infix2 LT expr_infix3 #lt
//   | expr_infix2 GT expr_infix3 #gt
//   | expr_infix3 #infix3
//   ;
exprInfix2.setPattern(lrec_sc(exprInfix4,
    seq(alt(tok(TokenKind.EQUALITY),tok(TokenKind.NOTEQUAL),tok(TokenKind.LTE),tok(TokenKind.GTE),tok(TokenKind.GT),tok(TokenKind.LT)),exprInfix4),applyBinary))

// expr_infix3
//   : expr_infix3 PLUS expr_infix4 #add
//   | expr_infix3 MINUS expr_infix4 #sub
//   | expr_infix4 #infix4
//   ;
exprInfix3.setPattern(lrec_sc(exprInfix4,
    seq(alt(tok(TokenKind.MINUS),tok(TokenKind.PLUS)),exprInfix4),applyBinary))

// expr_infix4
//   : expr_infix4 STAR expr_infix5 #mul
//   | expr_infix4 DIVIDE expr_infix5 #divide
//   | expr_infix4 MOD expr_infix5 #mod
//   | expr_infix5 #infix5
//   ;
// expr_infix5
//   : expr_core
//   ;
exprInfix4.setPattern(lrec_sc(exprCore,
    seq(alt(tok(TokenKind.STAR),tok(TokenKind.DIVIDE),tok(TokenKind.MOD)),exprCore),applyBinary))






// member
//   : Identifier
//   ;

// expr_core
//   : Identifier LPAREN (expr (COMMA expr)* COMMA?)? RPAREN #apply
//   | LBRACK (expr (COMMA expr)* COMMA?)* RBRACK #array_literal
//   | LPAREN expr COMMA expr RPAREN #pair_literal
//   | LBRACE (expr COLON expr (COMMA expr COLON expr)* COMMA?)* RBRACE #map_literal
//   | OBJECTLITERAL LBRACE (member COLON expr (COMMA member COLON expr)* COMMA?)* RBRACE #object_literal
//   | Identifier LBRACE (member COLON expr (COMMA member COLON expr)* COMMA?)* RBRACE #struct_literal
//   | IF expr THEN expr ELSE expr #ifthenelse
//   | LPAREN expr RPAREN #expression_group
//   | expr_core LBRACK expr RBRACK #at
//   | expr_core DOT Identifier #get_name
//   | NOT expr #negate
//   | (PLUS | MINUS) expr #unarysigned
//   | primitive_literal #primitives
//   | Identifier #left_name
//   ;

export const leftName = lazy(()=>apply(
    tok(TokenKind.Identifier),
    (token):Expr.Base => {
        return new Expr.Get(toSourcePos(token),new Expr.LeftName(toSourcePos(token),token.text),null);
    }
));
export const mapMemberArgs = lazy(()=>apply(
    seq(expr,tok(TokenKind.COLON),expr,
    rep_sc(seq(tok(TokenKind.COMMA),expr,tok(TokenKind.COLON),expr)),opt(tok(TokenKind.COMMA))),
    ([key,_1,value,rest]):[Expr.Base,Expr.Base][] => {
        const args:[Expr.Base,Expr.Base][] = [[key,value]];
        for(const [_1,key,_2,value] of rest){
            args.push([key,value]);
        }
        new Expr.Map(toSourcePos(_1),args);
        return args;
    }
))

const applyArgs = lazy(()=>apply(
    seq(expr,rep_sc(seq(tok(TokenKind.COMMA),expr)),opt(tok(TokenKind.COMMA))),
    ([first,rest,comma]):Expr.Base[] => {
        const args = [first];
        for(const [_,arg] of rest){
            args.push(arg);
        }
        return args;
    }
))
export const applyExpr = lazy(()=>
    apply(
        seq(tok(TokenKind.Identifier),tok(TokenKind.LPAREN),opt_sc(applyArgs),tok(TokenKind.RPAREN)),
        ([name,_l,args,_r]):Expr.Base => new Expr.Apply(toSourcePos(name),name.text,args?args:[]))
);
export const arrayLiteral = lazy(()=>
    apply(
        seq(tok(TokenKind.LBRACK),opt_sc(applyArgs),tok(TokenKind.RBRACK)),
        ([_1,args,_2]):Expr.Base => new Expr.Array(toSourcePos(_1),args?args:[]))
    )
export const mapLiteral = lazy(()=>
    apply(
        seq(tok(TokenKind.LBRACE),opt_sc(mapMemberArgs),tok(TokenKind.RBRACE)),
        ([_1,args,_2]):Expr.Base => new Expr.Map(toSourcePos(_1),args?args:[]))
    )
export const pairLiteral = lazy(()=>
apply(
    seq(tok(TokenKind.LPAREN),expr,tok(TokenKind.COMMA),expr,tok(TokenKind.RPAREN)),
    ([_1,left,_2,right,_3]):Expr.Base => new Expr.Pair(toSourcePos(_1),left,right))
)
    export const ifThenElse = lazy(()=>
    apply(
        seq(tok(TokenKind.IF),expr,tok(TokenKind.THEN),expr,tok(TokenKind.ELSE),expr),
        ([_1,cond,_2,then,_3,elseExpr]):Expr.Base => new Expr.IfThenElse(toSourcePos(_1),cond,then,elseExpr))
    )
const negate = lazy(()=>
apply(
    seq(tok(TokenKind.NOT),expr),
    ([_1,expr]):Expr.Base => new Expr.Apply(toSourcePos(_1),"_negate",[expr]))
);
const exprGroup = lazy(()=>
apply(
    seq(tok(TokenKind.LPAREN),expr,tok(TokenKind.RPAREN)),
    ([_1,expr,_2]):Expr.Base => expr)
);
    
expr.setPattern(apply(exprInfix2,(expr):Expr.Base => expr));

const exprCoreLeft = lazy(()=>apply(alt_sc(
    applyExpr,
    arrayLiteral,
    pairLiteral,
    mapLiteral,
    ifThenElse,
    negate,
    exprGroup,
    primitiveLiteral,
    leftName
), (expr):Expr.Base => expr));
exprCore.setPattern(apply(
    seq(exprCoreLeft,
        opt_sc(alt_sc(
            seq(tok(TokenKind.DOT),tok(TokenKind.Identifier)),
            seq(tok(TokenKind.LBRACK),expr,tok(TokenKind.RBRACK)),
        ))),
    ([left,right]):Expr.Base => {
        if(right){
            const t = right[0];
            if(t.kind === TokenKind.DOT){
                const ident = right[1]  as Token<TokenKind>;
                return new Expr.Get(toSourcePos(right[0]),left,ident.text);
            }else{
                const idx = right[1] as Expr.Base;
                return new Expr.Apply(toSourcePos(right[0]),"_at",[left,idx]);
            }
        }else{
            return left;
        }
    }
));
