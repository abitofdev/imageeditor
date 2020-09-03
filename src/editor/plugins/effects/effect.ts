import { EffectContext } from './effect-context.interface';

export abstract class Effect {
    abstract manipulate(effectContext: EffectContext): void;

    /**
     * Gets the pixel value at a specific x,y coordinate.
     * @param x The X coordinate of the pixel
     * @param y The Y coordinate of the pixel
     * @param channel Red = 0, Green = 1, Blue = 2, Alpha = 3
     */
    protected pixel({ pixelData, width }: EffectContext, x: number, y: number, channel: number = 0): number {
        return pixelData[(width * y + x) * 4 + channel];
    }
}
