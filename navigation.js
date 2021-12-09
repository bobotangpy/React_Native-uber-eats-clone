import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import ResturantDetail from "./screens/ResturantDetail";
import OrderCompleted from "./screens/OrderCompleted";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";
import OrderHistory from "./screens/OrderHistory";

const store = configureStore();

export default function RootNavigation() {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };

  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ResturantDetail" component={ResturantDetail} />
          <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
          <Stack.Screen name="OrderHistory" component={OrderHistory} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}
