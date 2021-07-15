import { ENDPOINTS } from "@scripts/constants/endpoints";
import { ALERT_TYPES } from "@scripts/constants/alert-types";
import { CONFIGS } from "@scripts/constants/configs";
import { AlertHelper } from "@utils/alert-helper";

export class FetchData {
	static restaurantList = async () => {
		try {
			const response = await fetch(ENDPOINTS.LIST);
			const responseJSON = await response.json();

			FetchData.checkError(responseJSON);

			return responseJSON.restaurants;
		} catch (error) {
			AlertHelper.createAlert(ALERT_TYPES.ERROR, "Restoran gagal diambil! Coba periksa koneksi internet Anda.");
			return [];
		}
	}

	static restaurantDetail = async (id: string) => {
		try {
			const response = await fetch(ENDPOINTS.DETAIL(id));
			const responseJSON = await response.json();

			FetchData.checkError(responseJSON);

			return responseJSON.restaurant;
		} catch (error) {
			AlertHelper.createAlert(ALERT_TYPES.ERROR, "Restoran gagal diambil! Coba periksa koneksi internet Anda.");
			return {};
		}
	}

	static createReview = async (data: { id: string, name: string, review: string }) => {
		try {
			const response = await fetch(ENDPOINTS.REVIEW, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-Auth-Token": CONFIGS.API_KEY,
				},
				body: JSON.stringify(data),
			});
			const responseJSON = await response.json();

			FetchData.checkError(responseJSON);

			AlertHelper.createAlert(ALERT_TYPES.SUCCESS, "Ulasan berhasil ditambah!");
			return responseJSON.customerReviews;
		} catch (error) {
			AlertHelper.createAlert(ALERT_TYPES.ERROR, "Ulasan gagal ditambah! Coba periksa koneksi internet Anda.");
			return [];
		}
	}

	private static checkError = (responseJSON:
		{ customerReviews: Array<object>, error: boolean, message: string }) => {
		if (responseJSON.error) throw responseJSON.message;
	}
}
