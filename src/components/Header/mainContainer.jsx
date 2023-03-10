/** @format */

import React from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "../RowContainer";
import { useStateValue } from "../../context/stateProvider";

const MainContainer = () => {
	const [{ foodItems }, dispatch] = useStateValue();

	return (
		<div className="flex h-auto flex-col items-center w-full justify-center">
			<HomeContainer />

			<section className="w-full my-6 ">
				<div className="w-full flex items-center justify-between ">
					<p className="text-2xl font-semibold capitalize relative text-headingColor before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
						Our Fresh And Healthy Foods
					</p>

					<div className="gap-3 items-center hidden md:flex">
						<motion.div
							whileTap={{ scale: 0.75 }}
							className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg items-center justify-center flex">
							<MdChevronLeft className="text-lg text-white" />
						</motion.div>
						<motion.div
							whileTap={{ scale: 0.75 }}
							className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg items-center justify-center flex">
							<MdChevronRight className="text-lg text-white" />
						</motion.div>
					</div>
				</div>

				<RowContainer
					flag={true}
					data={foodItems?.filter((n) => n.category === "rice")}
				/>
			</section>
		</div>
	);
};

export default MainContainer;
