const { bold } = require("./elements/inline/bold");
const { lexer } = require("./lexer");

function main() {
  let markdown = `content ***bold and italic*** __bold with underscores__ ***bold and italic 2*** \`code block yay\``;
  lexer(markdown);
}

main();
