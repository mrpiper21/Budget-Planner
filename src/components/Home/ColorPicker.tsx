import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface ColorPickerprops {
  selectedColor: string;
  setSelectedColor: (value: string) => void;
}

const ColorPicker: React.FC<ColorPickerprops> = ({
  selectedColor,
  setSelectedColor,
}) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 20,
        marginTop: 20,
      }}
    >
      {Colors.COLOR_LIST.map((color, index) => (
        <TouchableOpacity
          key={index}
          style={[
            {
              height: wp(5),
              width: wp(5),
              backgroundColor: color,
              borderRadius: 99,
            },
            ,
            selectedColor == color && { borderWidth: 4 },
          ]}
          onPress={() => setSelectedColor(color)}
        ></TouchableOpacity>
      ))}
    </View>
  );
};

export default ColorPicker;
