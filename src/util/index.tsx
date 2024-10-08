type CapacityPlanLevel = "INDIVIDUAL" | "INSTITUTIONAL" | "ORGANIZATIONAL";
type CapacityPlanStatus =
  | "DRAFT"
  | "SENT"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "REJECTED";
type CapacityPlanType = "ANNUAL_PLAN" | "QUARTELY_PLAN" | "ESSENTIAL_PLAN";
type TrainingStatus = "PENDING" | "APPROVED" | "REJECTED" | "FINISHED";
type TrainingMode = "ONLINE" | "PHYSICAL" | "HYBRID";
type EmployeeTrainingStatus = "PENDING" | "APPROVED" | "REJECTED" | "FINISHED";
type UserStatus = "PENDING" | "ACTIVE" | "SUSPENDED";
type ModalType =
  | ""
  | "approve"
  | "reject"
  | "addCapacityPlan"
  | "viewTraining"
  | "editTraining"
  | "deleteOrganization"
  | "updateOrganization";
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
  year?: number;
}

interface trainingFilters {
  searchKey?: string;
  status?: any;
  industry?: any;
  year?: number;
}

interface EmployeeTrainingFilters {
  id?: string;
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

interface trainingInfo {
  id?: string;
  title: string;
  status: TrainingStatus;
  mode?: TrainingMode;
  startDate?: Date;
  endDate?: Date;
  participants?: any;
  budgetAmount: number;
  currency: string;
  capacityPlan?: capacityplanInfo;
  employeeTraining?: IEmployeeTraining[];
}

interface employeeTrainingAddProp {
  trainingId: string;
  employeeIds: string[];
}

interface IEmployeeTraining {
  status: EmployeeTrainingStatus;
  training?: trainingInfo;
  // employee?: Employee;
}

interface ReactChartProps {
  type?:
    | "line"
    | "area"
    | "bar"
    | "histogram"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "treemap"
    | "boxPlot"
    | "candlestick"
    | "radar"
    | "polarArea"
    | "rangeBar";
  series: ApexOptions["series"];
  width?: string | number;
  height?: string | number;
  options: ApexOptions;
  [key: string]: any;
}

interface ApexOptions {
  annotations?: ApexAnnotations;
  chart?: ApexChart;
  colors?: any[];
  dataLabels?: ApexDataLabels;
  fill?: ApexFill;
  forecastDataPoints?: ApexForecastDataPoints;
  grid?: ApexGrid;
  labels?: string[];
  legend?: ApexLegend;
  markers?: ApexMarkers;
  noData?: ApexNoData;
  plotOptions?: ApexPlotOptions;
  responsive?: ApexResponsive[];
  series?: ApexAxisChartSeries | ApexNonAxisChartSeries;
  states?: ApexStates;
  stroke?: ApexStroke;
  subtitle?: ApexTitleSubtitle;
  theme?: ApexTheme;
  title?: ApexTitleSubtitle;
  tooltip?: ApexTooltip;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis | ApexYAxis[];
}

interface ICPBulkImport {
  handleImport?: any;
  cpBulkSubmit?: boolean;
  setIsCPBulkSubmit?: (value: boolean) => void;
  handleBulkImport?: () => void;
}

interface ICapacityPlanInfo {
  bulkCPData: {
    info: capacityplanInfo[];
    title: string;
  };
}
interface ICPBulkImportData {
  bulkCPData: {
    info: capacityplanInfo[];
    title: string;
  };
  file: any;
  isAfterFileChanged: boolean;
}

interface IModalProps {
  type?: ModalType;
  isOpen: boolean;
  size?: string;
  title?: string;
  content?: any;
  button1Text?: string;
  button2Text?: string;
  onClose: () => void;
  onSubmit?: () => void;
  onRetry?: () => void;
  buttonOneDisabled?: boolean;
  buttonTwoDisabled?: boolean;
  hideButton1?: boolean;
}

interface IRole {
  name?: string;
  description?: string;
}
interface IworkInfo {
  role?: IRole;
  department?: string;
  position?: string;
  organization?: organizationInfo;
}
interface IUserInfo {
		firstName: string;
		middleName?: string;
		lastName: string;
		email: string;
		phoneNumber: string;
		gender: string;
		dob: Date;
		nationality?: string;
		profileImage?: string;
		status: UserStatus;
		rssbNo: string;
		idNumber?: string;
		address?: string;
}