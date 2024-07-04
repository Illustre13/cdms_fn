import * as Yup from "yup";
import {
	differenceInYears as dateFnsDifferenceInYears,
	parseISO,
} from "date-fns";

export const differenceInYears = (dateLeft: string, dateRight: string) => {
	return dateFnsDifferenceInYears(parseISO(dateLeft), parseISO(dateRight));
};

export const loginValidation = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email address")
		.required("Please fill the email address"),
	password: Yup.string()
		.required("Password is required.")
		.matches(
			/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,16}$/,
			"Recommended strong password with 1 capital letter, 1 small letter, 1 symbol, 1 digit and characters between 6 and 16."
		),
});

export const personalInfoValidation = Yup.object().shape({
	firstName: Yup.string().required("First Name is required."),
	middleName: Yup.string().optional(),
	lastName: Yup.string().required("Last Name is required."),
	email: Yup.string()
		.required("Email is required.")
		.email("Email must be a valid email address."),
	phoneNumber: Yup.string()
		.required("Phone Number is required.")
		.matches(/^[0-9]{10}$/, "Phone Number must contain only 10 digits."),
	gender: Yup.string().required("Gender is required."),
	// dob: Yup.string()
	// 	.required("Date of Birth is required.")
	// 	.matches(/^\d{4}-\d{2}-\d{2}$/, "Date of Birth must be a valid date."),
	dob: Yup.date()
		.required("Date of Birth is required.")
		.typeError("Date of Birth must be a valid date.")
		.test("dob", "You must be at least 18 years old.", function (value) {
			return (
				differenceInYears(
					new Date().toISOString().split("T")[0],
					new Date(value as Date).toISOString().split("T")[0]
				) >= 18
			);
		}),
	nationality: Yup.string().optional(),
	profileImage: Yup.string().optional(),
	rssbNo: Yup.string().required("RSSB Number is required."),
	idNumber: Yup.string()
		.optional()
		.matches(/^[0-9]{16}$/, "ID Number should be 16 digits."),
	address: Yup.string().optional(),
	password: Yup.string()
		.required("Password is required.")
		.matches(
			/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,16}$/,
			"Recommended strong password with 1 capital letter, 1 small letter, 1 symbol, 1 digit and characters between 6 and 16."
		),
});

export const organizationInfoValidation = Yup.object().shape({
	name: Yup.string().required("Organization name is required."),
	displayName: Yup.string().optional(),
	logoUrl: Yup.string().optional(),
	aboutUs: Yup.string().optional(),
	mission: Yup.string().optional(),
	vision: Yup.string().optional(),
	industry: Yup.string().required("Industry is required."),
	address: Yup.string().required("Organization address is required."),
	phoneNumber: Yup.string()
		.required("Organization phone number is required.")
		.matches(
			/^[0-9]{10}$/,
			"Organization phone number must contain only 10 digits."
		),
	email: Yup.string()
		.required("Organization email is required.")
		.email("Organization email must be a valid email address."),
	website: Yup.string().optional(),
	tinNo: Yup.string().optional(),
});

export const workInfoValidations = Yup.object().shape({
	department: Yup.string().required("Department is required."),
	position: Yup.string().required("Position is required."),
});
