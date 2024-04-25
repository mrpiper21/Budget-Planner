import { View, Text } from "react-native";
import React from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../Screens/Home/HomeScreen";
import HistoryScreen from "../../Screens/History/HistoryScreen";
import ProfileScreen from "../../Screens/Profile/ProfileScreen";
import Colors from "../../Utils/Colors";
import { useFonts } from "expo-font";

const Tabs = createBottomTabNavigator();

const HomeTabs = () => {
  const [fontsLoaded, fontError] = useFonts({
    outfit: require("../../../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("../../../assets/fonts/Outfit-Medium.ttf"),
    "outfit-Semibold": require("../../../assets/fonts/Outfit-SemiBold.ttf"),
  });
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
      }}
    >
      <Tabs.Screen
        name={"Home"}
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
          tabBarLabel: "",
        }}
      />
      <Tabs.Screen
        name={"History"}
        component={HistoryScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="history" size={24} color={color} />
          ),
          tabBarLabel: "",
        }}
      />
      <Tabs.Screen
        name={"Profile"}
        component={ProfileScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-circle" size={24} color={color} />
          ),
          tabBarLabel: "",
        }}
      />
    </Tabs.Navigator>
  );
};

export default HomeTabs;
