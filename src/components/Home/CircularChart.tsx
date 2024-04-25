import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import PieChart from "react-native-pie-chart";
import Colors from "../../Utils/Colors";
import { Octicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface Props {
  categoryList: any[];
}
const CircularChart: React.FC<Props> = ({ categoryList }) => {
  const widthAndHeight = 150;
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState([Colors.GRAY]);

  useEffect(() => {
    categoryList && updateCircularChart();
  }, []);

  const updateCircularChart = () => {
    // setSliceColor([]);
    // setValues([]);
    categoryList?.forEach((item, index) => {
      let itemTotalCost = 0;
      item?.categoryItems.forEach((item_) => {
        itemTotalCost += item_.cost;
      });

      setSliceColor((sliceColor) => [...sliceColor, Colors.COLOR_LIST[index]]);
      setValues((values) => [...values, itemTotalCost]);
    });
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontFamily: "outfit" }}>
        Total Estimate: <Text style={{ fontWeight: "bold" }}>0$</Text>
      </Text>
      <View style={styles.subContainer}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={values}
            sliceColor={sliceColor}
            coverRadius={0.65}
            coverFill={"#FFF"}
          />
        </View>
        {categoryList?.length === 0 ? (
          <View style={styles.charNameContainer}>
            <Octicons name="dot-fill" size={hp(5)} color={Colors.GRAY} />
            <Text>NA</Text>
          </View>
        ) : (
          <View style={styles.categoryContainer}>
            {categoryList?.map((category, index) => (
              <View style={styles.charNameContainer} key={index}>
                <Octicons
                  name="dot-fill"
                  size={hp(5)}
                  color={Colors.COLOR_LIST[index]}
                />
                <Text>{category?.name}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default CircularChart;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: "auto",
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 15,
    elevation: 1,
  },
  subContainer: {
    marginTop: 10,
    display: "flex",
    gap: 40,
  },
  charNameContainer: {
    flexDirection: "row",
    gap: 1,
    alignItems: "center",
    height: hp(5),
  },
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
    width: wp(80),
    flexWrap: "wrap",
    gap: wp(1),
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
