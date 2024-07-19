import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";
import sortBy from "lodash/sortBy";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { setPageTitle } from "../../redux/reducer/themeConfigSlice";
import { useDispatch, useSelector } from "react-redux";
import IconSearch from "../../components/Icon/IconSearch";
import Select from "react-select";
import IconPlus from "../../components/Icon/IconPlus";
import Dropdown from "../../components/Dropdown";
import IconHorizontalDots from "../../components/Icon/IconHorizontalDots";
import IconEye from "../../components/Icon/IconEye";
import IconShare from "../../components/Icon/IconShare";
import IconArchive from "../../components/Icon/IconArchive";
import IconEdit from "../../components/Icon/IconEdit";
import IconTxtFile from "../../components/Icon/IconTxtFile";
import { IRootState } from "../../redux/store";
import { fetchAllOrganization } from "../../redux/action/organizationAction";

const Organization = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setPageTitle("Organizations"));
	});

	const organizationState = useSelector((state: IRootState) => state.organization);

	  useEffect(() => {
		dispatch(fetchAllOrganization() as any);
		console.log("Organization Info After 222 -------> ", organizationState)
	  }, []);
	  const organizationData = organizationState?.data?.data;
	  console.log("organizationData --> ", organizationData)
	

	  
	const [page, setPage] = useState(1);
	const PAGE_SIZES = [10, 20, 30, 50, 100];
	const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
	const [initialRecords, setInitialRecords] = useState(
		// sortBy(organizations, "id")
		organizationData?.organizations
	);
	

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
		console.log(to, from)
	}, [page, pageSize, initialRecords]);

	useEffect(() => {
		const data = sortBy(initialRecords, sortStatus.columnAccessor);
		setInitialRecords(sortStatus.direction === "desc" ? data.reverse() : data);
		setPage(1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortStatus]);

	const [page2, setPage2] = useState(1);
	const [pageSize2, setPageSize2] = useState(PAGE_SIZES[0]);
	const [initialRecords2, setInitialRecords2] = useState(
		organizationData?.organizations
	);

	useEffect(() => {
		setPage2(1);
	}, [pageSize2]);

	useEffect(() => {
		const from = (page2 - 1) * pageSize2;
		const to = from + pageSize2;
	}, [page2, pageSize2, initialRecords2]);


	const options3 = [
		{ value: "it", label: "IT" },
		{ value: "agriculture", label: "Agriculture" },
		{ value: "finance", label: "Finance" },
	];

	const options4 = [
		{ value: "active", label: "Active" },
		{ value: "pending", label: "Pending" },
		{ value: "suspended", label: "Suspended" },
	];

	const handleDelete = () => {

	}
	

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
							placeholder="Search an organization..."
							className="form-input w-auto py-2 ltr:pr-11 rtl:pl-11 peer"
							// value={search2}
							// onChange={(e) => setSearch2(e.target.value)}
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
							placeholder="All Industry"
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
							Add New Organization
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
						records={organizationData?.organizations}
						columns={[
							{
								accessor: "name",
								title: "Name",
								sortable: true,
							},
							{
								accessor: "displayName",
								title: "Display Name",
								sortable: true,
							},
							{
								accessor: "industry",
								title: "Industry",
								sortable: true,
							},
							{
								accessor: "phoneNumber",
								title: "Phone No.",
								sortable: true,
							},
							{
								accessor: "email",
								title: "Email",
								sortable: true,
							},
							{
								accessor: "status",
								title: "Status",
								sortable: true,
								render: ({ status }) => (
									<span className="badge bg-yellow-700">{status}</span>
								),
							},
							{
								accessor: "tinNo",
								title: "TIN No.",
								sortable: true,
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
														<IconShare className="mr-2" /> <span>Share</span>
													</button>
												</li>
												<li>
													<button
														type="button"
														className="flex items-center space-x-2"
													>
														<IconEdit className="mr-2" /> <span>Edit</span>
													</button>
												</li>
												<li>
													<button
														type="button"
														className="flex items-center space-x-2"
														onClick={() => handleDelete()}
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
						totalRecords={organizationData?.totalItems}
						recordsPerPage={pageSize2}
						page={page2}
						onPageChange={(p) => setPage2(p)}
						recordsPerPageOptions={PAGE_SIZES}
						onRecordsPerPageChange={setPageSize2}
						// sortStatus={sortStatus2}
						// onSortStatusChange={setSortStatus2}
						minHeight={200}
						paginationText={({ from, to, totalRecords }) =>
							`Showing ${from} to ${to} of ${totalRecords} entries`
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default Organization;
