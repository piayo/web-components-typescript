import { css } from "lit";

export const styles = css`

:host {
    display: none;
    font-family: monospace;
    white-space: pre;

    visibility: hidden;
    overflow: hidden;
    position: fixed;
    z-index: -9999;
    opacity: 0;
    top: -9999px;
    left: -9999px;
}

`;