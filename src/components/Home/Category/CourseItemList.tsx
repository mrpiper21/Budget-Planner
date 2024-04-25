import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../../Utils/Colors";
import { supabase } from "../../../Utils/SuperbaseConfig";

interface Props {
  categoryData: any;
  setUpdateRecord: () => void;
}

const CourseItemList: React.FC<Props> = ({ categoryData, setUpdateRecord }) => {
  const [expandItem, setExpandItem] = useState();
  const placeholder =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAREAAAC4CAMAAADzLiguAAAAPFBMVEX///+rq6unp6fMzMykpKTp6enx8fHU1NS0tLS6urr6+vqwsLDHx8fPz8/w8PD19fXa2trh4eHl5eXAwMAzrysnAAADpklEQVR4nO2c2ZKDIBAAE6KJmsPr//91c69yKKREHav7dctl6YVhGJTdDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZqE5LMU1XbrvVupELUe9dO9t5PsFyZfuvY1FjWRL994GRnQeRs5NOj+rNpIVCzSMER2M6GBEByM6GNHBiI4cI+mhbdtLE12SFCO3XKnH36ryJnLDQoxU/xm2usZtWIaRWu1nUyLCSNnfh6moE0eEkYvqK4lavpBgpNA368ktYsMSjKSJbqSK2LAEI7VuRB0iNizBSGUYuURsWIIRc4zEXH8lGDkacSTm6YEEI7tMX2zKiA2LMFL185HAMJJWdcj2UIQRfZCEDJEyT5JkH7BcyzBSnrujJORY9r0BSPzXaxlGHv/pz5TJQoQUn4Mw5T1KhBi5x5LseUadnYJKRlcVPLLEGNkVt7qq0rASWtOZa7nno3KM/EB5/mGF2rSRvLdqe+Z1WzZy0Moq6ujz1IaNNJoQz1CyXSO9IPIeJD5ZyXaN6KXIJx6hZLNGKpuQ/Xl8A7BVI6nNx+MAbPTJjRopjAKCdyjZqJHWOmeeSsay+W0asQcRv1CySSM3t4/7IGmHH96ikW8JwKHkNPj0Fo3o2bvBYCiRayRt84u1a/WYkOHfK9bISam92lvW0qOZvRvzZqgwINXI+5zP0rd8dIgMHxwLNdI4+zYaRF643y6QaaT4nxlaxtXo538O3LJlGmk7fetlXKW9/ybuUCLSSC8l7WZchTt7N5S4QolEI1pK2sm4Tt5C7mPLEUoEGjH3tZ++OUoAjkHiKAwINGIWx86vHxTjmUhPib0wIM+IZV/7DpOhn/bZjyvEGbHOjGffQoLIG1thQJoRV3HsFhZEXqjWolyaEUdKqvLyl89hbYUBYUbcKWlYVP1i7p5lGfFOSb05G9JlGfHZ14ZhZiWijFwnF2IJJZKM1NP7eKCFEkFGLEfbk5D1sxJBRvz3tWFohQE5Rk6etaAflPQKA2KMpJFGyJNuYUCKkdJ1tD0JXfVSjFjfj5mMbigRYmToaHsSJf+FARlGftjXhvJ9j1GEEef7MdOhvu8xijASN4i8lXy+dJNgxPhOLw7vL80FGDnO4uN7FCbAyGx3xb0KA+s3cpntysnkGUpWb6Q8zcjjP7B6I7ODEZ1VGznfjrNzW7WRfbIA6zayFBjRWeWtxhU3X+vUi92Ofoh9CR0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMA2+AN7/TZH3Ls1kQAAAABJRU5ErkJggg==";
  const handleDeletItem = async (itemId: number) => {
    const { error } = await supabase
      .from("categoryItems")
      .delete()
      .eq("id", itemId);

    ToastAndroid.show("Item Deleted", ToastAndroid.SHORT);
    setUpdateRecord(true);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Item List</Text>

      <View style={{ marginTop: wp(5) }}>
        {categoryData?.categoryItems.length > 0 ? (
          categoryData?.categoryItems?.map((item, index) => (
            <>
              <TouchableOpacity
                onPress={() => setExpandItem(index)}
                key={index}
                style={styles.itemContainer}
              >
                <Image style={styles.img} source={{ uri: placeholder }} />
                <View style={{ flex: 1, marginLeft: wp(5) }}>
                  <Text style={styles.name} numberOfLines={2}>
                    {item.name}
                  </Text>
                  {item.url ? (
                    <Text style={styles.url}>{item.url}</Text>
                  ) : (
                    <Text style={styles.url}>{item.note}</Text>
                  )}
                </View>
                <Text style={styles.cost}>{item.cost}</Text>
              </TouchableOpacity>
              {expandItem == index && (
                <View style={styles.actionIconContainer}>
                  <TouchableOpacity onPress={() => handleDeletItem(item.id)}>
                    <EvilIcons name="trash" size={wp(7)} color="red" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <EvilIcons name="link" size={wp(7)} color="blue" />
                  </TouchableOpacity>
                </View>
              )}
              {categoryData?.categoryItems.length - 1 != index && (
                <View
                  style={{
                    borderWidth: 0.5,
                    marginTop: wp(5),
                    borderColor: Colors.GRAY,
                  }}
                ></View>
              )}
            </>
          ))
        ) : (
          <Text
            style={{ fontSize: wp(7), fontWeight: "800", color: Colors.GRAY }}
          >
            No Items found
          </Text>
        )}
      </View>
    </View>
  );
};

export default CourseItemList;

const styles = StyleSheet.create({
  container: {
    marginTop: wp(10),
  },
  heading: {
    fontWeight: "bold",
    fontSize: wp(5),
  },
  img: {
    height: 70,
    width: 70,
    borderRadius: 15,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: wp(3),
    height: "auto",
    // backgroundColor: "#F2F1EB",
    // padding: wp(2),
    // borderRadius: wp(2),
  },
  name: {
    fontSize: wp(4),
    fontWeight: "600",
  },
  url: {
    color: Colors.GRAY,
  },
  cost: {
    fontSize: wp(5),
    fontWeight: "600",
    marginLeft: wp(10),
  },
  actionIconContainer: {
    display: "flex",
    gap: wp(2),
    justifyContent: "flex-end",
    flexDirection: "row",
  },
});
