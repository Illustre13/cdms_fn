import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
	organizationInfoIV,
	organizationInfoValidation,
	personalInfoIV,
	personalInfoValidation,
	workInfoIV,
	workInfoValidations,
} from "./SignUp.schema";

export interface ISignupProps {
	tabMoved?: boolean;
	handleTabClick?: any;
	setSignupData?: any;
}

export const PersonalInfoForm: React.FC<ISignupProps> = ({
	handleTabClick,
}) => {
	// const isRenderingRef = useRef(false);

	// useEffect(() => {
	// 	isRenderingRef.current = false; // Reset after rendering
	// });

	const savePersonalForm = (values: any, { setSubmitting }: any) =>
		// isSubmitting: boolean
		{
			console.log("Personal Info Form Data ---> ", values);
			sessionStorage.setItem("firstName", values.firstName);
			sessionStorage.setItem("middleName", values.middleName);
			sessionStorage.setItem("lastName", values.lastName);
			sessionStorage.setItem("email", values.email);
			sessionStorage.setItem("phoneNumber", values.phoneNumber);
			sessionStorage.setItem("gender", values.gender);
			sessionStorage.setItem("dob", values.dob);
			sessionStorage.setItem("nationality", values.nationality);
			sessionStorage.setItem("profileImage", values.profileImage);
			sessionStorage.setItem("rssbNo", values.rssbNo);
			sessionStorage.setItem("idNumber", values.idNumber);
			sessionStorage.setItem("address", values.address);
			sessionStorage.setItem("password", values.password);
			sessionStorage.setItem("confirmPassword", values.confirmPassword);

			// // handleTabClick("organization");
			// console.log("====>   ", isRenderingRef.current);
			// if (!isRenderingRef.current) {
			// 	handleTabClick("organization");
			// }
			// console.log("===> ", isSubmitting);
			setSubmitting(false);
			setTimeout(() => {
				handleTabClick("organization");
			}, 0);
		};

	return (
		<Formik
			initialValues={personalInfoIV}
			validationSchema={personalInfoValidation}
			onSubmit={savePersonalForm}
		>
			{({ errors, touched, isValid }) => (
				<Form>
					<div className="p-4">
						{/*
						 * First name input field
						 */}

						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="firstName"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								First Name:
							</label>
							<div
								className={
									touched.firstName && errors.firstName
										? "has-error w-9/12"
										: touched.firstName
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-5 max-md:flex-wrap">
									<Field
										name="firstName"
										type="text"
										id="firstName"
										placeholder="Enter your first name"
										className="flex-1 max-md:max-w-full form-input"
									/>
								</div>
								<ErrorMessage
									name="firstName"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>

						{/*
						 * Middle name input field
						 */}
						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="middleName"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								Middle Name:
							</label>
							<div
								className={
									touched.middleName && errors.middleName
										? "has-error w-9/12"
										: touched.middleName
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-5 max-md:flex-wrap">
									<Field
										name="middleName"
										type="text"
										id="middleName"
										placeholder="Enter your middle name"
										className="flex-1 max-md:max-w-full form-input"
									/>
								</div>
								<ErrorMessage
									name="middleName"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>

						{/*
						 * Last name input field
						 */}
						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="lastName"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								Last Name:
							</label>
							<div
								className={
									touched.lastName && errors.lastName
										? "has-error w-9/12"
										: touched.lastName
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-5 max-md:flex-wrap">
									<Field
										name="lastName"
										type="text"
										id="lastName"
										placeholder="Enter your last name"
										className="flex-1 max-md:max-w-full form-input"
									/>
								</div>
								<ErrorMessage
									name="lastName"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>

						{/*
						 * Email input field
						 */}
						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								Email:
							</label>
							<div
								className={
									touched.email && errors.email
										? "has-error w-9/12"
										: touched.email
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-2 px-px max-md:flex-wrap">
									<div className="flex flex-1 gap-2 max-md:flex-wrap">
										<Field
											name="email"
											type="email"
											id="email"
											placeholder="Enter your email"
											className="flex-1 max-md:max-w-full form-input"
										/>
									</div>
								</div>
								<ErrorMessage
									name="email"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>

						{/*
						 * Phone Number input field
						 */}
						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="phoneNumber"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								Phone Number:
							</label>
							<div
								className={
									touched.phoneNumber && errors.phoneNumber
										? "has-error w-9/12"
										: touched.phoneNumber
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-2 px-px max-md:flex-wrap">
									<div className="flex flex-1 gap-2 max-md:flex-wrap">
										<Field
											name="phoneNumber"
											type="phoneNumber"
											id="phoneNumber"
											placeholder="Enter your phone number"
											className="flex-1 max-md:max-w-full form-input"
										/>
									</div>
								</div>
								<ErrorMessage
									name="phoneNumber"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>

						{/*
						 * Gender select field
						 */}
						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="gender"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								Gender:
							</label>
							<div
								className={
									touched.gender && errors.gender
										? "has-error w-9/12"
										: touched.gender
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-2 px-px max-md:flex-wrap">
									<div className="flex flex-1 gap-2 max-md:flex-wrap">
										<Field
											name="gender"
											id="gender"
											label="Select your gender"
											component="select"
											className="flex-1 max-md:max-w-full form-input"
										>
											<option value="">Select your gender</option>
											<option value="Male">Male</option>
											<option value="Female">Female</option>
										</Field>
									</div>
								</div>
								<ErrorMessage
									name="gender"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>

						{/*
						 * Date select field
						 */}
						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="dob"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								Date of Birth:
							</label>
							<div
								className={
									touched.dob && errors.dob
										? "has-error w-9/12"
										: touched.dob
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-2 px-px max-md:flex-wrap">
									<div className="flex flex-1 gap-2 max-md:flex-wrap">
										<Field
											type="date"
											name="dob"
											placeholder="Choose your date of birth"
											className="flex-1 max-md:max-w-full form-input"
										/>
									</div>
								</div>
								<ErrorMessage
									name="dob"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>

						{/*
						 * Nationality select field
						 */}
						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="nationality"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								Nationality:
							</label>
							<div
								className={
									touched.nationality && errors.nationality
										? "has-error w-9/12"
										: touched.nationality
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-2 px-px max-md:flex-wrap">
									<div className="flex flex-1 gap-2 max-md:flex-wrap">
										<Field
											name="nationality"
											id="nationality"
											label="Select your nationality"
											component="select"
											className="flex-1 max-md:max-w-full form-input"
										>
											<option value="">Select your nationality</option>
											<option value="Rwanda">Rwanda</option>
											{/* <option value="Burundi">Burundi</option>
										<option value="USA">USA</option>
										<option value="Uganda">Uganda</option>
										<option value="Tanzania">Tanzania</option>
										<option value="DRC">DRC</option> */}
										</Field>
									</div>
								</div>
								<ErrorMessage
									name="nationality"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>
						{/*
						 * RSSB Number input field
						 */}
						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="rssbNo"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								RSSB No:
							</label>
							<div
								className={
									touched.rssbNo && errors.rssbNo
										? "has-error w-9/12"
										: touched.rssbNo
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-2 px-px max-md:flex-wrap">
									<div className="flex flex-1 gap-2 max-md:flex-wrap">
										<Field
											name="rssbNo"
											type="text"
											id="rssbNo"
											placeholder="Enter your RSSB number"
											className="flex-1 max-md:max-w-full form-input"
										/>
									</div>
								</div>
								<ErrorMessage
									name="rssbNo"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>

						{/*
						 * ID Number input field
						 */}
						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="idNumber"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								ID Number:
							</label>
							<div
								className={
									touched.idNumber && errors.idNumber
										? "has-error w-9/12"
										: touched.idNumber
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-2 px-px max-md:flex-wrap">
									<div className="flex flex-1 gap-2 max-md:flex-wrap">
										<Field
											name="idNumber"
											type="text"
											id="idNumber"
											placeholder="Enter your ID number"
											className="flex-1 max-md:max-w-full form-input"
										/>
									</div>
								</div>
								<ErrorMessage
									name="idNumber"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>

						{/*
						 * Address input field
						 */}
						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="address"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								Address:
							</label>
							<div
								className={
									touched.address && errors.address
										? "has-error w-9/12"
										: touched.address
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-2 px-px max-md:flex-wrap">
									<div className="flex flex-1 gap-2 max-md:flex-wrap">
										<Field
											name="address"
											type="text"
											id="address"
											placeholder="Enter your address"
											className="flex-1 max-md:max-w-full form-input"
										/>
									</div>
								</div>
								<ErrorMessage
									name="address"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>

						{/*
						 * Password input field
						 */}
						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								Password:
							</label>
							<div
								className={
									touched.password && errors.password
										? "has-error w-9/12"
										: touched.password
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-2 px-px max-md:flex-wrap">
									<div className="flex flex-1 gap-2 max-md:flex-wrap">
										<Field
											name="password"
											type="password"
											id="password"
											placeholder="Enter your password"
											className="flex-1 max-md:max-w-full form-input"
										/>
									</div>
								</div>
								<ErrorMessage
									name="password"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>

						{/*
						 * Confirm Password input field
						 */}
						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								Confirm Password:
							</label>
							<div
								className={
									touched.confirmPassword && errors.confirmPassword
										? "has-error w-9/12"
										: touched.confirmPassword
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-2 px-px max-md:flex-wrap">
									<div className="flex flex-1 gap-2 max-md:flex-wrap">
										<Field
											name="confirmPassword"
											type="password"
											id="confirmPassword"
											placeholder="Confirm your password"
											className="flex-1 max-md:max-w-full form-input"
										/>
									</div>
								</div>
								<ErrorMessage
									name="confirmPassword"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>
					</div>
					<div className=" flex flex-row justify-end pr-4 gap-2">
						{!isValid && (
							<div className="text-danger mt-1 flex flex-row gap-2">
								{/* <IconArchive /> */}
								Please fill out all required fields correctly.
							</div>
						)}
						<button
							type="submit"
							className=" btn btn-primary px-4 py-1"
							disabled={!isValid}
						>
							Next
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export const OrganizationInfoForm: React.FC<ISignupProps> = ({
	handleTabClick,
	// setSignupData = () => {},
}) => {
	const handleSubmit1 = (errors: any) => {
		console.log("===> ", errors);
	};

	const saveOrganizationInfo = (values: any, { setSubmitting }: any) => {
		sessionStorage.setItem("organizationName", values.name);
		sessionStorage.setItem("organizationDisplayName", values.displayName);
		sessionStorage.setItem("organizationLogoUrl", values.logoUrl);
		sessionStorage.setItem("organizationAboutUs", values.aboutUs);
		sessionStorage.setItem("organizationMission", values.mission);
		sessionStorage.setItem("organizationVision", values.vision);
		sessionStorage.setItem("organizationIndustry", values.industry);
		sessionStorage.setItem("organizationAddress", values.address);
		sessionStorage.setItem("organizationPhoneNumber", values.phoneNumber);
		sessionStorage.setItem("organizationEmail", values.email);
		sessionStorage.setItem("organizationWebsite", values.website);
		sessionStorage.setItem("organizationTinNo", values.tinNo);
		setSubmitting(false);
		setTimeout(() => {
			handleTabClick("workInfo");
		}, 0);
	};
	const isRenderingRef = useRef(false);

	useEffect(() => {
		isRenderingRef.current = false; // Reset after rendering
	});
	const handlePrev = () => {
		if (!isRenderingRef.current) {
			handleTabClick("personal");
		}

		// handleTabClick("personal")
	};
	const [values, setValues] = useState({});

	useEffect(() => {
		console.log(values);
	}, [values]);

	return (
		<Formik
			innerRef={(formikActions) =>
				formikActions ? setValues(formikActions.values) : setValues({})
			}
			initialValues={organizationInfoIV}
			validationSchema={organizationInfoValidation}
			onSubmit={saveOrganizationInfo}
		>
			{({ errors, touched, isValid }) => (
				<Form>
					<div className="p-4">
						{/*
						 * Name input field
						 */}

						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								Name:
							</label>
							<div
								className={
									touched.name && errors.name
										? "has-error w-9/12"
										: touched.name
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-5 max-md:flex-wrap">
									<Field
										name="name"
										type="text"
										id="name"
										placeholder="Enter organization name"
										className="flex-1 max-md:max-w-full form-input"
										// value={values.name}
										// onChange={(e: any) => setCompanyName(e.target.value)}
									/>
								</div>
								<ErrorMessage
									name="name"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>

						{/*
						 * Display name input field
						 */}
						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="displayName"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								Display Name:
							</label>
							<div
								className={
									touched.displayName && errors.displayName
										? "has-error w-9/12"
										: touched.displayName
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-5 max-md:flex-wrap">
									<Field
										name="displayName"
										type="text"
										id="displayName"
										placeholder="Enter organization display name"
										className="flex-1 max-md:max-w-full form-input"
									/>
								</div>
								<ErrorMessage
									name="displayName"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>

						{/*
						 * Logo URL input field
						 */}
						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="logoUrl"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								Logo URL:
							</label>
							<div
								className={
									touched.logoUrl && errors.logoUrl
										? "has-error w-9/12"
										: touched.logoUrl
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-5 max-md:flex-wrap">
									<Field
										name="logoUrl"
										type="text"
										id="logoUrl"
										placeholder="Enter organization logo url"
										className="flex-1 max-md:max-w-full form-input"
									/>
								</div>
								<ErrorMessage
									name="logoUrl"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>

						{/*
						 * About Us input field
						 */}
						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="aboutUs"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								About Us:
							</label>
							<div
								className={
									touched.aboutUs && errors.aboutUs
										? "has-error w-9/12"
										: touched.aboutUs
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-2 px-px max-md:flex-wrap">
									<div className="flex flex-1 gap-2 max-md:flex-wrap">
										<Field
											name="aboutUs"
											type="text"
											id="aboutUs"
											placeholder="Enter organization about us"
											className="flex-1 max-md:max-w-full form-input"
										/>
									</div>
								</div>
								<ErrorMessage
									name="aboutUs"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>

						{/*
						 * Mission input field
						 */}
						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="mission"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								Mission:
							</label>
							<div
								className={
									touched.mission && errors.mission
										? "has-error w-9/12"
										: touched.mission
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-2 px-px max-md:flex-wrap">
									<div className="flex flex-1 gap-2 max-md:flex-wrap">
										<Field
											name="mission"
											type="text"
											id="mission"
											placeholder="Enter organization mission"
											className="flex-1 max-md:max-w-full form-input"
										/>
									</div>
								</div>
								<ErrorMessage
									name="mission"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>

						{/*
						 * VisionMission input field
						 */}
						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="vision"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								Vision:
							</label>
							<div
								className={
									touched.vision && errors.vision
										? "has-error w-9/12"
										: touched.vision
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-2 px-px max-md:flex-wrap">
									<div className="flex flex-1 gap-2 max-md:flex-wrap">
										<Field
											name="vision"
											type="text"
											id="vision"
											placeholder="Enter organization vision"
											className="flex-1 max-md:max-w-full form-input"
										/>
									</div>
								</div>
								<ErrorMessage
									name="vision"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>

						{/*
						 * Industry select field
						 */}
						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="industry"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								Industry:
							</label>
							<div
								className={
									touched.industry && errors.industry
										? "has-error w-9/12"
										: touched.industry
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-2 px-px max-md:flex-wrap">
									<div className="flex flex-1 gap-2 max-md:flex-wrap">
										<Field
											name="industry"
											id="industry"
											label="Select your organization industry"
											component="select"
											className="flex-1 max-md:max-w-full form-input"
										>
											<option value="male">
												Select your organization industry
											</option>
											<option value="Health">Health</option>
											<option value="Education">Education</option>
											<option value="Transportation">Transportation</option>
											<option value="Energy">Energy</option>
											<option value="Water and Sanitation">
												Water and Sanitation
											</option>
											<option value="Finance and Banking">
												Finance and Banking
											</option>
											<option value="Telecommunications">
												Telecommunications
											</option>
											<option value="Agriculture">Agriculture</option>
											<option value="Tourism">Tourism</option>
											<option value="Public Administration">
												Public Administration
											</option>
										</Field>
									</div>
								</div>
								<ErrorMessage
									name="industry"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>

						{/*
						 * Address input field
						 */}
						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="address"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								Address:
							</label>
							<div
								className={
									touched.address && errors.address
										? "has-error w-9/12"
										: touched.address
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-2 px-px max-md:flex-wrap">
									<div className="flex flex-1 gap-2 max-md:flex-wrap">
										<Field
											name="address"
											type="text"
											id="address"
											placeholder="Enter organization address"
											className="flex-1 max-md:max-w-full form-input"
										/>
									</div>
								</div>
								<ErrorMessage
									name="address"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>

						{/*
						 * RSSB Number input field
						 */}
						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="phoneNumber"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								Phone No:
							</label>
							<div
								className={
									touched.phoneNumber && errors.phoneNumber
										? "has-error w-9/12"
										: touched.phoneNumber
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-2 px-px max-md:flex-wrap">
									<div className="flex flex-1 gap-2 max-md:flex-wrap">
										<Field
											name="phoneNumber"
											type="text"
											id="phoneNumber"
											placeholder="Enter organization phone number"
											className="flex-1 max-md:max-w-full form-input"
										/>
									</div>
								</div>
								<ErrorMessage
									name="phoneNumber"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>

						{/*
						 * email input field
						 */}
						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								Email:
							</label>
							<div
								className={
									touched.email && errors.email
										? "has-error w-9/12"
										: touched.email
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-2 px-px max-md:flex-wrap">
									<div className="flex flex-1 gap-2 max-md:flex-wrap">
										<Field
											name="email"
											type="text"
											id="email"
											placeholder="Enter organization email address"
											className="flex-1 max-md:max-w-full form-input"
										/>
									</div>
								</div>
								<ErrorMessage
									name="email"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>

						{/*
						 * Website input field
						 */}
						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="website"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								Website:
							</label>
							<div
								className={
									touched.website && errors.website
										? "has-error w-9/12"
										: touched.website
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-2 px-px max-md:flex-wrap">
									<div className="flex flex-1 gap-2 max-md:flex-wrap">
										<Field
											name="website"
											type="text"
											id="website"
											placeholder="Enter organization website"
											className="flex-1 max-md:max-w-full form-input"
										/>
									</div>
								</div>
								<ErrorMessage
									name="website"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>

						{/*
						 * TIN No input field
						 */}
						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="tinNo"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								Tin No:
							</label>
							<div
								className={
									touched.tinNo && errors.tinNo
										? "has-error w-9/12"
										: touched.tinNo
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-2 px-px max-md:flex-wrap">
									<div className="flex flex-1 gap-2 max-md:flex-wrap">
										<Field
											name="tinNo"
											type="text"
											id="tinNo"
											placeholder="Enter organization tin number"
											className="flex-1 max-md:max-w-full form-input"
										/>
									</div>
								</div>
								<ErrorMessage
									name="tinNo"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>
					</div>
					<div className=" flex flex-row justify-end pr-4 gap-2">
						<button
							onClick={handlePrev}
							className="btn btn-primary bg-cdms_secondary"
						>
							Prev
						</button>

						{!isValid && (
							<div className="text-danger mt-1 flex flex-row gap-2">
								Please fill out all required fields correctly.
							</div>
						)}
						<button
							type="submit"
							className=" btn btn-primary px-4 py-1"
							disabled={!isValid}
						>
							Next
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export const WorkInfoForm: React.FC<ISignupProps> = ({
	handleTabClick,
	setSignupData = () => {},
}) => {
	const isRenderingRef = useRef(false);

	useEffect(() => {
		isRenderingRef.current = false; // Reset after rendering
	});
	const handlePrev = () => {
		if (!isRenderingRef.current) {
			handleTabClick("organization");
		}
		// handleTabClick("personal")
	};
	const saveUserWorkInfo = (values: any, { setSubmitting }: any) => {
		sessionStorage.setItem("department", values.department);
		sessionStorage.setItem("position", values.position);
		setSubmitting(false);
		setTimeout(() => {
			setSignupData(true);
		}, 0);
	};
	return (
		<Formik
			initialValues={workInfoIV}
			validationSchema={workInfoValidations}
			onSubmit={saveUserWorkInfo}
		>
			{({ isValid, touched, errors }) => (
				<Form>
					<div className="p-4">
						{/*
						 * Department input field
						 */}
						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="department"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								Department:
							</label>
							<div
								className={
									touched.department && errors.department
										? "has-error w-9/12"
										: touched.department
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-2 px-px max-md:flex-wrap">
									<div className="flex flex-1 gap-2 max-md:flex-wrap">
										<Field
											name="department"
											type="text"
											id="email"
											placeholder="Enter your department"
											className="flex-1 max-md:max-w-full form-input"
										/>
									</div>
								</div>
								<ErrorMessage
									name="department"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>
						{/*
						 * Position input field
						 */}
						<div className="py-2 flex flex-row gap-2">
							<label
								htmlFor="department"
								className="block text-sm font-medium text-gray-700 w-3/12"
							>
								Position:
							</label>
							<div
								className={
									touched.position && errors.position
										? "has-error w-9/12"
										: touched.position
										? "has-success w-9/12"
										: "w-9/12"
								}
							>
								<div className="flex gap-2 px-px max-md:flex-wrap">
									<div className="flex flex-1 gap-2 max-md:flex-wrap">
										<Field
											name="position"
											type="text"
											id="position"
											placeholder="Enter your position"
											className="flex-1 max-md:max-w-full form-input"
										/>
									</div>
								</div>
								<ErrorMessage
									name="position"
									component="div"
									className="text-danger mt-1"
								/>
							</div>
						</div>
						<div className=" flex flex-row justify-end pt-4 pr-4 gap-2">
							<button
								onClick={handlePrev}
								className="btn btn-primary bg-cdms_secondary"
							>
								Prev
							</button>

							{!isValid && (
								<div className="text-danger mt-1 flex flex-row gap-2">
									Please fill out all required fields correctly.
								</div>
							)}
							<button
								type="submit"
								className=" btn btn-primary px-4 py-1"
								disabled={!isValid}
							>
								Sign up
							</button>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};
