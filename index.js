const { tokenizer } = require("./tokenizer");

function main() {
  let markdown = `
    Code block One
    Code block two
    Code block three
  `;
  tokenizer(markdown);
}

main();
