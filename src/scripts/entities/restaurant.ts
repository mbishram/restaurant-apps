import { Kategori } from "@scripts/entities/kategori";
import { Menu } from "@scripts/entities/menu";
import { Review } from "@scripts/entities/review";

export class Restaurant {
	id: string;
	name: string;
	description: string;
	city: string;
	address: string;
	pictureId: string;
	categories: Array<Kategori>
	menus: {foods: Array<Menu>, drinks: Array<Menu>}
	rating: number;
	customerReviews: Array<Review>

	constructor(
		restaurant?: Restaurant,
	) {
		this.id = restaurant?.id || "";
		this.name = restaurant?.name || "";
		this.description = restaurant?.description || "";
		this.city = restaurant?.city || "";
		this.address = restaurant?.address || "";
		this.pictureId = restaurant?.pictureId || "";
		this.categories = restaurant?.categories || [];
		this.menus = restaurant?.menus || { foods: [], drinks: [] };
		this.rating = restaurant?.rating || 0;
		this.customerReviews = restaurant?.customerReviews || [];
	}
}
