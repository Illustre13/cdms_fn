import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { setPageTitle } from "../../redux/reducer/themeConfigSlice";
import { useSelector } from "react-redux";
import IconLinkedin from "../../components/Icon/IconLinkedin";
import IconTwitter from "../../components/Icon/IconTwitter";
import IconFacebook from "../../components/Icon/IconFacebook";
import IconGithub from "../../components/Icon/IconGithub";
import { IRootState } from "../../redux/store";
import { fetchUserInfo, updateUser } from "../../redux/action/UserAction";
import { StateOptions } from "../../util/enum";
import { useAppDispatch } from "../../redux/hooks";
import { UserForm } from "./UserForm";
import { toast, ToastContainer } from "react-toastify";
import { FormikProps } from "formik";
import Modal from "../Components/Modals";

const MyProfile = () => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [activeToast, setActiveToast] = useState<string | null>(null);
  useEffect(() => {
    dispatch(setPageTitle("My Profile"));
  });
  const [tabs, setTabs] = useState<string>("home");
  const toggleTabs = (name: string) => {
    setTabs(name);
  };
  const userInfoState = useSelector(
    (state: IRootState) => state.user.fetchUserInfoState
  );

  const [userData, setUserData] = useState<any>(null);
  const [employeeData, setEmployeeData] = useState<any>(null);
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
      setEmployeeData(userInfoState?.data?.data?.employee);
    }
  }, [userInfoState]);
  const updateUserState = useSelector(
    (state: IRootState) => state.user.fetchUserInfoState
  );
  const showToast = (
    state: string,
    message: string,
    successMsg: string,
    errorMsg: string
  ) => {
    if (state === StateOptions.FULFILLED) {
      if (activeToast !== successMsg) {
        toast.success(message || successMsg, {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        setActiveToast(successMsg);
      }
    } else if (state === StateOptions.REJECTED) {
      if (activeToast !== errorMsg) {
        toast.error(message || errorMsg, {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        setActiveToast(errorMsg);
      }
    }
    dispatch(fetchUserInfo());
  };
  const UserFormRef = useRef<FormikProps<any> | null>(null);

  const handleEditUserInfo = (initialData: any) => {
    if (UserFormRef.current && isEditing) {
      const formValues = UserFormRef.current.values;
      dispatch(
        updateUser({
          data: { ...formValues },
          id: initialData?.id!,
        })
      );
      setIsEditing(false);
    }
  };

  if (isEditing) {
    handleEditUserInfo(userData);
  }

  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <span>Users</span>
        </li>
    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <Link
            to="/user/profile"
            className="text-cdms_primary hover:underline"
          >
            <span>My Account</span>
          </Link>
        </li>
      </ul>

<div className="pt-5">
       {userInfoState.state === StateOptions.FULFILLED ?
        <div className="flex flex-row gap-2 border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
          <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                <img
                  src={userData.profileImage || "/assets/images/profile_avatar.png"}
                  alt="Profile"
                  className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto"
                />
              </div>
        <h5 className="font-bold text-gray-700 text-2xl dark:text-white-light">
					Hello <br /> {userData?.firstName} {userData?.lastName} 👋
				</h5>
      </div>
      : <span>Loading...</span>
       }
      </div>

      <div className="pt-5">
       {userInfoState.state === StateOptions.FULFILLED ?
        <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
        <UserForm
          userFormRef={UserFormRef}
          userInfo={userData}
          employeeInfo={employeeData}
          setIsEditing={setIsEditing}
        />
      </div>
      : <span>Loading...</span>
       }
        {/* <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 bg-white dark:bg-black">
          <h6 className="text-lg font-bold mb-5">Social</h6>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex">
              <div className="bg-[#eee] flex justify-center items-center rounded px-3 font-semibold dark:bg-[#1b2e4b] ltr:mr-2 rtl:ml-2">
                <IconLinkedin className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="jimmy_turner"
                className="form-input"
              />
            </div>
            <div className="flex">
              <div className="bg-[#eee] flex justify-center items-center rounded px-3 font-semibold dark:bg-[#1b2e4b] ltr:mr-2 rtl:ml-2">
                <IconTwitter className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="jimmy_turner"
                className="form-input"
              />
            </div>
            <div className="flex">
              <div className="bg-[#eee] flex justify-center items-center rounded px-3 font-semibold dark:bg-[#1b2e4b] ltr:mr-2 rtl:ml-2">
                <IconFacebook className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="jimmy_turner"
                className="form-input"
              />
            </div>
            <div className="flex">
              <div className="bg-[#eee] flex justify-center items-center rounded px-3 font-semibold dark:bg-[#1b2e4b] ltr:mr-2 rtl:ml-2">
                <IconGithub />
              </div>
              <input
                type="text"
                placeholder="jimmy_turner"
                className="form-input"
              />
            </div>
          </div>
        </form> */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyProfile;
