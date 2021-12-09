import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from "react-redux";

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: 20,
  },
  titleStyle: {
    fontSize: 19,
    fontWeight: "600",
  },
});

export default function MenuItem({
  resturantName,
  foods,
  hideCheckbox,
  marginLeft,
}) {
  const dispatch = useDispatch();
  const cartItems = useSelector(
    (state) => state.cartReducer.selectedItems.items
  );

  const selectItem = (item, checkboxValue) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...item,
        resturantName: resturantName,
        checkboxValue: checkboxValue,
      },
    });
  };

  const isFoodInCart = (food, cartItems) => {
    return Boolean(cartItems.find((item) => item.title === food.title));
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginBottom: 60 }}
    >
      {foods.map((item, index) => (
        <View key={index}>
          <View style={styles.menuItemStyle}>
            {!hideCheckbox && (
              <BouncyCheckbox
                iconStyle={{
                  borderColor: "lightgrey",
                  borderRadius: 0,
                  marginRight: 10,
                }}
                fillColor="green"
                onPress={(checkboxValue) => selectItem(item, checkboxValue)}
                isChecked={isFoodInCart(item, cartItems)}
              />
            )}
            <FoodInfo item={item} />
            <FoodImage
              img={item.image}
              marginLeft={marginLeft ? marginLeft : 0}
            />
          </View>
          <Divider
            width={0.5}
            orientation="vertical"
            style={{ marginHorizontal: 20 }}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const FoodInfo = (props) => (
  <View style={{ width: 240, justifyContent: "space-evenly" }}>
    <Text style={styles.titleStyle}>{props.item.title}</Text>
    <Text>{props.item.description}</Text>
    <Text>{props.item.price}</Text>
  </View>
);

const FoodImage = ({ marginLeft, ...props }) => (
  <Image
    source={{ uri: props.img }}
    style={{ width: 100, height: 100, borderRadius: 8, marginLeft: marginLeft }}
  />
);
