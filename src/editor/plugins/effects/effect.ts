import { EffectContext } from './effect-context.interface';

export abstract class Effect {
    constructor(protected readonly context: EffectContext) {}

    abstract manipulate(pixelData: Uint8ClampedArray): void;

    /**
     * Gets the pixel value at a specific x,y coordinate.
     * @param pixelData The image data
     * @param x The X coordinate of the pixel
     * @param y The Y coordinate of the pixel
     * @param channel Red = 0, Green = 1, Blue = 2, Alpha = 3
     */
    protected pixel(pixelData: Uint8ClampedArray, x: number, y: number, channel: number = 0): number {
        return pixelData[(this.context.width * y + x) * 4 + channel];
    }
}
