import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import ProtectStack from "./ProtectedStackNavigtion/ProtectStack";
import AuthStack from "./AuthSackNavigation/AuthStack";
import { UserContext, useUserContext } from "../hooks/user.context";

const AppNavigation = () => {
	const user = useContext(useUserContext);
	return (
		<NavigationContainer>
			{/* <UserContext>{user?.user ? <ProtectStack /> : <AuthStack />}</UserContext> */}
			<ProtectStack />
		</NavigationContainer>
	);
};

export default AppNavigation;
