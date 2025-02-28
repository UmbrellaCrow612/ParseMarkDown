const { tokenizer } = require("./tokenizer");

function main() {
  let markdown = ` ## Hello ##
  ### Heading three
  # Heading one 
  ## Heading two
  wndnew
  `;
  tokenizer(markdown);
}

main();
