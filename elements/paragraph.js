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
  movePastParagraph(index, markdown) {
    const newLineIndex = getNewLineIndex(index, markdown);
    return newLineIndex > index ? newLineIndex : index + 1; // Ensure progress
  },
};

module.exports = {
  paragraph,
};
