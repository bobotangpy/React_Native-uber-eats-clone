import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function BottomTabs({ navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 30,
        justifyContent: "space-between",
      }}
    >
      <Icon icon="home" text="Home" navigation={navigation} screen="Home" />
      <Icon icon="search" text="Browse" />
      <Icon icon="shopping-bag" text="Grocery" />
      <Icon
        icon="receipt"
        text="Orders"
        navigation={navigation}
        screen="OrderHistory"
      />
      <Icon icon="user" text="Account" />
    </View>
  );
}

const Icon = (props) => (
  <TouchableOpacity
    onPress={() => {
      // console.log("clicked orders");
      props.screen ? props.navigation.navigate(props.screen) : "";
    }}
  >
    <FontAwesome5
      name={props.icon}
      size={25}
      style={{ marginBottom: 3, alignSelf: "center" }}
    />
    <Text>{props.text}</Text>
  </TouchableOpacity>
);
