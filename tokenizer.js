const { heading } = require("./elements/headings");
const { elementTypes } = require("./elements/types");

/**
 *
 * @param {string} markdown markdown as string
 */
function tokenizer(markdown) {
  const tokens = [];

  for (let i = 0; i < markdown.length; ) {
    switch (true) {
      case heading.headingWithTrailingHashes.isHeading(i, markdown):
        let result = heading.headingWithTrailingHashes.extractHeading(
          i,
          markdown
        );
        tokens.push({ ...result, type: elementTypes.heading });
        i = heading.headingWithTrailingHashes.movePastHeading(i, markdown);
        break;

      case heading.simpleHeading.isHeading(i, markdown):
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
        break;

      default:
        i++;
        break;
    }
  }

  console.log(tokens);

  return tokens;
}

module.exports = {
  tokenizer,
};
