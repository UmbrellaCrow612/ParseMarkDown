/**
 * Markdown bold inline element
 */
const bold = {
  /**
   * Rule to see if a element is a bold inline style
   * this is **word words**
   */
  rule: /((?<!\*)\*\*[^\s*](.*?)\*\*(?!\*))|((?<!_)__[^\s_](.*?)__(?!_))/g,

  /**
   * Rule to extract content for star bold **bold**
   */
  extractContentForStar: /\*\*(.*?)\*\*/,

  /**
   * Rule to get content for __bold__
   */
  extractContentForUnderScore: /__(.*?)__/,

  /**
   * Helper function to return all bold characters from a string
   * @param {string} str - string input
   */
  extractBold(str) {
    let result = [];
    let m = [...str.matchAll(this.rule)];
    if (m == null) return { success: false, matches: result };

    m.forEach((x) => {
      let content = "";
      let starResult = x[0].match(this.extractContentForStar);
      if (starResult !== null) {
        content = starResult[1];
      }
      let underScoreResult = x[0].match(this.extractContentForUnderScore);
      if (underScoreResult !== null) {
        content = underScoreResult[1];
      }
      result.push({
        content: content,
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
