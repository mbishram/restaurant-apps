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

export class PageSection extends HTMLElement {
	private selector: Function = () => {};

	static container: any;

	constructor() {
		super();

		this.setAttribute("role", "region");
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

		PageSection.container = this.selector(".container");
	}

	rerender = () => {
		while (this.shadowRoot?.firstChild) {
			this.shadowRoot?.firstChild.remove();
		}
		this.render();
	}
}

window.customElements.define("page-section", PageSection);