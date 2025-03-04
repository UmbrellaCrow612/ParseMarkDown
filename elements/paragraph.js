const { getNewLineIndex } = require("../utils");

/**
 * Paragraph markdown element
 */
const paragraph = {
  /**
   * Helper function to get p tag content
   * @param {number} position
   * @param {string} markdown
   */
  extractContent(position, markdown) {
    return markdown.substring(position, getNewLineIndex(position, markdown));
  },

  /**
   * @param {number} position
   * @param {string} markdown
   */
  movePastParagraph(position, markdown) {
    return getNewLineIndex(position, markdown) + 1;
  },
};

module.exports = {
  paragraph,
};
