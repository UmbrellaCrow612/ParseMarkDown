/**
 *
 * @param {number} position
 * @param {string} markdown
 */
function isSubList(position, markdown) {
  if (!isClean(position, markdown)) return false;

  let count = countWhiteSpaceBackwards(position, markdown);
  if (count == 2) {
    if (markdown[position] === "-" && markdown[position + 1] === " ") {
      return true;
    }

    if (markdown[position] === "*" && markdown[position + 1] === " ") {
      return true;
    }

    if (markdown[position] === "+" && markdown[position + 1] === " ") {
      return true;
    }
  }
  return false;
}

function moveAfterList(position, markdown) {
  var newLine = markdown.indexOf("\n", position);
  if (newLine === -1) {
    newLine = markdown.length;
  }

  return Math.min(newLine, markdown.length);
}

/**
 *
 * @param {number} position
 * @param {string} markdown
 */
function extractListContent(position, markdown) {
  var newLine = markdown.indexOf("\n", position);
  if (newLine === -1) newLine = markdown.length;

  return markdown.substring(position + 1, newLine).trim();
}

/**
 *
 * @param {number} position
 * @param {string} markdown
 */
function countWhiteSpaceBackwards(position, markdown) {
  let counter = 0;

  for (let i = position - 1; i >= 0; i--) {
    const char = markdown[i];

    if (char === "\n" || (char !== " " && char !== "\t")) {
      return counter;
    }

    counter++;
  }

  return counter;
}

/**
 *
 * @param {number} position
 * @param {string} markdown
 */
function isList(position, markdown) {
  if (!isClean(position, markdown)) return false;
  let num = countWhiteSpaceBackwards(position, markdown);
  if (num == 2) {
    return false; // could be a su list
  }

  let character = markdown[position];

  if (character == "-" && markdown[position + 1] == " ") {
    return true;
  }

  if (character == "*" && markdown[position + 1] == " ") {
    return true;
  }

  if (character == "+" && markdown[position + 1] == " ") {
    return true;
  }

  return false;
}

/**
 * @param {number} level
 * @param {number} position
 * @param {string} markdown
 */
function extractBlockQuoteContent(position, markdown, level) {
  var newLine = markdown.indexOf("\n", position);
  if (newLine === -1) newLine = markdown.length;

  var line = markdown.substring(position, newLine).trim();

  return line.substring(level).trim();
}

/**
 *
 * @param {number} position
 * @param {string} markdown
 */
function moveAfterBlockQuote(position, markdown) {
  var newLine = markdown.indexOf("\n", position);
  if (newLine === -1) newLine = markdown.length;

  return Math.min(newLine, markdown.length);
}

/**
 *
 * @param {number} position
 * @param {string} markdown
 */
function countBlockQuoteLevel(position, markdown) {
  let counter = 0;
  while (position < markdown.length) {
    if (markdown[position] === ">") {
      counter++;
      position++;
      continue;
    } else if (markdown[position] === " ") {
      position++;
      continue;
    } else {
      return counter;
    }
  }

  return counter;
}

/**
 * Checks if a given position in the markdown content starts a blockquote.
 *
 * @param {number} position - The index in the markdown string.
 * @param {string} markdown - The markdown content.
 * @returns {boolean} - True if the position starts a blockquote, false otherwise.
 */
function isBlockQuote(position, markdown) {
  if (!isClean(position, markdown)) return false;

  let i = position;

  while (i < markdown.length && markdown[i] === " ") {
    i++;
  }

  if (i < markdown.length && markdown[i] === ">") {
    i++;
    if (i < markdown.length && markdown[i] === " ") {
      i++;
    }
    return true;
  }

  return false;
}

/**
 * Returns the new position after the horizontal rule
 * @param {string} position
 * @param {string} markdown
 */
function moveAfterHorizontalRule(position, markdown) {
  let newLine = markdown.indexOf("\n", position);
  if (newLine === -1) newLine = markdown.length;

  return Math.min(newLine, newLine);
}

/**
 * Checks if the given position in the markdown is "clean"
 * (no non-whitespace characters before it up to a newline or the start).
 *
 * @param {number} position - The index in the markdown string to check from.
 * @param {string} markdown - The markdown content as a string.
 * @returns {boolean} - Returns true if the position is clean, false otherwise.
 */
function isClean(position, markdown) {
  let c = 0;
  for (let i = position - 1; i >= 0; i--) {
    let character = markdown[i];
    if (character === "\n") return true;
    if (character !== " " && character !== "\t") return false;
    c++;
    if (c >= 4) return false;
  }
  return true;
}

/**
 * Checks if a character repeats until the new line or there is whitespace.
 * @param {string} character
 * @param {number} position
 * @param {string} markdown
 * @returns {boolean}
 */
function isThisCharacterUntilNewLine(character, position, markdown) {
  let newLine = markdown.indexOf("\n", position);
  if (newLine === -1) newLine = markdown.length;
  return markdown
    .substring(position, newLine)
    .trim()
    .split("")
    .every((char) => char === character);
}

/**
 * Checks if the position in the markdown is a horizontal rule.
 * @param {number} position - The index position in the markdown.
 * @param {string} markdown - The markdown content as a string.
 * @returns {boolean} - Returns true if it's a valid horizontal rule.
 */
