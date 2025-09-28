import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../../style/styles";

export default function DistanceConverter({ numberRegex, formatNumber }) {
    const [nm, setNm] = useState("");
    const [km, setKm] = useState("");
    const [mile, setMile] = useState("");
    const resetAll = () => {
        setNm("");
        setKm("");
        setMile("");
    };

    const handleNmChange = (value) => {
        setNm(value);

        const num = parseFloat(value);
        if (!isNaN(num)) {
            setKm(formatNumber(num * 1.852));
            setMile(formatNumber(num * 1.15078));

        } else {
            setKm(""); setMile("");
        }
    };

    const handleKmChange = (value) => {
        setKm(value);

        const num = parseFloat(value);
        if (!isNaN(num)) {
            const nmVal = num / 1.852;
            setNm(formatNumber(nmVal));
            setMile(formatNumber(num * 0.621371));

        } else {
            setNm(""); setMile("");
        }
    };

    const handleMileChange = (value) => {
        setMile(value);

        const num = parseFloat(value);
        if (!isNaN(num)) {
            const nmVal = num / 1.15078;
            setNm(formatNumber(nmVal));
            setKm(formatNumber(num * 1.60934));

        } else {
            setNm(""); setKm("");
        }
    };


    return (
        <View style={styles.inputForm}>

            {/* NM input */}
            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="N Miles"
                    keyboardType="decimal-pad"
                    value={nm}
                    onChangeText={(text) => {
                        if (numberRegex.test(text)) handleNmChange(text);
                    }}
                    placeholderTextColor="#9b9898ff"
                    maxLength={8}
                />
                <TouchableOpacity
                    style={styles.inputIcon}
                    onPress={resetAll}
                >
                    <Text style={styles.inputIconText}>NM</Text>
                </TouchableOpacity>
            </View>

            {/* km input */}
            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="Kilometers"
                    keyboardType="decimal-pad"
                    value={km}
                    onChangeText={(text) => {
                        if (numberRegex.test(text)) handleKmChange(text);
                    }}
                    placeholderTextColor="#9b9898ff"
                    maxLength={8}
                />
                <TouchableOpacity
                    style={styles.inputIcon}
                    onPress={resetAll}
                >
                    <Text style={styles.inputIconText}>km</Text>
                </TouchableOpacity>
            </View>


            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="Miles"
                    keyboardType="decimal-pad"
                    value={mile}
                    onChangeText={(text) => {
                        if (numberRegex.test(text)) handleMileChange(text);
                    }}
                    placeholderTextColor="#9b9898ff"
                    maxLength={8}
                />
                <TouchableOpacity
                    style={styles.inputIcon}
                    onPress={resetAll}
                >
                    <Text style={styles.inputIconText}>mile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
