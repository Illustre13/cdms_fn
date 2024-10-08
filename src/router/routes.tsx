import { lazy } from "react";
import Homepage from "../pages/HomePage";
import CDMSLogin from "../pages/Authentication/CDMSLogin";
import { CDMSSignUp } from "../pages/Authentication/CDMSSignup";
import { TwoFactorAuth } from "../pages/Authentication/2FA";
import { ResetPassword } from "../pages/Authentication/ResetPassword";
const Index = lazy(() => import("../pages/Index"));
const AllOrganization = lazy(() => import("../pages/Organization/all"));
const MyOrganization = lazy(() => import("../pages/Organization/index"));
const Employees = lazy(() => import("../pages/Users/Employees"));
const Assessement = lazy(() => import("../pages/Assessment/index"));
const AssessementOverview = lazy(() => import("../pages/Assessment/overview"));
const AssessementTemplates = lazy(
	() => import("../pages/Assessment/templates")
);
const CPOverview = lazy(() => import("../pages/CapacityPlan/index"));
const CPTrainings = lazy(() => import("../pages/CapacityPlan/Training"));
const UserProfile = lazy(() => import("../pages/Users/UserProfile"));
const UserManagement = lazy(() => import("../pages/Users/UserManagement"));
const AddCapacityPlan = lazy(() => import("../pages/CapacityPlan/CreateCP"));

const routes = [
	{
		path: "/cdms-signin",
		element: <CDMSLogin />,
		layout: "blank",
	},
	{
		path: "/cdms-signup",
		element: <CDMSSignUp />,
		layout: "blank",
	},

	{
		path: "/tfa",
		element: <TwoFactorAuth />,
		layout: "blank",
	},

	{
		path: "/reset-password",
		element: <ResetPassword />,
		layout: "blank",
	},
	// dashboard
	{
		path: "/",
		element: <Homepage />,
		layout: "blank",
	},
	{
		path: "/dashboard",
		element: <Index />,
	},
	{
		path: "/organization/all",
		element: <AllOrganization />,
	},
	{
		path: "/my-organization",
		element: <MyOrganization />,
	},
	{
		path: "/employees",
		element: <Employees />,
	},
	{
		path: "/cna/assessment",
		element: <Assessement />,
	},
	{
		path: "/cna/overview",
		element: <AssessementOverview />,
	},
	{
		path: "/cna/template",
		element: <AssessementTemplates />,
	},

	{
		path: "/cp/overview",
		element: <CPOverview />,
	},
	{
		path: "/cp/trainings",
		element: <CPTrainings />,
	},
	{
		path: "/cp/add",
		element: <AddCapacityPlan />,
	},
	{
		path: "/user/profile",
		element: <UserProfile />,
	},
	{
		path: "/user/management",
		element: <UserManagement />,
	},
];

export { routes };
