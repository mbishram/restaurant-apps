export class Menu {
	name: string;

	constructor(menu?: Menu) {
		this.name = menu?.name || "";
	}
}
