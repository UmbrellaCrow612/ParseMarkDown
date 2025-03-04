const { tokenizer } = require("./tokenizer");

function main() {
  let markdown = `# Heading one
  ## Heading two
  ### Heading three 
  #### Heading four
  ##### heading five
  ###### Heading six


    

  Set
  ---
  set two
  ====
# Heading trail #
  `;
  tokenizer(markdown);
}

main();
