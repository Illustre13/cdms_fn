import { Formik, Field, ErrorMessage } from "formik";
import { Form } from "react-router-dom";
import {
  employeeTrainingIV,
  employeeTrainingVS,
  trainingInitialValues,
  trainingValidationSchema,
} from "../../components/CapacityPlan/TrainingSchema";
import { TrainingMode, TrainingStatus } from "../../util/enum";

export interface ITrainingFormProps {
  trainingData: trainingInfo;
  isEditing?: boolean;
  TrainingFormRef?: any;
  employeeTrainingForm?: any;
  employeeData: any;
  setEmployeeData?: (data: any) => void;
  setTrainingDataInfo?: (data: any) => void;
}

const statusOptions = [
  { value: TrainingStatus.APPROVED, label: "Approved" },
  { value: TrainingStatus.FINISHED, label: "Finished" },
  { value: TrainingStatus.PENDING, label: "Pending" },
  { value: TrainingStatus.REJECTED, label: "Rejected" },
];
const modeOptions = [
  { value: TrainingMode.PHYSICAL, label: "Physical" },
  { value: TrainingMode.VIRTUAL, label: "Virtual" },
  { value: TrainingMode.HYBRID, label: "Hybrid" },
];

const currencyOptions = [
  { value: "", label: "Select currency" },
  { value: "RWF", label: "RWF" },
];

export const TrainingForm: React.FC<ITrainingFormProps> = ({
  trainingData,
  employeeData,
  isEditing = false,
  setTrainingDataInfo = () => {},
  TrainingFormRef,
  employeeTrainingForm,
  setEmployeeData = () => {},
}) => {
  const handleSaveTraining = (values: any) => {
    setTrainingDataInfo(values);
  };

  const handleSaveEmployeeTraining = (values: any) => {
    setEmployeeData(values);
  };

  console.log("----------------------------->>", employeeData);
  console.log(trainingData);

  return (
    <>
      <Formik
        innerRef={TrainingFormRef}
        initialValues={trainingInitialValues(trainingData)}
        validationSchema={trainingValidationSchema}
        onSubmit={handleSaveTraining}
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
                    disabled={!isEditing}
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
                    as="select"
                    name="status"
                    id="status"
                    className={`form-input w-full ${
                      !isEditing ? "bg-gray-200" : ""
                    }`}
                    disabled={!isEditing}
                  >
                    <option value="" label="Select status" />
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
                    disabled={!isEditing}
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
                    disabled={!isEditing}
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
                    as="select"
                    name="mode"
                    id="mode"
                    className={`form-input w-full ${
                      !isEditing ? "bg-gray-200" : ""
                    }`}
                    disabled={!isEditing}
                  >
                    <option value="" label="Select training mode" />
                    {modeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
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
                      as="select"
                      id="currency"
                      className={`form-input w-full ${
                        !isEditing ? "bg-gray-200 cursor-not-allowed" : ""
                      }`}
                      disabled={!isEditing}
                    >
                      {currencyOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
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
                      disabled={!isEditing}
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
                    disabled={!isEditing}
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
      <Formik
        innerRef={employeeTrainingForm}
        initialValues={employeeTrainingIV(employeeData?.employeeTrainings)}
        validationSchema={employeeTrainingVS}
        onSubmit={handleSaveEmployeeTraining}
      >
        {({ errors, touched, handleSubmit, values, setFieldValue }) => (
          <Form>
            <div className="p-4 grid grid-cols-2 gap-4">
              {/* All Participants */}
              <div className="py-2 flex flex-row gap-2">
                <label
                  htmlFor="employeeNames"
                  className="block text-left w-3/12 text-sm font-medium text-gray-700"
                >
                  All Participants ({employeeData?.employeeTrainings.length}):
                </label>
                <div
                  className={`w-9/12 ${
                    touched.employeeNames && errors.employeeNames
                      ? "has-error"
                      : ""
                  }`}
                >
                  {isEditing ? (
                    <Field
                      as="select"
                      name="allParticipants"
                      id="allParticipants"
                      className="form-input w-full"
                      multiple
                      onChange={(event: any) => {
                        const options = Array.from(
                          event.target.selectedOptions,
                          (option: any) => option.value
                        );
                        setFieldValue("allParticipants", options);
                      }}
                    >
                      <option value="" label="Select Employees" />
                      {(employeeData?.employeeTrainings || []).map(
                        (item: any) => (
                          <option
                            key={item?.employee?.id}
                            value={item?.employee?.id}
                          >
                            {item?.employeeNames || ""}
                          </option>
                        )
                      )}
                    </Field>
                  ) : (
                    <div className="bg-gray-200 p-2">
                      {employeeData?.employeeTrainings?.map(
                        (item: any, index: number) => (
                          <div key={index}>
                            {/* Assuming employeeNames is an array */}
                            {item?.employeeNames}
                          </div>
                        )
                      )}
                    </div>
                  )}

                  <ErrorMessage
                    name="allParticipants"
                    component="div"
                    className="text-danger mt-1"
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
