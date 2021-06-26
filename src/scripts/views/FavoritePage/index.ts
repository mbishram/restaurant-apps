import { WebcompHelper } from "@utils/webcomp-helper";
import style from "./style.webcomp.scss";

const template = WebcompHelper.createTemplate(`
	<page-section id="restaurant-list" tabindex="-1" aria-labelledby="restaurant-header">
		<div slot="header" id="restaurant-header">
			 <b class="text-primary">Favorite</b> Page 
		</div>
		<restaurant-list slot="content"></restaurant-list>
	</page-section>
`);

export class FavoritePage extends HTMLElement {
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

window.customElements.define("favorite-page", FavoritePage);
