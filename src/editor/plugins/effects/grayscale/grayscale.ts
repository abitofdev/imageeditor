import { Effect } from '../effect';
import { EffectContext } from '../effect-context.interface';
import { ColorSpace } from './color-space.enum';

export class Grayscale extends Effect {
    private readonly _colorSpace: ColorSpace;

    constructor(colorSpace: ColorSpace) {
        super();
        this._colorSpace = colorSpace;
    }

    public manipulate({ pixelData }: EffectContext): void {
        const length = pixelData.length;

        let r = 0;
        let g = 0;
        let b = 0;
        let gray = 0;

        for (let x = 0; x < length; x += 4) {
            r = pixelData[x];
            g = pixelData[x + 1];
            b = pixelData[x + 2];

            switch (this._colorSpace) {
                case ColorSpace.Linear:
                    gray = (r + g + b) / 3;
                    break;
                case ColorSpace.SRGB:
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
