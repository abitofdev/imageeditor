import { Effect } from './effect.interface';

export class Grayscale implements Effect {
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
            gray = r * 0.3 + g * 0.59 + b * 0.11;

            pixelData[x] = gray;
            pixelData[x + 1] = gray;
            pixelData[x + 2] = gray;
        }
    }
}
