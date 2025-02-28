const { getNewLineIndex } = require("../utils");

/**
 * Block quote element
 */
const blockQuote = {
  /**
   * Rule to determine if a markdown position is a block quote
   */
  rule: /^\s{0,3}>{1,3}\s.*$/,

  /**
   * Rule to get the content of a block quote
   */
  extractRule: /[^\s>].*$/,

  /**
   * Rule to get the bloc quote level
   */
  countLevelRule: /[^\s]>{0,3}/,

  /**
   * Helper function to see if a position in markdown is a valid block quote
   * @param {number} position Index
   * @param {string} markdown Markdown string
   */
  isBlockQuote(position, markdown) {
    let regex = new RegExp(this.rule);
    let line = markdown.substring(
      position,
      getNewLineIndex(position, markdown)
    );
    if (!regex.test(line)) return false;
    return true;
  },

  /**
   * Helper function to get the content of a block quote
   * @param {number} position Index
   * @param {string} markdown Markdown string
   */
  extractContent(position, markdown) {
    let line = markdown.substring(
      position,
      getNewLineIndex(position, markdown)
    );
    return {
      content: line.match(this.extractRule)[0],
      level: line.match(this.countLevelRule)[0].length,
    };
  },

  /**
   * Helper function to go past a block quote
   * @param {number} position Index
   * @param {string} markdown Markdown string
   */
  movePastBlockQuote(position, markdown) {
    return getNewLineIndex(position, markdown);
  },
};

module.exports = {
  blockQuote,
};
