/**
 * Markdown bold inline element
 */
const bold = {
  /**
   * Rule to see if a element is a bold inline style
   * this is **word words**
   */
  rule: /(\*{2}\S(.*?)\S\*{2})|(__\S(.*?)\S__)/g,

  /**
   * Helper function to return all bold characters from a string
   * @param {string} str - string input
   */
  extractBold(str) {
    let result = [];
    let m = [...str.matchAll(this.rule)];
    if (m == null) return { success: false, matches: result };

    m.forEach((x) => {
      result.push({
        startIndex: x.index,
        endIndex: x.index + x[0].length - 1,
      });
    });

    return { success: true, matches: result };
  },
};

module.exports = {
  bold,
};
