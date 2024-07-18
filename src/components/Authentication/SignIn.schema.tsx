import * as Yup from "yup";

export const loginInitialValues = {
	email: "",
	password: "",
};

export const loginValidation = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email address")
		.required("Please fill the email address"),
	password: Yup.string()
		.required("Password is required.")
		.matches(
			/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,20}$/,
			"Recommended strong password with 1 capital letter, 1 small letter, 1 symbol, 1 digit and characters between 6 and 20."
		),
});
