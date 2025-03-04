const { getNewLineIndex } = require("../utils");

/**
 * List markdown element
 */
const list = {
  /**
   * This contains rules and helper function for regular lists not sub lists items
   */
  regular: {
    /**
     * Rule to see if string is a valid list
     * List is either starts with -, number, * or a +
     * different than a sub list, the rule is there to only validate if it is a valid list
     * dose not extract anything
     */
    rule: /^\s{0,1}(\d*\.\s|[-*+]\s)/,

    /**
     * Rule to extract content of a list item
     */
    extractRule: /[^\s\d\-\+\*\.].*/,

    /**
     * Helper function to see if a position in markdown is a valid list item
     * @param {number} position
     * @param {string} markdown
     */
    isList(position, markdown) {
      let regex = new RegExp(this.rule);
      let line = markdown.substring(
        position,
        getNewLineIndex(position, markdown)
      );
      if (!regex.test(line)) return false;
      return true;
    },

    /**
     * Helper function to extract valid list content out
     * @param {number} position
     * @param {string} markdown
     */
    extractContent(position, markdown) {
      let line = markdown.substring(
        position,
        getNewLineIndex(position, markdown)
      );
      return {
        content: line.match(this.extractRule)[0].trim(),
      };
    },

    /**
     * Helper function to move past a list item
     * @param {number} position
     * @param {string} markdown
     */
    movePastList(position, markdown) {
      return getNewLineIndex(position, markdown) + 1;
    },
  },

  /**
   * This contains rule and helper functions for a sub list
   */
  subList: {
    /**
     * Same as list but look for 2 exact white spaces
     */
    rule: /^\s{2}(\d*\.\s|[-*+]\s)/,

    /**
     * Rule to extract content of a sub list item
     */
    extractRule: /[^\s\d\-\+\*\.].*/,

    /**
     * Helper function to see if its a sub list
     * @param {number} position
     * @param {string} markdown
     */
    isSubList(position, markdown) {
      let regex = new RegExp(this.rule);
      let line = markdown.substring(
        position,
        getNewLineIndex(position, markdown)
      );
      if (!regex.test(line)) return false;
      return true;
    },

    /**
     * Helper function to get content from a sub list
     * @param {number} position
     * @param {string} markdown
     */
    extractContent(position, markdown) {
      let line = markdown.substring(
        position,
        getNewLineIndex(position, markdown)
      );

      return {
        content: line.match(this.extractRule)[0].trim(),
      };
    },

    /**
     * Helper function to see if its a sub list
     * @param {number} position
     * @param {string} markdown
     */
    movePastSubList(position, markdown) {
      return getNewLineIndex(position, markdown) + 1;
    },
  },
};

module.exports = {
  list,
};
