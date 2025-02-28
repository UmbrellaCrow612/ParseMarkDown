const { heading } = require("./elements/headings");
const { elementTypes } = require("./elements/types");

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
        type: elementTypes.heading,
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
