import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { supabase } from "../supabase";
import LottieView from "lottie-react-native";
import MenuItem from "../components/resturantDetail/MenuItem";
import _ from "lodash";

export default function OrderCompleted({ navigation }) {
  const [lastOrder, setLastOrder] = useState([]);
  const { items, resturantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({
      type: "CLEAR_CART",
    });
    setTimeout(() => {
      navigation.navigate("OrderHistory");
    }, 5000);
  }, [lastOrder]);

  const fetchData = async () => {
    try {
      const { data } = await supabase
        .from("orders")
        .select()
        .order("created_at", { ascending: false });

      if (data?.length > 0) {
        const groupedOrders = Object.values(_.groupBy(data, "created_at"));
        console.log("got DATA", groupedOrders);
        await setLastOrder(groupedOrders[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ margin: 15, alignItems: "center", height: "100%" }}>
        <LottieView
          style={{ height: 100, alignSelf: "center", marginBottom: 30 }}
          source={require("../assets/animations/check-mark.json")}
          autoPlay
          speed={0.5}
          loop={false}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Your order at {resturantName} has been placed for {totalUSD}
        </Text>

        <ScrollView>
          <MenuItem foods={lastOrder} hideCheckbox={true} />
          <LottieView
            style={{ height: 200, alignSelf: "center", marginBottom: 30 }}
            source={require("../assets/animations/cooking.json")}
            autoPlay
            speed={0.5}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
