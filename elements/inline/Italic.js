/**
 * italic markdown element
 */
const italic = {
  /**
   * Rule to match italic inline markdown patterns these are either
   * `*content* or _content_`
   */
  rule: /((?<!\*)\*[^\s*](.*?)[^\s*]\*(?!\*))|((?<!_)_[^\s_](.*?)_(?!_))/g,

  /**
   * Helper function to return all italics found within a string input
   * @param {string} str - String input
   */
  extractItalic(str) {
    let matches = [...str.matchAll(this.rule)];
    if (matches == null) return { success: false, matches: [] };
    let result = [];

    matches.forEach((x) => {
      result.push({
        content: x[0],
        startIndex: x.index,
        endIndex: x.index + x[0].length - 1,
      });
    });

    return {
      success: true,
      matches: result,
    };
  },
};

module.exports = {
  italic,
};
