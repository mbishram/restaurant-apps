import $ from "jquery";
import _ from "lodash";
import { WebcompHelper } from "@utils/webcomp-helper";
import { MenuList } from "@components/MenuList";
import { ReviewList } from "@components/ReviewList";
import { FavoriteButton } from "@components/FavoriteButton";
import { FetchData } from "@scripts/data/fetch-data";
import { RouterHelper } from "@utils/routes-helper";
import { Restaurant } from "@scripts/entities/restaurant";
import { ALERT_TYPES } from "@scripts/constants/alert-types";
import { CustomAlert } from "@components/Alert";
import { AlertHelper } from "@utils/alert-helper";
import style from "./style.webcomp.scss";

const template = WebcompHelper.createTemplate(`
	<page-section id="restaurant-list" aria-labelledby="restaurant-header">
		<div slot="header">
			<span class="sr-only">Nama Restoran </span>
			<span id="restaurant-header">Nama Restoran</span>
		</div>
		<div slot="content" class="content">
			<div class="detail-grid">
				<img 
					src="https://via.placeholder.com/1080x720.png?text=Image%20Missing"
					alt="Gambar tidak ditemukan"
				/>
			
				<section aria-label="Deskripsi restoran">
					<p class="mb-xs"><b>Kategori</b></pc>
					<p id="kategori">Kategori 1, Kategori 2</p>
				 
					<p class="mt-sm mb-xs"><b>Penilaian</b></p>
					<p>
						<span class="text-primary" tabindex="-1">
							<i class="bi bi-star"></i>
						</span>
						<span id="rating">0</span></span>
					</p>
					 
					<p class="mt-sm mb-xs"><b>Alamat</b></p>
					<p>
						<span id="kota">Kota</span>, <span id="alamat">Alamat Rumah No. 32</span>
					</p>
					 
					<p class="mt-sm mb-xs"><b>Deskripsi</b></p>
					<p id="deskripsi">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt
						libero non nostrum praesentium quasi quis quod! Adipisci dolorum eaque
						et itaque temporibus? Culpa eius esse fuga id itaque praesentium veritatis
					</p>
				</section>
			</div>
			
			<section aria-label="Menu restoran">
				<p class="mb-xs"><b>Makanan</b></p>
				<menu-list id="makanan"></menu-list>
				
				<p class="mt-sm mb-xs"><b>Minuman</b></p>
				<menu-list id="minuman"></menu-list>
			</section>
			
			<section aria-label="Ulasan restoran">
				<p class="mb-xs"><b>Ulasan</b></p>
				<form class="mb-sm" action="#">
					<input type="text" id="yelping-name" placeholder="Nama" class="mb-xs"/>
					<textarea id="yelping-desc" placeholder="Review" rows="3"></textarea>
					<button type="submit" class="btn btn-secondary mt-xs">Kirim Ulasan</button>
				</form>
				<review-list></review-list>
			</section>
		</div>
		<favorite-button class="btn btn-secondary btn-icon"></favorite-button>
	</page-section>
`);

export class DetailPage extends HTMLElement {
	private selector: Function = () => {}

	private detailData: Restaurant = new Restaurant()

	private header: any
	private img: any
	private kategori: any
	private rating: any
	private kota: any
	private alamat: any
	private deskripsi: any
	private makananList: any
	private minumanList: any
	private reviewForm: any
	private reviewFormName: any
	private reviewFormDesc: any
	private reviewList: any
	private favoriteButton: any
	private alert: any

	// noinspection JSUnusedLocalSymbols
	private async connectedCallback() {
		if (this.shadowRoot === null) this.attachShadow({ mode: "open" });

		WebcompHelper.startLoading();

		const data =
			await FetchData.restaurantDetail(RouterHelper.getLink.id);
		this.detailData = new Restaurant(data);
		this.render();

		WebcompHelper.stopLoading();
	}

	// noinspection JSUnusedLocalSymbols
	private disconnectedCallback() {
		this.clearEventListener();
	}

