import { useEffect } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import {
	loginInitialValues,
	loginValidation,
} from "../../components/Authentication/SignIn.schema";
import { Link } from "react-router-dom";
import { handleLogin } from "../../redux/action/loginAction";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { getOtp } from "../../redux/action/2FAAction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StateOptions } from "../../util/enum";

const CDMSLogin = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const loginState = useSelector((state: IRootState) => state.login);
	const getOtpState = useSelector((state: IRootState) => state.getOtp);
	
	useEffect(() => {
		if (loginState.state === StateOptions.FULFILLED) {
			toast.success(loginState.message, {
				type: "success",
				isLoading: false,
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
			dispatch(getOtp()).then(({ payload }) => {
				const { status } = payload;
				if (status === 200) {
					navigate("/tfa");
				}
			});
		};
		if (loginState.state === StateOptions.REJECTED) {
			toast.error(loginState.message || loginState.data, {
			  type: "error",
			  isLoading: false,
			  autoClose: 5000,
			  hideProgressBar: false,
			  closeOnClick: true,
			  pauseOnHover: true,
			  draggable: true,
			  progress: undefined,
			  theme: "colored",
			});
		}
	}, [loginState]);

	const submitForm = (values: any) => {
		console.log("Submitting form with values:", values);
		const userCredentials = {
			email: values?.email,
			password: values?.password,
		};
		dispatch(handleLogin(userCredentials));
	};

	return (
		<div className="px-16 py-8 bg-white max-md:px-5">
			<div className="flex gap-5 max-md:flex-col max-md:gap-0">
				<div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
					<div className="flex flex-col mt-28 max-md:mt-10 max-md:max-w-full">
						<div className="self-center text-4xl font-bold tracking-tighter text-center text-gray-900 leading-[90px]">
							Sign In
						</div>
						{/* <div className="self-center mt-6 text-base leading-8 text-center text-black">
							Elevate. Empower. Excel.
						</div> */}
						{/* <div className="flex gap-2 mt-12 text-base font-semibold leading-6 text-slate-800 max-md:flex-wrap max-md:mt-10">
							<div className="flex gap-2 justify-center px-5 py-3 bg-gray-50 rounded-lg border border-gray-300 border-solid shadow-sm">
								<img
									loading="lazy"
									srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/47fe2f905d8af6f17d792b214b353169f75d9714d2ffa28a6c1fc0fc482d076b?apiKey=91e50d8dc4334802820abcbb631f5a11&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/47fe2f905d8af6f17d792b214b353169f75d9714d2ffa28a6c1fc0fc482d076b?apiKey=91e50d8dc4334802820abcbb631f5a11&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/47fe2f905d8af6f17d792b214b353169f75d9714d2ffa28a6c1fc0fc482d076b?apiKey=91e50d8dc4334802820abcbb631f5a11&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/47fe2f905d8af6f17d792b214b353169f75d9714d2ffa28a6c1fc0fc482d076b?apiKey=91e50d8dc4334802820abcbb631f5a11&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/47fe2f905d8af6f17d792b214b353169f75d9714d2ffa28a6c1fc0fc482d076b?apiKey=91e50d8dc4334802820abcbb631f5a11&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/47fe2f905d8af6f17d792b214b353169f75d9714d2ffa28a6c1fc0fc482d076b?apiKey=91e50d8dc4334802820abcbb631f5a11&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/47fe2f905d8af6f17d792b214b353169f75d9714d2ffa28a6c1fc0fc482d076b?apiKey=91e50d8dc4334802820abcbb631f5a11&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/47fe2f905d8af6f17d792b214b353169f75d9714d2ffa28a6c1fc0fc482d076b?apiKey=91e50d8dc4334802820abcbb631f5a11&"
									className="shrink-0 w-7 aspect-square"
								/>
								<div className="my-auto">Sign In with Google</div>
							</div>
							<div className="flex gap-2 justify-center px-5 py-3 bg-gray-50 rounded-lg border border-gray-300 border-solid shadow-sm">
								<img
									loading="lazy"
									srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/4f57b92401e5139cd68a7f162c50a30dfd1a568da78af02e34ecf3e1a5641abd?apiKey=91e50d8dc4334802820abcbb631f5a11&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/4f57b92401e5139cd68a7f162c50a30dfd1a568da78af02e34ecf3e1a5641abd?apiKey=91e50d8dc4334802820abcbb631f5a11&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4f57b92401e5139cd68a7f162c50a30dfd1a568da78af02e34ecf3e1a5641abd?apiKey=91e50d8dc4334802820abcbb631f5a11&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/4f57b92401e5139cd68a7f162c50a30dfd1a568da78af02e34ecf3e1a5641abd?apiKey=91e50d8dc4334802820abcbb631f5a11&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/4f57b92401e5139cd68a7f162c50a30dfd1a568da78af02e34ecf3e1a5641abd?apiKey=91e50d8dc4334802820abcbb631f5a11&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4f57b92401e5139cd68a7f162c50a30dfd1a568da78af02e34ecf3e1a5641abd?apiKey=91e50d8dc4334802820abcbb631f5a11&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/4f57b92401e5139cd68a7f162c50a30dfd1a568da78af02e34ecf3e1a5641abd?apiKey=91e50d8dc4334802820abcbb631f5a11&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/4f57b92401e5139cd68a7f162c50a30dfd1a568da78af02e34ecf3e1a5641abd?apiKey=91e50d8dc4334802820abcbb631f5a11&"
									className="shrink-0 w-7 aspect-[0.96]"
								/>
								<div className="my-auto">Sign In with Facebook</div>
							</div>
						</div> */}
						<div className="flex gap-5 items-center mt-4 text-sm leading-6 text-center text-gray-500 max-md:flex-wrap">
							{/* <img
								loading="lazy"
								src="https://cdn.builder.io/api/v1/image/assets/TEMP/ab8eaf7298e87ed64588abc8558da7460df50fa7df61ee262f3562128f0af8f0?apiKey=91e50d8dc4334802820abcbb631f5a11&"
								className="shrink-0 self-stretch my-auto w-48 max-w-full border border-solid aspect-[100] border-zinc-300 stroke-[1px] stroke-zinc-300"
							/>
							<div className="self-stretch">or with e-mail</div> */}
							{/* <img
								loading="lazy"
								src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b71eeb1b6bf88bf7513d92cd197ee44f93187b63f34e6bb3a6a41f9f4e8ac55?apiKey=91e50d8dc4334802820abcbb631f5a11&"
								className="shrink-0 self-stretch my-auto w-48 max-w-full border border-solid aspect-[100] border-zinc-300 stroke-[1px] stroke-zinc-300"
							/> */}
						</div>
						<div className="mb-5">
							<Formik
								initialValues={loginInitialValues}
								validationSchema={loginValidation}
								onSubmit={submitForm}
							>
								{({ errors, touched }) => (
									<Form className="space-y-5">
										<div className="p-4">
											{/*
											 * Email input field
											 */}
											<div className="py-4">
												<div
													className={
														touched.email && errors.email
															? "has-error"
															: touched.email
															? "has-success"
															: ""
													}
												>
													<div className="flex gap-5 max-md:flex-wrap">
														<Field
															name="email"
															type="email"
															id="email"
															placeholder="Enter Email"
															className="flex-1 max-md:max-w-full form-input"
														/>
													</div>
													<ErrorMessage
														name="email"
														component="div"
														className="text-danger mt-1"
													/>
												</div>
											</div>

											{/*
											 * Password input field
											 */}
											<div className="py-4">
												<div
													className={
														touched.password && errors.password
															? "has-error"
															: touched.password
															? "has-success"
															: ""
													}
												>
													<div className="flex gap-2 px-px max-md:flex-wrap">
														<div className="flex flex-1 gap-2 max-md:flex-wrap">
															<Field
																name="password"
																type="password"
																id="password"
																placeholder="Enter Password"
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

											<div className="flex gap-5 items-start mt-7 w-full max-md:flex-wrap max-md:max-w-full">
												<div className="flex flex-1 gap-3">
													<div className="flex flex-col justify-center p-1.5 my-auto border border-cdms_primary border-solid fill-purple-50 stroke-[1px] stroke-cdms_primary">
														<div className="shrink-0 w-2 h-2 bg-cdms_primary rounded-full" />
													</div>
													<div className="text-base font-medium leading-6 text-gray-900">
														Remember me
													</div>
												</div>
												<div className="flex-auto mt-3.5 text-lg leading-8 text-center text-cdms_primary">
													<Link to="/">Forgot Password? </Link>
												</div>
											</div>
											<button
												type="submit"
												className="w-full btn btn-primary !mt-6"
											>
												Sign in
											</button>
										</div>
									</Form>
								)}
							</Formik>
						</div>

						<div className="self-center text-base leading-8 text-gray-900">
							Don’t have a account?{" "}
							<span className="font-semibold">
								<Link to="/cdms-signup">Sign Up</Link>
							</span>
						</div>
						<div className="self-center mt-4 text-base leading-8 text-gray-900">
							Back to Homepage?{" "}
							<span className="font-bold">
								<a href="/">Here</a>
							</span>
						</div>
						<div className="self-center mt-16 text-sm leading-7 text-gray-500 max-md:mt-10">
							2024 © CDMS
						</div>
					</div>
				</div>
				<div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
					<div className="flex flex-col grow px-9 py-8 w-full bg-cdms_primary max-md:px-5 max-md:mt-10 max-md:max-w-full">
						<div className="flex z-10 gap-5 justify-between items-start mt-3 ml-14 max-w-full w-[291px] max-md:ml-2.5">
							<div className="shrink-0 self-end mt-12 border-solid border-[3px] border-white border-opacity-10 h-[84px] w-[94px] max-md:mt-10" />
							<img
								className="w-24 ltr:-ml-1 rtl:-mr-1 inline"
								src="/assets/images/cdms_logo_002.png"
								alt="logo"
							/>
						</div>
						<img
							loading="lazy"
							src="https://cdn.builder.io/api/v1/image/assets/TEMP/c703752e108fa537734b6c9664ba8009b44ee4c6a7dbf7ea861d9665326f2534?apiKey=91e50d8dc4334802820abcbb631f5a11&"
							className="self-end max-w-full aspect-[1.56] h-[240px] w-[480px]"
						/>
						<div className="self-center mt-12 text-2xl font-bold tracking-tight leading-8 text-center text-white max-md:mt-10">
							Capacity Development Management System
						</div>
						<div className="mt-6 text-base leading-8 text-center text-white max-md:max-w-full">
							Elevate. Empower. Excel.
							<br />
							Capacity development is essential for the growth and development
							of individuals, organizations, and the country.
						</div>
						<img
							loading="lazy"
							src="https://cdn.builder.io/api/v1/image/assets/TEMP/985c9b8a69165b816e62eaa7062f79aa28737e40511ad594521c1f0f3df4a9a5?apiKey=91e50d8dc4334802820abcbb631f5a11&"
							className="self-center mt-12 max-w-full aspect-[12.5] w-[104px] max-md:mt-10"
						/>
					</div>
				</div>
				<ToastContainer />
			</div>
		
		</div>
	);
};

export default CDMSLogin;
