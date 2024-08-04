import { Formik, Field, ErrorMessage } from "formik";
import { Form } from "react-router-dom";
import {
  trainingInitialValues,
  trainingValidationSchema,
} from "../../components/CapacityPlan/TrainingSchema"; 
import { TrainingStatus } from "../../util/enum";

export interface ITrainingFormProps {
  trainingData: trainingInfo;
  isEditing?: boolean;
}

const statusOptions = [
  { value: "", label: "Select status" },
  { value: TrainingStatus.APPROVED, label: "Approved" },
  { value: TrainingStatus.FINISHED, label: "Finished" },
  { value: TrainingStatus.PENDING, label: "Pending" },
  { value: TrainingStatus.REJECTED, label: "Rejected" },
];

const levelOptions = [
  { value: "", label: "Select level" },
  { value: "INDIVIDUAL", label: "Individual" },
  { value: "INSTITUTIONAL", label: "Institutional" },
  { value: "ORGANIZATIONAL", label: "Organizational" },
];

export const TrainingForm: React.FC<ITrainingFormProps> = ({
  trainingData,
  isEditing=false, 
}) => {
  const handleSave = () => {
    // console.log("VALUES ---> ", values);
    // setTrainingData(values);
  };

  return (
    <Formik
      initialValues={trainingInitialValues(trainingData)}
      validationSchema={trainingValidationSchema}
      onSubmit={handleSave}
    >
      {({ errors, touched, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div className="p-4 grid grid-cols-2 gap-4">
            {/* Title input field */}
            <div className="py-2 flex flex-row gap-2">
              <label
                htmlFor="title"
                className="block text-left w-3/12 text-sm font-medium text-gray-700"
              >
                Title:
              </label>
              <div
                className={`w-9/12 ${
                  touched.title && errors.title ? "has-error" : ""
                }`}
              >
                <Field
                  name="title"
                  type="text"
                  id="title"
                  placeholder="Enter training title"
                      className={`form-input w-full ${
                    !isEditing ? "bg-gray-200" : ""
                  }`}
                  disabled={!isEditing} // Disable based on isEditing
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
            </div>

            {/* Status input field */}
            <div className="py-2 flex flex-row gap-2">
              <label
                htmlFor="status"
                className="block text-left w-3/12 text-sm font-medium text-gray-700"
              >
                Status:
              </label>
              <div
                className={`w-9/12 ${
                  touched.status && errors.status ? "has-error" : ""
                }`}
              >
                <Field
                  name="status"
                  type="text"
                  id="status"
                  placeholder="Enter training status"
                      className={`form-input w-full ${
                    !isEditing ? "bg-gray-200" : ""
                  }`}
                  disabled={!isEditing} // Disable based on isEditing
                />
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
            </div>

            {/* Start Date input field */}
            <div className="py-2 flex flex-row gap-2">
              <label
                htmlFor="startDate"
                className="block text-left w-3/12 text-sm font-medium text-gray-700"
              >
                Start Date:
              </label>
              <div
                className={`w-9/12 ${
                  touched.startDate && errors.startDate ? "has-error" : ""
                }`}
              >
                <Field
                  name="startDate"
                  type="date"
                  id="startDate"
                      className={`form-input w-full ${
                    !isEditing ? "bg-gray-200" : ""
                  }`}
                  disabled={!isEditing} // Disable based on isEditing
                />
                <ErrorMessage
                  name="startDate"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
            </div>

            {/* End Date input field */}
            <div className="py-2 flex flex-row gap-2">
              <label
                htmlFor="endDate"
                className="block text-left w-3/12 text-sm font-medium text-gray-700"
              >
                End Date:
              </label>
              <div
                className={`w-9/12 ${
                  touched.endDate && errors.endDate ? "has-error" : ""
                }`}
              >
                <Field
                  name="endDate"
                  type="date"
                  id="endDate"
                      className={`form-input w-full ${
                    !isEditing ? "bg-gray-200" : ""
                  }`}
                  disabled={!isEditing} // Disable based on isEditing
                />
                <ErrorMessage
                  name="endDate"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
            </div>

            {/* Mode input field */}
            <div className="py-2 flex flex-row gap-2">
              <label
                htmlFor="mode"
                className="block text-left w-3/12 text-sm font-medium text-gray-700"
              >
                Mode:
              </label>
              <div
                className={`w-9/12 ${
                  touched.mode && errors.mode ? "has-error" : ""
                }`}
              >
                <Field
                  name="mode"
                  type="text"
                  id="mode"
                  placeholder="Enter Mode"
                      className={`form-input w-full ${
                    !isEditing ? "bg-gray-200" : ""
                  }`}
                  disabled={!isEditing} // Disable based on isEditing
                />
                <ErrorMessage
                  name="mode"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
            </div>

            {/* Budget Amount input field */}
            <div className="py-2 flex flex-row gap-2">
              <label
                htmlFor="budgetAmount"
                className="block text-left w-3/12 text-sm font-medium text-gray-700"
              >
                Budget Amount:
              </label>
              <div className="w-9/12 flex gap-2">
                <div
                  className={`w-6/12 ${
                    touched.currency && errors.currency ? "has-error" : ""
                  }`}
                >
                  <Field
                    name="currency"
                    type="text"
                    id="currency"
                    placeholder="Enter currency amount"
                        className={`form-input w-full ${
                    !isEditing ? "bg-gray-200" : ""
                  }`}
                    disabled={!isEditing} // Disable based on isEditing
                  />
                  <ErrorMessage
                    name="currency"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>
                <div
                  className={`w-6/12 ${
                    touched.budgetAmount && errors.budgetAmount
                      ? "has-error"
                      : ""
                  }`}
                >
                  <Field
                    name="budgetAmount"
                    type="text"
                    id="budgetAmount"
                    placeholder="Enter budget amount"
                        className={`form-input w-full ${
                    !isEditing ? "bg-gray-200" : ""
                  }`}
                    disabled={!isEditing} // Disable based on isEditing
                  />
                  <ErrorMessage
                    name="budgetAmount"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Male Participants input field */}
            <div className="py-2 flex flex-row gap-2">
              <label
                htmlFor="maleParticipants"
                className="block text-left w-3/12 text-sm font-medium text-gray-700"
              >
                Male Participants:
              </label>
              <div
                className={`w-9/12 ${
                  touched.maleParticipants && errors.maleParticipants
                    ? "has-error"
                    : ""
                }`}
              >
                <Field
                  name="maleParticipants"
                  type="text"
                  id="maleParticipants"
                  placeholder="Enter male participants"
                      className={`form-input w-full ${
                    !isEditing ? "bg-gray-200" : ""
                  }`}
                  disabled={!isEditing} // Disable based on isEditing
                />
                <ErrorMessage
                  name="maleParticipants"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
            </div>

            {/* Female Participants input field */}
            <div className="py-2 flex flex-row gap-2">
              <label
                htmlFor="femaleParticipants"
                className="block text-left w-3/12 text-sm font-medium text-gray-700"
              >
                Female Participants:
              </label>
              <div
                className={`w-9/12 ${
                  touched.femaleParticipants && errors.femaleParticipants
                    ? "has-error"
                    : ""
                }`}
              >
                <Field
                  name="femaleParticipants"
                  type="text"
                  id="femaleParticipants"
                  placeholder="Enter female participants"
                  className={`form-input w-full ${
                    !isEditing ? "bg-gray-200" : ""
                  }`}
                  disabled={!isEditing}
                />
                <ErrorMessage
                  name="femaleParticipants"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
