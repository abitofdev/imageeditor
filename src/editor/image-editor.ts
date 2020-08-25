import { IImageEditorConstructorOptions } from './image-editor-constructor-options.interface';
import { fromEvent } from 'rxjs';
import { takeUntil, map, filter } from 'rxjs/operators';
import { IDisposable } from './shared/disposable.interace';
import { Grayscale } from './plugins/effects/grayscale';

const defaultImageEditorConstructorOptions: IImageEditorConstructorOptions = {
    alpha: false
};

/**
 * Provides functionality for editing images in the browser using Canvas2D.
 */
export class ImageEditor implements IDisposable {
    private readonly _hostElement: HTMLElement;
    private readonly _canvasElement: HTMLCanvasElement;
    private readonly _renderingContext: CanvasRenderingContext2D;
    private readonly _imageEditorOptions: IImageEditorConstructorOptions;
    /**
     * Initializes an instance of @see ImageEditor
     * @param hostElement The HTML element that will host the canvas
     * @param options Additional options for configuring the image editor
     */
    constructor(hostElement: HTMLElement, options?: Partial<IImageEditorConstructorOptions>) {
        this._hostElement = hostElement;
        this._imageEditorOptions = { ...defaultImageEditorConstructorOptions, ...options };

        this._canvasElement = document.createElement('canvas');
        this._hostElement.appendChild(this._canvasElement);

        this._renderingContext = this._canvasElement.getContext('2d', {
            alpha: this._imageEditorOptions.alpha
        }) as CanvasRenderingContext2D;
    }

    public loadImage(imageSource: string) {
        const image = new Image();
        image.onload = () => {
            this._canvasElement.width = image.width;
            this._canvasElement.height = image.height;
            (this._renderingContext as any).drawImage(image, 0, 0);
        };
        image.src = imageSource;
    }

    public grayscale() {
        const imageData = this._renderingContext?.getImageData(
            0,
            0,
            this._canvasElement.width,
            this._canvasElement.height
        ) as ImageData;
        const pixelData = imageData.data;
        console.log(pixelData.length);

        new Grayscale().manipulate(pixelData);

        this._renderingContext?.putImageData(imageData, 0, 0);
    }

    dispose() {}
}
