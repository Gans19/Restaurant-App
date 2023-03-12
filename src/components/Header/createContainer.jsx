/** @format */

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
	MdFastfood,
	MdCloudUpload,
	MdDelete,
	MdFoodBank,
	MdAttachMoney,
} from "react-icons/md";
import { categories } from "../../utils/data";
import Loader from "../Loader";
import { storage } from "../../firebase.config";
import {
	getDownloadURL,
	uploadBytesResumable,
	ref,
	deleteObject,
} from "firebase/storage";
import { saveItem } from "../../utils/firebaseFunction";
import { useStateValue } from "../../context/stateProvider";
import { getAllFoodItem } from "../../utils/firebaseFunction";
import { actionType } from "../../context/reducer";

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
	const [{ foodItems }, dispatch] = useStateValue();

	const uploadImg = (e) => {
		setIsLoading(true);
		const imageFile = e.target.files[0];
		const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
		const uploadTask = uploadBytesResumable(storageRef, imageFile);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const uploadProgress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			},
			(error) => {
				console.log(error);
				setFields(true);
				setMsg("Error while uploading : Try AGain 🙇");
				setAlertStatus("danger");
				setTimeout(() => {
					setFields(false);
					setIsLoading(false);
				}, 4000);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setImageAsset(downloadURL);
					setIsLoading(false);
					setFields(true);
					setMsg("Image uploaded successfully 😊");
					setAlertStatus("success");
					setTimeout(() => {
						setFields(false);
					}, 4000);
				});
			}
		);
	};

	const deleteImage = () => {
		setIsLoading(true);
		const deleteRef = ref(storage, imageAsset);
		deleteObject(deleteRef).then(() => {
			setImageAsset(null);
			setIsLoading(false);
			setFields(true);
			setMsg("Image deleted successfully 😊");
			setAlertStatus("success");
			setTimeout(() => {
				setFields(false);
			}, 4000);
		});
	};

	const deleteImg = () => {
		setIsLoading(true);
		const deleteRef = ref(storage, imageAsset);
		deleteObject(deleteRef).then(() => {
			setImageAsset(null);
			setIsLoading(false);
			setFields(true);
			setMsg("Image deleted successfully");
			setAlertStatus("success");
			setTimeout(() => {
				setFields(false);
			}, 4000);
		});
	};

	const saveDetails = () => {
		setIsLoading(true);
		try {
			if (!title || !calories || !imageAsset || !price || !category) {
				setFields(true);
				setMsg("Required Fields Not An Empty : Try AGain 🙇");
				setAlertStatus("danger");
				setTimeout(() => {
					setFields(false);
					setIsLoading(false);
				}, 4000);
			} else {
				const data = {
					id: `${Date.now()}`,
					title: title,
					category: category,
					imageUrl: imageAsset,
					price: price,
					calories: calories,
					qty: 1,
				};
				saveItem(data);

				setIsLoading(false);
				setFields(true);
				setMsg("Data Uploaded successfully");
				setAlertStatus("success");
				setTimeout(() => {
					setFields(false);
				}, 4000);
				clearData();
			}
		} catch (error) {
			console.log(error);
			setFields(true);
			setMsg("Error while uploading : Try AGain 🙇");
			setAlertStatus("danger");

			setTimeout(() => {
				setFields(false);
				setIsLoading(false);
			}, 4000);
		}

		fetchData();
	};

	const clearData = () => {
		setTitle("");
		setImageAsset(null);
		setPrice("");
		setCategory("Select Category");
		setCalories("");
	};

	const fetchData = async () => {
		await getAllFoodItem().then((data) => {
			dispatch({
				type: actionType.SET_FOOD_ITEM,
				foodItems: data,
			});
		});
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
							value={calories}
							onChange={(e) => setCalories(e.target.value)}
							placeholder="Calories"
							className="w-full h-full bg-transparent text-lg outline-none border-none placeholder:text-gray-400 text-textColor"
						/>
					</div>

					<div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
						<MdAttachMoney className="text-gray-700 text-2xl" />
						<input
							type="text"
							required
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							placeholder="Price"
							className="w-full h-full bg-transparent text-lg outline-none border-none placeholder:text-gray-400 text-textColor"
						/>
					</div>
				</div>

				<div className="flex items-center w-full">
					<button
						type="button"
						className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none rounded-lg bg-emerald-500 px-12 py-2 text-white text-lg font-semibold"
						onClick={saveDetails}>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreateContainer;
