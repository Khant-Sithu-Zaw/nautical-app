import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from "react-native";
import * as Location from 'expo-location';
export default function TemperatureScreen() {
    const [temperature, setTemperature] = useState(""); // input value
    const [unit, setUnit] = useState("Celsius"); // default Celsius
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const API_KEY = "d879ad9b52b8db7ddfdacee48910a504";

    //setting default temperature to current location temperature
    useEffect(() => {
        (async () => {
            // Ask for permission
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                setLoading(false);
                return;
            }

            // Get current location
            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            try {
                // Fetch temperature from OpenWeatherMap API
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
                );
                const data = await response.json();
                setTemperature(data.main.temp.toString()); // Current temperature in °C
            } catch (error) {
                setErrorMsg("Failed to fetch temperature");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

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
    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor: "#1E3D59", justifyContent: "center", alignItems: "center" }]}>
                <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
                    💧 Fetching temperature...
                </Text>

            </View>
        );
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>🌡 Temperature Converter</Text>

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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 10,
        backgroundColor: "#f0f8ff",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "60%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        backgroundColor: "#fff",
        textAlign: "center",
        fontSize: 18,
    },
    label: {
        fontSize: 16,
        marginBottom: 15,
        fontWeight: "600",
    },
    button: {
        padding: 12,
        backgroundColor: "#2196F3",
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
