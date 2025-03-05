const { bold } = require("./elements/inline/bold");
const { lexer } = require("./lexer");

function main() {
  let markdown = `**bold** **bold a**`;
  lexer(markdown);
}

main();
