
export interface Effect {
    manipulate(pixelData: Uint8ClampedArray): void;
}