/**
 * Parses plain text string markdown content and coverts it to array of tokens
 * @param {string} markDownString plain text string representation of markdown file
 * @returns {Array<BlockToken>} markdown tokens which will later be future tokenized for thee inline level tokens
 * @example
 * [
 *   { type: "heading", content: "Hello", level: 1 },
 *   { type: "paragraph", content: "This is **bold** text." }
 * ]
 */
function tokenizeMarkdown(markDownString) {
  /**
   * @type {Array<BlockToken>} store we use to store the markdown tokens which we return
   */
  const tokens = [];

  markDownString;

  for (let i = 0; i < markDownString.length; i++) {
    var indexOfNewLine = markDownString.indexOf("\n", i);

    if (indexOfNewLine === -1) {
      indexOfNewLine = markDownString.length;
    }

    /**
     * Block level line
     */
    var line = markDownString.substring(i, indexOfNewLine);

    // Try to parse Headings
    if (isHeadingBlock(line)) {
      if (isValidHeading(line)) {
        tokens.push({
          content: line,
          type: blockLevelMarkDownTokenTypes.heading,
          level: line.split("#").length - 1,
        });

        i = indexOfNewLine;
        continue;
      }
    }

    // Try to parse horizontal rules
    if (isHorizontalRule(line)) {
      if (isValidHorizontalRule(line)) {
        tokens.push({
          content: line,
          type: blockLevelMarkDownTokenTypes.horizontalRule,
        });
        i = indexOfNewLine;
        continue;
      }
    }

    // Try parse lists
    if (isList(line)) {
      if (isValidList(line)) {
        tokens.push({
          content: line,
          type: blockLevelMarkDownTokenTypes.listItem,
        });
        i = indexOfNewLine;
        continue;
      }
    }

    // See if its a block quote
    if (isBlockQuote(line)) {
      tokens.push({
        content: line,
        type: blockLevelMarkDownTokenTypes.blockquote,
      });
      i = indexOfNewLine;
      continue;
    }

    if (isCodeBlock(line)) {
      var result = isValidCodeBlock(line);

      if (typeof result === "object") {
        if (result.codeType === blockLevelMarkDownTokenTypes.tabs) {
          tokens.push({
            content: line,
            type: result.codeType,
          });
          i = indexOfNewLine;
          continue;
        }
        tokens.push({
          content: line,
          type: result.codeType,
          language:
            result.language.length > 0 && result.language[0] !== " "
              ? result.language
              : "Not specified",
        });
        i = indexOfNewLine;
        continue;
      }
    }

    tokens.push({
      content: line,
      type: blockLevelMarkDownTokenTypes.paragraph,
    });

    i = indexOfNewLine;
  }

  // Another loop over tokens which we parse its content for sub inline tokens
  console.log(tokens);

  return tokens;
}

/**
 *
 * @param {string} str
 */
function isValidCodeBlock(str) {
  let spaceCount = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      spaceCount++;
      if (spaceCount >= 4) {
        return { codeType: blockLevelMarkDownTokenTypes.tabs };
      }
      continue;
    }

    if (str[i] === "`" || str[i] === "~") {
      let char = str[i];
      let count = 0;

      // Count consecutive backticks or tildes
      while (i < str.length && str[i] === char) {
        count++;
        i++;
      }

      // Valid code block requires exactly 3 backticks/tildes
      if (count === 3) {
        let language = str.substring(i).trim();
        return { codeType: blockLevelMarkDownTokenTypes.code, language };
      }

      return false;
    }

    break; // Stop checking once a non-space/non-code character is found
  }

  return false;
}

/**
 *
 * @param {string} str
 */
function isCodeBlock(str) {
  var amountOfInd = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === " " || str[i] === "") {
      amountOfInd++;
      if (amountOfInd >= 4) {
        return true;
      }
    } else {
      if (str.split("`").length - 1 >= 3 || str.split("~").length - 1 >= 3) {
        return true;
      } else {
        return false;
      }
    }
  }
}

/**
 * @param {string} str string to check if it is a valid block quote
 */
function isBlockQuote(str) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === " " || str[i] === "") {
      continue;
    } else {
      if (str[i] === ">") {
        return true;
      } else {
        return false;
      }
    }
  }
}

/**
 *
 * @param {string} str
 */
function isValidList(str) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === " " || str[i] === "") {
      continue;
    } else {
      if (str[i] === "-" || str[i] === "*" || str[i] === "+") {
        if (str[i + 1] === " ") {
          return true;
        } else {
          return false;
        }
      } else {
        if (isNumber(str[i]) && str[i + 1] === "." && str[i + 2] === " ") {
          return true;
        }
        return false;
      }
    }
  }
}

/**
 *
 * @param {string} str
 */
function isList(str) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "" || str[i] === " ") {
      continue;
    } else {
      if (
        str[i] === "-" ||
        str[i] === "*" ||
        str[i] === "+" ||
        isNumber(str[i])
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
}

function isValidHeading(str) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "" || str[i] === " ") {
      continue;
    } else {
      if (str[i] === "#") {
        var amountOfHashes = 0;
        for (let j = 0; j < str.length; j++) {
          if (str[i + j] === "#") {
            amountOfHashes++;
          } else {
            break;
          }
        }

        if (amountOfHashes == 0) return false;

        if (str[i + amountOfHashes] === " ") {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }
}

/**
 *
 * @param {string} str
 */
function isHeadingBlock(str) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "" || str[i] === " ") {
      continue;
    } else {
      if (str[i] === "#") {
        return true;
      } else {
        return false;
      }
    }
  }
}

/**
 *
 * @param {string} str
 */
function isValidHorizontalRule(str) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "" || str[i] === " ") {
      continue;
    } else {
      if (str[i] === "-" || str[i] === "*" || str[i] === "_") {
        var amountOfConsSpecialChars = 0;

        for (let j = i; j < str.length; j++) {
          if (str[j] === "-" || str[j] === "*" || str[j] === "_") {
            amountOfConsSpecialChars++;
            continue;
          } else {
            return false;
          }
        }

        if (amountOfConsSpecialChars < 3) return false;

        return true;
      }
    }
  }
}

/**
 *
 * @param {string} str
 */
function isHorizontalRule(str) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "" || str[i] === " ") {
      continue;
    } else {
      if (str[i] === "-" || str[i] === "_" || str[i] === "*") {
        if (
          str.split("-").length - 1 >= 3 ||
          str.split("_").length - 1 >= 3 ||
          str.split("*").length - 1 >= 3
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }
}

function isNumber(str) {
  return !isNaN(str) && str.trim() !== "";
}

/**
 * Object that stores all the markdown token types we support / use to know what type the token is for block level elements
 * block level elements are whole line elements
 */
const blockLevelMarkDownTokenTypes = {
  heading: "heading",
  blockquote: "blockquote",
  listItem: "list item",
  code: "code",
  tabs: "tabs",
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
 * @typedef {Object} BlockToken
 * @property {string} type - The type of Markdown element (e.g., "heading", "paragraph", "bold").
 * @property {string} content - The text content of the token.
 * @property {number} [level] - Optional property for headings (e.g., `1` for `# Heading 1`) or other stuff relating to a token type.
 * @property {Array<InlineToken>} inlineTokens - List of inline tokens for this block element
 * @property {string} language a programming language name
 */

/**
 * @typedef {Object} InlineToken
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

  const markDownString2 = `
\`\`\`js
xwxw
\`\`\`

~~~   
          ocowmc`;

  tokenizeMarkdown(markDownString2);
}

testMain();

// Use node index.js for testing
