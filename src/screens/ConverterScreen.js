import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import styles from "../style/styles";
import Layout from "../components/Layout";
export default function ConverterScreen() {
    const [fah, setFah] = useState("");
    const [cel, setCel] = useState("");
    const temperatureRegex = /^-?\d*\.?\d*$/;
    const numberRegex = /^\d*\.?\d*$/;
    const [knots, setKnots] = useState("");
    const [kmh, setKmh] = useState("");

    const [nm, setNm] = useState("");
    const [km, setKm] = useState("");
    function formatNumber(value) {
        const num = parseFloat(value);
        if (isNaN(num)) return "";

        // If number is too large or too small, use scientific notation
        if (Math.abs(num) >= 1e6 || (Math.abs(num) > 0 && Math.abs(num) < 1e-2)) {
            return num.toExponential(2); // e.g., "1.23e+08"
        }

        // Otherwise, round to 2 decimal places
        return num.toFixed(2);
    }

    // Temperature
    const handleFahChange = (value) => {

        setFah(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            setCel(formatNumber((num - 32) * 5 / 9));
        } else {
            setCel("");
        }
    };

    const handleCelChange = (value) => {

        setCel(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            setFah(formatNumber((num * 9 / 5) + 32));
        } else {
            setFah("");
        }
    };

    // Speed
    const handleKnotsChange = (value) => {

        setKnots(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            setKmh(formatNumber((num * 1.852).toFixed(3)));

        } else {
            setKmh("");
        }
    };

    const handleKmhChange = (value) => {

        setKmh(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            setKnots(formatNumber((num / 1.852).toFixed(3)));
        } else {
            setKnots("");
        }
    };

    // Distance
    const handleNmChange = (value) => {

        setNm(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            setKm(formatNumber((num * 1.852).toFixed(3)));

        } else {
            setKm("");
        }
    };

    const handleKmChange = (value) => {

        setKm(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            setNm(formatNumber((num / 1.852).toFixed(3)));

        } else {
            setNm("");
        }
    };
    return (
        <Layout
            bannerContent={<View>
                <Image
                    source={require("../../assets/images/conversion.jpg")}
                    style={styles.bannerImage}
                />
            </View>}
            bodyContent={<View >
                <View>
                    <Text style={styles.contentTitle}>🔄 Easy Unit Converter ToolBox</Text>
                    <View
                        style={
                            styles.titleLine
                        }
                    />
                </View>
                <View style={styles.inputForm}>
                    <Text style={styles.coverterTitle}>❶ Temperature Conversion</Text>
                    <View style={[styles.rhtSideInput, styles.flexBox]}>

                        <TextInput
                            style={[styles.textInput, styles.inputUnit]}
                            placeholder="Fahrenheit"
                            keyboardType="decimal-pad"
                            value={fah}
                            onChangeText={(text) => {
                                // Allow only - and numbers with optional decimal
                                if (temperatureRegex.test(text)) {
                                    handleFahChange(text);
                                }
                            }}
                            placeholderTextColor="#9b9898ff"
                            maxLength={8}
                        />
                        <TouchableOpacity
                            style={styles.inputIcon}
                            onPress={() => {
                                setFah("");
                                setCel("");
                            }}
                        >
                            <Text style={styles.inputIconText}>℉</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={[styles.rhtSideInput, styles.flexBox]}>

                        <TextInput
                            style={[styles.textInput, styles.inputUnit]}
                            placeholder="Celsius"
                            keyboardType="decimal-pad"
                            value={cel}
                            onChangeText={(text) => {
                                // Allow only - and numbers with optional decimal
                                if (temperatureRegex.test(text)) {
                                    handleCelChange(text);
                                }
                            }}

                            placeholderTextColor="#9b9898ff"
                            maxLength={8}
                        />
                        <TouchableOpacity
                            style={styles.inputIcon}
                            onPress={() => {
                                setCel("");
                                setFah("");
                            }}
                        >
                            <Text style={styles.inputIconText}>℃</Text>
                        </TouchableOpacity>

                    </View>
                    <Text style={styles.coverterTitle}>❷ Speed Conversion</Text>
                    <View style={[styles.rhtSideInput, styles.flexBox]}>

                        <TextInput
                            style={[styles.textInput, styles.inputUnit]}
                            placeholder="Knots"
                            keyboardType="numeric"
                            value={knots}

                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                    handleKnotsChange(text);
                                }
                            }}
                            placeholderTextColor="#9b9898ff"
                            maxLength={8}
                        />
                        <TouchableOpacity
                            style={styles.inputIcon}
                            onPress={() => {
                                setKnots("");
                                setKmh("");
                            }}
                        >
                            <Text style={styles.inputIconText}>kn</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={[styles.rhtSideInput, styles.flexBox]}>
                        <TextInput
                            style={[styles.textInput, styles.inputUnit]}
                            placeholder="Km/hour"
                            keyboardType="decimal-pad"
                            value={kmh}

                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                    handleKmhChange(text);
                                }
                            }}
                            placeholderTextColor="#9b9898ff"
                            maxLength={8}
                        />
                        <TouchableOpacity
                            style={styles.inputIcon}
                            onPress={() => {
                                setKmh("");
                                setKnots("");
                            }}
                        >
                            <Text style={styles.inputIconText}>km/h</Text>
                        </TouchableOpacity>

                    </View>
                    <Text style={styles.coverterTitle}>❸ Distance Conversion</Text>
                    <View style={[styles.rhtSideInput, styles.flexBox]}>

                        <TextInput
                            style={[styles.textInput, styles.inputUnit]}
                            placeholder="N Miles"
                            keyboardType="decimal-pad"
                            value={nm}

                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                    handleNmChange(text);
                                }
                            }}
                            placeholderTextColor="#9b9898ff"
                            maxLength={8}
                        />
                        <TouchableOpacity
                            style={styles.inputIcon}
                            onPress={() => {
                                setNm("");
                                setKm("");
                            }}
                        >
                            <Text style={styles.inputIconText}>NM</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={[styles.rhtSideInput, styles.flexBox]}>

                        <TextInput
                            style={[styles.textInput, styles.inputUnit]}
                            placeholder="Kilometers"
                            keyboardType="decimal-pad"
                            value={km}

                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                    handleKmChange(text);
                                }
                            }}
                            placeholderTextColor="#9b9898ff"
                            maxLength={8}
                        />
                        <TouchableOpacity
                            style={styles.inputIcon}
                            onPress={() => {
                                setKm("");
                                setNm("");
                            }}
                        >
                            <Text style={styles.inputIconText}>km</Text>
                        </TouchableOpacity>
                    </View>
                </ View>
            </ View>}
        />
    );
}




