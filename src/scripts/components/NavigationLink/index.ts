import { WebcompHelper } from "@utils/webcomp-helper";
import $ from "jquery";
import _ from "lodash";
import style from "./style.webcomp.scss";

const template = WebcompHelper.createTemplate(`
	<a><slot></slot></a>
`);

class NavigationLink extends HTMLElement {
	private selector: Function = () => {};

	private link: any;

	constructor() {
		super();

		this.setAttribute("role", "listitem");
	}

	// noinspection JSUnusedLocalSymbols
	private connectedCallback() {
		this.attachShadow({ mode: "open" });
		if (this.shadowRoot !== null) {
			this.render();
			this.setupProperties();
			this.cloneAttributes();
		}
	}

	private render = () => {
		this.shadowRoot?.appendChild(WebcompHelper.createStyle(style));
		this.shadowRoot?.appendChild(template.content.cloneNode(true));
	}

	private setupProperties = () => {
		this.selector = WebcompHelper.setupSelector(this.shadowRoot || undefined);

		this.link = this.selector("a");
	}

	private cloneAttributes = () => {
		const attributes = $(this).prop("attributes");
		_.values(attributes).forEach((attribute: Attr) => {
			if (attribute.name !== "role") {
				this.link.attr(attribute.name, attribute.value);
				$(this).removeAttr(attribute.name);
			}
		});
	}
}

window.customElements.define("navigation-link", NavigationLink);
