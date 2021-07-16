import { test, expect } from "@playwright/test";
import { UtilsHelper } from "../helpers/utils-helper";

test("Favorite and unfavorite a restaurant", async ({ page }) => {
	await page.goto(UtilsHelper.getPageUrl());

	const restaurantLinkSelector = "restaurant-item #heading>a";
	const restaurantItemName = await page.textContent(restaurantLinkSelector);
	await page.click(restaurantLinkSelector);

	expect(await page.textContent("#restaurant-header")).toEqual(restaurantItemName);

	await page.click("favorite-button");
	await page.goto(UtilsHelper.getPageUrl("#/favorit"));

	expect(await page.textContent(restaurantLinkSelector)).toEqual(restaurantItemName);
	await page.goBack();

	await page.click("favorite-button");
	await page.goForward();

	expect(await page.$("restaurant-item")).toBeFalsy();
});
