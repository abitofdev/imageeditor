import { Effect } from '../effect';
import { SobelKernals } from './sobel-kernals';

export class Sobel extends Effect {
    public manipulate(pixelData: Uint8ClampedArray): void {
        let index = 0;

        for (let y = 0; y < this.context.height; y++) {
            for (let x = 0; x < this.context.width; x++) {
                var r = this.pixel(pixelData, x, y, 0);
                var g = this.pixel(pixelData, x, y, 1);
                var b = this.pixel(pixelData, x, y, 2);

                var avg = (r + g + b) / 3;
                pixelData[index] = avg;
                pixelData[index + 1] = avg;
                pixelData[index + 2] = avg;
                pixelData[index + 3] = 255;

                index += 4;
            }
        }

        index = 0;

        for (let y = 0; y < this.context.height; y++) {
            for (let x = 0; x < this.context.width; x++) {
                // for (let c = 0; c <= 3; c++) {
                //     if (c === 3) {
                //         index++;
                //         break;
                //     }

                const pixelX =
                    SobelKernals.x[0][0] * this.pixel(pixelData, x - 1, y - 1) +
                    SobelKernals.x[0][1] * this.pixel(pixelData, x, y - 1) +
                    SobelKernals.x[0][2] * this.pixel(pixelData, x + 1, y - 1) +
                    SobelKernals.x[1][0] * this.pixel(pixelData, x - 1, y) +
                    SobelKernals.x[1][1] * this.pixel(pixelData, x, y) +
                    SobelKernals.x[1][2] * this.pixel(pixelData, x + 1, y) +
                    SobelKernals.x[2][0] * this.pixel(pixelData, x - 1, y + 1) +
                    SobelKernals.x[2][1] * this.pixel(pixelData, x, y + 1) +
                    SobelKernals.x[2][2] * this.pixel(pixelData, x + 1, y + 1);

                const pixelY =
                    SobelKernals.y[0][0] * this.pixel(pixelData, x - 1, y - 1) +
                    SobelKernals.y[0][1] * this.pixel(pixelData, x, y - 1) +
                    SobelKernals.y[0][2] * this.pixel(pixelData, x + 1, y - 1) +
                    SobelKernals.y[1][0] * this.pixel(pixelData, x - 1, y) +
                    SobelKernals.y[1][1] * this.pixel(pixelData, x, y) +
                    SobelKernals.y[1][2] * this.pixel(pixelData, x + 1, y) +
                    SobelKernals.y[2][0] * this.pixel(pixelData, x - 1, y + 1) +
                    SobelKernals.y[2][1] * this.pixel(pixelData, x, y + 1) +
                    SobelKernals.y[2][2] * this.pixel(pixelData, x + 1, y + 1);

                const magnitude = Math.sqrt(pixelX * pixelX + pixelY * pixelY) >>> 0;
                pixelData[index] = magnitude;
                pixelData[index + 1] = magnitude;
                pixelData[index + 2] = magnitude;
                pixelData[index + 3] = 255;
                index += 4;
                // }
            }
        }

        console.log(index);
    }
}
