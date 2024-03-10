class DevPost extends HTMLElement {
    static template = function () {
        const tmpl = document.createElement("template");
        tmpl.innerHTML = `
            <style>
                a {
                    width: 100%;
                    display: flex;
                    border-radius: 1rem;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    overflow: hidden;
                    color: unset;
                    text-decoration: unset;
                    aspect-ratio: 5 / 1;
                }
                
                div {
                    display: flex;
                    flex-direction: column;
                    padding: 0.5em 1em 0;
                }

                @media only screen and (max-width: 768px) {
                    div {
                        font-size: 2.5vmin;
                    }
                }

                preview {
                    height: 100%;
                    aspect-ratio: 2 / 1;
                    background-repeat: no-repeat;
                    background-size: cover;
                }

                p {
                    opacity: 0.8;
                }
            </style>

            <a>
                <preview></preview>
                <div>
                    <b></b>
                    <p></p>
                </div>
            </a>
        `;
        return tmpl;
    }();

    connectedCallback() {
        const clone = DevPost.template.content.cloneNode(true) as HTMLTemplateElement ;
        const a = clone.querySelector("a") as HTMLAnchorElement;
        const p = clone.querySelector("p") as HTMLParagraphElement;
        const b = clone.querySelector("b") as HTMLElement;
        const preview = clone.querySelector("preview") as HTMLElement;

        const url = this.getAttribute("url") ?? "";
        fetch(url)
            .then(res => res.text())
            .then(data => {
                const doc = new DOMParser().parseFromString(data, "text/html");
                const title = doc.querySelector("title")?.textContent || "";
                const imgSrc = doc.querySelector(`meta[property="og:image"]`)?.getAttribute("content") || "";
                const description = doc.querySelector(`meta[name="description"]`)?.getAttribute("content") || "";

                b.innerText = title;
                a.href = url;
                preview.style.backgroundImage = `url("${imgSrc}")`;
                p.innerText = description;
            });

        this.attachShadow({ mode: "open" }).appendChild(clone);
    }
}

customElements.define("dev-post", DevPost);
