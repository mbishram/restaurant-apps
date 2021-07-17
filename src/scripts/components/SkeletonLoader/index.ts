import { WebcompHelper } from "@utils/webcomp-helper";
import style from "./style.webcomp.scss";

export class SkeletonLoader extends HTMLElement {
	constructor() {
		super();

		this.setAttribute("role", "list");
	}

	// noinspection JSUnusedLocalSymbols
	private connectedCallback() {
		if (this.shadowRoot === null) this.attachShadow({ mode: "open" });
		this.render();
	}

	private render = () => {
		this.shadowRoot?.appendChild(WebcompHelper.createStyle(style));

		this.setupElement();
	}

	private setupElement = () => {
		this.style.height = this.getAttribute("height") || "1rem";
		this.style.width = this.getAttribute("width") || "100%";

		this.removeAttribute("height");
		this.removeAttribute("width");
	}

	rerender = () => {
		while (this.shadowRoot?.firstChild) {
			this.shadowRoot?.firstChild.remove();
		}
		this.render();
	}
}

window.customElements.define("skeleton-loader", SkeletonLoader);
