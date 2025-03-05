/**
 * Inline element for code text markdown syntax
 */
const codeText = {
  /**
   * Rule to find code texts these are s ` back ticks with content within it`
   */
  rule: /`(.*?)`/g,

  /**
   * Helper function to get all code inline text blocks
   * @param {string} str - string input
   */
  extractCodeText(str) {
    let matches = [...str.matchAll(this.rule)];
    if (matches === null) return { success: false, matches };
    let result = [];
    matches.forEach((x) => {
      result.push({
        content: x[0].slice(1, x[0].length - 1),
        startIndex: x.index,
        endIndex: x.index + x[0].length - 1,
      });
    });
    return { success: true, matches: result };
  },
};

module.exports = {
  codeText,
};
