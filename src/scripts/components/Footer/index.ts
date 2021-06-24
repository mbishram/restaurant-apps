import { WebcompHelper } from "@utils/webcomp-helper";
import style from "./style.webcomp.scss";

const template = WebcompHelper.createTemplate(`
	<div class="container">
		 <p class="text-gray-3">
			   &copy; 2021 - YELPing you find a restaurant.
		 </p>
	</div>
`);

class Footer extends HTMLElement {
	constructor() {
		super();

		this.setAttribute("role", "contentinfo");
	}

	// noinspection JSUnusedLocalSymbols
	private connectedCallback() {
		this.attachShadow({ mode: "open" });
		if (this.shadowRoot !== null) {
			this.render();
		}
	}

	private render = () => {
		this.shadowRoot?.appendChild(WebcompHelper.createStyle(style));
		this.shadowRoot?.appendChild(template.content.cloneNode(true));
	}
}

window.customElements.define("custom-footer", Footer);
