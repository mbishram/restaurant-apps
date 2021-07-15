import { WebcompHelper } from "@utils/webcomp-helper";
import { TestFactories } from "./helpers/test-factories";
import { UtilsHelper } from "./helpers/utils-helper";

describe("Restaurant list", () => {
	describe("when there is no restaurant", () => {
		it("should show indicator", () => {
			TestFactories.setupRestaurantList([]);

			expect(UtilsHelper.getRootWebComponent("restaurant-list")?.querySelector("p")).toBeTruthy();
		});
	});

	describe("when there is restaurant", () => {
		it("should show all of it correctly", () => {
			const arrayRestaurant = WebcompHelper.convertRestaurantData(
				[
					{ id: "1", name: "Restaurant 1" },
					{ id: "2", name: "Restaurant 2" },
					{ id: "3", name: "Restaurant 3" },
				],
			);
			TestFactories.setupRestaurantList(arrayRestaurant);

			UtilsHelper.getRootWebComponent("restaurant-list")?.querySelectorAll("restaurant-item")
				.forEach((restaurantItem, index) => {
					expect(restaurantItem.shadowRoot?.querySelector("#heading>a")?.innerHTML)
						.toEqual(arrayRestaurant[index].name);
				});
		});
	});
});
