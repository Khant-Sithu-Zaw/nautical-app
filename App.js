import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen"; // HomeScreen file
import ConverterScreen from "./src/screens/ConverterScreen";
import ETAScreen from "./src/screens/ETAScreen";
import TemperatureScreen from "./src/screens/TemperatureScreen";
import AnchorDragScreen from "./src/screens/AnchorDragScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: "#2d5ed1ff" },
        headerTintColor: "#b8b8b8ff",
        headerTitleStyle: { fontWeight: "bold" },
        // center title
      }} initialRouteName="⚓  Home">
        <Stack.Screen name="⚓  Home" component={HomeScreen} />
        <Stack.Screen name="Converter" component={ConverterScreen} />
        <Stack.Screen name="Estimated Time of Arrival" component={ETAScreen} />
        <Stack.Screen name="Temperature" component={TemperatureScreen} />
        <Stack.Screen name="Anchor Dragging" component={AnchorDragScreen} />
      </Stack.Navigator>
    </NavigationContainer >
  );
}
