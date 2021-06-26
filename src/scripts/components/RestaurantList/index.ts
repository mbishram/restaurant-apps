import { WebcompHelper } from "@utils/webcomp-helper";
import { RestaurantItem } from "@components/RestaurantItem";
import restaurantData from "@/DATA.json";
import { Restaurant } from "@scripts/entities/restaurant";
import style from "./style.webcomp.scss";

class RestaurantList extends HTMLElement {
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
		restaurantData.restaurants.forEach((restaurant) => {
			const restaurantItem = new RestaurantItem();
			this.shadowRoot?.appendChild(restaurantItem);
			restaurantItem.setRestaurant = new Restaurant(restaurant);
		});
	}

	rerender = () => {
		while (this.shadowRoot?.firstChild) {
			this.shadowRoot?.firstChild.remove();
		}
		this.render();
	}
}

window.customElements.define("restaurant-list", RestaurantList);
