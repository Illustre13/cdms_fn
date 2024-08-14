import { Formik, Field, ErrorMessage } from "formik";
import { Form } from "react-router-dom";
import "tippy.js/dist/tippy.css";
import { useState } from "react";
import Tippy from "@tippyjs/react";
import IconEdit from "../../components/Icon/IconEdit";
import {
  employeeInfoIV,
  employeeInfoValidationSchema,
} from "./employeeFormSchema";
// import { useAppDispatch } from "../../redux/hooks";
// import { updateEmployee } from "../../redux/action/employeeAction";

export interface IEmployeeFormProps {
  employeeFormRef?: any;
  userData?: any;
  employeeData?: any;
  isEditing?: boolean;
  setUserData?: any;
  setIsEditing?: (value: boolean) => void;
}

export const EmployeeForm: React.FC<IEmployeeFormProps> = ({
  employeeFormRef,
  userData,
  employeeData,
  isEditing = false,
}) => {
  const handleSave = (values: any) => {
    const employeeValues = {
      position: values?.position,
      department: values?.department,
      role: values?.roleName,
    };
    console.log(employeeValues);
    // dispatch(updateEmployee(employeeValues));
  };
  const [isEditingMode, setIsEditingMode] = useState(false);
  return (
    <>
      <Formik
        innerRef={employeeFormRef}
        initialValues={employeeInfoIV(userData, employeeData)}
        validationSchema={employeeInfoValidationSchema}
        onSubmit={handleSave}
      >
        {({ values, errors, touched, handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black"
          >
            <div className="flex flex-row justify-between">
              <h6 className="text-lg font-bold mb-5"></h6>

              {isEditing && (
                <div className="flex flex-row items-center gap-4 justify-center">
                  {/* Submit button */}
                  {/* {isEditingMode && (
                <div className="sm:col-span-2 mt-4 flex justify-end">
                  <button
                    type="submit"
                    className={`bg-cdms_primary text-white py-2 px-4 -mt-4 rounded-md hover:bg-cdms_secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                  >
                    Save
                  </button>
                </div>
              )} */}

                  <Tippy content="Edit User" placement="top">
                    <div onClick={() => setIsEditingMode(!isEditingMode)}>
                      <IconEdit className="w-8 h-8 cursor-pointer" />
                    </div>
                  </Tippy>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <h6 className="text-lg text-start font-bold mb-5">
                  Employee Work Information
                </h6>
                <span></span>

                {/* Organization */}
                <div className="py-2 flex flex-row gap-2">
                  <label
                    className="block text-sm font-medium w-4/12 text-gray-700 dark:text-gray-300"
                    htmlFor="organization"
                  >
                    Organization:
                  </label>
                  <Field
                    id="organization"
                    name="organization"
                    type="text"
                    placeholder="Organization"
                    className={`form-input w-8/12 ${
                      !isEditingMode ? "text-gray-500" : ""
                    } ${
                      touched.organization && errors.organization
                        ? "border-red-500"
                        : ""
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
                <div className="py-2 flex flex-row gap-2">
                  <label
                    className="block text-sm font-medium w-4/12 text-gray-700 dark:text-gray-300"
                    htmlFor="position"
                  >
                    Position:
                  </label>
                  <Field
                    id="position"
                    name="position"
                    type="text"
                    placeholder="Position"
                    className={`form-input w-8/12 ${
                      !isEditingMode ? "text-gray-500" : ""
                    } ${
                      touched.position && errors.position
                        ? "border-red-500"
                        : ""
                    }`}
                    disabled={!isEditingMode}
                  />
                  <ErrorMessage
                    name="position"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Department */}
                <div className="py-2 flex flex-row gap-2">
                  <label
                    className="block text-sm font-medium w-4/12 text-gray-700 dark:text-gray-300"
                    htmlFor="department"
                  >
                    Department:
                  </label>
                  <Field
                    id="department"
                    name="department"
                    type="text"
                    placeholder="Department"
                    className={`form-input w-8/12 ${
                      !isEditingMode ? "text-gray-500" : ""
                    } ${
                      touched.department && errors.department
                        ? "border-red-500"
                        : ""
                    }`}
                    disabled={!isEditingMode}
                  />
                  <ErrorMessage
                    name="department"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Role */}
                <div className="py-2 flex flex-row gap-2">
                  <label
                    className={`block text-sm font-medium w-4/12 text-gray-700  ${
                      !isEditingMode ? "text-gray-500" : ""
                    } dark:text-gray-3001`}
                    htmlFor="roleName"
                  >
                    Role:
                  </label>
                  {!isEditingMode ? (
                    <Field
                      type="text"
                      id="roleName"
                      name="roleName"
                      className={`form-select w-8/12 ${
                        touched.roleName && errors.roleName
                          ? "border-red-500"
                          : ""
                      }`}
                      disabled={!isEditingMode}
                    />
                  ) : (
                    <Field
                      as="select"
                      id="roleName"
                      name="roleName"
                      className={`form-select w-8/12 ${
                        touched.roleName && errors.roleName
                          ? "border-red-500"
                          : ""
                      }`}
                      disabled={!isEditingMode}
                    >
                      <option value="">Select Role</option>
                      <option value="EMPLOYEE">Employee</option>
                      <option value="APPROVER">Approver</option>
                    </Field>
                  )}

                  <ErrorMessage
                    name="roleName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                {!isEditing && (
                  <>
                    <h6 className="text-lg text-start font-bold mb-5">
                      Employee User Information
                    </h6>
                    <span></span>

                    <div className="py-2 flex flex-row gap-2">
                      <label
                        className="block text-sm font-medium w-4/12 text-gray-700 dark:text-gray-300"
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      <Field
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="John"
                        className={`form-input w-8/12 ${
                          !isEditingMode ? "text-gray-500" : ""
                        } ${
                          touched.firstName && errors.firstName
                            ? "border-red-500"
                            : ""
                        }`}
                        disabled={true}
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="py-2 flex flex-row gap-2">
                      <label
                        className="block text-sm font-medium w-4/12 text-gray-700 dark:text-gray-300"
                        htmlFor="middleName"
                      >
                        Middle Name
                      </label>
                      <Field
                        id="middleName"
                        name="middleName"
                        type="text"
                        placeholder="Doe"
                        className={`form-input w-8/12 ${
                          true ? "text-gray-500" : ""
                        } ${
                          touched.middleName && errors.middleName
                            ? "border-red-500"
                            : ""
                        }`}
                        disabled={true}
                      />
                      <ErrorMessage
                        name="middleName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="py-2 flex flex-row gap-2">
                      <label
                        className="block text-sm font-medium w-4/12 text-gray-700 dark:text-gray-300"
                        htmlFor="lastName"
                      >
                        Last Name
                      </label>
                      <Field
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Smith"
                        className={`form-input w-8/12 ${
                          true ? "text-gray-500" : ""
                        } ${
                          touched.lastName && errors.lastName
                            ? "border-red-500"
                            : ""
                        }`}
                        disabled={true}
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="py-2 flex flex-row gap-2">
                      <label
                        className="block text-sm font-medium w-4/12 text-gray-700 dark:text-gray-300"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        placeholder="example@gmail.com"
                        className={`form-input w-8/12 ${
                          true ? "text-gray-500" : ""
                        } ${
                          touched.email && errors.email ? "border-red-500" : ""
                        }`}
                        disabled={true}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="py-2 flex flex-row gap-2">
                      <label
                        className="block text-sm font-medium w-4/12 text-gray-700 dark:text-gray-300"
                        htmlFor="phoneNumber"
                      >
                        Phone Number
                      </label>
                      <Field
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        placeholder="123-456-7890"
                        className={`form-input w-8/12 ${
                          true ? "text-gray-500" : ""
                        } ${
                          touched.phoneNumber && errors.phoneNumber
                            ? "border-red-500"
                            : ""
                        }`}
                        disabled={true}
                      />
                      <ErrorMessage
                        name="phoneNumber"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="py-2 flex flex-row gap-2">
                      <label
                        className="block text-sm font-medium w-4/12 text-gray-700 dark:text-gray-300"
                        htmlFor="gender"
                      >
                        Gender
                      </label>
                      <Field
                        as="select"
                        id="gender"
                        name="gender"
                        className={`form-select w-8/12 ${
                          touched.gender && errors.gender
                            ? "border-red-500"
                            : ""
                        }`}
                        disabled={true}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Field>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="py-2 flex flex-row gap-2">
                      <label
                        className="block text-sm font-medium w-4/12 text-gray-700 dark:text-gray-300"
                        htmlFor="dob"
                      >
                        Date of Birth
                      </label>
                      <Field
                        id="dob"
                        name="dob"
                        type="date"
                        className={`form-input w-8/12 ${
                          touched.dob && errors.dob ? "border-red-500" : ""
                        }`}
                        disabled={true}
                      />
                      <ErrorMessage
                        name="dob"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="py-2 flex flex-row gap-2">
                      <label
                        className="block text-sm font-medium w-4/12 text-gray-700 dark:text-gray-300"
                        htmlFor="nationality"
                      >
                        Nationality
                      </label>
                      <Field
                        id="nationality"
                        name="nationality"
                        type="text"
                        placeholder="Nationality"
                        className={`form-input w-8/12 ${
                          true ? "text-gray-500" : ""
                        } ${
                          touched.nationality && errors.nationality
                            ? "border-red-500"
                            : ""
                        }`}
                        disabled={true}
                      />
                      <ErrorMessage
                        name="nationality"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="py-2 flex flex-row gap-2">
                      <label
                        className="block text-sm font-medium w-4/12 text-gray-700 dark:text-gray-300"
                        htmlFor="rssbNo"
                      >
                        RSSB No
                      </label>
                      <Field
                        id="rssbNo"
                        name="rssbNo"
                        type="text"
                        placeholder="RSSB No"
                        className={`form-input w-8/12 ${
                          true ? "text-gray-500" : ""
                        } ${
                          touched.rssbNo && errors.rssbNo
                            ? "border-red-500"
                            : ""
                        }`}
                        disabled={true}
                      />
                      <ErrorMessage
                        name="rssbNo"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="py-2 flex flex-row gap-2">
                      <label
                        className="block text-sm font-medium w-4/12 text-gray-700 dark:text-gray-300"
                        htmlFor="status"
                      >
                        Status
                      </label>
                      <Field
                        id="status"
                        name="status"
                        type="text"
                        placeholder="Status"
                        className={`form-input w-8/12 ${
                          true ? "text-gray-500" : ""
                        } ${
                          touched.status && errors.status
                            ? "border-red-500"
                            : ""
                        }`}
                        disabled={true}
                      />
                      <ErrorMessage
                        name="status"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="py-2 flex flex-row gap-2">
                      <label
                        className="block text-sm font-medium w-4/12 text-gray-700 dark:text-gray-300"
                        htmlFor="idNumber"
                      >
                        ID Number
                      </label>
                      <Field
                        id="idNumber"
                        name="idNumber"
                        type="text"
                        placeholder="ID Number"
                        className={`form-input w-8/12 w-8/12 ${
                          true ? "text-gray-500" : ""
                        } ${
                          touched.idNumber && errors.idNumber
                            ? "border-red-500"
                            : ""
                        }`}
                        disabled={true}
                      />
                      <ErrorMessage
                        name="idNumber"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="py-2 flex flex-row gap-2">
                      <label
                        className="block text-sm font-medium w-4/12 text-gray-700 dark:text-gray-300"
                        htmlFor="address"
                      >
                        Address
                      </label>
                      <Field
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Address"
                        className={`form-input w-8/12 ${
                          true ? "text-gray-500" : ""
                        } ${
                          touched.address && errors.address
                            ? "border-red-500"
                            : ""
                        }`}
                        disabled={true}
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
