import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { supabase } from "../../Utils/SuperbaseConfig";
import { Ionicons } from "@expo/vector-icons";
import CourseInfo from "./../../components/Home/Category/CourseDetail";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CourseItemList from "../../components/Home/Category/CourseItemList";
import Colors from "../../Utils/Colors";

interface CategoryDetailProps {
  route: RouteProp<Record<string, any>, any>;
}

const CategoryDetail = ({ route }: CategoryDetailProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation() as any;
  const { categoryId = 0 } = route.params;
  const [categoryData, setCategoryData] = useState();
  useEffect(() => {
    getCategoryDetail();
  }, []);

  const getCategoryDetail = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("category")
      .select("*,categoryItems(*)")
      .eq("id", categoryId);
    if (data) {
      setCategoryData(data[0]);
      setIsLoading(false);
    }
  };
  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator />
    </View>
  ) : (
    <View
      key={categoryId}
      style={{
        padding: 20,
        marginTop: 20,
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle-sharp" size={wp(10)} color="black" />
      </TouchableOpacity>
      <CourseInfo categoryData={isLoading == false && categoryData} />

      <CourseItemList categoryData={isLoading == false && categoryData} />

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Add-new-cat-item", {
            categoryId: categoryData?.id,
          })
        }
        style={styles.floatingBtn}
      >
        <Ionicons name="add-circle" size={wp(15)} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default CategoryDetail;

const styles = StyleSheet.create({
  floatingBtn: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});
