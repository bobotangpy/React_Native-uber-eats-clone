import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { supabase } from "../supabase";
import LottieView from "lottie-react-native";
import MenuItem from "../components/resturantDetail/MenuItem";
import _ from "lodash";

export default function OrderCompleted() {
  const [lastOrder, setLastOrder] = useState({});
  const { items, resturantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: orders, error } = await supabase
      .from("orders")
      .select()
      .order("created_at", { ascending: false });

    if (error) console.log(error);
    else {
      const groupedOrders = Object.values(_.groupBy(orders, "created_at"));
      console.log("got DATA", groupedOrders[0]);
      setLastOrder(groupedOrders[0]);
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
