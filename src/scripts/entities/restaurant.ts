export class Restaurant {
	id: string;
	name: string;
	description: string;
	pictureId: string;
	city: string;
	rating: number;

	constructor(
		restaurant?: Restaurant,
	) {
		this.id = restaurant?.id || "";
		this.name = restaurant?.name || "";
		this.description = restaurant?.description || "";
		this.pictureId = restaurant?.pictureId || "";
		this.city = restaurant?.city || "";
		this.rating = restaurant?.rating || 0;
	}
}
