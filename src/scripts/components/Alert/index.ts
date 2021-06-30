import $ from "jquery";
import { WebcompHelper } from "@utils/webcomp-helper";
import { Alert } from "@scripts/entities/alert";
import { Footer } from "@components/Footer";
import style from "./style.webcomp.scss";

const template = WebcompHelper.createTemplate(`
	<p></p>
`);

export class CustomAlert extends HTMLElement {
	private selector: Function = () => {}

	private alertData: Alert = new Alert()
	private timeout!: ReturnType<typeof setTimeout>

	private paragraph: any

	// noinspection JSUnusedLocalSymbols
	private async connectedCallback() {
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
		this.setupEventListener();
		this.setupElement();
		this.setSpacing();
		if (this.alertData.message) this.openAlert();
	}

	private setupProperties = () => {
		this.selector = WebcompHelper.setupSelector(this.shadowRoot || undefined);

		this.paragraph = this.selector("p");
	}

	private setupEventListener = () => {
		$(window).on("resize", this.setSpacing);
	}

	private clearEventListener = () => {
		$(window).off("resize", this.setSpacing);
	}

	private setupElement = () => {
		this.paragraph.text(this.alertData.message);
		$(this).addClass(this.alertData.type);
	}

	private setSpacing = () => {
		if (WebcompHelper.isTabletUp()) {
			$(this).css("left", Footer.getContainerSpacing);
		}
	}

	private openAlert = () => {
		$(this).addClass("open");
		$(this).attr("role", "alert");
		this.timeout = setTimeout(this.closeAlert, 5500);
	}

	private closeAlert = () => {
		$(this).removeClass("open");
		$(this).removeAttr("role");
	}

	rerender = () => {
		while (this.shadowRoot?.firstChild) {
			this.shadowRoot?.firstChild.remove();
		}
		$(this).removeClass();
		clearTimeout(this.timeout);
		this.render();
	}

	set setAlertData(data: Alert) {
		this.alertData = data;
		this.rerender();
	}
}

window.customElements.define("custom-alert", CustomAlert);
