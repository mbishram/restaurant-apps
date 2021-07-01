import $ from "jquery";
import { RouterHelper } from "@utils/routes-helper";
import { IRoutes, ROUTES } from "@scripts/constants/routes";
import { MissingPage } from "@views/MissingPage";
import { NavigationLink } from "@components/NavigationLink";
import { WebcompHelper } from "@utils/webcomp-helper";

export class App {
	private static prevRoute: string
	private static prevSelectedNavId: string

	static renderPage = () => {
		const link = RouterHelper.getLinkFormatted;
		const { hash, resource } = RouterHelper.getLink;
		const ClassReference = ROUTES[link as keyof IRoutes]?.ClassReference || MissingPage;
		const selectedNavId = ROUTES[link as keyof IRoutes]?.selectedNavId;

		// Do not append new view if it's the same route.
		// Usually it's on hash to link
		if (App.prevRoute !== resource) {
			WebcompHelper.startLoading();

			$("main").html(new ClassReference());
			App.setSkipToContentLink();
			App.markSelectedNavLink(selectedNavId);
			App.removePrevSelectedNavLink(selectedNavId);
			// It will only scroll to top if it's not "link to hash"
			if (!hash) $(window).scrollTop(0);
		}

		App.prevRoute = resource;
	}

	private static markSelectedNavLink = (selectedNavId: string) => {
		const selectedNav = $(selectedNavId)[0] as NavigationLink;
		selectedNav?.addSelected();
	}

	private static removePrevSelectedNavLink = (selectedNavId: string) => {
		const prevSelectedNav = $(App.prevSelectedNavId)[0] as NavigationLink;
		if (prevSelectedNav && selectedNavId !==
			App.prevSelectedNavId) prevSelectedNav?.removeSelected();
		App.prevSelectedNavId = selectedNavId;
	}

	private static setSkipToContentLink = () => {
		const { resource, id } = RouterHelper.getLink;
		const formatId = `main-content${resource && `/${resource}`}${id && `/${id}`}`;
		$("#skip-main").attr("href", `#${formatId}`);
		$("span.sr-only").attr("id", formatId);
	}
}
