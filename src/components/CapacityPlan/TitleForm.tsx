import React, { useState } from "react";

interface EditableFormProps {
	title: string;
	icon: string;
	data: { [key: string]: string };
	onSave: (newData: { [key: string]: string }) => void;
}

const EditableForm: React.FC<EditableFormProps> = ({
	title,
	icon,
	data,
	onSave,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState(data);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = () => {
		onSave(formData);
		setIsEditing(false);
	};

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<div className="editable-form">
			<div className="header flex items-center justify-between">
				<h2 className="title">{title}</h2>
				<button className="edit-icon" onClick={handleEditClick}>
					{icon}
				</button>
			</div>
			<div className="content">
				{Object.keys(formData).map((key) => (
					<div key={key} className="form-group">
						<label htmlFor={key}>{key}</label>
						{isEditing ? (
							<input
								type="text"
								id={key}
								name={key}
								value={formData[key]}
								onChange={handleChange}
							/>
						) : (
							<p>{formData[key]}</p>
						)}
					</div>
				))}
			</div>
			{isEditing && (
				<div className="actions">
					<button className="save-button" onClick={handleSaveClick}>
						Save
					</button>
				</div>
			)}
		</div>
	);
};

export default EditableForm;
