import { DataTable } from "mantine-datatable";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { setPageTitle } from "../../redux/reducer/themeConfigSlice";
import { IRootState } from "../../redux/store";
import { Link, useNavigate } from "react-router-dom";
import IconHorizontalDots from "../../components/Icon/IconHorizontalDots";
import IconSearch from "../../components/Icon/IconSearch";
import Select from "react-select";
import IconEye from "../../components/Icon/IconEye";
import IconArchive from "../../components/Icon/IconArchive";
import Dropdown from "../../components/Dropdown";
import IconThumbUp from "../../components/Icon/IconThumbUp";
import IconX from "../../components/Icon/IconX";
import { useAppDispatch } from "../../redux/hooks";
import { downloadExcel } from "react-export-table-to-excel";
import {
  addCapacityPlan,
  fetchAllCapacityPlan,
  fetchCPCardsAnalytics,
  deleteCapacityPlan,
  updateCapacityPlan,
  bulkCreateCapacityPlan,
  fetchCapacityPlanInfo,
} from "../../redux/action/capacityPlanAction";
import {
  arrayToCommaSeparatedString,
  CurrencyFormatter,
  StatusBadge,
} from "../../util/helper";
import { CapacityPlanStatus, StateOptions } from "../../util/enum";
import IconPlus from "../../components/Icon/IconPlus";
import IconTxtFile from "../../components/Icon/IconTxtFile";
import Modal from "../Components/Modals";
import { CPBulkImport } from "../../components/CapacityPlan/bulk_import";
import { FormikProps } from "formik";
import { CapacityPlanForm } from "../Forms/CapacityPlanForm";
import { toast, ToastContainer } from "react-toastify";
import { resetCapacityPlanState } from "../../redux/reducer/capacityPlanSlice";
import IconDownload from "../../components/Icon/IconDownload";
import { GenerateReport } from "../../components/GenerateReport";
import ViewCP from "./ViewCP";

interface CPCardAnalyticsResultProps {
  amount: any;
  currency: string;
  percent: number;
}

interface CardAnalyticsData {
  requestedBudget: CPCardAnalyticsResultProps;
  allocatedBudget: CPCardAnalyticsResultProps;
  availableBudget: {
    amount: any;
    currency: string;
  };
}

