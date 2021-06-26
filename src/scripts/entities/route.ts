export class Route<T> {
	ClassReference: T
	selectedNavId: string

	constructor(route: Route<T>) {
		this.ClassReference = route.ClassReference;
		this.selectedNavId = route.selectedNavId || "";
	}
}
