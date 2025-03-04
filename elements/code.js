const { getNewLineIndex } = require("../utils");
/**
 * Markdown code element
 */
const code = {
  /**
   * Rules and helper functions fenced code block markdown elements
   */
  fenced: {
    /**
     * Rule to see if a line starts with a valid fenced code block
     * for example
     * `s ``` or ```js or ~~~ or ~~~js
     * then anything after or until the next set of either ~~~ or ```
     * is considered code content within it.`
     *
     * The rule itself considered anything that has at least 3 of the characters valid
     * anything after or lack there of is the language specified.
     */
    rule: /^\s{0,3}(`{3}|~{3})([^`~]|$)/,

    /**
     * Rule to get the code block programming language - could return null if empty or whitespace
     */
    getLanguageRule: /[^\s`~].*/,

    /**
     * Helper function to see if a line starts with a valid fenced block quote opening
     * @param {number} position current index within markdown lexer
     * @param {string} markdown string content of markdown
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
     * Helper function to extract the content of a block level for fenced code block.
     * This assumes that you met a valid code block starting line, then will go all the way to the end of the
     * markdown or the next fenced closing block.
     * @param {number} position current index within markdown lexer
     * @param {string} markdown string content of markdown
     */
    extractContent(position, markdown) {
      let regex = new RegExp(this.rule);
      let prevLine = markdown.substring(
        position,
        getNewLineIndex(position, markdown)
      );
      let langResult = prevLine.match(this.getLanguageRule);
      let lang = "";
      if (langResult === null) {
        lang = "No language";
      } else {
        lang = langResult[0].trim()
      }

      let pos = getNewLineIndex(position, markdown) + 1; // line after the code start block

      /**
       * @type {Array<string>}
       */
      let content = [];

      while (pos < markdown.length) {
        let line = markdown.substring(pos, getNewLineIndex(pos, markdown));
        if (regex.test(line)) {
          // we meet a trail
          pos = getNewLineIndex(pos, markdown) + 1; // move past it to next line
          return { content, pos, lang };
        }
        content.push(line);
        pos = getNewLineIndex(pos, markdown) + 1;
      }
      return { content, pos, lang };
    },
  },

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
