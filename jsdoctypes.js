/**
 * Block level token
 * @typedef {Object} Token
 * @property {string|null} content - The content of a token.
 * @property {number | null} level - Optional level, can indicate heading level or other metrics that make sense for the type of token it is.
 * @property {string} type - The type of token it is, referencing the keys of the elementTypes object.
 * @property {string|null} language - Optional property which specifies a programming language name.
 * @property {Array<InlineToken>} inlineTokens - All the inline tokens contained within the block level element
 */

/**
 * Inline level token
 * @typedef {Object} InlineToken
 * @property {number} startIndex - Start index of the inline token
 * @property {number} endIndex - End index of the inline token
 */
