/** @format */

import { fetchUser } from "../utils/fetchLocalStorageData";

const userinfo = fetchUser();

export const initialState = {
	user: userinfo,
	foodItems: null,
};
