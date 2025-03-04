const { lexer } = require("./lexer");

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
  lexer(markdown);
}

main();
