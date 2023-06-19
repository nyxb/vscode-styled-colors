import ColorExtractor from '../color-extractor'
import Color from '../color'
import { DOT_VALUE, EOL } from '../../util/regexp'
import ColorStrategy from './__strategy-base'

const R_RED = `(?:\\d{1,3}${DOT_VALUE}?|${DOT_VALUE})`
const R_GREEN = R_RED
const R_BLUE = R_RED
const R_ALPHA_PERCENT = `(?:\\d{1,3}%${DOT_VALUE}?)`
const R_ALPHA_DECIMAL = `(?:\\d*(?:${DOT_VALUE}\\d*)?)`

export const REGEXP = new RegExp(`(rgba?\\(\\s*${R_RED}\\s*(?:,\\s*|\\s+)?${R_GREEN}\\s*(?:,\\s*|\\s+)?${R_BLUE}\\s*(?:/\\s*|,\\s*|\\s+)?(?:${R_ALPHA_DECIMAL}|${R_ALPHA_PERCENT})?\\s*\\))${EOL}`, 'gi')
export const REGEXP_ONE = new RegExp(`^(rgba?\\(\\s*${R_RED}\\s*(?:,\\s*|\\s+)?${R_GREEN}\\s*(?:,\\s*|\\s+)?${R_BLUE}\\s*(?:/\\s*|,\\s+)?(?:${R_ALPHA_DECIMAL}|${R_ALPHA_PERCENT})?\\s*\\))${EOL}`, 'i')

function extractRGBA(value: string): number[] {
   const rgba_string = value.replace(/rgba?\(/, '').replace(/\)/, '').replace('/', ',')
   let parts
   if (rgba_string.includes(','))
      parts = rgba_string.split(/,\s*/)

   else
      parts = rgba_string.split(/\s+/)

   parts = parts.map((c) => {
      if (c.endsWith('%'))
         return parseFloat(c.slice(0, -1)) / 100 // Convert percentage to decimal

      else
         return parseFloat(c) // Keep as decimal
   })

   // Normalize alpha to 1 if it's over 1 (when it was a percentage)
   if (parts[3] > 1)
      parts[3] = 1

   return parts
}

function getColor(match: RegExpExecArray): Color {
   const value = match[1]
   const rgba = extractRGBA(value)
   const alpha = rgba[3] || 1
   const rgb = rgba.slice(0, 3) as [number, number, number]

   // Check if it's a valid rgb(a) color
   if (rgb.every(c => c <= 255))
      return new Color(match[1], match.index, rgb, alpha)

   return null
}

const strategy = new ColorStrategy('RGB', REGEXP, REGEXP_ONE, getColor)
ColorExtractor.registerStrategy(strategy)
