export class SWHelper {
	static registerSW = () => {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker.register("./sw.js");
		}
	}
}
