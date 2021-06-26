import { LandingPage } from "@views/LandingPage";
import { PageSection } from "@components/PageSection";
import { Footer } from "@components/Footer";

export class PagesHelper {
	private static container = LandingPage.container || PageSection.container || Footer.container;

	static get containerSpacing() {
		return (parseFloat(this.container?.css("marginLeft"))
			+ parseFloat(this.container?.css("paddingLeft"))) || 0;
	}
}
