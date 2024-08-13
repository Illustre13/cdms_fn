import { Form, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setPageTitle } from "../../redux/reducer/themeConfigSlice";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import {
  fetchCapacityPlanInfo,
  updateCapacityPlan,
} from "../../redux/action/capacityPlanAction";
import { useAppDispatch } from "../../redux/hooks";
import IconArrowBackward from "../../components/Icon/IconArrowBackward";
import IconEdit from "../../components/Icon/IconEdit";
import { IRootState } from "../../redux/store";
import { CapacityPlanLevel, TrainingStatus } from "../../util/enum";
import IconThumbUp from "../../components/Icon/IconThumbUp";
import IconPencil from "../../components/Icon/IconPencil";
import { Select } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import {
  arrayToCommaSeparatedString,
  CurrencyFormatter,
  StatusBadge,
} from "../../util/helper";
import Dropdown from "../../components/Dropdown";
import IconHorizontalDots from "../../components/Icon/IconHorizontalDots";
import IconEye from "../../components/Icon/IconEye";
import IconArchive from "../../components/Icon/IconArchive";
import IconSearch from "../../components/Icon/IconSearch";
import { downloadExcel } from "react-export-table-to-excel";
import {
  deleteTraining,
  fetchTrainingInfo,
  updateTraining,
} from "../../redux/action/trainingAction";
import { fetchAllEmployeeTraining } from "../../redux/action/employeeTrainingAction";
import IconDownload from "../../components/Icon/IconDownload";

