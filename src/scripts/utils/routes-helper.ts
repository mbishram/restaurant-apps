import { Link } from "@scripts/entities/link";

export class RouterHelper {
	static get getLink() {
		return new Link(window.location.hash.slice(1).toLowerCase());
	}

	static get getLinkFormatted() {
		const link = new Link(window.location.hash.slice(1).toLowerCase());
		return `/${link.resource}${link.id ? "/:id" : ""}`;
	}
}
