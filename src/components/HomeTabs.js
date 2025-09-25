import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Footer from "./Footer";
import HomeHeader from "./HomeHeader";
import AboutusScreen from "../screens/AboutusScreen";
import LearnScreen from "../screens/LearnScreen";
import HomeScreen from "../screens/HomeScreen";
const Tab = createBottomTabNavigator();

export default function HomeTabs() {

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
    )
}

