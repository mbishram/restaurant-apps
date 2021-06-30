import $ from "jquery";
import { ENDPOINTS } from "@scripts/constants/endpoints";
import { CustomAlert } from "@components/Alert";
import { Alert } from "@scripts/entities/alert";
import { ALERT_TYPES } from "@scripts/constants/alert-types";

export class FetchData {
	private static alert = $("custom-alert")[0] as CustomAlert

	static restaurantList = async () => {
		try {
			const response = await fetch(ENDPOINTS.LIST);
			const responseJSON = await response.json();
			return responseJSON.restaurants;
		} catch (error) {
			FetchData.alert.setAlertData = new Alert({ type: ALERT_TYPES.error, message: "Restoran gagal di ambil! Coba periksa koneksi internet Anda!" });
			return [];
		}
	}

	static restaurantDetail = async (id: string) => {
		try {
			const response = await fetch(ENDPOINTS.DETAIL(id));
			const responseJSON = await response.json();
			return responseJSON.restaurant;
		} catch (error) {
			FetchData.alert.setAlertData = new Alert({ type: ALERT_TYPES.error, message: "Restoran gagal di ambil! Coba periksa koneksi internet Anda!" });
			return [];
		}
	}
}
