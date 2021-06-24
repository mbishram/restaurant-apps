// So typescript can recognize .scss files
declare module "*.scss"{
	const content: string;
	export default content;
}
