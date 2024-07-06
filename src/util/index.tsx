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

interface IPersonalInfo {
	firstName: string;
	middleName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	gender: string;
	dob: string;
	nationality: string;
	profileImage: string;
	rssbNo: string;
	idNumber: string;
	address: string;
	password: string;
	confirmPassword: string;
}

type PersonalInfoFormProps<PersonalInfo> = {
	onSubmit: PersonalInfo;
};
