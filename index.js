/**
 *
 * @param {string} position
 * @param {string} markdown
 */
function moveAfterHeading(position, markdown) {
  var newLine = markdown.indexOf("\n", position);
  if (newLine === -1) {
    newLine = markdown.length;
  }
  return newLine + 1;
}

/**
 *
 * @param {string} position
 * @param {string} markdown
 */
function extractHeadingContent(position, markdown) {
  let newLine = markdown.indexOf("\n", position);
  if (newLine === -1) {
    newLine = markdown.length;
  }
  return markdown.substring(position, newLine);
}

/**
 *
 * @param {string} position
 * @param {string} markdown
 */
function countHeadingLevel(position, markdown) {
  let count = 0;
  let p = position;
  while (p < markdown.length) {
    if (markdown[p] === "#") {
      count++;
      p++;
    } else {
      return count;
    }
  }
}

/**
 *
 * @param {string} position
 * @param {string} markdown
 */
function isHeading(position, markdown) {
  let p = position;

  if (markdown[p] === "#") {
    while (p < markdown.length) {
      if (markdown[p] === "#") {
        p++;
      } else {
        if (markdown[p] === " " && markdown[p - 1] === "#") {
          return true;
        }
        return false;
      }
    }
  }
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
      let content = extractHeadingContent(position, markdown);
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
###wrong
##### Correct`;
  var t = tokenizeMarkDown(markdown);
  console.log(t);
}

main();
