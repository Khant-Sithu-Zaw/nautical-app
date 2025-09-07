import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, Keyboard } from "react-native";
import styles from "../style/styles";
export default function AnchorDragScreen() {
    const [lengthOverall, setLengthOverall] = useState(0);
    const [shackle, setShackle] = useState(0);
    const [radius, setRadius] = useState("");
    const LENGTHPERSHACKLE = 27.5; // length of one shackle in meters
    const NAUTICALMILE = 1852; // meters in one nautical mile
    const calculateRadius = () => {
        Keyboard.dismiss();
        if (!lengthOverall || !shackle) return;
        // radius in nautical miles
        const rad = ((parseFloat(shackle) * LENGTHPERSHACKLE) + parseFloat(lengthOverall)) / NAUTICALMILE;
        setRadius(rad.toFixed(2));
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>⛓️Turning Circle Method</Text>
            <View style={styles.innerColumn}>
                <Text style={[styles.innerLeft, styles.label]}>Length Overall :</Text>
                <TextInput
                    style={[styles.input, styles.innerRight]}
                    placeholder="Length(m) of Vessel"
                    keyboardType="numeric"
                    onChangeText={setLengthOverall}
                    placeholderTextColor="#9b9898ff"
                />
            </View>
            <View style={styles.innerColumn}>
                <Text style={[styles.innerLeft, styles.label]}>Shackles :</Text>
                <TextInput
                    style={[styles.input, styles.innerRight]}
                    placeholder="Counts of Shackle"
                    keyboardType="numeric"
                    onChangeText={setShackle}
                    placeholderTextColor="#9b9898ff"
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={calculateRadius}>
                <Text style={styles.buttonText}>Calculate Radius</Text>
            </TouchableOpacity>

            {radius && <Text style={styles.answer}>Calculated Radius: {radius}</Text>}
        </View>
    )
}
