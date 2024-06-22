import React from "react";

const featuresData = [
	{
		title: "Comprehensive Needs Assessment",
		description:
			"Tools and modules that enable the analysis of existing processes, frameworks, and capacity development programs. This includes conducting comprehensive needs assessments to understand specific requirements and challenges.",
		imageUrl: "/assets/images/features/assessment.jpeg",
	},
	{
		title: "Capacity Plan Approval",
		description:
			"A user-friendly integrated system to facilitate capacity building initiative planning and approval processes from various public institutions in Rwanda. This feature includes stakeholder collaboration tools and approval workflows.",
		imageUrl: "/assets/images/features/approval.png",
	},
	{
		title: "Training Management",
		description:
			"A user-friendly and intuitive e-learning platform that leverages state-of-the-art technologies and pedagogical principles. It includes customizable features for training management, enabling organizations to tailor the platform to their specific needs.",
		imageUrl: "/assets/images/features/management.png",
	},
	{
		title: "Dashboard and Reporting",
		description:
			"Dashboard and reporting functionalities for different capacity development programs. This feature provides comprehensive insights and analytics to monitor and evaluate the effectiveness of the programs.",
		imageUrl: "/assets/images/features/dashboard.png",
	},
];

const Feature: React.FC<{
	title: string;
	description: string;
	imageUrl: string;
}> = ({ title, description, imageUrl }) => {
	return (
		<div className="feature flex flex-col items-center">
			<div className="bg-gradient-to-r from-cdms_primary to-cdms_secondary rounded-full p-4 mb-4">
				<img
					src={imageUrl}
					alt={title}
					className="w-32 h-40 rounded-2xl ml-8"
				/>
			</div>
			<h3 className="font-bold text-xl mb-4">{title}</h3>
			<p className="text-center">{description}</p>
		</div>
	);
};

const FeaturesSection: React.FC = () => {
	return (
		<>
			<h2 className="text-2xl font-bold mb-8 text-center">Our Features</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{featuresData.map((feature, index) => (
					<Feature
						key={index}
						title={feature.title}
						description={feature.description}
						imageUrl={feature.imageUrl}
					/>
				))}
			</div>
		</>
	);
};

export default FeaturesSection;
