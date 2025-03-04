const { lexer } = require("./lexer");

function main() {
  let markdown = `Hello world **bold**`;
  lexer(markdown);
}

main();
