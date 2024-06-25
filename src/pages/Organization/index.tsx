import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { setPageTitle } from "../../store/themeConfigSlice";
import { useDispatch } from "react-redux";
import IconHome from "../../components/Icon/IconHome";
import IconArchive from "../../components/Icon/IconArchive";
import IconEdit from "../../components/Icon/IconEdit";
import IconCamera from "../../components/Icon/IconCamera";

const AccountSetting = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setPageTitle("Account Setting"));
	});
	const [tabs, setTabs] = useState<string>("home");
	const toggleTabs = (name: string) => {
		setTabs(name);
	};

	return (
		<div>
			<ul className="flex space-x-2 rtl:space-x-reverse">
				<li>
					<Link to="/dashboard" className="text-cdms_primary hover:underline">
						Dashboard
					</Link>
				</li>
				<li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
					<span>Organization</span>
				</li>
			</ul>
			<div className="pt-5">
				<div>
					<div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 bg-white dark:bg-black mb-4 flex flex-row gap-5">
						<div className="relative ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
							<img
								src="/assets/images/brands/brands-008.png"
								alt="img"
								className="w-48 h-48 md:w-48 md:h-48 rounded-full object-cover mx-auto border border-[bg-cdms_secondary] dark:border-[#191e3a] shadow-lg"
							/>
							<div className="absolute bottom-0 right-10 p-1 bg-white rounded-full">
								<IconCamera className="w-8 h-8 text-blue-700" />
							</div>
						</div>

						<h6 className="text-xl font-bold mt-8 w-8/12">
							Rwanda Space Agency
						</h6>
						<div className="w-1/12 flex justify-end items-end">
							<IconEdit className="flex justify-end right-0" />
						</div>
					</div>

					<form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
						<h6 className="text-lg font-bold mb-5">General Information</h6>
						<div className="flex flex-col sm:flex-row">
							<div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
								<div>
									<label htmlFor="name">Organization Name</label>
									<input
										id="name"
										type="text"
										placeholder="Organization Name"
										className="form-input"
									/>
								</div>
								<div>
									<label htmlFor="displayName">Display Name</label>
									<input
										id="displayName"
										type="text"
										placeholder="Display Name"
										className="form-input"
									/>
								</div>
								<div>
									<label htmlFor="logoUrl">Logo URL</label>
									<input
										id="logoUrl"
										type="text"
										placeholder="Logo URL"
										className="form-input"
									/>
								</div>
								<div>
									<label htmlFor="aboutUs">About Us</label>
									<textarea
										id="aboutUs"
										placeholder="About Us"
										className="form-textarea"
									></textarea>
								</div>
								<div>
									<label htmlFor="mission">Mission</label>
									<textarea
										id="mission"
										placeholder="Mission"
										className="form-textarea"
									></textarea>
								</div>
								<div>
									<label htmlFor="vision">Vision</label>
									<textarea
										id="vision"
										placeholder="Vision"
										className="form-textarea"
									></textarea>
								</div>
								<div>
									<label htmlFor="industry">Industry</label>
									<input
										id="industry"
										type="text"
										placeholder="Industry"
										className="form-input"
									/>
								</div>
								<div>
									<label htmlFor="address">Address</label>
									<input
										id="address"
										type="text"
										placeholder="Address"
										className="form-input"
									/>
								</div>
								<div>
									<label htmlFor="phoneNumber">Phone Number</label>
									<input
										id="phoneNumber"
										type="text"
										placeholder="Phone Number"
										className="form-input"
									/>
								</div>
								<div>
									<label htmlFor="email">Email</label>
									<input
										id="email"
										type="email"
										placeholder="Email"
										className="form-input"
									/>
								</div>
								<div>
									<label htmlFor="status">Status</label>
									<select id="status" className="form-select text-white-dark">
										<option value="PENDING">Pending</option>
										<option value="APPROVED">Approved</option>
										<option value="REJECTED">Rejected</option>
									</select>
								</div>
								<div>
									<label htmlFor="website">Website</label>
									<input
										id="website"
										type="text"
										placeholder="Website"
										className="form-input"
									/>
								</div>
								<div>
									<label htmlFor="tinNo">TIN Number</label>
									<input
										id="tinNo"
										type="text"
										placeholder="TIN Number"
										className="form-input"
									/>
								</div>
								<div>
									<label
										htmlFor="isSuperAdmin"
										className="inline-flex cursor-pointer"
									>
										<input
											type="checkbox"
											id="isSuperAdmin"
											className="form-checkbox"
										/>
										<span className="text-white-dark relative checked:bg-none ml-2">
											Is Super Admin
										</span>
									</label>
								</div>
								<div className="sm:col-span-2 mt-3">
									<button type="button" className="btn btn-primary">
										Edit
									</button>
								</div>
							</div>
						</div>
					</form>

					<div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 bg-white dark:bg-black mb-4 flex flex-row gap-5">
						<div className="switch">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
								<div className="panel space-y-5">
									<h5 className="font-semibold text-lg mb-4">
										Deactivate Account
									</h5>
									<p>Organization account will be deactivated automatically!</p>
									<label className="w-12 h-6 relative">
										<input
											type="checkbox"
											className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
											id="custom_switch_checkbox7"
										/>
										<span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-cdms_primary before:transition-all before:duration-300"></span>
									</label>
								</div>
								<div className="panel space-y-5">
									<h5 className="font-semibold text-lg mb-4">Delete Account</h5>
									<p>
										Once you delete the account, there is no going back. Please
										be certain.
									</p>
									<button className="btn btn-danger btn-delete-account">
										Delete organization account
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountSetting;
