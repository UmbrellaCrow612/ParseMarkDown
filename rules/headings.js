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
    rule: /^s{0,3}#{1,6}s/,
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
