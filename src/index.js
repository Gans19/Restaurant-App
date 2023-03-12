/** @format */

import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

import App from "./App";
import { StateProvider } from "./context/stateProvider";
import { initialState } from "./context/initialState";
import reducer from "./context/reducer";
import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
	<Router>
		<StateProvider initialState={initialState} reducer={reducer}>
			<App />
		</StateProvider>
	</Router>
);
