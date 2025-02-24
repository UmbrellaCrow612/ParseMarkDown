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
  return Math.min(newLine + 1, markdown.length);
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
    } else {
      position++;
    }
  }

  return tokens;
}

function main() {
  var markdown = `### Hello
 ### hello
mmqmdmd ####n
###### hello #####`;
  var t = tokenizeMarkDown(markdown);
  console.log(t);
}

main();
