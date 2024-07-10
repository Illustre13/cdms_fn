import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { isAuthenticated } from "../../util/helper";
import { useNavigate } from "react-router-dom";

const ProtectedLayout = ({ children }: PropsWithChildren) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [requestedLocation, setRequestedLocation] = useState<string | null>();

	const hasToken = isAuthenticated();
	useEffect(() => {
		if (!hasToken) {
			if (location.pathname !== requestedLocation) {
				setRequestedLocation(location.pathname);
			}
			console.log("hasToken", hasToken);
			navigate("/cdms-signin");
		}
	}, [navigate]);

	if (requestedLocation && location.pathname !== requestedLocation) {
		setRequestedLocation(null);
		return <Navigate to={requestedLocation} />;
	}

	return <>{children}</>;
};

ProtectedLayout.propTypes = {
	children: PropTypes.node,
};

export default ProtectedLayout;
