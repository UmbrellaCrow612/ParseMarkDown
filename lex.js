/**
 * File overview:
 *
 * Reason: Break the source file into individual words, or tokens.
 * 
 * Use regular expressions.
 * 
 *  lexical specification should be complete, always matching some
    initial substring of the input; we can always achieve this by having a rule that
    matches any single character (and in this case, prints an “illegal character”
    error message and continues).

    The job of a lexical analyzer is to find the longest match, the
    longest initial substring of the input that is a valid token. 
    The lexer must keep track of the longest match seen so far, and the
    position of that match.

    Lex is a lexical analyzer generator that produces a markdown from a lexical
    specification. For each token type in markdown to be lexically
    analyzed, the specification contains a regular expression and an action.


    use rules ?
 */

/**
 *
 */
class Lexer {}
