/** @format */

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
	MdFastfood,
	MdCloudUpload,
	MdDelete,
	MdFoodBank,
} from "react-icons/md";
import { categories } from "../../utils/data";
import Loader from "../Loader";

const CreateContainer = () => {
	const [title, setTitle] = useState("");
	const [calories, setCalories] = useState("");
	const [price, setPrice] = useState("");
	const [category, setCategory] = useState(null);
	const [imageAsset, setImageAsset] = useState(null);
	const [fields, setFields] = useState(false);
	const [alertStatus, setAlertStatus] = useState("danger");
	const [msg, setMsg] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const uploadImg = () => {};

	const deleteImg = () => {
		return;
	};

	return (
		<div className="w-full min-h-screen flex items-center justify-center ">
			<div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
				{fields && (
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className={`w-full p-2 rounded-lg text-center text-base font-semibold ${
							alertStatus === "danger"
								? "bg-red-400 text-red-800"
								: "bg-emerald-400 text-emerald-800"
						}`}>
						{msg}
					</motion.p>
				)}

				<div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
					<MdFastfood className="text-xl text-gray-700" />
					<input
						type="text"
						required
						value={title}
						placeholder="Give me title..."
						className="w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400 text-textColor"
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>

				<div className="w-full ">
					<select
						onChange={(e) => setCategory(e.target.value)}
						className="outline-none w-full p-2 border-b-2 border-gray-300 rounded-md cursor-pointer text-base ">
						<option value="other" className="bg-white cursor-pointer">
							Select Category
						</option>
						{categories &&
							categories.map((item) => (
								<option
									value={item.urlParamName}
									key={item.id}
									className="text-base border-0 outline-none capitalize bg-white text-textColor cursor-pointer">
									{item.name}
								</option>
							))}
					</select>
				</div>

				<div className="group flex justify-center flex-col items-center border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
					{isLoading ? (
						<Loader />
					) : (
						<>
							{!imageAsset ? (
								<>
									<label className="w-full flex flex-col items-center justify-center cursor-pointer">
										<div className="w-full flex flex-col items-center justify-center gap-2 ">
											<MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
											<p className="text-gray-500 text-3xl hover:text-gray-700">
												Click To Upload Here
											</p>
										</div>
										<input
											type="file"
											name="uploadimg"
											accept="image/*"
											className="w-0 h-0"
											onChange={uploadImg}
										/>
									</label>
								</>
							) : (
								<>
									<div className="relative h-full ">
										<img
											src={imageAsset}
											alt="upladed Img"
											className="w-full h-full object-cover"
										/>
										<button
											type="button"
											onClick={deleteImg}
											className="absolute bottom-3 right-3 p-3 bg-red-500 text-xl cursor-pointer outline-none duration-500 hover:shadow-md transition-all ease-in-out rounded-full">
											<MdDelete className="text-gray-600" />
										</button>
									</div>
								</>
							)}
						</>
					)}
				</div>

				<div className="w-full   flex flex-col md:flex-row items-center gap-3">
					<div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
						<MdFoodBank className="text-gray-700 text-2xl" />
						<input
							type="text"
							required
							placeholder="Calories"
							className="w-full h-full bg-transparent text-lg outline-none border-none placeholder:text-gray-400 text-textColor"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateContainer;
