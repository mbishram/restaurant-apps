import { WebcompHelper } from "@utils/webcomp-helper";
import { TestFactories } from "./helpers/test-factories";
import { UtilsHelper } from "./helpers/utils-helper";

describe("Review review", () => {
	describe("when there is no review", () => {
		it("should show indicator", () => {
			TestFactories.setupReviewList([]);

			expect(UtilsHelper.getRootWebComponent("review-list")?.querySelector("p")).toBeTruthy();
		});
	});

	describe("when there is review", () => {
		it("should show it correctly", () => {
			const arrayReview = WebcompHelper.convertReviewData(
				[
					{ name: "Review 1" },
					{ name: "Review 2" },
					{ name: "Review 3" },
				],
			);
			TestFactories.setupReviewList(arrayReview);

			UtilsHelper.getRootWebComponent("review-list")?.querySelectorAll("review-item")
				.forEach((reviewItem, index) =>
					expect(reviewItem.shadowRoot?.querySelector("#nama")?.innerHTML)
						.toEqual(arrayReview[index].name));
		});
	});
});
