import { LandingPage } from "@views/LandingPage";

export class PagesHelper {
	private static container = LandingPage.container;

	static get containerSpacing() {
		return parseInt(this.container.css("marginLeft"), 10)
			+ parseInt(this.container.css("paddingLeft"), 10);
	}
}