export interface IViewCPProps {
  capacityPlanInfo?: capacityplanInfo;
}
const ViewCP = () => {
  const { cpId } = useParams<{ cpId: string }>();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Add Capacity Plan"));
  }, [dispatch]);

  const fetchCapacityPlanState = useSelector(
    (state: IRootState) => state.capacityPlan.fetchCapacityPlanInfoState
  );

  const cpData = fetchCapacityPlanState?.data?.data?.capacityPlan;

  const updateCapacityPlanState = useSelector(
    (state: IRootState) => state.capacityPlan.updateState
  );

  const handleSubmit = (values: any) => {
    dispatch(
      updateCapacityPlan({
        data: {
          title: values.title,
          description: values.description,
          level: values.level,
          year: values.year,
          status: values.status,
        },
        id: cpId!,
      })
    );
  };

  interface cpFilters {
    level?: any;
    year?: number;
  }

  const [level, setLevel] = useState<any>(CapacityPlanLevel.NATIONAL);
  const [year, setYear] = useState<any>(new Date().getFullYear());
  const cpFilters: cpFilters = {
    level: level,
    year: year,
  };

  useEffect(() => {
    dispatch(fetchCapacityPlanInfo(cpId!));
  }, [level, year, dispatch]);

  const [isEditingMode, setIsEditingMode] = useState(false);

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .min(3, "Title must be at least 3 characters"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters"),
    status: Yup.string()
      .required("Status is required")
      .oneOf(["DRAFT", "SENT", "REJECTED", "UNDER_REVIEW"], "Invalid type"),
    level: Yup.string()
      .required("Level is required")
      .oneOf(
        ["NATIONAL", "ORGANIZATIONAL", "INSTITUTIONAL"],
        "Invalid Capacity plan level"
      ),
    year: Yup.number()
      .required("Year is required")
      .integer("Year must be an integer")
      .min(1900, "Year must be at least 1900")
      .max(new Date().getFullYear(), "Year cannot be in the future"),
    budget: Yup.number()
      .required("Budget is required")
      .positive("Budget must be a positive number")
      .min(0, "Budget must be greater than or equal to 0"),
    currency: Yup.string()
      .required("Currency is required")
      .oneOf(["RWF", "USD", "EUR"], "Invalid currency"),
  });

  const getInitialFormValues = (cpData?: any) => ({
    title: cpData?.title || "",
    description: cpData?.description || "",
    status: cpData?.status || "",
    level: cpData?.level || "",
    year: cpData?.year || "",
  });

  const [selectedRecords, setSelectedRecords] = useState<any>([]);
  const [searchKey, setSearchKey] = useState("");
  const [status, setStatus] = useState<any>();

  const handleSearchChange = (e: any) => setSearchKey(e.target.value);

  const handleStatusChange = (selectedOption: any) => {
    setStatus(selectedOption?.value);
  };

  const trainingTableHeader = [
    // "No",
    "Title",
    "Status",
    "Mode",
    "Start Date",
    "End Date",
    "Currency",
    "Budget",
    "Program",
    "SubProgram",
    // "Male Participants",
    // "Female Participants",
    "Type",
    "Responsible Entity",
    "Stake Holders",
    "Source of Funds",
    // "Actions"
  ];

  const filterKeys = [
    "action",
    "status",
    "mode",
    "startDate",
    "endDate",
    "currency",
    "budget",
    "program",
    "subProgram",
    // "maleParticipants",
    // "femaleParticipants",
    "type",
    "responsibleEntity",
    "stakeholders",
    "fundSource",
  ];

  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [page2, setPage2] = useState(1);
  const [pageSize2, setPageSize2] = useState(PAGE_SIZES[0]);

  const [trainingModalType, setTrainingModalType] = useState<string>("view");

  interface TrainingPlan {
    [key: string]: any;
  }

  const openTrainingModal = (trainingId: ItemID) => {
    dispatch(fetchTrainingInfo(trainingId!));
    dispatch(fetchAllEmployeeTraining(trainingId!));
  };

  const openFinishModalHandler = (
    trainingId?: string,
    selectedRecords?: any
  ) => {
    setModalProps({
      type: "approve",
      isOpen: true,
      onClose: modalProps.onClose,
      onSubmit: () => handleFinishedTraining(trainingId!),
      title: "Mark as Finished",
      button1Text: "Cancel",
      button2Text: "Approve",
      buttonTwoDisabled: false,
      content: <p>Are you sure you want to mark this training as finished?</p>,
    });
  };

  const handleFinishedTraining = (trainingId: string) => {
    dispatch(
      updateTraining({
        data: {
          status: TrainingStatus.FINISHED,
        },
        id: trainingId,
      })
    );
    handleModalClose();
  };

  const filteredTrainings: TrainingPlan[] = (cpData?.training || [])?.map(
    (plan: TrainingPlan) => {
      const filteredPlan: TrainingPlan = {};
      filterKeys.forEach((key) => {
        if (key in plan) {
          filteredPlan[key] = plan[key];
        }
      });
      return filteredPlan;
    }
  );

  const statusOptions = [
    { value: "", label: "All" },
    { value: TrainingStatus.FINISHED, label: "Finished" },
    { value: TrainingStatus.APPROVED, label: "Approved" },
    { value: TrainingStatus.REJECTED, label: "Rejected" },
    { value: TrainingStatus.PENDING, label: "Pending" },
  ];
  const [modalProps, setModalProps] = useState<IModalProps>({
    isOpen: false,
    type: "addCapacityPlan",
    onClose: () => handleModalClose(),
    onSubmit: () => {},
  });

  const handleModalClose = () => {
    setModalProps((prev) => ({ ...prev, isOpen: false }));
  };

  const handleDelete = (id: ItemID) => {
    dispatch(deleteTraining(id));
    handleModalClose();
  };

  function handleDownloadExcel() {
    downloadExcel({
      fileName: "table",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header: trainingTableHeader,
        body: filteredTrainings,
      },
    });
  }

  return (
    <>
      <div className="gap-4">
        <div className="flex flex-col w-full gap-4 pt-4 pb-8">
          <Link to="/cp/overview" className="flex items-center">
            <div className="flex flex-row gap-2 font-bold text-sm">
              <IconArrowBackward />
              <span>Back to overview</span>
            </div>
          </Link>
          <span className="flex flex-row gap-2 font-bold text-xl">
            {cpData?.title || "Capacity Plan"}
          </span>
        </div>
      </div>
      <div className="panel flex xl:flex-row flex-col gap-4">
        <div className="flex flex-col xl:w-full w-full gap-0">
          {cpData && (
            <Formik
              initialValues={getInitialFormValues(cpData)}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-row item-right gap-4 justify-between items-center">
                      <span></span>
                      <div className="flex flex-row gap-4 mr-4">
                        {/* Submit Info */}

                        {isEditingMode && (
                          <div className="sm:col-span-2 mt-4 flex justify-end">
                            <button
                              type="submit"
                              className={`bg-cdms_primary text-white py-2 px-4 -mt-4 h-10 rounded-md hover:bg-cdms_secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                            >
                              Save
                            </button>
                          </div>
                        )}
                        <div onClick={() => setIsEditingMode(!isEditingMode)}>
                          <IconEdit className="w-8 h-8 cursor-pointer" />
                        </div>
                      </div>
                    </div>
                    <div className="flex item-right gap-4 justify-between pr-4">
                      <span>
                        <h6 className="text-lg font-bold mb-5">
                          General Information
                        </h6>
                      </span>
                    </div>

                    <div className="p-4">
                      {/* Title input field */}
                      <div className="py-2 flex flex-row gap-2">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700 w-3/12"
                        >
                          Title:
                        </label>
                        <div
                          className={
                            touched.title && errors.title
                              ? "has-error w-9/12"
                              : "w-9/12"
                          }
                        >
                          <Field
                            name="title"
                            type="text"
                            id="title"
                            placeholder="Enter capacity plan title"
                            className={`flex-1 form-input ${
                              !isEditingMode ? "text-gray-500" : ""
                            }`}
                            disabled={!isEditingMode}
                          />
                          <ErrorMessage
                            name="title"
                            component="div"
                            className="text-align-left text-danger mt-1"
                          />
                        </div>
                      </div>

                      {/* Description input field */}
                      <div className="py-2 flex flex-row gap-2">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700 w-3/12"
                        >
                          Description:
                        </label>
                        <div
                          className={
                            touched.description && errors.description
                              ? "has-error w-9/12"
                              : "w-9/12"
                          }
                        >
                          <Field
                            name="description"
                            as="textarea"
                            id="description"
                            placeholder="Enter capacity plan description"
                            className={`flex-1 h-24 form-input ${
                              !isEditingMode ? "text-gray-500" : ""
                            }`}
                            disabled={!isEditingMode}
                          />
                          <ErrorMessage
                            name="description"
                            component="div"
                            className="text-danger mt-1"
                          />
                        </div>
                      </div>

                      {/* Level select field */}
                      <div className="py-2 flex flex-row gap-2">
                        <label
                          htmlFor="level"
                          className="block text-sm font-medium text-gray-700 w-3/12"
                        >
                          Level:
                        </label>
                        <div
                          className={
                            touched.level && errors.level
                              ? "has-error w-9/12"
                              : "w-9/12"
                          }
                        >
                          <Field
                            name="level"
                            as="select"
                            id="level"
                            className={`flex-1 form-input ${
                              !isEditingMode ? "text-gray-500" : ""
                            } ${
                              touched.level && errors.level
                                ? "border-red-500"
                                : ""
                            }`}
                            disabled={!isEditingMode}
                          >
                            <option value="NATIONAL">National</option>
                            <option value="INSTITUTIONAL">Institutional</option>
                            <option value="ORGANIZATIONAL">Organization</option>
                          </Field>
                          <ErrorMessage
                            name="level"
                            component="div"
                            className="text-danger mt-1"
                          />
                        </div>
                      </div>

                      {/* STatus select field */}
                      <div className="py-2 flex flex-row gap-2">
                        <label
                          htmlFor="status"
                          className="block text-sm font-medium text-gray-700 w-3/12"
                        >
                          Status:
                        </label>
                        <div
                          className={
                            touched.status && errors.status
                              ? "has-error w-9/12"
                              : "w-9/12"
                          }
                        >
                          <Field
                            name="status"
                            as="select"
                            id="status"
                            className={`flex-1 form-input ${
                              !isEditingMode ? "text-gray-500" : ""
                            } ${
                              touched.status && errors.status
                                ? "border-red-500"
                                : ""
                            }`}
                            disabled={!isEditingMode}
                          >
                            <option value="DRAFT">DRAFT</option>
                            <option value="SENT">SENT</option>
                            <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                            <option value="REJECTED">REJECTED</option>
                          </Field>
                          <ErrorMessage
                            name="status"
                            component="div"
                            className="text-danger mt-1"
                          />
                        </div>
                      </div>
                      {/* Year input field */}
                      <div className="py-2 flex flex-row gap-2">
                        <label
                          htmlFor="year"
                          className="block text-sm font-medium text-gray-700 w-3/12"
                        >
                          Year:
                        </label>
                        <div
                          className={
                            touched.year && errors.year
                              ? "has-error w-9/12"
                              : "w-9/12"
                          }
                        >
                          <Field
                            name="year"
                            type="number"
                            id="year"
                            placeholder="Enter year"
                            className={`flex-1 form-input ${
                              !isEditingMode ? "text-gray-500" : ""
                            }`}
                            disabled={!isEditingMode}
                          />
                          <ErrorMessage
                            name="year"
                            component="div"
                            className="text-danger mt-1"
                          />
                        </div>
                      </div>

                      {/* Number of Trainings */}
                      <div className="py-2 flex flex-row gap-2">
                        <label
                          htmlFor=""
                          className="block text-sm font-medium text-gray-700 w-3/12"
                        >
                          Number of Training(s):
                        </label>
                        <div className={"w-9/12"}>
                          {cpData?.training?.length}
                        </div>
                      </div>

                      {/* Total Budget of CP */}
                      <div className="py-2 flex flex-row gap-2">
                        <label
                          htmlFor=""
                          className="block text-sm font-medium text-gray-700 w-3/12"
                        >
                          Total Budget:
                        </label>
                        <div className={"w-9/12"}>
                          {cpData?.currency ||
                            cpData?.training[0]?.currency ||
                            "RWF"}{" "}
                          {(cpData?.training || [])
                            .reduce(
                              (total: any, training: { budget: any }) =>
                                total + (training.budget || 0),
                              0
                            )
                            .toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          )}
          <hr></hr>
          <span>
            <h6 className="text-lg font-bold my-5">Training Information</h6>
          </span>
          {/**
           * Trainings Table
           */}
          <div className="panel mt-6">
            <div className="flex flex-col justify-start item-center my-6 sm:flex-row flex-col sm:items-center sm:gap-3 gap-40 w-full sm:w-auto z-99">
              <div className="relative ">
                <input
                  type="text"
                  placeholder="Search Trainings..."
                  className="form-input ltr:pr-11 rtl:pl-11 peer"
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

              {/* Searchable Select*/}
              {/* <div className="flex items-center justify-between"></div>
              <div className="relative z-10 w-48">
                <Select
                  placeholder="Select status"
                  options={statusOptions}
                  defaultValue={status}
                  onChange={handleStatusChange}
                />
              </div> */}

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

            <div className="datatables z-40">
              <DataTable
                className="whitespace-nowrap table-hover"
                records={cpData?.training}
                striped
                columns={[
                  {
                    accessor: "index",
                    title: "No",
                    render: (_, index) => index + 1,
                  },
                  { accessor: "action", sortable: true, title: "Title" },
                  {
                    accessor: "status",
                    title: "Status",
                    sortable: true,
                    render: ({ status }) => <StatusBadge status={status} />,
                  },
                  {
                    accessor: "mode",
                    sortable: true,
                    title: "Mode",
                  },
                  {
                    accessor: "startDate",
                    sortable: true,
                    title: "Start Date",
                    render: (record: any) =>
                      record.startDate
                        ? new Date(record.startDate).toLocaleDateString()
                        : "-",
                  },
                  {
                    accessor: "endDate",
                    sortable: true,
                    title: "End Date",
                    render: (record) =>
                      record.endDate
                        ? new Date(record.endDate).toLocaleDateString()
                        : "-",
                  },
                  {
                    accessor: "budget",
                    sortable: true,
                    title: "Budget",
                    render: (record: trainingInfo) => (
                      <CurrencyFormatter
                        amount={record.budget}
                        currency={record.currency}
                      />
                    ),
                  },

                  {
                    accessor: "program",
                    sortable: true,
                    title: "Program",
                  },
                  {
                    accessor: "subProgram",
                    sortable: true,
                    title: "Sub Program",
                  },
                  {
                    accessor: "maleParticipants",
                    sortable: true,
                    title: "Male Participants",
                  },
                  {
                    accessor: "femaleParticipants",
                    sortable: true,
                    title: "Female Participants",
                  },

                  { accessor: "type", sortable: true },
                  {
                    accessor: "responsibleEntity",
                    sortable: true,
                    title: "Responsible Entity",
                  },
                  {
                    accessor: "stakeholders",
                    sortable: true,
                    render: ({ stakeholders }) =>
                      arrayToCommaSeparatedString(stakeholders),
                  },

                  {
                    accessor: "fundSource",
                    sortable: true,
                    title: "Source of Fund",
                  },

                  {
                    accessor: "moreAction",
                    title: "Actions",
                    render: ({ id }) => (
                      <div className="dropdown">
                        <Dropdown
                          offset={[0, 5]}
                          placement={"top-start"}
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
                                  openTrainingModal(id);
                                  setTrainingModalType("view");
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
                                  openTrainingModal(id);
                                  setTrainingModalType("edit");
                                }}
                              >
                                <IconPencil className="mr-2" />{" "}
                                <span>Edit</span>
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="flex items-center space-x-2"
                                onClick={() => openFinishModalHandler(id)}
                              >
                                <IconThumbUp className="mr-2 text-green-500" />{" "}
                                <span>Mark as Finished</span>
                              </button>
                            </li>
                            {/* <li>
                          <button
                            type="button"
                            className="flex items-center space-x-2"
                            onClick={() => openRejectModalHandler(id)}
                          >
                            <IconX className="mr-2 text-red-500" />{" "}
                            <span>Reject</span>
                          </button>
                        </li> */}
                            <li>
                              <button
                                type="button"
                                className="flex items-center space-x-2"
                                onClick={() => handleDelete(id)}
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
                highlightOnHover
                totalRecords={cpData?.training?.length}
                recordsPerPage={pageSize2}
                page={page2}
                onPageChange={(p) => setPage2(p)}
                recordsPerPageOptions={[5, 10, 20, 50]}
                onRecordsPerPageChange={setPageSize2}
                selectedRecords={selectedRecords}
                onSelectedRecordsChange={setSelectedRecords}
                minHeight={200}
                paginationText={({ from, to, totalRecords }) =>
                  `Showing ${from} to ${to} of ${totalRecords} entries`
                }
                fontSize="sm"
              />
            </div>
            {/* <ToastContainer /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCP;
