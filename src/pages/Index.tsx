import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import ReactApexChart from "react-apexcharts";
import PerfectScrollbar from "react-perfect-scrollbar";
import Dropdown from "../components/Dropdown";
import { setPageTitle } from "../redux/reducer/themeConfigSlice";
import IconHorizontalDots from "../components/Icon/IconHorizontalDots";
import IconArrowLeft from "../components/Icon/IconArrowLeft";
import { fetchUserInfo, userInfoAnalytics } from "../redux/action/UserAction";
import { fetchAllCapacityPlan } from "../redux/action/capacityPlanAction";
import { useAppDispatch } from "../redux/hooks";
import { convertTimestamp } from "../util/helper";
import Modal from "./Components/Modals";
import { fetchCPBudgetAnalytics } from "../redux/action/capacityPlanAction";
import { StateOptions } from "../util/enum";

const Index = () => {
  const dispatch = useAppDispatch();

  const fetchCapacityPlanState = useSelector(
    (state: IRootState) => state.capacityPlan.fetchState
  );

  const cpData = fetchCapacityPlanState?.data?.data;

  console.log(cpData);
  const [searchKey, setSearchKey] = useState("");
  const [status, setStatus] = useState<any>();
  const [industry, setIndustry] = useState<any>();
  const [loadingUser, setLoadingUser] = useState(true);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    dispatch(setPageTitle("Dashboard"));
  });
  const isDark = useSelector(
    (state: IRootState) =>
      state.themeConfig.theme === "dark" || state.themeConfig.isDarkMode
  );
  const userInfoState = useSelector((state: IRootState) => state.user.fetchUserInfoState);

  useEffect(() => {
    if (userInfoState?.data?.data && loadingUser) {
      dispatch(fetchUserInfo())
        .unwrap()
        .then(() => setLoadingUser(false))
        .catch(() => setShowModal(true));
    } else {
      setLoadingUser(false);
    }
  }, [dispatch, userInfoState.data, loadingUser]);

  const handleRetry = () => {
    setLoadingUser(true);
    dispatch(fetchUserInfo())
      .unwrap()
      .then(() => setLoadingUser(false))
      .catch(() => setShowModal(true)); // Show modal if there's an error
  };

  const handleGoToLogin = () => {
    window.location.href = "/cdms-signin";
  };

  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl"
      ? true
      : false;

  const [loading] = useState(false);

  const cpFilters: capacityPlanFilters = {
    searchKey,
    status: status,
    industry: industry,
  };

  useEffect(() => {
    dispatch(fetchAllCapacityPlan(cpFilters));
  }, [searchKey, status, industry, dispatch]);

  //Capacity Need Assessement
  const assessmentChart: any = {
    series: [
      {
        name: "Sent",
        data: [5, 450, 320, 12, 15, 17, 19, 16, 15, 170, 14, 47],
      },
      {
        name: "Under Review",
        data: [165, 175, 162, 173, 16, 195, 76, 17, 16, 90, 18, 19],
      },
      {
        name: "Reviewed",
        data: [165, 175, 162, 173, 16, 195, 36, 17, 16, 19, 180, 19],
      },
    ],
    options: {
      chart: {
        height: 325,
        type: "area",
        fontFamily: "Nunito, sans-serif",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: "smooth",
        width: 2,
        lineCap: "square",
      },
      dropShadow: {
        enabled: true,
        opacity: 0.2,
        blur: 10,
        left: -7,
        top: 22,
      },
      colors: isDark
        ? ["#2196F3", "#E7515A", "#FF99A5"]
        : ["#1B55E2", "#E7515A", "#FF99A5"],
      markers: {
        discrete: [
          {
            seriesIndex: 0,
            dataPointIndex: 6,
            fillColor: "#1B55E2",
            strokeColor: "transparent",
            size: 7,
          },
          {
            seriesIndex: 1,
            dataPointIndex: 5,
            fillColor: "#E7515A",
            strokeColor: "transparent",
            size: 7,
          },
        ],
      },
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          show: true,
        },
        labels: {
          offsetX: isRtl ? 2 : 0,
          offsetY: 5,
          style: {
            fontSize: "12px",
            cssClass: "apexcharts-xaxis-title",
          },
        },
      },
      yaxis: {
        tickAmount: 10,
        labels: {
          formatter: (value: number) => {
            return value;
          },
          offsetX: isRtl ? -30 : -10,
          offsetY: 0,
          style: {
            fontSize: "12px",
            cssClass: "apexcharts-yaxis-title",
          },
        },
        opposite: isRtl ? true : false,
      },
      grid: {
        borderColor: isDark ? "#191E3A" : "#E0E6ED",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        fontSize: "16px",
        markers: {
          width: 10,
          height: 10,
          offsetX: -2,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
      },
      tooltip: {
        marker: {
          show: true,
        },
        x: {
          show: false,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: !1,
          opacityFrom: isDark ? 0.19 : 0.28,
          opacityTo: 0.05,
          stops: isDark ? [100, 100] : [45, 100],
        },
      },
    },
  };

  //Trainings
  const cdmsTrainings: any = {
    series: [345, 900, 299, 760],
    options: {
      chart: {
        type: "donut",
        height: 460,
        fontFamily: "Nunito, sans-serif",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 25,
        colors: isDark ? "#0e1726" : "#fff",
      },
      colors: isDark
        ? ["#5c1ac3", "#e2a03f", "#e7515a", "#e2a03f"]
        : ["#e2a03f", "#5c1ac3", "#e7515a", "#e2a03f"],
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        fontSize: "14px",
        markers: {
          width: 10,
          height: 10,
          offsetX: -2,
        },
        height: 50,
        offsetY: 20,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
            background: "transparent",
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "29px",
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: "26px",
                color: isDark ? "#bfc9d4" : undefined,
                offsetY: 16,
                formatter: (val: any) => {
                  return val;
                },
              },
              total: {
                show: true,
                label: "Total",
                color: "#888ea8",
                fontSize: "29px",
                formatter: (w: any) => {
                  return w.globals.seriesTotals.reduce(function (
                    a: any,
                    b: any
                  ) {
                    return a + b;
                  },
                  0);
                },
              },
            },
          },
        },
      },
      labels: ["Pending", "Approved", "Rejected", "Finished"],
      states: {
        hover: {
          filter: {
            type: "none",
            value: 0.15,
          },
        },
        active: {
          filter: {
            type: "none",
            value: 0.15,
          },
        },
      },
    },
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return {
          badge: "badge-outline-info",
          bg: "bg-info-light",
        };

      case "APPROVED":
        return {
          badge: "badge-outline-success",
          bg: "bg-success-light",
        };
      case "REJECTED":
        return {
          badge: "badge-outline-danger",
          bg: "bg-danger-light",
        };

      case "IN_PROGRESS":
        return {
          badge: "badge-outline-warning",
          bg: "bg-warning-light",
        };
      case "ACTIVE":
        return {
          badge: "badge-outline-success",
          bg: "bg-success-light",
        };
      default:
        return {
          badge: "badge-outline-info",
          bg: "bg-info-light",
        };
    }
  };
  const [budgetAnalyticsYear, setBudgetAnalyticsYear] = useState(
    new Date().getFullYear()
  );
  const AnalyticsFilter: any = {
    budgetAnalyticsYear,
  };

  const [budgetAnalyticsData, setBudgetAnalyticsData] = useState<any>(null);
