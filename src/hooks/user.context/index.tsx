import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { app } from "../../config/FirebaseConfig";
import { initializeAuth } from "firebase/auth";
import { provider } from "../../config/FirebaseConfig";
import client from "../../Utils/KindConfig";

interface UserContextProps {
	user: any;
	getUser: () => Promise<void>;
	registerUser: () => Promise<void>;
	loginUser: (
		setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>
	) => Promise<void>;
	handleLogout: () => Promise<void>;
}

export const useUserContext = React.createContext<UserContextProps | undefined>(
	undefined
);

export const UserContext: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = React.useState<any>({});
	console.log("User from hook...", user);

	app.automaticDataCollectionEnabled;

	const getUser = async () => {
		const User: any = AsyncStorage.getItem("user");
		User && setUser(JSON.parse(User));
		try {
		} catch (error) {}
	};

	const registerUser = async () => {
		try {
			const auth = getAuth();
			signInWithPopup(auth, provider)
				.then((result) => {
					// This gives you a Google Access Token. You can use it to access the Google API.
					const credential = GoogleAuthProvider.credentialFromResult(result);
					console.log(credential);
					const token = credential?.accessToken;
					// The signed-in user info.
					const user = result.user;
					console.log(user && user);
					setUser(user);
					AsyncStorage.setItem("user", JSON.stringify(user));
					// IdP data available using getAdditionalUserInfo(result)
					// ...
				})
				.catch((error) => {
					// Handle Errors here.
					const errorCode = error.code;
					const errorMessage = error.message;
					// The email of the user's account used.
					const email = error.customData.email;
					// The AuthCredential type that was used.
					const credential = GoogleAuthProvider.credentialFromError(error);
					// ...
				});
		} catch (error) {}
	};

	const loginUser = async () => {
		try {
			const isLogedIn = await client.login();
			if (isLogedIn) {
				AsyncStorage.setItem("user", JSON.stringify(isLogedIn));
			}
		} catch (error) {}
	};

	const handleLogout = async () => {
		try {
			await AsyncStorage.removeItem("user");
			// setUser()
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};

	useEffect(() => {
		getUser();
	}, []);
	return (
		<useUserContext.Provider
			value={{
				user,
				getUser,
				registerUser,
				loginUser,
				handleLogout,
			}}
		>
			{children}
		</useUserContext.Provider>
	);
};
