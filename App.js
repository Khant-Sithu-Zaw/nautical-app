import React, { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View, Image, Text, Pressable } from "react-native";
import Splash from "./src/screens/SplashScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SearchContext } from "./src/context/SearchContext";
import ConverterStack from "./src/components/ConverterStack";
import ETAScreen from "./src/screens/ETAScreen";
import RequiredSpeedScreen from "./src/screens/RequiredSpeedScreen";
import AnchorDragScreen from "./src/screens/AnchorDragScreen";
import HomeTabs from "./src/components/HomeTabs";
import { useFonts } from "expo-font";
import FuelConsumptionScreen from "./src/screens/FuelConsumptionScreen";
import styles from "./src/style/styles";
import ProfileScreen from "./src/screens/ProfileScreen";
import CVPreviewScreen from "./src/screens/CVPreviewScreen";


// import TimeZoneScreen from "./src/screens/TimeZoneScreen";
const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();


export default function App() {
  const [showCustomSplash, setShowCustomSplash] = useState(true);
  const [searchText, setSearchText] = useState("");

  const [fontsLoaded] = useFonts({
    TimeNewRoman: require("./assets/fonts/Times-Semibold-Regular.otf"),
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
        <Stack.Navigator
          screenOptions={({ navigation }) => ({
            animation: "fade",
            headerStyle: { backgroundColor: "#3C78AD" },
            headerTintColor: "#fff",
            headerBackVisible: false,
            headerBackImage: () => (
              <Image
                source={require("./assets/images/backIcon.png")}
                style={styles.backIcon}
                resizeMode="contain"
              />
            ),

            headerLeft: () => (
              <Pressable
                onPress={() => navigation.goBack()}
                style={({ pressed }) => [
                  styles.backContainer,
                  { opacity: pressed ? 0.6 : 1 },
                ]}
              >
                <Image
                  source={require("./assets/images/backIcon.png")}
                  style={styles.backIcon}
                  resizeMode="contain"
                />
              </Pressable>
            ),
          })}
        >

          <Stack.Screen
            name="HomeTabs"
            component={HomeTabs}
            options={{ headerShown: false, }}
          />

          <Stack.Screen name="Converter" component={ConverterStack} options={{ headerShown: false }} />
          <Stack.Screen name="Estimated Time of Arrival" component={ETAScreen} />
          <Stack.Screen name="Required STW to Travel" component={RequiredSpeedScreen} />
          <Stack.Screen name="Anchor Swing Radius" component={AnchorDragScreen} />
          <Stack.Screen name="Fuel Cost Estimation" component={FuelConsumptionScreen} />
          {/* <Stack.Screen name="Stopping Distance" component={StoppingDistanceScreen} /> */
          }
          <Stack.Screen name="Profile Setup" component={ProfileScreen} />
          <Stack.Screen name="Preview CV" component={CVPreviewScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </SearchContext.Provider>
  );
}
