const { getNewLineIndex, getCurrentLineAndNext } = require("../utils");

/**
 * These are all rules or ways we can use to determine if something is a valid heading in markdown
 */
const heading = {
  /**
   * This contains the rules and other helper functions for simple markdown headings
   */
  simpleHeading: {
    /**
     * This matches headings in the forms of
     * # Heading one
     * with leading spaces hashes from 1-6 and a space character
     */
    rule: /^\s{0,3}#{1,6}\s/,

    /**
     * This helps you extract the heading text for a simple heading
     */
    extractRule: /[^\s#].*/,

    /**
     * This helps with counting the heading level by matching the first set of repeating #
     */
    countHeadingLevelRule: /[^\s]#*/,

    /**
     * Helper function to see if string is markdown heading for simple heading format
     * @param {number} position the current position
     * @param {string} markdown markdown as string
     */
    isHeading(position, markdown) {
      let regex = new RegExp(this.rule);
      let line = markdown.substring(
        position,
        getNewLineIndex(position, markdown)
      );
      if (!regex.test(line)) return false;
      return true;
    },

    /**
     * This helps move past the simple heading to the next newline
     * @param {number} position index position
     * @param {string} markdown markdown as string
     * @returns {number} - The new index position
     */
    movePastHeading(position, markdown) {
      return getNewLineIndex(position, markdown) + 1;
    },

    /**
     * Gets the content for heading from a simple heading
     * @param {number} position
     * @param {string} markdown
     */
    extractHeading(position, markdown) {
      const line = markdown.substring(
        position,
        getNewLineIndex(position, markdown)
      );

      return {
        content: line.match(this.extractRule).toString().trim(),
        level: line.match(this.countHeadingLevelRule)[0].length,
      };
    },
  },

  /**
   * This contains the rules and other helper functions for setext markdown headings
   */
  setextStyle: {
    /**
     * This matches headings in the forms of
     * Heading one
     * ===========
     * with ====== under a text to make it a header or ---- for heading 2
     */
    rule: /^\s{0,3}.*\n[=,-]+$/,

    /**
     * This helper function allows you to check if a position in markdown is a valid setext heading
     * @param {number} position index position
     * @param {string} markdown markdown as string
     */
    isHeading(position, markdown) {
      let regex = new RegExp(this.rule);
      let lines = getCurrentLineAndNext(position, markdown);
      if (!regex.test(lines)) return false;

      return true;
    },

    /**
     * Helper function to extract the content of setext heading
     * @param {number} position
     * @param {string} markdown
     */
    extractContent(position, markdown) {
      return markdown
        .substring(position, getNewLineIndex(position, markdown))
        .trim();
    },

    /**
     * Helper function to move past setext heading
     * @param {number} position
     * @param {string} markdown
     */
    movePastSetextHeading(position, markdown) {
      let firstNewlineIndex = getNewLineIndex(position, markdown);

      let secondNewlineIndex = getNewLineIndex(firstNewlineIndex + 1, markdown);
      return secondNewlineIndex;
    },
  },

  /**
   * This contains the rules and other helper functions for trailing slashes markdown headings
   */
  headingWithTrailingHashes: {
    /**
     * Rule to see if a text is a valid heading with trails
     */
    rule: /^\s{0,3}(#{1,6})\s.*\s\1\s{0,}$/,

    /**
     * Extract text between # and #
     */
    extractRule: /[^\s#].*[^#]/,

    /**
     * This helps with counting the heading level by matching the first set of repeating #
     */
    countHeadingLevelRule: /[^\s]#*/,

    /**
     * This helper function allows you to check if a position in markdown is a valid heading with trails
     * @param {number} position index position
     * @param {string} markdown markdown as string
     */
    isHeading(position, markdown) {
      let regex = new RegExp(this.rule);
      let line = markdown.substring(
        position,
        getNewLineIndex(position, markdown)
      );
      if (!regex.test(line)) return false;
      return true;
    },

    /**
     * This helper function allows you extract content in a heading with trails
     * @param {number} position index position
     * @param {string} markdown markdown as string
     */
    extractHeading(position, markdown) {
      let line = markdown.substring(
        position,
        getNewLineIndex(position, markdown)
      );
      return {
        content: line.match(this.extractRule)[0].trim(),
        level: line.match(this.countHeadingLevelRule)[0].length,
      };
    },

    /**
     * This helps move past the heading with trails heading to the next newline
     * @param {number} position index position
     * @param {string} markdown markdown as string
     * @returns {number} - The new index position
     */
    movePastHeading(position, markdown) {
      return getNewLineIndex(position, markdown) + 1;
    },
  },
};

// Export a variable or function
module.exports = {
  heading,
};
