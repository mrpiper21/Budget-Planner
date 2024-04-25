import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import client from "../../Utils/KindConfig";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../Utils/Colors";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  const [user, setUser] = useState() as any;

  useEffect(() => {
    setUser(getUserData);
    console.log("prod", user);
  }, []);
  const getUserData = async () => {
    const User = await client.getUserDetails;
    return new Promise((resolve) => {
      console.log(User);
      setUser(User).then(() => {
        resolve(User);
      });
    });
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 8,
      }}
    >
      <Image
        style={{
          width: wp(15),
          height: wp(15),
          backgroundColor: "tomato",
          borderRadius: 99,
        }}
        source={{ uri: user?.picture }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "75%",
        }}
      >
        <View>
          <Text
            style={{ color: Colors.WHITE, fontSize: 16, fontFamily: "outfit" }}
          >
            Welcome
          </Text>
          <Text
            style={{ color: Colors.WHITE, fontSize: 20, fontWeight: "500" }}
          >
            {user?.given_name}
          </Text>
        </View>
        <Ionicons name="notifications" size={24} color="white" />
      </View>
    </View>
  );
};

export default Header;
