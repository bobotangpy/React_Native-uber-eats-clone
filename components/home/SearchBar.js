import React from "react";
import { View, Text } from "react-native";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Input } from "react-native-elements/dist/input/Input";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SearchBar({ setDistrict, handleSearch }) {
  return (
    <View
      style={{
        marginTop: 15,
        marginHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <Input
        placeholder="Search"
        leftIcon={
          <Ionicons
            name="location-sharp"
            size={24}
            style={{ marginLeft: 10, marginTop: 10 }}
          />
        }
        onChangeText={(value) => setDistrict(value)}
      />

      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginRight: 10,
          paddingHorizontal: 9,
          backgroundColor: "#c1c1c1",
          borderRadius: 20,
          height: 40,
          zIndex: 999,
        }}
        onPress={() => handleSearch()}
      >
        <Text>Search</Text>
      </TouchableOpacity>

      {/* <GooglePlacesAutocomplete
        query={{ key: "AIzaSyCBk5uIYTMxwBnVlM9HFvgSSkuT8sNiDCE" }}
        placeholder="Search"
        onPress={(data) => {
          console.log(data);
          setDistrict(data);
        }}
        styles={{
          textInput: {
            backgroundColor: "#eee",
            borderRadius: 20,
            fontWeight: "700",
            marginTop: 7,
          },
          textInputContainer: {
            backgroundColor: "#eee",
            borderRadius: 50,
            flexDirection: "row",
            alignSelf: "center",
            marginRight: 10,
          },
        }}
        renderLeftButton={() => (
          <View>
            <Ionicons name="location-sharp" size={24} />
          </View>
        )}
        renderRightButton={() => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 10,
              marginTop: 9,
              paddingHorizontal: 9,
              backgroundColor: "#fff",
              borderRadius: 20,
              height: 40,
            }}
            onPress={handleSearch}
          >
            <AntDesign
              name="clockcircle"
              size={11}
              style={{ marginRight: 6 }}
            />
            <Text>Search</Text>
          </View>
        )}
      /> */}
    </View>
  );
}
