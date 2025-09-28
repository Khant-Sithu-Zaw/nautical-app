import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../../style/styles";

export default function SpeedConverter({ numberRegex, formatNumber }) {
    const [knots, setKnots] = useState("");
    const [kmh, setKmh] = useState("");
    const [mph, setMph] = useState("");
    const [ms, setMs] = useState("");
    const resetAll = () => {
        setKmh("");
        setMph("");
        setMs("");
        setKnots("");
    }
    const handleKnotsChange = (value) => {
        setKnots(value);

        const num = parseFloat(value);
        if (!isNaN(num)) {
            const kmhVal = num * 1.852;
            const mphVal = num * 1.15078;
            const msVal = num * 0.514444;

            setKmh(formatNumber(kmhVal));
            setMph(formatNumber(mphVal));
            setMs(formatNumber(msVal));
        } else {
            setKmh("");
            setMph("");
            setMs("");
        }
    };

    const handleKmhChange = (value) => {
        setKmh(value);

        const num = parseFloat(value);
        if (!isNaN(num)) {
            const knotsVal = num / 1.852;
            const mphVal = num * 0.621371;
            const msVal = num / 3.6;

            setKnots(formatNumber(knotsVal));
            setMph(formatNumber(mphVal));
            setMs(formatNumber(msVal));
        } else {
            setKnots("");
            setMph("");
            setMs("");
        }
    };
    const handleMphChange = (value) => {
        setMph(value);

        const num = parseFloat(value);
        if (!isNaN(num)) {
            const knotsVal = num / 1.15078;
            const kmhVal = num * 1.60934;
            const msVal = num * 0.44704;

            setKnots(formatNumber(knotsVal));
            setKmh(formatNumber(kmhVal));
            setMs(formatNumber(msVal));
        } else {
            setKnots("");
            setKmh("");
            setMs("");
        }
    };
    const handleMsChange = (value) => {
        setMs(value);

        const num = parseFloat(value);
        if (!isNaN(num)) {
            const knotsVal = num / 0.514444;
            const kmhVal = num * 3.6;
            const mphVal = num * 2.23694;

            setKnots(formatNumber(knotsVal));
            setKmh(formatNumber(kmhVal));
            setMph(formatNumber(mphVal));
        } else {
            setKnots("");
            setMph("");
            setKmh("");
        }
    };
    return (
        <View style={styles.inputForm}>


            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="Knots"
                    keyboardType="numeric"
                    value={knots}
                    onChangeText={(text) => { if (numberRegex.test(text)) handleKnotsChange(text); }}
                    placeholderTextColor="#9b9898ff"
                    maxLength={8}
                />
                <TouchableOpacity style={styles.inputIcon} onPress={resetAll}>
                    <Text style={styles.inputIconText}>kn</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="Km/hour"
                    keyboardType="decimal-pad"
                    value={kmh}
                    onChangeText={(text) => { if (numberRegex.test(text)) handleKmhChange(text); }}
                    placeholderTextColor="#9b9898ff"
                    maxLength={8}
                />
                <TouchableOpacity style={styles.inputIcon} onPress={resetAll}>
                    <Text style={styles.inputIconText}>km/h</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="Mile/hour"
                    keyboardType="decimal-pad"
                    value={mph}
                    onChangeText={(text) => { if (numberRegex.test(text)) handleMphChange(text); }}
                    placeholderTextColor="#9b9898ff"
                    maxLength={8}
                />
                <TouchableOpacity style={styles.inputIcon} onPress={resetAll}>
                    <Text style={styles.inputIconText}>mph</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="Meter/sec"
                    keyboardType="decimal-pad"
                    value={ms}
                    onChangeText={(text) => { if (numberRegex.test(text)) handleMsChange(text); }}
                    placeholderTextColor="#9b9898ff"
                    maxLength={8}
                />
                <TouchableOpacity style={styles.inputIcon} onPress={resetAll}>
                    <Text style={styles.inputIconText}>m/s</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
