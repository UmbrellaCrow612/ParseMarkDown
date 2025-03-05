const { bold } = require("./elements/inline/bold");
const { lexer } = require("./lexer");

function main() {
  let markdown = `~~Strikethrough~~ ~~Strikethrough~~`;
  lexer(markdown);
}

main();
