export class Review {
	name: string
	review: string
	date: string

	constructor(review?: Review) {
		this.name = review?.name || "";
		this.review = review?.review || "";
		this.date = review?.date || "";
	}
}
