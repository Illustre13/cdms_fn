import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";
import sortBy from "lodash/sortBy";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { setPageTitle } from "../../redux/reducer/themeConfigSlice";
import { useDispatch } from "react-redux";
import IconPencil from "../../components/Icon/IconPencil";
import IconTrashLines from "../../components/Icon/IconTrashLines";
import IconSearch from "../../components/Icon/IconSearch";
import Select from "react-select";
import IconPlus from "../../components/Icon/IconPlus";
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

const Employees = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setPageTitle("Multiple Tables"));
	});
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

	const randomColor = () => {
		const color = [
			"primary",
			"secondary",
			"success",
			"danger",
			"warning",
			"info",
		];
		const random = Math.floor(Math.random() * color.length);
		return color[random];
	};

	const randomStatus = () => {
		const status = [
			"PAID",
			"APPROVED",
			"FAILED",
			"CANCEL",
			"SUCCESS",
			"PENDING",
			"COMPLETE",
		];
		const random = Math.floor(Math.random() * status.length);
		return status[random];
	};

	const [codeArr, setCodeArr] = useState<string[]>([]);

	const toggleCode = (name: string) => {
		if (codeArr.includes(name)) {
			setCodeArr((value) => value.filter((d) => d !== name));
		} else {
			setCodeArr([...codeArr, name]);
		}
	};

	const options3 = [
		{ value: "employee", label: "Employee" },
		{ value: "trainer", label: "Trainer" },
		{ value: "manager", label: "Manager" },
	];

	const options4 = [
		{ value: "orange", label: "Orange" },
		{ value: "white", label: "White" },
		{ value: "purple", label: "Purple" },
	];

	return (
		<div>
			{/* Filters */}
			<div className="flex flex-col items-start overflow-x-auto whitespace-nowrap p-3 text-cdms_primary relative z-10 w-full">
				<h5 className="font-bold text-gray-700 text-2xl dark:text-white-light">
					Hello <br /> Mr Bertin NDAHAYO 👋
				</h5>

				<div className="mt-8 flex flex-row md:flex-row items-center justify-end gap-8 relative z-20">
					<div className="ltr:ml-auto rtl:mr-auto">
						<input
							type="text"
							placeholder="Search an employee"
							className="form-input w-auto py-2 ltr:pr-11 rtl:pl-11 peer"
							value={search2}
							onChange={(e) => setSearch2(e.target.value)}
						/>
						<button
							type="button"
							className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-cdms_primary"
						>
							<IconSearch className="mx-auto" />
						</button>
					</div>

					{/* Searchable */}
					<div className="relative z-30 mx-auto max-w-[640px] w-full">
						<Select
							placeholder="All types"
							options={options3}
							classNamePrefix="custom-select py-3"
							menuPortalTarget={document.body} // Render the menu in the body
							menuPosition="absolute"
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
									zIndex: 9999, // Ensure it's above other elements
								}),
							}}
						/>
					</div>

					{/* Searchable */}
					<div className="relative z-30 mx-auto max-w-[580px] w-full">
						<Select
							placeholder="All status"
							options={options4}
							classNamePrefix="custom-select py-3"
							menuPortalTarget={document.body} // Render the menu in the body
							menuPosition="absolute"
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
									zIndex: 9999, // Ensure it's above other elements
								}),
							}}
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
							// onClick={() => editUser()}
						>
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
						records={recordsData2}
						columns={[
							{
								accessor: "id",
								title: "ID",
								sortable: true,
							},
							{
								accessor: "firstName",
								title: "Name",
								sortable: true,
								render: ({ firstName, lastName, id }) => (
									<div className="flex items-center w-max">
										{/* <img
											className="w-9 h-9 rounded-full ltr:mr-2 rtl:ml-2 object-cover"
											src={`/assets/images/profile-${id}.jpeg`}
											alt=""
										/> */}
										<div>{firstName + " " + lastName}</div>
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
							},
							{
								accessor: "phoneNumber",
								title: "Phone No.",
								sortable: true,
							},
							{
								accessor: "gender",
								title: "Gender",
								sortable: true,
							},
							{
								accessor: "userStatus",
								title: "Status",
								sortable: true,
							},
							{
								accessor: "organization",
								title: "Organization",
								sortable: true,
							},
							{
								accessor: "action",
								title: "Action",
								titleClassName: "!text-center",
								render: () => (
									<div className="flex items-center w-max mx-auto gap-2">
										<Tippy content="Edit">
											<button type="button">
												<IconPencil />
											</button>
										</Tippy>
										<Tippy content="Delete">
											<button type="button">
												<IconTrashLines />
											</button>
										</Tippy>
									</div>
								),
							},
						]}
						totalRecords={initialRecords2.length}
						recordsPerPage={pageSize2}
						page={page2}
						onPageChange={(p) => setPage2(p)}
						recordsPerPageOptions={PAGE_SIZES}
						onRecordsPerPageChange={setPageSize2}
						sortStatus={sortStatus2}
						onSortStatusChange={setSortStatus2}
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
