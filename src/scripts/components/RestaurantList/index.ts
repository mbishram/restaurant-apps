import { WebcompHelper } from "@utils/webcomp-helper";
import { RestaurantItem } from "@components/RestaurantItem";
import { RestaurantModel } from "@scripts/models/restaurant";
import style from "./style.webcomp.scss";

class RestaurantList extends HTMLElement {
	private restaurantData = new RestaurantModel().getData()

	constructor() {
		super();

		this.setAttribute("role", "list");
	}

	// noinspection JSUnusedLocalSymbols
	private connectedCallback() {
		this.attachShadow({ mode: "open" });
		if (this.shadowRoot !== null) {
			this.render();
			this.renderContent();
		}
	}

	private render = () => {
		this.shadowRoot?.appendChild(WebcompHelper.createStyle(style));
	}

	private renderContent = () => {
		this.restaurantData.forEach((restaurant) => {
			const restaurantItem = new RestaurantItem();
			this.shadowRoot?.appendChild(restaurantItem);
			restaurantItem.setRestaurant = restaurant;
		});
	}
}

window.customElements.define("restaurant-list", RestaurantList);
