import { WebcompHelper } from "@utils/webcomp-helper";
import { RestaurantList } from "@components/RestaurantList";
import restaurantData from "@/DATA.json";
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
	private selector: Function = () => {};

	static container: any;

	// noinspection JSUnusedLocalSymbols
	private connectedCallback() {
		if (this.shadowRoot === null) this.attachShadow({ mode: "open" });
		this.render();
	}

	private render = () => {
		this.shadowRoot?.appendChild(WebcompHelper.createStyle(style));
		this.shadowRoot?.appendChild(template.content.cloneNode(true));

		this.setupProperties();
		this.setupEventListener();
		this.initRestaurantList();
	}

	private setupProperties = () => {
		this.selector = WebcompHelper.setupSelector(this.shadowRoot || undefined);

		LandingPage.container = this.selector(".container");
	}

	private setupEventListener = () => {
		WebcompHelper.scrollTo({ btnId: "#to-restaurant-btn", toId: "#restaurant-list", selector: this.selector });
	}

	private initRestaurantList = () => {
		const restaurantList = this.selector("restaurant-list")[0] as RestaurantList;
		restaurantList.setRestaurantData =
			WebcompHelper.convertRestaurantData(restaurantData.restaurants);
	}

	rerender = () => {
		while (this.shadowRoot?.firstChild) {
			this.shadowRoot?.firstChild.remove();
		}
		this.render();
	}
}

window.customElements.define("landing-page", LandingPage);
