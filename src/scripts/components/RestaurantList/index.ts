import isEmpty from "lodash.isempty";
import { WebcompHelper } from "@utils/webcomp-helper";
import { RestaurantItem } from "@components/RestaurantItem";
import { Restaurant } from "@scripts/entities/restaurant";
import style from "./style.webcomp.scss";

const emptyTemplate = WebcompHelper.createTemplate(`
	<p>Restoran tidak dapat ditemukan!</p>
`);

export class RestaurantList extends HTMLElement {
	restaurantData: Array<Restaurant> = []

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
		if (!isEmpty(this.restaurantData)) {
			this.restaurantData.forEach((restaurant) => {
				const restaurantItem = new RestaurantItem();
				this.shadowRoot?.appendChild(restaurantItem);
				restaurantItem.setRestaurant = new Restaurant(restaurant);
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

	set setRestaurantData(data: Array<Restaurant>) {
		this.restaurantData = data;
		this.rerender();
	}
}

window.customElements.define("restaurant-list", RestaurantList);
