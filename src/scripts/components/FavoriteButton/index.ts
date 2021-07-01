import * as $ from "jquery";
import { WebcompHelper } from "@utils/webcomp-helper";
import { Restaurant } from "@scripts/entities/restaurant";
import { jQuery } from "@typings/global";
import style from "./style.webcomp.scss";

const template = WebcompHelper.createTemplate(`
	<i class="bi bi-heart"></i>
`);

export class FavoriteButton extends HTMLElement {
	private selector: Function = () => {}

	private restaurantData: Restaurant = new Restaurant()
	private isFavorite: boolean = false

	private icon!: jQuery

	constructor() {
		super();

		this.setAttribute("role", "button");
		this.setAttribute("tabindex", "0");
		this.setAttribute("aria-label", "Tambah ke favorit");
	}

	// noinspection JSUnusedLocalSymbols
	private connectedCallback() {
		if (this.shadowRoot === null) this.attachShadow({ mode: "open" });
		this.render();
	}

	// noinspection JSUnusedLocalSymbols
	private disconnectedCallback() {
		this.clearEventListener();
	}

	private render = () => {
		this.shadowRoot?.appendChild(WebcompHelper.createStyle(style));
		this.shadowRoot?.appendChild(template.content.cloneNode(true));
		this.setupProperties();
		this.setupElement();
		this.setupEventListener();
	}

	private setupProperties = () => {
		this.selector = WebcompHelper.setupSelector(this.shadowRoot || undefined);

		this.icon = this.selector("i");
	}

	private setupElement = () => {
		if (this.restaurantData.name) {
			this.setAttribute("aria-label", "Hapus dari favorit");
			this.icon.removeClass("bi-heart");
			this.icon.addClass("bi-heart-fill");
			this.isFavorite = true;

			return;
		}

		this.isFavorite = false;
	}

	private setupEventListener = () => {
		$(this).on("click", this.handleOnClick);
	}

	private clearEventListener = () => {
		$(this).off("click", this.handleOnClick);
	}

	private handleOnClick = () => {
		this.icon.toggleClass("bi-heart bi-heart-fill");
		this.isFavorite = !this.isFavorite;

		if (this.isFavorite) {
			this.setAttribute("aria-label", "Hapus dari favorit");
			this.addToFavorite();

			return;
		}

		this.setAttribute("aria-label", "Tambah ke favorit");
		this.removeFromFavorite();
	}

	private addToFavorite = () => {
		// TODO: Add to DB
		console.log("Added to Favorite");
	}

	private removeFromFavorite = () => {
		// TODO: Remove from DB
		console.log("Removed from Favorite");
	}

	rerender = () => {
		while (this.shadowRoot?.firstChild) {
			this.shadowRoot?.firstChild.remove();
		}
		this.clearEventListener();
		this.render();
	}

	set setRestaurantData(data: Restaurant) {
		this.restaurantData = data;
		this.rerender();
	}
}

window.customElements.define("favorite-button", FavoriteButton);