const CapacityPlanTable = () => {
  const dispatch = useAppDispatch();

  const [capacityPlanData, setCapacityPlanData] = useState<any>(null);

  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [selectedRecords, setSelectedRecords] = useState<any>([]);
  const [isRowSelected, setIsRowSelected] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [cardAnalyticsYear, setCardAnalyticsYear] = useState(
    new Date().getFullYear()
  );
  const [status, setStatus] = useState<any>();
  const [year, setYear] = useState<number>(2024);
  const [industry, setIndustry] = useState<any>();
  const [modalProps, setModalProps] = useState<IModalProps>({
    isOpen: false,
    type: "addCapacityPlan",
    onClose: () => handleModalClose(),
    onSubmit: () => {},
  });

  const handleModalClose = () => {
    setModalProps((prev) => ({ ...prev, isOpen: false }));
  };

  const [page2, setPage2] = useState(1);
  const [pageSize2, setPageSize2] = useState(PAGE_SIZES[0]);

  const isDark = useSelector(
    (state: IRootState) =>
      state.themeConfig.theme === "dark" || state.themeConfig.isDarkMode
  );
  const fetchCapacityPlanState = useSelector(
    (state: IRootState) => state.capacityPlan.fetchState
  );
  const fetchCardsAnalyticsState = useSelector(
    (state: IRootState) => state.capacityPlan.fetchCardsAnalytics
  );

  const addCapacityPlanState = useSelector(
    (state: IRootState) => state.capacityPlan.addState
  );

  const deleteCapacityPlanState = useSelector(
    (state: IRootState) => state.capacityPlan.deleteState
  );

  const updateCapacityPlanState = useSelector(
    (state: IRootState) => state.capacityPlan.updateState
  );

  const bulkImportCapacityPlanState = useSelector(
    (state: IRootState) => state.capacityPlan.bulkCreateState
  );

  const cpData = fetchCapacityPlanState?.data?.data;
  const [cardAnalyticsData, setCardAnalyticsData] =
    useState<CardAnalyticsData | null>(null);

  useEffect(() => {
    const data = fetchCardsAnalyticsState?.data?.data;
    if (data) {
      setCardAnalyticsData(data);
    }
  }, [fetchCardsAnalyticsState]);

  // Status options
  const statusOptions = [
    { value: "", label: "All" },
    { value: CapacityPlanStatus.DRAFT, label: "Draft" },
    { value: CapacityPlanStatus.SENT, label: "Sent" },
    { value: CapacityPlanStatus.APPROVED, label: "Approved" },
    { value: CapacityPlanStatus.REJECTED, label: "Rejected" },
    { value: CapacityPlanStatus.UNDER_REVIEW, label: "Under Review" },
  ];

  // Filters
  const orgFilters: capacityPlanFilters = {
    searchKey,
    status: status,
    industry: industry,
    year: year,
  };

  const AnalyticsFilter: any = {
    cardAnalyticsYear,
  };

  // Effects
  useEffect(() => {
    dispatch(setPageTitle("Checkbox Table"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCPCardsAnalytics(cardAnalyticsYear));
  }, [cardAnalyticsYear, dispatch]);

  useEffect(() => {
    dispatch(fetchAllCapacityPlan({ status, year, industry, searchKey }));
  }, [searchKey, status, industry, year, dispatch]);

  useEffect(() => {
    if (selectedRecords.length > 0) {
      setIsRowSelected(true);
    }
    if (selectedRecords.length === 0) {
      setIsRowSelected(false);
    }
  }, [selectedRecords]);

  const [bulkCPModalOpen, setBulkCPModalOpen] = useState(false);
  const [isCPBulkSubmit, setIsCPBulkSubmit] = useState(false);

  const openAddBulkCPModal = () => setBulkCPModalOpen(true);
  const closeAddBulkCPModal = () => {
    setIsCPBulkSubmit(false);
    setBulkCPModalOpen(false);
  };
  const handleSearchChange = (e: any) => setSearchKey(e.target.value);

  const handleStatusChange = (selectedOption: any) => {
    setStatus(selectedOption?.value);
  };
  const handleYearChange = (selectedOption: any) => {
    setYear(selectedOption?.value);
  };

  const handleAnalyticYearChange = (selectedOption: any) => {
    setCardAnalyticsYear(selectedOption?.value);
  };

  let radialBarChart: ReactChartProps | any;
  if (cardAnalyticsData) {
    radialBarChart = (
      reqAmountPercent: number,
      allAmountPercent: number,
      availableAmount?: number
    ) => {
      console.log(
        "TYPE OF --> ",
        typeof [
          parseFloat(Number(reqAmountPercent).toFixed(2)),
          parseFloat(Number(allAmountPercent).toFixed(2)),
        ],
        parseFloat(Number(reqAmountPercent).toFixed(2)),
        parseFloat(Number(allAmountPercent).toFixed(2))
      );
      return {
        series: [
          parseFloat(Number(reqAmountPercent).toFixed(2)),
          parseFloat(Number(allAmountPercent).toFixed(2)),
        ] as ApexNonAxisChartSeries,
        // series: [
        //   isNaN(parseFloat(Number(reqAmountPercent).toFixed(2)))
        //     ? 417
        //     : parseFloat(Number(reqAmountPercent).toFixed(2)),
        //   isNaN(parseFloat(Number(allAmountPercent).toFixed(2)))
        //     ? 1
        //     : parseFloat(Number(allAmountPercent).toFixed(2)),
        // ] as ApexNonAxisChartSeries,
        // series: [417, 1] as ApexNonAxisChartSeries,
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
                    return `RWF ${availableAmount}`;
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
    };
  }

  const handleCreateBulkCP = () => {
    if (bulkData && bulkCPModalOpen) {
      setIsCPBulkSubmit(true);
      console.log("State Here 22222222222 --> ", bulkData);
      debugger;
      dispatch(bulkCreateCapacityPlan(bulkData));
      debugger;
      closeAddBulkCPModal();
    }
  };

  const formRef = useRef<FormikProps<any> | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddCP = () => {
    if (formRef.current && !isSubmitting) {
      setIsSubmitting(true);
      const formValues = formRef?.current.values;
      dispatch(
        addCapacityPlan({
          ...formValues,
          participants: {
            male: formValues?.maleParticipants,
            female: formValues?.femaleParticipants,
          },
        })
      );
    }
    setIsSubmitting(false);
    handleModalClose();
  };

  const handleApproveCP = (cpId: string) => {
    console.log("Approves, Id --> ", cpId);
    dispatch(
      updateCapacityPlan({
        data: {
          status: CapacityPlanStatus.APPROVED,
        },
        id: cpId,
      })
    );
    handleModalClose();
  };

  const handleRejectCP = (cpId: string) => {
    console.log("Rejects, ID --> ", cpId);
    dispatch(
      updateCapacityPlan({
        data: {
          status: CapacityPlanStatus.REJECTED,
        },
        id: cpId,
      })
    );
    handleModalClose();
  };

  const handleDelete = (id: string) => {
    console.log("ID --->", id);
    dispatch(deleteCapacityPlan(id));
    closeAddBulkCPModal();
  };

  const [activeToast, setActiveToast] = useState<string | null>(null);

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
    dispatch(fetchAllCapacityPlan(orgFilters));
    dispatch(fetchCPCardsAnalytics(AnalyticsFilter));
    setActiveToast(null);
  };

  const clearToast = () => {
    dispatch(resetCapacityPlanState);
    setActiveToast(null);
  };

  useEffect(() => {
    // Handle Add Capacity Plan
    if (addCapacityPlanState.state !== StateOptions.INITIAL) {
      showToast(
        addCapacityPlanState.state!,
        addCapacityPlanState.message!,
        "Added Capacity plan successfully!",
        addCapacityPlanState.data?.message || "Failed to add Capacity plan."
      );
      clearToast();
    }

    // Handle Delete Capacity Plan
    if (deleteCapacityPlanState.state !== StateOptions.INITIAL) {
      showToast(
        deleteCapacityPlanState.state!,
        deleteCapacityPlanState.message!,
        "Deleted Capacity plan successfully!",
        deleteCapacityPlanState.data?.message ||
          "Failed to delete Capacity plan."
      );
      clearToast();
    }

    // Handle Update Capacity Plan
    if (updateCapacityPlanState.state !== StateOptions.INITIAL) {
      showToast(
        updateCapacityPlanState.state!,
        updateCapacityPlanState.message!,
        "Updated Capacity plan successfully!",
        updateCapacityPlanState.data?.message ||
          "Failed to update Capacity plan."
      );
      clearToast();
    }

    // Handle Bulk Create of Capacity Plan notification
    if (bulkImportCapacityPlanState.state !== StateOptions.INITIAL) {
      debugger;
      showToast(
        bulkImportCapacityPlanState.state!,
        bulkImportCapacityPlanState.message!,
        "Capacity plan bulk import successful!",
        bulkImportCapacityPlanState.data?.message ||
          "Failed to bulk create Capacity plan."
      );
      clearToast();
    }
  }, [
    addCapacityPlanState,
    deleteCapacityPlanState,
    updateCapacityPlanState,
    activeToast,
    bulkImportCapacityPlanState,
  ]);

  const openApproveModalHandler = (cpId?: string, selectedRecords?: any) => {
    setModalProps({
      type: "approve",
      isOpen: true,
      onClose: modalProps.onClose,
      onSubmit: () => handleApproveCP(cpId!),
      title: "Approve Capacity Plan",
      button1Text: "Cancel",
      button2Text: "Approve",
      buttonTwoDisabled: false,
      content: <p>Are you sure you want to approve this capacity plan?</p>,
    });
  };

  const openRejectModalHandler = (cpId?: string, selectedRecords?: any) => {
    if (cpId) {
      setModalProps({
        type: "reject",
        isOpen: true,
        onClose: modalProps.onClose,
        onSubmit: () => handleRejectCP(cpId!),
        title: "Reject",
        button1Text: "Cancel",
        button2Text: "Reject",
        buttonTwoDisabled: false,
        content: <p>Are you sure you want to reject this capacity plan?</p>,
      });
    }
  };

  const navigate = useNavigate();

  
  const handleViewCP = (cpId: string) => {
    console.log("ID --->", cpId);
    const data = cpData?.capacityPlans.find((cp: capacityplanInfo) => cp.id === cpId);
    setCapacityPlanData(
     data
    );
    navigate(`/cp/view/${cpId}`);
  };

// useEffect(() => {
//   if (capacityPlanData) {
//     // openCapacityPlanModal("viewCapacityPlan", "View Capacity Plan");
//     // dispatch(fetchCapacityPlanInfo(capacityPlanData?.id));
//     <ViewCP capacityPlanInfo={capacityPlanData} />
//   }
// }, [capacityPlanData]);

  // const openCapacityPlanModal = (
  //   type: ModalType,
  //   title: string,
  // ) => {
  //   setModalProps({
  //     type,
  //     isOpen: true,
  //     onClose: modalProps.onClose,
  //     onSubmit: () => handleAddCP(),
  //     title,
  //     button1Text: "Cancel",
  //     button2Text: "Save",
  //     content: (
  //       <CapacityPlanForm
  //         setCapacityPlanData={setCapacityPlanData}
  //         formRef={formRef}
  //         capacityPlanData={capacityPlanData}
  //         // isEditing={type ===  "editCapacityPlan"}
  //       />
  //     ),
  //     buttonTwoDisabled: false,
  //     size: "max-w-4xl",
  //   });
  // };

  const uniqueYears: any[] = useMemo(() => {
    const years = cpData?.capacityPlans.map(
      (plan: capacityplanInfo) => plan.year
    );
    return Array.from(new Set(years)).sort(); // Sort if needed
  }, [cpData]);
  console.log(uniqueYears);

  interface IYears {
    label: string;
    value: number;
  }
  const yearOptions: any = uniqueYears.map((year) => ({
    label: year.toString(),
    value: year,
  }));
  console.log(yearOptions);

  const yearOptions2: any = [
    { value: 2023, label: "2023" },
    { value: 2024, label: "2024" },
  ];

  const header = [
    // "No",
    "Title",
    "Program",
    "Sub Program",
    "Budget",
    "Target Year",
    "Status",
    "Type",
    "Action",
    "Responsible Entity",
    "Stakeholders",
    "Source of Fund",
  ];

  const filterKeys = [
    "title",
    "program",
    "subProgram",
    "budget",
    "year",
    "status",
    "type",
    "action",
    "responsibleEntity",
    "stakeholders",
    "fundSource",
  ];

  interface CapacityPlan {
    [key: string]: any;
  }

  const filteredCapacityPlans: CapacityPlan[] = cpData?.capacityPlans?.map(
    (plan: CapacityPlan) => {
      const filteredPlan: CapacityPlan = {};
      filterKeys.forEach((key) => {
        if (key in plan) {
          filteredPlan[key] = plan[key];
        }
      });
      return filteredPlan;
    }
  );

  function handleDownloadExcel() {
    downloadExcel({
      fileName: "capacity_plan",
      sheet: "cp",
      tablePayload: {
        header,
        body: filteredCapacityPlans,
      },
    });
  }

  console.log("YYEEAARR -->>", year);

  const [bulkData, setBulkData] = useState();
  useEffect(() => {}, [bulkData]);

  console.log(cardAnalyticsData?.availableBudget?.amount!);
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
          size={modalProps.size}
        />
      )}

      {bulkCPModalOpen && (
        <Modal
          isOpen={bulkCPModalOpen}
          title="Capactiy Plan Bulk Import"
          content={
            <CPBulkImport
              cpBulkSubmit={isCPBulkSubmit}
              setIsCPBulkSubmit={setIsCPBulkSubmit}
              // handleBulkImport={handleCreateBulkCP}
              setBulkData={setBulkData}
            />
          }
          button1Text="Cancel"
          button2Text="Upload"
          onClose={closeAddBulkCPModal}
          onSubmit={handleCreateBulkCP}
          buttonTwoDisabled={!isCPBulkSubmit}
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
            <span>Overview</span>
          </li>
        </ul>
      </div>

      <div className="panel ">
        <div className="flex flex-col items-start justify-end gap-4">
          <div className="flex relative w-full justify-end px-8 gap-4">
            {/* <IconHorizontalDots /> */}
            <div className="dropdown">
              <Dropdown
                placement={"bottom-end"}
                button={
                  <IconHorizontalDots className="w-5 h-5 text-black/70 dark:text-white/70 hover:!text-cdms_primary" />
                }
              >
                <ul className="w-48">
                  <li>
                    <button type="button" className="w-48">
                      <Link to="/cp/add">RDB Capacity Plan</Link>
                    </button>
                  </li>
                </ul>
              </Dropdown>
            </div>
          </div>
          <div className="flex flex-row gap-8 items-center justify-between p-3 text-primary">
            {/**
             * Analytics
             * Card 1
             */}

            <div className="mb-5 flex items-center justify-center">
              <div className="max-w-[19rem] w-full bg-cdms_primary bg-opacity-10 shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none h-64">
                <div className="p-4">
                  <div className="bg-cdms_primary mb-2 p-1 inline-block text-[#f1f2f3] rounded-full">
                    <CurrencyFormatter
                      amount={cardAnalyticsData?.availableBudget?.amount!}
                      currency={cardAnalyticsData?.availableBudget?.currency}
                    />
                  </div>
                  <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">
                    Available Budget
                  </h5>
                  <p className="text-white-dark">
                    Available budget for capacity development projects in Rwanda
                    in the year {cardAnalyticsYear}.
                  </p>
                </div>
              </div>
            </div>

            {/**
             *
             * Card 2
             */}

            <div className="mb-5 flex items-center justify-center">
              <div className="max-w-[19rem] w-full bg-[#996111] bg-opacity-10 shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none h-64">
                <div className="p-4">
                  <div className="bg-[#996111] mb-2 p-1 inline-block text-[#f1f2f3] rounded-full">
                    <CurrencyFormatter
                      amount={cardAnalyticsData?.requestedBudget.amount!}
                      currency={cardAnalyticsData?.requestedBudget?.currency}
                    />
                  </div>
                  <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">
                    Requested Budget
                  </h5>
                  <p className="text-white-dark">
                    Pending requested budget for capacity development projects
                    in Rwanda in the year {cardAnalyticsYear}.
                  </p>
                </div>
              </div>
            </div>

            {/**
             *
             * Card 3
             */}

            <div className="mb-5 flex items-center justify-center">
              <div className="max-w-[19rem] w-full bg-[#805dca] bg-opacity-10 shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none h-64">
                <div className="p-4">
                  <div className="bg-[#805dca] mb-2 p-1 inline-block text-[#f1f2f3] rounded-full">
                    <CurrencyFormatter
                      amount={cardAnalyticsData?.allocatedBudget?.amount!}
                      currency={cardAnalyticsData?.allocatedBudget?.currency}
                    />
                  </div>
                  <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">
                    Allocated Budget
                  </h5>
                  <p className="text-white-dark">
                    Approved requested budget for capacity development projects
                    in Rwanda in the year {cardAnalyticsYear}.
                  </p>
                </div>
              </div>
            </div>

            {/**
             *
             * Card 4
             */}

            <div className="mb-5 flex items-center justify-center">
              <div className="max-w-[19rem] w-full bg-[#fff] bg-opacity-10 dark:bg-[#191e3a] dark:shadow-none h-64">
                <div className="p-4">
                  <div className="relative z-10 w-48">
                    <Select
                      defaultValue={yearOptions2[1]}
                      placeholder="Select Year"
                      options={yearOptions2}
                      onChange={handleAnalyticYearChange}
                    />
                  </div>
                  <span className="text-white">
                    <GenerateReport
                      link={`/report/cp/analytics`}
                      className="bg-cdms_primary hover:opacity-90 focus:ring-transparent focus:outline-none w-48 mt-4 lg:h-[42px] rounded-lg p-1"
                      buttonText="Generate Report"
                      params={`?year=${cardAnalyticsYear}`}
                      icon={IconDownload}
                    />
                  </span>
                </div>
              </div>
            </div>

            {/**
             *
             * Radia Bar Chart
             */}

            {/* <div className="">
              {cardAnalyticsData &&
                isNaN(cardAnalyticsData?.requestedBudget?.percent) &&
                isNaN(cardAnalyticsData?.allocatedBudget?.percent) && (
                  <div className="mb-5">
                    <ReactApexChart
                      series={radialBarChart().series}
                      options={
                        radialBarChart(
                          cardAnalyticsData?.requestedBudget?.percent,
                          cardAnalyticsData?.allocatedBudget?.percent,
                          cardAnalyticsData?.availableBudget?.amount.toLocaleString()
                        ).options
                      }
                      className="rounded-lg bg-white dark:bg-black overflow-hidden"
                      type="radialBar"
                      height={300}
                    />
                  </div>
                )}
            </div> */}
          </div>
        </div>
      </div>
      {/* </div> */}

      {/**
       * Capacity Plan Table
       */}
      <div className="panel mt-6">
        <div className="flex flex-col justify-start item-center my-6 sm:flex-row flex-col sm:items-center sm:gap-3 gap-40 w-full sm:w-auto z-50">
          <div className="relative ">
            <input
              type="text"
              placeholder="Search Capacity Plan..."
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
          <div className="relative z-10 w-48">
            <Select
              placeholder="Select status"
              options={statusOptions}
              defaultValue={status}
              onChange={handleStatusChange}
            />
          </div>

          <div className="relative z-10 w-48">
            <Select
              placeholder="Select Year"
              options={yearOptions}
              defaultValue={year}
              onChange={handleYearChange}
            />
          </div>

          {/* <div className="flex justify-end gap-4">
            <button
              type="button"
              className="btn btn-primary"
              onClick={openCapacityPlanModal}
            >
              <IconPlus className="w-5 h-5 ltr:mr-1.5 rtl:ml-1.5 shrink-0" />
              Add Capacity Plan
            </button>
          </div> */}

          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={openAddBulkCPModal}
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

          {isRowSelected && (
            <div className="flex gap-4">
              {/**
               * Optional capacity Plan Approve Button when selecting checkbox
               */}
              <button
                type="button"
                className="btn btn-danger gap-2"
                // onClick={() => deleteRow()}
                onClick={() => openRejectModalHandler("", selectedRecords)}
              >
                <IconX />
                Reject
              </button>
              <div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => openApproveModalHandler("", selectedRecords)}
                >
                  <IconThumbUp className="ltr:mr-2 rtl:ml-2" />
                  Approve
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="datatables z-40">
          <DataTable
            className="whitespace-nowrap table-hover"
            records={cpData?.capacityPlans}
            striped
            columns={[
              //   {
              //     accessor: "id",
              //     title: "ID",
              //   },
              {
                accessor: "index",
                title: "No",
                render: (_, index) => index + 1,
              },
              { accessor: "title", sortable: true },
              {
                accessor: "numberOfTrainings",
                title: "Number of Trainings",
                render: (record: capacityplanInfo) => (
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {record?.training!.length}
                  </span>
                ),
              },
              {
                accessor: "organizationName",
                title: "Organization",
                render: (record: capacityplanInfo) => (
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {record?.organization!?.name}
                  </span>
                ),
              },
              {
                accessor: "totalBudget",
                title: "Total Budgets",
                render: (record: capacityplanInfo) => (
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {record?.training![0]?.currency || record?.currency}{" "}
                    {record?.totalBudget?.toLocaleString() ||
                      record
                        .training!.reduce(
                          (total: any, { budget }: any) => total + budget,
                          0
                        )
                        .toLocaleString()}
                  </span>
                ),
              },
              {
                accessor: "year",
                title: "Target Year",
              },
              {
                accessor: "status",
                title: "Status",
                sortable: true,
                render: (record: capacityplanInfo) => (
                  <StatusBadge status={record.status!} />
                ),
              },

              {
                accessor: "moreAction",
                title: "Action",
                render: (record: capacityplanInfo) => (
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
                            onClick={() => handleViewCP(record.id!)}
                          >
                            <IconEye className="mr-2" /> <span>View</span>
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="flex items-center space-x-2"
                            onClick={() => openApproveModalHandler(record.id)}
                          >
                            <IconThumbUp className="mr-2 text-green-500" />{" "}
                            <span>Approve</span>
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="flex items-center space-x-2"
                            onClick={() => openRejectModalHandler(record.id)}
                          >
                            <IconX className="mr-2 text-red-500" />{" "}
                            <span>Reject</span>
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="flex items-center space-x-2"
                            onClick={() => handleDelete(record.id!)}
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
            totalRecords={cpData?.totalItems}
            recordsPerPage={pageSize2}
            page={page2}
            onPageChange={(p) => setPage2(p)}
            recordsPerPageOptions={PAGE_SIZES}
            onRecordsPerPageChange={setPageSize2}
            selectedRecords={selectedRecords}
            onSelectedRecordsChange={setSelectedRecords}
            minHeight={200}
            paginationText={({ from, to, totalRecords }) =>
              `Showing  ${from} to ${to} of ${totalRecords} entries`
            }
            fontSize="sm"
          />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CapacityPlanTable;
