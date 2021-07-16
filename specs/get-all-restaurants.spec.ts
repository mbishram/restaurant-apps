import fetchMock from "fetch-mock";
import { ENDPOINTS } from "@scripts/constants/endpoints";
import { FetchData } from "@scripts/data/fetch-data";
import { AlertHelper } from "@utils/alert-helper";

describe("Get all restaurant", () => {
	afterEach(() => {
		fetchMock.restore();
	});

	describe("when fetch is failed", () => {
		it("should return an empty array", async () => {
			fetchMock.mock(ENDPOINTS.LIST, 500);

			const res = await FetchData.restaurantList();
			expect(res).toEqual([]);
		});

		it("should show notification", async () => {
			fetchMock.mock(ENDPOINTS.LIST, 500);

			spyOn(AlertHelper, "createAlert");

			await FetchData.restaurantList();
			expect(AlertHelper.createAlert).toHaveBeenCalled();
		});
	});
});
