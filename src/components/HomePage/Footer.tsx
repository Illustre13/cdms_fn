import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="bg-cdms_primary text-white py-8">
			<div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0 px-8">
				<div className="flex flex-col items-center md:items-start">
					<h3 className="text-lg font-bold mb-4">Navigation</h3>
					<ul className="space-y-2">
						<li>
							<Link to="/" className="hover:text-gray-400">
								Home
							</Link>
						</li>
						<li>
							<Link to="/features" className="hover:text-gray-400">
								Features
							</Link>
						</li>
						<li>
							<Link to="/about-us" className="hover:text-gray-400">
								About Us
							</Link>
						</li>
						<li>
							<Link to="/contact-us" className="hover:text-gray-400">
								Contact Us
							</Link>
						</li>
					</ul>
				</div>
				<div className="flex flex-col items-center md:items-start">
					<h3 className="text-lg font-bold mb-4">Quick Links</h3>
					<ul className="space-y-2">
						<li>
							<Link to="/privacy-policy" className="hover:text-gray-400">
								Privacy Policy
							</Link>
						</li>
						<li>
							<Link to="/terms-of-service" className="hover:text-gray-400">
								Terms of Service
							</Link>
						</li>
						<li>
							<Link to="/support" className="hover:text-gray-400">
								Support
							</Link>
						</li>
					</ul>
				</div>
				<div className="flex flex-col items-center md:items-start">
					<h3 className="text-lg font-bold mb-4">Contact Us</h3>
					<ul className="space-y-2">
						<li>
							Email:{" "}
							<a href="mailto:support@cdms.com" className="hover:text-gray-400">
								support@cdms.com
							</a>
						</li>
						<li>
							Phone:{" "}
							<a href="tel:+250123456789" className="hover:text-gray-400">
								+250 123 456 789
							</a>
						</li>
						<li>Address: Kigali, Rwanda</li>
					</ul>
				</div>
			</div>
			<div className="text-center mt-8">
				<p>&copy; {new Date().getFullYear()} CDMS. All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
