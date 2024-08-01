import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setPageTitle } from "../../redux/reducer/themeConfigSlice";
import { IRootState } from "../../redux/store";
import { Link } from "react-router-dom";
import IconHorizontalDots from "../../components/Icon/IconHorizontalDots";
import IconSearch from "../../components/Icon/IconSearch";
import Select from "react-select";
import IconEye from "../../components/Icon/IconEye";
import IconArchive from "../../components/Icon/IconArchive";
import Dropdown from "../../components/Dropdown";
import IconThumbUp from "../../components/Icon/IconThumbUp";
import IconBolt from "../../components/Icon/IconBolt";
import { ApproveModal } from "./ApproveModal";
import IconX from "../../components/Icon/IconX";
import { useAppDispatch } from "../../redux/hooks";
import {
  deleteTraining,
  fetchAllTraining,
  updateTraining,
} from "../../redux/action/trainingAction";
import {
  arrayToCommaSeparatedString,
  CurrencyFormatter,
  StatusBadge,
} from "../../util/helper";
import { StateOptions, TrainingStatus } from "../../util/enum";
import { toast, ToastContainer } from "react-toastify";
import { downloadExcel } from "react-export-table-to-excel";
import IconFile from "../../components/Icon/IconFile";

const Training = () => {
  const isDark = useSelector(
    (state: IRootState) =>
      state.themeConfig.theme === "dark" || state.themeConfig.isDarkMode
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Checkbox Table"));
  });

  const [selectedRecords, setSelectedRecords] = useState<any>([]);

  const [searchKey, setSearchKey] = useState("");
  const [status, setStatus] = useState<any>();
  const [industry, setIndustry] = useState<any>();

  // radialBarChartOptions;
  const radialBarChart: any = {
    series: [34, 67],
    options: {
      chart: {
        height: 100,
        type: "radialBar",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#996111", "#805dca"],
      grid: {
        borderColor: isDark ? "#191e3a" : "#e0e6ed",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "Total Budget",
              formatter: function (w: any) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return `RWF 50,500,678`;
                // return 66;
              },
            },
          },
        },
      },
      labels: ["Requested", "Allocated"],
      fill: {
        opacity: 0.85,
      },
    },
  };

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

  const handleRejectCP = (trainigId: string) => {
    console.log("Rejects, ID --> ", trainigId);
    dispatch(
      updateTraining({
        data: {
          status: TrainingStatus.REJECTED,
        },
        id: trainigId,
      })
    );
    handleModalClose();
  };

  const handleDelete = (id: ItemID) => {
    console.log("ID --->", id);
    dispatch(deleteTraining(id));
    handleModalClose();
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
    dispatch(fetchAllTraining(orgFilters));
  };

  const clearToast = () => {
    setActiveToast(null);
  };

  const deleteTrainingState = useSelector(
    (state: IRootState) => state.training.deleteState
  );

  
  const updateTrainingState = useSelector(
    (state: IRootState) => state.training.updateState
  );

  const [activeToast, setActiveToast] = useState<string | null>(null);



  useEffect(() => {

    // Handle training
    if (deleteTrainingState.state !== StateOptions.IDLE) {
      showToast(
        deleteTrainingState.state!,
        deleteTrainingState.message!,
        "Deleted Training successfully!",
        deleteTrainingState.data?.message ||
          "Failed to delete Training."
      );
      clearToast();
    }

    // Handle Update Training
    if (updateTrainingState.state !== StateOptions.IDLE) {
      showToast(
        updateTrainingState.state!,
        updateTrainingState.message!,
        "Updated Training successfully!",
        updateTrainingState.data?.message ||
          "Failed to update Training."
      );
      clearToast();
    }
  }, [
    deleteTrainingState,
    updateTrainingState,
    activeToast,
  ]);

  const [openApproveModal, setOpenApproveModal] = useState(false);

  const openFinishModalHandler = (trainigId?: string, selectedRecords?: any) => {
    setModalProps({
      type: "approve",
      isOpen: true,
      onClose: modalProps.onClose,
      onSubmit: () => handleFinishedTraining(trainigId!),
      title: "Mark as Finished",
      button1Text: "Cancel",
      button2Text: "Approve",
      buttonTwoDisabled: false,
      content: <p>Are you sure you want to mark this training as finished?</p>,
    });
  };

  const handleFinishedTraining = (trainigId: string) => {
    console.log("Training, Id --> ", trainigId);
    dispatch(
      updateTraining({
        data: {
          status: TrainingStatus.FINISHED,
        },
        id: trainigId,
      })
    );
    handleModalClose();
  };

  const openRejectModalHandler = (trainigId?: string, selectedRecords?: any) => {
    if (selectedRecords) {
      console.log("HEHEHEHEHEHEHEH");
      console.log(selectedRecords);
    }
    if (trainigId) {
      setModalProps({
        type: "reject",
        isOpen: true,
        onClose: modalProps.onClose,
        onSubmit: () => handleRejectCP(trainigId!),
        title: "Reject",
        button1Text: "Cancel",
        button2Text: "Reject",
        buttonTwoDisabled: false,
        content: <p>Are you sure you want to reject this training?</p>,
      });
    }
  };

  const approveModalCloseHandler = () => {
    setOpenApproveModal(false);
  };
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [page2, setPage2] = useState(1);
  const [pageSize2, setPageSize2] = useState(PAGE_SIZES[0]);

  const fetchTrainingState = useSelector(
    (state: IRootState) => state.training.fetchState
  );

  const trainingsData = fetchTrainingState?.data?.data;
  console.log("CP DATA --->>>>>", trainingsData);
  const orgFilters: trainingFilters = {
    searchKey,
    status: status,
    industry: industry,
  };

  useEffect(() => {
    dispatch(fetchAllTraining(orgFilters));
  }, [searchKey, status, industry, dispatch]);

  const handleSearchChange = (e: any) => setSearchKey(e.target.value);

  const handleStatusChange = (selectedOption: any) => {
    console.log("Selected Status:", selectedOption);
    setStatus(selectedOption?.value);
  };

  const trainingTableHeade = [
    // "No",
    "Title",
    "Status",
    "Mode",
    "Start Date",
    "End Date",
    "Budget",
    // "Actions"
  ];

  const filterKeys = [
    "title",
    "status",
    "mode",
    "startDate",
    "endDate",
    "budgetAmount",
  ];

  const filteredTrainings = trainingsData?.trainings?.map((plan: any) => {
    const filteredPlan = {};
    filterKeys.forEach((key) => {
      if (key in plan) {
        filteredPlan[key] = plan[key];
      }
    });
    return filteredPlan;
  });

  function handleDownloadExcel() {
    downloadExcel({
      fileName: "table",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header: trainingTableHeade,
        body: filteredTrainings,
      },
    });
  }

  return (
    <div>
      {openApproveModal && (
        <ApproveModal
          openApprovalModal={openApproveModal}
          approveModalCloseHandler={approveModalCloseHandler}
        />
      )}

      {/** Bread Crumb */}
      <div>
        <ul className="flex space-x-2 rtl:space-x-reverse mb-5">
          <li>
            <Link to="/dashboard" className="text-cdms_primary hover:underline">
              Dashboard
            </Link>
          </li>
          <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
            <Link
              to="/cp/overview"
              className="text-cdms_primary hover:underline"
            >
              Capacity Plan
            </Link>
          </li>
          <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
            <Link
              to="/cp/trainings"
              className="text-cdms_primary hover:underline"
            >
              Training
            </Link>
          </li>
        </ul>
      </div>

      {/**
       * Trainings Table
       */}
      <div className="panel mt-6">
        <div className="flex flex-col justify-start item-center my-6 sm:flex-row flex-col sm:items-center sm:gap-3 gap-40 w-full sm:w-auto z-50">
          <div className="relative ">
            <input
              type="text"
              placeholder="Search Traings..."
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
          <div className="flex items-center justify-between"></div>
          <div className="relative z-30 w-48">
            <Select
              placeholder="Select status"
              options={statusOptions}
              value={status}
              onChange={handleStatusChange}
            />
          </div>

          <div>
            <button
              type="button"
              className="btn btn-primary btn-sm m-1"
              onClick={handleDownloadExcel}
            >
              <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
              EXCEL
            </button>
          </div>
        </div>

        <div className="datatables z-40">
          <DataTable
            className="whitespace-nowrap table-hover"
            records={trainingsData?.trainings}
            striped
            columns={[
              {
                accessor: "index",
                title: "No",
                render: (_, index) => index + 1,
              },
              { accessor: "title", sortable: true, title: "Title" },
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
                accessor: "budgetAmount",
                sortable: true,
                title: "Budget",
                render: (record) => (
                  <CurrencyFormatter
                    amount={record.budgetAmount}
                    currency="RWF"
                  />
                ), // Adjust currency as necessary
              },
              // {
              //   accessor: "capacityPlan",
              //   title: "Capacity Plan ID",
              //   render: (record) => record.capacityPlan ? record.capacityPlan.id : 'N/A',
              // },
              // {
              //   accessor: "employeeTraining",
              //   title: "Employee Trainings",
              //   render: (record) => record.employeeTraining.length || '0',
              // },
              {
                accessor: "actions",
                title: "Actions",
                render: ({ id }) => (
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
            totalRecords={trainingsData?.totalItems}
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
          />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Training;
