import { Effect } from '../effect';
import { EffectContext } from '../effect-context.interface';

export class Grayscale extends Effect {

    private readonly _colorSpace: 'linear' | 'sRGB';

    constructor(context: EffectContext, colorSpace: 'linear' | 'sRGB' = 'sRGB') {
        super(context);        
        this._colorSpace = colorSpace;
    }

    public manipulate(pixelData: Uint8ClampedArray): void {
        const length = pixelData.length;

        let r = 0;
        let g = 0;
        let b = 0;
        let gray = 0;

        for (let x = 0; x < length; x += 4) {
            r = pixelData[x];
            g = pixelData[x + 1];
            b = pixelData[x + 2];
            
            switch(this._colorSpace) {
                case 'linear': 
                    gray = (r + g + b) / 3;
                    break;
                case 'sRGB':
                    gray = r * 0.3 + g * 0.59 + b * 0.11;
                    break;
                default:
                    throw new Error(`${this._colorSpace} not implemented`);
            }

            pixelData[x] = gray;
            pixelData[x + 1] = gray;
            pixelData[x + 2] = gray;
        }
    }
}
