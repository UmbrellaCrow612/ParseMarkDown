const { tokenizer } = require("./tokenizer");

function main() {
  let markdown = `
> Hello
owenonewc
# Heading one
#Failed heading
sex
-----
s two
=====
s broken
-dded
>> Block quote
> Block quote
  `;
  tokenizer(markdown);
}

main();
