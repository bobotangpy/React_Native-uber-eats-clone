import React from "react";
import { View, Text, Image } from "react-native";

export default function About(props) {
  const { name, image, price, reviews, rating, categories } =
    props.route.params;

  const formattedCategories = categories.map((cat) => cat.title).join(" 路 ");

  const desc = `${formattedCategories} 路 ${
    price ? price : ""
  } 路 馃挸 路 ${rating} 猸愶笍 路 (${reviews}+)`;

  return (
    <View>
      <ResturantImage image={image} />
      <Title name={name} />
      <Desc description={desc} />
    </View>
  );
}

const ResturantImage = (props) => (
  <Image source={{ uri: props.image }} style={{ width: "100%", height: 180 }} />
);

const Title = (props) => (
  <Text
    style={{
      fontSize: 29,
      fontWeight: "600",
      marginTop: 10,
      marginHorizontal: 15,
    }}
  >
    {props.name}
  </Text>
);

const Desc = (props) => (
  <Text
    style={{
      fontSize: 15.5,
      fontWeight: "400",
      marginTop: 10,
      marginHorizontal: 15,
    }}
  >
    {props.description}
  </Text>
);
