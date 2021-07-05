import { WebcompHelper } from "@utils/webcomp-helper";
import { Review } from "@scripts/entities/review";
import { jQuery } from "@typings/global";
import style from "./style.webcomp.scss";

const template = WebcompHelper.createTemplate(`
	<article class="card border-radius-sm p-sm">
		<p><b id="nama">Nama Pengulas</b></p>
		<p id="tanggal" class="text-sm text-gray-3">01 Desember 2000</p>
		<p id="deskripsi" class="mt-xs">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad amet cumque dolorum
			ducimus et excepturi facere fugit harum iste itaque laborum minus
			placeat, possimus quibusdam quidem repudiandae sequi voluptate.
		</p>
	</article>
`);

export class ReviewItem extends HTMLElement {
	private selector: Function = () => {}

	private review: Review = new Review()
	private article!: jQuery
	private deskripsi!: jQuery
	private nama!: jQuery
	private tanggal!: jQuery

	constructor() {
		super();

		this.setAttribute("role", "listitem");
	}

	// noinspection JSUnusedLocalSymbols
	private connectedCallback() {
		if (this.shadowRoot === null) this.attachShadow({ mode: "open" });
	}

	private render = () => {
		this.shadowRoot?.appendChild(WebcompHelper.createStyle(style));
		this.shadowRoot?.appendChild(template.content.cloneNode(true));

		this.setupProperties();
		this.setupElement();
	}

	private setupProperties = () => {
		this.selector = WebcompHelper.setupSelector(this.shadowRoot || undefined);

		this.article = this.selector("article");
		this.deskripsi = this.selector("#deskripsi");
		this.nama = this.selector("#nama");
		this.tanggal = this.selector("#tanggal");
	}

	private setupElement = () => {
		this.article.attr("aria-label", `ulasan dari ${this.review.name}`);
		this.deskripsi.text(this.review.review);
		this.nama.text(this.review.name);
		this.tanggal.text(this.review.date);
	}

	set setReview(review: Review) {
		this.review = review;
		this.render();
	}

	rerender = () => {
		while (this.shadowRoot?.firstChild) {
			this.shadowRoot?.firstChild.remove();
		}
		this.render();
	}
}

window.customElements.define("review-item", ReviewItem);
