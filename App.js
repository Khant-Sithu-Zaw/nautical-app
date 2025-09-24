import React, { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import Splash from "./src/screens/SplashScreen";
import HomeHeader from "./src/components/HomeHeader";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SearchContext } from "./src/context/SearchContext";

import HomeScreen from "./src/screens/HomeScreen";
import ConverterScreen from "./src/screens/ConverterScreen";
import ETAScreen from "./src/screens/ETAScreen";
import RequiredSpeedScreen from "./src/screens/RequiredSpeedScreen";
import AnchorDragScreen from "./src/screens/AnchorDragScreen";
import AboutusScreen from "./src/screens/AboutusScreen";
import LearnScreen from "./src/screens/LearnScreen";

import Footer from "./src/components/Footer";
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

// 👇 Tabs with footer (only Home, Learn, About)
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <Footer {...props} />} // Custom footer
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          header: () => <HomeHeader />, // Show HomeHeader only on Home
        }}
      />
      <Tab.Screen name="LearnScreen" component={LearnScreen} />
      <Tab.Screen name="AboutusScreen" component={AboutusScreen} />
    </Tab.Navigator>
  );
}

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
      }, 3000);
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
          {/* ✅ Main Tabs with footer */}
          <Stack.Screen
            name="HomeTabs"
            component={HomeTabs}
            options={{ headerShown: false }}
          />

          {/* ❌ No footer on these screens */}
          <Stack.Screen name="Converter" component={ConverterScreen} />
          <Stack.Screen name="ETA Calculator" component={ETAScreen} />
          <Stack.Screen name="Speed Calculator" component={RequiredSpeedScreen} />
          <Stack.Screen name="Anchor Dragging" component={AnchorDragScreen} />
          {/* <Stack.Screen name="Time Converter" component={TimeConversionScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SearchContext.Provider>
  );
}
