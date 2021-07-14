import { FavoriteButton } from "@components/FavoriteButton";
import { Restaurant } from "@scripts/entities/restaurant";

describe("Favorite a restaurant", () => {
	it("should show favorite button when restaurant is not on favorite list", () => {
		const restaurant = new Restaurant({ id: "1" } as Restaurant);
		const favoriteButton = new FavoriteButton();
		favoriteButton.setRestaurantData = restaurant;
		document.body.appendChild(favoriteButton);
		console.log(document.body.innerHTML);
		console.log(document.querySelector("favorite-button"));
		// create favorite button with setrestaurant data of the newly created restaurant
		// test if aria-label === Tambah ke favorit
	});

	xit("should not show unfavorite button when restaurant is not on favorite list");

	xit("should add restaurant to favorite list when favorite button is clicked");

	xit("should not add restaurant if it's already on favorite list");

	xit("should not add restaurant if it's not restaurant object");
});
