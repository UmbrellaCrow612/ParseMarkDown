const { getNewLineIndex } = require("../utils");

/**
 * Miscellaneous element or helpers
 */
const misc = {
  whitespace: {
    /**
     * Rule to see if a line is pure white space
     */
    rule: /\s*$/,

    /**
     * Helper function to see if a line is pure whitespace
     * @param {number} position
     * @param {string} markdown
     */
    isPureWhiteSpace(position, markdown) {
      let regex = new RegExp(this.rule);
      let line = markdown.substring(
        position,
        getNewLineIndex(position, markdown)
      );
      if (regex.test(line)) return false;
      return true;
    },

    /**
     * Helper function to move past a whitespace line
     * @param {number} position
     * @param {string} markdown
     */
    movePastWhiteSpace(position, markdown) {
      return getNewLineIndex(position, markdown) + 1;
    },
  },
};

module.exports = {
  misc,
};
