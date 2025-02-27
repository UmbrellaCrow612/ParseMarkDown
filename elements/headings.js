const { getNewLineIndex } = require("../utils");

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
      return getNewLineIndex(position, markdown);
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
        level: line.split("#").length - 1,
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
    rule: /^s{0,3}.*\n[=,-]{1,}\n/,
  },

  /**
   * This contains the rules and other helper functions for trailing slashes markdown headings
   */
  headingWithTrailingHashes: {
    rule: /^\s{0,3}(#{1,6})\s.*\s\1\s*$/m,
  },
};

// Export a variable or function
module.exports = {
  heading,
};
