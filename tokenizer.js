const { blockQuote } = require("./elements/blockquote");
const { heading } = require("./elements/headings");
const { horizontalRule } = require("./elements/HorizontalRule");
const { list } = require("./elements/list");
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
          level: 1,
          type: elementTypes.heading,
        });
        i = heading.setextStyle.movePastSetextHeading(i, markdown);
        break;

      case blockQuote.isBlockQuote(i, markdown):
        tokens.push({
          ...blockQuote.extractContent(i, markdown),
          type: elementTypes.blockQuote,
        });
        i = blockQuote.movePastBlockQuote(i, markdown);
        break;

      case list.regular.isList(i, markdown):
        tokens.push({
          ...list.regular.extractContent(i, markdown),
          type: elementTypes.list,
        });
        i = list.regular.movePastList(i, markdown);
        break;

      case list.subList.isSubList(i, markdown):
        tokens.push({
          ...list.subList.extractContent(i, markdown),
          type: elementTypes.subList,
        });
        i = list.subList.movePastSubList(i, markdown);
        break;

      case horizontalRule.isHorizontalRule(i, markdown):
        tokens.push({
          type: elementTypes.horizontalRule,
        });
        i = horizontalRule.movePastHorizontalRule(i, markdown);
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
