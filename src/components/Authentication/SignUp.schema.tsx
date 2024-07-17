import * as Yup from "yup";
import {
	differenceInYears as dateFnsDifferenceInYears,
	parseISO,
} from "date-fns";

export const differenceInYears = (dateLeft: string, dateRight: string) => {
	console.log(dateLeft, dateRight);
	return dateFnsDifferenceInYears(parseISO(dateLeft), parseISO(dateRight));
};

export const personalInfoIV = {
	firstName: sessionStorage.getItem("firstName") || "",
	middleName: sessionStorage.getItem("middleName") || "",
	lastName: sessionStorage.getItem("lastName") || "",
	email: sessionStorage.getItem("email") || "",
	phoneNumber: sessionStorage.getItem("phoneNumber") || "",
	gender: sessionStorage.getItem("gender") || "",
	// dob: sessionStorage.getItem("dob") || "",
	dob: sessionStorage.getItem("dob") || new Date(),
	nationality: sessionStorage.getItem("nationality") || "",
	profileImage: sessionStorage.getItem("profileImage") || "",
	rssbNo: sessionStorage.getItem("rssbNo") || "",
	idNumber: sessionStorage.getItem("idNumber") || "",
	address: sessionStorage.getItem("address") || "",
	password: sessionStorage.getItem("password") || "",
	confirmPassword: sessionStorage.getItem("confirmPassword") || "",
};

export const organizationInfoIV = {
	name: sessionStorage.getItem("organizationName") || "",
	displayName: sessionStorage.getItem("organizationDisplayName") || "",
	logoUrl: sessionStorage.getItem("organizationLogoUrl") || "",
	aboutUs: sessionStorage.getItem("organizationAboutUs") || "",
	mission: sessionStorage.getItem("organizationMission") || "",
	vision: sessionStorage.getItem("organizationVision") || "",
	industry: sessionStorage.getItem("organizationIndustry") || "",
	address: sessionStorage.getItem("organizationAddress") || "",
	phoneNumber: sessionStorage.getItem("organizationPhoneNumber") || "",
	email: sessionStorage.getItem("organizationEmail") || "",
	website: sessionStorage.getItem("organizationWebsite") || "",
	tinNo: sessionStorage.getItem("organizationTinNo") || "",
};

export const workInfoIV = {
	department: sessionStorage.getItem("department") || "",
	position: sessionStorage.getItem("position") || "",
};

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
					new Date((value as Date) || "").toISOString().split("T")[0]
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
			/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,20}$/,
			"Recommended strong password with 1 capital letter, 1 small letter, 1 symbol, 1 digit and characters between 6 and 20."
		),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password"), null], "Passwords must match")
		.required("Confirm Password is required."),
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
