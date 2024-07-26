import * as Yup from "yup";

export const loginInitialValues = {
  email: "",
  password: "",
};

export const capacityPlanInitialValues = {
  title: "",
  description: "",
  type: "",
  year: new Date().getFullYear(),
  // status: "",
  attachment: undefined,
  program: "",
  subProgram: "",
  output: "",
  capacityChallenge: "",
  level: "",
  action: "",
  maleParticipants: "",
  femaleParticipants: "",
  responsibleEntity: "",
  stakeholders: "",
  budget: 0,
  currency: "",
  fundSource: "",
  organization: null,
  training: [],
};
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
