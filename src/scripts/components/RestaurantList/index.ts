import isEmpty from "lodash.isempty";
import { WebcompHelper } from "@utils/webcomp-helper";
import { RestaurantItem } from "@components/RestaurantItem";
import { Restaurant } from "@scripts/entities/restaurant";
import style from "./style.webcomp.scss";

const emptyTemplate = WebcompHelper.createTemplate(`
	<p>Restoran tidak dapat ditemukan!</p>
`);

const skeletonLoaderTemplate = WebcompHelper.createTemplate(`
	<div id="skeleton" class="shadow" role="listitem">
		<skeleton-loader width="100%" height="16rem"></skeleton-loader>
		<div class="p-md">
			<skeleton-loader class="mb-xs" width="100%" height="1.5rem"></skeleton-loader>
			<skeleton-loader class="mb-sm" width="50%" height="1rem"></skeleton-loader>
			<skeleton-loader width="100%" height="12rem"></skeleton-loader>
		</div>
	</div>
	
	<div id="skeleton" class="shadow" role="listitem">
		<skeleton-loader width="100%" height="16rem"></skeleton-loader>
		<div class="p-md">
			<skeleton-loader class="mb-xs" width="100%" height="1.5rem"></skeleton-loader>
			<skeleton-loader class="mb-sm" width="50%" height="1rem"></skeleton-loader>
			<skeleton-loader width="100%" height="12rem"></skeleton-loader>
		</div>
	</div>
	
	<div id="skeleton" class="shadow" role="listitem">
		<skeleton-loader width="100%" height="16rem"></skeleton-loader>
		<div class="p-md">
			<skeleton-loader class="mb-xs" width="100%" height="1.5rem"></skeleton-loader>
			<skeleton-loader class="mb-sm" width="50%" height="1rem"></skeleton-loader>
			<skeleton-loader width="100%" height="12rem"></skeleton-loader>
		</div>
	</div>
`);

export class RestaurantList extends HTMLElement {
	private isLoading: boolean = false

	private restaurantData: Array<Restaurant> = []

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
		if (this.isLoading) {
			this.shadowRoot?.appendChild(skeletonLoaderTemplate.content.cloneNode(true));

			return;
		}

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

	set setIsLoading(isLoading: boolean) {
		this.isLoading = isLoading;
		this.rerender();
	}
}

window.customElements.define("restaurant-list", RestaurantList);