function isHorizontalRule(position, markdown) {
  if (!isClean(position, markdown)) return false;

  let line = markdown.substring(position).split("\n")[0].trim();
  if (line.length < 3) return false;

  let firstChar = line[0];
  if (!["-", "*", "_"].includes(firstChar)) return false;

  return isThisCharacterUntilNewLine(firstChar, position, markdown);
}

/**
 * Moves the position to the first character after a heading.
 *
 * @param {number} position - The index where the heading starts.
 * @param {string} markdown - The markdown text.
 * @returns {number} - The new position after the heading.
 */
function moveAfterHeading(position, markdown) {
  if (position < 0 || position >= markdown.length) return markdown.length;

  let newLine = markdown.indexOf("\n", position);

  // If no newline is found, move to the end of the string
  if (newLine === -1) {
    return markdown.length;
  }

  // Return the position after the newline, ensuring it doesn't exceed bounds
  return Math.min(newLine, markdown.length);
}

/**
 * Extracts the heading content from a markdown string.
 *
 * @param {number} position - The index where the heading starts.
 * @param {string} markdown - The markdown text.
 * @param {number} level - The heading level (number of `#` symbols).
 * @returns {string} - The extracted heading content.
 */
function extractHeadingContent(position, markdown, level) {
  if (position < 0 || position >= markdown.length) return "";

  let newLine = markdown.indexOf("\n", position);
  if (newLine === -1) {
    newLine = markdown.length;
  }

  let contentStart = position + level;

  // Ensure we skip exactly one space after the `#` symbols
  if (contentStart < markdown.length && markdown[contentStart] === " ") {
    contentStart++;
  }

  return markdown.substring(contentStart, newLine).trim();
}

/**
 * Counts the heading level (number of `#` symbols) in a markdown string,
 * ignoring leading spaces before the first `#`.
 *
 * @param {number} position - The index in the markdown string to check.
 * @param {string} markdown - The markdown text.
 * @returns {number} - The heading level (number of `#` symbols), or 0 if not a valid heading.
 */
function countHeadingLevel(position, markdown) {
  if (position < 0 || position >= markdown.length) return 0;

  let counter = 0;
  let seenHash = false;

  // Step 1: Skip leading spaces
  while (position < markdown.length && markdown[position] === " ") {
    position++;
  }

  // Step 2: Count `#` symbols
  while (position < markdown.length && markdown[position] === "#") {
    counter++;
    seenHash = true;
    position++;
  }

  // Step 3: Ensure there's a space after the last `#`
  if (seenHash && position < markdown.length && markdown[position] === " ") {
    return counter;
  }

  return 0; // Not a valid heading
}

/**
 * Determines if the given position in the markdown is part of a heading.
 *
 * @param {number} position - The index in the markdown string to check.
 * @param {string} markdown - The markdown text.
 * @returns {boolean} - True if the position is part of a heading, otherwise false.
 */
function isHeading(position, markdown) {
  if (position < 0 || position >= markdown.length) return false;

  let backtrackPosition = position;
  let whiteSpaceCounter = 0;
  let hasSeenNonHeaderCh = false;

  while (backtrackPosition >= 0) {
    let currentChar = markdown[backtrackPosition];

    if (currentChar === " ") {
      whiteSpaceCounter++;
    } else if (currentChar === "\n") {
      if (whiteSpaceCounter < 4) {
        break;
      }
    } else if (currentChar !== "#") {
      hasSeenNonHeaderCh = true;
    }

    if (hasSeenNonHeaderCh) {
      return false;
    }

    if (whiteSpaceCounter > 4 && currentChar !== "\n") {
      return false;
    }

    backtrackPosition--;
  }

  if (markdown[position] === "#") {
    let hashCount = 0;

    while (position < markdown.length && markdown[position] === "#") {
      hashCount++;
      position++;
    }

    return markdown[position] === " ";
  }

  return false;
}

/**
 *
 * @param {string} markdown
 */
function tokenizeMarkDown(markdown) {
  const tokens = [];
  let position = 0;

  while (position < markdown.length) {
    if (isHeading(position, markdown)) {
      let level = countHeadingLevel(position, markdown);
      let content = extractHeadingContent(position, markdown, level);
      position = moveAfterHeading(position, markdown);
      tokens.push({ level, content, type: "heading" });
    } else if (isHorizontalRule(position, markdown)) {
      position = moveAfterHorizontalRule(position, markdown);
      tokens.push({ type: "horizontal rule" });
    } else if (isBlockQuote(position, markdown)) {
      let level = countBlockQuoteLevel(position, markdown);
      let content = extractBlockQuoteContent(position, markdown, level);
      position = moveAfterBlockQuote(position, markdown);
      tokens.push({ level, content, type: "block quote" });
    } else if (isList(position, markdown)) {
      let content = extractListContent(position, markdown);
      position = moveAfterList(position, markdown);
      tokens.push({ content, type: "list item" });
    } else if (isSubList(position, markdown)) {
      let content = extractListContent(position, markdown);
      position = moveAfterList(position, markdown);
      tokens.push({ content, type: "sub list" });
    }
    position++;
  }

  return tokens;
}

function main() {
  var markdown = `
- List one
  - Sub list one
+ List two 
  + Sub list two
* List three 
  * Sub list three
`;

  var markdown2 = `+ Hello`;
  var t = tokenizeMarkDown(markdown);
  console.log(t);
}

main();
