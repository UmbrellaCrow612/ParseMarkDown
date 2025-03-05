const { bold } = require("./elements/inline/bold");
const { lexer } = require("./lexer");

function main() {
  let markdown = `[link text](link url)`;
  lexer(markdown);
}

main();
