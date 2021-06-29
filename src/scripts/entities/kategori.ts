export class Kategori {
	name: string

	constructor(kategori?: Kategori) {
		this.name = kategori?.name || "";
	}
}
