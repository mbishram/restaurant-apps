import { WebcompHelper } from "@utils/webcomp-helper";
import style from "./style.webcomp.scss";

const template = WebcompHelper.createTemplate(`
	<div class="container">
		 <p class="text-gray-3">
			   &copy; 2021 - YELPing you find a restaurant.
		 </p>
	</div>
`);

export class Footer extends HTMLElement {
	private selector: Function = () => {}

	private static container: any

	constructor() {
		super();

		this.setAttribute("role", "contentinfo");
	}

	// noinspection JSUnusedLocalSymbols
	private connectedCallback() {
		if (this.shadowRoot === null) this.attachShadow({ mode: "open" });
		this.render();
	}

	private render = () => {
		this.shadowRoot?.appendChild(WebcompHelper.createStyle(style));
		this.shadowRoot?.appendChild(template.content.cloneNode(true));
		this.setupProperties();
	}

	private setupProperties = () => {
		this.selector = WebcompHelper.setupSelector(this.shadowRoot || undefined);

		Footer.container = this.selector(".container");
	}

	rerender = () => {
		while (this.shadowRoot?.firstChild) {
			this.shadowRoot?.firstChild.remove();
		}
		this.render();
	}

	static get getContainerSpacing() {
		return (parseFloat(this.container?.css("marginLeft")) +
			parseFloat(this.container?.css("paddingLeft"))) || 0;
	}
}

window.customElements.define("custom-footer", Footer);
