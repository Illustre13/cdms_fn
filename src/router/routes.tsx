import { lazy } from "react";
import Homepage from "../pages/HomePage";
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
const CPTranings = lazy(() => import("../pages/CapacityPlan/Training"));
const routes = [
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
		element: <CPTranings />,
	},
];

export { routes };
