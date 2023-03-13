/** @format */

import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
	CreateContainer,
	Header,
	MainContainer,
} from "./components/Header/index";
import { useStateValue } from "../src/context/stateProvider";

import { actionType } from "./context/reducer";
import { getAllFoodItem } from "./utils/firebaseFunction";

const App = () => {
	const [{ foodItems }, dispatch] = useStateValue();

	const fetchData = async () => {
		await getAllFoodItem().then((data) => {
			dispatch({
				type: actionType.SET_FOOD_ITEM,
				foodItems: data,
			});
		});
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<AnimatePresence mode="wait">
			<div className="w-screen h-auto flex flex-col bg-primary">
				<Header />

				<main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
					<Routes>
						<Route path="/*" element={<MainContainer />} />
						<Route path="/createItem" element={<CreateContainer />} />
					</Routes>
				</main>
			</div>
		</AnimatePresence>
	);
};

export default App;
