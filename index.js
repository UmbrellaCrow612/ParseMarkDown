const { tokenizer } = require("./tokenizer");

function main() {
  let markdown = `# Heading one
My name if joe my fav stuff is:
- Go to gym
  - In gym sub`;
  tokenizer(markdown);
}

main();
