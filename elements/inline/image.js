/**
 * Markdown inline img tag
 */
const image = {
  /**
   * Rule to get all inline img tags in markdown string
   */
  rule: /!\[(.*?)]\((.*?)\)/g,

  /**
   * Helper function to get all the inline image markdown
   * @param {string} str string input
   */
  extractImage(str) {
    let matches = [...str.matchAll(this.rule)];
    if (matches === null) return { success: false, matches };
    let result = [];
    matches.forEach((x) => {
      result.push({
        altText: x[1],
        url: x[2],
      });
    });
    return { success: true, matches: result };
  },
};

module.exports = {
  image,
};
