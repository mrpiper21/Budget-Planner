import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../Utils/Colors";
import { AntDesign, FontAwesome, Feather } from "@expo/vector-icons";
import ImagePicker from "expo-image-picker";
import { supabase } from "../../Utils/SuperbaseConfig";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { ToastAndroid } from "react-native";

interface CategoryDetailProps {
  route: RouteProp<Record<string, any>, any>;
}

const AddNewCategoryItem = ({ route }: CategoryDetailProps) => {
  const navigation = useNavigation() as any;
  const placeholder =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAREAAAC4CAMAAADzLiguAAAAPFBMVEX///+rq6unp6fMzMykpKTp6enx8fHU1NS0tLS6urr6+vqwsLDHx8fPz8/w8PD19fXa2trh4eHl5eXAwMAzrysnAAADpklEQVR4nO2c2ZKDIBAAE6KJmsPr//91c69yKKREHav7dctl6YVhGJTdDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZqE5LMU1XbrvVupELUe9dO9t5PsFyZfuvY1FjWRL994GRnQeRs5NOj+rNpIVCzSMER2M6GBEByM6GNHBiI4cI+mhbdtLE12SFCO3XKnH36ryJnLDQoxU/xm2usZtWIaRWu1nUyLCSNnfh6moE0eEkYvqK4lavpBgpNA368ktYsMSjKSJbqSK2LAEI7VuRB0iNizBSGUYuURsWIIRc4zEXH8lGDkacSTm6YEEI7tMX2zKiA2LMFL185HAMJJWdcj2UIQRfZCEDJEyT5JkH7BcyzBSnrujJORY9r0BSPzXaxlGHv/pz5TJQoQUn4Mw5T1KhBi5x5LseUadnYJKRlcVPLLEGNkVt7qq0rASWtOZa7nno3KM/EB5/mGF2rSRvLdqe+Z1WzZy0Moq6ujz1IaNNJoQz1CyXSO9IPIeJD5ZyXaN6KXIJx6hZLNGKpuQ/Xl8A7BVI6nNx+MAbPTJjRopjAKCdyjZqJHWOmeeSsay+W0asQcRv1CySSM3t4/7IGmHH96ikW8JwKHkNPj0Fo3o2bvBYCiRayRt84u1a/WYkOHfK9bISam92lvW0qOZvRvzZqgwINXI+5zP0rd8dIgMHxwLNdI4+zYaRF643y6QaaT4nxlaxtXo538O3LJlGmk7fetlXKW9/ybuUCLSSC8l7WZchTt7N5S4QolEI1pK2sm4Tt5C7mPLEUoEGjH3tZ++OUoAjkHiKAwINGIWx86vHxTjmUhPib0wIM+IZV/7DpOhn/bZjyvEGbHOjGffQoLIG1thQJoRV3HsFhZEXqjWolyaEUdKqvLyl89hbYUBYUbcKWlYVP1i7p5lGfFOSb05G9JlGfHZ14ZhZiWijFwnF2IJJZKM1NP7eKCFEkFGLEfbk5D1sxJBRvz3tWFohQE5Rk6etaAflPQKA2KMpJFGyJNuYUCKkdJ1tD0JXfVSjFjfj5mMbigRYmToaHsSJf+FARlGftjXhvJ9j1GEEef7MdOhvu8xijASN4i8lXy+dJNgxPhOLw7vL80FGDnO4uN7FCbAyGx3xb0KA+s3cpntysnkGUpWb6Q8zcjjP7B6I7ODEZ1VGznfjrNzW7WRfbIA6zayFBjRWeWtxhU3X+vUi92Ofoh9CR0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMA2+AN7/TZH3Ls1kQAAAABJRU5ErkJggg==";
  const [image, setImage] = useState(placeholder);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [cost, setCost] = useState(0);
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { categoryId = 0 } = route.params;

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onClickAdd = async () => {
    setIsLoading(true);
    const { data: categoryData, error: categoryError } = await supabase
      .from("category")
      .select()
      .eq("id", categoryId);

    if (categoryData.length === 0) {
      const { data: categoryInsert, error: categoryInsertError } =
        await supabase
          .from("category")
          .insert([
            {
              id: categoryId,
            },
          ])
          .select();

      if (categoryInsertError) {
        console.error("Error inserting category:", categoryInsertError);
        return;
      }
    }

    const { data, error } = await supabase
      .from("categoryItems")
      .insert([
        {
          name: name,
          cost: cost,
          url: url,
          note: note,
          category_id: categoryId,
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting category item:", error);
    }
    if (data) {
      navigation.navigate("Category-detail", { categoryId: categoryData });
      ToastAndroid.show("New Item Added!", ToastAndroid.SHORT);
      setIsLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ padding: wp(5) }}
      >
        <TouchableOpacity onPress={() => handleImagePick()}>
          <Image source={{ uri: image }} style={styles.img} />
        </TouchableOpacity>

        <View style={styles.textInputContainer}>
          <AntDesign name="tag" size={24} color={Colors.GRAY} />
          <TextInput
            onChangeText={(value: string) => setName(value)}
            placeholder="Item Name"
            style={styles.input}
          />
        </View>
        <View style={styles.textInputContainer}>
          <FontAwesome name="dollar" size={24} color={Colors.GRAY} />
          <TextInput
            onChangeText={(value: number) => setCost(value)}
            keyboardType="number-pad"
            placeholder="Cost"
            style={styles.input}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Feather
            onChangeText={(value: string) => setUrl(value)}
            name="link-2"
            size={24}
            color={Colors.GRAY}
          />
          <TextInput placeholder="url" style={styles.input} />
        </View>
        <View style={styles.textInputContainer}>
          <Feather name="edit-2" size={24} color={Colors.GRAY} />
          <TextInput
            onChangeText={(value: string) => setNote(value)}
            numberOfLines={3}
            placeholder="Note"
            style={styles.input}
          />
        </View>
        <TouchableOpacity
          onPress={onClickAdd}
          disabled={!name || !cost || isLoading}
          style={styles.btn}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text
              style={{
                fontSize: wp(5),
                fontWeight: "600",
                color: Colors.WHITE,
                textAlign: "center",
              }}
            >
              Add
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddNewCategoryItem;
const styles = StyleSheet.create({
  img: {
    width: wp(30),
    height: wp(30),
    backgroundColor: Colors.GRAY,
    borderRadius: 15,
  },
  textInputContainer: {
    padding: wp(2),
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderRadius: 10,
    borderColor: Colors.GRAY,
    marginTop: wp(5),
  },
  input: {
    fontSize: wp(5),
    width: "100%",
  },
  btn: {
    padding: wp(3.5),
    backgroundColor: Colors.PRIMARY,
    borderRadius: wp(10),
    marginTop: wp(3),
  },
});
