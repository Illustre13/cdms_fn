import { Formik, Field, ErrorMessage } from "formik";
import { Form } from "react-router-dom";
import {
  capacityPlanInitialValues,
  capacityPlanValidation,
} from "../../components/CapacityPlan/CapacityPlanSchema";
import { GenerateReport } from "../../components/GenerateReport";
import IconDownload from "../../components/Icon/IconDownload";
import { CapacityPlanStatus } from "../../util/enum";
import IconEdit from "../../components/Icon/IconEdit";
import { useState } from "react";

export interface ICapacityPlanFormProps {
  setCapacityPlanData?: (data: any) => void;
  formRef?: any;
  capacityPlanData?: any;
}

const levelOptions = [
  { value: "", label: "Select level" },
  { value: "INDIVIDUAL", label: "Individual" },
  { value: "INSTITUTIONAL", label: "Institutional" },
  { value: "ORGANIZATIONAL", label: "Organizational" },
];

export const CapacityPlanForm: React.FC<ICapacityPlanFormProps> = ({
  setCapacityPlanData = () => {},
  formRef,
  capacityPlanData,
}) => {
  const handleSave = (values: any) => {
    setCapacityPlanData(values);
  };

  const [isEditingMode, setIsEditingMode] = useState(false);

  const statusOptions = [
    { value: "", label: "All" },
    { value: CapacityPlanStatus.APPROVED, label: "Approved" },
    { value: CapacityPlanStatus.DRAFT, label: "Draft" },
    { value: CapacityPlanStatus.REJECTED, label: "Rejected" },
    { value: CapacityPlanStatus.SENT, label: "Sent" },
    { value: CapacityPlanStatus.UNDER_REVIEW, label: "Under Review" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex  gap-4 relative justify-end">
        <GenerateReport
          link={`/report/cp/details/${capacityPlanData?.id}`}
          className="bg-cdms_primary hover:opacity-90 focus:ring-transparent focus:outline-none w-48 lg:h-8 rounded-lg p-0"
          buttonText="Generate Report"
          params={``}
          icon={IconDownload}
        />

        <div className="flex flex-row items-center gap-4 justify-center">
          {/* Submit button */}
          {isEditingMode && (
            <div className="sm:col-span-2 flex justify-end">
              <button
                type="submit"
                className={`bg-cdms_primary text-center text-sm text-white px-4 h-8 rounded-md hover:bg-cdms_secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
              >
                Save
              </button>
            </div>
          )}
          <div onClick={() => setIsEditingMode(!isEditingMode)}>
            <IconEdit className="w-8 h-8 cursor-pointer" />
          </div>
        </div>
      </div>
      <Formik
        innerRef={formRef}
        initialValues={capacityPlanInitialValues(capacityPlanData)}
        validationSchema={capacityPlanValidation}
        onSubmit={handleSave}
      >
        {({ errors, touched, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="p-4 grid grid-cols-2 gap-4">
              {/* Title input field */}
              <div className="py-2 flex flex-row gap-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 w-3/12"
                >
                  Title:
                </label>
                <div className="w-9/12">
                  <Field
                    name="title"
                    type="text"
                    id="title"
                    placeholder="Enter capacity plan title"
                    className={`form-input ${
                      !isEditingMode ? "text-gray-500" : ""
                    } ${touched.title && errors.title ? "border-red-500" : ""}`}
                    disabled={!isEditingMode}
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>
              </div>

              {/* Description input field */}
              <div className="py-2 flex flex-row gap-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 w-3/12"
                >
                  Description:
                </label>
                <div className="w-9/12">
                  <Field
                    name="description"
                    as="textarea"
                    id="description"
                    placeholder="Enter capacity plan description"
                    className={`form-input ${
                      !isEditingMode ? "text-gray-500" : ""
                    } ${
                      touched.description && errors.description
                        ? "border-red-500"
                        : ""
                    }`}
                    disabled={!isEditingMode}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>
              </div>

              {/* Year input field */}
              <div className="py-2 flex flex-row gap-2">
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700 w-3/12"
                >
                  Year:
                </label>
                <div className="w-9/12">
                  <Field
                    name="year"
                    type="number"
                    id="year"
                    placeholder="Enter year"
                    className={`form-input ${
                      !isEditingMode ? "text-gray-500" : ""
                    } ${touched.year && errors.year ? "border-red-500" : ""}`}
                    disabled={!isEditingMode}
                  />
                  <ErrorMessage
                    name="year"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>
              </div>

              {/* Status select field */}
              <div className="py-2 flex flex-row gap-2">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 w-3/12"
                >
                  Status:
                </label>
                <div className="w-9/12">
                  <Field
                    name="status"
                    as="select"
                    id="status"
                    className={`form-input ${
                      !isEditingMode ? "text-gray-500" : ""
                    } ${
                      touched.status && errors.status ? "border-red-500" : ""
                    }`}
                    disabled={!isEditingMode}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>
              </div>

              {/* Program input field */}
              <div className="py-2 flex flex-row gap-2">
                <label
                  htmlFor="program"
                  className="block text-sm font-medium text-gray-700 w-3/12"
                >
                  Program:
                </label>
                <div className="w-9/12">
                  <Field
                    name="program"
                    type="text"
                    id="program"
                    placeholder="Enter program"
                    className={`form-input ${
                      !isEditingMode ? "text-gray-500" : ""
                    } ${
                      touched.program && errors.program ? "border-red-500" : ""
                    }`}
                    disabled={!isEditingMode}
                  />
                  <ErrorMessage
                    name="program"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>
              </div>

              {/* SubProgram input field */}
              <div className="py-2 flex flex-row gap-2">
                <label
                  htmlFor="subProgram"
                  className="block text-sm font-medium text-gray-700 w-3/12"
                >
                  SubProgram:
                </label>
                <div className="w-9/12">
                  <Field
                    name="subProgram"
                    type="text"
                    id="subProgram"
                    placeholder="Enter subProgram"
                    className={`form-input ${
                      !isEditingMode ? "text-gray-500" : ""
                    } ${
                      touched.subProgram && errors.subProgram
                        ? "border-red-500"
                        : ""
                    }`}
                    disabled={!isEditingMode}
                  />
                  <ErrorMessage
                    name="subProgram"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>
              </div>

              {/* Budget input field */}
              <div className="py-2 flex flex-row gap-2">
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-gray-700 w-3/12"
                >
                  Budget:
                </label>
                <div className="w-9/12">
                  <Field
                    name="budget"
                    type="number"
                    id="budget"
                    placeholder="Enter budget amount"
                    className={`form-input ${
                      !isEditingMode ? "text-gray-500" : ""
                    } ${
                      touched.budget && errors.budget ? "border-red-500" : ""
                    }`}
                    disabled={!isEditingMode}
                  />
                  <ErrorMessage
                    name="budget"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>
              </div>

              {/* Currency select field */}
              <div className="py-2 flex flex-row gap-2">
                <label
                  htmlFor="currency"
                  className="block text-sm font-medium text-gray-700 w-3/12"
                >
                  Currency:
                </label>
                <div className="w-9/12">
                  <Field
                    name="currency"
                    as="select"
                    id="currency"
                    className={`form-input ${
                      !isEditingMode ? "text-gray-500" : ""
                    } ${
                      touched.currency && errors.currency
                        ? "border-red-500"
                        : ""
                    }`}
                    disabled={!isEditingMode}
                  >
                    {/* Add currency options here */}
                    <option value="USD">USD</option>
                    <option value="RWF">RWF</option>
                    <option value="EUR">EUR</option>
                  </Field>
                  <ErrorMessage
                    name="currency"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
