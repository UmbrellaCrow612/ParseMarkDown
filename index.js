const { tokenizer } = require("./tokenizer");

function main() {
  let markdown = `
           
                       
                        
                       
                code one
  `;
  tokenizer(markdown);
}

main();
