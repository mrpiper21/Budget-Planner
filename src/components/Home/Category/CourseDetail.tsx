import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ColorPicker from "../ColorPicker";
import Colors from "../../../Utils/Colors";
import { TouchableOpacity } from "react-native";
import { supabase } from "../../../Utils/SuperbaseConfig";
import { useNavigation } from "@react-navigation/native";

interface Props {
  categoryData: any;
}

const CourseInfo: React.FC<Props> = ({ categoryData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [percentageTotal, setPercentageTotal] = useState(0);
  const navigation = useNavigation() as any;

  const calculateTotalprice = () => {
    let total = 0;

    if (categoryData) {
      setIsLoading(true);
    } else setIsLoading(false);

    categoryData?.categoryItems.forEach((item) => {
      total += item.cost;
    });
    console.log("total cost: ", total);
    setTotalCost(total);
    let perc = (totalCost / categoryData?.assign_budget) * 100;

    if (perc > 100) {
      perc = 100;
    }

    setPercentageTotal(Math.floor(perc));
    console.log("percentage", perc);
  };
  useEffect(() => {
    categoryData && calculateTotalprice();
  }, [categoryData]);

  const handleDelete = () => {
    Alert.alert("Confirm delete", "Are you sure you want to delete?", [
      {
        text: "Cancel",
        onPress: () => Alert.alert("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          const { error } = await supabase
            .from("categoryItems")
            .delete()
            .eq("category_id", categoryData.id);

          const { error: categoryError } = await supabase
            .from("category")
            .delete()
            .eq("id", categoryData.id);
          navigation.navigate("Home");
        },
      },
    ]);
  };
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Text
            style={{ ...styles.textIcon, backgroundColor: categoryData?.color }}
          >
            {categoryData?.icon}
          </Text>
          <View>
            <Text style={styles.categoryName}>{categoryData?.name}</Text>
            <Text style={styles.categoryText}>
              {categoryData?.length} items
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleDelete}>
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={wp(8)}
            color="red"
          />
        </TouchableOpacity>
      </View>
      {/**Prgress bar */}
      <View style={styles.amountContainer}>
        <Text>${totalCost}</Text>
        <Text style={{ fontWeight: "bold" }}>
          Total Budget: {categoryData?.assign_budget}
        </Text>
      </View>
      <View style={styles.progressBarMainContainer}>
        <View
          style={{
            ...styles.progressBarSubContainer,
            width: `${percentageTotal}%`,
          }}
        ></View>
      </View>
    </View>
  );
};

export default CourseInfo;

const styles = StyleSheet.create({
  container: {
    marginTop: wp(5),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textIcon: {
    fontSize: wp(4),
    padding: wp(5),
    borderRadius: wp(5),
    marginRight: wp(4),
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  categoryName: {
    fontWeight: "bold",
    fontSize: wp(4),
  },
  categoryText: {
    fontFamily: "sans-serif",
  },
  amountContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: wp(3),
  },
  progressBarMainContainer: {
    width: "100%",
    height: hp(2),
    backgroundColor: Colors.GRAY,
    borderRadius: wp(10),
  },
  progressBarSubContainer: {
    width: "20%",
    backgroundColor: Colors.PRIMARY,
    borderRadius: wp(10),
    height: hp(2),
  },
});
