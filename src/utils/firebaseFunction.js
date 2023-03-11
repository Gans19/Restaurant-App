/** @format */

import { setDoc } from "firebase/firestore";
import { firestore } from "../firebase.config";
import { doc } from "firebase/firestore";

export const saveItem = async (data) => {
	await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
		merge: true,
	});
};