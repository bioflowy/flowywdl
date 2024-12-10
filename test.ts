async function example():Promise<string> {
    const decoder = new TextDecoder("utf-8");
    const content = await Deno.readFile("deno.json")
    const text = decoder.decode(content);
    return text
}
  
  // これはエラーとして検出される
  example();  // Promise result is not handled
  
  // 正しい使用法
const content =   await example();
console.log(content)