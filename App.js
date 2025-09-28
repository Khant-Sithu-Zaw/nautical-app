import React, { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import Splash from "./src/screens/SplashScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SearchContext } from "./src/context/SearchContext";
import ConverterScreen from "./src/screens/ConverterScreen";
import ETAScreen from "./src/screens/ETAScreen";
import RequiredSpeedScreen from "./src/screens/RequiredSpeedScreen";
import AnchorDragScreen from "./src/screens/AnchorDragScreen";
import HomeTabs from "./src/components/HomeTabs";
import { useFonts } from "expo-font";
import FuelConsumptionScreen from "./src/screens/FuelConsumptionScreen";

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();


export default function App() {
  const [showCustomSplash, setShowCustomSplash] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [fontsLoaded] = useFonts({
    JacquesFrancois: require("./assets/fonts/JacquesFrancois-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await SplashScreen.hideAsync();
      setTimeout(() => {
        setShowCustomSplash(false);
      }, 1800);
    }
    prepare();
  }, []);

  if (showCustomSplash) {
    return <Splash />;
  }

  return (
    <SearchContext.Provider value={{ searchText, setSearchText }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: "#3C78AD" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}>

          <Stack.Screen
            name="HomeTabs"
            component={HomeTabs}
            options={{ headerShown: false }}
          />

          <Stack.Screen name="Converter" component={ConverterScreen} />
          <Stack.Screen name="ETA Calculator" component={ETAScreen} />
          <Stack.Screen name="Speed Calculator" component={RequiredSpeedScreen} />
          <Stack.Screen name="Anchor Dragging" component={AnchorDragScreen} />
          <Stack.Screen name="Fuel Cost Calculator" component={FuelConsumptionScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SearchContext.Provider>
  );
}
