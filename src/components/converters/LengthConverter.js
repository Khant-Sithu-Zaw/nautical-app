import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../../style/styles";

export default function LengthConverter({ numberRegex, formatNumber }) {
    const [meter, setMeter] = useState("");
    const [fathom, setFathom] = useState("");
    const [feet, setFeet] = useState("");
    const [cable, setCable] = useState("");
    const resetAll = () => {
        setMeter("");
        setFathom("");
        setFeet("");
        setCable("")
    };
    const handleMeterChange = (value) => {
        setMeter(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            setFathom(formatNumber(num / 1.8288));   // 1 fathom = 1.8288 m
            setFeet(formatNumber(num * 3.28084));    // 1 m = 3.28084 ft
            setCable(formatNumber(num / 185.2));     // 1 cable = 185.2 m
        } else {

            setFathom("");
            setFeet("");
            setCable("")
        }
    };
    const handleFathomChange = (value) => {
        setFathom(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const meters = num * 1.8288;
            setMeter(formatNumber(meters));
            setFeet(formatNumber(meters * 3.28084));
            setCable(formatNumber(meters / 185.2));
        } else {
            setMeter("");

            setFeet("");
            setCable("")
        }
    };
    const handleFeetChange = (value) => {
        setFeet(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const meters = num / 3.28084;
            setMeter(formatNumber(meters));
            setFathom(formatNumber(meters / 1.8288));
            setCable(formatNumber(meters / 185.2));
        } else {
            setMeter("");
            setFathom("");

            setCable("")
        }
    };
    const handleCableChange = (value) => {
        setCable(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const meters = num * 185.2;
            setMeter(formatNumber(meters));
            setFathom(formatNumber(meters / 1.8288));
            setFeet(formatNumber(meters * 3.28084));
        } else {
            setMeter("");
            setFathom("");
            setFeet("");

        }
    };
    return (
        <View style={styles.inputForm}>


            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="Meter"
                    keyboardType="number-pad"
                    value={meter}
                    maxLength={8}
                    onChangeText={(text) => {
                        if (numberRegex.test(text)) handleMeterChange(text);
                    }}
                />
                <TouchableOpacity style={styles.inputIcon} onPress={resetAll}>
                    <Text style={styles.inputIconText}>m</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="Fathom"
                    keyboardType="number-pad"
                    value={fathom}
                    maxLength={8}
                    onChangeText={(text) => {
                        if (numberRegex.test(text)) handleFathomChange(text);
                    }}
                />
                <TouchableOpacity style={styles.inputIcon} onPress={resetAll}>
                    <Text style={styles.inputIconText}>fm</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="Feet"
                    keyboardType="number-pad"
                    value={feet}
                    maxLength={8}
                    onChangeText={(text) => {
                        if (numberRegex.test(text)) handleFeetChange(text);
                    }}
                />
                <TouchableOpacity style={styles.inputIcon} onPress={resetAll}>
                    <Text style={styles.inputIconText}>ft</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="Cables"
                    keyboardType="number-pad"
                    value={cable}
                    maxLength={8}
                    onChangeText={(text) => {
                        if (numberRegex.test(text)) handleCableChange(text);
                    }}
                />
                <TouchableOpacity style={styles.inputIcon} onPress={resetAll}>
                    <Text style={styles.inputIconText}>cab</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}
