export class UtilsHelper {
	// Query a web component and return it's shadow root
	static getRootWebComponent = (
		selector: string,
		context: ShadowRoot | Document | null = document,
	) =>
		context?.querySelector(selector)?.shadowRoot
}
