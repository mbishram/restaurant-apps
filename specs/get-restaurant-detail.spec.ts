import fetchMock from "fetch-mock";
import { ENDPOINTS } from "@scripts/constants/endpoints";
import { FetchData } from "@scripts/data/fetch-data";
import { AlertHelper } from "@utils/alert-helper";

describe("Get restaurant detail", () => {
	beforeEach(() => {
		fetchMock.mock(ENDPOINTS.DETAIL("1"), 500);
	});

	afterEach(() => {
		fetchMock.restore();
	});

	describe("when fetch is failed", () => {
		it("should return an empty object", async () => {
			const res = await FetchData.restaurantDetail("1");
			expect(res).toEqual({});
		});

		it("should show notification", async () => {
			spyOn(AlertHelper, "createAlert");

			await FetchData.restaurantDetail("1");
			expect(AlertHelper.createAlert).toHaveBeenCalled();
		});
	});
});
