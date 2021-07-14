import { FavoriteButton } from "@components/FavoriteButton";
import { Restaurant } from "@scripts/entities/restaurant";
import { DBFavoriteData } from "@scripts/data/dbfavorite-data";

describe("Favorite a restaurant", async () => {
	const setupFavoriteButton = (restaurant: Restaurant) => {
		const favoriteButton = new FavoriteButton();
		favoriteButton.setRestaurantData = new Restaurant(restaurant);
		document.body.appendChild(favoriteButton);
	};

	it("should show favorite button when restaurant is not on favorite list", () => {
		setupFavoriteButton({ id: "1" } as Restaurant);

		expect(document.querySelector("favorite-button[aria-label='Tambah ke favorit']"))
			.toBeTruthy();
	});

	it("should not show unfavorite button when restaurant is not on favorite list", () => {
		setupFavoriteButton({ id: "1" } as Restaurant);

		expect(document.querySelector("favorite-button[aria-label='Hapus dari favorit']"))
			.toBeFalsy();
	});

	it("should add restaurant to favorite list when favorite button is clicked", async () => {
		setupFavoriteButton({ id: "1" } as Restaurant);

		document.querySelector("favorite-button")?.dispatchEvent(new Event("click"));

		const favoriteRestaurant = await DBFavoriteData.getRestaurant("1");
		expect(favoriteRestaurant.id).toEqual("1");

		await DBFavoriteData.deleteRestaurant("1");
	});

	it("should not add restaurant if it's already on favorite list", async () => {
		setupFavoriteButton({ id: "1" } as Restaurant);

		await DBFavoriteData.putRestaurant(new Restaurant({ id: "1" } as Restaurant));

		document.querySelector("favorite-button")?.dispatchEvent(new Event("click"));

		const allFavoriteRestaurant = await DBFavoriteData.getAllRestaurant();
		expect(allFavoriteRestaurant.length).toEqual(1);

		await DBFavoriteData.deleteRestaurant("1");
	});
});
