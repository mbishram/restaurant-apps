import $ from "jquery";
import { WebcompHelper } from "@utils/webcomp-helper";
import style from "./style.webcomp.scss";

const template = WebcompHelper.createTemplate(`
	<div></div>
`);

export class Loader extends HTMLElement {
	// noinspection JSUnusedLocalSymbols
	private async connectedCallback() {
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

	showLoader = () => {
		$(this).addClass("show");
		$(this).attr("role", "alert");
		$(this).attr("aria-busy", "true");
		$(this).attr("aria-label", "Loading");
	}

	hideLoader = () => {
		$(this).removeClass("show");
		$(this).removeAttr("role");
		$(this).removeAttr("aria-busy");
		$(this).removeAttr("aria-label");
	}
}

window.customElements.define("custom-loader", Loader);
