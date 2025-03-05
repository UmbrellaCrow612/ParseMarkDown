/**
 * Inline link element
 */
const link = {
  /**
   * Rule to  get all inline markdown links
   */
  rule: /\[(.*?)]\((.*?)\)/g,

  /**
   * helper function to get all l=inline markdown links
   * @param {string} str - String inputF
   */
  extractLink(str) {
    let matches = [...str.matchAll(this.rule)];
    if (matches === null) return { success: false, matches };
    let result = [];
    matches.forEach((x) => {
      result.push({
        text: x[1],
        url: x[2],
      });
    });
    return { success: true, matches: result };
  },
};

module.exports = {
  link,
};
