import {
    alt,
    apply,
    seq,
    tok,
    lazy,
    Token,
    alt_sc,
  } from "typescript-parsec";
  import { Parser } from "typescript-parsec/build/lib/Parser";
  
  // トークンの型を定義
  type Token = "NUMBER" | "PLUS" | "MULTIPLY";
  
  // ASTの型を定義
  type Expression =
    | { type: "BinaryExpression"; operator: "+" | "*"; left: Expression; right: Expression }
    | { type: "NumberLiteral"; value: number };
  

let Multiplicative = Parser.create<Token, number>();
let Additive = Parser.create<Token, number>();
  // パーサーのルールを定義
Additive = lazy(()=>
    apply(alt_sc(
        seq(Multiplicative, tok("PLUS"), Additive),
        Multiplicative
    ), (tokens) => 0),
);
  const Lang = createLanguage({
    Expression: (r) =>
      alt(r.Additive),
  
    Additive: (r) =>
      ,
  
    Multiplicative: (r) =>
      alt(
        apply(seq(r.Primary, tok("MULTIPLY"), r.Multiplicative), ([left, , right]) => ({
          type: "BinaryExpression",
          operator: "*",
          left,
          right,
        })),
        r.Primary
      ),
  
    Primary: (r) =>
      apply(tok("NUMBER"), (value) => ({
        type: "NumberLiteral",
        value: parseInt(value.text),
      })),
  });
  
  // 数式を評価する関数
  function evaluate(ast: Expression): number {
    switch (ast.type) {
      case "BinaryExpression":
        if (ast.operator === "+") {
          return evaluate(ast.left) + evaluate(ast.right);
        } else if (ast.operator === "*") {
          return evaluate(ast.left) * evaluate(ast.right);
        }
      case "NumberLiteral":
        return ast.value;
    }
  }
  
  // テスト
  const source = "2+3*4"; // 2 + (3 * 4) = 14
  const result = Lang.Expression.parse(lexer.parse(source));
  if (result.successful) {
    console.log("Parsed AST:", result.candidate);
    console.log("Evaluation result:", evaluate(result.candidate));
  } else {
    console.error("Parse error:", result.error.toString());
  }
  