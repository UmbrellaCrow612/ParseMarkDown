/**
 * Get the index of the next newline from the current position
 * @param {number} position
 * @param {string} markdown
 * @returns {number} the index of the new line
 */
function getNewLineIndex(position, markdown) {
  let newLine = markdown.indexOf("\n", position);
  if (newLine === -1) newLine = markdown.length;
  return newLine;
}

/**
 * Helper function to return the current line and next line from a position within the markdown with both separated by a new line
 * @param {number} position current position within the markdown
 * @param {string} markdown markdown as string
 * @returns {string} current line and next line separated by a new line
 */
function getCurrentLineAndNext(position, markdown) {
  let newLineIndexFormCurrentPosition = getNewLineIndex(position, markdown);
  let secondNewLineIndex = getNewLineIndex(
    newLineIndexFormCurrentPosition + 1,
    markdown
  );

  return markdown.substring(position, secondNewLineIndex);
}

module.exports = {
  getNewLineIndex,
  getCurrentLineAndNext,
};
