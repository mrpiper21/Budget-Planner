import { KindeSDK } from "@kinde-oss/react-native-sdk-0-7x";


// const client = new KindeSDK(
//   'https://mrpiper.kinde.com',
//   'myapp://mrpiper.kinde.com/kinde_callback',
//   'f9863373da274fffa0ec8a8ba5211c7e',
//   'myapp://mrpiper.kinde.com/kinde_callback',
//   )

const client = new KindeSDK(
  "https://mrpiper.kinde.com",
  "exp://192.168.86.54:8081",
  "f9863373da274fffa0ec8a8ba5211c7e",
  "exp://192.168.86.54:8081"
);

export default client;
