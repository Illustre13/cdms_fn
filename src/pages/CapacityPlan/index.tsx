import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setPageTitle } from "../../redux/reducer/themeConfigSlice";
import ReactApexChart from "react-apexcharts";
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
  fetchAllCapacityPlan,
  fetchCPCardsAnalytics,
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
import { CPBulkImport } from "../../components/CapacityPlan.tsx/bulk_import";

const CapacityPlanTable = () => {
  const dispatch = useAppDispatch();
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [selectedRecords, setSelectedRecords] = useState<any>([]);
  const [isRowSelected, setIsRowSelected] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [cardAnalyticsYear, setCardAnalyticsYear] = useState(
    new Date().getFullYear()
  );
  const [status, setStatus] = useState<any>();
  const [industry, setIndustry] = useState<any>();
  const [openApproveModal, setOpenApproveModal] = useState(false);
  const [page2, setPage2] = useState(1);
  const [pageSize2, setPageSize2] = useState(PAGE_SIZES[0]);
  //   const [availableAmount, setAvailableAmount] = useState(0);
  //   const [requestedAmount, setRequestedAmount] = useState(0);
  //   const [allocatedAmount, setAllocatedAmount] = useState(0);
  //   const [requestedAmountPercent, setRequestedAmountPercent] = useState(0);
  //   const [allocatedAmountPercent, setAllocatedAmountPercent] = useState(0);

  // Selector declarations
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

  // Data from selectors
  const cpData = fetchCapacityPlanState?.data?.data;
  const cardAnalyticsData = fetchCardsAnalyticsState?.data?.data;

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
  };

  const AnalyticsFilter: any = {
    cardAnalyticsYear,
  };

  // Effects
  useEffect(() => {
    dispatch(setPageTitle("Checkbox Table"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllCapacityPlan(orgFilters));
  }, [searchKey, status, industry, dispatch]);

  useEffect(() => {
    dispatch(fetchCPCardsAnalytics(AnalyticsFilter));
  }, [dispatch, cardAnalyticsYear]);

  useEffect(() => {
    if (selectedRecords.length > 0) {
      setIsRowSelected(true);
    }
    if (selectedRecords.length === 0) {
      setIsRowSelected(false);
    }
  }, [selectedRecords]);

  // Handlers
  const openApproveModalHandler = () => {
    setOpenApproveModal(true);
  };

  const approveModalCloseHandler = () => {
    setOpenApproveModal(false);
  };

  const [bulkCPModalOpen, setBulkCPModalOpen] = useState(false);
  const openAddBulkCPModal = () => setBulkCPModalOpen(true);
  const closeAddBulkCPModal = () => {
	setIsCPBulkSubmit(false)
	setBulkCPModalOpen(false);
  }
  const closeBulkCPModal = () => {
	setIsCPBulkSubmit(false)
	setBulkCPModalOpen(false);
  }
  const handleSearchChange = (e: any) => setSearchKey(e.target.value);

  const handleStatusChange = (selectedOption: any) => {
    setStatus(selectedOption?.value);
  };
  let radialBarChart: ReactChartProps | any;
  if (cardAnalyticsData) {
    console.log(cardAnalyticsData);
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
        ]
      );
      return {
        // series: [parseFloat(Number(reqAmountPercent).toFixed(2)), parseFloat(Number(allAmountPercent).toFixed(2))] as ApexNonAxisChartSeries,
        series: [417, 1] as ApexNonAxisChartSeries,
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

  const [isCPBulkSubmit, setIsCPBulkSubmit] = useState(false);

  const handleCreateBulkCP = () => {
    if (bulkCPModalOpen) {
      setIsCPBulkSubmit(true);
    }
  };

  return (
    <div>
      {openApproveModal && (
        <ApproveModal
          openApprovalModal={openApproveModal}
          approveModalCloseHandler={approveModalCloseHandler}
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
              handleBulkImport={handleCreateBulkCP}
            />
            // <CPBulkImport cpBulkSubmit={isCPBulkSubmit}/>
            // <OrganizationForm setSignupData={setSignupData} formRef={formRef} />
          }
          button1Text="Cancel"
          button2Text="Upload"
          onClose={closeAddBulkCPModal}
          onSubmit={closeBulkCPModal}
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
                placement={"bottom-start"}
                button={
                  <IconHorizontalDots className="w-5 h-5 text-black/70 dark:text-white/70 hover:!text-cdms_primary" />
                }
              >
                <ul>
                  <li>
                    <button type="button" className="w-72">
                      <Link to="/cp/add">Create Capacity Plan</Link>
                    </button>
                  </li>
                </ul>
              </Dropdown>
            </div>
          </div>
          <div className="flex flex-row gap-8 items-center p-3 text-primary">
            {/**
             * Analytics
             * Card 1
             */}

            <div className="mb-5 flex items-center justify-center">
              <div className="max-w-[19rem] w-full bg-cdms_primary bg-opacity-10 shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none h-64">
                <div className="p-4">
                  <div className="bg-cdms_primary mb-2 p-1 inline-block text-[#f1f2f3] rounded-full">
                    <CurrencyFormatter
                      amount={cardAnalyticsData?.availableBudget?.amount}
                      currency={cardAnalyticsData?.availableBudget?.currency}
                    />
                  </div>
                  <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">
                    Available Budget
                  </h5>
                  <p className="text-white-dark">
                    Available budget for capacity development projects in Rwanda
                    in the year 2024.
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
                      amount={cardAnalyticsData?.requestedBudget.amount}
                      currency={cardAnalyticsData?.requestedBudget?.currency}
                    />
                  </div>
                  <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">
                    Requested Budget
                  </h5>
                  <p className="text-white-dark">
                    Pending requested budget for capacity development projects
                    in Rwanda in the year 2024.
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
                      amount={cardAnalyticsData?.allocatedBudget?.amount}
                      currency={cardAnalyticsData?.allocatedBudget?.Currency}
                    />
                  </div>
                  <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">
                    Allocated Budget
                  </h5>
                  <p className="text-white-dark">
                    Approved requested budget for capacity development projects
                    in Rwanda in the year 2024.
                  </p>
                </div>
              </div>
            </div>

            {/**
             *
             * Chart 1
             */}

            <div className="">
              {/* <div className="mb-5 flex items-center justify-between">
						<h5 className="text-lg font-semibold dark:text-white">
							Radial Bar
						</h5>
					</div> */}
              {cardAnalyticsData && (
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
            </div>
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
              value={status}
              onChange={handleStatusChange}
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="btn btn-primary"
              // onClick={openAddBulkCPModal}
            >
              <IconPlus className="w-5 h-5 ltr:mr-1.5 rtl:ml-1.5 shrink-0" />
              Add New Capacity Plan
            </button>
          </div>

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

          {isRowSelected && (
            <div className="flex gap-4">
              {/**
               * Optional capacity Plan Approve Button when selecting checkbox
               */}
              <button
                type="button"
                className="btn btn-danger gap-2"
                // onClick={() => deleteRow()}
              >
                <IconX />
                Reject
              </button>
              <div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setOpenApproveModal(true)}
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
              {
                accessor: "index",
                title: "No",
                render: (_, index) => index + 1,
              },
              { accessor: "title", sortable: true },
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
                accessor: "amountCurrency",
                title: "Budget",
                render: (record: any) => (
                  <CurrencyFormatter
                    amount={record.budget}
                    currency={record.currency}
                  />
                ),
              },
              {
                accessor: "status",
                title: "Status",
                sortable: true,
                render: ({ status }) => <StatusBadge status={status} />,
              },
              // {
              // 	accessor: "participants.male",
              // 	sortable: true,
              // 	title: "Male Participants",
              // },
              // {
              // 	accessor: "participants.female",
              // 	sortable: true,
              // 	title: "Female Participants",
              // },
              { accessor: "type", sortable: true },
              { accessor: "action", sortable: true },
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
                accessor: "action",
                title: "Action",
                render: () => (
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
							onClick={() => setOpenApproveModal(true)}
                          >
                            <IconThumbUp className="mr-2 text-green-500" />{" "}
                            <span>Approve</span>
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="flex items-center space-x-2"
                          >
                            <IconBolt className="mr-2" /> <span>Reject</span>
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="flex items-center space-x-2"
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
          />
        </div>
      </div>
    </div>
  );
};

export default CapacityPlanTable;
