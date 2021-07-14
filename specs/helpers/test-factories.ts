import { Loader } from "@components/Loader";
import { Restaurant } from "@scripts/entities/restaurant";
import { FavoriteButton } from "@components/FavoriteButton";

export class TestFactories {
	static createFavoriteButtonEmptyState = () => {
		document.body.innerHTML = "";

		document.body.appendChild(new Loader());
	}

	static setupFavoriteButton = (restaurant: Restaurant) => {
		TestFactories.createFavoriteButtonEmptyState();

		const favoriteButton = new FavoriteButton();
		favoriteButton.setRestaurantData = new Restaurant(restaurant);
		document.body.appendChild(favoriteButton);
	};
}
