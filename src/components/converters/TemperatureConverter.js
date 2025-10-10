import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "../../style/styles";
import Layout from "../Layout";
import { signNumberRegex, numberRegex, } from "../../utils/constants";
import { formatNumber } from "../../utils/methods"
export default function TemperatureConverter() {
    const [fah, setFah] = useState("");
    const [cel, setCel] = useState("");
    const [kel, setKel] = useState("");
    const FAH_MIN = -459.67;

    const CEL_MIN = -273.15;

    const KEL_MIN = 0;

    const resetAll = () => {
        setFah(""); setCel(""); setKel("");
    }
    const handleFahChange = (value) => {
        setFah(value);

        const num = parseFloat(value);


        if (!isNaN(num) && num >= FAH_MIN) {
            const c = (num - 32) * 5 / 9;
            const k = c + 273.15;

            setCel(formatNumber(c));
            setKel(formatNumber(k));
        } else {
            setCel(""); setKel("");
        }
    };

    const handleCelChange = (value) => {
        setCel(value);

        const num = parseFloat(value);
        if (!isNaN(num) && num >= CEL_MIN) {
            const f = (num * 9 / 5) + 32; // Celsius → Fahrenheit
            const k = num + 273.15;       // Celsius → Kelvin

            setFah(formatNumber(f));
            setKel(formatNumber(k));
        } else {
            setFah("");
            setKel("");
        }
    };
    const handleKelChange = (value) => {
        setKel(value);

        const num = parseFloat(value);


        if (!isNaN(num) && num >= KEL_MIN) {
            const c = num - 273.15;
            const f = (c * 9 / 5) + 32;

            setCel(formatNumber(c));
            setFah(formatNumber(f));
        } else {
            setFah("");
            setCel("");
        }
    };

    return (
        <Layout
            bannerContent={
                <View>
                    <Image source={require("../../../assets/images/temperature.png")}
                        style={[
                            styles.converterImage,

                        ]} />
                    <Text style={[
                        styles.converterTitle,

                    ]}>Temperature Converter</Text>
                </View>
            }
            mainContent={
                <View style={[styles.flexBox]}>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Fahrenheit (F)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={fah}
                            onChangeText={(text) => {
                                if (signNumberRegex.test(text)) {

                                    if (parseFloat(text) < FAH_MIN) {
                                        alert(`Kelvin cannot be below ${FAH_MIN}`);
                                        return;
                                    }
                                    handleFahChange(text);
                                }
                            }}
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {kel.length > 0 && (  // Only show ❌ when there's text
                            <TouchableOpacity
                                style={styles.inputIcon}
                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Celsius (C)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={cel}
                            onChangeText={(text) => {
                                if (signNumberRegex.test(text)) {

                                    if (parseFloat(text) < CEL_MIN) {
                                        alert(`Kelvin cannot be below ${CEL_MIN}`);
                                        return;
                                    }
                                    handleCelChange(text);
                                }
                            }}
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {cel.length > 0 && (  // Only show ❌ when there's text
                            <TouchableOpacity
                                style={styles.inputIcon}
                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Kelvin (K)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={kel}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {

                                    if (parseFloat(text) < KEL_MIN) {
                                        alert(`Kelvin cannot be below ${KEL_MIN}`);
                                        return;
                                    }
                                    handleKelChange(text);
                                }
                            }}
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {kel.length > 0 && (  // Only show ❌ when there's text
                            <TouchableOpacity
                                style={styles.inputIcon}
                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            }
        />
    );
}
