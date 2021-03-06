import $ from "jquery";
import { WebcompHelper } from "@utils/webcomp-helper";
import { Footer } from "@components/Footer";
import { jQuery } from "@typings/global";
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

export class Navigation extends HTMLElement {
	private selector: Function = () => {};

	private logo!: jQuery;
	private nav!: jQuery;
	private navBtn!: jQuery;
	private navBtnIcon!: jQuery;

	constructor() {
		super();

		this.setAttribute("role", "banner");
	}

	// noinspection JSUnusedLocalSymbols
	private connectedCallback() {
		if (this.shadowRoot === null) this.attachShadow({ mode: "open" });
		this.render();
	}

	// noinspection JSUnusedLocalSymbols
	private disconnectedCallback() {
		this.clearEventListener();
	}

	private render = () => {
		this.shadowRoot?.appendChild(WebcompHelper.createStyle(style));
		this.shadowRoot?.appendChild(template.content.cloneNode(true));

		this.setupProperties();
		this.handleNavSpacing();
		this.setupEventListener();
	}

	private setupProperties = () => {
		this.selector = WebcompHelper.setupSelector(this.shadowRoot || undefined);

		this.logo = this.selector("h1>a");
		this.nav = this.selector("nav");
		this.navBtn = this.selector("#nav-button");
		this.navBtnIcon = this.selector("#nav-button i");
	}

	private setupEventListener = () => {
		this.clearEventListener();

		// Setup navigation button on mobile
		this.logo.on("click", this.closeNav);
		this.navBtn.on("click", this.handleNav);
		this.nav.on("click", (event: Event) => {
			// Stop it from closing the nav when nav is clicked
			event.stopPropagation();
		});

		// Setup navigation spacing on tablet up
		$(window).on("resize", this.handleNavSpacing);
	}

	private clearEventListener = () => {
		this.logo.off("click", this.closeNav);
		this.navBtn.off("click");
		this.nav.off("click");
		$(window).off("resize", this.handleNavSpacing);
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
		if (WebcompHelper.isTabletUp()) {
			const spacing = Footer.getContainerSpacing;
			this.nav.css("left", spacing);
			this.nav.css("right", spacing);

			return;
		}

		this.nav.css("left", 0);
		this.nav.css("right", 0);
	};

	closeNav = () => {
		this.navBtnIcon.addClass("bi-list");
		this.navBtnIcon.removeClass("bi-x");
		this.navBtnIcon.removeClass("text-dark");

		this.nav.removeClass("open");
	}

	rerender = () => {
		while (this.shadowRoot?.firstChild) {
			this.shadowRoot?.firstChild.remove();
		}
		this.render();
	}
}

window.customElements.define("custom-navigation", Navigation);
