const { tokenizer } = require("./tokenizer");

function main() {
  let markdown = `~~~js  
block code 
more code 
more code 
~~~
# Heading
~~~python
code bloc two
~~~`;
  tokenizer(markdown);
}

main();
