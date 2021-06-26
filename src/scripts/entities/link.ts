export class Link {
	hash: string;
	resource: string;
	id: string;

	constructor(
		link?: string,
	) {
		const splitLink = link?.split("/");
		this.hash = splitLink?.[0] || "";
		this.resource = splitLink?.[1] || "";
		this.id = splitLink?.[2] || "";
	}
}
