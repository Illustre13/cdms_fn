import * as Yup from "yup";

export const loginInitialValues = {
  email: "",
  password: "",
};

export const capacityPlanInitialValues = (capacityPlanData: capacityplanInfo) => ({
  title: capacityPlanData?.title || "",
  description: capacityPlanData?.description || "",
  year: new Date().getFullYear(),
  status: capacityPlanData?.status || "",
  attachment: undefined,
  program: capacityPlanData?.training![0]?.program || "",
  subProgram: capacityPlanData?.training![0]?.subProgram || "",
  output: capacityPlanData?.training![0]?.subProgram || "",
  capacityChallenge: capacityPlanData?.training![0]?.subProgram || "",
  level: capacityPlanData?.level || "",
  action: capacityPlanData?.training![0]?.action || "",
  maleParticipants: capacityPlanData?.training![0]?.participants.males || "",
  femaleParticipants: capacityPlanData?.training![0]?.participants?.females || "",
  responsibleEntity: capacityPlanData?.training![0]?.responsibleEntity || "",
  stakeholders: capacityPlanData?.training![0]?.stakeholders || "",
  budget: capacityPlanData?.training?.reduce((total, training) => {
    return total + (training.budget || 0);
  }, 0).toFixed(0).toString().toLocaleString() || 0,
  currency: capacityPlanData?.training![0].currency || "",
  fundSource: capacityPlanData?.training![0].fundSource || "",
  organization: capacityPlanData?.organization,
  training: capacityPlanData?.training,
});
export const capacityPlanValidation = Yup.object().shape({
  title: Yup.string().required("Title is required"),

  description: Yup.string().optional(),

  type: Yup.string().required("Type is required"),

  year: Yup.number()
    .required("Year is required")
    .typeError("Year must be a valid number")
    .positive("Year must be a positive number")
    .integer("Year must be an integer"),

  program: Yup.string().required("Program is required"),

  subProgram: Yup.string().required("Sub-program is required"),

  output: Yup.string().required("Output is required"),

  capacityChallenge: Yup.string().required("Capacity challenge is required"),

  level: Yup.string().required("Level is required"),

  action: Yup.string().required("Action is required"),

  maleParticipants: Yup.number()
    .required("Male participants count is required")
    .typeError("Male participants must be a valid number")
    .positive("Male participants must be a positive number"),

  femaleParticipants: Yup.number()
    .required("Female participants count is required")
    .typeError("Female participants must be a valid number")
    .positive("Female participants must be a positive number"),

  responsibleEntity: Yup.string().required("Responsible entity is required"),

  stakeholders: Yup.string().required("Stakeholders information is required"),

  budget: Yup.number()
    .required("Budget is required")
    .typeError("Budget must be a valid number")
    .positive("Budget must be a positive number"),

  currency: Yup.string().required("Currency is required"),

  fundSource: Yup.string().required("Fund source is required"),
});
