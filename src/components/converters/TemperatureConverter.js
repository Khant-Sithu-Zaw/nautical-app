import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../../style/styles";

export default function TemperatureConverter({ temperatureRegex, formatNumber, numberRegex }) {
    const [fah, setFah] = useState("");
    const [cel, setCel] = useState("");
    const [kel, setKel] = useState("");
    const FAH_MIN = -459.67;
    const FAH_MAX = 4940.33;
    const CEL_MIN = -273.15;
    const CEL_MAX = 2726.85;
    const KEL_MIN = 0;
    const KEL_MAX = 3000;
    const resetAll = () => {
        setFah(""); setCel(""); setKel("");
    }
    const handleFahChange = (value) => {
        setFah(value);

        const num = parseFloat(value);


        if (!isNaN(num) && num >= FAH_MIN && num <= FAH_MAX) {
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
        if (!isNaN(num) && num >= CEL_MIN && num <= CEL_MAX) {
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


        if (!isNaN(num) && num >= KEL_MIN && num <= KEL_MAX) {
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
        <View style={styles.inputForm}>


            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="Fahrenheit"
                    keyboardType="numeric"
                    value={fah}
                    onChangeText={(text) => {
                        if (text === "" || text === "-" || text === "." || temperatureRegex.test(text)) {
                            if (parseFloat(text) < FAH_MIN) {
                                alert(`Fahrenheit cannot be below ${FAH_MIN}`);
                                return;
                            }
                            if (parseFloat(text) > FAH_MAX) {
                                alert(`Fahrenheit cannot be above ${FAH_MAX}`);
                                return;
                            }
                            handleFahChange(text);
                        }
                    }}
                    placeholderTextColor="#9b9898ff"
                    maxLength={7}
                    textContentType="none"
                />
                <TouchableOpacity
                    style={styles.inputIcon}
                    onPress={resetAll}
                >
                    <Text style={styles.inputIconText}>℉</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="Celsius"
                    keyboardType="numeric"
                    value={cel}
                    onChangeText={(text) => {
                        if (text === "" || text === "-" || text === "." || temperatureRegex.test(text)) {
                            if (parseFloat(text) < CEL_MIN) {
                                alert(`Celsius cannot be below ${CEL_MIN}`);
                                return;
                            }
                            if (parseFloat(text) > CEL_MAX) {
                                alert(`Celsius cannot be above ${CEL_MAX}`);
                                return;
                            }
                            handleCelChange(text); // or handleFahChange for that field
                        }
                    }}
                    placeholderTextColor="#9b9898ff"
                    maxLength={7}
                    textContentType="none"
                />
                <TouchableOpacity
                    style={styles.inputIcon}
                    onPress={resetAll}
                >
                    <Text style={styles.inputIconText}>℃</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="Kelvin"
                    keyboardType="decimal-pad"
                    value={kel}
                    onChangeText={(text) => {
                        if (numberRegex.test(text)) {

                            if (parseFloat(text) < KEL_MIN) {
                                alert(`Kelvin cannot be below ${KEL_MIN}`);
                                return;
                            }
                            if (parseFloat(text) > KEL_MAX) {
                                alert(`Kelvin cannot be above ${KEL_MAX}`);
                                return;
                            }

                            handleKelChange(text);
                        }
                    }}
                    placeholderTextColor="#9b9898ff"
                    maxLength={8}
                    textContentType="none"
                />
                <TouchableOpacity
                    style={styles.inputIcon}
                    onPress={resetAll}
                >
                    <Text style={styles.inputIconText}>K</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
