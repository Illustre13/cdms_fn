import { Formik, Field, ErrorMessage } from "formik";
import { Form } from "react-router-dom";
import { useRef } from "react";
import {
  capacityPlanInitialValues,
  capacityPlanValidation,
} from "../../components/CapacityPlan/CapacityPlanSchema";
import { CapacityPlanStatus } from "../../util/enum";

export interface ICapacityPlanFormProps {
  setCapacityPlanData?: (data: any) => void;
  formRef?: any;
}

// // Status options
// const statusOptions = [
//   { value: "", label: "All" },
//   { value: CapacityPlanStatus.DRAFT, label: "Draft" },
//   { value: CapacityPlanStatus.SENT, label: "Sent" },
//   { value: CapacityPlanStatus.APPROVED, label: "Approved" },
//   { value: CapacityPlanStatus.REJECTED, label: "Rejected" },
//   { value: CapacityPlanStatus.UNDER_REVIEW, label: "Under Review" },
// ];

// Define level options
const levelOptions = [
  { value: "", label: "Select level" },
  { value: "INDIVIDUAL", label: "Individual" },
  { value: "INSTITUTIONAL", label: "Institutional" },
  { value: "ORGANIZATIONAL", label: "Organizational" },
];

export const CapacityPlanForm: React.FC<ICapacityPlanFormProps> = ({
  setCapacityPlanData = () => {},
  formRef,
}) => {
  const handleSave = (values: any) => {
    console.log("VALUES ---> ", values);
    setCapacityPlanData(values);
  };

  return (
    <Formik
      innerRef={formRef}
      initialValues={capacityPlanInitialValues}
      validationSchema={capacityPlanValidation}
      onSubmit={handleSave}
    >
      {({ errors, touched, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div className="p-4">
            {/* Title input field */}
            <div className="py-2 flex flex-row gap-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 w-3/12"
              >
                Title:
              </label>
              <div
                className={
                  touched.title && errors.title ? "has-error w-9/12" : "w-9/12"
                }
              >
                <Field
                  name="title"
                  type="text"
                  id="title"
                  placeholder="Enter capacity plan title"
                  className="flex-1 form-input"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-align-left text-danger mt-1"
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
              <div
                className={
                  touched.description && errors.description
                    ? "has-error w-9/12"
                    : "w-9/12"
                }
              >
                <Field
                  name="description"
                  type="textarea"
                  id="description"
                  placeholder="Enter capacity plan description"
                  className="flex-1 form-input"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
            </div>

            {/* Type select field */}
            <div className="py-2 flex flex-row gap-2">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 w-3/12"
              >
                Type:
              </label>
              <div
                className={
                  touched.type && errors.type ? "has-error w-9/12" : "w-9/12"
                }
              >
                <Field
                  name="type"
                  as="select"
                  id="type"
                  className="flex-1 form-input"
                >
                  <option value="">Select type</option>
                  <option value="ANNUAL_PLAN">ANNUAL PLAN</option>
                  <option value="QUARTELY_PLAN">QUARTELY PLAN</option>
                  {/* Add other types as needed */}
                </Field>
                <ErrorMessage
                  name="type"
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
              <div
                className={
                  touched.year && errors.year ? "has-error w-9/12" : "w-9/12"
                }
              >
                <Field
                  name="year"
                  type="number"
                  id="year"
                  placeholder="Enter year"
                  className="flex-1 form-input"
                />
                <ErrorMessage
                  name="year"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
            </div>

            {/* Status select field */}
            {/* <div className="py-2 flex flex-row gap-2">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 w-3/12"
              >
                Status:
              </label>
              <div
                className={
                  touched.status && errors.status
                    ? "has-error w-9/12"
                    : "w-9/12"
                }
              >
                <Field
                  name="status"
                  as="select"
                  id="status"
                  className="flex-1 form-input"
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
            </div> */}

            {/* Attachment input field */}
            {/* <div className="py-2 flex flex-row gap-2">
              <label
                htmlFor="attachment"
                className="block text-sm font-medium text-gray-700 w-3/12"
              >
                Attachment:
              </label>
              <div className="w-9/12">
                <Field
                  name="attachment"
                  type="file"
                  id="attachment"
                  className="form-input"
                />
                <ErrorMessage
                  name="attachment"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
            </div> */}

            {/* Program input field */}
            <div className="py-2 flex flex-row gap-2">
              <label
                htmlFor="program"
                className="block text-sm font-medium text-gray-700 w-3/12"
              >
                Program:
              </label>
              <div
                className={
                  touched.program && errors.program
                    ? "has-error w-9/12"
                    : "w-9/12"
                }
              >
                <Field
                  name="program"
                  type="text"
                  id="program"
                  placeholder="Enter program"
                  className="flex-1 form-input"
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
              <div
                className={
                  touched.subProgram && errors.subProgram
                    ? "has-error w-9/12"
                    : "w-9/12"
                }
              >
                <Field
                  name="subProgram"
                  type="text"
                  id="subProgram"
                  placeholder="Enter subProgram"
                  className="flex-1 form-input"
                />
                <ErrorMessage
                  name="subProgram"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
            </div>

            {/* Output input field */}
            <div className="py-2 flex flex-row gap-2">
              <label
                htmlFor="output"
                className="block text-sm font-medium text-gray-700 w-3/12"
              >
                Output:
              </label>
              <div
                className={
                  touched.output && errors.output
                    ? "has-error w-9/12"
                    : "w-9/12"
                }
              >
                <Field
                  name="output"
                  type="text"
                  id="output"
                  placeholder="Enter output"
                  className="flex-1 form-input"
                />
                <ErrorMessage
                  name="output"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
            </div>

            {/* CapacityChallenge input field */}
            <div className="py-2 flex flex-row gap-2">
              <label
                htmlFor="capacityChallenge"
                className="block text-sm font-medium text-gray-700 w-3/12"
              >
                Capacity Challenge:
              </label>
              <div
                className={
                  touched.capacityChallenge && errors.capacityChallenge
                    ? "has-error w-9/12"
                    : "w-9/12"
                }
              >
                <Field
                  name="capacityChallenge"
                  type="text"
                  id="capacityChallenge"
                  placeholder="Enter capacity challenge"
                  className="flex-1 form-input"
                />
                <ErrorMessage
                  name="capacityChallenge"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
            </div>

            {/* Level input field */}
            <div className="py-2 flex flex-row gap-2">
              <label
                htmlFor="level"
                className="block text-sm font-medium text-gray-700 w-3/12"
              >
                Level:
              </label>
              <div
                className={
                  touched.level && errors.level
                    ? "has-error w-9/12"
                    : touched.level
                    ? "has-success w-9/12"
                    : "w-9/12"
                }
              >
                <Field
                  name="level"
                  as="select"
                  id="level"
                  className="flex-1 form-input"
                >
                  {levelOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="level"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
            </div>

            {/* Action input field */}
            <div className="py-2 flex flex-row gap-2">
              <label
                htmlFor="action"
                className="block text-sm font-medium text-gray-700 w-3/12"
              >
                Action:
              </label>
              <div
                className={
                  touched.action && errors.action
                    ? "has-error w-9/12"
                    : touched.action
                    ? "has-success w-9/12"
                    : "w-9/12"
                }
              >
                <Field
                  name="action"
                  type="text"
                  id="action"
                  placeholder="Enter action"
                  className="form-input"
                />
                <ErrorMessage
                  name="action"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
            </div>

            {/* Male participants input field */}
            <div className="py-2 flex flex-row gap-2">
              <label
                htmlFor="maleParticipants"
                className="block text-sm font-medium text-gray-700 w-3/12"
              >
                Male Participants:
              </label>
              <div
                className={
                  touched.maleParticipants && errors.maleParticipants
                    ? "has-error w-9/12"
                    : touched.maleParticipants
                    ? "has-success w-9/12"
                    : "w-9/12"
                }
              >
                <Field
                  name="maleParticipants"
                  type="text"
                  placeholder="Enter male participants"
                  className="form-input"
                />
                <ErrorMessage
                  name="maleParticipants"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
            </div>

            {/* Female participants input field */}
            <div className="py-2 flex flex-row gap-2">
              <label
                htmlFor="femaleParticipants"
                className="block text-sm font-medium text-gray-700 w-3/12"
              >
                Female Participants:
              </label>
              <div
                className={
                  touched.femaleParticipants && errors.femaleParticipants
                    ? "has-error w-9/12"
                    : touched.femaleParticipants
                    ? "has-success w-9/12"
                    : "w-9/12"
                }
              >
                <Field
                  name="femaleParticipants"
                  type="text"
                  placeholder="Enter female participants"
                  className="form-input"
                />
                <ErrorMessage
                  name="femaleParticipants"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
            </div>

            {/* Responsible Entity input field */}
            <div className="py-2 flex flex-row gap-2">
              <label
                htmlFor="responsibleEntity"
                className="block text-sm font-medium text-gray-700 w-3/12"
              >
                Responsible Entity:
              </label>
              <div
                className={
                  touched.responsibleEntity && errors.responsibleEntity
                    ? "has-error w-9/12"
                    : touched.responsibleEntity
                    ? "has-success w-9/12"
                    : "w-9/12"
                }
              >
                <Field
                  name="responsibleEntity"
                  type="text"
                  id="responsibleEntity"
                  placeholder="Enter responsible entity"
                  className="form-input"
                />
                <ErrorMessage
                  name="responsibleEntity"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
            </div>

            {/* Stakeholders input field */}
            <div className="py-2 flex flex-row gap-2">
              <label
                htmlFor="stakeholders"
                className="block text-sm font-medium text-gray-700 w-3/12"
              >
                Stakeholders:
              </label>
              <div
                className={
                  touched.stakeholders && errors.stakeholders
                    ? "has-error w-9/12"
                    : touched.stakeholders
                    ? "has-success w-9/12"
                    : "w-9/12"
                }
              >
                <Field
                  name="stakeholders"
                  type="text"
                  multiple
                  id="stakeholders"
                  placeholder="Select stakeholders"
                  className="form-input"
                />
                <ErrorMessage
                  name="stakeholders"
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
              <div
                className={
                  touched.budget && errors.budget
                    ? "has-error w-9/12"
                    : touched.budget
                    ? "has-success w-9/12"
                    : "w-9/12"
                }
              >
                <Field
                  name="budget"
                  type="number"
                  id="budget"
                  placeholder="Enter budget"
                  className="form-input"
                />
                <ErrorMessage
                  name="budget"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
            </div>

            {/* Currency input field */}
            <div className="py-2 flex flex-row gap-2">
              <label
                htmlFor="currency"
                className="block text-sm font-medium text-gray-700 w-3/12"
              >
                Currency:
              </label>
              <div
                className={
                  touched.currency && errors.currency
                    ? "has-error w-9/12"
                    : touched.currency
                    ? "has-success w-9/12"
                    : "w-9/12"
                }
              >
                <Field
                  name="currency"
                  as="select"
                  id="currency"
                  className="form-input"
                >
                  <option value="" label="Select currency" />
                  <option value="RWF" label="RWF" />
                  <option value="USD" label="USD" />
                  <option value="EUR" label="EUR" />
                </Field>
                <ErrorMessage
                  name="currency"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
            </div>

            {/* Fund Source input field */}
            <div className="py-2 flex flex-row gap-2">
              <label
                htmlFor="fundSource"
                className="block text-sm font-medium text-gray-700 w-3/12"
              >
                Source of fund :
              </label>
              <div
                className={
                  touched.fundSource && errors.fundSource
                    ? "has-error w-9/12"
                    : touched.fundSource
                    ? "has-success w-9/12"
                    : "w-9/12"
                }
              >
                <Field
                  name="fundSource"
                  type="text"
                  id="fundSource"
                  placeholder="Enter source of fund"
                  className="form-input"
                />
                <ErrorMessage
                  name="fundSource"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
            </div>

            {/* Capacity plan input field */}
            {/* <div className="py-2 flex flex-row gap-2">
              <label htmlFor="capacity plan" className="block text-sm font-medium text-gray-700 w-3/12">Capacity plan:</label>
              <div className={touched.capacity plan && errors.capacity plan ? "has-error w-9/12" : touched.capacity plan ? "has-success w-9/12" : "w-9/12"}>
                <Field name="capacity plan" type="text" id="capacity plan" placeholder="Enter capacity plan" className="form-input" />
                <ErrorMessage name="capacity plan" component="div" className="text-danger mt-1" />
              </div>
            </div> */}

            {/* Training input field */}
            {/* <div className="py-2 flex flex-row gap-2">
              <label htmlFor="training" className="block text-sm font-medium text-gray-700 w-3/12">Training:</label>
              <div className={touched.training && errors.training ? "has-error w-9/12" : touched.training ? "has-success w-9/12" : "w-9/12"}>
                <Field name="training" as="textarea" id="training" placeholder="Enter training details" className="form-input" />
                <ErrorMessage name="training" component="div" className="text-danger mt-1" />
              </div>
            </div> */}

            {/* Submit button */}
            {/* <div className="py-2 flex flex-row justify-end">
              <button type="submit" className="btn btn-primary">Save</button>
            </div> */}
          </div>
        </Form>
      )}
    </Formik>
  );
};
