import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AuthStack from "./src/navigation/AuthSackNavigation/AuthStack";
import ProtectStack from "./src/navigation/ProtectedStackNavigtion/ProtectStack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Service from "./src/Utils/Service";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState("");

  const checkUserAuthentication = async () => {
    const result = await Service.getData("login");

    console.log(result);
    result && setIsAuthenticated(result);
  };

  useEffect(() => {
    checkUserAuthentication();
  }, [isAuthenticated]);

  console.log("Authenticating ", isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated === "true" ? <ProtectStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
