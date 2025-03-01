const { tokenizer } = require("./tokenizer");

function main() {
  let markdown = `
------- 
   *******
   ______
 

  `;
  tokenizer(markdown);
}

main();
