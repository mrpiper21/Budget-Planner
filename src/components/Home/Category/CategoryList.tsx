import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Colors from "../../../Utils/Colors";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface CatProps {
  CategoryItem: any[];
}

const CategoryList: React.FC<CatProps> = ({ CategoryItem }) => {
  const navigation = useNavigation() as any;

  const handleCategoryClick = (category: any) => {
    navigation.navigate("Category-detail", { categoryId: category.id });
  };

  const calculateTotalCost = (categoryItems: any) => {
    let totalCost = 0;
    categoryItems?.forEach((items) => {
      totalCost += items.cost;
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
            <View style={styles.subContainer}>
              <View>
                <Text style={styles.categoryText}>{category.name}</Text>
                <Text style={styles.itemsCount}>
                  {category?.categoryItems.length > 1
                    ? category?.categoryItems.length
                    : 0}
                  items
                </Text>
              </View>
              <View>
                <Text style={styles.total}>${category?.assign_budget}</Text>
                <Text>
                  spent: ${calculateTotalCost(category?.categoryItems)}
                </Text>
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
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    padding: wp(3),
    borderRadius: 15,
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
