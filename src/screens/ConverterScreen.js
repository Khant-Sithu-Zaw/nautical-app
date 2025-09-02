import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function ConverterScreen() {
    const [knots, setKnots] = useState("");
    const [nm, setNm] = useState("");

    const knotsToKmh = (k) => (parseFloat(k) * 1.852).toFixed(2);
    const nmToKm = (n) => (parseFloat(n) * 1.852).toFixed(2);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🔁 Nautical Conversion</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter speed in knots"
                keyboardType="numeric"
                value={knots}
                onChangeText={setKnots}
            />
            <Text style={styles.ans}>
                {knots !== "" ? `${knots} knots = ${knotsToKmh(knots)} km/h` : " "}
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Enter distance in NM"
                keyboardType="numeric"
                value={nm}
                onChangeText={setNm}
            />
            {/* {nm !== "" && <Text style={styles.ans}>{nm} NM = {nmToKm(nm)} km</Text>} */}
            <Text style={styles.ans}>
                {nm !== "" ? `${nm} NM = ${nmToKm(nm)} km` : " "}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f0f8ff" },
    title: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
    input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginVertical: 5 },
    ans: { paddingLeft: 10 },
});
