import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../util/helper";
import { fetchUserInfo } from "../../redux/action/UserAction";
import { useAppDispatch } from "../../redux/hooks";
import Modal from "../../pages/Components/Modals";

const ProtectedLayout = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const user = useSelector((state: any) => state.user);

  const hasToken = isAuthenticated();

  const handleGoToLogin = () => {
    navigate("/cdms-signin");
  };

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        await dispatch(fetchUserInfo());
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError("Failed to load user information. Kindly login again!");
        setShowModal(true);
      }
    };

    if (!hasToken) {
      if (location.pathname !== requestedLocation) {
        setRequestedLocation(location.pathname);
      }
      navigate("/cdms-signin");
    } else if (user === null) {
      loadUserInfo();
    } else {
      setLoading(false);
    }
  }, [hasToken, navigate, location.pathname, dispatch, user]);

  if (loading) {
    return <div>Loading user information...</div>; // You can replace this with a more sophisticated loading indicator
  }

  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return (
    <>
      {children}
      {loading && (
        <div>
          <Modal
            isOpen={showModal}
            title="Loading User Information..."
            content={
              <div>
                <p>{error}</p>
              </div>
            }
            button1Text="Retry"
            button2Text="Go to Login"
            onClose={() => setShowModal(false)}
            onSubmit={handleGoToLogin}
            buttonTwoDisabled={false}
            hideButton1={false}
          />
        </div>
      )}
    </>
  );
};

ProtectedLayout.propTypes = {
  children: PropTypes.node,
};

export default ProtectedLayout;
