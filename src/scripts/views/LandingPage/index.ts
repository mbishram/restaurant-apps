import { WebcompHelper } from "@utils/webcomp-helper";
import { RestaurantList } from "@components/RestaurantList";
import { FetchData } from "@scripts/data/fetch-data";
import style from "./style.webcomp.scss";

const template = WebcompHelper.createTemplate(`
	<section id="hero" aria-labelledby="hero-header">
		<div class="container">
			<div class="description">
				<h2 class="text-lg" id="hero-header">
					 Kami akan mencari
					 <b class="text-primary">Restoran</b> yang tepat
					 untuk Anda!
				</h2>
				<p>
					 Dapatkan pelayanan kelas dunia dari restoran
					 berkelas di ujung jari Anda! Lorem ipsum dolor sit
					 amet, consectetur adipisicing elit. Debitis
					 explicabo ipsum nam nulla reiciendis!
				</p>
			</div>
			<a id="to-restaurant-btn" class="btn btn-secondary" href="#restaurant-list">
				Lihat Semua Restoran!
			</a>
		</div>
	</section>

	<page-section id="restaurant-list" tabindex="-1" aria-labelledby="restaurant-header">
		<div slot="header" id="restaurant-header">
			 Restoran
			 <b class="text-primary">Pilihan</b> Kami!
		</div>
		<restaurant-list slot="content"></restaurant-list>
	</page-section>

	<section id="cta" aria-labelledby="cta-header">
		<div class="container">
			<h2 class="text-lg" id="cta-header">
				<b class="text-primary">Tertarik?</b>
				Hubungi Kami!
			</h2>
			<a
				class="btn btn-secondary"
				href="https://www.instagram.com/mbishram/"
				target="_blank"
				rel="noopener"
			>
				Hubungi Kami!
			</a>
		</div>
	</section>
`);

export class LandingPage extends HTMLElement {
	private selector: Function = () => {}

	private restaurantList: any

	// noinspection JSUnusedLocalSymbols
	private async connectedCallback() {
		if (this.shadowRoot === null) this.attachShadow({ mode: "open" });
		await this.render();
	}

	// noinspection JSUnusedLocalSymbols
	private disconnectedCallback() {
		this.clearEventListener();
	}

	private render = async () => {
		this.shadowRoot?.appendChild(WebcompHelper.createStyle(style));
		this.shadowRoot?.appendChild(template.content.cloneNode(true));
		document.title = WebcompHelper.getDocumentTitleFormatted("Beranda");

		this.setupProperties();
		this.setupEventListener();
		await this.initRestaurantList();
	}

	private setupProperties = () => {
		this.selector = WebcompHelper.setupSelector(this.shadowRoot || undefined);

		this.restaurantList = this.selector("restaurant-list")[0] as RestaurantList;
	}

	private setupEventListener = () => {
		WebcompHelper.scrollTo({ btnId: "#to-restaurant-btn", toId: "#restaurant-list", selector: this.selector });
	}

	private clearEventListener = () => {
		this.selector("#to-restaurant-btn").off("click");
	}

	private initRestaurantList = async () => {
		const restaurantData = await FetchData.restaurantList();
		this.restaurantList.setRestaurantData =
			WebcompHelper.convertRestaurantData(restaurantData);
	}

	rerender = async () => {
		while (this.shadowRoot?.firstChild) {
			this.shadowRoot?.firstChild.remove();
		}
		this.clearEventListener();
		await this.render();
	}
}

window.customElements.define("landing-page", LandingPage);
