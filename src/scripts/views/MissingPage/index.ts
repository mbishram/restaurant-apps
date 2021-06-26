import { WebcompHelper } from "@utils/webcomp-helper";
import style from "./style.webcomp.scss";

const template = WebcompHelper.createTemplate(`
	<page-section id="restaurant-list" tabindex="-1" aria-labelledby="restaurant-header">
		<div slot="header" id="restaurant-header">
			 <b class="text-primary">Missing</b> Page 
		</div>
		Go Back Button
	</page-section>
`);

export class MissingPage extends HTMLElement {
	// noinspection JSUnusedLocalSymbols
	private connectedCallback() {
		if (this.shadowRoot === null) this.attachShadow({ mode: "open" });
		this.render();
	}

	private render = () => {
		this.shadowRoot?.appendChild(WebcompHelper.createStyle(style));
		this.shadowRoot?.appendChild(template.content.cloneNode(true));
	}

	rerender = () => {
		while (this.shadowRoot?.firstChild) {
			this.shadowRoot?.firstChild.remove();
		}
		this.render();
	}
}

window.customElements.define("missing-page", MissingPage);
