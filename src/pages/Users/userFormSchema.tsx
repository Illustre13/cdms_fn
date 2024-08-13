import { capitalize } from "lodash";
import * as Yup from "yup";

export const userInfoIV = (data: IUserInfo, empInfo: IworkInfo) => {
  return {
    firstName: data?.firstName || "",
    middleName: data?.middleName || "",
    lastName: data?.lastName || "",
    email: data?.email || "",
    phoneNumber: data?.phoneNumber || "",
    gender: data?.gender || "",
    dob: data?.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
    nationality: data?.nationality || "",
    profileImage: data?.profileImage || "",
    rssbNo: data?.rssbNo || "",
    status: data?.status || "",
    idNumber: data?.idNumber || "",
    address: data?.address || "",
    organization:
      `${empInfo?.organization?.name} - (${empInfo?.organization?.displayName})` ||
      "",
    department: empInfo?.department || "",
    position: empInfo?.position || "",
    roleName: `${capitalize(empInfo?.role?.name)}` || "",
    roleDescription: empInfo?.role?.description || "",
  };
};

export const userInfoValidationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  middleName: Yup.string(),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.date().required("Date of birth is required").nullable(),
  nationality: Yup.string(),
  profileImage: Yup.string(),
  rssbNo: Yup.string(),
  status: Yup.string().required("Status is required"),
  idNumber: Yup.string(),
  address: Yup.string(),
  department: Yup.string().required("Department is required."),
  position: Yup.string().required("Position is required."),
  roleName: Yup.string().required("Role name is required."),
  roleDescription: Yup.string().required("Role description is required."),
});
