interface ResponseData {
	data: object;
	error: boolean;
	loading: boolean;
	status: null | string;
}
interface StateResponseData {
	data: any;
	error: boolean;
	loading: boolean;
	status: null | string | number;
	state?: string;
}
