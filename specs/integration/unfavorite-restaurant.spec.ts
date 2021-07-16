import { Restaurant } from "@scripts/entities/restaurant";
import { DBFavoriteData } from "@scripts/data/dbfavorite-data";
import { TestFactories } from "../helpers/test-factories";

describe("Unfavorite a restaurant", async () => {
	beforeEach(async () => {
		await DBFavoriteData.putRestaurant(new Restaurant({ id: "1" } as Restaurant));
		await TestFactories.setupFavoriteButton({ id: "1" } as Restaurant);
	});

	afterEach(async () => {
		await DBFavoriteData.deleteRestaurant("1");
	});

	it("should show unfavorite button when restaurant is on favorite list", () => {
		expect(document.querySelector("favorite-button[aria-label='Hapus dari favorit']"))
			.toBeTruthy();
	});

	it("should not show favorite button when restaurant is on favorite list", () => {
		expect(document.querySelector("favorite-button[aria-label='Tambah ke favorit']"))
			.toBeFalsy();
	});

	it("should remove restaurant from favorite list when unfavorite button is clicked", async () => {
		document.querySelector("favorite-button")?.dispatchEvent(new Event("click"));

		expect((await DBFavoriteData.getAllRestaurant())?.length).toEqual(0);
	});

	it("should not throw an error if restaurant is not on favorite list when unfavorite button is clicked", async () => {
		await DBFavoriteData.deleteRestaurant("1");

		expect((await DBFavoriteData.getAllRestaurant()).length).toEqual(0);
		document.querySelector("favorite-button")?.dispatchEvent(new Event("click"));

		expect((await DBFavoriteData.getAllRestaurant()).length).toEqual(0);
	});
});
