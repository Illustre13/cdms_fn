import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { setPageTitle } from "../../redux/reducer/themeConfigSlice";
import { useSelector } from "react-redux";
import { OrganizationForm1 } from "../Forms/OrganizationForm1";
import { fetchOrganizationInfo } from "../../redux/action/organizationAction";
import { useAppDispatch } from "../../redux/hooks";
import {
  updateOrganization,
  deleteOrganization,
} from "../../redux/action/organizationAction";
import { IRootState } from "../../redux/store";
import { StateOptions } from "../../util/enum";
import { toast, ToastContainer } from "react-toastify";
import { FormikProps } from "formik";
import Modal from "../Components/Modals";

const MyOrganization = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeToast, setActiveToast] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setPageTitle("My Organization"));
  });
  const [tabs, setTabs] = useState<string>("home");
  const toggleTabs = (name: string) => {
    setTabs(name);
  };

  const organizationInfoState = useSelector(
    (state: IRootState) => state.organization.fetchOrganizationInfoState
  );

  const organizationInfoData = organizationInfoState?.data?.data?.organization;
  useEffect(() => {
    dispatch(fetchOrganizationInfo());
  }, [dispatch]);

  const updateOrganizationState = useSelector(
    (state: IRootState) => state.organization.updateOrganizationState
  );
  const deleteOrganizationState = useSelector(
    (state: IRootState) => state.organization.deleteState
  );

  const showToast = (
    state: string,
    message: string,
    successMsg: string,
    errorMsg: string
  ) => {
    if (state === StateOptions.FULFILLED) {
      if (activeToast !== successMsg) {
        toast.success(message || successMsg, {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        setActiveToast(successMsg);
      }
    } else if (state === StateOptions.REJECTED) {
      if (activeToast !== errorMsg) {
        toast.error(message || errorMsg, {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        setActiveToast(errorMsg);
      }
    }
    dispatch(fetchOrganizationInfo());
  };

  const clearToast = () => {
    setActiveToast(null);
  };

  const organizationFormRef = useRef<FormikProps<any> | null>(null);

  useEffect(() => {
    if (deleteOrganizationState.state !== StateOptions.IDLE) {
      showToast(
        deleteOrganizationState.state!,
        deleteOrganizationState.message!,
        "Deleted Organization successfully!",
        deleteOrganizationState.data?.message ||
          "Failed to delete Organization."
      );
      clearToast();
    }
    if (updateOrganizationState.state !== StateOptions.IDLE) {
      showToast(
        updateOrganizationState.state!,
        updateOrganizationState.message!,
        "Updated Organization successfully!",
        updateOrganizationState.data?.message ||
          "Failed to update Organization."
      );
      clearToast();
    }
  }, [deleteOrganizationState, updateOrganizationState, activeToast]);


  const handleEditOrganization = (initialData: any) => {
    if (organizationFormRef.current && isEditing) {
      const formValues = organizationFormRef.current.values;
      dispatch(
        updateOrganization({
          data: { ...formValues },
          id: initialData?.id!,
        })
      );
      setIsEditing(false);
    }
  };


  if(isEditing) {
	handleEditOrganization(organizationInfoData);
  }

  const [modalProps, setModalProps] = useState<IModalProps>({
    isOpen: false,
    type: "deleteOrganization",
    onClose: () => handleModalClose(),
    onSubmit: () => {},
  });

  const handleModalClose = () => {
    setModalProps((prev) => ({ ...prev, isOpen: false }));
  };

  const handleDelete = () => {
    if (organizationInfoData?.id) {
		setModalProps({
			type: "deleteOrganization",
			isOpen: true,
			onClose: modalProps.onClose,
			onSubmit: () => dispatch(deleteOrganization(organizationInfoData.id)),
			title: "Delete Organization",
			button1Text: "Cancel",
			button2Text: "Delete",
			buttonTwoDisabled: false,
			content: <p>Are you sure you want to delete this organization?</p>,
		  });
    }


  };

  return (
    <div>
		{modalProps?.isOpen && (
        <Modal
          isOpen={modalProps.isOpen}
          title={modalProps.title}
          content={modalProps.content}
          button1Text={modalProps.button1Text}
          button2Text={modalProps.button2Text}
          onClose={modalProps.onClose}
          onSubmit={modalProps.onSubmit}
          onRetry={modalProps.onRetry}
          buttonTwoDisabled={modalProps.buttonTwoDisabled}
          size="max-w-xl"
        />
      )}
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link to="/my-organization" className="text-cdms_primary hover:underline">
            Organization
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>My Organization</span>
        </li>
      </ul>
      <div className="pt-5">
        <div>
          <div>
            <h6 className="text-xl font-bold my-2 w-8/12">
              {organizationInfoData?.name}
            </h6>
            {organizationInfoData ? (
              <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 bg-white dark:bg-black mb-4 flex flex-row gap-5 w-full">
                <OrganizationForm1
                  organizationInfo={organizationInfoData}
                  organizationFormRef={organizationFormRef}
				//   setOrganizationData={setOrganizationData}
				setIsEditing={setIsEditing}
                />
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </div>
          <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 bg-white dark:bg-black mb-4 flex flex-row gap-5">
            <div className="switch">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="panel space-y-5">
                  <h5 className="font-semibold text-lg mb-4">
                    Deactivate Account
                  </h5>
                  <p>Organization account will be deactivated automatically!</p>
                  <label className="w-12 h-6 relative">
                    <input
                      type="checkbox"
                      className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                      id="custom_switch_checkbox7"
                    />
                    <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-cdms_primary before:transition-all before:duration-300"></span>
                  </label>
                </div>
                <div className="panel space-y-5">
                  <h5 className="font-semibold text-lg mb-4">Delete Account</h5>
                  <p>
                    Once you delete the account, there is no going back. Please
                    be certain.
                  </p>
                  <button className="btn btn-danger btn-delete-account" onClick={()=> handleDelete()}>
                    Delete organization account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default MyOrganization;
