import * as Yup from "yup";
import { TrainingMode, TrainingStatus } from "../../util/enum";

// Define the initial values for the training form
export const trainingInitialValues = (data: trainingInfo) => {
  return {
    action: data.action ?? "",
    status: data.status ?? "",
    mode: data.mode ?? "",
    maleParticipants: data.participants?.males ?? 0,
    femaleParticipants: data.participants?.females ?? 0,
    startDate: data.startDate ?? undefined,
    endDate: data.endDate ?? undefined,
    budgetAmount: data.budget ?? 0,
    currency: data.currency ?? "",
    type: data.type ?? "",
    program: data.program ?? "",
    subProgram: data.subProgram ?? "",
    output: data.output ?? "",
    capacityChallenge: data.capacityChallenge ?? "",
    level: data.level ?? "",
    responsibleEntity: data.responsibleEntity ?? "",
    stakeholders: data.stakeholders ?? [],
    fundSource: data.fundSource ?? "",
  };
};

// Validation schema for the training form
export const trainingValidationSchema = Yup.object().shape({
  action: Yup.string().required("Action is required"),
  status: Yup.string()
    .oneOf(Object.values(TrainingStatus), "Invalid status")
    .required("Status is required"),
  mode: Yup.string()
    .oneOf(Object.values(TrainingMode), "Invalid mode")
    .required("Mode is required"),
  maleParticipants: Yup.number()
    .positive("Number of male participants must be positive")
    .required("Number of male participants is required"),
  femaleParticipants: Yup.number()
    .positive("Number of female participants must be positive")
    .required("Number of female participants is required"),
  startDate: Yup.date().nullable().required("Start date is required"),
  endDate: Yup.date()
    .nullable()
    .min(Yup.ref("startDate"), "End date cannot be before start date")
    .required("End date is required"),
  budgetAmount: Yup.number()
    .positive("Budget amount must be positive")
    .required("Budget amount is required"),
  type: Yup.string().required("Type is required"),
  program: Yup.string().required("Program is required"),
  subProgram: Yup.string().required("SubProgram is required"),
  output: Yup.string().required("Output is required"),
  capacityChallenge: Yup.string().required("Capacity Challenge is required"),
  level: Yup.string().required("Level is required"),
  responsibleEntity: Yup.string().required("Responsible Entity is required"),
  stakeholders: Yup.array().of(Yup.string()).required("Stakeholders are required"),
  fundSource: Yup.string().required("Fund Source is required"),
});

// Validation schema for employee training
export const employeeTrainingVS = Yup.object().shape({
  allParticipants: Yup.array().of(Yup.string()).required("Employee names are required"),
});

// Function to transform employee training data
export const employeeTrainingIV = (data: any) => {
  return {
    employeeNames: (data || []).map((et: any) => ({
      value: et?.id,
      label: et?.employeeNames,
    })) ?? [],
  };
};
