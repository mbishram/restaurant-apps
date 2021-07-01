import { WebcompHelper } from "@utils/webcomp-helper";
import { Menu } from "@scripts/entities/menu";
import { jQuery } from "@typings/global";
import style from "./style.webcomp.scss";

const template = WebcompHelper.createTemplate(`
	<p class="card border-radius-sm p-sm">
		Nama Menu
	</p>
`);

export class MenuItem extends HTMLElement {
	private selector: Function = () => {}

	private menu: Menu = new Menu()
	private paragraph!: jQuery

	constructor() {
		super();

		this.setAttribute("role", "listitem");
	}

	// noinspection JSUnusedLocalSymbols
	private connectedCallback() {
		if (this.shadowRoot === null) this.attachShadow({ mode: "open" });
	}

	private render = () => {
		this.shadowRoot?.appendChild(WebcompHelper.createStyle(style));
		this.shadowRoot?.appendChild(template.content.cloneNode(true));
		this.setupProperties();
		this.setupElement();
	}

	private setupProperties = () => {
		this.selector = WebcompHelper.setupSelector(this.shadowRoot || undefined);

		this.paragraph = this.selector("p");
	}

	private setupElement = () => {
		this.paragraph.text(this.menu.name);
	}

	set setMenu(menu: Menu) {
		this.menu = menu;
		this.render();
	}

	rerender = () => {
		while (this.shadowRoot?.firstChild) {
			this.shadowRoot?.firstChild.remove();
		}
		this.render();
	}
}

window.customElements.define("menu-item", MenuItem);
