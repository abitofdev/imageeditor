import { LitElement, customElement, html} from 'lit-element';

@customElement('editor-element')
export class EditorElement extends LitElement {


    render() {
        return html`
        <h1>Hello world</h1>
        `;
    }
}