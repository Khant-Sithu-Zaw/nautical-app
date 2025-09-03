import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}> Nautical Tools </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Converter")}
            >
                <Text style={styles.buttonText}>Nautical Converter</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Estimated Time of Arrival")}>
                <Text style={styles.buttonText}>ETA Calculator</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Temperature")}>
                <Text style={styles.buttonText}>Temperature</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AnchorDrag")}>
                <Text style={styles.buttonText}>Turning Circle</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E3D59", // deep sea blue
        justifyContent: "",
        alignItems: "center",
        paddingVertical: 30,
    },
    title: {
        fontSize: 26,
        marginBottom: 30,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#4DA8DA", // lighter ocean blue
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 12,
        marginVertical: 10,
        width: "85%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "600",
    },
});
