/**
 * Parses plain text string markdown content to plain text string HTML
 * @param {string} markDownString plain text string representation of markdown file
 * @returns {string} html string of the markdown
 */
function parseMarkDownToHTMLString(markDownString) {}

/**
 * Parses plain text string markdown content and coverts it to array of tokens
 * @param {string} markDownString plain text string representation of markdown file
 * @returns {Array<MarkdownToken>} markdown tokens
 * @example
 * [
 *   { type: "heading", content: "Hello", level: 1 },
 *   { type: "paragraph", content: "This is **bold** text." }
 * ]
 */
function tokenizeMarkdown(markDownString) {
  /**
   * @type {Array<MarkdownToken>} store we use to store the markdown tokens which we return
   */
  const tokens = [];

  markDownString.trim();

  // This will first tokenize block level elements - these are elements that take up lines
  // then inline will be done

  for (let i = 0; i < markDownString.length; i++) {
    // Try to tokenize a heading
    if (headingCharacters.includes(markDownString[i])) {
      let indexOfNewLine = markDownString.indexOf("\n", i);

      if (indexOfNewLine === -1) {
        indexOfNewLine = markDownString.length;
      }

      var line = markDownString.substring(i, indexOfNewLine).trim();
      let indexOFirstSpace = line.indexOf(" ");
      if (indexOFirstSpace === -1) {
        tokens.push({
          content: line,
          type: blockLevelMarkDownTokenTypes.paragraph,
        });
        i = indexOfNewLine;
        continue;
      }

      if (!headingCharacters.includes(line[indexOFirstSpace - 1])) {
        tokens.push({
          content: line,
          type: blockLevelMarkDownTokenTypes.paragraph,
        });
        i = indexOfNewLine;
        continue;
      }

      tokens.push({
        content: line,
        type: blockLevelMarkDownTokenTypes.heading,
        level: line.split(headingCharacters[0]).length - 1,
      });

      i = indexOfNewLine;
      continue;
    }

    // Try to parse horizontal rules
    if (horizontalRuleCharacters.includes(markDownString[i])) {
      let indexOfNewLine = markDownString.indexOf("\n", i);

      if (indexOfNewLine === -1) {
        indexOfNewLine = markDownString.length;
      }

      var line = markDownString.substring(i, indexOfNewLine).trim();

      var indexOfFirstUnderScore = line.indexOf("_");
      var indexOfFirstStar = line.indexOf("*");
      var indexOfFirstDash = line.indexOf("-");

      // If none of the special characters _ * - are found, treat it as a paragraph
      if (
        indexOfFirstDash === -1 &&
        indexOfFirstStar === -1 &&
        indexOfFirstUnderScore === -1
      ) {
        tokens.push({
          type: blockLevelMarkDownTokenTypes.paragraph,
          content: line,
        });
        i = indexOfNewLine;
        continue;
      }

      const isValidHorizontalRule = (char, line) => {
        let count = 0;
        for (let j = 0; j < line.length; j++) {
          if (line[j] === char) {
            count++;
          } else if (line[j] !== " ") {
            return false; // Found a character that's not the one we're looking for or a space
          }
        }
        return count >= 3;
      };

      // Check if the line consists of only one character type and has at least three of them
      if (
        isValidHorizontalRule("-", line) ||
        isValidHorizontalRule("*", line) ||
        isValidHorizontalRule("_", line)
      ) {
        tokens.push({
          content: line,
          type: blockLevelMarkDownTokenTypes.horizontalRule,
        });
      } else {
        tokens.push({
          type: blockLevelMarkDownTokenTypes.paragraph,
          content: line,
        });
      }

      i = indexOfNewLine;
      continue;
    }
  }

  console.log(tokens);

  return tokens;
}

/**
 * Characters we use to compare characters with when iterate through to match cases
 */
const headingCharacters = ["#", "##", "###", "####", "#####"];

/**
 * Characters we use to compare characters with when iterate through to match cases
 */
const horizontalRuleCharacters = ["-", "*", "_"];

/**
 * Object that stores all the markdown token types we support / use to know what type the token is for block level elements
 * block level elements are whole line elements
 */
const blockLevelMarkDownTokenTypes = {
  heading: "heading",
  blockquoteL: "blockquote",
  listItem: "list item",
  code: "code",
  horizontalRule: "horizontal rule",
  paragraph: "paragraph",
};

/**
 * Object that stores all the markdown token types we support / use to know what type the token is for inline level elements
 * inline level elements are elements within a block level element and can be multiple within the same block
 */
const inlineLevelMarkDownTokenTypes = {
  bold: "bold",
  italic: "italic",
  strikethrough: "strikethrough",
  inlineCode: "inline code",
  link: "link",
  image: "image",
};

/**
 * @typedef {Object} MarkdownToken
 * @property {string} type - The type of Markdown element (e.g., "heading", "paragraph", "bold").
 * @property {string | Array<MarkdownToken>} content - The text content of the token.
 * @property {number} [level] - Optional property for headings (e.g., `1` for `# Heading 1`).
 */

function testMain() {
  const markdownString = `
    # Main Heading
    
    ## Secondary Heading
    
    ### Tertiary Heading
    
    This is a paragraph of text. It contains **bold** text and *italic* text. You can also combine them like this: ***bold and italic***.
    
    Here’s a list:
    - Item 1
    - Item 2
    - Item 3
    
    An ordered list:
    1. First item
    2. Second item
    3. Third item
    
    A blockquote:
    > This is a blockquote.
    
    A code block:
    
    \`\`\`
    const x = 10;
    console.log(x);
    \`\`\`
    
    Inline code: \`let a = 5;\`
    
    A link to [Google](https://www.google.com).
    
    Images are like links but with an exclamation mark before: 
    ![Image Alt Text](https://via.placeholder.com/150)
    
    Horizontal rule:
    ---
    
    **Tables:**
    
    | Header 1 | Header 2 |
    |----------|----------|
    | Row 1 Col 1 | Row 1 Col 2 |
    | Row 2 Col 1 | Row 2 Col 2 |
    
    A footnote reference[^1].
    
    [^1]: This is the footnote content.
    
    ### Nested Lists
    
    1. First item
       - Subitem 1
       - Subitem 2
    2. Second item
       - Subitem 1
    
    Strikethrough text: ~~This text is crossed out~~.
    
    A list with task items:
    - [x] Task 1
    - [ ] Task 2
    
    ---
    
    ## Another Section
    
    Here’s some more text to make it longer. You can have **bold** and *italic* texts, like so.
    
    ### Another Nested List:
    1. Main item
       - Subitem 1
         1. Subsubitem 1
         2. Subsubitem 2
    `;

  const markDownString2 = "___\n";

  tokenizeMarkdown(markDownString2);
}

testMain();

// Use node index.js for testing
