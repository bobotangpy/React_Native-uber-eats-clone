import React from "react";
import { View } from "react-native";
import { Divider } from "react-native-elements";
import About from "../components/resturantDetail/About";
import MenuItem from "../components/resturantDetail/MenuItem";
import ViewCart from "../components/resturantDetail/ViewCart";

const items = [
  {
    title: "Mediterranean Vegetable",
    description:
      "smokey chickpea spread, lettuce, tomatoes, cucumbers and black olives",
    price: "$9.5",
    image: "https://image.zmenu.com/large/5580/20140413074052745931.jpg",
  },
  {
    title: "Smoked Turkey",
    description:
      "caramelized onion mayo, lettuce, tomatoes and apricot date chutney",
    price: "$9.5",
    image:
      "https://belquistwist.com/wp-content/uploads/2020/11/smoked-turkey-club.jpg",
  },
  {
    title: "Chicken Rigatoni",
    description:
      "chipotle marinade, bell peppers, romaine lettuce and lime dressing",
    price: "$11",
    image:
      "https://hips.hearstapps.com/del.h-cdn.co/assets/16/20/1463719266-skillet-cajun-chicken-rigatonil3.jpg",
  },
  {
    title: "Seafood Penne",
    description:
      "spinach, grilled red and yellow peppers, grilled zucchini and chickpeas",
    price: "$15",
    image: "http://farm3.static.flickr.com/2726/4083179401_21327854be.jpg",
  },
  {
    title: "Spicy Beef & Grilled Pineapple Wrap",
    description:
      "chipotle marinade, bell peppers, romaine lettuce and lime dressing",
    price: "$9.5",
    image:
      "https://www.oldelpaso.com.au/-/media/oep/australia/recipes/recipes-images/classic-beef-fajitas-recipe_hero.jpg",
  },
  {
    title: "Smoked Eggplant Wrap",
    description:
      "spinach, grilled red and yellow peppers, grilled zucchini and chickpeas",
    price: "$9.5",
    image:
      "https://cdn.leitesculinaria.com/wp-content/uploads/2021/08/mediterranean-eggplant-wraps-fp.jpg.optimal.jpg",
  },
];

export default function ResturantDetail({ route, navigation }) {
  return (
    <View style={{ height: "100%" }}>
      <About route={route} />
      <Divider width={1.5} style={{ marginVertical: 20 }} />
      <MenuItem resturantName={route.params.name} foods={items} />
      <ViewCart navigation={navigation} />
    </View>
  );
}
