import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Divider } from "react-native-elements/dist/divider/Divider";
import BottomTabs from "../components/home/BottomTabs";
import Categories from "../components/home/Categories";
import HeaderTabs from "../components/home/HeaderTabs";
import Resturants from "../components/home/Resturants";
import SearchBar from "../components/home/SearchBar";

const YELP_API_KEY =
  "iu8GXlCQk63BQU9M1KYRozA4XD9tGCTyO8kG4Bwm8SUVndA4CWPGsPeBSYn5aznnoMMcbJBKjSU580BpjyCrD5LRYSyo2vs7UHjfggYz0rkGPQiIVUjg-Q56O8CtYXYx";

export default function Home({ navigation }) {
  const [resturantData, setResturantData] = useState();
  const [district, setDistrict] = useState("San Francisco");
  const [activeTab, setActiveTab] = useState("Delivery");

  useEffect(() => {
    getResturantsFromYelp();
  }, []);

  useEffect(() => {
    getResturantsFromYelp();
  }, [activeTab]);

  const getResturantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=resturants&location=${district}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.businesses);
        setResturantData(
          data.businesses.filter(
            (biz) =>
              biz.transactions?.length > 0
                ? biz.transactions.includes(activeTab.toLowerCase())
                : true // Hong Kong => X transactions data
          )
        );
      });
  };

  const handleSearch = () => {
    console.log(district);

    getResturantsFromYelp();
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <View style={{ backgroundColor: "#fff", padding: 15 }}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar setDistrict={setDistrict} handleSearch={handleSearch} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <Resturants data={resturantData} navigation={navigation} />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs navigation={navigation} />
    </SafeAreaView>
  );
}
