import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../Utils/Colors";
import ColorPicker from "../../components/Home/ColorPicker";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { supabase } from "../../Utils/SuperbaseConfig";
import client from "../../Utils/KindConfig";
import { useNavigation } from "@react-navigation/native";

const AddnewCategory = () => {
  const [selectedIcon, setSelectedIcon] = useState("IC");
  const [selectedColor, setSelectedColor] = useState(Colors.PRIMARY);
  const [categoryName, setCategoryName] = useState("");
  const [totalBudget, setTotalBudget] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation() as any;

  const handleCreateCategory = async () => {
    setIsLoading(true);
    const user = await client.getUserDetails();
    const { data, error } = await supabase
      .from("category")
      .insert({
        name: categoryName,
        assign_budget: totalBudget,
        icon: selectedIcon,
        color: selectedColor,
        created_by: user.email,
      })
      .select();
    if (data) {
      setCategoryName("");
      setTotalBudget("");
      setIsLoading(false);
      navigation.navigate("Category-detail", { categoryId: data[0].id });
      ToastAndroid.show("Category Created", ToastAndroid.SHORT);

      if (error) {
        setIsLoading(false);
      }
    }
  };
  return (
    <View style={{ marginTop: 20, padding: 20 }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TextInput
          maxLength={2}
          onChangeText={(v: string) => setSelectedIcon(v)}
          style={{ ...styles.iconInput, backgroundColor: selectedColor }}
        >
          {selectedIcon}
        </TextInput>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <ColorPicker
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </ScrollView>
      </View>
      <View style={styles.inputView}>
        <MaterialIcons name="local-offer" size={24} color={Colors.GRAY} />
        <TextInput
          onChangeText={(value: string) => setCategoryName(value)}
          value={categoryName}
          style={{ width: "100%", fontSize: 17 }}
          placeholder="Category Name"
        />
      </View>
      <View style={styles.inputView}>
        <FontAwesome name="dollar" size={24} color={Colors.GRAY} />
        <TextInput
          onChangeText={(value: string) => setTotalBudget(value)}
          value={totalBudget}
          keyboardType="numeric"
          style={{ width: "100%", fontSize: 17 }}
          placeholder="Total Budget"
        />
      </View>
      <TouchableOpacity
        onPress={() => handleCreateCategory()}
        disabled={!categoryName || !totalBudget || isLoading}
        style={styles.btn}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text
            style={{ textAlign: "center", fontSize: 16, color: Colors.WHITE }}
          >
            Create
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AddnewCategory;

const styles = StyleSheet.create({
  iconInput: {
    textAlign: "center",
    fontSize: 30,
    padding: 20,
    borderRadius: 99,
    paddingHorizontal: 28,
    color: Colors.WHITE,
  },
  inputView: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    gap: 2,
    borderRadius: 10,
    padding: 14,
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    marginTop: hp(3),
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 99,
    marginTop: hp(5),
  },
});
