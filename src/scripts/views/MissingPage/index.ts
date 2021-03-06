import { WebcompHelper } from "@utils/webcomp-helper";
import style from "./style.webcomp.scss";

const template = WebcompHelper.createTemplate(`
	<page-section id="restaurant-list" aria-labelledby="restaurant-header">
		<div slot="header" id="restaurant-header">
			<b class="text-primary">Halaman</b> Tidak
			Dapat Ditemukan! 
		</div>
		<div slot="content">
			<p>
				Halaman yang Anda cari tidak dapat ditemukan!
				Coba periksa kembali link, atau kembali ke halaman sebelumnya.
			</p>
			<a href="javascript: history.back()" class="btn btn-gray mt-lg">Kembali</a>
		</div>
	</page-section>
`);

export class MissingPage extends HTMLElement {
	private selector: Function = () => {}

	// noinspection JSUnusedLocalSymbols
	private connectedCallback() {
		if (this.shadowRoot === null) this.attachShadow({ mode: "open" });

		this.render();
		WebcompHelper.stopLoading();
	}

	private render = () => {
		this.shadowRoot?.appendChild(WebcompHelper.createStyle(style));
		this.shadowRoot?.appendChild(template.content.cloneNode(true));
		document.title = WebcompHelper.getDocumentTitleFormatted();

		this.setupProperties();
	}

	private setupProperties = () => {
		this.selector = WebcompHelper.setupSelector(this.shadowRoot || undefined);
	}

	rerender = () => {
		while (this.shadowRoot?.firstChild) {
			this.shadowRoot?.firstChild.remove();
		}
		this.render();
	}
}

window.customElements.define("missing-page", MissingPage);
