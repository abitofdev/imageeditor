import { Effect } from '../effect';
import { EffectContext } from '../effect-context.interface';

export class Contrast extends Effect {
    private readonly _amount: number;

    constructor(amount: number) {
        super();
        this._amount = amount;
    }

    public manipulate({ pixelData }: EffectContext): void {
        const length = pixelData.length;
        const cFactor = (259 * (this._amount + 255)) / (255 * (259 - this._amount));

        let r = 0;
        let g = 0;
        let b = 0;

        for (let x = 0; x < length; x += 4) {
            r = cFactor * (pixelData[x] - 128) + 128;
            g = cFactor * (pixelData[x + 1] - 128) + 128;
            b = cFactor * (pixelData[x + 2] - 128) + 128

            pixelData[x] = this.clamp(r, 0, 255);
            pixelData[x + 1] = this.clamp(g, 0, 255);
            pixelData[x + 2] = this.clamp(b, 0, 255);
        }
    }

    private clamp(input: number, min: number, max: number) {
        return Math.max(min, Math.min(max, input));
    }
}
