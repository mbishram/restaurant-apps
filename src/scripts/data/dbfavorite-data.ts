import { openDB } from "idb";
import { CONFIGS } from "@scripts/constants/configs";
import { Restaurant } from "@scripts/entities/restaurant";

const dbPromise = openDB(CONFIGS.DB_NAME, CONFIGS.DB_VERSION, {
	upgrade: (database) => {
		database.createObjectStore(CONFIGS.OBJECT_STORE_NAME, { keyPath: "id" });
	},
});

export class DBFavoriteData {
	static getRestaurant = async (id: string) => {
		// I have to called dbPromise twice for the test to work properly.
		// And the worse part is, if I made it all called it twice,
		// IT WON'T WORK! WHY??
		// Can some explain this madness!
		await dbPromise;
		return (await dbPromise).get(CONFIGS.OBJECT_STORE_NAME, id);
	}

	static getAllRestaurant = async () => {
		await dbPromise;
		return (await dbPromise).getAll(CONFIGS.OBJECT_STORE_NAME);
	}

	static putRestaurant = async (restaurant: Restaurant) => {
		await dbPromise;
		return (await dbPromise).put(CONFIGS.OBJECT_STORE_NAME, restaurant);
	}

	static deleteRestaurant = async (id: string) =>
		(await dbPromise).delete(CONFIGS.OBJECT_STORE_NAME, id)
}
