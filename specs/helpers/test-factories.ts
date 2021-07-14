import { Loader } from "@components/Loader";

export class TestFactories {
	static createFavoriteButtonEmptyState = () => {
		document.body.innerHTML = "";

		document.body.appendChild(new Loader());
	}
}
