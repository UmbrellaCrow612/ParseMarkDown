const { bold } = require("./elements/inline/bold");
const { lexer } = require("./lexer");

function main() {
  let markdown = `**bold** *italic* __bold__ _italic_ ***bold and italic***`;
  lexer(markdown);
}

main();
