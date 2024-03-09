"use strict";
class MyAvatar extends HTMLElement {
    static template = function () {
        const tmpl = document.createElement("template");
        tmpl.innerHTML = `
            <style>
            </style>

            <div></div>
        `;
        return tmpl;
    }();
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).appendChild(MyAvatar.template.content.cloneNode(true));
    }
}
customElements.define("my-avatar", MyAvatar);
