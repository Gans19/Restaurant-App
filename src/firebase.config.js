/** @format */
import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyA9vE-afsyIOs7Hr6q5o5qN_xyQGD-PpqI",
	authDomain: "restaurantapp-40881.firebaseapp.com",
	databaseURL: "https://restaurantapp-40881-default-rtdb.firebaseio.com",
	projectId: "restaurantapp-40881",
	storageBucket: "restaurantapp-40881.appspot.com",
	messagingSenderId: "1052095572191",
	appId: "1:1052095572191:web:914268c6c9384df2d3e16a",
	measurementId: "G-6475QYNZFC",
};

const app = getApps.Length > 0 ? getApps() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
