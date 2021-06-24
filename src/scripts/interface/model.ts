export interface Model<T> {
	// eslint-disable-next-line no-unused-vars
	setData: (data: Array<any>) => void,
	getData: () => Array<T>
}
