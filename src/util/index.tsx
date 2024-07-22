type CapacityPlanLevel = "INDIVIDUAL" | "INSTITUTIONAL" | "ORGANIZATIONAL";
type CapacityPlanStatus = "PENDING" | "ACTIVE" | "SUSPENDED";
type CapacityPlanType = "ANNUAL_PLAN" | "QUARTELY_PLAN" | "ESSENTIAL_PLAN";
interface ResponseData {
  data: object;
  error: boolean;
  loading: boolean;
  status: null | string;
}
interface StateResponseData {
  data: any;
  error: boolean;
  loading: boolean;
  status: null | string | number;
  state?: string;
  message?: string;
}

interface IPersonalInfo {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dob: Date;
  nationality: string;
  profileImage: string;
  rssbNo: string;
  idNumber: string;
  address: string;
  password: string;
  confirmPassword: string;
}

type PersonalInfoFormProps<PersonalInfo> = {
  onSubmit: PersonalInfo;
};

interface userInfo {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dob?: string;
  nationality?: string;
  profileImage?: string;
  rssbNo: string;
  idNumber?: string;
  address?: string;
  // password: string;
  // confirmPassword?: string;
}
interface organizationInfo {
  name: string;
  displayName?: string;
  logoUrl?: string;
  aboutUs?: string;
  mission?: string;
  vision?: string;
  industry: string;
  address: string;
  phoneNumber: string;
  email: string;
  website?: string;
  tinNo?: string;
}
interface userWorkInfo {
  role: string;
  department: string;
  position: string;
}

interface signupInfoData {
  userInfo: userInfo;
  organizationInfo: organizationInfo;
  userWorkInfo: userWorkInfo;
}

interface ItemID {
  id: string;
}

interface organizationFilters {
  search?: string;
  status?: any;
  industry?: any;
}
interface capacityPlanFilters {
	searchKey?: string;
	status?: any;
	industry?: any;
  }

interface capacityplanInfo {
	title: string;
	description: string;
	type: CapacityPlanType;
	year: number;
	status: CapacityPlanStatus;
	attachment?: Buffer;
	program: string;
	subProgram: string;
	output: string;
	capacityChallenge: string;
	level: CapacityPlanLevel;
	action: string;
	participants: any;
	responsibleEntity: string;
	stakeholders: string[];
	budget: number;
	currency: string;
	fundSource: string;
	organization?: organizationInfo;
	// training?: ITraining[];
	createdAt?: string;
	updatedAt?: string;
}
