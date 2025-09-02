import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

export default function TemperatureScreen() {
    const [temperature, setTemperature] = useState("");
    const [unit, setUnit] = useState("C"); // default Celsius
    const [result, setResult] = useState(null);

    const convertTemperature = () => {
        let temp = parseFloat(temperature);
        if (isNaN(temp)) {
            setResult("Invalid input");
            return;
        }

        let converted = "";
        if (unit === "C") {
            let fahrenheit = (temp * 9) / 5 + 32;
            let kelvin = temp + 273.15;
            converted = `${fahrenheit.toFixed(2)} °F | ${kelvin.toFixed(2)} K`;
        } else if (unit === "F") {
            let celsius = ((temp - 32) * 5) / 9;
            let kelvin = (temp - 32) * 5 / 9 + 273.15;
            converted = `${celsius.toFixed(2)} °C | ${kelvin.toFixed(2)} K`;
        } else if (unit === "K") {
            let celsius = temp - 273.15;
            let fahrenheit = (temp - 273.15) * 9 / 5 + 32;
            converted = `${celsius.toFixed(2)} °C | ${fahrenheit.toFixed(2)} °F`;
        }
        setResult(converted);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Temperature Converter</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter temperature"
                keyboardType="numeric"
                value={temperature}
                onChangeText={setTemperature}
            />

            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={[styles.unitButton, unit === "C" && styles.activeButton]}
                    onPress={() => setUnit("C")}
                >
                    <Text style={styles.buttonText}>Celsius</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.unitButton, unit === "F" && styles.activeButton]}
                    onPress={() => setUnit("F")}
                >
                    <Text style={styles.buttonText}>Fahrenheit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.unitButton, unit === "K" && styles.activeButton]}
                    onPress={() => setUnit("K")}
                >
                    <Text style={styles.buttonText}>Kelvin</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.convertButton} onPress={convertTemperature}>
                <Text style={styles.buttonText}>Convert</Text>
            </TouchableOpacity>

            {result && <Text style={styles.result}>Converted: {result}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f8f8f8",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "80%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        backgroundColor: "#fff",
        textAlign: "center",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 15,
    },
    unitButton: {
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: "#ddd",
        borderRadius: 8,
    },
    activeButton: {
        backgroundColor: "#4CAF50",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    convertButton: {
        marginTop: 10,
        padding: 12,
        backgroundColor: "#2196F3",
        borderRadius: 8,
    },
    result: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
});
