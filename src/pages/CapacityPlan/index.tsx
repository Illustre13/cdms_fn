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
import { fetchAllCapacityPlan } from "../../redux/action/capacityPlanAction";
import {
  arrayToCommaSeparatedString,
  CurrencyFormatter,
  StatusBadge
} from "../../util/helper";
import { CapacityPlanStatus } from "../../util/enum";

const CapacityPlanTable = () => {
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
    { value: CapacityPlanStatus.PENDING, label: "Pending" },
    { value: CapacityPlanStatus.ACTIVE, label: "Active" },
    { value: CapacityPlanStatus.SUSPENDED, label: "Suspended" },
  ];

  const [openApproveModal, setOpenApproveModal] = useState(false);
  const openApproveModalHandler = () => {
    setOpenApproveModal(true);
  };
  const approveModalCloseHandler = () => {
    setOpenApproveModal(false);
  };
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [page2, setPage2] = useState(1);
  const [pageSize2, setPageSize2] = useState(PAGE_SIZES[0]);

  const fetchCapacityPlanState = useSelector(
    (state: IRootState) => state.capacityPlan.fetchState
  );

  const cpData = fetchCapacityPlanState?.data?.data;

  const orgFilters: capacityPlanFilters = {
    searchKey,
    status: status,
    industry: industry,
  };

  useEffect(() => {
    dispatch(fetchAllCapacityPlan(orgFilters));
  }, [searchKey, status, industry, dispatch]);

  const handleSearchChange = (e: any) => setSearchKey(e.target.value);

  const handleStatusChange = (selectedOption: any) => {
    console.log("Selected Status:", selectedOption);
    setStatus(selectedOption?.value);
  };

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
                    <button type="button">
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
                    RWF 50,500,678
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
                    RWF 12,569,678
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
                    RWF 34,569,678
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
              <div className="mb-5">
                <ReactApexChart
                  series={radialBarChart.series}
                  options={radialBarChart.options}
                  className="rounded-lg bg-white dark:bg-black overflow-hidden"
                  type="radialBar"
                  height={300}
                />
              </div>
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
          <div className="relative z-30 w-48">
            <Select
              placeholder="Select status"
              options={statusOptions}
              value={status}
			  onChange={handleStatusChange}
            />
          </div>

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
