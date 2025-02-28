const { tokenizer } = require("./tokenizer");

function main() {
  let markdown = `
1
---
iwnndwdw
---
qwdmnqd
====
2
3`;
  tokenizer(markdown);
}

main();
