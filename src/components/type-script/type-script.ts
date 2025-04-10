import { html, LitElement, type TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

import {transpile, ScriptTarget} from "typescript";

import { styles } from "./styles";

export function toBase64(str: string): string {
    const utf8 = new TextEncoder().encode(str);
    const binary = Array.from(utf8).map(byte => String.fromCharCode(byte)).join('');
    return btoa(binary);
}

export async function loadScript( source: string ): Promise<void> {
    if ( !source || !source.trim() ) {
        return;
    }

    const js     = transpile(source, { target: ScriptTarget.ESNext });
    const base64 = toBase64(js ?? "");

    await import(`data:text/javascript;base64,${base64}`);
}

/**
 * ## <type-script>
 * textContent に TypeScript で書いて実行します。
 *
 * @tagname type-script
 */
@customElement( "type-script" )
export class TypeScriptElement extends LitElement {
    static override styles = [ styles ];

    constructor() {
        super();
        this.init();
    }

    private async init(): Promise<void> {
        try {
            await loadScript( this.textContent ?? "" );
            this.dispatchEvent( new CustomEvent("ts-loaded", { bubbles: false }) );
        }
        catch ( err: any ) {
            console.error( err ); // eslint-disable-line
            this.dispatchEvent( new CustomEvent("ts-error", { bubbles: false }) );
        }
    }

    override render(): TemplateResult {
        return html``;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "type-script": TypeScriptElement;
    }
}
