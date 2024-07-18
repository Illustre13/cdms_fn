import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import ReactApexChart from "react-apexcharts";
import PerfectScrollbar from "react-perfect-scrollbar";
import Dropdown from "../components/Dropdown";
import { setPageTitle } from "../redux/reducer/themeConfigSlice";
import IconHorizontalDots from "../components/Icon/IconHorizontalDots";
import IconArrowLeft from "../components/Icon/IconArrowLeft";
import IconUserPlus from "../components/Icon/IconUserPlus";
import IconUsers from "../components/Icon/IconUsers";
import IconMinusCircle from "../components/Icon/IconMinusCircle";
import { fetchUserInfo } from "../redux/action/UserAction";

const Index = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setPageTitle("Dashboard"));
		
	});
	const isDark = useSelector(
		(state: IRootState) =>
			state.themeConfig.theme === "dark" || state.themeConfig.isDarkMode
	);
	const userInfoState = useSelector((state: IRootState) => state.user);
	
	if (Object.keys(userInfoState.data).length === 0) {
		dispatch(fetchUserInfo() as any);
		console.log("User Info After--> ", userInfoState)
	  }
	const isRtl =
		useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl"
			? true
			: false;

	const [loading] = useState(false);

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

	// Capacity Plan Statistics
	const cPlanStatistics: any = {
		series: [
			{
				name: "Allocated",
				data: [
					12000000, 27800000, 16000000, 29000000, 10000000, 23700000, 34000000,
				],
			},
			{
				name: "Requested",
				data: [
					45000000, 41800000, 23000000, 29000000, 15000000, 19700000, 30000000,
				],
			},
		],
		options: {
			chart: {
				height: 160,
				type: "bar",
				fontFamily: "Nunito, sans-serif",
				toolbar: {
					show: true,
				},
				stacked: true,
				stackType: "100%",
			},
			dataLabels: {
				enabled: true,
			},
			stroke: {
				show: true,
				width: 1,
			},
			colors: ["#e2a03f", "#e0e6ed"],
			responsive: [
				{
					breakpoint: 480,
					options: {
						legend: {
							position: "bottom",
							offsetX: -10,
							offsetY: 0,
						},
					},
				},
			],
			xaxis: {
				labels: {
					show: false,
				},
				categories: ["2023", "2022", "2021", "2020", "2019", "2018", "2017"],
			},
			yaxis: {
				show: false,
			},
			fill: {
				opacity: 1,
			},
			plotOptions: {
				bar: {
					horizontal: true,
					columnWidth: "25%",
				},
			},
			legend: {
				show: true,
				itemMargin: {
					horizontal: 10,
					vertical: 10,
				},
			},
			grid: {
				show: false,
				xaxis: {
					lines: {
						show: false,
					},
				},
				padding: {
					top: 10,
					right: -20,
					bottom: -20,
					left: -20,
				},
			},
		},
	};

	// Capacity Plan approval Request

	const approvalRequests = [
		{
			id: "1",
			organization: "MINEDUC",
			status: "ACTIVE",
			payload:
				"New capacity development plan submitted for approval by MINEDUC.",
			time: "1hr ago",
		},
		{
			id: "2",
			organization: "MINISANTE",
			status: "REJECTED",
			payload: "Capacity Plan submitted by MINISANTE was Rejected.",
			time: "2 min ago",
		},
		{
			id: "3",
			organization: "MIFOTRA",
			status: "PENDING",
			payload: "Capacity development plan approved by MIFOTRA.",
			time: "1 mon ago",
		},
		{
			id: "4",
			organization: "MINICOM",
			status: "PENDING",
			payload:
				"Capacity development plan rejected by MINICOM. Please review the comments and resubmit.",
			time: "1 day ago",
		},
		{
			id: "5",
			organization: "MININFRA",
			status: "PENDING",
			payload: "Notification sent to MININFRA about profile update status.",
			time: "17 day ago",
		},
		{
			id: "6",
			organization: "MINALOC",
			status: "PENDING",
			payload: "Capacity development plan from MINALOC is under review.",
			time: "1 yr ago",
		},
		{
			id: "7",
			organization: "MINIJUST",
			status: "ACTIVE",
			payload: "Capacity development plan for MINIJUST approved successfully.",
			time: "3 yrs ago",
		},
		{
			id: "8",
			organization: "RDB",
			status: "PENDING",
			payload:
				"Real-time report on capacity development plan progress for RDB generated.",
			time: "Just Now",
		},
		{
			id: "9",
			organization: "MINEDUC",
			status: "APPROVED",
			payload:
				"Notification sent to MINEDUC managers about the approval status.",
			time: "2 min ago",
		},
	];

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

	return (
		<div>
			<ul className="flex space-x-2 rtl:space-x-reverse">
				<li>
					<Link to="/dashboard" className="text-cdms_primary hover:underline">
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

							<div className="ltr:ml-auto rtl:mr-auto relative">
								{/* <div className="w-11 h-11 text-warning bg-[#ffeccb] dark:bg-warning dark:text-[#ffeccb] grid place-content-center rounded-full">
									<IconDollarSign />
								</div> */}
							</div>
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
										type="bar"
										height={160}
									/>
								)}
							</div>
						</div>
					</div>

					{/**
					 *
					 * CDMS Users Stats
					 *
					 */}
					<div className="panel h-full">
						<div className="flex items-center justify-between dark:text-white-light mb-5">
							<h5 className="font-semibold text-lg">CDMS Users</h5>
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
						<div className="space-y-9">
							<div className="flex items-center">
								<div className="w-9 h-9 ltr:mr-3 rtl:ml-3">
									<div className="bg-cdms_secondary-light dark:bg-cdms_secondary text-cdms_secondary dark:text-cdms_secondary-light  rounded-full w-9 h-9 grid place-content-center">
										<IconUserPlus />
									</div>
								</div>
								<div className="flex-1">
									<div className="flex font-semibold text-white-dark mb-2">
										<h6>Active Users</h6>
										<p className="ltr:ml-auto rtl:mr-auto">2467</p>
									</div>
									<div className="rounded-full h-2 bg-dark-light dark:bg-[#1b2e4b] shadow">
										<div className="bg-gradient-to-r from-[#7579ff] to-[#b224ef] w-11/12 h-full rounded-full"></div>
									</div>
								</div>
							</div>
							<div className="flex items-center">
								<div className="w-9 h-9 ltr:mr-3 rtl:ml-3">
									<div className="bg-success-light dark:bg-success text-success dark:text-success-light rounded-full w-9 h-9 grid place-content-center">
										<IconUsers />
									</div>
								</div>
								<div className="flex-1">
									<div className="flex font-semibold text-white-dark mb-2">
										<h6>Pending Users</h6>
										<p className="ltr:ml-auto rtl:mr-auto">567</p>
									</div>
									<div className="w-full rounded-full h-2 bg-dark-light dark:bg-[#1b2e4b] shadow">
										<div
											className="bg-gradient-to-r from-[#3cba92] to-[#0ba360] w-full h-full rounded-full"
											style={{ width: "17%" }}
										></div>
									</div>
								</div>
							</div>
							<div className="flex items-center">
								<div className="w-9 h-9 ltr:mr-3 rtl:ml-3">
									<div className="bg-warning-light dark:bg-warning text-warning dark:text-warning-light rounded-full w-9 h-9 grid place-content-center">
										<IconMinusCircle />
									</div>
								</div>
								<div className="flex-1">
									<div className="flex font-semibold text-white-dark mb-2">
										<h6>Suspended Users</h6>
										<p className="ltr:ml-auto rtl:mr-auto">45</p>
									</div>
									<div className="w-full rounded-full h-2 bg-dark-light dark:bg-[#1b2e4b] shadow">
										<div
											className="bg-gradient-to-r from-[#f09819] to-[#ff5858] w-full h-full rounded-full"
											style={{ width: "6%" }}
										></div>
									</div>
								</div>
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
					 * Recent request
					 *
					 */}

					<div className="panel h-full sm:col-span-2 xl:col-span-1 pb-0">
						<h5 className="font-semibold text-lg dark:text-white-light mb-5">
							Capacity Plan Request
						</h5>
						<PerfectScrollbar className="relative h-[290px] ltr:pr-3 rtl:pl-3 ltr:-mr-3 rtl:-ml-3 mb-4">
							<>
								{approvalRequests &&
									approvalRequests?.map((request) => {
										return (
											<div className="flex items-center py-1.5 relative group">
												<div
													className={`${
														getStatusBadgeColor(request.status).bg
													} w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5`}
												></div>

												<div
													className={`bg-${request.status.toLowerCase()} w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5`}
												></div>
												<div className="flex-1">
													{request.payload} {request.time}
												</div>

												<span
													className={`badge ${
														getStatusBadgeColor(request.status).badge
													} ${
														getStatusBadgeColor(request.status).bg
													} absolute ltr:right-0 rtl:left-0 text-xs mt-8`}
												>
													{request.status}
												</span>
											</div>
										);
									})}
							</>
						</PerfectScrollbar>
						<div className="border-t border-white-light dark:border-white/10">
							<Link
								to="/"
								className=" font-semibold group hover:text-cdms_primary p-4 flex items-center justify-center group"
							>
								View All
								<IconArrowLeft className="rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition duration-300 ltr:ml-1 rtl:mr-1" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Index;
