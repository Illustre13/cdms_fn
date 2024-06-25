import { lazy } from "react";
import Homepage from "../pages/HomePage";
const Index = lazy(() => import("../pages/Index"));
const Todolist = lazy(() => import("../pages/Apps/Todolist"));
const Mailbox = lazy(() => import("../pages/Apps/Mailbox"));
const Notes = lazy(() => import("../pages/Apps/Notes"));
const Contacts = lazy(() => import("../pages/Apps/Contacts"));
const List = lazy(() => import("../pages/Apps/Invoice/List"));
const Preview = lazy(() => import("../pages/Apps/Invoice/Preview"));
const Add = lazy(() => import("../pages/Apps/Invoice/Add"));
const Edit = lazy(() => import("../pages/Apps/Invoice/Edit"));
const AllOrganization = lazy(() => import("../pages/Organization/all"));
const MyOrganization = lazy(() => import("../pages/Organization/index"));
const Employees = lazy(() => import("../pages/Users/Employees"));
const Assessement = lazy(() => import("../pages/Assessment/index"));
const AssessementOverview = lazy(() => import("../pages/Assessment/overview"));
const AssessementTemplates = lazy(
	() => import("../pages/Assessment/templates")
);
const CPOverview = lazy(() => import("../pages/CapacityPlan/index"));

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
		path: "/cp/overview",
		element: <CPOverview />,
	},
	{
		path: "/cp/overview",
		element: <CPOverview />,
	},
	{
		path: "/cp/overview",
		element: <CPOverview />,
	},

	{
		path: "/apps/todolist",
		element: <Todolist />,
	},
	{
		path: "/apps/notes",
		element: <Notes />,
	},
	{
		path: "/apps/contacts",
		element: <Contacts />,
	},
	{
		path: "/apps/mailbox",
		element: <Mailbox />,
	},

	// preview page
	{
		path: "/apps/invoice/list",
		element: <List />,
	},

	{
		path: "/apps/invoice/preview",
		element: <Preview />,
	},
	{
		path: "/apps/invoice/add",
		element: <Add />,
	},
	{
		path: "/apps/invoice/edit",
		element: <Edit />,
	},
];

export { routes };
