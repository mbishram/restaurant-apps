import $ from "jquery";
import { WebcompHelper } from "@utils/webcomp-helper";
import { Footer } from "@components/Footer";
import style from "./style.webcomp.scss";

const template = WebcompHelper.createTemplate(`
	<button
		id="nav-button"
		class="btn btn-icon text-secondary nav-btn"
		type="button"
		aria-label="navigasi"
	>
		<i class="bi bi-list"></i>
	</button>
	<nav>
		<h1 aria-label="yelping you pick a restaurant.">
			<!--suppress HtmlUnknownTarget -->
			<img
				src="./images/yelping-logo.svg"
				alt="logo yelping you pick a restaurant."
			/>
		</h1>
		<ul>
			<slot></slot>
		</ul>
	</nav>
`);

class Navigation extends HTMLElement {
	private selector: Function = () => {};

	private container = Footer.container;

	private nav: any;
	private navBtn: any;
	private navBtnIcon: any;

	constructor() {
		super();

		this.setAttribute("role", "banner");
	}

	// noinspection JSUnusedLocalSymbols
	private connectedCallback() {
		if (this.shadowRoot === null) this.attachShadow({ mode: "open" });
		$(window).on("load", () => {
			this.render();
		});
	}

	// noinspection JSUnusedLocalSymbols
	private disconnectedCallback() {
		this.clearEventListener();
	}

	private render = () => {
		this.shadowRoot?.appendChild(WebcompHelper.createStyle(style));
		this.shadowRoot?.appendChild(template.content.cloneNode(true));
		this.setupProperties();
		this.setupEventListener();
	}

	private setupProperties = () => {
		this.selector = WebcompHelper.setupSelector(this.shadowRoot || undefined);

		this.nav = this.selector("nav");
		this.navBtn = this.selector("#nav-button");
		this.navBtnIcon = this.selector("#nav-button i");
	}

	private setupEventListener = () => {
		// Setup navigation button on mobile
		this.navBtn.on("click", this.handleNav);
		this.nav.on("click", (event: Event) => {
			// Stop it from closing the nav when nav is clicked
			event.stopPropagation();
		});

		// Setup navigation spacing on tablet up
		this.handleNavSpacing();
		$(window).on("resize", this.handleNavSpacing);
	}

	private clearEventListener = () => {
		this.navBtn.off("click");
		this.nav.off("click");
		$(window).off("resize");
	}

	private handleNav = (event: Event) => {
		this.navBtnIcon.toggleClass("bi-x");
		this.navBtnIcon.toggleClass("bi-list");
		this.navBtnIcon.toggleClass("text-dark");

		this.nav.toggleClass("open");

		// Stop it from immediately closing nav when nav button is clicked
		event.stopPropagation();
	}

	// Make nav and skip to content to align with the container
	// on tablet devices an up
	private handleNavSpacing = () => {
		const mediaTablet = matchMedia("only screen and (min-width: 768px)");
		if (mediaTablet.matches) {
			const spacing = (parseFloat(this.container?.css("marginLeft")) +
				parseFloat(this.container?.css("paddingLeft"))) || 0;
			this.nav.css("left", spacing);
			this.nav.css("right", spacing);

			return;
		}

		this.nav.css("left", 0);
		this.nav.css("right", 0);
	};

	rerender = () => {
		while (this.shadowRoot?.firstChild) {
			this.shadowRoot?.firstChild.remove();
		}
		this.clearEventListener();
		this.render();
	}
}

window.customElements.define("custom-navigation", Navigation);
