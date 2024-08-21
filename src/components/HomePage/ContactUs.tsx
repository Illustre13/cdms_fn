import React from "react";

const ContactUs = () => {
	return (
		<div id="contact-us" className="max-w-2xl mx-auto p-8 bg-gray-100 rounded-lg shadow-2xl my-8">
			<h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
			<form>
				<div className="flex flex-wrap -mx-4 mb-4">
					<div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="first-name"
						>
							First Name
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="first-name"
							type="text"
							placeholder="First Name"
						/>
					</div>
					<div className="w-full md:w-1/2 px-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="last-name"
						>
							Last Name
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="last-name"
							type="text"
							placeholder="Last Name"
						/>
					</div>
				</div>
				<div className="flex flex-wrap -mx-4 mb-4">
					<div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="phone-number"
						>
							Phone Number
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="phone-number"
							type="tel"
							placeholder="Phone Number"
						/>
					</div>
					<div className="w-full md:w-1/2 px-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="email"
						>
							Email
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="email"
							type="email"
							placeholder="Email"
						/>
					</div>
				</div>
				<div className="mb-6 px-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="message"
					>
						Message
					</label>
					<textarea
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="message"
						placeholder="Your Message"
					></textarea>
				</div>
				<div className="flex items-center justify-center">
					<button
						className="bg-cdms_secondary hover:bg-cdms_primary text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
						type="button"
					>
						Send Message
					</button>
				</div>
			</form>
		</div>
	);
};

export default ContactUs;
