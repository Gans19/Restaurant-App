/** @format */

import React from "react";

const Header = () => {
	return (
		<div className="w-screen z-50 fixed bg-slate-300 p-6 px-16">
			{/* desktop and tablets */}
			<div className="hidden md:flex w-full p-4"></div>

			{/* for mobile */}
			<div className="flex md:hidden w-full bg-blue-500 h-full p-4"></div>
		</div>
	);
};

export default Header;
