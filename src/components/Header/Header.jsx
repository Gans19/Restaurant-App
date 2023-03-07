/** @format */

import React from "react";
import Logo from "../../img/logo.png";
import Avatar from "../../img/avatar.png";

import { MdShoppingCart, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	refreshToken,
} from "firebase/auth";
import { app } from "../../firebase.config";
import { useStateValue } from "../../context/stateProvider";
import { actionType } from "../../context/reducer";
import { useState } from "react";

const Header = () => {
	const firebaseAuth = getAuth(app);
	const provider = new GoogleAuthProvider();
	const [{ user }, dispatch] = useStateValue();

	const [isMenu, setisMenu] = useState(false);

	const login = async () => {
		if (!user) {
			const {
				user: { refreshToken, providerData },
			} = await signInWithPopup(firebaseAuth, provider);

			dispatch({
				type: actionType.SET_USER,
				user: providerData[0],
			});
			localStorage.setItem("user", JSON.stringify(providerData[0]));
		} else {
			setisMenu(!isMenu);
		}
	};

	const Logout = () => {
		setisMenu(false);
		localStorage.clear();

		dispatch({ type: actionType.SET_USER, user: null });
	};

	return (
		<header className="w-screen z-50 fixed p-3 px-4  md:p-6 md:px-16 bg-primary">
			{/* desktop and tablets */}
			<div className="hidden md:flex w-full p-4 justify-between items-center">
				<Link to={"/"} className="flex items-center gap-2">
					<img src={Logo} className="object-cover w-8" alt="" srcset="" />
					<p className="text-headingColor text-xl font-bold">Yummy</p>
				</Link>

				<div className="flex items-center gap-8">
					<motion.ul
						initial={{ opacity: 0, x: 200 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 200 }}
						className="flex gap-8 items-center ml-auto">
						<motion.li
							whileTap={{ scale: 0.6 }}
							className="text-base text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
							Home
						</motion.li>
						<motion.li
							whileTap={{ scale: 0.6 }}
							className="text-base text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
							About Us
						</motion.li>
						<motion.li
							whileTap={{ scale: 0.6 }}
							className="text-base text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
							Menu
						</motion.li>
						<motion.li
							whileTap={{ scale: 0.6 }}
							className="text-base text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
							Service
						</motion.li>
					</motion.ul>

					<div className="relative flex items-center justify-center">
						<MdShoppingCart className="text-textColor text-2xl cursor-pointer" />
						<div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
							<p className="text-xs text-white font-semibold">2</p>
						</div>
					</div>

					<div className="relative">
						<motion.img
							whileTap={{ scale: 0.6 }}
							onClick={login}
							src={user ? user.photoURL : Avatar}
							className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
							alt=""
							srcset=""
						/>
						{isMenu && (
							<motion.div
								initial={{ opacity: 0, scale: 0.6 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.6 }}
								className="w-40 bg-grey-50  shadow-xl rounded-lg absolute top-12 right-0 flex flex-col">
								{user && user.email === "ganscivil.2208@gmail.com" && (
									<Link to={"/createItem"}>
										<p className="px-5 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100  ease-in-out text-textColor text-base">
											New Item
											<MdAdd />
										</p>
									</Link>
								)}
								<p
									className="px-5 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100  ease-in-out text-textColor text-base"
									onClick={Logout}>
									Logout
									<MdLogout />
								</p>
							</motion.div>
						)}
					</div>
				</div>
			</div>

			{/* for mobile */}
			<div className="flex items-center justify-between md:hidden w-full  h-full">
				<div className="relative flex items-center justify-center">
					<MdShoppingCart className="text-textColor text-2xl cursor-pointer" />
					<div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
						<p className="text-xs text-white font-semibold">2</p>
					</div>
				</div>

				<Link to={"/"} className="flex items-center gap-2">
					<img src={Logo} className="object-cover w-8" alt="" srcset="" />
					<p className="text-headingColor text-xl font-bold">Yummy</p>
				</Link>

				<div className="relative bg-white">
					<motion.img
						whileTap={{ scale: 0.6 }}
						onClick={login}
						src={user ? user.photoURL : Avatar}
						className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
						alt=""
						srcset=""
					/>
					{isMenu && (
						<motion.div
							initial={{ opacity: 0, scale: 0.6 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.6 }}
							className="w-40 bg-grey-50  shadow-xl rounded-lg  absolute top-12 right-0 flex flex-col">
							{user && user.email === "ganscivil.2208@gmail.com" && (
								<Link to={"/createItem"}>
									<p
										className=" bg-white  px-5 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100  ease-in-out text-textColor text-base"
										onClick={() => setisMenu(false)}>
										New Item
										<MdAdd />
									</p>
								</Link>
							)}

							<ul className="flex flex-col  bg-white  ">
								<li
									whileTap={{ scale: 0.6 }}
									onClick={() => setisMenu(false)}
									className="px-5 py-2 hover:bg-slate-200 text-base text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
									Home
								</li>
								<li
									whileTap={{ scale: 0.6 }}
									onClick={() => setisMenu(false)}
									className="px-5 py-2 hover:bg-slate-200 text-base text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
									About Us
								</li>
								<li
									whileTap={{ scale: 0.6 }}
									onClick={() => setisMenu(false)}
									className="px-5 py-2 hover:bg-slate-200 text-base text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
									Menu
								</li>
								<li
									whileTap={{ scale: 0.6 }}
									onClick={() => setisMenu(false)}
									className="px-5 py-2 hover:bg-slate-200 text-base text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
									Service
								</li>
							</ul>

							<p
								className="px-5 py-2 rounded-md shadow-md m-2 p-2 flex items-center gap-3 cursor-pointer bg-gray-200 hover:bg-gray-300 transition-all duration-100  ease-in-out text-textColor text-base"
								onClick={Logout}>
								Logout
								<MdLogout />
							</p>
						</motion.div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
