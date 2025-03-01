const { tokenizer } = require("./tokenizer");

function main() {
  let markdown = `-- Not valid`;
  tokenizer(markdown);
}

main();
