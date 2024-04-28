import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import PieChart from "react-native-pie-chart";
import Colors from "../../Utils/Colors";
import { Octicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getData } from "../../Utils/Service";

interface Props {
  categoryList: any[];
}
const CircularChart: React.FC<Props> = ({ categoryList }) => {
  const widthAndHeight = 150;
  const [estimatedBudget, setEstimatedBudget] = useState(0);
  const [totalMoneySpent, setTotalMoneySpent] = useState(0);
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState([Colors.GRAY]);

  useEffect(() => {
    // GetData();
    categoryList && updateCircularChart();
    // console.log("category List: ", categoryList);
  }, [categoryList]);

  // const GetData = async () => {
  //   const data = await getData("categoryList");
  //   setCategoryList(JSON.parse(data));
  // };

  const updateCircularChart = () => {
    // setSliceColor([]);
    // setValues([]);
    let moneySpent = 0;
    categoryList?.forEach((item, index) => {
      item?.categoryItems.forEach((item_) => {
        console.log(item_.cost);
        moneySpent += item_.cost;
      });

      setTotalMoneySpent(moneySpent);
      setSliceColor((sliceColor) => [...sliceColor, Colors.COLOR_LIST[index]]);
      setValues((values) => [...values, Math.floor(moneySpent)]);
    });

    let totalBuget = 0;
    categoryList?.forEach((item) => {
      totalBuget += item?.assign_budget;
    });
    console.log("total budget: ", totalBuget);
    setEstimatedBudget(totalBuget);
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 20, fontFamily: "outfit" }}>
          Estimated Budget:
          <Text style={{ fontWeight: "bold" }}>₵ {estimatedBudget}</Text>
        </Text>
        <Text>total debursement: ₵{totalMoneySpent}</Text>
      </View>
      <View style={styles.subContainer}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={values}
            sliceColor={sliceColor}
            coverRadius={0.01}
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
