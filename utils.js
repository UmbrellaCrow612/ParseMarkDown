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

module.exports = {
  getNewLineIndex,
};
