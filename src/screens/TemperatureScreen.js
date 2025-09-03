import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from "react-native";
// import * as Location from 'expo-location';
import styles from "../style/styles";
export default function TemperatureScreen() {
    const [temperature, setTemperature] = useState("37"); // input value
    const [unit, setUnit] = useState("Celsius"); // default Celsius

    // const API_KEY = "d879ad9b52b8db7ddfdacee48910a504";

    //setting default temperature to current location temperature
    // useEffect(() => {
    //     (async () => {
    //         // Ask for permission
    //         let { status } = await Location.requestForegroundPermissionsAsync();
    //         if (status !== "granted") {
    //             setErrorMsg("Permission to access location was denied");
    //             setLoading(false);
    //             return;
    //         }

    //         // Get current location
    //         let location = await Location.getCurrentPositionAsync({});
    //         const { latitude, longitude } = location.coords;

    //         try {
    //             // Fetch temperature from OpenWeatherMap API
    //             const response = await fetch(
    //                 `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    //             );
    //             const data = await response.json();
    //             setTemperature(data.main.temp.toString()); // Current temperature in °C
    //         } catch (error) {
    //             setErrorMsg("Failed to fetch temperature");
    //         } finally {
    //             setLoading(false);
    //         }
    //     })();
    // }, []);

    const toggleUnit = () => {
        Keyboard.dismiss();
        let temp = parseFloat(temperature);
        if (isNaN(temp)) return;

        if (unit === "Celsius") {
            // Convert C → F
            let fahrenheit = (temp * 9) / 5 + 32;
            setTemperature(fahrenheit.toFixed(2).toString());
            setUnit("Fahrenheit");
        } else {
            // Convert F → C
            let celsius = ((temp - 32) * 5) / 9;
            setTemperature(celsius.toFixed(2).toString());
            setUnit("Celsius");
        }
    };
    // if (loading) {
    //     return (
    //         <View style={[styles.container, { backgroundColor: "#1E3D59", justifyContent: "center", alignItems: "center" }]}>
    //             <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
    //                 💧 Fetching temperature...
    //             </Text>

    //         </View>
    //     );
    // }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>🌡Temperature Converter</Text>

            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={temperature ?? ""}
                onChangeText={setTemperature}
            />

            <Text style={styles.label}>Unit: {unit}</Text>

            <TouchableOpacity style={styles.button} onPress={toggleUnit}>
                <Text style={styles.buttonText}>
                    {unit === "Celsius" ? "Change to Fahrenheit" : "Change to Celsius"}
                </Text>
            </TouchableOpacity>
            <Text style={styles.txt}>Fun Fact :<Text style={styles.fact}> Normal Body Temperature of Human is 37 °C (98.6 °F)</Text></Text>
        </View>
    );
}


