import $ from "jquery";
import { RouterHelper } from "@utils/routes-helper";
import { IRoutes, ROUTES } from "@scripts/constants/routes";
import { MissingPage } from "@views/MissingPage";
import { NavigationLink } from "@components/NavigationLink";

export class App {
	private static prevSelectedNavId: string

	static renderPage = () => {
		const link = RouterHelper.getLinkFormatted;
		const ClassReference = ROUTES[link as keyof IRoutes]?.ClassReference || MissingPage;
		const selectedNavId = ROUTES[link as keyof IRoutes]?.selectedNavId;

		$("main").html(new ClassReference());
		App.markSelectedNavLink(selectedNavId);
		App.removePrevSelectedNavLink(selectedNavId);
		// It will only scroll to top if it's "link to hash"
		if (!RouterHelper.getLink?.hash) $(window).scrollTop(0);
	}

	private static markSelectedNavLink = (selectedNavId: string) => {
		const selectedNav = $(selectedNavId)[0] as NavigationLink;
		selectedNav?.addSelected();
	}

	private static removePrevSelectedNavLink = (selectedNavId: string) => {
		const prevSelectedNav = $(App.prevSelectedNavId)[0] as NavigationLink;
		if (prevSelectedNav && selectedNavId !== App.prevSelectedNavId) prevSelectedNav?.removeSelected();
		App.prevSelectedNavId = selectedNavId;
	}
}
