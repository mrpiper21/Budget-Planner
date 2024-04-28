import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Colors from "../../../Utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { Entypo, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface CatProps {
  CategoryItem: any[];
}

const CategoryList: React.FC<CatProps> = ({ CategoryItem }) => {
  const navigation = useNavigation() as any;
  console.log("catItems", CategoryItem);

  const handleCategoryClick = (category: any) => {
    navigation.navigate("Category-detail", { categoryId: category.id });
  };

  const calculateTotalCost = (categoryItems: any) => {
    let totalCost = 0;
    categoryItems?.forEach((items: number) => {
      totalCost += items?.cost;
    });

    return totalCost;
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }}>
        Latest Budget
      </Text>
      <View>
        {CategoryItem?.map((category, index) => (
          <TouchableOpacity
            onPress={() => handleCategoryClick(category)}
            key={index}
            style={styles.container}
          >
            <View>
              <Text style={{ fontSize: wp(2.5), marginBottom: wp(2) }}>
                {moment(category.created_at).format("LL")}
              </Text>
              <View style={styles.iconContainer}>
                <Text
                  style={{
                    ...styles.iconText,
                    backgroundColor: category?.color,
                  }}
                >
                  {category?.icon}
                </Text>
              </View>
            </View>
            <View style={styles.subContainer}>
              <View>
                <Text style={styles.categoryText}>{category.name}</Text>
                <Text style={styles.itemsCount}>
                  {category?.categoryItems.length >= 1
                    ? category?.categoryItems.length
                    : 0}
                  items
                </Text>
              </View>
              <View
                style={{
                  height: hp(12),
                  justifyContent: "space-between",
                  padding: wp(1.5),
                }}
              >
                <View
                  style={{ alignItems: "flex-end", justifyContent: "center" }}
                >
                  <Entypo name="chevron-small-right" size={24} color="black" />
                  <View>
                    <Text style={styles.total}>
                      GH₵ {category?.assign_budget}
                    </Text>
                  </View>
                  <Text>
                    spent: ₵{calculateTotalCost(category?.categoryItems)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: wp(17),
                    justifyContent: "space-between",
                  }}
                >
                  <Ionicons name="time-outline" size={wp(3)} color="teal" />
                  <Text style={{ color: "gray" }}>
                    {moment(category.created_at).format("LT")}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    marginBottom: wp(2),
    display: "flex",
    flexDirection: "row",
    gap: wp(2),
    alignItems: "flex-start",
    backgroundColor: Colors.WHITE,
    padding: wp(3),
    borderRadius: 15,
    height: hp(15),
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "baseline",
  },
  iconText: {
    fontSize: wp(6),
    padding: 16,
    borderRadius: 15,
  },
  itemsCount: {},
  categoryText: {
    fontWeight: "bold",
    fontSize: wp(4),
    marginBottom: wp(1),
  },
  subContainer: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  total: {
    fontWeight: "bold",
    fontSize: wp(4),
  },
});
