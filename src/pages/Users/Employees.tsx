import { DataTable } from "mantine-datatable";
import { useEffect, useRef, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { setPageTitle } from "../../redux/reducer/themeConfigSlice";
import { useSelector } from "react-redux";
import IconPencil from "../../components/Icon/IconPencil";
import IconSearch from "../../components/Icon/IconSearch";
import Select from "react-select";
import IconPlus from "../../components/Icon/IconPlus";
import IconTxtFile from "../../components/Icon/IconTxtFile";
import { useAppDispatch } from "../../redux/hooks";
import { IRootState } from "../../redux/store";
import { EmployeeStatus, StateOptions } from "../../util/enum";
import { toast } from "react-toastify";
import {
  bulkCreateEmployee,
  deleteEmployee,
  fetchAllEmployee,
  fetchEmployeeInfo,
  updateEmployee,
} from "../../redux/action/employeeAction";
import Dropdown from "../../components/Dropdown";
import IconHorizontalDots from "../../components/Icon/IconHorizontalDots";
import IconEye from "../../components/Icon/IconEye";
import IconArchive from "../../components/Icon/IconArchive";
import { downloadExcel } from "react-export-table-to-excel";
import IconDownload from "../../components/Icon/IconDownload";
import { StatusBadge } from "../../util/helper";
import { EmployeeForm } from "./EmployeeForm";
import { FormikProps } from "formik";
import Modal from "../Components/Modals";

const Employees = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Employees"));
  });

  const userData = useSelector((state: IRootState) => state.user.fetchUserInfoState);
  const fetchAllEmpoyeeDataState = useSelector(
    (state: IRootState) => state.employee.fetchEmployeeState
  );

  const fetchEmployeeInfoState = useSelector(
    (state: IRootState) => state.employee.fetchEmployeeInfoState
  );

  const employeeInfoById = fetchEmployeeInfoState?.data?.data?.employee;

  const employeesData = fetchAllEmpoyeeDataState?.data?.data;
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  useEffect(() => {
    setPage(1);
  }, [pageSize]);
  const [page2, setPage2] = useState(1);
  const [pageSize2, setPageSize2] = useState(PAGE_SIZES[0]);

  useEffect(() => {
    setPage2(1);
  }, [pageSize2]);

  const formatDate = (date: string | number | Date) => {
    if (date) {
      const dt = new Date(date);
      const month =
        dt.getMonth() + 1 < 10 ? "0" + (dt.getMonth() + 1) : dt.getMonth() + 1;
      const day = dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate();
      return day + "/" + month + "/" + dt.getFullYear();
    }
    return "";
  };

  const [modalProps, setModalProps] = useState<IModalProps>({
    isOpen: false,
    type: "addCapacityPlan",
    onClose: () => handleModalClose(),
    onSubmit: () => {},
  });

  const [employeeModalType, setEmployeeModalType] = useState<string>("view");
  const handleSearchChange = (e: any) => setSearchKey(e.target.value);

  const EmployeeFormRef = useRef<FormikProps<any> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleModalClose = () => {
    setModalProps((prev) => ({ ...prev, isOpen: false }));
  };
  
  const handleEditEmployee = (employeeData: employeeInfo) => {
    if (EmployeeFormRef.current && !isSubmitting) {
      setIsSubmitting(true);
      const formValues = EmployeeFormRef?.current.values;
      // debugger;
      dispatch(
        updateEmployee({
          data: {
            ...employeeData,
          },
          id: employeeData?.id!,
        })
      );
    }
    setIsSubmitting(false);
    handleModalClose();
  };

  useEffect(() => {
    if (fetchEmployeeInfoState.state === StateOptions.FULFILLED) {
        setModalProps({
          type:
            employeeModalType === "view" ? "viewEmployee" : "updateEmployee",
          isOpen: true,
          onClose: modalProps.onClose,
          onSubmit: () => handleEditEmployee(employeeInfoById!),
          title:
            employeeModalType === "edit"
              ? "Edit Employee Info"
              : "View Employee Info",
          button1Text: "Cancel",
          button2Text: employeeModalType === "edit" ? "Save" : "Close",
          buttonTwoDisabled: false,
          content: (
            <EmployeeForm
              employeeFormRef={EmployeeFormRef}
              userData={userData?.data?.data?.user}
              employeeData={employeeInfoById}
              isEditing={employeeModalType === "edit"}
            />
          ),
          hideButton1: employeeModalType === "view" && true,
          size: "max-w-4xl",
        });
		console.log(modalProps)
    }
  }, [fetchEmployeeInfoState]);


  const handleDelete = (id: string) => {
    console.log("ID --->", id);
    dispatch(deleteEmployee(id));
    handleModalClose();
  };
  const [activeToast, setActiveToast] = useState<string | null>(null);
  const [searchKey, setSearchKey] = useState("");
  const [status, setStatus] = useState<any>();
  const empFilters: EmployeeFilters = {
    searchKey,
    status: status,
    // industry: industry,
  };

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
    dispatch(fetchAllEmployee(empFilters));
  };

  useEffect(() => {
    console.log("Reached her empFilters", empFilters);
    dispatch(fetchAllEmployee(empFilters));
  }, [searchKey, status, dispatch]);

  const openEmployeeModal = (employeeId: string) => {
    dispatch(fetchEmployeeInfo(employeeId!));
  };

  const statusOptions = [
    { value: "", label: "All" },
    { value: EmployeeStatus.ACTIVE, label: "Active" },
    { value: EmployeeStatus.PENDING, label: "Pending" },
    { value: EmployeeStatus.SUSPENDED, label: "Suspended" },
  ];

  const employeeTableHeader = [
    "No",
    "First Name",
    "Last Name",
    "Department",
    "Position",
    "Email",
    "Phone Number",
    "Gender",
    "Status",
  ];

  const filterKeys = [
    "index",
    "firstName",
    "lastName",
    "department",
    "position",
    "email",
    "phoneNumber",
    "gender",
    "status",
  ];

  interface EmployeePlan {
    [key: string]: any;
  }
  const formattedEmployeeData = employeesData?.employees?.map(
    (item: employeeInfo, index: number) => {
      const user = item.user;
      return { index: index + 1, ...user, ...item };
    }
  );
  const filteredEmployee: EmployeePlan[] = formattedEmployeeData?.map(
    (plan: EmployeePlan) => {
      const filteredPlan: EmployeePlan = {};
      filterKeys.forEach((key) => {
        if (key in plan) {
          filteredPlan[key] = plan[key];
        }
      });
      return filteredPlan;
    }
  );
  const handleStatusChange = (selectedOption: any) => {
    console.log("Selected Status:", selectedOption);
    setStatus(selectedOption?.value);
  };
  function handleDownloadExcel() {
    downloadExcel({
      fileName: "employee_file",
      sheet: "employees",
      tablePayload: {
        header: employeeTableHeader,
        body: filteredEmployee,
      },
    });
  }

  const [bulkData, setBulkData] = useState();
  useEffect(() => {}, [bulkData]);

  const [employeeBulkModal, setEmployeeBulkModal] = useState(false);
  const [isEmployeeBulkSubmit, setIsEmployeeBulkSubmit] = useState(false);
  const openAddEmployeeBulkModal = () => setEmployeeBulkModal(true);
  const closeEmployeeBulkModal = () => {
    setIsEmployeeBulkSubmit(false);
    setEmployeeBulkModal(false);
  };

  const handleCreateEmployeeBulk = () => {
    if (bulkData && employeeBulkModal) {
      setIsEmployeeBulkSubmit(true);
      console.log("State Here 22222222222 --> ", bulkData);
      debugger;
      dispatch(bulkCreateEmployee(bulkData));
      debugger;
      closeEmployeeBulkModal();
    }
  };


  console.log(modalProps?.isOpen)
  return (
    <div>
      {modalProps?.isOpen && (
        <Modal
          isOpen={true}
          title={modalProps.title}
          content={modalProps.content}
          button1Text={modalProps.button1Text}
          button2Text={modalProps.button2Text}
          onClose={modalProps.onClose}
          onSubmit={modalProps.onSubmit}
          onRetry={modalProps.onRetry}
          buttonTwoDisabled={modalProps.buttonTwoDisabled}
          size={modalProps.size}
        />
      )}

      {/* Filters */}
      <div className="flex flex-col items-start overflow-x-auto whitespace-nowrap p-3 text-cdms_primary relative z-10 w-full">
        <div className="mt-8 flex flex-row md:flex-row items-center justify-end gap-8 relative z-20">
          <div className="ltr:ml-auto rtl:mr-auto">
            <input
              type="text"
              placeholder="Search an employee"
              className="form-input w-auto py-2 ltr:pr-11 rtl:pl-11 peer"
              value={searchKey}
              onChange={handleSearchChange}
            />
            <button
              type="button"
              className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-cdms_primary"
            >
              <IconSearch className="mx-auto" />
            </button>
          </div>

          {/* Employee Status */}
          <div className="relative z-99 mx-auto max-w-[580px] w-full">
            <Select
              placeholder="Select Status"
              options={statusOptions}
              classNamePrefix="custom-select py-3"
              menuPortalTarget={document.body}
              menuPosition="absolute"
              onChange={handleStatusChange}
            />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" className="btn btn-primary">
              <IconPlus className="w-5 h-5 ltr:mr-1.5 rtl:ml-1.5 shrink-0" />
              Add New Employee
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={openAddEmployeeBulkModal}
            >
              <IconTxtFile className="ltr:mr-2 rtl:ml-2" />
              Bulk Import
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary btn-sm m-1"
              onClick={handleDownloadExcel}
            >
              <IconDownload className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
              EXCEL
            </button>
          </div>
        </div>
      </div>

      <div className="panel mt-6">
        <div className="datatables">
          <DataTable
            className="whitespace-nowrap table-hover"
            records={employeesData?.employees}
            columns={[
              {
                accessor: "index",
                title: "No",
                render: (_, index) => index + 1,
              },
              {
                accessor: "firstName",
                title: "Names",
                sortable: true,
                render: (record: employeeInfo) => (
                  <div className="flex items-center w-max">
                    <div>
                      {record.user?.firstName + " " + record.user?.lastName}
                    </div>
                  </div>
                ),
              },
              {
                accessor: "department",
                title: "Department",
                sortable: true,
              },
              {
                accessor: "position",
                title: "Position",
                sortable: true,
              },
              {
                accessor: "email",
                title: "Email",
                sortable: true,
                render: (record: employeeInfo) => (
                  <div className="flex items-center w-max">
                    <div>{record.user?.email}</div>
                  </div>
                ),
              },
              {
                accessor: "phoneNumber",
                title: "Phone No.",
                sortable: true,
                render: (record: employeeInfo) => (
                  <div className="flex items-center w-max">
                    <div>{record.user?.phoneNumber}</div>
                  </div>
                ),
              },
              {
                accessor: "gender",
                title: "Gender",
                sortable: true,
                render: (record: employeeInfo) => (
                  <div className="flex items-center w-max">
                    <div>{record.user?.gender}</div>
                  </div>
                ),
              },
              {
                accessor: "status",
                title: "Status",
                sortable: true,
                render: ({ status }) => <StatusBadge status={status} />,
              },
              {
                accessor: "moreAction",
                title: "Actions",
                render: (record: employeeInfo) => (
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
                            onClick={() => {
                              openEmployeeModal(record?.id!);
                              setEmployeeModalType("view");
                            }}
                          >
                            <IconEye className="mr-2" /> <span>View</span>
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="flex items-center space-x-2"
                            onClick={() => {
                              openEmployeeModal(record?.id!);
                              setEmployeeModalType("edit");
                            }}
                          >
                            <IconPencil className="mr-2" /> <span>Edit</span>
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            className="flex items-center space-x-2"
                            onClick={() => handleDelete(record?.id!)}
                          >
                            <IconArchive className="mr-2 text-red-500" />{" "}
                            <span>Delete</span>
                          </button>
                        </li>
                      </ul>
                    </Dropdown>
                  </div>
                ),
              },
            ]}
            totalRecords={[123].length}
            recordsPerPage={pageSize2}
            page={page2}
            onPageChange={(p) => setPage2(p)}
            recordsPerPageOptions={PAGE_SIZES}
            onRecordsPerPageChange={setPageSize2}
            minHeight={200}
            paginationText={({ from, to, totalRecords }) =>
              `Showing ${from} to ${to} of ${totalRecords} entries`
            }
            fontSize="sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Employees;
