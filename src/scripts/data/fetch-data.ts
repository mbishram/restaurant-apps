import { ENDPOINTS } from "@scripts/constants/endpoints";

export class FetchData {
	static restaurantList = async () => {
		const response = await fetch(ENDPOINTS.LIST);
		const responseJSON = await response.json();
		return responseJSON.restaurants;
	}

	static restaurantDetail = async (id: string) => {
		const response = await fetch(ENDPOINTS.DETAIL(id));
		const responseJSON = await response.json();
		return responseJSON.restaurant;
	}
}
