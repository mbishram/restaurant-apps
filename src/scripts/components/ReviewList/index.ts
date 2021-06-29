import _ from "lodash";
import { WebcompHelper } from "@utils/webcomp-helper";
import { Review } from "@scripts/entities/review";
import { ReviewItem } from "@components/ReviewItem";
import style from "./style.webcomp.scss";

const emptyTemplate = WebcompHelper.createTemplate(`
	<p>Review tidak dapat ditemukan!</p>
`);

export class ReviewList extends HTMLElement {
	private reviewData: Array<Review> = []

	constructor() {
		super();

		this.setAttribute("role", "list");
	}

	// noinspection JSUnusedLocalSymbols
	private connectedCallback() {
		if (this.shadowRoot === null) this.attachShadow({ mode: "open" });
		this.render();
	}

	private render = () => {
		this.shadowRoot?.appendChild(WebcompHelper.createStyle(style));
		this.renderContent();
	}

	private renderContent = () => {
		if (!_.isEmpty(this.reviewData)) {
			this.reviewData.forEach((review: Review) => {
				const reviewItem = new ReviewItem();
				this.shadowRoot?.appendChild(reviewItem);
				reviewItem.setReview = new Review(review);
			});

			return;
		}

		this.shadowRoot?.appendChild(emptyTemplate.content.cloneNode(true));
	}

	rerender = () => {
		while (this.shadowRoot?.firstChild) {
			this.shadowRoot?.firstChild.remove();
		}
		this.render();
	}

	set setReviewData(data: Array<Review>) {
		this.reviewData = data;
		this.rerender();
	}
}

window.customElements.define("review-list", ReviewList);
