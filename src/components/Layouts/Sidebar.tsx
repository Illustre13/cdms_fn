import PerfectScrollbar from "react-perfect-scrollbar";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toggleSidebar } from "../../redux/reducer/themeConfigSlice";
import AnimateHeight from "react-animate-height";
import { IRootState } from "../../redux/store";
import { useState, useEffect } from "react";
import IconCaretsDown from "../Icon/IconCaretsDown";
import IconCaretDown from "../Icon/IconCaretDown";
import IconMenuDashboard from "../Icon/Menu/IconMenuDashboard";
import IconMenuContacts from "../Icon/Menu/IconMenuContacts";
import IconMenuInvoice from "../Icon/Menu/IconMenuInvoice";
import IconMenuCalendar from "../Icon/Menu/IconMenuCalendar";
import IconMessagesDot from "../Icon/IconMessagesDot";
import IconLogout from "../Icon/IconLogout";
import IconUser from "../Icon/IconUser";
import IconBook from "../Icon/IconBook";
import { getVisibleTabs } from "../../util/helper";
import IconTrendingUp from "../Icon/IconTrendingUp";
import IconCashBanknotes from "../Icon/IconCashBanknotes";

const Sidebar = () => {
  const navigate = useNavigate();
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

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/cdms-signin");
  };

  const userData = useSelector((state: any) => state.user.fetchUserInfoState);
  const role = userData?.data?.data?.employee?.role;
  const visibleTabs = getVisibleTabs(role?.name);

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
          <PerfectScrollbar className="h-[calc(100vh-80px)] relative flex justify-between flex-col">
            <ul className="relative font-semibold space-y-0.5 p-4 py-0">
              {visibleTabs.homepage && (
                <li className="nav-item" aria-disabled="true">
                  <NavLink to="/" className="group">
                    <div className="flex items-center">
                      <IconMenuCalendar className="group-hover:!text-cdms_primary shrink-0" />
                      <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                        {t("homepage")}
                      </span>
                    </div>
                  </NavLink>
                </li>
              )}

              {visibleTabs.dashboard && (
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
              )}

              {/* Organization Side bar */}
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
                    {visibleTabs.myOrganization && (
                      <li>
                        <NavLink to="/my-organization">
                          {t("My Organization")}
                        </NavLink>
                      </li>
                    )}
                    {visibleTabs.allOrganization && (
                      <li>
                        <NavLink to="/organization/all">
                          {t("All Organization")}
                        </NavLink>
                      </li>
                    )}
                  </ul>
                </AnimateHeight>
              </li>

              {/* User */}
              <li className="menu nav-item">
                <button
                  type="button"
                  className={`${
                    currentMenu === "user" ? "active" : ""
                  } nav-link group w-full`}
                  onClick={() => toggleMenu("user")}
                >
                  <div className="flex items-center">
                    <IconUser className="group-hover:!text-cdms_primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                      {t("User")}
                    </span>
                  </div>

                  <div
                    className={
                      currentMenu !== "user" ? "rtl:rotate-90 -rotate-90" : ""
                    }
                  >
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight
                  duration={300}
                  height={currentMenu === "user" ? "auto" : 0}
                >
                  <ul className="sub-menu text-gray-500">
                    {visibleTabs.myProfile && (
                      <li>
                        <NavLink to="/user/profile">{t("My Profile")}</NavLink>
                      </li>
                    )}
                    {visibleTabs.userManagement && (
                      <li>
                        <NavLink to="/user/management">
                          {t("User Management")}
                        </NavLink>
                      </li>
                    )}
                  </ul>
                </AnimateHeight>
              </li>

              {/* Employees */}
              {visibleTabs.employees && (
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
              )}

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

              {/* Capacity Plan */}
              {visibleTabs.cp && (
                <li className="nav-item">
                  <NavLink to="/cp/overview" className="group">
                    <div className="flex items-center">
                      <IconCashBanknotes className="group-hover:!text-cdms_primary shrink-0" />
                      <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                        {t("Capacity Plan")}
                      </span>
                    </div>
                  </NavLink>
                </li>
              )}

              {/* Trainings */}
              {visibleTabs.training && (
                <li className="nav-item">
                  <NavLink to="/cp/trainings" className="group">
                    <div className="flex items-center">
                      <IconTrendingUp className="group-hover:!text-cdms_primary shrink-0" />
                      <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                        {t("Trainings")}
                      </span>
                    </div>
                  </NavLink>
                </li>
              )}

              {/*
               *
               *Capacity Approval Process
               */}
              {/* 
              <li className="menu nav-item">
                <button
                  type="button"
                  className={`${
                    currentMenu === "cp" ? "active" : ""
                  } nav-link group w-full`}
                  onClick={() => toggleMenu("cp")}
                >
                  <div className="flex items-center">
                    <IconFile className="group-hover:!text-cdms_primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                      {t("Capacity Plan")}
                    </span>
                  </div>

                  <div
                    className={
                      currentMenu !== "cp" ? "rtl:rotate-90 -rotate-90" : ""
                    }
                  >
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight
                  duration={300}
                  height={currentMenu === "cp" ? "auto" : 0}
                >
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <NavLink to="/cp/overview">{t("Overview")}</NavLink>
                    </li>
                    <li>
                      <NavLink to="/cp/trainings">{t("Trainings")}</NavLink>
                    </li>
                  </ul>
                </AnimateHeight>
              </li> */}

              {/* Capacity Need Assessment */}

              {visibleTabs.cna && (
                <li className="menu nav-item">
                  <button
                    type="button"
                    className={`${
                      currentMenu === "cna" ? "active" : ""
                    } nav-link group w-full`}
                    onClick={() => toggleMenu("cna")}
                  >
                    <div className="flex items-center">
                      <IconBook className="group-hover:!text-cdms_primary shrink-0" />
                      <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                        {t("Capacity Need Assessment")}
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
                        <NavLink to="/cna/assessment">
                          {t("Assessment")}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/cna/template">{t("Templates")}</NavLink>
                      </li>
                    </ul>
                  </AnimateHeight>
                </li>
              )}
            </ul>
            <ul className="relative font-semibold space-y-0.5 mb-8 p-4 py-0">
              <li className="nav-item px-3">
                <div
                  className="flex group hover:cursor-pointer"
                  onClick={handleSignOut}
                >
                  <IconLogout className="group-hover:!text-cdms_primary shrink-0" />
                  <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                    {t("Sign Out")}
                  </span>
                </div>
              </li>
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
