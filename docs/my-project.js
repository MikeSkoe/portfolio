"use strict";
class MyProject extends HTMLElement {
    static template = function () {
        const tmpl = document.createElement("template");
        tmpl.innerHTML = `
            <style>
                project {
                    display: grid;
                    flex-direction: column;
                    margin-bottom: 1.5rem;
                    grid-template:
                        "logo name"
                        "logo body"
                        "logo skills" / auto 1fr;
                }

                name {
                    font-weight: bold;
                    grid-area: name;
                    margin-bottom: 0.5rem;
                }

                skills {
                    grid-area: skills;
                }

                p {
                    margin-top: 0.5rem;
                    grid-area: body;
                }

                img {
                    grid-area: logo;
                    margin-right: 1rem;
                    display: inline-block;
                    width: 3rem;
                    height: 3rem;
                    border-radius: 0.5rem;
                }
            </style>

            <project>
                <img />
                <name><slot name="name" /></name>
                <p></p>
                <skills><slot name="skills" /></skills>
            </project>
        `;
        return tmpl;
    }();
    connectedCallback() {
        const clone = MyProject.template.content.cloneNode(true);
        const img = clone.querySelector('img');
        const p = clone.querySelector('p');
        const imgSrc = this.getAttribute('src');
        const description = this.getAttribute('description');
        if (description) {
            p.innerText = description;
        }
        else {
            p.remove();
        }
        if (img && imgSrc) {
            img.src = imgSrc;
        }
        if (img && !imgSrc) {
            img.remove();
        }
        this.attachShadow({ mode: 'open' }).appendChild(clone);
    }
}
customElements.define("my-project", MyProject);
