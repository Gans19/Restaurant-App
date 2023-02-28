/** @format */

import React from "react";
import Logo from "../../img/logo.png";
import Avatar from "../../img/avatar.png";
import { MdShoppingCart, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebase.config";
import { useStateValue } from "../../context/stateProvider";
import { actionType } from "../../context/reducer";

const Header = () => {
	const firebaseAuth = getAuth(app);
	const provider = new GoogleAuthProvider();
	const [{ user }, dispatch] = useStateValue();

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
		}
	};

	return (
		<header className="w-screen z-50 fixed  p-6 px-16">
			{/* desktop and tablets */}
			<div className="hidden md:flex w-full p-4 justify-between items-center">
				<Link to={"/"} className="flex items-center gap-2">
					<img src={Logo} className="object-cover w-8" alt="" srcset="" />
					<p className="text-headingColor text-xl font-bold">Yin and Yummy</p>
				</Link>

				<div className="flex items-center gap-8">
					<ul className="flex gap-8 items-center ml-auto">
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
					</ul>

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
						<div className="w-40 bg-grey-50  shadow-xl rounded-lg absolute top-12 right-0 flex flex-col">
							<p className="px-5 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100  ease-in-out text-textColor text-base">
								New Item
								<MdAdd />{" "}
							</p>
							<p className="px-5 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100  ease-in-out text-textColor text-base">
								Logout
								<MdLogout />
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* for mobile */}
			<div className="flex md:hidden w-full  h-full"></div>
		</header>
	);
};

export default Header;
