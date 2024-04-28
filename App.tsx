import AuthStack from "./src/navigation/AuthSackNavigation/AuthStack";
import ProtectStack from "./src/navigation/ProtectedStackNavigtion/ProtectStack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { storeData, getData } from "./src/Utils/Service";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState("");

  const checkUserAuthentication = async () => {
    const result = await getData("login");

    console.log(result);
    result && setIsAuthenticated(result);
  };

  useEffect(() => {
    checkUserAuthentication();
    // getCategoryList();
  }, [isAuthenticated]);

  console.log("Authenticating ", isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated === "true" ? <ProtectStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
