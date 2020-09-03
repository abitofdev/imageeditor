import { IImageEditorConstructorOptions } from './image-editor-constructor-options.interface';
import { fromEvent } from 'rxjs';
import { takeUntil, map, filter, pluck } from 'rxjs/operators';
import { IDisposable } from './shared/disposable.interface';
import { EffectContext } from './plugins/effects/effect-context.interface';
import { Nullable } from '../global';
import { ImageTransformation } from './shared/image-transformation';

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
        this._canvasElement.setAttribute('style', 'position: absolute');
        this._hostElement.appendChild(this._canvasElement);

        this._renderingContext = this._canvasElement.getContext('2d', {
            alpha: this._imageEditorOptions.alpha
        }) as CanvasRenderingContext2D;
    }

    public loadImage(imageSource: string) {
        const image = new Image();
        image.onload = (e) => {
            this._canvasElement.width = image.width;
            this._canvasElement.height = image.height;

            this._effectContext = {
                width: image.width,
                height: image.height
            } as EffectContext;

            (this._renderingContext as any).drawImage(image, 0, 0);
        };
        image.src = imageSource;
    }

    public apply(imageTransformation: ImageTransformation): ImageEditor {
        if (this._effectContext) {
            const id = this.getImageData();
            const pixelData = id.data;
            const test: EffectContext = {
                width: this._effectContext.width,
                height: this._effectContext.height,
                pixelData: pixelData
            };

            for (let effect of imageTransformation.effects) {
                effect.manipulate(test);
            }

            this._renderingContext?.putImageData(id, 0, 0);
        }
        return this;
    }

    private getImageData(): ImageData {
        if (this._effectContext) {
            const w = this._effectContext.width;
            const h = this._effectContext.height;
            return this._renderingContext?.getImageData(0, 0, w, h) as ImageData;
        }

        throw new Error('image not loaded');
    }

    private _effectContext: Nullable<EffectContext>;
    public get effectContext(): Nullable<EffectContext> {
        return this._effectContext;
    }

    dispose() {}
}