const userInfoAnalyticsState = useSelector((state: IRootState) => state.analytics.fetchUserAnalyticState);

  useEffect(() => {
    dispatch(fetchCPBudgetAnalytics(AnalyticsFilter));
  }, [budgetAnalyticsYear, dispatch]);

  useEffect(() => {
    dispatch(userInfoAnalytics());
  }, [dispatch]);

  const fetchCPBudgetAnalyticsState = useSelector(
    (state: IRootState) => state.capacityPlan.fetchBudgetAnalytics
  );

  console.log(fetchCPBudgetAnalyticsState);
  console.log("INFO USER -----> ", userInfoAnalyticsState)

  useEffect(() => {
    const data = fetchCPBudgetAnalyticsState?.data?.data;
    if (data) {
      setBudgetAnalyticsData(data);
    }
  }, [fetchCPBudgetAnalyticsState]);

  const [year, setYear] = useState<any>(new Date().getFullYear());

  const handleYearChange = (selectedOption: any) => {
    setYear(selectedOption?.value);
  };

  console.log(userInfoAnalyticsState?.data?.data);
  
    // userDashboardChartOptions

    let userDashboardChart: any;
 if(userInfoAnalyticsState?.data?.data) {
  userDashboardChart = {
    series: Object.values(userInfoAnalyticsState?.data?.data?.percentages),
    options: {
        chart: {
            height: 300,
            type: 'pie',
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        labels: Object.keys(userInfoAnalyticsState?.data?.data?.percentages),
        colors: ['#4361ee', '#805dca', '#00ab55', '#e7515a', '#e2a03f'],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                },
            },
        ],
        stroke: {
            show: false,
        },
        legend: {
            position: 'bottom',
        },
    },
};
 }

  const cPlanStatistics = {
    series: [
      {
        name: "Allocated",
        data: budgetAnalyticsData?.allocatedData,
      },
      {
        name: "Requested",
        data: budgetAnalyticsData?.requestedData,
      },
    ],
    options: {
      chart: {
        height: 300,
        type: "bar",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#805dca", "#e7515a"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      grid: {
        borderColor: isDark ? "#191e3a" : "#e0e6ed",
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      xaxis: {
        categories: budgetAnalyticsData?.years,
        axisBorder: {
          color: isDark ? "#191e3a" : "#e0e6ed",
        },
      },
      yaxis: {
        opposite: isRtl ? true : false,
        labels: {
          offsetX: isRtl ? -10 : 0,
          formatter: function (value:any) {
            return `${value.toLocaleString()}`; // Add currency symbol here
          },
        },
      },
      tooltip: {
        theme: isDark ? "dark" : "light",
        y: {
          formatter: function (value: any) {
            return `${value.toLocaleString()} RWF`; // Add currency symbol here
          },
        },
      },
    },
  };

  return (
    <div>
      {loadingUser ? (
        <div>
          <Modal
            isOpen={showModal}
            title="Loading User Information..."
            content={
              <div>
                <p>Failed to load user information. Kindly login again!</p>
              </div>
            }
            button1Text="Retry"
            button2Text="Go to Login"
            onClose={() => setShowModal(false)}
            onSubmit={handleGoToLogin}
            // onRetry={handleRetry}
            buttonTwoDisabled={false}
            hideButton1={true}
          />
        </div>
      ) : (
        <div>
          <ul className="flex space-x-2 rtl:space-x-reverse">
            <li>
              <Link
                to="/dashboard"
                className="text-cdms_primary hover:underline"
              >
                Dashboard
              </Link>
            </li>
            {/* <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
      <span>Sales</span>
    </li> */}
          </ul>

          <div className="pt-5">
            {/**
             *
             * Section 1
             *
             */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
              {/**
               *
               * Capacity Plan Stats
               *
               */}

              <div className="panel h-full sm:col-span-2 xl:col-span-1">
                <div className="flex items-center mb-5">
                  <h5 className="font-semibold text-lg dark:text-white-light">
                    Capacity Plan Budget
                    <span className="block text-white-dark text-sm font-normal">
                      Requested Vs Allocated Capacity Plan Budget
                    </span>
                  </h5>
                  <div className="dropdown -mt-5">
                    <div className="flex items-center mb-5">
                      <Dropdown
                        offset={[0, 1]}
                        placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                        button={
                          <IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-cdms_primary" />
                        }
                      >
                        <ul>
                          {budgetAnalyticsData?.years.map((year: number) => (
                            <li key={year}>
                              <button type="button">{year}</button>
                            </li>
                          ))}
                        </ul>
                      </Dropdown>
                    </div>
                  </div>

                  <div className="ltr:ml-auto rtl:mr-auto relative"></div>
                </div>
                <div>
                  <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
                    {loading ? (
                      <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                        <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                      </div>
                    ) : (
                      <ReactApexChart
                        series={cPlanStatistics.series}
                        options={cPlanStatistics.options}
                        className="rounded-lg bg-white dark:bg-black overflow-hidden"
                        type="bar"
                        height={300}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/*
               *
               * Recent request
               *
               */}

{/* <div className="panel h-full sm:col-span-2 xl:col-span-1">
                <div className="flex items-center mb-5">
                  <h5 className="font-semibold text-lg dark:text-white-light">
                    Capacity Plan Budget
                  </h5>
                  <div className="dropdown -mt-5"> */}



<div className="panel h-full sm:col-span-2 xl:col-span-1">
                <div className="flex items-center justify-between mb-5">
                  <h5 className="font-semibold text-lg dark:text-white-light">
                    Capacity Plan Request
                    <span className="block text-white-dark text-sm font-normal">
                      Recent Capacity Plan activities
                    </span>
                  </h5>
                  <div className="dropdown -mt-5">
                  <Dropdown
                    offset={[0, 1]}
                    placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                    button={
                      <IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-cdms_primary" />
                    }
                  >
                    <Link
                      to="/cp/overview"
                      className=" font-semibold group hover:text-cdms_primary p-4 flex items-center justify-center group"
                    >
                      View All
                      <IconArrowLeft className="rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition duration-300 ltr:ml-1 rtl:mr-1" />
                    </Link>
                  </Dropdown>
                </div>
                </div>
                <PerfectScrollbar className="relative h-[290px] ltr:pr-3 rtl:pl-3 ltr:-mr-3 rtl:-ml-3 mb-4">
                  <>
                    {cpData &&
                      (cpData?.capacityPlans || []).map(
                        (request: capacityplanInfo) => {
                          return (
                            <div className="flex items-center py-1.5 relative group hover:bg-cdms_primary/5 rounded-lg">
                              <div
                                className={`${
                                  getStatusBadgeColor(request.status).bg
                                } w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5`}
                              ></div>

                              <div
                                className={`bg-${request.status.toLowerCase()} w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5`}
                              ></div>

                              <div className="flex flex-col p-2 ">
                                <div className="flex flex-row">
                                  {request.title}
                                </div>

                                <div className="flex flex-row">
                                  <div className="basis-6/8">
                                    <div className="flex-2 text-sm text-end text-gray-400">
                                      {convertTimestamp(request.updatedAt!)}
                                    </div>
                                  </div>
                                  <div className="basis-2/8 -mt-8">
                                    <span
                                      className={`badge ${
                                        getStatusBadgeColor(request.status)
                                          .badge
                                      } ${
                                        getStatusBadgeColor(request.status).bg
                                      } absolute ltr:right-0 rtl:left-0 text-xs mt-8`}
                                    >
                                      {request.status}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                  </>
                </PerfectScrollbar>
                {/* <div className="border-t border-white-light dark:border-white/10">

                </div> */}
              </div>
  {/**
               *
               * CDMS Users Stats
               *
               */}
              <div className="panel h-full">
                <div className="flex items-center justify-between dark:text-white-light mb-5">
                  {userInfoAnalyticsState?.data?.data ? 
                  <h5 className="font-semibold text-lg">CDMS {userInfoAnalyticsState?.data?.data && userInfoAnalyticsState?.data?.data?.type === "users" ? "Users" : "Employee"}</h5>
                  :
                  <h5 className="font-semibold text-lg">CDMS Users</h5>
                  }
                  <div className="dropdown">
                    <Dropdown
                      placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                      button={
                        <IconHorizontalDots className="w-5 h-5 text-black/70 dark:text-white/70 hover:!text-cdms_primary" />
                      }
                    >
                      <ul>
                        <li>
                          <button type="button">
                            <Link to="/employees">View All Employees</Link>
                          </button>
                        </li>
                      </ul>
                    </Dropdown>
                  </div>
                </div>
                <div>
                  <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
                    {userInfoAnalyticsState.state != StateOptions.FULFILLED && !userInfoAnalyticsState?.data?.data ? (
                      <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
                        <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent rounded-full w-5 h-5 inline-flex"></span>
                      </div>
                    ) : (
                  
                      <ReactApexChart series={userDashboardChart?.series} options={userDashboardChart?.options} className="rounded-lg bg-white dark:bg-black overflow-hidden" type="pie" height={400} />
                    )}
                  </div>
                </div>
              </div>
           
            </div>

            <div className="grid xl:grid-cols-3 gap-6 mb-6">
              {/*
               *
               * Capacity Need Assessment
               *
               */}
              <div className="panel h-full xl:col-span-2">
                <div className="flex items-center justify-between dark:text-white-light mb-5">
                  <h5 className="font-semibold text-lg">
                    Capacity Need Assessement
                  </h5>
                  <div className="dropdown">
                    <Dropdown
                      offset={[0, 1]}
                      placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                      button={
                        <IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-cdms_primary" />
                      }
                    >
                      <ul>
                        <li>
                          <button type="button">2023</button>
                        </li>
                        <li>
                          <button type="button">2022</button>
                        </li>
                        <li>
                          <button type="button">2021</button>
                        </li>
                      </ul>
                    </Dropdown>
                  </div>
                </div>
                <p className="text-lg dark:text-white-light/90">
                  Total <span className="text-cdms_primary ml-2">12,345</span>
                </p>
                <div className="relative">
                  <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
                    {loading ? (
                      <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                        <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                      </div>
                    ) : (
                      <ReactApexChart
                        series={assessmentChart.series}
                        options={assessmentChart.options}
                        type="area"
                        height={325}
                      />
                    )}
                  </div>
                </div>
              </div>

            

                 {/*
               *
               * Trainings
               *
               */}

<div className="panel h-full">
                <div className="flex items-center justify-between mb-5">
                  <h5 className="font-semibold text-lg dark:text-white-light">
                    Trainings Statistics
                  </h5>
                  <div className="dropdown">
                    <Dropdown
                      offset={[0, 1]}
                      placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                      button={
                        <IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-cdms_primary" />
                      }
                    >
                      <ul>
                        <li>
                          <button type="button">2023</button>
                        </li>
                        <li>
                          <button type="button">2022</button>
                        </li>
                        <li>
                          <button type="button">2021</button>
                        </li>
                      </ul>
                    </Dropdown>
                  </div>
                </div>
                <div>
                  <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
                    {loading ? (
                      <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
                        <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent rounded-full w-5 h-5 inline-flex"></span>
                      </div>
                    ) : (
                      <ReactApexChart
                        series={cdmsTrainings.series}
                        options={{
                          ...cdmsTrainings.options,
                          chart: {
                            ...cdmsTrainings.options.chart,
                            height: 400,
                          },
                          plotOptions: {
                            pie: {
                              donut: {
                                labels: {
                                  show: true,
                                  name: {
                                    show: true,
                                    fontSize: "14px",
                                    offsetY: -10,
                                  },
                                  value: {
                                    show: true,
                                    fontSize: "12px",
                                    offsetY: 10,
                                  },
                                  total: {
                                    show: true,
                                    label: "Total",
                                    fontSize: "16px",
                                    fontWeight: 600,
                                  },
                                },
                              },
                            },
                          },
                          legend: {
                            position: "bottom",
                            fontSize: "14px",
                          },
                        }}
                        type="donut"
                        height={400}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
