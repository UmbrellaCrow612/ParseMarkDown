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
        tokens.push({
          ...heading.headingWithTrailingHashes.extractHeading(i, markdown),
          type: elementTypes.heading,
        });
        i = heading.headingWithTrailingHashes.movePastHeading(i, markdown);
        break;

      case heading.simpleHeading.isHeading(i, markdown):
        tokens.push({
          ...heading.simpleHeading.extractHeading(i, markdown),
          type: elementTypes.heading,
        });
        i = heading.simpleHeading.movePastHeading(i, markdown);
        break;

      case heading.setextStyle.isHeading(i, markdown):
        tokens.push({
          content: heading.setextStyle.extractContent(i, markdown),
          type: elementTypes.heading,
        });
        i = heading.setextStyle.movePastSetextHeading(i, markdown);
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
