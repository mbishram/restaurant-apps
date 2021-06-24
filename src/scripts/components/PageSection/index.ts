import { WebcompHelper } from "@utils/webcomp-helper";
import style from "./style.webcomp.scss";

const template = WebcompHelper.createTemplate(`
	<div class="container">
		<h2 class="text-lg">
			<slot name="header"></slot>
		</h2>
		<slot name="content"></slotname>
	</div>
`);

class PageSection extends HTMLElement {
	constructor() {
		super();

		this.setAttribute("role", "region");
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

window.customElements.define("page-section", PageSection);
