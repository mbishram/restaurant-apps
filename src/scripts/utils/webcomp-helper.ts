import $ from "jquery";
import _ from "lodash";
import { Restaurant } from "@scripts/entities/restaurant";
import { Menu } from "@scripts/entities/menu";
import { Review } from "@scripts/entities/review";
import { Kategori } from "@scripts/entities/kategori";

export class WebcompHelper {
	static createTemplate = (html: string) => {
		const template = document.createElement("template");
		template.innerHTML = html;

		return template;
	}

	static createStyle = (style: string) => {
		const styleElement = document.createElement("style");
		styleElement.textContent = style;

		return styleElement;
	}

	static setupSelector = (context: object = document) =>
		(selector: string) =>
			$(selector, context);

	// Mimic native "link to hash" on shadow dom
	static scrollTo = ({ btnId, toId, selector = $ }:
		{btnId: string, toId: string, selector: any}) => {
		selector(btnId).on("click", () => {
			const toEl = selector(toId);
			toEl[0].scrollIntoView();
			toEl.focus();

			// Scroll a little bit before the element to account for navbar
			const currentScrollPos = $(window).scrollTop() || 0;
			$(window).scrollTop(currentScrollPos - 80);
		});
	}

	static getDocumentTitleFormatted = (currentPage: string = "") =>
		`${currentPage && `${currentPage} | `}YELPing you find a restaurant.`

	// Return Attr Object
	static getAttribute = (attribute: string, attributeLists: Array<Attr>) => {
		let returnValue: any = null;

		attributeLists.forEach((attr: Attr) => {
			if (attr.name === attribute) returnValue = attr;
		});

		return returnValue;
	}

	static convertTitleCase = (text: string) =>
		_.startCase(_.toLower(text));

	// Convert into Array of Restaurant
	static convertRestaurantData = (data: Array<object>) =>
		data.map((restaurant) =>
			new Restaurant(restaurant as Restaurant))

	// Convert into Array of Kategori
	static convertKategoriData = (data: Array<object>) =>
		data.map((kategori) =>
			new Kategori(kategori as Kategori))

	// Convert into Array of Menu
	static convertMenuData = (data: Array<object>) =>
		data.map((menu) =>
			new Menu(menu as Menu))

	// Convert into Array of Review
	static convertReviewData = (data: Array<object>) =>
		data.map((review) =>
			new Review(review as Review))
}
