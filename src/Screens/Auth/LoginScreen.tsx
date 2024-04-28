import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../Utils/Colors";
import client from "../../Utils/KindConfig";
import { storeData } from "../../Utils/Service";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation() as any;
  const handleSignIn = async () => {
    const token = await client.login();
    if (token) {
      // User was authenticated
      await storeData("login", "true");
    }
  };

  // useEffect(() => {
  //   const r = Service.getData("login");
  //   r.then((data) => data).catch((err) => console.log());
  // }, []);
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={require("../../../assets/dashhh.jpg")}
        style={styles.logo}
      />

      <View
        style={{
          backgroundColor: Colors.PRIMARY,
          width: wp(100),
          height: hp(100),
          padding: 20,
          marginTop: -30,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
        }}
      >
        <Text
          style={{
            fontSize: 35,
            fontWeight: "bold",
            textAlign: "center",
            color: Colors.WHITE,
          }}
        >
          personal buget planner
        </Text>
        <Text
          style={{
            fontSize: 19,
            textAlign: "center",
            color: Colors.WHITE,
            marginTop: 20,
          }}
        >
          Sta on Track, Event: Your personal Budget Planner
        </Text>

        <TouchableOpacity style={styles.btn} onPress={handleSignIn}>
          <Text style={{ textAlign: "center" }}>Login/Signup</Text>
        </TouchableOpacity>
        <Text
          style={{ fontSize: wp(4), color: Colors.WHITE, marginTop: wp(5) }}
        >
          * By login/Signup you agree to our terms and conditions
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  logo: {
    height: hp(40),
    width: wp(50),
    marginTop: 30,
    borderWidth: 5,
    borderRadius: 20,
    borderColor: Colors.Black,
  },
  btn: {
    backgroundColor: Colors.WHITE,
    padding: 15,
    borderRadius: 99,
    paddingHorizontal: 5,
    marginTop: 30,
  },
});
