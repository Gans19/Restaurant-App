/** @format */

import React, { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/stateProvider";

const MenuContainer = () => {
	const [filter, setFilter] = useState("chicken");
	useEffect(() => {}, [filter]);

	const [{ foodItems }, dispatch] = useStateValue();

	return (
		<section className="w-full my-6 " id="menu">
			<div className=" w-full flex flex-col items-center justify-center">
				<p className="mr-auto text-2xl font-semibold capitalize relative text-headingColor before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 ">
					Our Fresh And Healthy Foods
				</p>

				<div className="my-6 w-full flex items-center justify-start lg:justify-center gap-8 overflow-x-scroll scrollbar-none">
					{categories &&
						categories.map((category) => (
							<motion.div
								whileTap={{ scale: 0.75 }}
								onClick={() => setFilter(category.urlParamName)}
								key={category.id}
								className={`group ${
									filter === category.urlParamName ? "bg-cartNumBg" : "bg-card"
								} hover:bg-red-600 w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center duration-150 transition-all ease-in-out`}>
								<div
									className={`w-10 h-10 rounded-full shadow-lg ${
										filter === category.urlParamName
											? "bg-white"
											: "bg-cartNumBg"
									} group-hover:bg-card flex items-center justify-center`}>
									<IoFastFood
										className={` ${
											filter === category.urlParamName
												? "text-textColor"
												: "text-card"
										} group-hover:text-textColor text-lg`}
									/>
								</div>
								<p
									className={`text-sm ${
										filter === category.urlParamName
											? "text-white"
											: "text-textColor"
									}  group-hover:text-white`}>
									{category.name}
								</p>
							</motion.div>
						))}
				</div>

				<div className="w-full">
					<RowContainer
						flag={false}
						data={foodItems?.filter((n) => n.category === filter)}
					/>
				</div>
			</div>
		</section>
	);
};

export default MenuContainer;
