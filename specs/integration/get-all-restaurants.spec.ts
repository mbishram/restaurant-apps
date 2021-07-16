import fetchMock from "fetch-mock";
import { ENDPOINTS } from "@scripts/constants/endpoints";
import { FetchData } from "@scripts/data/fetch-data";
import { AlertHelper } from "@utils/alert-helper";

describe("Get all restaurant", () => {
	afterEach(() => {
		fetchMock.restore();
	});

	describe("when fetch is failed", () => {
		beforeEach(() => {
			fetchMock.mock(ENDPOINTS.LIST, 500);
		});

		it("should return an empty array", async () => {
			const res = await FetchData.restaurantList();
			expect(res).toEqual([]);
		});

		it("should show notification", async () => {
			spyOn(AlertHelper, "createAlert");

			await FetchData.restaurantList();
			expect(AlertHelper.createAlert).toHaveBeenCalled();
		});
	});
});
