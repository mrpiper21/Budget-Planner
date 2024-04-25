import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../Screens/Home/HomeScreen";
import HomeTabs from "../(tabs)/HomeTabs";
import AddnewCategory from "../../Screens/Home/AddnewCategory";
import CategoryDetail from "../../Screens/Home/CategoryDetail";
import AddNewCategoryItem from "../../Screens/Home/AddNewCategoryItem";

const Stack = createNativeStackNavigator();

const ProtectStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeTabs}
      />
      <Stack.Screen
        options={{ headerShown: true, title: "Add New Category" }}
        name="Add-New-Category"
        component={AddnewCategory}
      />
      <Stack.Screen
        // initialParams={{ categoryId: 0 }}
        options={{ headerShown: false }}
        name="Category-detail"
        component={CategoryDetail}
      />
      <Stack.Screen
        options={{ headerShown: true, title: "Add new item" }}
        name="Add-new-cat-item"
        component={AddNewCategoryItem}
      />
    </Stack.Navigator>
  );
};

export default ProtectStack;
