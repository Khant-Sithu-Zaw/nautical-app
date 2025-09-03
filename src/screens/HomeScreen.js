import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import styles from "../style/styles";
export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.homeContainer}>
            <Text style={styles.homeTitle}> Nautical Tools </Text>

            <TouchableOpacity
                style={styles.screenButton}
                onPress={() => navigation.navigate("Converter")}
            >
                <Text style={styles.buttonText}>Nautical Converter</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.screenButton} onPress={() => navigation.navigate("Estimated Time of Arrival")}>
                <Text style={styles.buttonText}>ETA Calculator</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.screenButton} onPress={() => navigation.navigate("Temperature")}>
                <Text style={styles.buttonText}>Temperature</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.screenButton} onPress={() => navigation.navigate("Anchor Dragging")}>
                <Text style={styles.buttonText}>Anchor Dragging</Text>
            </TouchableOpacity>
        </View>
    );
}


