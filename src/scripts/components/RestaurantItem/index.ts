import $ from "jquery";
import { WebcompHelper } from "@utils/webcomp-helper";
import { Restaurant } from "@scripts/entities/restaurant";
import { CONFIGS } from "@scripts/constants/configs";
import style from "./style.webcomp.scss";

const template = WebcompHelper.createTemplate(`
	<article aria-labelledby="heading">
		<img 
			class="restaurant-image" 
			src="https://via.placeholder.com/1080x720.png?text=Image%20Missing"
			alt="Gambar tidak ditemukan"
		>
		<section class="card">
			<h3 class="text-md" id="heading">
				<a href="#" class="no-underline">Nama Restoran</a>
			</h3>
			<p class="text-gray-2">
				<span class="sr-only">Lokasi </span>
				<span id="location">Lokasi</span>
				<span class="text-primary" tabindex="-1">
					<i class="bi bi-star"></i>
				</span>
				<span class="sr-only">Penilaian </span>
				<span id="rating">0</span></span>
			</p>
			<p id="description">
				Placeholder
			</p>
		</section>
	</article>
`);

export class RestaurantItem extends HTMLElement {
	private selector: Function = () => {}

	private restaurant: Restaurant = new Restaurant()
	private article: any
	private img: any
	private section: any
	private heading: any
	private location: any
	private rating: any
	private description: any

	constructor() {
		super();

		this.setAttribute("role", "listitem");
	}

	// noinspection JSUnusedLocalSymbols
	private connectedCallback() {
		if (this.shadowRoot === null) this.attachShadow({ mode: "open" });
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
		this.fixElementHeight();
	}

	private setupProperties = () => {
		this.selector = WebcompHelper.setupSelector(this.shadowRoot || undefined);

		this.article = this.selector("article");
		this.img = this.selector("img");
		this.section = this.selector("section");
		this.heading = this.selector("#heading>a");
		this.location = this.selector("#location");
		this.rating = this.selector("#rating");
		this.description = this.selector("#description");
	}

	private setupElement = () => {
		if (this.restaurant.pictureId) this.img.attr("src", `${CONFIGS.IMG_BASE_URL}${this.restaurant.pictureId}`);
		this.img.attr("alt", this.restaurant.name);

		this.section.attr("aria-label", `deskripsi ${this.restaurant.name}`);

		this.heading.attr("href", `#/restoran/${this.restaurant.id}`);
		this.heading.text(this.restaurant.name);

		this.location.text(this.restaurant.city);

		this.rating.text(this.restaurant.rating);

		this.description.text(this.restaurant.description);
	}

	// Element's height is not properly set because I added top property into section.
	// This function is to account for that.
	private fixElementHeight = () => {
		this.article.height("unset");
		this.section.height("unset");

		const descriptionTop = Math.abs(
			parseInt(this.section.css("top"), 10),
		);
		const imgHeight = this.img.outerHeight() || 0;

		this.article.outerHeight(($(this).outerHeight() || 0) - descriptionTop);
		this.section.outerHeight(($(this).outerHeight() || 0) - imgHeight + descriptionTop);
	}

	private setupEventListener = () => {
		$(window).on("resize", this.fixElementHeight);
	}

	private clearEventListener = () => {
		$(window).off("resize", this.fixElementHeight);
	}

	set setRestaurant(restaurant: Restaurant) {
		this.restaurant = restaurant;
		this.render();
	}

	rerender = () => {
		while (this.shadowRoot?.firstChild) {
			this.shadowRoot?.firstChild.remove();
		}
		this.clearEventListener();
		this.render();
	}
}

window.customElements.define("restaurant-item", RestaurantItem);
