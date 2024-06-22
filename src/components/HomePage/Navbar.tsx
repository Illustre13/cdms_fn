import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
	return (
		<nav className="bg-cdms_primary p-4">
			<div className="container mx-auto flex justify-between items-center">
				<Link to="/" className="main-logo flex items-center shrink-0">
					<img
						className="w-24 ltr:-ml-1 rtl:-mr-1 inline"
						src="/assets/images/cdms_logo_002.png"
						alt="logo"
					/>
				</Link>
				<ul className="flex space-x-8 text-white items-center h-full">
					<li className="inline-block align-middle">
						<Link to="/">Home</Link>
					</li>
					<li className="inline-block align-middle">
						<Link to="/features">Features</Link>
					</li>
					<li className="inline-block align-middle">
						<Link to="/about-us">About Us</Link>
					</li>
					<li className="inline-block align-middle">
						<Link to="/contact-us">Contact Us</Link>
					</li>
					<li className="inline-block align-middle">
						<Link to="/signin">
							<button className="bg-gradient-to-r from-cdms_primary to-cdms_secondary hover:border-2 hover:border-dashed hover:border-cdms_secondary hover:cursor-pointer py-2 px-4 rounded">
								Sign In
							</button>
						</Link>
					</li>
					<li className="inline-block align-middle">
						<Link to="/signup">
							<button className="bg-gradient-to-r from-cdms_primary to-cdms_secondary hover:border-2 hover:border-dashed hover:border-cdms_secondary hover:cursor-pointer py-2 px-4 rounded">
								Sign Up
							</button>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
