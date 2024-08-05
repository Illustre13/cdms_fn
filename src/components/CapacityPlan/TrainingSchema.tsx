import * as Yup from "yup";
import { TrainingMode, TrainingStatus } from "../../util/enum";

export const trainingInitialValues = (data: trainingInfo) => {
  return {
    title: data.title ?? "",
    status: data.status ?? "",
    mode: data.mode ?? "",
    maleParticipants: data.participants?.males ?? {},
    femaleParticipants: data.participants?.females ?? {},
    startDate: data.startDate ?? undefined,
    endDate: data.endDate ?? undefined,
    budgetAmount: data.budgetAmount.toLocaleString() ?? 0,
    currency: data.currency,
  };
};

export const trainingValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
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
  budgetAmount: Yup.string()
    .required("Budget amount is required"),
});

export const employeeTrainingVS = Yup.object().shape({
    allParticipants: Yup.array().of(Yup.string()).required("Employee names are required"),
  });  
  
export const employeeTrainingIV = (data: any) => {
    return {
        employeeNames: (data || []).map((et: any) => ({
            value: et?.id,
            label: et?.employeeNames
        })) ?? [],
    };
  };