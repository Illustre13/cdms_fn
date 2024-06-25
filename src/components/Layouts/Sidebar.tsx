import PerfectScrollbar from "react-perfect-scrollbar";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { toggleSidebar } from "../../store/themeConfigSlice";
import AnimateHeight from "react-animate-height";
import { IRootState } from "../../store";
import { useState, useEffect } from "react";
import IconCaretsDown from "../Icon/IconCaretsDown";
import IconCaretDown from "../Icon/IconCaretDown";
import IconMenuDashboard from "../Icon/Menu/IconMenuDashboard";
import IconMenuContacts from "../Icon/Menu/IconMenuContacts";
import IconMenuInvoice from "../Icon/Menu/IconMenuInvoice";
import IconMenuCalendar from "../Icon/Menu/IconMenuCalendar";
import IconMessagesDot from "../Icon/IconMessagesDot";

const Sidebar = () => {
	const [currentMenu, setCurrentMenu] = useState<string>("");
	const [errorSubMenu, setErrorSubMenu] = useState(false);
	const themeConfig = useSelector((state: IRootState) => state.themeConfig);
	const semidark = useSelector(
		(state: IRootState) => state.themeConfig.semidark
	);
	const location = useLocation();
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const toggleMenu = (value: string) => {
		setCurrentMenu((oldValue) => {
			return oldValue === value ? "" : value;
		});
	};

	useEffect(() => {
		const selector = document.querySelector(
			'.sidebar ul a[href="' + window.location.pathname + '"]'
		);
		if (selector) {
			selector.classList.add("active");
			const ul: any = selector.closest("ul.sub-menu");
			if (ul) {
				let ele: any =
					ul.closest("li.menu").querySelectorAll(".nav-link") || [];
				if (ele.length) {
					ele = ele[0];
					setTimeout(() => {
						ele.click();
					});
				}
			}
		}
	}, []);

	useEffect(() => {
		if (window.innerWidth < 1024 && themeConfig.sidebar) {
			dispatch(toggleSidebar());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	return (
		<div className={semidark ? "dark" : ""}>
			<nav
				className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${
					semidark ? "text-white-dark" : ""
				}`}
			>
				<div className="bg-white dark:bg-black h-full">
					<div className="flex justify-between items-center px-4 py-3">
						<NavLink to="/" className="main-logo flex items-center shrink-0">
							<img
								className="w-16 ltr:-ml-1 rtl:-mr-1 inline"
								src="/assets/images/cdms_logo_002.png"
								alt="logo"
							/>
						</NavLink>

						<button
							type="button"
							className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
							onClick={() => dispatch(toggleSidebar())}
						>
							<IconCaretsDown className="m-auto rotate-90" />
						</button>
					</div>
					<PerfectScrollbar className="h-[calc(100vh-80px)] relative">
						<ul className="relative font-semibold space-y-0.5 p-4 py-0">
							<li className="nav-item">
								<NavLink to="/homepage" className="group">
									<div className="flex items-center">
										<IconMenuCalendar className="group-hover:!text-cdms_primary shrink-0" />
										<span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
											{t("Homepage")}
										</span>
									</div>
								</NavLink>
							</li>
							<li className="menu nav-item">
								<NavLink to="/dashboard" className="group">
									<div className="flex items-center">
										<IconMenuDashboard className="group-hover:!text-cdms_primary shrink-0" />
										<span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
											{t("dashboard")}
										</span>
									</div>
								</NavLink>
							</li>
							<li className="menu nav-item">
								<button
									type="button"
									className={`${
										currentMenu === "organization" ? "active" : ""
									} nav-link group w-full`}
									onClick={() => toggleMenu("organization")}
								>
									<div className="flex items-center">
										<IconMenuInvoice className="group-hover:!text-cdms_primary shrink-0" />
										<span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
											{t("Organization")}
										</span>
									</div>

									<div
										className={
											currentMenu !== "organization"
												? "rtl:rotate-90 -rotate-90"
												: ""
										}
									>
										<IconCaretDown />
									</div>
								</button>

								<AnimateHeight
									duration={300}
									height={currentMenu === "organization" ? "auto" : 0}
								>
									<ul className="sub-menu text-gray-500">
										<li>
											<NavLink to="/organization/all">{t("All")}</NavLink>
										</li>
										<li>
											<NavLink to="/my-organization">
												{t("My Organization")}
											</NavLink>
										</li>
									</ul>
								</AnimateHeight>
							</li>
							{/* <li className="nav-item">
								<NavLink to="/organization" className="group">
									<div className="flex items-center">
										<IconMenuContacts className="group-hover:!text-cdms_primary shrink-0" />
										<span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
											{t("Organization")}
										</span>
									</div>
								</NavLink>
							</li> */}

							<li className="nav-item">
								<NavLink to="/employees" className="group">
									<div className="flex items-center">
										<IconMenuContacts className="group-hover:!text-cdms_primary shrink-0" />
										<span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
											{t("Employees")}
										</span>
									</div>
								</NavLink>
							</li>

							{/* <li className="nav-item">
								<NavLink to="/assessment" className="group">
									<div className="flex items-center">
										<IconMenuChat className="group-hover:!text-cdms_primary shrink-0" />
										<span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
											{t("Assememtents")}
										</span>
									</div>
								</NavLink>
							</li> */}

							<li className="menu nav-item">
								<button
									type="button"
									className={`${
										currentMenu === "cna" ? "active" : ""
									} nav-link group w-full`}
									onClick={() => toggleMenu("cna")}
								>
									<div className="flex items-center">
										<IconMessagesDot className="group-hover:!text-cdms_primary shrink-0" />
										<span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
											{t("CNA")}
										</span>
									</div>

									<div
										className={
											currentMenu !== "cna" ? "rtl:rotate-90 -rotate-90" : ""
										}
									>
										<IconCaretDown />
									</div>
								</button>

								<AnimateHeight
									duration={300}
									height={currentMenu === "cna" ? "auto" : 0}
								>
									<ul className="sub-menu text-gray-500">
										<li>
											<NavLink to="/cna/overview">{t("Overview")}</NavLink>
										</li>
										<li>
											<NavLink to="/cna/assessment">{t("Assessment")}</NavLink>
										</li>
										<li>
											<NavLink to="/cna/template">{t("Templates")}</NavLink>
										</li>
									</ul>
								</AnimateHeight>
							</li>
						</ul>
					</PerfectScrollbar>
				</div>
			</nav>
		</div>
	);
};

export default Sidebar;
