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
    const newLineIndex = getNewLineIndex(position, markdown);
    return newLineIndex > position ? newLineIndex : position + 1; // Ensure progress
  },
};

module.exports = {
  paragraph,
};
