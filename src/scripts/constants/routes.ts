import { LandingPage } from "@views/LandingPage";
import { FavoritePage } from "@views/FavoritePage";
import { DetailPage } from "@views/DetailPage";
import { Route } from "@scripts/entities/route";

export interface IRoutes {
	"/": Route<typeof LandingPage>,
	"/favorit": Route<typeof FavoritePage>,
	"/restoran/:id": Route<typeof DetailPage>
}

// Passing reference instead of element to save on performance
export const ROUTES: IRoutes = {
	"/": new Route<typeof LandingPage>({
		ClassReference: LandingPage,
		selectedNavId: "#nav-beranda",
	}),
	"/favorit": new Route<typeof FavoritePage>({
		ClassReference: FavoritePage,
		selectedNavId: "#nav-favorit",
	}),
	"/restoran/:id": new Route<typeof DetailPage>({
		ClassReference: DetailPage,
		selectedNavId: "",
	}),
};
