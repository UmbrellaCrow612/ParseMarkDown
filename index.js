const { bold } = require("./elements/inline/bold");
const { lexer } = require("./lexer");

function main() {
  let markdown = `**bold dindwnd**`;
  lexer(markdown);
}

main();
