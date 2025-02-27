const { heading } = require("./elements/headings");

/**
 *
 * @param {string} markdown markdown as string
 */
function tokenizer(markdown) {
  const tokens = [];

  for (let i = 0; i < markdown.length; ) {
    if (heading.simpleHeading.isHeading(i, markdown)) {
      let { content, level } = heading.simpleHeading.extractHeading(
        i,
        markdown
      );
      tokens.push({
        content,
        level,
      });
      i = heading.simpleHeading.movePastHeading(i, markdown);
    } else {
      i++;
    }
  }

  console.log(tokens);

  return tokens;
}

module.exports = {
  tokenizer,
};
