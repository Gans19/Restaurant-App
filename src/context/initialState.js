/** @format */

import { fetchCart, fetchUser } from "../utils/fetchLocalStorageData";

const userinfo = fetchUser();
const cartinfo = fetchCart();

export const initialState = {
	user: userinfo,
	foodItems: null,
	cartShow: false,
	cartItems: cartinfo,
};
