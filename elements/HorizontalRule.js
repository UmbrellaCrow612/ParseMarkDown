const { getNewLineIndex } = require("../utils");

/**
 * Markdown horizontal rule element
 */
const horizontalRule = {
  /**
   * Rule to see if markdown string is a valid horizontal rule
   * it has some whitespace at beginning optional until the end
   * then needs 3 or more of *, _ or -
   */
  rule: /^\s{0,3}(\-{3,}\s*$|\*{3,}\s*$|\_{3,}\s*$)/,

  /**
   * Helper function to see if a position in markdown is a valid horizontal rule
   * @param {number} position
   * @param {string} markdown
   */
  isHorizontalRule(position, markdown) {
    let regex = new RegExp(this.rule);
    let line = markdown.substring(
      position,
      getNewLineIndex(position, markdown)
    );
    if (!regex.test(line)) return false;
    return true;
  },

  /**
   * Helper function to go past a horizontal rule
   * @param {number} position
   * @param {string} markdown
   */
  movePastHorizontalRule(position, markdown) {
    return getNewLineIndex(position, markdown);
  },
};

module.exports = {
  horizontalRule,
};
