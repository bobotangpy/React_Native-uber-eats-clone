import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { supabase } from "../supabase";
import _ from "lodash";
import MenuItem from "../components/resturantDetail/MenuItem";
import BottomTabs from "../components/home/BottomTabs";
import { Divider } from "react-native-elements/dist/divider/Divider";

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  content: {
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#c9c9c9",
  },
  card: {
    height: 450,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "#efefef",
    borderRadius: 8,
  },
  date: {
    textAlign: "right",
    fontSize: 18,
    color: "#1c1c1c",
    marginVertical: 10,
  },
  resturantName: {
    fontWeight: "700",
    fontSize: 20,
    marginTop: 10,
    color: "#1c1c1c",
  },
  subtotalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subtotalText: {
    textAlign: "left",
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 10,
    color: "#1c1c1c",
  },
  subtotal: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 10,
    color: "#1c1c1c",
  },
});

export default function OrderHistory({ navigation }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    try {
      const { data } = await supabase
        .from("orders")
        .select()
        .order("created_at", { ascending: false });

      if (data?.length > 0) {
        const groupedOrders = Object.values(_.groupBy(data, "created_at"));
        // console.log("got order history:::", groupedOrders);
        // [[{}, {}], [{}, {}], [{}]]

        let newOrdersArr = [];

        groupedOrders.map((orders, i) => {
          const total = orders
            .map((item) => Number(item.price.replace("$", "")))
            .reduce((prev, curr) => prev + curr, 0);

          const totalUSD = total.toLocaleString("en", {
            style: "currency",
            currency: "USD",
          });

          orders = orders.map((item) => {
            return { ...item, total: totalUSD };
          });

          newOrdersArr.push(orders);
        });
        // console.log(newOrdersArr);

        await setHistory(newOrdersArr);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <Text style={styles.title}>My Orders</Text>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {history?.map((orders, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.date}>
              {new Date(orders[0].created_at).toLocaleString()}
            </Text>

            <Text style={styles.resturantName}>{orders[0].resturantName}</Text>

            <MenuItem foods={orders} hideCheckbox={true} />

            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>Subtotal</Text>
              <Text style={styles.subtotal}>{orders[0].total}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <Divider width={1} />
      <BottomTabs navigation={navigation} />
    </SafeAreaView>
  );
}
