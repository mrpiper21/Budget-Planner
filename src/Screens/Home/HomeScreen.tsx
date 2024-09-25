import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useEffect, useState } from "react";
import client from "../../Utils/KindConfig";
import Service, { getData, storeData } from "../../Utils/Service";
import { supabase } from "../../Utils/SuperbaseConfig";
import Header from "../../components/Home/Header";
import Colors from "../../Utils/Colors";
import CircularChart from "../../components/Home/CircularChart";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CategoryList from "../../components/Home/Category/CategoryList";
import { ScrollView } from "react-native";

export interface catDataProps {
  id: string;
  name: string;
  icon: string;
  categoryItems: any[];
  assign_budget: number;
  created_at: string;
  created_by: string;
}

const HomeScreen = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    family_name: "",
    given_name: "",
    id: "",
    picture: "",
  });
  const [loading, setloading] = useState(false);
  const [categoryList, setcategoryList] = useState([]);
  const navigation = useNavigation() as any;
  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    const user = await client.getUserDetails();
    setUserDetails(user);
    let { data, error } = await supabase
      .from("category")
      .select("*,categoryItems(*)")
      .eq("created_by", user.email);
    data && setloading(false);
    // console.log("data", data);
    try {
      const parsedData = JSON.parse(JSON.stringify(data));
      storeData("categoryList", JSON.stringify(parsedData));
      const Data: any = await getData("categoryList");
      setcategoryList(JSON.parse(Data));
    } catch (error) {
      console.error("Error parsing JSON data:", error);
    }
    // setcategoryList(data);
  };
  const handleLogout = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
      // User was logged out
      await Service.storeData("login", "false");
    }
  };

  return (
    <View
      style={{
        marginTop: 20,
        flex: 1,
      }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => getCategoryList()}
            refreshing={loading}
          />
        }
      >
        <View
          style={{
            padding: 20,
            backgroundColor: Colors.PRIMARY,
            height: hp(20),
          }}
        >
          <TouchableOpacity onPress={handleLogout}>
            <Header user={userDetails} />
          </TouchableOpacity>
        </View>

        <View style={{ padding: 20, marginTop: -75 }}>
          <CircularChart categoryList={categoryList} />
          <CategoryList CategoryItem={categoryList} />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate("Add-New-Category")}
        style={styles.btnContainer}
      >
        <Ionicons name="add-circle" size={wp(15)} color={Colors.PRIMARY} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  btnContainer: { position: "absolute", bottom: 16, right: 16 },
});
