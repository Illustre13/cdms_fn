import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";
import sortBy from "lodash/sortBy";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { setPageTitle } from "../../store/themeConfigSlice";
import { useDispatch } from "react-redux";
import IconPencil from "../../components/Icon/IconPencil";
import IconTrashLines from "../../components/Icon/IconTrashLines";
import IconSearch from "../../components/Icon/IconSearch";
import Select from "react-select";
import IconPlus from "../../components/Icon/IconPlus";
import IconHome from "../../components/Icon/IconHome";
import { Link } from "react-router-dom";
import IconDollarSign from "../../components/Icon/IconDollarSign";
import IconUser from "../../components/Icon/IconUser";
import IconPhone from "../../components/Icon/IconPhone";
import IconDollarSignCircle from "../../components/Icon/IconDollarSignCircle";
import IconFacebook from "../../components/Icon/IconFacebook";
import IconTwitter from "../../components/Icon/IconTwitter";
import IconLinkedin from "../../components/Icon/IconLinkedin";
import IconGithub from "../../components/Icon/IconGithub";
import IconGallery from "../../components/Icon/IconGallery";
import IconNotes from "../../components/Icon/IconNotes";
import IconBookmark from "../../components/Icon/IconBookmark";
import IconUserPlus from "../../components/Icon/IconUserPlus";
import IconListCheck from "../../components/Icon/IconListCheck";
import IconLayoutGrid from "../../components/Icon/IconLayoutGrid";
import IconLayout from "../../components/Icon/IconLayout";
import IconCaretDown from "../../components/Icon/IconCaretDown";
import IconCode from "../../components/Icon/IconCode";
import IconAirplay from "../../components/Icon/IconAirplay";
import AnimateHeight from "react-animate-height";
import IconBox from "../../components/Icon/IconBox";
import IconTxtFile from "../../components/Icon/IconTxtFile";

