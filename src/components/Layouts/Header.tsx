import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IRootState } from "../../redux/store";
import {
  toggleRTL,
  toggleTheme,
  toggleSidebar,
} from "../../redux/reducer/themeConfigSlice";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import Dropdown from "../Dropdown";
import IconMenu from "../Icon/IconMenu";
import IconSun from "../Icon/IconSun";
import IconMoon from "../Icon/IconMoon";
import IconLaptop from "../Icon/IconLaptop";
import IconUser from "../Icon/IconUser";
import IconLogout from "../Icon/IconLogout";
import IconMenuApps from "../Icon/Menu/IconMenuApps";
import { fetchUserInfo } from "../../redux/action/UserAction";
import { useAppDispatch } from "../../redux/hooks";
import { StateOptions } from "../../util/enum";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const selector = document.querySelector(
      'ul.horizontal-menu a[href="' + window.location.pathname + '"]'
    );
    if (selector) {
      selector.classList.add("active");
      const all: any = document.querySelectorAll(
        "ul.horizontal-menu .nav-link.active"
      );
      for (let i = 0; i < all.length; i++) {
        all[0]?.classList.remove("active");
      }
      const ul: any = selector.closest("ul.sub-menu");
      if (ul) {
        let ele: any = ul.closest("li.menu").querySelectorAll(".nav-link");
        if (ele) {
          ele = ele[0];
          setTimeout(() => {
            ele?.classList.add("active");
          });
        }
      }
    }
  }, [location]);

  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl"
      ? true
      : false;

  const themeConfig = useSelector((state: IRootState) => state.themeConfig);

  function createMarkup(messages: any) {
    return { __html: messages };
  }

  const setLocale = (flag: string) => {
    setFlag(flag);
    if (flag.toLowerCase() === "ae") {
      dispatch(toggleRTL("rtl"));
    } else {
      dispatch(toggleRTL("ltr"));
    }
  };
  const [flag, setFlag] = useState(themeConfig.locale);

  const { t } = useTranslation();
  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/cdms-signin");
  };

  const userInfoState = useSelector((state: IRootState) => state.user.fetchUserInfoState);

const [userData, setUserData] = useState<any>(null);
const [loadingUser, setLoadingUser] = useState(true);

useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchUserInfo()).unwrap();
        setLoadingUser(false);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        setLoadingUser(false);
      }
    };

    if (loadingUser) {
      fetchData();
    }
  }, [dispatch, loadingUser]);

  useEffect(() => {
    if (userInfoState?.state === StateOptions.FULFILLED) {
      setUserData(userInfoState?.data?.data?.user);
    }
  }, [userInfoState]);
console.log("PI --->", userData?.profileImage)
  return (
    <header
      className={`z-40 ${
        themeConfig.semidark && themeConfig.menu === "horizontal" ? "dark" : ""
      }`}
    >
      <div className="shadow-sm">
        <div className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black">
          <div className="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
            <Link to="/" className="main-logo flex items-center shrink-0">
              <img
                className="w-16 ltr:-ml-1 rtl:-mr-1 inline"
                src="/assets/images/cdms_logo_002.png"
                alt="logo"
              />
            </Link>
            <button
              type="button"
              className="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-cdms_primary dark:hover:text-cdms_primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
              onClick={() => {
                dispatch(toggleSidebar());
              }}
            >
              <IconMenu className="w-5 h-5" />
            </button>
          </div>

          <div className="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center justify-end space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
            <div>
              {themeConfig.theme === "light" ? (
                <button
                  className={`${
                    themeConfig.theme === "light" &&
                    "flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-cdms_primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                  }`}
                  onClick={() => {
                    dispatch(toggleTheme("dark"));
                  }}
                >
                  <IconSun />
                </button>
              ) : (
                ""
              )}
              {themeConfig.theme === "dark" && (
                <button
                  className={`${
                    themeConfig.theme === "dark" &&
                    "flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-cdms_primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                  }`}
                  onClick={() => {
                    dispatch(toggleTheme("system"));
                  }}
                >
                  <IconMoon />
                </button>
              )}
              {themeConfig.theme === "system" && (
                <button
                  className={`${
                    themeConfig.theme === "system" &&
                    "flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-cdms_primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                  }`}
                  onClick={() => {
                    dispatch(toggleTheme("light"));
                  }}
                >
                  <IconLaptop />
                </button>
              )}
            </div>
            <div className="dropdown shrink-0">
              <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                btnClassName="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-cdms_primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                button={
                  <img
                    className="w-5 h-5 object-cover rounded-full"
                    src={`/assets/images/flags/${flag.toUpperCase()}.svg`}
                    alt="flag"
                  />
                }
              >
                <ul className="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                  {themeConfig.languageList.map((item: any) => {
                    return (
                      <li key={item.code}>
                        <button
                          type="button"
                          className={`flex w-full hover:text-cdms_primary rounded-lg ${
                            i18next.language === item.code
                              ? "bg-cdms_primary/10 text-cdms_primary"
                              : ""
                          }`}
                          onClick={() => {
                            i18next.changeLanguage(item.code);
                            // setFlag(item.code);
                            setLocale(item.code);
                          }}
                        >
                          <img
                            src={`/assets/images/flags/${item.code.toUpperCase()}.svg`}
                            alt="flag"
                            className="w-5 h-5 object-cover rounded-full"
                          />
                          <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </Dropdown>
            </div>

            <div className="dropdown shrink-0 flex">
              <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                btnClassName="relative group block"
                button={
                  <img
                    className="w-9 h-9 rounded-full object-cover saturate-100 group-hover:saturate-80"
                    // src="/assets/images/profile_avatar.png"
					src={userData?.profileImage ? userData?.profileImage : "/assets/images/profile_avatar.png"}
                    alt="userProfile"
                  />
                }
              >
                <ul className="text-dark dark:text-white-dark !py-0 w-[280px] font-semibold dark:text-white-light/90">
                  <li>
                    <div className="flex items-center px-4 py-4">
                      <img
                        className="rounded-md w-10 h-10 object-cover"
                        // src="/assets/images/profile_avatar.png"
                        src={userData?.profileImage ? userData?.profileImage : "/assets/images/profile_avatar.png"}
                        alt="userProfile"
                      />
                      <div className="ltr:pl-4 rtl:pr-4 truncate">
                        <h4 className="text-base">{userData ? `${userData?.firstName} ${userData?.lastName}` : "John Doe"}</h4>
                        <button
                          type="button"
                          className="text-black/60 hover:text-cdms_primary dark:text-dark-light/60 dark:hover:text-white"
                        >
                         {/* {userData?.firstName} ? {userData?.firstName} : "johndoe@gmail.com"
						  */}

						  {userData?.email ? userData?.email : "johndoe@gmail.com"}
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link to="/users/profile" className="dark:hover:text-white">
                      <IconUser className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                      My Profile
                    </Link>
                  </li>{" "}
                  <li>
                    <Link to="/" className="dark:hover:text-white">
                      <IconMenuApps className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                      Go to HomePage
                    </Link>
                  </li>
                  <li className="border-t border-white-light dark:border-white-light/10">
                    <div
                      onClick={handleSignOut}
                      className="flex dark:hover:text-white text-danger p-4 cursor-pointer"
                    >
                      <IconLogout className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" />
                      Sign Out
                    </div>
                  </li>
                </ul>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
