import { expect, test } from "@playwright/test";
import * as randomstring from "randomstring";
import { UtilsHelper } from "../helpers/utils-helper";

test("Leaving a review for a restaurant", async ({ page }) => {
	await page.goto(UtilsHelper.getPageUrl());

	const restaurantLinkSelector = "restaurant-item #heading>a";
	await page.click(restaurantLinkSelector);

	const reviewerName = randomstring.generate();
	const reviewerReview = "DON'T LOOK UP LEGO PIECE 26047, WORST MISTAKE OF MY LIFE";

	await page.fill("#yelping-name", reviewerName);
	await page.fill("#yelping-desc", reviewerReview);
	await page.click("form button");
	await page.waitForEvent("response");

	expect(await page.$(`text=${reviewerName}`)).toBeTruthy();
	expect(await page.$(`text=${reviewerReview}`)).toBeTruthy();
});
