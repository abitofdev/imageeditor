import { LitElement, customElement, html, css, internalProperty } from 'lit-element';
import { Nullable } from '../global';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, debounceTime, startWith } from 'rxjs/operators';

@customElement('editor-element')
export class EditorElement extends LitElement {
    static get styles() {
        return css`
            #editor-container {
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
        `;
    }

    @internalProperty()
    private _canvasSize: { x: number; y: number } = { x: 1, y: 1 };
    private _canvas2D?: CanvasRenderingContext2D;
    private _containerElement?: HTMLDivElement;

    private _destroy = new Subject<void>();

    constructor() {
        super();

        fromEvent(window, 'resize')
            .pipe(startWith(null), debounceTime(100), takeUntil(this._destroy))
            .subscribe(() => {
                if (this._containerElement) {
                    this._canvasSize = {
                        x: this._containerElement.clientWidth,
                        y: this._containerElement.clientHeight
                    };
                }
            });
    }

    render() {
        return html` <div id="editor-container">
            <canvas id="canvas" width=${this._canvasSize.x} height=${this._canvasSize.y}></canvas>
        </div>`;
    }

    firstUpdated() {
        this._containerElement = this.shadowRoot?.querySelector('#editor-container') as HTMLDivElement;

        const canvas: Nullable<HTMLCanvasElement> = this.shadowRoot?.querySelector('#canvas');
        if (canvas) {
            this._canvas2D = canvas.getContext('2d', { alpha: false }) as CanvasRenderingContext2D;
        }
    }

    disconnectedCallback() {
        this._destroy.next();
        this._destroy.complete();
    }
}
