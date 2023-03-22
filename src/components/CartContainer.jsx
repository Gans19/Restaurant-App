/** @format */

import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";
import { BiMinus, BiPlus } from "react-icons/bi";

const CartContainer = () => {
	return (
		<div
			className="w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col
    fixed top-0 right-0 z-[101]">
			<div className="w-full items-center justify-between flex p-4">
				<motion.div whileTap={{ scale: 0.75 }}>
					<MdOutlineKeyboardBackspace className="text-textColor text-3xl cursor-pointer" />
				</motion.div>
				<p className="text-textColor text-lg font-semibold">Cart</p>

				<motion.p
					whileTap={{ scale: 0.75 }}
					className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md 
                     cursor-pointer text-textColor text-base">
					Clear
					<RiRefreshFill className="text-red-500 font-semibold" />
				</motion.p>
			</div>

			{/* bottom Section */}

			<div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
				<div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none scrollbar">
					{/* Cart Item secction*/}
					<div className="w-full p-1 px-2 rounded-lg bg-cartItem flex item-center gap-2">
						<img
							className="w-20 h-20 max-w-[60px] rounded-full object-contain"
							src=""
							alt=""
						/>
						{/* name section */}

						<div className="flex flex-col gap-2">
							<p className="text-base text-gray-50">Icecream</p>
							<p className="text-sm block text-gray-300 font-semibold ">₹50</p>
						</div>
						{/* button section */}
						<div className="group flex item-center gap-2 ml-auto cursor-pointer">
							<motion.div whileTap={{ scale: 0.7 }}>
								<BiMinus className="text-gray-50" />
							</motion.div>
							<p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
								3
							</p>
							<motion.div whileTap={{ scale: 0.7 }}>
								<BiPlus className="text-gray-50" />
							</motion.div>
						</div>
					</div>
				</div>

				{/* Cart Item Total secction*/}

				<div className="w-full flex-1 items-center justify-evenly py-12 px-8 flex-col  bg-cartTotal rounded-t-[2rem]">
					<div className="w-full flex items-center justify-between">
						<p className="text-gray-400 text-lg">Sub Total</p>
						<p className="text-gray-400 text-lg">₹50</p>
					</div>
					<div className="w-full flex items-center justify-between">
						<p className="text-gray-400 text-lg">Delivery</p>
						<p className="text-gray-400 text-lg">₹25</p>
					</div>

					<div className="w-full border-b border-gray-600 my-2">
						<div className="w-full justify-center flex items-center">
							<p className="text-gray-200 text-xl font-semibold">Total</p>
							<p className="text-gray-200 text-xl font-semibold">₹25</p>
						</div>

						<motion.button
							whileTap={{ scale: 0.8 }}
							type="button"
							className="w-full p-2 rounded-full bg-orange-500 text-gray-50 text-lg 
                              my-2 hover:shadow-lg">
							Check Out
						</motion.button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartContainer;
