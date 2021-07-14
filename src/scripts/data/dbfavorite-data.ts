import { openDB } from "idb";
import { CONFIGS } from "@scripts/constants/configs";
import { Restaurant } from "@scripts/entities/restaurant";

export class DBFavoriteData {
	private static dbPromise = openDB(CONFIGS.DB_NAME, CONFIGS.DB_VERSION, {
		upgrade: (database) => {
			database.createObjectStore(CONFIGS.OBJECT_STORE_NAME, { keyPath: "id" });
		},
	});

	static getRestaurant = async (id: string) =>
		(await DBFavoriteData.dbPromise).get(CONFIGS.OBJECT_STORE_NAME, id)

	static getAllRestaurant = async () =>
		(await DBFavoriteData.dbPromise).getAll(CONFIGS.OBJECT_STORE_NAME)

	static putRestaurant = async (restaurant: Restaurant) =>
		(await DBFavoriteData.dbPromise).put(CONFIGS.OBJECT_STORE_NAME, restaurant)

	static deleteRestaurant = async (id: string) =>
		(await DBFavoriteData.dbPromise).delete(CONFIGS.OBJECT_STORE_NAME, id)
}
