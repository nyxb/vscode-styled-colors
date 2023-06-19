const EOL = '(?:$|`|"|\'|,| |;|\\)|\\r|\\n|\}|<)'

const DOT_VALUE = '(?:\\.\\d+)' // ['.x', '']
const ALPHA = `(?:1(:?\\.0+)?|0${DOT_VALUE}?|${DOT_VALUE})` // ['0', '1', '0.x', '1.0', '.x']
const HEXA_VALUE = '[\\da-f]' // [1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']
const R_ALPHA_PERCENT = `(?:\\d{1,3}%${DOT_VALUE}?)`
const R_ALPHA_DECIMAL = `(?:\\d+(?:${DOT_VALUE}\\d*)?|${DOT_VALUE})`

export { EOL, ALPHA, DOT_VALUE, HEXA_VALUE, R_ALPHA_PERCENT, R_ALPHA_DECIMAL }
