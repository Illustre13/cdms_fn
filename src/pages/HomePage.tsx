import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../store";
import { setPageTitle } from "../store/themeConfigSlice";
import Navbar from "../components/HomePage/Navbar";
import Typewriter from "typewriter-effect";
import HorizontalScrollCards from "../components/HomePage/ScrollingBrands";
import FeaturesSection from "../components/HomePage/Featuresection";
import ContactUs from "../components/HomePage/ContactUs";
import Footer from "../components/HomePage/Footer";

const HomePage = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setPageTitle("Dashboard"));
	});
	const isDark = useSelector(
		(state: IRootState) =>
			state.themeConfig.theme === "dark" || state.themeConfig.isDarkMode
	);
	const isRtl =
		useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl"
			? true
			: false;

	const [loading] = useState(false);

	return (
		<div>
			<Navbar />
			{/* <ul className="flex space-x-2 rtl:space-x-reverse">
				<li>
					<Link to="/" className="text-cdms_primary hover:underline">
						HomePage
					</Link>
				</li>
				<li>
					<Link to="/dashboard" className="text-cdms_primary hover:underline">
						Dashboard
					</Link>
				</li>
			</ul> */}

			{/**
			 *
			 *
			 */}

			<div>
				<section className=" flex flex-row bg-cdms_primary text-white p-12 text-center justify-between">
					<div className="basis-1/2">
						<h1 className="text-6xl font-bold mb-4">
							Streamline Capacity Building Development in Rwanda
						</h1>
						<p className="text-2xl m-16">
							Are you an institution or an individual working in a public
							institution in Rwanda and want to
							<Typewriter
								onInit={(typewriter) => {
									typewriter
										.typeString("Elevate your capacity building?")
										.pauseFor(1000)
										.deleteAll()
										.typeString("Empower your employees?")
										.pauseFor(1000)
										.deleteAll()
										.typeString("Excel at your workplace?")
										.start();
								}}
							/>
						</p>

						<div className="flex flex-row justify-center space-x-4">
							<Link
								to="/signup"
								className="main-logo flex items-center shrink-0"
							>
								<button
									className="bg-white text-blue-600 border border-white py-2 px-4 rounded w-36"
									type="button"
								>
									{/* <IconMenuMore className="ltr:mr-2 rtl:ml-2 shrink-0" /> */}
									Get Started
								</button>
							</Link>

							<Link to="/" className="main-logo flex items-center shrink-0">
								<button
									className="bg-transparent border border-white py-2 px-4 rounded w-36"
									type="button"
								>
									{/* <IconMenuMore className="ltr:mr-2 rtl:ml-2 shrink-0" /> */}
									Learn More
								</button>
							</Link>
						</div>
					</div>
					<div className="basis-1/2">
						<img
							className="w-72 ltr:-ml-1 rtl:-mr-1 inline rounded-3xl"
							src="/assets/images/ss_003.PNG"
							alt="logo"
						/>
					</div>
				</section>

				<section className="p-4 text-center">
					<h2 className="text-2xl font-bold mb-2">Organization Partners</h2>
					<div className="flex justify-center space-x-8">
						<HorizontalScrollCards />
					</div>
				</section>

				<section className="p-12">
					<FeaturesSection />
				</section>

				<section className="m-4 p-12 text-center bg-cdms_secondary flex flex-row justify-between rounded-br-full rounded-tl-full shadow-md text-white">
					<div className="basis-2/3 p-16 justify-end">
						<p className="text-2xl rounded-lg">
							Implementing a CDMS in Rwanda enhances efficiency through
							automated workflows, ensures data security and regulatory
							compliance, and fosters seamless collaboration across departments.
							It centralizes information to promote transparency and citizen
							engagement, while also supporting environmental sustainability by
							reducing paper usage and promoting eco-friendly practices.
						</p>
						<Link to="/signup">
							<button className="bg-gradient-to-r from-cdms_primary to-cdms_secondary w-24 h-8 py-2 px-4 mt-4 rounded">
								Join Now
							</button>
						</Link>
					</div>

					<img
						src="assets/images/features/join-now.png"
						alt=""
						className="basis-1/3 w-40 h-64 pr-16 scale-x-[-1]"
					/>
				</section>

				<ContactUs />

				<Footer />
			</div>
		</div>
	);
};

export default HomePage;
