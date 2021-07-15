import { Restaurant } from "@scripts/entities/restaurant";
import { DBFavoriteData } from "@scripts/data/dbfavorite-data";
import { TestFactories } from "./helpers/test-factories";

describe("Favorite a restaurant", async () => {
	beforeEach(async () => {
		await TestFactories.setupFavoriteButton({ id: "1" } as Restaurant);
	});

	it("should show favorite button when restaurant is not on favorite list", () => {
		expect(document.querySelector("favorite-button[aria-label='Tambah ke favorit']"))
			.toBeTruthy();
	});

	it("should not show unfavorite button when restaurant is not on favorite list", () => {
		expect(document.querySelector("favorite-button[aria-label='Hapus dari favorit']"))
			.toBeFalsy();
	});

	it("should add restaurant to favorite list when favorite button is clicked", async () => {
		document.querySelector("favorite-button")?.dispatchEvent(new Event("click"));

		const favoriteRestaurant = await DBFavoriteData.getRestaurant("1");
		expect(favoriteRestaurant.id).toEqual("1");

		await DBFavoriteData.deleteRestaurant("1");
	});

	it("should not add restaurant if it's already on favorite list", async () => {
		await DBFavoriteData.putRestaurant(new Restaurant({ id: "1" } as Restaurant));

		expect((await DBFavoriteData.getAllRestaurant()).length).toEqual(1);
		document.querySelector("favorite-button")?.dispatchEvent(new Event("click"));

		expect((await DBFavoriteData.getAllRestaurant()).length).toBeLessThanOrEqual(1);

		await DBFavoriteData.deleteRestaurant("1");
	});
});
