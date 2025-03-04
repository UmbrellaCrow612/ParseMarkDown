const { tokenizer } = require("./tokenizer");

function main() {
  let markdown = `---
odoned
sex head
----
sex head
=====`;
  tokenizer(markdown);
}

main();
