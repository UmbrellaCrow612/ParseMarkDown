const { blockQuote } = require("./elements/blockquote");
const { code } = require("./elements/code");
const { heading } = require("./elements/headings");
const { horizontalRule } = require("./elements/horizontalRule");
const { bold } = require("./elements/inline/bold");
const { boldAndItalic } = require("./elements/inline/boldAndItalic");
const { codeText } = require("./elements/inline/codeText");
const { image } = require("./elements/inline/image");
const { italic } = require("./elements/inline/Italic");
const { link } = require("./elements/inline/link");
const { strikethrough } = require("./elements/inline/strikethrough");
const { inlineElementTypes } = require("./elements/inline/types");
const { list } = require("./elements/list");
const { paragraph } = require("./elements/paragraph");
const { elementTypes } = require("./elements/types");

/**
 * Converts markdown string content to an array of tokens, think of this as the lexer to then use the tokens down the line
 * in a parser to convert the tokens into HTMl, PDF or other content in the parser
 * @param {string} markdown markdown as string
 */
function lexer(markdown) {
  /**
   * @type {Array<Token>}
   */
  const tokens = [];

  for (let i = 0; i < markdown.length; ) {
    switch (true) {
      case heading.headingWithTrailingHashes.isHeading(i, markdown):
        tokens.push({
          ...heading.headingWithTrailingHashes.extractHeading(i, markdown),
          type: elementTypes.heading,
          language: null,
          inlineTokens: [],
        });
        i = heading.headingWithTrailingHashes.movePastHeading(i, markdown);
        break;

      case heading.simpleHeading.isHeading(i, markdown):
        tokens.push({
          ...heading.simpleHeading.extractHeading(i, markdown),
          type: elementTypes.heading,
          language: null,
          inlineTokens: [],
        });
        i = heading.simpleHeading.movePastHeading(i, markdown);
        break;

      case heading.setextStyle.isHeading(i, markdown):
        tokens.push({
          content: heading.setextStyle.extractContent(i, markdown),
          level: 1,
          type: elementTypes.heading,
          language: null,
          inlineTokens: [],
        });
        i = heading.setextStyle.movePastSetextHeading(i, markdown);
        break;

      case blockQuote.isBlockQuote(i, markdown):
        tokens.push({
          ...blockQuote.extractContent(i, markdown),
          type: elementTypes.blockQuote,
          language: null,
          inlineTokens: [],
        });
        i = blockQuote.movePastBlockQuote(i, markdown);
        break;

      case list.regular.isList(i, markdown):
        tokens.push({
          ...list.regular.extractContent(i, markdown),
          level: null,
          type: elementTypes.list,
          language: null,
          inlineTokens: [],
        });
        i = list.regular.movePastList(i, markdown);
        break;

      case list.subList.isSubList(i, markdown):
        tokens.push({
          ...list.subList.extractContent(i, markdown),
          level: null,
          type: elementTypes.subList,
          language: null,
          inlineTokens: [],
        });
        i = list.subList.movePastSubList(i, markdown);
        break;

      case horizontalRule.isHorizontalRule(i, markdown):
        tokens.push({
          type: elementTypes.horizontalRule,
          level: null,
          content: null,
          language: null,
          inlineTokens: [],
        });
        i = horizontalRule.movePastHorizontalRule(i, markdown);
        break;

      case code.tab.isCodeBlock(i, markdown):
        tokens.push({
          content: code.tab.extractContent(i, markdown),
          level: null,
          type: elementTypes.codeTab,
          language: null,
          inlineTokens: [],
        });
        i = code.tab.movePastCodeBlock(i, markdown);
        break;

      case code.fenced.isCodeBlock(i, markdown):
        let fenceResult = code.fenced.extractContent(i, markdown);
        tokens.push({
          content: fenceResult.content.join("\n"),
          level: null,
          type: elementTypes.codeBlock,
          language: fenceResult.lang,
          inlineTokens: [],
        });
        i = fenceResult.pos;
        break;

      default:
        tokens.push({
          content: paragraph.extractContent(i, markdown),
          level: null,
          type: elementTypes.paragraph,
          language: null,
          inlineTokens: [],
        });
        i = paragraph.movePastParagraph(i, markdown);
        break;
    }
  }

  tokens.forEach((token) => {
    token.inlineTokens = inlineLexer(token.content);
  });

  console.log(JSON.stringify(tokens));

  return tokens;
}
/**
 * Lexer to convert block element content into array of inline tokens, go's over each word and matches it to a inline style token
 * @param {string} input - block level element content
 */
function inlineLexer(input) {
  /**
   * Contains all inline tokens for the input sentence string
   * @type {Array<InlineToken>}
   */
  const tokens = [];

  let boldResult = bold.extractBold(input);
  if (boldResult.success) {
    boldResult.matches.forEach((x) => {
      tokens.push({
        ...x,
        type: inlineElementTypes.bold,
      });
    });
  }

  let italicResult = italic.extractItalic(input);
  if (italicResult.success) {
    italicResult.matches.forEach((x) => {
      tokens.push({
        ...x,
        type: inlineElementTypes.italic,
      });
    });
  }

  let boldAndItalicResult = boldAndItalic.extractBoldAndItalic(input);
  if (boldAndItalicResult.success) {
    boldAndItalicResult.matches.forEach((x) => {
      tokens.push({
        ...x,
        type: inlineElementTypes.boldAndItalic,
      });
    });
  }

  let codeTextResult = codeText.extractCodeText(input);
  if (codeTextResult.success) {
    codeTextResult.matches.forEach((x) => {
      tokens.push({
        ...x,
        type: inlineElementTypes.inlineCode,
      });
    });
  }

  let strikeThroughResult = strikethrough.extractStrikeThroughContent(input);
  if (strikeThroughResult.success) {
    strikeThroughResult.matches.forEach((x) => {
      tokens.push({
        ...x,
        type: inlineElementTypes.strikeThrough,
      });
    });
  }

  let linkResult = link.extractLink(input);
  if (linkResult.success) {
    linkResult.matches.forEach((x) => {
      tokens.push({
        ...x,
        type: inlineElementTypes.link,
      });
    });
  }


  let imageResult = image.extractImage(input);
  if(imageResult.success){
    imageResult.matches.forEach(x => {
      tokens.push({
        ...x,
        type: inlineElementTypes.image
      })
    })
  }

  return tokens;
}

module.exports = {
  lexer,
  inlineLexer,
};
