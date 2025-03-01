const { tokenizer } = require("./tokenizer");

function main() {
  let markdown = `

- Regular list
  - Sub list
* Regular list
  * Sub list
+ Regular list
  + Sub list
  + Sub list
  `;
  tokenizer(markdown);
}

main();
