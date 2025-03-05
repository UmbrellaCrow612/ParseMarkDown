/**
 * Markdown element for bold and italic inline element
 */
const boldAndItalic = {
  /**
   * Rule to get bold and italic inline elements
   * `bold and italic is ***three stars***`
   */
  rule: /\*{3}[^\s\*](.*?)[^\s\*]\*{3}/g,

  /**
   * Rule to get content of bold and italic 
   */
  extractContentRule: /\*{3}(.*?)\*{3}/,

  /**
   * Helper function ot get all bold and italic elements from a string
   * @param {string} str
   */
  extractBoldAndItalic(str) {
    let matches = [...str.matchAll(this.rule)];
    if (matches === null) return { success: false, matches };
    let result = [];

    matches.forEach((x) => {
      result.push({
        content: x[0].match(this.extractContentRule)[1],
        startIndex: x.index,
        endIndex: x.index + x[0].length - 1,
      });
    });

    return { success: true, matches: result };
  },
};

module.exports = {
  boldAndItalic,
};
