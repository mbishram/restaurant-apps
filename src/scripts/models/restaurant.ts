import { Restaurant } from "@scripts/entities/restaurant";
import { Model } from "@scripts/interface/model";
import restaurantData from "@/DATA.json";

export class RestaurantModel implements Model<Restaurant> {
	private data: Array<Restaurant> = []

	constructor() {
		this.setData(restaurantData.restaurants);
	}

	setData = (data: Array<any>) => {
		this.data = data.map((restaurant) => new Restaurant(restaurant));
	}

	getData = () => this.data
}
