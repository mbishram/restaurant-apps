import { WebcompHelper } from "@utils/webcomp-helper";
import { RestaurantList } from "@components/RestaurantList";
import { DBFavoriteData } from "@scripts/data/dbfavorite-data";
import style from "./style.webcomp.scss";

const template = WebcompHelper.createTemplate(`
	<page-section id="restaurant-list" aria-labelledby="restaurant-header">
		<div slot="header" id="restaurant-header">
			 Restoran <b class="text-primary">Favorit</b> Kamu! 
		</div>
		<restaurant-list slot="content"></restaurant-list>
	</page-section>
`);

export class FavoritePage extends HTMLElement {
	private selector: Function = () => {}

	private restaurantData: Array<object> = []

	private restaurantList: RestaurantList = new RestaurantList()

	// noinspection JSUnusedLocalSymbols
	private async connectedCallback() {
		if (this.shadowRoot === null) this.attachShadow({ mode: "open" });

		this.render();
		this.restaurantList.setIsLoading = true;

		this.restaurantData = await DBFavoriteData.getAllRestaurant();
		this.rerender();
		WebcompHelper.stopLoading();
	}

	private render = () => {
		this.shadowRoot?.appendChild(WebcompHelper.createStyle(style));
		this.shadowRoot?.appendChild(template.content.cloneNode(true));
		document.title = WebcompHelper.getDocumentTitleFormatted("Favorit");

		this.setupProperties();
		this.initRestaurantList();
	}

	private setupProperties = () => {
		this.selector = WebcompHelper.setupSelector(this.shadowRoot || undefined);

		this.restaurantList = this.selector("restaurant-list")[0] as RestaurantList;
	}

	private initRestaurantList = () => {
		this.restaurantList.setRestaurantData =
			WebcompHelper.convertRestaurantData(this.restaurantData);
	}

	rerender = () => {
		while (this.shadowRoot?.firstChild) {
			this.shadowRoot?.firstChild.remove();
		}
		this.render();
	}
}

window.customElements.define("favorite-page", FavoritePage);
