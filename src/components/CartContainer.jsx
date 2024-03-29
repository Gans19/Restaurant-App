/** @format */

import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";

import { useStateValue } from "../context/stateProvider";
import { actionType } from "../../src/context/reducer";
import EmptyCart from "../img/emptyCart.svg";
import CartItem from "./CartItem";

const CartContainer = () => {
	const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
	const [flag, setFlag] = useState(1);
	const [tot, setTot] = useState(0);

	const showCart = () => {
		dispatch({
			type: actionType.SET_CART_SHOW,
			cartShow: !cartShow,
		});
	};

	useEffect(() => {
		let totalPrice = cartItems.reduce(function (accumulator, item) {
			return accumulator + item.qty * item.price;
		}, 0);
		setTot(totalPrice);
		console.log(tot);
	}, [tot, flag]);

	const clearCart = () => {
		dispatch({
			type: actionType.SET_CARTITEMS,
			cartItems: [],
		});

		localStorage.setItem("cartItems", JSON.stringify([]));
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: 200 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 200 }}
			className="w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col
    fixed top-0 right-0 z-[101]">
			<div className="w-full items-center justify-between flex p-4">
				<motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
					<MdOutlineKeyboardBackspace className="text-textColor text-3xl cursor-pointer" />
				</motion.div>
				<p className="text-textColor text-lg font-semibold">Cart</p>

				<motion.p
					onClick={clearCart}
					whileTap={{ scale: 0.75 }}
					className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md 
                     cursor-pointer text-textColor text-base">
					Clear
					<RiRefreshFill className="text-red-500 font-semibold" />
				</motion.p>
			</div>

			{/* bottom Section */}
			{cartItems && cartItems.length > 0 ? (
				<div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
					<div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none scrollbar">
						{/* Cart Item secction*/}
						{cartItems &&
							cartItems.map((item) => (
								<CartItem
									key={item.id}
									item={item}
									setFlag={setFlag}
									flag={flag}
								/>
							))}
					</div>

					{/* Cart Item Total secction*/}

					<div className="w-full flex-1 items-center justify-evenly py-12 px-8 flex-col  bg-cartTotal rounded-t-[2rem]">
						<div className="w-full flex items-center justify-between">
							<p className="text-gray-400 text-lg">Sub Total</p>
							<p className="text-gray-400 text-lg">₹ {tot}</p>
						</div>
						<div className="w-full flex items-center justify-between">
							<p className="text-gray-400 text-lg">Delivery</p>
							<p className="text-gray-400 text-lg">₹ 40</p>
						</div>

						<div className="w-full border-b border-gray-600 my-2">
							<div className="w-full justify-center flex items-center">
								<p className="text-gray-200 text-xl font-semibold">Total</p>
								<p className="text-gray-200 text-xl font-semibold">
									₹ {tot + 40}
								</p>
							</div>

							{user ? (
								<motion.button
									whileTap={{ scale: 0.8 }}
									type="button"
									className="w-full p-2 rounded-full bg-orange-500 text-gray-50 text-lg 
				  my-2 hover:shadow-lg">
									Check Out
								</motion.button>
							) : (
								<motion.button
									whileTap={{ scale: 0.8 }}
									type="button"
									className="w-full p-2 rounded-full bg-orange-500 text-gray-50 text-lg 
				  my-2 hover:shadow-lg">
									Login To Check Out
								</motion.button>
							)}
						</div>
					</div>
				</div>
			) : (
				<div className="w-full flex flex-col items-center justify-center gap-6">
					<img src={EmptyCart} alt="" />
					<p className="text-xl text-textColor font-semibold">
						Add Some Items To Cart
					</p>
				</div>
			)}
		</motion.div>
	);
};

export default CartContainer;
