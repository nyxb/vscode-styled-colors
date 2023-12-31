import type { DocumentLine, LineExtraction } from '../util/color-util'
import { flattenLineExtractionsFlatten } from '../util/color-util'
import type { IStrategy } from '../extractor-mixin'
import { Extractor } from '../extractor-mixin'
import type { IColor } from './color'

export interface IColorStrategy extends IStrategy {
   extractColors(fileLines: DocumentLine[]): Promise < LineExtraction[] >
   extractColor(text: string): IColor
}
class ColorExtractor extends Extractor {
   public async extract(fileLines: DocumentLine[]): Promise < LineExtraction[] > {
      const colors = await Promise.all(this.enabledStrategies.map(strategy => (<IColorStrategy> strategy).extractColors(fileLines)))
      return flattenLineExtractionsFlatten(colors) // should regroup per lines?
   }

   public extractOneColor(text: string): IColor {
      const colors = this.enabledStrategies.map(strategy => (<IColorStrategy> strategy).extractColor(text))
      return colors.find(color => color !== null)
   }
}
const instance = new ColorExtractor()
export default instance
