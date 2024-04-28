import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import client from "../../Utils/KindConfig";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../Utils/Colors";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  user: {
    email: string;
    family_name: string;
    given_name: string;
    id: string;
    picture: string;
  };
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <View
      key={user?.id}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Image
        style={{
          width: wp(15),
          height: wp(15),
          // backgroundColor: "tomato",
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
            {user?.family_name}
          </Text>
        </View>
        <Ionicons name="notifications" size={24} color="white" />
      </View>
    </View>
  );
};

export default Header;
