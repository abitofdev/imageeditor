import { Effect } from '../effect';
import { EffectContext } from '../effect-context.interface';

export class Sobel extends Effect {
    /**
     * The horizontal Sobel convolution kernel
     */
    public static readonly Kx = [-1, 0, +1, -2, 0, +2, -1, 0, +1];

    /**
     * The vertical Sobel convolution kernel
     */
    public static readonly Ky = [-1, -2, -1, 0, 0, 0, +1, +2, +1];

    private readonly _threshold: number;

    constructor(context: EffectContext, threshold: number = 0) {
        super(context);
        this._threshold = this.scaleToRange(threshold, 0, 100, 0, 255);
    }

    public manipulate(pixelData: Uint8ClampedArray): void {
        const width = this.context.width;
        const height = this.context.height;
        const originalPixelData = pixelData.slice(0);

        let i = 0;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let cx = 0;
                let cy = 0;
                let j = 0;
                for (let yk = y - 1; yk <= y + 1; yk++) {
                    for (let xk = x - 1; xk <= x + 1; xk++) {
                        let i = (yk * width + xk) << 2;
                        cx += originalPixelData[i] * Sobel.Kx[j];
                        cy += originalPixelData[i] * Sobel.Ky[j];
                        j++;
                    }
                }
                let mag = Math.hypot(cx, cy);
                mag = mag > this._threshold ? mag : 0;

                pixelData[i + 0] = mag;
                pixelData[i + 1] = mag;
                pixelData[i + 2] = mag;
                pixelData[i + 3] = 255;
                i += 4;
            }
        }
    }

    private scaleToRange(value: number, sourceMin = 0, sourceMax = 100, outputMin = 0, outputMax = 255): number {
        return ((value - sourceMin) * (outputMax - outputMin)) / (sourceMax - sourceMin) + outputMin;
    }
}
