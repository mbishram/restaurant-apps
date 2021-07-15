import { WebcompHelper } from "@utils/webcomp-helper";
import { TestFactories } from "./helpers/test-factories";
import { UtilsHelper } from "./helpers/utils-helper";

describe("Restaurant menu", () => {
	describe("when there is no menu", () => {
		it("should show indicator", () => {
			TestFactories.setupMenuList([]);

			expect(UtilsHelper.getRootWebComponent("menu-list")?.querySelector("p")).toBeTruthy();
		});
	});

	describe("when there is menu", () => {
		it("should show it correctly", () => {
			const arrayMenu = WebcompHelper.convertMenuData(
				[
					{ name: "Menu 1" },
					{ name: "Menu 2" },
					{ name: "Menu 3" },
				],
			);
			TestFactories.setupMenuList(arrayMenu);

			UtilsHelper.getRootWebComponent("menu-list")?.querySelectorAll("menu-item")
				.forEach((menuItem, index) =>
					expect(menuItem.shadowRoot?.querySelector("p")?.innerHTML)
						.toEqual(arrayMenu[index].name));
		});
	});
});