const employees = [
	{
		id: "1",
		firstName: "Caroline",
		lastName: "Jensen",
		department: "Engineering",
		position: "Software Developer",
		email: "carolinejensen@zidant.com",
		phoneNumber: "0786857463",
		gender: "Female",
		userStatus: "ACTIVE",
		organization: "MINEDUC",
	},
	{
		id: "2",
		firstName: "John",
		lastName: "Doe",
		department: "Human Resources",
		position: "HR Manager",
		email: "johndoe@zidant.com",
		phoneNumber: "0786857463",
		gender: "Male",
		userStatus: "ACTIVE",
		organization: "REMA",
	},
	{
		id: "3",
		firstName: "Jane",
		lastName: "Smith",
		department: "Marketing",
		position: "Marketing Specialist",
		email: "janesmith@zidant.com",
		phoneNumber: "0786857463",
		gender: "Female",
		userStatus: "PENDING",
		organization: "RDB",
	},
	{
		id: "4",
		firstName: "Mark",
		lastName: "Lee",
		department: "Finance",
		position: "Financial Analyst",
		email: "marklee@zidant.com",
		phoneNumber: "0786857463",
		gender: "Male",
		userStatus: "ACTIVE",
		organization: "RRA",
	},
	{
		id: "5",
		firstName: "Emily",
		lastName: "Johnson",
		department: "Research",
		position: "Research Scientist",
		email: "emilyjohnson@zidant.com",
		phoneNumber: "0786857463",
		gender: "Female",
		userStatus: "ACTIVE",
		organization: "RNP",
	},
	{
		id: "6",
		firstName: "David",
		lastName: "Brown",
		department: "Operations",
		position: "Operations Manager",
		email: "davidbrown@zidant.com",
		phoneNumber: "0786857463",
		gender: "Male",
		userStatus: "ACTIVE",
		organization: "MINEDUC",
	},
	{
		id: "7",
		firstName: "Sophia",
		lastName: "Garcia",
		department: "Customer Support",
		position: "Customer Support Specialist",
		email: "sophiagarcia@zidant.com",
		phoneNumber: "0786857463",
		gender: "Female",
		userStatus: "ACTIVE",
		organization: "REMA",
	},
	{
		id: "8",
		firstName: "Michael",
		lastName: "Martinez",
		department: "IT",
		position: "IT Specialist",
		email: "michaelmartinez@zidant.com",
		phoneNumber: "0786857463",
		gender: "Male",
		userStatus: "PENDING",
		organization: "RDB",
	},
	{
		id: "9",
		firstName: "Olivia",
		lastName: "Robinson",
		department: "Legal",
		position: "Legal Counsel",
		email: "oliviarobinson@zidant.com",
		phoneNumber: "0786857463",
		gender: "Female",
		userStatus: "ACTIVE",
		organization: "RRA",
	},
	{
		id: "10",
		firstName: "Daniel",
		lastName: "Walker",
		department: "Sales",
		position: "Sales Manager",
		email: "danielwalker@zidant.com",
		phoneNumber: "0786857463",
		gender: "Male",
		userStatus: "ACTIVE",
		organization: "RNP",
	},
	{
		id: "11",
		firstName: "Isabella",
		lastName: "Young",
		department: "Public Relations",
		position: "PR Specialist",
		email: "isabellayoung@zidant.com",
		phoneNumber: "0786857463",
		gender: "Female",
		userStatus: "ACTIVE",
		organization: "MINEDUC",
	},
	{
		id: "12",
		firstName: "Elijah",
		lastName: "King",
		department: "Quality Assurance",
		position: "QA Analyst",
		email: "elijahking@zidant.com",
		phoneNumber: "0786857463",
		gender: "Male",
		userStatus: "ACTIVE",
		organization: "REMA",
	},
	{
		id: "13",
		firstName: "Ava",
		lastName: "Hernandez",
		department: "Design",
		position: "Graphic Designer",
		email: "avahernandez@zidant.com",
		phoneNumber: "0786857463",
		gender: "Female",
		userStatus: "PENDING",
		organization: "RDB",
	},
	{
		id: "14",
		firstName: "James",
		lastName: "Lopez",
		department: "Production",
		position: "Production Manager",
		email: "jameslopez@zidant.com",
		phoneNumber: "0786857463",
		gender: "Male",
		userStatus: "ACTIVE",
		organization: "RRA",
	},
	{
		id: "15",
		firstName: "Mia",
		lastName: "Scott",
		department: "Training",
		position: "Training Specialist",
		email: "miascott@zidant.com",
		phoneNumber: "0786857463",
		gender: "Female",
		userStatus: "ACTIVE",
		organization: "RNP",
	},
	{
		id: "16",
		firstName: "Benjamin",
		lastName: "Green",
		department: "Education",
		position: "Education Coordinator",
		email: "benjamingreen@zidant.com",
		phoneNumber: "0786857463",
		gender: "Male",
		userStatus: "ACTIVE",
		organization: "MINEDUC",
	},
	{
		id: "17",
		firstName: "Charlotte",
		lastName: "Adams",
		department: "Customer Success",
		position: "Customer Success Manager",
		email: "charlotteadams@zidant.com",
		phoneNumber: "0786857463",
		gender: "Female",
		userStatus: "PENDING",
		organization: "REMA",
	},
	{
		id: "18",
		firstName: "Jacob",
		lastName: "Campbell",
		department: "Business Development",
		position: "Business Development Manager",
		email: "jacobcampbell@zidant.com",
		phoneNumber: "0786857463",
		gender: "Male",
		userStatus: "ACTIVE",
		organization: "RDB",
	},
	{
		id: "19",
		firstName: "Amelia",
		lastName: "Perez",
		department: "Recruitment",
		position: "Recruitment Specialist",
		email: "ameliaperez@zidant.com",
		phoneNumber: "0786857463",
		gender: "Female",
		userStatus: "ACTIVE",
		organization: "RRA",
	},
	{
		id: "20",
		firstName: "William",
		lastName: "Bailey",
		department: "Logistics",
		position: "Logistics Coordinator",
		email: "williambailey@zidant.com",
		phoneNumber: "0786857463",
		gender: "Male",
		userStatus: "ACTIVE",
		organization: "RNP",
	},
	{
		id: "21",
		firstName: "Ella",
		lastName: "Rivera",
		department: "Healthcare",
		position: "Healthcare Specialist",
		email: "ellarivera@zidant.com",
		phoneNumber: "0786857463",
		gender: "Female",
		userStatus: "ACTIVE",
		organization: "MINEDUC",
	},
	{
		id: "22",
		firstName: "Alexander",
		lastName: "Gonzalez",
		department: "Public Health",
		position: "Public Health Officer",
		email: "alexandergonzalez@zidant.com",
		phoneNumber: "0786857463",
		gender: "Male",
		userStatus: "ACTIVE",
		organization: "REMA",
	},
	{
		id: "23",
		firstName: "Sofia",
		lastName: "Carter",
		department: "Environmental Services",
		position: "Environmental Specialist",
		email: "sofiacarter@zidant.com",
		phoneNumber: "0786857463",
		gender: "Female",
		userStatus: "PENDING",
		organization: "RDB",
	},
	{
		id: "24",
		firstName: "Lucas",
		lastName: "Torres",
		department: "Security",
		position: "Security Officer",
		email: "lucastorres@zidant.com",
		phoneNumber: "0786857463",
		gender: "Male",
		userStatus: "ACTIVE",
		organization: "RRA",
	},
	{
		id: "25",
		firstName: "Chloe",
		lastName: "Morales",
		department: "Hospitality",
		position: "Hospitality Manager",
		email: "chloemorales@zidant.com",
		phoneNumber: "0786857463",
		gender: "Female",
		userStatus: "ACTIVE",
		organization: "RNP",
	},
];

