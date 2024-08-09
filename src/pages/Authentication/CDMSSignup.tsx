import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import {
  PersonalInfoForm,
  OrganizationInfoForm,
  //   WorkInfoForm,
} from "../../components/Authentication/SignUpForms";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { handleSignup } from "../../redux/action/signUpAction";
import { StateOptions } from "../../util/enum";
export const CDMSSignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const [signupData, setSignupData] = useState(false);

  const signUpState = useSelector((state: IRootState) => state.signUp);
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // useEffect(() => {
  //     const handleTabClick = (tab: string) => {
  //         	setActiveTab(tab);
  //         };
  // }, [handleTabClick]);
  const submitForm = () => {
    console.log("Submitting Signup Info:");
    console.log(
      typeof sessionStorage.getItem("dob"),
      sessionStorage.getItem("dob")
    );
    const userInfo: userInfo = {
      firstName: sessionStorage.getItem("firstName") as string,
      middleName: sessionStorage.getItem("middleName") as string,
      lastName: sessionStorage.getItem("lastName") as string,
      email: sessionStorage.getItem("email") as string,
      phoneNumber: sessionStorage.getItem("phoneNumber") as string,
      gender: sessionStorage.getItem("gender") as string,
      // dob: sessionStorage.getItem("dob") as string ,
      dob: sessionStorage.getItem("dob") as string,
      nationality: sessionStorage.getItem("nationality") as string,
      profileImage: sessionStorage.getItem("profileImage") as string,
      rssbNo: sessionStorage.getItem("rssbNo") as string,
      idNumber: sessionStorage.getItem("idNumber") as string,
      address: sessionStorage.getItem("address") as string,
      //   password: sessionStorage.getItem("password") as string,
      //   confirmPassword: sessionStorage.getItem("confirmPassword") as string,
    };
    const organizationInfo: organizationInfo = {
      name: sessionStorage.getItem("organizationName") as string,
      displayName: sessionStorage.getItem("organizationDisplayName") as string,
      logoUrl: sessionStorage.getItem("organizationLogoUrl") as string,
      aboutUs: sessionStorage.getItem("organizationAboutUs") as string,
      mission: sessionStorage.getItem("organizationMission") as string,
      vision: sessionStorage.getItem("organizationVision") as string,
      industry: sessionStorage.getItem("organizationIndustry") as string,
      address: sessionStorage.getItem("organizationAddress") as string,
      phoneNumber: sessionStorage.getItem("organizationPhoneNumber") as string,
      email: sessionStorage.getItem("organizationEmail") as string,
      website: sessionStorage.getItem("organizationWebsite") as string,
      tinNo: sessionStorage.getItem("organizationTinNo") as string,
    };
    const userWorkInfo: userWorkInfo = {
      role: sessionStorage.getItem("role") as string,
      department: sessionStorage.getItem("department") as string,
      position: sessionStorage.getItem("position") as string,
    };
    const payload = {
      userInfo,
      organizationInfo,
      userWorkInfo,
    };
    console.log(payload);

    dispatch(handleSignup(payload));
    setSignupData(false);
  };

  useEffect(() => {
    console.log(signUpState.state);
    if (signUpState.state === StateOptions.FULFILLED) {
      navigate("/reset-password");
    }
  }, [signUpState]);

  useEffect(() => {
    if (activeTab) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
    if (signupData) {
      console.log("Signup Data");
      submitForm();
    }
  }, [activeTab, signupData]);

  return (
    <div className="justify-center p-6 bg-white max-md:px-5">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow p-6 w-full bg-cdms_primary max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/6756065672675fe032811b3afee8889f98576d60054fb7c4d91fcca8083fdcc5?apiKey=91e50d8dc4334802820abcbb631f5a11&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/6756065672675fe032811b3afee8889f98576d60054fb7c4d91fcca8083fdcc5?apiKey=91e50d8dc4334802820abcbb631f5a11&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6756065672675fe032811b3afee8889f98576d60054fb7c4d91fcca8083fdcc5?apiKey=91e50d8dc4334802820abcbb631f5a11&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/6756065672675fe032811b3afee8889f98576d60054fb7c4d91fcca8083fdcc5?apiKey=91e50d8dc4334802820abcbb631f5a11&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/6756065672675fe032811b3afee8889f98576d60054fb7c4d91fcca8083fdcc5?apiKey=91e50d8dc4334802820abcbb631f5a11&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6756065672675fe032811b3afee8889f98576d60054fb7c4d91fcca8083fdcc5?apiKey=91e50d8dc4334802820abcbb631f5a11&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/6756065672675fe032811b3afee8889f98576d60054fb7c4d91fcca8083fdcc5?apiKey=91e50d8dc4334802820abcbb631f5a11&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/6756065672675fe032811b3afee8889f98576d60054fb7c4d91fcca8083fdcc5?apiKey=91e50d8dc4334802820abcbb631f5a11&"
              className="self-center max-w-full aspect-[1.16] w-[140px]"
            />
            <div className="z-10 shrink-0 mt-14 ml-7 border-solid border-[3px] border-white border-opacity-10 h-[84px] w-[90px] max-md:mt-10 max-md:ml-2.5" />
            <div className="px-9 pt-6 pb-2.5 bg-white rounded-2xl shadow-2xl max-md:px-5 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow pb-9 mt-3 text-lg text-black max-md:mt-10">
                    <div className="text-2xl font-bold">Trainings</div>
                    <div className="mt-2 text-3xl font-black">3245</div>
                    <div className="mt-2.5 text-stone-400">
                      Employee Trained
                    </div>
                    <div className="mt-2.5 text-stone-400">
                      Training Rate is More than 48% than last Month
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/6b445ca65744e911b25478261f9afc20ad0525972c7ea1ecd4287370fc7999a1?apiKey=91e50d8dc4334802820abcbb631f5a11&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b445ca65744e911b25478261f9afc20ad0525972c7ea1ecd4287370fc7999a1?apiKey=91e50d8dc4334802820abcbb631f5a11&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b445ca65744e911b25478261f9afc20ad0525972c7ea1ecd4287370fc7999a1?apiKey=91e50d8dc4334802820abcbb631f5a11&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b445ca65744e911b25478261f9afc20ad0525972c7ea1ecd4287370fc7999a1?apiKey=91e50d8dc4334802820abcbb631f5a11&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b445ca65744e911b25478261f9afc20ad0525972c7ea1ecd4287370fc7999a1?apiKey=91e50d8dc4334802820abcbb631f5a11&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b445ca65744e911b25478261f9afc20ad0525972c7ea1ecd4287370fc7999a1?apiKey=91e50d8dc4334802820abcbb631f5a11&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b445ca65744e911b25478261f9afc20ad0525972c7ea1ecd4287370fc7999a1?apiKey=91e50d8dc4334802820abcbb631f5a11&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b445ca65744e911b25478261f9afc20ad0525972c7ea1ecd4287370fc7999a1?apiKey=91e50d8dc4334802820abcbb631f5a11&"
                    className="shrink-0 mx-auto rounded-full aspect-square bg-[linear-gradient(323deg,#FFF_20.29%,#F5F5F5_86.13%)] w-[210px] max-md:mt-10"
                  />
                </div>
              </div>
            </div>
            <div className="self-center mt-24 text-2xl font-bold tracking-tight leading-8 text-center text-white max-md:mt-10">
              Capacity Development Management System
            </div>
            <div className="mt-3 text-base leading-8 text-center text-white max-md:max-w-full">
              Elevate. Empower. Excel.
              <br />A comprehensive capacity building software designed to
              revolutionize the way public institutions in Rwanda enhance the
              skills and knowledge of their employees.{" "}
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/664b47b844be52f589548daef314734caf0d340c7baa1b53331c0fe059cb018e?apiKey=91e50d8dc4334802820abcbb631f5a11&"
              className="self-center mt-11 max-w-full aspect-[12.5] w-[104px] max-md:mt-10"
            />
          </div>
        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow items-center mt-2 max-md:mt-10 max-md:max-w-full">
            <div className="text-4xl font-bold tracking-tighter text-center text-gray-900 leading-[90px]">
              Sign up for an account
            </div>
            <div className="mt-7 text-base leading-8 text-center text-black">
              Elevate. Empower. Excel.
            </div>
            <div className="flex flex-col justify-center self-stretch py mt-4 bg-white max-md:px-5 max-md:max-w-full">
              <div className="flex flex-col pb-7 mr-7 ml-7 bg-white max-md:mr-2.5 max-md:max-w-full">
                <div className="flex z-10 flex-col px-5 pt-5 pb-9 bg-white rounded-3xl border border-blue-400 border-solid max-md:max-w-full">
                  <div className="flex justify-center gap-5 px-5 py-2.5 text-base text-white bg-cdms_secondary rounded-xl max-md:flex-wra">
                    <div
                      className={`justify-center w-6/12 text-center  p-2 rounded-xl max-md:px-5 info-tab ${
                        activeTab === "personal" ? "bg-cdms_primary" : ""
                      }`}
                      // onClick={() => handleTabClick("personal")}
                    >
                      Personal Information
                    </div>
                    <div
                      className={`flex-auto w-6/12 text-center my-auto justify-center p-2 rounded-xl max-md:px-5 info-tab ${
                        activeTab === "organization" ? "bg-cdms_primary" : ""
                      }`}
                      // onClick={() => handleTabClick("organization")}
                    >
                      Organization Information
                    </div>
                    {/* <div
                      className={`flex-auto w-6/12 text-center my-auto justify-center p-2 rounded-xl max-md:px-5 info-tab ${
                        activeTab === "workInfo" ? "bg-cdms_primary" : ""
                      }`}
                      // onClick={() => handleTabClick("organization")}
                    >
                      <span>Work</span> <br />
                      <span>Information</span>
                    </div> */}
                  </div>

                  {activeTab === "personal" && (
                    <div>
                      <PersonalInfoForm handleTabClick={handleTabClick} />
                    </div>
                  )}
                  {activeTab === "organization" && (
                    <div>
                      <OrganizationInfoForm
                        handleTabClick={handleTabClick}
                        setSignupData={setSignupData}
                      />
                    </div>
                  )}
                  {/* {activeTab === "workInfo" && (
                    <div>
                      <WorkInfoForm
                        handleTabClick={handleTabClick}
                        setSignupData={setSignupData}
                      />
                    </div>
                  )} */}
                </div>
                <div className="mt-6 text-base leading-7 text-black max-md:max-w-full">
                  Already have an account?{" "}
                  <span className="font-bold text-black">
                    <Link to="/cdms-signin">Sign In</Link>.
                  </span>
                  .
                </div>
                {/* <button type="submit" className="w-full btn btn-primary !mt-6">
									Sign Up
								</button> */}
              </div>
            </div>
            <div className="self-center mt-4 text-sm leading-7 text-gray-500 max-md:mt-8">
              2024 © CDMS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
