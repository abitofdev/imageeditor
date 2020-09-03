import { Grayscale } from './effects/grayscale/grayscale';
import { Sobel } from './effects/sobel/sobel';
import { ColorSpace } from './effects/grayscale/color-space.enum';
import { ImageTransformation } from '../shared/image-transformation';

export abstract class Transformations {
    public static grayscale(colorSpace: ColorSpace): ImageTransformation {
        const grayscale = new Grayscale(colorSpace);
        return new ImageTransformation(grayscale);
    }

    public static sobel(threshold: number): ImageTransformation {
        const grayscale = new Grayscale(ColorSpace.Linear);
        const sobel = new Sobel(threshold);
        return new ImageTransformation(grayscale, sobel);
    }
}
