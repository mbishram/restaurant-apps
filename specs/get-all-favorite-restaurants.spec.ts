import { DBFavoriteData } from "@scripts/data/dbfavorite-data";
import { Restaurant } from "@scripts/entities/restaurant";

describe("Get all favorite restaurant", () => {
	describe("when there is no favorite restaurant", () => {
		it("should return an empty array", async () => {
			expect(await DBFavoriteData.getAllRestaurant()).toEqual([]);
		});
	});

	describe("when there is favorite restaurant", () => {
		it("should return an array of favorite restaurant", async () => {
			await DBFavoriteData.putRestaurant(new Restaurant({ id: "1" } as Restaurant));
			await DBFavoriteData.putRestaurant(new Restaurant({ id: "2" } as Restaurant));

			expect((await DBFavoriteData.getAllRestaurant()).length).toEqual(2);

			await DBFavoriteData.deleteRestaurant("1");
			await DBFavoriteData.deleteRestaurant("2");
		});
	});
});
