const { bold } = require("./elements/inline/bold");
const { lexer } = require("./lexer");

function main() {
  let markdown = `*it* _it_ *it2 words* **bold** * _it_ __bold__`;
  lexer(markdown);
}

main();
