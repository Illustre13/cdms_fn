import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useRef, useState } from "react";
import sortBy from "lodash/sortBy";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { IRootState } from "../../redux/store";
import { useAppDispatch } from "../../redux/hooks";
import {
  fetchAllOrganization,
  addOrganization,
  deleteOrganization,
} from "../../redux/action/organizationAction";
import { setPageTitle } from "../../redux/reducer/themeConfigSlice";
import IconSearch from "../../components/Icon/IconSearch";
import IconPlus from "../../components/Icon/IconPlus";
import Dropdown from "../../components/Dropdown";
import IconHorizontalDots from "../../components/Icon/IconHorizontalDots";
import IconEye from "../../components/Icon/IconEye";
import IconShare from "../../components/Icon/IconShare";
import IconArchive from "../../components/Icon/IconArchive";
import IconEdit from "../../components/Icon/IconEdit";
import IconTxtFile from "../../components/Icon/IconTxtFile";
import Modal from "../Components/Modals";
import { OrganizationForm } from "../Forms/OrganizationForm";
import { FormikProps } from "formik";
import { StatusBadge } from "../../util/helper";
import { StateOptions } from "../../util/enum";
import { Link } from "react-router-dom";

const Organization = () => {
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const industryOptions = [
    { value: "", label: "All" },
    { value: "it", label: "IT" },
    { value: "agriculture", label: "Agriculture" },
    { value: "finance", label: "Finance" },
  ];

  const statusOptions = [
    { value: "", label: "All" },
    { value: "ACTIVE", label: "Active" },
    { value: "PENDING", label: "Pending" },
    { value: "SUSPENDED", label: "Suspended" },
  ];

  const dispatch = useAppDispatch();
  const [signupData, setSignupData] = useState<any>(null);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [page2, setPage2] = useState(1);
  const [pageSize2, setPageSize2] = useState(PAGE_SIZES[0]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<any>();
  const [industry, setIndustry] = useState<any>();

  const addOrganizationState = useSelector(
    (state: IRootState) => state.organization.addState
  );
  const deleteOrganizationState = useSelector(
    (state: IRootState) => state.organization.deleteState
  );
  const fetchOrganizationState = useSelector(
    (state: IRootState) => state.organization.fetchState
  );
  const organizationData = fetchOrganizationState?.data?.data;

  useEffect(() => {
    dispatch(setPageTitle("Organizations"));
  }, [dispatch]);

  const orgFilters: organizationFilters = {
    search,
    status: status,
    industry: industry,
  };

  useEffect(() => {
    dispatch(fetchAllOrganization(orgFilters));
  }, [search, status, industry, dispatch]);

  useEffect(() => {
    setPage2(1);
  }, [pageSize2]);

  useEffect(() => {

    if (addOrganizationState.state === StateOptions.FULFILLED) {
      const id = toast.loading("Add Organization");
      toast.update(id, {
        render: addOrganizationState.message,
        type: "success",
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    if (deleteOrganizationState.state === StateOptions.FULFILLED) {
      const id = toast.loading("Deleted Organization successfully!");
      toast.update(id, {
        render: addOrganizationState.message,
        type: "success",
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    dispatch(fetchAllOrganization(orgFilters));
  }, [addOrganizationState, deleteOrganizationState]);

  const handleSearchChange = (e: any) => setSearch(e.target.value);

  const handleStatusChange = (selectedOption: any) => {
    setStatus(selectedOption?.value);
  };

  const handleIndustryChange = (selectedOption: any) => {
    setIndustry(selectedOption?.value);
  };

  const handleDelete = (id: ItemID) => {
    dispatch(deleteOrganization(id));
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const openAddOrganizationModal = () => setModalOpen(true);
  const closeAddOrganizationModal = () => setModalOpen(false);

  useEffect(() => {
    if (signupData) {
      handleAddOrganization();
    }
  }, [signupData]);

  const formRef = useRef<FormikProps<any> | null>(null);

  const handleAddOrganization = () => {
    if (formRef.current) {
      const formValues = formRef?.current.values;
      dispatch(addOrganization(formValues));
    }
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        title="Add Organization"
        content={
          <OrganizationForm setSignupData={setSignupData} formRef={formRef} />
        }
        button1Text="Cancel"
        button2Text="Save"
        onClose={closeAddOrganizationModal}
        onSubmit={handleAddOrganization}
        buttonTwoDisabled={false}
      />
      <div className="flex flex-col items-start overflow-x-auto whitespace-nowrap p-3 text-cdms_primary relative z-10 w-full">
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link to="/my-organization" className="text-cdms_primary hover:underline">
            Organization
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>All Organization</span>
        </li>
      </ul>

        <div className="mt-8 flex flex-row md:flex-row items-center justify-end gap-8 relative z-20">
          <div className="ltr:ml-auto rtl:mr-auto">
            <input
              type="text"
              placeholder="Search an organization..."
              className="form-input w-auto py-2 ltr:pr-11 rtl:pl-11 peer"
              value={search}
              onChange={handleSearchChange}
            />
            <button
              type="button"
              className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-cdms_primary"
            >
              <IconSearch className="mx-auto" />
            </button>
          </div>

          <div className="relative z-30 mx-auto max-w-[640px] w-full">
            <Select
              placeholder="All Industry"
              options={industryOptions}
              classNamePrefix="custom-select py-3"
              menuPortalTarget={document.body}
              menuPosition="absolute"
              value={industry}
              defaultValue={industryOptions[0].value}
              onChange={handleIndustryChange}
              styles={{
                control: (provided) => ({
                  ...provided,
                  zIndex: 30,
                }),
                menu: (provided) => ({
                  ...provided,
                  zIndex: 40,
                }),
                menuPortal: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
              }}
            />
          </div>

          <div className="relative z-30 mx-auto max-w-[580px] w-full">
            <Select
              placeholder="All status"
              options={statusOptions}
              classNamePrefix="custom-select py-3"
              menuPortalTarget={document.body}
              menuPosition="absolute"
              value={status}
              onChange={handleStatusChange}
              styles={{
                control: (provided) => ({
                  ...provided,
                  zIndex: 30,
                }),
                menu: (provided) => ({
                  ...provided,
                  zIndex: 40,
                }),
                menuPortal: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
              }}
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="btn btn-primary"
              onClick={openAddOrganizationModal}
            >
              <IconPlus className="w-5 h-5 ltr:mr-1.5 rtl:ml-1.5 shrink-0" />
              Add New Organization
            </button>
          </div>

          <div>
            <button type="button" className="btn btn-primary">
              <IconTxtFile className="ltr:mr-2 rtl:ml-2" />
              Bulk Import
            </button>
          </div>
        </div>
      </div>

      <div className="panel mt-6">
        <div className="datatables">
          <DataTable
            className="whitespace-nowrap table-hover"
            records={organizationData?.organizations}
            columns={[
              { accessor: "name", title: "Name", sortable: true },
              {
                accessor: "displayName",
                title: "Display Name",
                sortable: true,
              },
              { accessor: "industry", title: "Industry", sortable: true },
              { accessor: "phoneNumber", title: "Phone No.", sortable: true },
              { accessor: "email", title: "Email", sortable: true },
              {
                accessor: "status",
                title: "Status",
                sortable: true,
                render: (record: any) => <StatusBadge status={record.status} />,
              },
              { accessor: "tinNo", title: "TIN No.", sortable: true },
              {
                accessor: "action",
                title: "Action",
                render: (record: any) => (
                  <div className="dropdown">
                    <Dropdown
                      offset={[0, 5]}
                      placement={"bottom-end"}
                      button={
                        <IconHorizontalDots className="opacity-70 m-auto" />
                      }
                    >
                      <ul>
                        <li>
                          <button
                            type="button"
                            className="flex items-center space-x-2"
                          >
                            <IconEye className="mr-2" /> <span>View</span>
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="flex items-center space-x-2"
                          >
                            <IconShare className="mr-2" /> <span>Share</span>
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="flex items-center space-x-2"
                          >
                            <IconEdit className="mr-2" /> <span>Edit</span>
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="flex items-center space-x-2"
                            onClick={() => handleDelete(record.id)}
                          >
                            <IconArchive className="mr-2 text-red-500" />
                            <span>Delete</span>
                          </button>
                        </li>
                      </ul>
                    </Dropdown>
                  </div>
                ),
              }
              
            ]}
            totalRecords={organizationData?.totalItems}
            recordsPerPage={pageSize2}
            page={page2}
            onPageChange={(p) => setPage2(p)}
            recordsPerPageOptions={PAGE_SIZES}
            onRecordsPerPageChange={setPageSize2}
            paginationText={({ from, to, totalRecords }) =>
              `Showing ${from} to ${to} of ${totalRecords} entries`
            }
            fontSize="sm"
          />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Organization;