const Assessment = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setPageTitle("CNA"));
	});

	const [tabs, setTabs] = useState<string>("home");
	const [value, setValue] = useState<any>("list");
	const toggleTabs = (name: string) => {
		setTabs(name);
	};

	const [page, setPage] = useState(1);
	const PAGE_SIZES = [10, 20, 30, 50, 100];
	const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
	const [initialRecords, setInitialRecords] = useState(sortBy(employees, "id"));
	const [recordsData, setRecordsData] = useState(initialRecords);

	const [search, setSearch] = useState("");
	const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
		columnAccessor: "firstName",
		direction: "asc",
	});

	useEffect(() => {
		setPage(1);
	}, [pageSize]);

	useEffect(() => {
		const from = (page - 1) * pageSize;
		const to = from + pageSize;
		setRecordsData([...initialRecords.slice(from, to)]);
	}, [page, pageSize, initialRecords]);

	useEffect(() => {
		setInitialRecords(() => {
			return employees.filter((item) => {
				return (
					item.firstName.toLowerCase().includes(search.toLowerCase()) ||
					item.organization.toLowerCase().includes(search.toLowerCase()) ||
					item.lastName
						.toString()
						.toLowerCase()
						.includes(search.toLowerCase()) ||
					item.email.toLowerCase().includes(search.toLowerCase()) ||
					item.gender.toLowerCase().includes(search.toLowerCase()) ||
					item.userStatus.toLowerCase().includes(search.toLowerCase())
				);
			});
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	useEffect(() => {
		const data = sortBy(initialRecords, sortStatus.columnAccessor);
		setInitialRecords(sortStatus.direction === "desc" ? data.reverse() : data);
		setPage(1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortStatus]);

	const [page2, setPage2] = useState(1);
	const [pageSize2, setPageSize2] = useState(PAGE_SIZES[0]);
	const [initialRecords2, setInitialRecords2] = useState(
		sortBy(employees, "id")
	);
	const [recordsData2, setRecordsData2] = useState(initialRecords2);

	const [search2, setSearch2] = useState("");
	const [sortStatus2, setSortStatus2] = useState<DataTableSortStatus>({
		columnAccessor: "firstName",
		direction: "asc",
	});

	useEffect(() => {
		setPage2(1);
	}, [pageSize2]);

	useEffect(() => {
		const from = (page2 - 1) * pageSize2;
		const to = from + pageSize2;
		setRecordsData2([...initialRecords2.slice(from, to)]);
	}, [page2, pageSize2, initialRecords2]);

	useEffect(() => {
		setInitialRecords2(() => {
			return employees.filter((item: any) => {
				return (
					item.firstName.toLowerCase().includes(search.toLowerCase()) ||
					item.organization.toLowerCase().includes(search.toLowerCase()) ||
					item.lastName
						.toString()
						.toLowerCase()
						.includes(search.toLowerCase()) ||
					item.email.toLowerCase().includes(search.toLowerCase()) ||
					item.gender.toLowerCase().includes(search.toLowerCase()) ||
					item.userStatus.toLowerCase().includes(search.toLowerCase())
				);
			});
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search2]);

	useEffect(() => {
		const data2 = sortBy(initialRecords2, sortStatus2.columnAccessor);
		setInitialRecords2(
			sortStatus2.direction === "desc" ? data2.reverse() : data2
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortStatus2]);

	const [codeArr, setCodeArr] = useState<string[]>([]);

	const toggleCode = (name: string) => {
		if (codeArr.includes(name)) {
			setCodeArr((value) => value.filter((d) => d !== name));
		} else {
			setCodeArr([...codeArr, name]);
		}
	};

	const [active, setActive] = useState<string>("1");
	const togglePara2 = (value: string) => {
		setActive((oldValue) => {
			return oldValue === value ? "" : value;
		});
	};

	return (
		<div>
			<div>
				<ul className="flex space-x-2 rtl:space-x-reverse">
					<li>
						<Link to="/dashboard" className="text-cdms_primary hover:underline">
							Dashboard
						</Link>
					</li>
					<li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
						<Link
							to="/cna/overview"
							className="text-cdms_primary hover:underline"
						>
							Capacity Need Assessment
						</Link>
					</li>
					<li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
						<span>Assessment</span>
					</li>
				</ul>
			</div>

			{/* dfd
			 *
			 * Assessment Bread Crumb
			 *
			 */}

			<div className="pt-5">
				<div>
					<ul className="sm:flex font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto">
						<li className="inline-block">
							<button
								onClick={() => toggleTabs("home")}
								className={`flex gap-2 p-4 border-b border-transparent hover:border-cdms_primary hover:text-cdms_primary ${
									tabs === "home"
										? "!border-cdms_primary text-cdms_primary"
										: ""
								}`}
							>
								<IconHome />
								All Assessment
							</button>
						</li>
						<li className="inline-block">
							<button
								onClick={() => toggleTabs("payment-details")}
								className={`flex gap-2 p-4 border-b border-transparent hover:border-cdms_primary hover:text-cdms_primary ${
									tabs === "payment-details"
										? "!border-cdms_primary text-cdms_primary"
										: ""
								}`}
							>
								<IconDollarSignCircle />
								Assessment Provided
							</button>
						</li>
					</ul>
				</div>
				{tabs === "home" ? (
					<>
						<div className="flex justify-start sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
							<div className="relative">
								<input
									type="text"
									placeholder="Search Assessement"
									className="form-input py-2 ltr:pr-11 rtl:pl-11 peer"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
								<button
									type="button"
									className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-cdms_primary"
								>
									<IconSearch className="mx-auto" />
								</button>
							</div>

							<div className="flex gap-3">
								{/* Icons */}
								<div>
									<button
										type="button"
										className={`btn btn-outline-primary p-2 ${
											value === "list" && "cdms_primary"
										}`}
										onClick={() => setValue("list")}
									>
										<IconListCheck />
									</button>
								</div>
								<div>
									<button
										type="button"
										className={`btn btn-outline-primary p-2 ${
											value === "grid" && "cdms_primary"
										}`}
										onClick={() => setValue("grid")}
									>
										<IconLayoutGrid />
									</button>
								</div>
								<div>
									<button
										type="button"
										className="btn btn-primary"
										// onClick={() => editUser()}
									>
										<IconUserPlus className="ltr:mr-2 rtl:ml-2" />
										Create Assessment
									</button>
								</div>

								<div>
									<button
										type="button"
										className="btn btn-primary"
										// onClick={() => editUser()}
									>
										<IconTxtFile className="ltr:mr-2 rtl:ml-2" />
										Bulk Import
									</button>
								</div>
							</div>
						</div>

						<div className="panel mt-5">
							<div className="mb-5">
								<div className="space-y-2 font-semibold">
									<div className="border border-[#d3d3d3] rounded dark:border-[#1b2e4b]">
										<button
											type="button"
											className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${
												active === "1" ? "!text-cdms_primary" : ""
											}`}
											onClick={() => togglePara2("1")}
										>
											<IconAirplay className="ltr:mr-2 rtl:ml-2 text-cdms_primary shrink-0" />
											Upcoming Assessment
											<div
												className={`ltr:ml-auto rtl:mr-auto ${
													active === "1" ? "rotate-180" : ""
												}`}
											>
												<IconCaretDown />
											</div>
										</button>
										<div>
											<AnimateHeight
												duration={300}
												height={active === "1" ? "auto" : 0}
											>
												<div className="space-y-2 p-4 text-white-dark text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
													{/*
													 * Content goes here
													 */}
												</div>
											</AnimateHeight>
										</div>
									</div>

									<div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
										<button
											type="button"
											className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${
												active === "2" ? "!text-cdms_primary" : ""
											}`}
											onClick={() => togglePara2("2")}
										>
											<IconBox className="ltr:mr-2 rtl:ml-2 text-cdms_primary shrink-0" />
											Ongoing Assessment
											<div
												className={`ltr:ml-auto rtl:mr-auto ${
													active === "2" ? "rotate-180" : ""
												}`}
											>
												<IconCaretDown />
											</div>
										</button>
										<div>
											<AnimateHeight
												duration={300}
												height={active === "2" ? "auto" : 0}
											>
												<div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
													{/*
													 * Content goes here
													 */}
												</div>
											</AnimateHeight>
										</div>
									</div>
									<div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
										<button
											type="button"
											className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${
												active === "3" ? "!text-cdms_primary" : ""
											}`}
											onClick={() => togglePara2("3")}
										>
											<IconLayout className="ltr:mr-2 rtl:ml-2 text-cdms_primary shrink-0" />
											Past Assessement
											<div
												className={`ltr:ml-auto rtl:mr-auto ${
													active === "3" ? "rotate-180" : ""
												}`}
											>
												<IconCaretDown />
											</div>
										</button>
										<div>
											<AnimateHeight
												duration={300}
												height={active === "3" ? "auto" : 0}
											>
												<div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
													{/*
													 * Content goes here
													 */}
												</div>
											</AnimateHeight>
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				) : (
					""
				)}
				{tabs === "payment-details" ? (
					<>
						<div className="flex justify-end sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
							<div className="flex gap-3">
								<div>
									<button
										type="button"
										className={`btn btn-outline-primary p-2 ${
											value === "list" && "cdms_primary"
										}`}
										onClick={() => setValue("list")}
									>
										<IconListCheck />
									</button>
								</div>
								<div>
									<button
										type="button"
										className={`btn btn-outline-primary p-2 ${
											value === "grid" && "cdms_primary"
										}`}
										onClick={() => setValue("grid")}
									>
										<IconLayoutGrid />
									</button>
								</div>
							</div>
							<div className="relative">
								<input
									type="text"
									placeholder="Search Assessement"
									className="form-input py-2 ltr:pr-11 rtl:pl-11 peer"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
								<button
									type="button"
									className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-cdms_primary"
								>
									<IconSearch className="mx-auto" />
								</button>
							</div>
						</div>

						{/* Icons */}
						<div className="panel mt-5">
							<div className="mb-5">
								<div className="space-y-2 font-semibold">
									<div className="border border-[#d3d3d3] rounded dark:border-[#1b2e4b]">
										<button
											type="button"
											className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${
												active === "1" ? "!text-cdms_primary" : ""
											}`}
											onClick={() => togglePara2("1")}
										>
											<IconAirplay className="ltr:mr-2 rtl:ml-2 text-cdms_primary shrink-0" />
											Upcoming Assessment
											<div
												className={`ltr:ml-auto rtl:mr-auto ${
													active === "1" ? "rotate-180" : ""
												}`}
											>
												<IconCaretDown />
											</div>
										</button>
										<div>
											<AnimateHeight
												duration={300}
												height={active === "1" ? "auto" : 0}
											>
												<div className="space-y-2 p-4 text-white-dark text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
													{/*
													 * Content goes here
													 */}
												</div>
											</AnimateHeight>
										</div>
									</div>

									<div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
										<button
											type="button"
											className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${
												active === "2" ? "!text-cdms_primary" : ""
											}`}
											onClick={() => togglePara2("2")}
										>
											<IconBox className="ltr:mr-2 rtl:ml-2 text-cdms_primary shrink-0" />
											Ongoing Assessment
											<div
												className={`ltr:ml-auto rtl:mr-auto ${
													active === "2" ? "rotate-180" : ""
												}`}
											>
												<IconCaretDown />
											</div>
										</button>
										<div>
											<AnimateHeight
												duration={300}
												height={active === "2" ? "auto" : 0}
											>
												<div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
													{/*
													 * Content goes here
													 */}
												</div>
											</AnimateHeight>
										</div>
									</div>
									<div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
										<button
											type="button"
											className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${
												active === "3" ? "!text-cdms_primary" : ""
											}`}
											onClick={() => togglePara2("3")}
										>
											<IconLayout className="ltr:mr-2 rtl:ml-2 text-cdms_primary shrink-0" />
											Past Assessement
											<div
												className={`ltr:ml-auto rtl:mr-auto ${
													active === "3" ? "rotate-180" : ""
												}`}
											>
												<IconCaretDown />
											</div>
										</button>
										<div>
											<AnimateHeight
												duration={300}
												height={active === "3" ? "auto" : 0}
											>
												<div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
													{/*
													 * Content goes here
													 */}
												</div>
											</AnimateHeight>
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default Assessment;
