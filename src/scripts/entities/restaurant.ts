import { Kategori } from "@scripts/entities/kategori";
import { Menu } from "@scripts/entities/menu";
import { Review } from "@scripts/entities/review";
import { WebcompHelper } from "@utils/webcomp-helper";
import moment from "moment";

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
		this.id = restaurant?.id || moment().toISOString();
		this.name = WebcompHelper.convertTitleCase(restaurant?.name || "Restoran Tidak Ditemukan");
		this.description = restaurant?.description || "Deskripsi restoran tidak ditemukan.";
		this.city = restaurant?.city || "Kota";
		this.address = restaurant?.address || "Alamat Jl. No 1";
		this.pictureId = restaurant?.pictureId || "";
		this.categories = restaurant?.categories || [];
		this.menus = restaurant?.menus || { foods: [], drinks: [] };
		this.rating = restaurant?.rating || 0;
		this.customerReviews = restaurant?.customerReviews || [];
	}
}
