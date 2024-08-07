import { Formik, Field, ErrorMessage } from "formik";
import { Form } from "react-router-dom";
import { organizationInfoIV2, organizationInfoValidation } from "../../components/Authentication/SignUp.schema";
import IconEdit from "../../components/Icon/IconEdit";
import "tippy.js/dist/tippy.css";
import Tippy from "@tippyjs/react";
import { useState } from "react";

export interface ISignupProps {
  setSignupData?: (values: any) => void;
  organizationFormRef?: any;
  organizationInfo?: any;
  setOrganizationData?: any;
  setIsEditing?: (value: boolean) => void;
}

export const OrganizationForm1: React.FC<ISignupProps> = ({
  organizationFormRef,
  organizationInfo,
  setIsEditing = () => {},
}) => {
  const handleSave = () => {
    setIsEditingMode(false);
    setIsEditing(true);
  };
  const [isEditingMode, setIsEditingMode] = useState(false);
  return (
    <Formik
      innerRef={organizationFormRef}
      initialValues={organizationInfoIV2(organizationInfo)}
      validationSchema={organizationInfoValidation}
      onSubmit={handleSave}
    >
      {({ values, errors, touched, handleSubmit }) => (
        <Form
          onSubmit={handleSubmit}
          className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 bg-white dark:bg-black w-full"
        >
          <div className="flex flex-row justify-between">
            <h6 className="text-lg font-bold mb-5">General Information</h6>

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

              <Tippy content="Edit organization" placement="top">
                <div onClick={() => setIsEditingMode(!isEditingMode)}>
                  <IconEdit className="w-8 h-8 cursor-pointer" />
                </div>
              </Tippy>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name input field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Organization Name
              </label>
              <Field
                name="name"
                type="text"
                id="name"
                placeholder="Enter organization name"
                className={`form-input ${!isEditingMode ? "text-gray-500" : ""} ${
                  touched.name && errors.name
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                disabled={!isEditingMode}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Display Name input field */}
            <div>
              <label
                htmlFor="displayName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Display Name
              </label>
              <Field
                name="displayName"
                type="text"
                id="displayName"
                placeholder="Enter organization display name"
                className={`form-input ${!isEditingMode ? "text-gray-500" : ""} ${
                  touched.displayName && errors.displayName
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                disabled={!isEditingMode}
              />
              <ErrorMessage
                name="displayName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* About Us input field */}
            <div className="sm:col-span-2">
              <label
                htmlFor="aboutUs"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                About Us
              </label>
              <Field
                as="textarea"
                name="aboutUs"
                id="aboutUs"
                placeholder="Enter organization about us"
                className={`form-textarea h-24 ${
                  !isEditingMode ? "text-gray-500" : ""
                } ${
                  touched.aboutUs && errors.aboutUs
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                disabled={!isEditingMode}
              />
              <ErrorMessage
                name="aboutUs"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Mission input field */}
            <div className="sm:col-span-2">
              <label
                htmlFor="mission"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Mission
              </label>
              <Field
                as="textarea"
                name="mission"
                id="mission"
                placeholder="Enter organization mission"
                className={`form-textarea ${
                  !isEditingMode ? "text-gray-500" : ""
                } ${
                  touched.mission && errors.mission
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                disabled={!isEditingMode}
              />
              <ErrorMessage
                name="mission"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Vision input field */}
            <div className="sm:col-span-2">
              <label
                htmlFor="vision"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Vision
              </label>
              <Field
                as="textarea"
                name="vision"
                id="vision"
                placeholder="Enter organization vision"
                className={`form-textarea ${
                  !isEditingMode ? "text-gray-500" : ""
                } ${
                  touched.vision && errors.vision
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                disabled={!isEditingMode}
              />
              <ErrorMessage
                name="vision"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="industry"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Industry
              </label>
              <Field
                as="select"
                name="industry"
                id="industry"
                className={`form-select ${
                  !isEditingMode ? "text-gray-500" : ""
                } ${
                  touched.industry && errors.industry
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                disabled={!isEditingMode}
              >
                {isEditingMode ? (
                  <>
                    <option value="">Select industry</option>
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
                    <option value="Information Technology">
                      Information Technology
                    </option>
                  </>
                ) : (
                  <option value={values.industry}>
                    {values.industry || touched.industry || "Select industry"}
                  </option>
                )}
              </Field>
              <ErrorMessage
                name="industry"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Address input field */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Address
              </label>
              <Field
                name="address"
                type="text"
                id="address"
                placeholder="Enter organization address"
                className={`form-input ${!isEditingMode ? "text-gray-500" : ""} ${
                  touched.address && errors.address
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                disabled={!isEditingMode}
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Phone Number input field */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Phone Number
              </label>
              <Field
                name="phoneNumber"
                type="text"
                id="phoneNumber"
                placeholder="Enter organization phone number"
                className={`form-input ${!isEditingMode ? "text-gray-500" : ""} ${
                  touched.phoneNumber && errors.phoneNumber
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                disabled={!isEditingMode}
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Email input field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <Field
                name="email"
                type="email"
                id="email"
                placeholder="Enter organization email address"
                className={`form-input ${!isEditingMode ? "text-gray-500" : ""} ${
                  touched.email && errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                disabled={!isEditingMode}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Website input field */}
            <div>
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Website
              </label>
              <Field
                name="website"
                type="text"
                id="website"
                placeholder="Enter organization website"
                className={`form-input ${!isEditingMode ? "text-gray-500" : ""} ${
                  touched.website && errors.website
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                disabled={!isEditingMode}
              />
              <ErrorMessage
                name="website"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* TIN No input field */}
            <div>
              <label
                htmlFor="tinNo"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                TIN Number
              </label>
              <Field
                name="tinNo"
                type="text"
                id="tinNo"
                placeholder="Enter organization TIN number"
                className={`form-input ${!isEditingMode ? "text-gray-500" : ""} ${
                  touched.tinNo && errors.tinNo
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                disabled={!isEditingMode}
              />
              <ErrorMessage
                name="tinNo"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
