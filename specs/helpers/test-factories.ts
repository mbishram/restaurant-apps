import { Loader } from "@components/Loader";
import { Restaurant } from "@scripts/entities/restaurant";
import { FavoriteButton } from "@components/FavoriteButton";
import { RestaurantList } from "@components/RestaurantList";

export class TestFactories {
	private static createEmptyState = () => {
		document.body.innerHTML = "";

		document.body.appendChild(new Loader());
	}

	static setupFavoriteButton = async (restaurant: Restaurant) => {
		TestFactories.createEmptyState();

		const favoriteButton = new FavoriteButton();
		await favoriteButton.setRestaurantData(new Restaurant(restaurant));
		document.body.appendChild(favoriteButton);
	};

	static setupRestaurantList = async (restaurantArray: Array<Restaurant>) => {
		TestFactories.createEmptyState();

		const restaurantList = new RestaurantList();
		restaurantList.setRestaurantData = restaurantArray;
		document.body.appendChild(restaurantList);
	};
}
