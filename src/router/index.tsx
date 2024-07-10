import { createBrowserRouter } from "react-router-dom";
import BlankLayout from "../components/Layouts/BlankLayout";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import { routes } from "./routes";
import ProtectedLayout from "../components/Layouts/ProtectedLayout";

const finalRoutes = routes.map((route) => {
	return {
		...route,
		element:
			route.layout === "blank" ? (
				<BlankLayout>{route.element}</BlankLayout>
			) : (
				<ProtectedLayout>
					<DefaultLayout>{route.element}</DefaultLayout>
				</ProtectedLayout>
			),
	};
});

const router = createBrowserRouter(finalRoutes);

export default router;