	private render = () => {
		this.shadowRoot?.appendChild(WebcompHelper.createStyle(style));
		this.shadowRoot?.appendChild(template.content.cloneNode(true));
		document.title =
			WebcompHelper.getDocumentTitleFormatted(this.detailData.name);

		this.setupProperties();
		this.setupEventListener();
		this.setupHeader();
		this.setupImg();
		this.setupDescription();
		this.initMenuList();
		this.initReviewList();
		this.initFavoriteButton();
	}

	private setupProperties = () => {
		this.selector = WebcompHelper.setupSelector(this.shadowRoot || undefined);

		this.header = this.selector("#restaurant-header");
		this.img = this.selector("img");
		this.kategori = this.selector("#kategori");
		this.rating = this.selector("#rating");
		this.kota = this.selector("#kota");
		this.alamat = this.selector("#alamat");
		this.deskripsi = this.selector("#deskripsi");
		this.makananList = this.selector("menu-list#makanan")[0] as MenuList;
		this.minumanList = this.selector("menu-list#minuman")[0] as MenuList;
		this.reviewForm = this.selector("form");
		this.reviewFormName = this.selector("form #yelping-name");
		this.reviewFormDesc = this.selector("form #yelping-desc");
		this.reviewList = this.selector("review-list")[0] as ReviewList;
		this.favoriteButton = this.selector("favorite-button")[0] as FavoriteButton;
		this.alert = $("custom-alert")[0] as CustomAlert;
	}

	private setupEventListener = () => {
		this.reviewForm.on("submit", this.handleSubmitReview);
	}

	private clearEventListener = () => {
		this.reviewForm.off("submit", this.handleSubmitReview);
	}

	private setupHeader = () => {
		this.header.text(this.detailData.name);
	}

	private setupImg = () => {
		this.img.attr("src", `https://restaurant-api.dicoding.dev/images/medium/${this.detailData.pictureId}`);
		this.img.attr("alt", this.detailData.name);
	}

	private setupDescription = () => {
		this.kategori.text(this.formatKategori());
		this.rating.text(this.detailData.rating);
		this.kota.text(this.detailData.city);
		this.alamat.text(this.detailData.address);
		this.deskripsi.text(this.detailData.description);
	}

	private initMenuList = () => {
		this.makananList.setMenuData =
			WebcompHelper.convertMenuData(this.detailData.menus.foods);
		this.minumanList.setMenuData =
			WebcompHelper.convertMenuData(this.detailData.menus.drinks);
	}

	private initReviewList = () => {
		this.reviewList.setReviewData =
			WebcompHelper.convertReviewData(this.detailData.customerReviews);
	}

	private initFavoriteButton = () => {
		// TODO: Make it search for favorite from DB
		this.favoriteButton.setRestaurantData = this.detailData;
	}

	private formatKategori = () => {
		const dataKategori = WebcompHelper.convertKategoriData(this.detailData.categories);
		return dataKategori.map((kategori) =>
			kategori.name).join(", ");
	}

	private handleSubmitReview = async (event: Event) => {
		event.preventDefault();

		if (!(this.reviewFormName.val() && this.reviewFormDesc.val())) {
			AlertHelper.createAlert(ALERT_TYPES.ERROR, "Terdapat input yang belum terisi! Periksa kembali data yang Anda masukkan.");

			return;
		}

		const reviewData =
			await FetchData.createReview(
				{
					id: RouterHelper.getLink.id,
					name: this.reviewFormName.val(),
					review: this.reviewFormDesc.val(),
				},
			);

		if (_.isEmpty(reviewData)) {
			return;
		}

		this.resetReviewForm();
		this.refreshReviewData(reviewData);
	}

	private resetReviewForm = () => {
		this.reviewFormName.val("");
		this.reviewFormDesc.val("");
	}

	private refreshReviewData = (data: Array<object>) => {
		this.detailData.customerReviews =
			WebcompHelper.convertReviewData(data);
		this.rerender();
	}

rerender = () => {
	while (this.shadowRoot?.firstChild) {
		this.shadowRoot?.firstChild.remove();
	}
	this.render();
}
}

window.customElements.define("detail-page", DetailPage);
