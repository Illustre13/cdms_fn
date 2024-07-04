import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../store/themeConfigSlice";
import IconX from "../../components/Icon/IconX";
import IconDownload from "../../components/Icon/IconDownload";
import IconEye from "../../components/Icon/IconEye";
import IconSend from "../../components/Icon/IconSend";
import IconSave from "../../components/Icon/IconSave";
import IconArrowBackward from "../../components/Icon/IconArrowBackward";
import IconPlusCircle from "../../components/Icon/IconPlusCircle";
import IconPlus from "../../components/Icon/IconPlus";

const Add = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setPageTitle("Add Capacity Plan"));
	});

	const [form, setForm] = useState({
		title: "",
		description: "",
		type: "ANNUAL_PLAN",
		status: "",
		attachment: null,
		program: "",
		subProgram: "",
		output: "",
		capacityChallenge: "",
		level: "INSTITUTIONAL",
		action: "",
		participants: [],
		responsibleEntity: "",
		stakeholders: [],
		budget: 0,
		currency: "",
		fundSource: "",
		organization: "",
	});

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const CapacityPlanType = [
		{ value: "draft", label: "Draft" },
		{ value: "sent", label: "Sent" },
		{ value: "under-review", label: "Under review" },
		{ value: "review", label: " Review" },
	];

	const CapacityPlanStatus = [
		{ value: "draft", label: "Draft" },
		{ value: "sent", label: "Sent" },
		{ value: "under-review", label: "Under review" },
		{ value: "review", label: " Review" },
	];

	const CapacityPlanLevel = [
		{ value: "draft", label: "Draft" },
		{ value: "sent", label: "Sent" },
		{ value: "under-review", label: "Under review" },
		{ value: "review", label: " Review" },
	];

	// const handleFileChange = (e) => {
	// 	const file = e.target.files[0];
	// 	const reader = new FileReader();
	// 	reader.onload = () => {
	// 		setForm({ ...form, attachment: Buffer.from(reader.result) });
	// 	};
	// 	reader.readAsArrayBuffer(file);
	// };

	const handleSubmit = (event: any) => {
		event.preventDefault();
		// Submit form logic
	};

	return (
		<>
			<div className="gap-4">
				<div className="flex flex-col w-full gap-4 pt-4 pb-8">
					<Link to="/cp/overview" className="flex items-center">
						<div className="flex flex-row gap-2 font-bold text-sm">
							<IconArrowBackward />
							<span>Back to overview</span>
						</div>
					</Link>
					<span className="flex flex-row gap-2 font-bold text-xl">
						Submit Capacity Plan
					</span>
				</div>
			</div>
			<div className="flex xl:flex-row flex-col gap-4">
				<div className="flex flex-col xl:w-full w-full gap-4">
					<form className="panel flex-1 ltr:xl:mr-6 rtl:xl:ml-6 p-4">
						<div className="mb-2">
							<label htmlFor="fullname">Title</label>
							<input
								id="fullname"
								type="text"
								placeholder="Enter capacity plan title..."
								className="form-input"
							/>
						</div>

						<div className="mb-2">
							<label htmlFor="fullname">Description</label>
							<input
								id="fullname"
								type="text"
								placeholder="Enter capacity plan description..."
								className="form-input"
							/>
						</div>

						<div className="mb-2">
							<label htmlFor="fullname">Capacity Plan Type</label>
							<select className="form-select form-select-lg text-white-dark">
								<option>Annual Plan</option>
								<option>Quartely Plan</option>
								<option>5-Year Plan</option>
								<option>7-Year Plan</option>
							</select>
						</div>

						<div className="mb-2">
							<label htmlFor="fullname">Budget</label>
							<input
								id="budget"
								type="number"
								placeholder="Enter capacity plan budget..."
								className="form-input"
							/>
						</div>

						<hr className="border-white-light dark:border-[#1b2e4b] my-6" />
						<div className="mb-2 flex flex-col gap-4 justify-between">
							<label htmlFor="avatar">Choose Capacity Plan File:</label>
							<input
								type="file"
								id="avatar"
								name="avatar"
								accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
							/>
						</div>
						<hr className="border-white-light dark:border-[#1b2e4b] my-6" />
						<div className="mb-2 flex flex-row gap-4 justify-between">
							<div className="flex flex-col gap-2">
								<label htmlFor="avatar">Choose Training Plan File(s):</label>
								<input
									type="file"
									id="avatar"
									name="avatar"
									accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
									multiple
								/>
							</div>
						</div>
						<hr className="border-white-light dark:border-[#1b2e4b] my-6" />
						<div className="flex justify-end gap-4">
							<Link to="/cp/overview">
								<button type="button" className="btn bg-gray-200">
									<IconPlus className="w-5 h-5 ltr:mr-1.5 rtl:ml-1.5 shrink-0" />
									Cancel
								</button>
							</Link>
							<button type="button" className="btn btn-primary">
								<IconPlus className="w-5 h-5 ltr:mr-1.5 rtl:ml-1.5 shrink-0" />
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Add;
