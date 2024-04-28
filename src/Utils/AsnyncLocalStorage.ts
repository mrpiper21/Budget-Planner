import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (value: unknown) => {
  try {
    await AsyncStorage.setItem("my-key", JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return JSON.parse(value);
    }
  } catch (e) {
    // error reading value
  }
};
