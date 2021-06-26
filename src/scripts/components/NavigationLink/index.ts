import { WebcompHelper } from "@utils/webcomp-helper";
import $ from "jquery";
import _ from "lodash";
import style from "./style.webcomp.scss";

const template = WebcompHelper.createTemplate(`
	<a><slot></slot></a>
`);

export class NavigationLink extends HTMLElement {
	private selector: Function = () => {};

	private link: any;

	private attributeLists: Array<Attr> = []

	constructor() {
		super();

		this.setAttribute("role", "listitem");
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
		this.addAttributes();
		this.cloneAttributes();
	}

	private setupProperties = () => {
		this.selector = WebcompHelper.setupSelector(this.shadowRoot || undefined);

		this.link = this.selector("a");
	}

	private addAttributes = () => {
		const attributes = $(this).prop("attributes");
		_.values(attributes).forEach((attribute: Attr) => {
			if (!this.isAttributeExist(attribute)) this.attributeLists.push(attribute);
		});
	}

	private cloneAttributes = () => {
		_.values(this.attributeLists).forEach((attribute: Attr) => {
			if (!(attribute.name === "role" || attribute.name === "id")) {
				this.link.attr(attribute.name, attribute.value);
				$(this).removeAttr(attribute.name);
			}
		});
	}

	private isAttributeExist = (attribute: Attr) => {
		let result = false;

		this.attributeLists.forEach((localAttribute: Attr) => {
			if (attribute.name === localAttribute.name) result = true;
		});

		return result;
	}

	rerender = () => {
		while (this.shadowRoot?.firstChild) {
			this.shadowRoot?.firstChild.remove();
		}
		this.render();
	}

	addSelected = () => {
		const linkAttributes = _.values(this.link.addClass("selected").prop("attributes"));
		const classAttr = WebcompHelper.getAttribute("class", linkAttributes);
		// Adding class attribute into attributeLists so it doesn't get lost when rerender
		if (classAttr && !this.isAttributeExist(classAttr)) this.attributeLists.push(classAttr);

		this.rerender();
	}

	removeSelected = () => {
		const classAttr = WebcompHelper.getAttribute("class", _.values(this.link.prop("attributes")));
		// Removing class attribute from attributeLists so it will not be rerender
		if (classAttr) {
			this.attributeLists.forEach((attribute: Attr, index: number) => {
				if (attribute.name === "class") this.attributeLists.splice(index, 1);
			});
		}

		this.rerender();
	}
}

window.customElements.define("navigation-link", NavigationLink);
