import { Grayscale } from './effects/grayscale/grayscale';
import { Sobel } from './effects/sobel/sobel';
import { ColorSpace } from './effects/grayscale/color-space.enum';
import { ImageTransformation } from '../shared/image-transformation';
import { Brightness } from './effects/brightness/brightness';
import { Contrast } from './effects/contrast/contrast';

export abstract class Transformations {
    public static grayscale(colorSpace: ColorSpace): ImageTransformation {
        const grayscaleEffect = new Grayscale(colorSpace);
        return new ImageTransformation(grayscaleEffect);
    }

    public static brightness(amount: number): ImageTransformation {
        const brightnessEffect = new Brightness(amount);
        return new ImageTransformation(brightnessEffect);
    }

    public static contrast(amount: number): ImageTransformation {
        const contrastEffect = new Contrast(amount);
        return new ImageTransformation(contrastEffect);
    }

    public static sobel(threshold: number): ImageTransformation {
        const grayscaleEffect = new Grayscale(ColorSpace.Linear);
        const sobelEffect = new Sobel(threshold);
        return new ImageTransformation(grayscaleEffect, sobelEffect);
    }
}
