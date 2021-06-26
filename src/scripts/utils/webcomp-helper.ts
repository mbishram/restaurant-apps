import $ from "jquery";

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

	static setupSelector = (context: object = document) => (selector: string) => $(selector, context);

	// Mimic native "link to hash" on shadow dom
	static scrollTo = ({ btnId, toId, selector = $ }: {btnId: string, toId: string, selector: any}) => {
		selector(btnId).on("click", () => {
			selector(toId).focus();

			// Scroll a little bit before the element to account for navbar
			const currentScrollPos = $(window).scrollTop() || 0;
			$(window).scrollTop(currentScrollPos - 80);
		});
	}

	// Return Attr Object
	static getAttribute = (attribute: string, attributeLists: Array<Attr>) => {
		let returnValue: any = null;

		attributeLists.forEach((attr: Attr) => {
			if (attr.name === attribute) returnValue = attr;
		});

		return returnValue;
	}
}
