// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

export const provider = new GoogleAuthProvider();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAvRa-oE08xZAo2ElT_fYl1s1w7csdUANI",
	authDomain: "budget-planner-334bd.firebaseapp.com",
	projectId: "budget-planner-334bd",
	storageBucket: "budget-planner-334bd.appspot.com",
	messagingSenderId: "328216386690",
	appId: "1:328216386690:web:a98360d88a8a8e146ca89b",
	measurementId: "G-VG77ZBC9YF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const FireBaseAuth = getAuth(app);
const analytics = getAnalytics(app);
