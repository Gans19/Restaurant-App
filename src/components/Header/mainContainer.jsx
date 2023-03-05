/** @format */

import React from "react";
import Delivery from "../../img/delivery.png";

const MainContainer = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
			<div className="flex-1 py-2 flex flex-col items-start justify-center md:items-center gap-6">
				<div className="flex items-center justify-center gap-2 bg-orange-100 px-4 py-2 rounded-full">
					<p className="text-base text-orange-500 font-semibold">
						Bike Delivery
					</p>
					<div className="w-6 h-6 rounded-full bg-white overflow-hidden drop-shadow-xl">
						<img
							className="w-full h-full object-contain"
							src={Delivery}
							alt=""
						/>
					</div>
				</div>
			</div>

			<p className="text-[2.5rem] font-bold tracking-wide text-headingColor">
				The Fastest Delivery In{" "}
				<span className="text-orange-600 text-[3rem]">Your City</span>
			</p>
			<p className="text-base text-textColor text-center md:text-left">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis inventore
				nam ex voluptate accusantium mollitia perferendis quaerat doloremque
				molestiae facilis veniam quo, omnis, nulla possimus maiores minima
				beatae. Exercitationem, quia!
			</p>

			<button className="bg-gradient-400 to-orange-500 w-full px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out">
				Order Now
			</button>

			<div className="py-2 flex-1"></div>
		</div>
	);
};

export default MainContainer;
