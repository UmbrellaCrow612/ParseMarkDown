/**
 * Markdown strikethrough inline element
 */
const strikethrough = {
  /**
   * Rule to get all strikethrough inline elements
   */
  rule: /~~(.*?)~~/g,

  /**
   * Helper function to get all strike through inline elements
   * @param {string} str string input
   */
  extractStrikeThroughContent(str) {
    let matches = [...str.matchAll(this.rule)];
    if (matches == null) return { success: false, matches };
    let result = [];
    matches.forEach((x) => {
      result.push({
        content: x[0].slice(2, x[0].length - 2),
        startIndex: x.index,
        endIndex: x.index + x[0].length - 1,
      });
    });
    return { success: true, matches: result };
  },
};

module.exports = {
  strikethrough,
};
