import type { IColorStrategy } from '../color-extractor'
import type { DocumentLine, LineExtraction } from '../../util/color-util'
import type Color from './../color'

type RegexpResultExtractor = (match: RegExpExecArray) => Color

export default class ColorStrategy implements IColorStrategy {
   constructor(
      public name: string,
      private REGEXP: RegExp,
      private REGEXP_ONE: RegExp,
      private colorFromRegexp: RegexpResultExtractor,
   ) {}

   async extractColors(fileLines: DocumentLine[]): Promise<LineExtraction[]> {
      return fileLines.map(({ line, text }) => {
         let match = null
         const colors: Color[] = []

         while ((match = this.REGEXP.exec(text)) !== null) {
            const color = this.colorFromRegexp(match)
            if (color)
               colors.push(color)
         }
         return {
            line,
            colors,
         }
      })
   }

   extractColor(text: string): Color {
      const match: RegExpExecArray = this.REGEXP_ONE.exec(text)
      if (match)
         return this.colorFromRegexp(match)

      return null
   }
}
