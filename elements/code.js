const { getNewLineIndex } = require("../utils");
/**
 * Markdown code element
 */
const code = {
  fenced: {},

  /**
   * Code with type of tabs - 4 spaces
   */
  tab: {
    /**
     * Rule to see if it is a tab type code block
     * there has to be at least 4 tab spaces for a code block
     */
    rule: /^\s{4}./,

    /**
     * Helper function to see if a position in markdown is a valid tab code block
     * @param {number} position - index
     * @param {string} markdown - markdown as string
     */
    isCodeBlock(position, markdown) {
      let regex = new RegExp(this.rule);
      let line = markdown.substring(
        position,
        getNewLineIndex(position, markdown)
      );
      if (!regex.test(line)) return false;
      return true;
    },

    /**
     * Helper function to get the content of a tab code block
     * @param {number} position - index
     * @param {string} markdown - markdown as string
     */
    extractContent(position, markdown) {
      let line = markdown.substring(
        position,
        getNewLineIndex(position, markdown)
      );
      return line.trim();
    },

    /**
     * Helper function to move past a tab code block
     * @param {number} position - index
     * @param {string} markdown - markdown as string
     */
    movePastCodeBlock(position, markdown) {
      return getNewLineIndex(position, markdown) + 1;
    },
  },
};

module.exports = {
  code,
};
