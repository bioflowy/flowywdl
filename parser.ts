import * as Type from './type.ts';
import * as Expr from './expr.ts';
import * as WDLError from './error.ts';
import {tok,apply,alt_sc,seq, opt,lazy,Token, alt, rep_sc, opt_sc, rule, lrec_sc} from "typescript-parsec";
import { TokenKind } from "./lexer.ts";

function toSourcePos(token:Token<unknown>):WDLError.SourcePosition{
    const p = token.pos;
    return {
        uri: "",
        abspath: "",
        line: p.rowBegin,
        column: p.columnBegin,
        end_line: p.rowEnd,
        end_column: p.columnEnd
    }
};
export const string = apply(
    alt_sc(
    seq(tok(TokenKind.DQUOTE),tok(TokenKind.StringPart),tok(TokenKind.DQUOTE)),
    seq(tok(TokenKind.SQUOTE),tok(TokenKind.StringPart),tok(TokenKind.SQUOTE))),
    ([qs,strToken,qe]):Expr.StringLiteral => {
        return new Expr.StringLiteral(toSourcePos(strToken),[strToken.text]);
})
export const number = apply(alt_sc(
    tok(TokenKind.IntLiteral),
    tok(TokenKind.FloatLiteral)),
    (token):Expr.Base => {
        token.pos
        if(token.kind === TokenKind.IntLiteral){
            return new Expr.IntLiteral(toSourcePos(token),parseInt(token.text));
        }else{
            return new Expr.FloatLiteral(toSourcePos(token),parseFloat(token.text));
        }
    })
    ;
export const primitiveLiteral = apply(alt_sc(
    tok(TokenKind.BoolLiteral),
    number,
    string),
    (token):Expr.Base => {
        if(token instanceof Expr.Base){
            return token;
        }else{
            return new Expr.BooleanLiteral(toSourcePos(token),token.text === "true");
        }
    })
export const expr = rule<TokenKind, Expr.Base>();
export const exprCore = rule<TokenKind, Expr.Base>();
export const exprInfix0 = rule<TokenKind, Expr.Base>();
export const exprInfix1 = rule<TokenKind, Expr.Base>();
export const exprInfix2 = rule<TokenKind, Expr.Base>();
export const exprInfix3 = rule<TokenKind, Expr.Base>();
export const exprInfix4 = rule<TokenKind, Expr.Base>();
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
exprInfix2.setPattern(lrec_sc(exprInfix4,
    seq(alt(tok(TokenKind.EQUALITY),tok(TokenKind.NOTEQUAL),tok(TokenKind.LTE),tok(TokenKind.GTE),tok(TokenKind.GT),tok(TokenKind.LT)),exprInfix4),applyBinary))
exprInfix2.setPattern(lrec_sc(exprInfix4,
    seq(alt(tok(TokenKind.EQUALITY),tok(TokenKind.NOTEQUAL),tok(TokenKind.LTE),tok(TokenKind.GTE),tok(TokenKind.GT),tok(TokenKind.LT)),exprInfix4),applyBinary))
exprInfix2.setPattern(lrec_sc(exprInfix4,
    seq(alt(tok(TokenKind.EQUALITY),tok(TokenKind.NOTEQUAL),tok(TokenKind.LTE),tok(TokenKind.GTE),tok(TokenKind.GT),tok(TokenKind.LT)),exprInfix4),applyBinary))
exprInfix3.setPattern(lrec_sc(exprInfix4,
    seq(alt(tok(TokenKind.MINUS),tok(TokenKind.PLUS)),exprInfix4),applyBinary))
exprInfix4.setPattern(lrec_sc(exprCore,
    seq(alt(tok(TokenKind.STAR),tok(TokenKind.DIVIDE),tok(TokenKind.MOD)),exprCore),applyBinary))
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
