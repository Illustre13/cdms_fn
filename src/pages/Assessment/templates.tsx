import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";
import "tippy.js/dist/tippy.css";
import { setPageTitle } from "../../store/themeConfigSlice";
import { useDispatch } from "react-redux";
import IconSearch from "../../components/Icon/IconSearch";
import { Link } from "react-router-dom";
import IconListCheck from "../../components/Icon/IconListCheck";
import IconLayoutGrid from "../../components/Icon/IconLayoutGrid";
import IconFacebook from "../../components/Icon/IconFacebook";
import IconInstagram from "../../components/Icon/IconInstagram";
import IconLinkedin from "../../components/Icon/IconLinkedin";
import IconTwitter from "../../components/Icon/IconTwitter";
import Select from "react-select";
import Dropdown from "../../components/Dropdown";
import IconHorizontalDots from "../../components/Icon/IconHorizontalDots";
import IconEye from "../../components/Icon/IconEye";
import IconShare from "../../components/Icon/IconShare";
import IconArchive from "../../components/Icon/IconArchive";
import IconEdit from "../../components/Icon/IconEdit";
import IconTxtFile from "../../components/Icon/IconTxtFile";
import IconPlus from "../../components/Icon/IconPlus";

const Templates = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setPageTitle("CNA"));
	});

	const [tabs, setTabs] = useState<string>("home");
	const toggleTabs = (name: string) => {
		setTabs(name);
	};

	const [page, setPage] = useState(1);
	const PAGE_SIZES = [10, 20, 30, 50, 100];
	const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

	const [search, setSearch] = useState("");
	const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
		columnAccessor: "firstName",
		direction: "asc",
	});

	const [codeArr, setCodeArr] = useState<string[]>([]);

	const toggleCode = (name: string) => {
		if (codeArr.includes(name)) {
			setCodeArr((value) => value.filter((d) => d !== name));
		} else {
			setCodeArr([...codeArr, name]);
		}
	};
	const [value, setValue] = useState<any>("list");

	const [templateList] = useState<any>([
		{
			id: 1,
			title: "New Assessment Template",
			organization: "MIFOTRA",
			description: "New Assessment Template",
			questions: 10,
			created_By: "NDAHAYO Bertin",
			created_At: "10/08/2020",
			updated_By: "Ntwali Jimmy",
			updated_At: "10/08/2024",
		},
		{
			id: 2,
			title: "Employee Performance Review",
			organization: "RwandAir",
			description: "Template for evaluating employee performance",
			questions: 15,
			created_By: "Uwimana Charles",
			created_At: "02/14/2023",
			updated_By: "Uwimana Charles",
			updated_At: "06/24/2024",
		},
		{
			id: 3,
			title: "Customer Satisfaction Survey",
			organization: "Bank of Kigali",
			description: "Survey to gauge customer satisfaction",
			questions: 8,
			created_By: "Mukankusi Marie",
			created_At: "05/12/2022",
			updated_By: "Mukankusi Marie",
			updated_At: "06/25/2024",
		},
		{
			id: 4,
			title: "Inventory Audit Checklist",
			organization: "MINICOM",
			description: "Checklist for conducting inventory audits",
			questions: 20,
			created_By: "Iradukunda Jean",
			created_At: "09/21/2021",
			updated_By: "Iradukunda Jean",
			updated_At: "06/24/2024",
		},
		{
			id: 5,
			title: "Project Progress Report",
			organization: "RDB",
			description: "Template for reporting project progress",
			questions: 12,
			created_By: "Ingabire Aimee",
			created_At: "11/19/2020",
			updated_By: "Ingabire Aimee",
			updated_At: "06/24/2024",
		},
		{
			id: 6,
			title: "Training Needs Assessment",
			organization: "WASAC",
			description: "Identify training needs for employees",
			questions: 10,
			created_By: "Habimana Patrick",
			created_At: "01/07/2022",
			updated_By: "Habimana Patrick",
			updated_At: "06/25/2024",
		},
		{
			id: 7,
			title: "Client Onboarding Checklist",
			organization: "KCB Rwanda",
			description: "Checklist for onboarding new clients",
			questions: 18,
			created_By: "Uwimana Alice",
			created_At: "04/10/2021",
			updated_By: "Uwimana Alice",
			updated_At: "06/24/2024",
		},
		{
			id: 8,
			title: "Marketing Campaign Evaluation",
			organization: "Airtel Rwanda",
			description: "Evaluate the effectiveness of marketing campaigns",
			questions: 15,
			created_By: "Harerimana Jean Paul",
			created_At: "08/03/2023",
			updated_By: "Harerimana Jean Paul",
			updated_At: "06/25/2024",
		},
		{
			id: 9,
			title: "Software Bug Report",
			organization: "Irembo",
			description: "Report bugs encountered in software",
			questions: 2,
			created_By: "Harerimana Jean Paul",
			created_At: "08/03/2023",
			updated_By: "Harerimana Jean Paul",
			updated_At: "06/25/2024",
		},
		{
			id: 10,
			title: "Website Usability Testing Plan",
			organization: "AGACIRO Development Agency",
			description: "Plan for testing the usability of a website",
			questions: 22,
			created_By: "Uwizeyimana Claudine",
			created_At: "12/02/2022",
			updated_By: "Uwizeyimana Claudine",
			updated_At: "06/25/2024",
		},
		{
			id: 11,
			title: "Social Media Content Calendar",
			organization: "Rwanda Biomedical Center",
			description: "Schedule for posting content on social media",
			questions: "",
			created_By: "Mukagasana Louise",
			created_At: "03/16/2021",
			updated_By: "Mukagasana Louise",
			updated_At: "06/24/2024",
		},
		{
			id: 12,
			title: "Event Planning Checklist",
			organization: "RBA",
			description: "Checklist for planning and executing events",
			questions: 30,
			created_By: "Nsabimana Eric",
			created_At: "06/18/2022",
			updated_By: "Nsabimana Eric",
			updated_At: "06/24/2024",
		},
		{
			id: 13,
			title: "Incident Report Form",
			organization: "RGB",
			description: "Report form for incidents that occur",
			questions: 15,
			created_By: "Uwimana Rachel",
			created_At: "09/09/2020",
			updated_By: "Uwimana Rachel",
			updated_At: "06/25/2024",
		},
		{
			id: 14,
			title: "Leave Request Form",
			organization: "MINICOM",
			description: "Form for requesting leave from work",
			questions: 8,
			created_By: "Iradukunda Jean",
			created_At: "12/17/2021",
			updated_By: "Iradukunda Jean",
			updated_At: "06/24/2024",
		},
		{
			id: 15,
			title: "Product Launch Plan",
			organization: "RwandAir",
			description: "Plan for launching a new product",
			questions: 25,
			created_By: "Uwimana Charles",
			created_At: "05/05/2023",
			updated_By: "Uwimana Charles",
			updated_At: "06/25/2024",
		},
		{
			id: 16,
			title: "Performance Improvement Plan",
			organization: "Bank of Kigali",
			description: "Plan for improving employee performance",
			questions: 12,
			created_By: "Mukankusi Marie",
			created_At: "02/22/2022",
			updated_By: "Mukankusi Marie",
			updated_At: "06/24/2024",
		},
		{
			id: 17,
			title: "Meeting Agenda",
			organization: "MINEDUC",
			description: "Agenda for a meeting",
			questions: "",
			created_By: "NDAHAYO Bertin",
			created_At: "07/15/2020",
			updated_By: "NDAHAYO Bertin",
			updated_At: "06/25/2024",
		},
		{
			id: 18,
			title: "Content Marketing Strategy",
			organization: "RDB",
			description: "Agenda for a meeting",
			questions: "",
			created_By: "NDAHAYO Bertin",
			created_At: "07/15/2020",
			updated_By: "NDAHAYO Bertin",
			updated_At: "06/25/2024",
		},

		{
			id: 19,
			title: "Competitor Analysis Report",
			organization: "Airtel Rwanda",
			description: "Analysis of competitor's strengths and weaknesses",
			questions: 18,
			created_By: "Harerimana Jean Paul",
			created_At: "11/11/2023",
			updated_By: "Harerimana Jean Paul",
			updated_At: "06/25/2024",
		},
		{
			id: 20,
			title: "Software Development Requirements Document",
			organization: "Irembo",
			description: "Document outlining software requirements",
			questions: "",
			created_By: "Habimana Patrick",
			created_At: "04/02/2022",
			updated_By: "Habimana Patrick",
			updated_At: "06/24/2024",
		},
		{
			id: 21,
			title: "Website Design Mockup",
			organization: "AGACIRO Development Agency",
			description: "Visual representation of a website design",
			questions: "",
			created_By: "Uwizeyimana Claudine",
			created_At: "01/20/2023",
			updated_By: "Uwizeyimana Claudine",
			updated_At: "06/25/2024",
		},
		{
			id: 22,
			title: "Social Media Content Calendar", // Same title as id 11, but likely different content
			organization: "Rwanda Biomedical Center",
			description: "Schedule for posting content on social media (Health)",
			questions: "",
			created_By: "Mukagasana Louise",
			created_At: "06/06/2024",
			updated_By: "Mukagasana Louise",
			updated_At: "06/24/2024",
		},
		{
			id: 23,
			title: "Budget Proposal",
			organization: "RBA",
			description: "Proposal for allocating financial resources",
			questions: 10,
			created_By: "Nsabimana Eric",
			created_At: "09/23/2023",
			updated_By: "Nsabimana Eric",
			updated_At: "06/24/2024",
		},
		{
			id: 24,
			title: "Risk Management Plan",
			organization: "RGB",
			description: "Plan for identifying and mitigating risks",
			questions: 15,
			created_By: "Uwimana Rachel",
			created_At: "12/14/2022",
			updated_By: "Uwimana Rachel",
			updated_At: "06/25/2024",
		},
		{
			id: 25,
			title: "User Manual",
			organization: "MINICOM",
			description: "Instructions for using a product or service",
			questions: "",
			created_By: "Iradukunda Jean",
			created_At: "03/03/2023",
			updated_By: "Iradukunda Jean",
			updated_At: "06/24/2024",
		},
	]);

	const options4 = [
		{ value: "draft", label: "Draft" },
		{ value: "sent", label: "Sent" },
		{ value: "under-review", label: "Under review" },
		{ value: "review", label: " Review" },
	];

	const [filteredItems, setFilteredItems] = useState<any>(templateList);

	useEffect(() => {
		setFilteredItems(() => {
			return templateList.filter((item: any) => {
				return item.title.toLowerCase().includes(search.toLowerCase());
			});
		});
	}, [search, templateList]);

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
						<span>Templates</span>
					</li>
				</ul>
			</div>

			{/* dfd
			 *
			 * Template Filters
			 *
			 */}

			<div className="flex flex-col justify-start mt-5 item-center sm:flex-row flex-col sm:items-center sm:gap-3 gap-40 w-full sm:w-auto">
				<div className="relative">
					<input
						type="text"
						placeholder="Search Templates..."
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

				{/* Searchable Select*/}
				<div className="flex items-center justify-between"></div>
				<div className="">
					<Select placeholder="Select status" options={options4} />
				</div>

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
						<IconPlus className="ltr:mr-2 rtl:ml-2" />
						Create Template
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

			{/*
			 * Templates Card view
			 */}

			{value === "list" && (
				<div className="mt-5 panel p-0 border-0 overflow-hidden">
					<div className="table-responsive">
						<table className="table-striped table-hover">
							<thead>
								<tr>
									<th>ID</th>
									<th>Title</th>
									<th>Organization</th>
									<th>Description</th>
									<th>No. Questions</th>
									<th>Created By</th>
									<th>Created At</th>
									<th>Updated By</th>
									<th>Updated At</th>
									<th className="!text-center">Actions</th>
								</tr>
							</thead>
							<tbody>
								{filteredItems.map((contact: any) => {
									return (
										<tr key={contact.id}>
											<td>{contact.id}</td>
											<td>{contact.title}</td>
											<td>{contact.organization}</td>
											<td>{contact.description}</td>
											<td>{contact.questions}</td>
											<td>{contact.created_By}</td>
											<td>{contact.created_At}</td>
											<td>{contact.updated_By}</td>
											<td>{contact.updated_At}</td>
											<td>
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
																	<IconShare className="mr-2" />{" "}
																	<span>Share</span>
																</button>
															</li>
															<li>
																<button
																	type="button"
																	className="flex items-center space-x-2"
																>
																	<IconEdit className="mr-2" />{" "}
																	<span>Edit</span>
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
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			)}

			{value === "grid" && (
				<div className="grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-5 w-full">
					{filteredItems.map((contact: any) => {
						return (
							<div
								className="bg-white dark:bg-[#1c232f] rounded-md overflow-hidden text-center shadow relative"
								key={contact.id}
							>
								<div className="bg-white dark:bg-[#1c232f] rounded-md overflow-hidden text-center shadow relative">
									<div
										className="bg-white/40 rounded-t-md bg-center bg-cover p-6 pb-0 bg-"
										style={{
											backgroundImage: `url('/assets/images/notification-bg.png')`,
											backgroundRepeat: "no-repeat",
											width: "100%",
											height: "100%",
										}}
									>
										<img
											className="object-contain w-4/5 max-h-40 mx-auto"
											src={`/assets/images/${contact.path}`}
											alt="contact_image"
										/>
									</div>
									<div className="px-6 pb-24 -mt-10 relative">
										<div className="shadow-md bg-white dark:bg-gray-900 rounded-md px-2 py-4">
											<div className="text-xl">{contact.name}</div>
											<div className="text-white-dark">{contact.role}</div>
											<div className="flex items-center justify-between flex-wrap mt-6 gap-3">
												<div className="flex-auto">
													<div className="text-info">{contact.posts}</div>
													<div>Posts</div>
												</div>
												<div className="flex-auto">
													<div className="text-info">{contact.following}</div>
													<div>Following</div>
												</div>
												<div className="flex-auto">
													<div className="text-info">{contact.followers}</div>
													<div>Followers</div>
												</div>
											</div>
											<div className="mt-4">
												<ul className="flex space-x-4 rtl:space-x-reverse items-center justify-center">
													<li>
														<button
															type="button"
															className="btn btn-outline-primary p-0 h-7 w-7 rounded-full"
														>
															<IconFacebook />
														</button>
													</li>
													<li>
														<button
															type="button"
															className="btn btn-outline-primary p-0 h-7 w-7 rounded-full"
														>
															<IconInstagram />
														</button>
													</li>
													<li>
														<button
															type="button"
															className="btn btn-outline-primary p-0 h-7 w-7 rounded-full"
														>
															<IconLinkedin />
														</button>
													</li>
													<li>
														<button
															type="button"
															className="btn btn-outline-primary p-0 h-7 w-7 rounded-full"
														>
															<IconTwitter />
														</button>
													</li>
												</ul>
											</div>
										</div>
										<div className="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right">
											<div className="flex items-center">
												<div className="flex-none ltr:mr-2 rtl:ml-2">
													Email :
												</div>
												<div className="truncate text-white-dark">
													{contact.email}
												</div>
											</div>
											<div className="flex items-center">
												<div className="flex-none ltr:mr-2 rtl:ml-2">
													Phone :
												</div>
												<div className="text-white-dark">{contact.phone}</div>
											</div>
											<div className="flex items-center">
												<div className="flex-none ltr:mr-2 rtl:ml-2">
													Address :
												</div>
												<div className="text-white-dark">
													{contact.location}
												</div>
											</div>
										</div>
									</div>
									<div className="mt-6 flex gap-4 absolute bottom-0 w-full ltr:left-0 rtl:right-0 p-6">
										<button
											type="button"
											className="btn btn-outline-primary w-1/2"
											// onClick={() => editUser(contact)}
										>
											Edit
										</button>
										<button
											type="button"
											className="btn btn-outline-danger w-1/2"
											// onClick={() => deleteUser(contact)}
										>
											Delete
										</button>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Templates;
