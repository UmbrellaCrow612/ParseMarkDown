const { tokenizer } = require("./tokenizer");

function main() {
  let markdown = `
  # Heading one
  ## Heading two
  ### Heading three
  #### Heading four
  ##### Heading five
  ###### Heading six 
  none
  `;
  tokenizer(markdown);
}

main();
