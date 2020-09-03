import { Effect } from '../effect';
import { EffectContext } from '../effect-context.interface';

export class Brightness extends Effect {
    private readonly _amount: number;

    constructor(amount: number) {
        super();
        this._amount = amount;
    }

    public manipulate({ pixelData }: EffectContext): void {
        const length = pixelData.length;

        let r = 0;
        let g = 0;
        let b = 0;

        for (let x = 0; x < length; x += 4) {
            r = pixelData[x] + this._amount;
            g = pixelData[x + 1] + this._amount;
            b = pixelData[x + 2] + this._amount;

            pixelData[x] = this.clamp(r, 0, 255);
            pixelData[x + 1] = this.clamp(g, 0, 255);
            pixelData[x + 2] = this.clamp(b, 0, 255);
        }
    }

    private clamp(input: number, min: number, max: number) {
        return Math.max(min, Math.min(max, input));
    }
}
