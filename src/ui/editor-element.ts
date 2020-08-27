import { LitElement, customElement, html, css, internalProperty } from 'lit-element';
import { Nullable } from '../global';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, debounceTime, startWith } from 'rxjs/operators';
import { ImageEditor } from '../editor/image-editor';

@customElement('editor-element')
export class EditorElement extends LitElement {
    static get styles() {
        return css`
            #editor-container {
                width: 100%;
                height: 90%;
                overflow: scroll;
            }
        `;
    }

    private _containerElement?: HTMLDivElement;
    private _imageEditor?: ImageEditor;
    private _destroy = new Subject<void>();

    constructor() {
        super();

        // fromEvent(window, 'resize')
        //     .pipe(startWith(null), debounceTime(100), takeUntil(this._destroy))
        //     .subscribe(() => {
        //         if (this._containerElement) {
        //             this._canvasSize = {
        //                 x: this._containerElement.clientWidth,
        //                 y: this._containerElement.clientHeight
        //             };
        //         }
        //     });
    }

    render() {
        return html`
            <div id="editor-container">
            </div>
            <button @click="${this.drawClickHandler}">Draw</button>
            <button @click="${this.grayscaleClickHandler}">Grayscale</button>
        `;
    }

    firstUpdated() {
        this._containerElement = this.shadowRoot?.querySelector('#editor-container') as HTMLDivElement;
        this._imageEditor = new ImageEditor(this._containerElement);
    }

    private drawClickHandler() {
        this._imageEditor?.loadImage('/assets/example_image_large.jpg');
    }

    private grayscaleClickHandler() {
        this._imageEditor?.grayscale();
    }

    disconnectedCallback() {
        this._destroy.next();
        this._destroy.complete();
    }
}
