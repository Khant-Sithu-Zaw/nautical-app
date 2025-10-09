import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Image, Text, Pressable } from "react-native";
import ConverterScreen from "../screens/ConverterScreen";
import TemperatureConverter from "./converters/TemperatureConverter";
import SpeedConverter from "./converters/SpeedConverter";
import WeightConverter from "./converters/WeightConverter";
import VolumeConverter from "./converters/VolumeConverter";
import PressureConverter from "./converters/PressureConverter";
import PowerConverter from "./converters/PowerConverter";
import DistanceConverter from "./converters/DistanceConverter";
import LengthConverter from "./converters/LengthConverter";
import styles from "../style/styles";
const Stack = createNativeStackNavigator();

export default function ConverterStack() {
    const customHeaderLeft = (navigation) => (
        <Pressable
            onPress={() => navigation.goBack()}
            style={({ pressed }) => [
                styles.backContainer,
                { opacity: pressed ? 0.6 : 1 },
            ]}
        >
            <Image
                source={require("../../assets/images/backIcon.png")}
                style={styles.backIcon}
                resizeMode="contain"
            />
        </Pressable>
    );
    const screenOptions = ({ navigation }) => ({
        headerStyle: { backgroundColor: "#3C78AD" },
        headerTintColor: "#fff",
        animation: "slide_from_left",
        headerBackVisible: false,
        headerBackTitleVisible: true,

        headerLeft: () => customHeaderLeft(navigation),
    });
    return (
        <Stack.Navigator
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name="ConverterHome"
                component={ConverterScreen}
                options={{ title: "Converter" }}
            />
            <Stack.Screen
                name="Temperature Converter"
                component={TemperatureConverter}
                options={({ navigation }) => ({
                    title: "Temperature",
                    headerLeft: () => customHeaderLeft(navigation),
                })}
            />
            <Stack.Screen
                name="Speed Converter"
                component={SpeedConverter}
                options={{ title: "Speed" }}
            />
            <Stack.Screen
                name="Weight Converter"
                component={WeightConverter}
                options={{ title: "Weight" }}
            />
            <Stack.Screen
                name="Volume Converter"
                component={VolumeConverter}
                options={{ title: "Volume" }}
            />
            <Stack.Screen
                name="Pressure Converter"
                component={PressureConverter}
                options={{ title: "Pressure" }}
            />
            <Stack.Screen
                name="Distance Converter"
                component={DistanceConverter}
                options={{ title: "Distance" }}
            />
            <Stack.Screen
                name="Energy Converter"
                component={PowerConverter}
                options={{ title: "Power" }}
            />
            <Stack.Screen
                name="Length Converter"
                component={LengthConverter}
                options={{ title: "Length" }}
            />
        </Stack.Navigator>
    );
}