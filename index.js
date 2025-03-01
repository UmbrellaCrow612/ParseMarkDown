const { tokenizer } = require("./tokenizer");

function main() {
  let markdown = `
> Hello
owenonewc
# Heading one
#Failed heading
s
-----
s two
=====
s broken
-dded
>> Block quote
> Block quote
- List one
+ List one
* List one
1. List one
  `;
  tokenizer(markdown);
}

main();
