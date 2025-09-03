import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import styles from "../style/styles";

export default function ConverterScreen() {
    const [knots, setKnots] = useState("");
    const [nm, setNm] = useState("");

    const knotsToKmh = (k) => (parseFloat(k) * 1.852).toFixed(2);
    const nmToKm = (n) => (parseFloat(n) * 1.852).toFixed(2);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🔁 Nautical Conversion</Text>
            <Text style={styles.label}>❶ Knots → Kilometers per hour</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter speed in knots"
                keyboardType="numeric"
                value={knots}
                onChangeText={setKnots}
            />
            <Text style={styles.result}>
                {knots !== "" ? `${knots} knots = ${knotsToKmh(knots)} km/h` : " "}
            </Text>
            <Text style={styles.label}>❷ NauticalMile → Kilometers </Text>
            <TextInput
                style={styles.input}
                placeholder="Enter distance in NM"
                keyboardType="numeric"
                value={nm}
                onChangeText={setNm}
            />
            {/* {nm !== "" && <Text style={styles.result}>{nm} NM = {nmToKm(nm)} km</Text>} */}
            <Text style={styles.result}>
                {nm !== "" ? `${nm} NM = ${nmToKm(nm)} km` : " "}
            </Text>
        </View>
    );
}



// });
