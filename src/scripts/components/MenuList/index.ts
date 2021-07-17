import isEmpty from "lodash.isempty";
import { WebcompHelper } from "@utils/webcomp-helper";
import { Menu } from "@scripts/entities/menu";
import { MenuItem } from "@components/MenuItem";
import style from "./style.webcomp.scss";

const emptyTemplate = WebcompHelper.createTemplate(`
	<p>Menu tidak dapat ditemukan!</p>
`);

export class MenuList extends HTMLElement {
	menuData: Array<Menu> = []

	constructor() {
		super();

		this.setAttribute("role", "list");
	}

	// noinspection JSUnusedLocalSymbols
	private connectedCallback() {
		if (this.shadowRoot === null) this.attachShadow({ mode: "open" });
		this.render();
	}

	private render = () => {
		this.shadowRoot?.appendChild(WebcompHelper.createStyle(style));
		this.renderContent();
	}

	private renderContent = () => {
		if (!isEmpty(this.menuData)) {
			this.menuData.forEach((menu: Menu) => {
				const menuItem = new MenuItem();
				this.shadowRoot?.appendChild(menuItem);
				menuItem.setMenu = new Menu(menu);
			});

			return;
		}

		this.shadowRoot?.appendChild(emptyTemplate.content.cloneNode(true));
	}

	rerender = () => {
		while (this.shadowRoot?.firstChild) {
			this.shadowRoot?.firstChild.remove();
		}
		this.render();
	}

	set setMenuData(data: Array<Menu>) {
		this.menuData = data;
		this.rerender();
	}
}

window.customElements.define("menu-list", MenuList);
