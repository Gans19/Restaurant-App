/** @format */

import React from "react";
import Delivery from "../../img/delivery.png";
import Bg from "../../img/heroBg.png";
import I1 from "../../img/r2.png";

const HomeContainer = () => {
	return (
		<section
			className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full h-screen"
			id="home">
			<div className="flex-1 py-2 flex flex-col items-start justify-start md:items-center gap-6">
				<div className="flex items-center justify-center gap-2 bg-orange-100 px-4 py-2 rounded-full">
					<p className="text-base text-orange-500 font-semibold">
						Bike Delivery
					</p>
					<div className="w-8 h-8 rounded-full bg-white overflow-hidden drop-shadow-xl">
						<img
							className="w-full h-full object-contain"
							src={Delivery}
							alt=""
						/>
					</div>
				</div>

				<p className="text-[2.5rem] font-bold tracking-wide text-headingColor md:text-[4.5rem]">
					The Fastest Delivery In{" "}
					<span className="text-orange-600 text-[3rem] md:text-[5rem]">
						Your City
					</span>
				</p>
				<p className="text-base text-textColor text-center md:text-left md:w-[80%] ">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
					inventore molestiae facilis veniam quo, omnis, nulla possimus maiores
					minima nam ex voluptate accusantium mollitia perferendis quaerat
					doloremque beatae. Exercitationem, quia!
				</p>

				<button
					type="button"
					className="md:mr-auto md:w-auto bg-gradient-to-br from-orange-400 to-orange-500 w-full px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100">
					Order Now
				</button>
			</div>

			<div className="flex py-2 flex-1  items-center  relative">
				<img
					className="lg:h-685 h-420 w-full md:w-auto ml-auto"
					src={Bg}
					alt=""
				/>

				<div className="w-full h-full absolute top-0 left-0 px-32 py-4 flex items-center justify-center">
					<div className="w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col">
						<img src={I1} className="w-40 -mt-20 " alt="" />
						<p className="text-xl font-semibold text-textColor mt-4">
							Biriyani
						</p>
						<p className="text-sm text-lighttextGray font-semibold my-3">
							Chicken & Mutton
						</p>
						<p className="text-sm font-semibold text-headingColor">
							Rs. <span className="text-xs text-red-500">₹</span>180
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HomeContainer;
