import { Formik, Field, ErrorMessage } from "formik";
import { Form } from "react-router-dom";
import "tippy.js/dist/tippy.css";
import { useState } from "react";
import { userInfoIV, userInfoValidationSchema } from "./userFormSchema";
import Tippy from "@tippyjs/react";
import IconEdit from "../../components/Icon/IconEdit";

export interface IUserFormProps {
  userFormRef?: any;
  userInfo?: any;
  employeeInfo?: any;
  setUserData?: any;
  setIsEditing?: (value: boolean) => void;
}

export const UserForm: React.FC<IUserFormProps> = ({
  userFormRef,
  userInfo,
  employeeInfo,
  setIsEditing = () => {},
}) => {
  const handleSave = () => {
    setIsEditingMode(false);
    setIsEditing(true);
  };
  const [isEditingMode, setIsEditingMode] = useState(false);
  return (
    <>
      <Formik
        innerRef={userFormRef}
        initialValues={userInfoIV(userInfo, employeeInfo)}
        validationSchema={userInfoValidationSchema}
        onSubmit={handleSave}
      >
        {({ values, errors, touched, handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black"
          >
            <div className="flex flex-row justify-between">
              <h6 className="text-lg font-bold mb-5"></h6>

              <div className="flex flex-row items-center gap-4 justify-center">
                {/* Submit button */}
                {isEditingMode && (
                  <div className="sm:col-span-2 mt-4 flex justify-end">
                    <button
                      type="submit"
                      className={`bg-cdms_primary text-white py-2 px-4 -mt-4 rounded-md hover:bg-cdms_secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                    >
                      Save
                    </button>
                  </div>
                )}

                <Tippy content="Edit User" placement="top">
                  <div onClick={() => setIsEditingMode(!isEditingMode)}>
                    <IconEdit className="w-8 h-8 cursor-pointer" />
                  </div>
                </Tippy>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row">
              <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                <img
                  src={values.profileImage || "/assets/images/profile_avatar.png"}
                  alt="Profile"
                  className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto"
                />
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <h6 className="text-lg font-bold mb-5">General Information</h6>
              <span></span>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <Field
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    className={`form-input ${
                      !isEditingMode ? "text-gray-500" : ""
                    } ${
                      touched.firstName && errors.firstName
                        ? "border-red-500"
                        : ""
                    }`}
                    disabled={!isEditingMode}
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="middleName"
                  >
                    Middle Name
                  </label>
                  <Field
                    id="middleName"
                    name="middleName"
                    type="text"
                    placeholder="Doe"
                    className={`form-input ${
                      !isEditingMode ? "text-gray-500" : ""
                    } ${
                      touched.middleName && errors.middleName
                        ? "border-red-500"
                        : ""
                    }`}
                    disabled={!isEditingMode}
                  />
                  <ErrorMessage
                    name="middleName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <Field
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Smith"
                    className={`form-input ${
                      !isEditingMode ? "text-gray-500" : ""
                    } ${
                      touched.lastName && errors.lastName
                        ? "border-red-500"
                        : ""
                    }`}
                    disabled={!isEditingMode}
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    className={`form-input ${
                      !isEditingMode ? "text-gray-500" : ""
                    } ${touched.email && errors.email ? "border-red-500" : ""}`}
                    disabled={!isEditingMode}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="phoneNumber"
                  >
                    Phone Number
                  </label>
                  <Field
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    placeholder="123-456-7890"
                    className={`form-input ${
                      !isEditingMode ? "text-gray-500" : ""
                    } ${
                      touched.phoneNumber && errors.phoneNumber
                        ? "border-red-500"
                        : ""
                    }`}
                    disabled={!isEditingMode}
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="gender"
                  >
                    Gender
                  </label>
                  <Field
                    as="select"
                    id="gender"
                    name="gender"
                    className={`form-select ${
                      touched.gender && errors.gender ? "border-red-500" : ""
                    }`}
                    disabled={!isEditingMode}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="dob"
                  >
                    Date of Birth
                  </label>
                  <Field
                    id="dob"
                    name="dob"
                    type="date"
                    className={`form-input ${
                      !isEditingMode ? "text-gray-500" : ""
                    } ${touched.dob && errors.dob ? "border-red-500" : ""}`}
                    disabled={!isEditingMode}
                  />
                  <ErrorMessage
                    name="dob"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="nationality"
                  >
                    Nationality
                  </label>
                  <Field
                    id="nationality"
                    name="nationality"
                    type="text"
                    placeholder="Nationality"
                    className={`form-input ${
                      !isEditingMode ? "text-gray-500" : ""
                    } ${
                      touched.nationality && errors.nationality
                        ? "border-red-500"
                        : ""
                    }`}
                    disabled={!isEditingMode}
                  />
                  <ErrorMessage
                    name="nationality"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="rssbNo"
                  >
                    RSSB Number
                  </label>
                  <Field
                    id="rssbNo"
                    name="rssbNo"
                    type="text"
                    placeholder="RSSB Number"
                    className={`form-input ${
                      !isEditingMode ? "text-gray-500" : ""
                    } ${
                      touched.rssbNo && errors.rssbNo ? "border-red-500" : ""
                    }`}
                    disabled={!isEditingMode}
                  />
                  <ErrorMessage
                    name="rssbNo"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="status"
                  >
                    Status
                  </label>
                  <Field
                    as="select"
                    id="status"
                    name="status"
                    className={`form-select ${
                      touched.status && errors.status ? "border-red-500" : ""
                    }`}
                    disabled={!isEditingMode}
                  >
                    <option value="">Select Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </Field>
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="idNumber"
                  >
                    ID Number
                  </label>
                  <Field
                    id="idNumber"
                    name="idNumber"
                    type="text"
                    placeholder="ID Number"
                    className={`form-input ${
                      !isEditingMode ? "text-gray-500" : ""
                    } ${
                      touched.idNumber && errors.idNumber
                        ? "border-red-500"
                        : ""
                    }`}
                    disabled={!isEditingMode}
                  />
                  <ErrorMessage
                    name="idNumber"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <Field
                    id="address"
                    name="address"
                    as="textarea"
                    placeholder="Address"
                    className={`form-input ${
                      !isEditingMode ? "text-gray-500" : ""
                    } ${
                      touched.address && errors.address ? "border-red-500" : ""
                    }`}
                    disabled={!isEditingMode}
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <h6 className="text-lg font-bold mb-5">Work Information</h6>
                <span></span>







                {/* Organization */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="organization"
                  >
                    Organization
                  </label>
                  <Field
                    id="organization"
                    name="organization"
                    type="text"
                    placeholder="Organization"
                    className={`form-input ${
                      !isEditingMode ? "text-gray-500" : ""
                    } ${
                      touched.organization && errors.organization ? "border-red-500" : ""
                    }`}
                    disabled={true}
                  />
                  <ErrorMessage
                    name="organization"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                {/* Position */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="position"
                  >
                    Position
                  </label>
                  <Field
                    id="position"
                    name="position"
                    type="text"
                    placeholder="Position"
                    className={`form-input ${
                      !isEditingMode ? "text-gray-500" : ""
                    } ${
                      touched.position && errors.position
                        ? "border-red-500"
                        : ""
                    }`}
                    disabled={true}
                  />
                  <ErrorMessage
                    name="position"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Department */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="department"
                  >
                    Department
                  </label>
                  <Field
                    id="department"
                    name="department"
                    type="text"
                    placeholder="Department"
                    className={`form-input ${
                      !isEditingMode ? "text-gray-500" : ""
                    } ${
                      touched.department && errors.department
                        ? "border-red-500"
                        : ""
                    }`}
                    disabled={true}
                  />
                  <ErrorMessage
                    name="department"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium text-gray-700  ${
                      !isEditingMode ? "text-gray-500" : ""} dark:text-gray-3001`}
                    htmlFor="roleName"
                  >
                    Role
                  </label>
                  <Field
                    type="text"
                    id="roleName"
                    name="roleName"
                    className={`form-select ${
                      touched.roleName && errors.roleName ? "border-red-500" : ""
                    }`}
                    disabled={true}
                  >
                  </Field>
                  <ErrorMessage
                    name="roleName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

              </div>
            </div>

            
          </Form>
        )}
      </Formik>
    </>
  );
};
