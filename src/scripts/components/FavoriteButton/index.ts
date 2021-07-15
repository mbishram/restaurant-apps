import * as $ from "jquery";
import { WebcompHelper } from "@utils/webcomp-helper";
import { Restaurant } from "@scripts/entities/restaurant";
import { jQuery } from "@typings/global";
import { DBFavoriteData } from "@scripts/data/dbfavorite-data";
import style from "./style.webcomp.scss";

const template = WebcompHelper.createTemplate(`
	<i class="bi bi-heart"></i>
`);

export class FavoriteButton extends HTMLElement {
	private selector: Function = () => {
	}

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
		this.render().then();
	}

	// noinspection JSUnusedLocalSymbols
	private disconnectedCallback() {
		this.clearEventListener();
	}

	private render = async () => {
		this.shadowRoot?.appendChild(WebcompHelper.createStyle(style));
		this.shadowRoot?.appendChild(template.content.cloneNode(true));
		await this.setupProperties();
		this.setupElement();
		this.setupEventListener();
	}

	private setupProperties = async () => {
		this.selector = WebcompHelper.setupSelector(this.shadowRoot || undefined);

		this.icon = this.selector("i");

		this.isFavorite = Boolean(await DBFavoriteData.getRestaurant(this.restaurantData.id));
	}

	private setupElement = () => {
		if (this.isFavorite) {
			this.setAttribute("aria-label", "Hapus dari favorit");
			this.icon.removeClass("bi-heart");
			this.icon.addClass("bi-heart-fill");
		}
	}

	private setupEventListener = () => {
		$(this).on("click", this.handleOnClick);
	}

	private clearEventListener = () => {
		$(this).off("click", this.handleOnClick);
	}

	private handleOnClick = async () => {
		this.icon.toggleClass("bi-heart bi-heart-fill");
		this.isFavorite = !this.isFavorite;
		WebcompHelper.startLoading();

		if (this.isFavorite) {
			this.setAttribute("aria-label", "Hapus dari favorit");
			await this.addToFavorite();
		} else {
			this.setAttribute("aria-label", "Tambah ke favorit");
			await this.removeFromFavorite();
		}

		WebcompHelper.stopLoading();
	}

	private addToFavorite = async () => {
		await DBFavoriteData.putRestaurant(this.restaurantData);
	}

	private removeFromFavorite = async () => {
		await DBFavoriteData.deleteRestaurant(this.restaurantData.id);
	}

	rerender = async () => {
		WebcompHelper.startLoading();
		while (this.shadowRoot?.firstChild) {
			this.shadowRoot?.firstChild.remove();
		}
		this.clearEventListener();
		await this.render();
		WebcompHelper.stopLoading();
	}

	setRestaurantData = async (data: Restaurant) => {
		this.restaurantData = data;
		await this.rerender();
	}
}

window.customElements.define("favorite-button", FavoriteButton);
