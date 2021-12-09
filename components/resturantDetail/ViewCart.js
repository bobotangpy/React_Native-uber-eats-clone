import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import OrderItem from "./OrderItem";
import { supabase } from "../../supabase";

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalCheckoutContainer: {
    backgroundColor: "#fff",
    padding: 16,
    height: 500,
    borderWidth: 1,
  },
  resturantName: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 10,
  },
  subtotalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  subtotalText: {
    textAlign: "left",
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 10,
  },
});

export default function ViewCart({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { items, resturantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );

  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  const addOrderToDB = async () => {
    setLoading(true);
    setModalVisible(false);

    let arr = [];

    await items.map((item) => {
      arr.push({
        resturantName: resturantName,
        title: item.title,
        description: item.description,
        price: item.price,
        image: item.image,
      });
    });

    // console.log(arr);

    if (arr.length > 0) {
      const { data, error } = await supabase.from("orders").insert(arr);
      console.log("res:::", data);

      if (data) {
        // console.log("res:::", res);
        setTimeout(() => {
          setLoading(false);
          navigation.navigate("OrderCompleted");
        }, 2500);
      } else if (error) console.log(error.message);
    }
  };

  const CheckoutModalContent = () => {
    return (
      <>
        <View style={styles.modal}>
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.resturantName}>{resturantName}</Text>
            {items.map((item, i) => (
              <OrderItem key={i} item={item} />
            ))}

            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>Subtotal</Text>
              <Text>{totalUSD}</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  backgroundColor: "#000",
                  alignItems: "center",
                  padding: 13,
                  borderRadius: 30,
                  width: 300,
                  position: "relative",
                }}
                onPress={() => addOrderToDB()}
              >
                <Text style={{ color: "#fff", fontSize: 20 }}>Checkout</Text>
                <Text
                  style={{
                    color: "#fff",
                    position: "absolute",
                    fontSize: 15,
                    right: 18,
                    top: 17,
                  }}
                >
                  {total ? totalUSD : ""}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <CheckoutModalContent />
      </Modal>
      {total && !loading ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 30,
            zIndex: 999,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                backgroundColor: "#000",
                padding: 15,
                borderRadius: 30,
                width: 300,
                position: "relative",
              }}
              onPress={() => setModalVisible(true)}
            >
              <Text style={{ color: "#fff", fontSize: 20, marginRight: 30 }}>
                View Cart
              </Text>
              <Text style={{ color: "#fff", fontSize: 20, marginRight: 15 }}>
                {totalUSD}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
      {loading && (
        <View
          style={{
            backgroundColor: "#000",
            opacity: 0.8,
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <LottieView
            style={{ height: 200 }}
            source={require("../../assets/animations/scanner.json")}
            autoPlay
            speed={3}
          />
        </View>
      )}
    </>
  );
}
