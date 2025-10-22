import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import Layout from "../Layout";
import { numberRegex, signNumberRegex } from "../../utils/constants";
import { formatNumber } from "../../utils/methods";
import styles from "../../style/styles";


export default function PressureConverter() {
    const [bar, setBar] = useState("");
    const [psi, setPsi] = useState("");
    const [atm, setAtm] = useState("");
    const [mmHg, setMmHg] = useState("");
    const [kPa, setKPa] = useState("");

    const resetAll = () => {
        setBar("");
        setPsi("");
        setAtm("");
        setMmHg("");
        setKPa("");
    };

    const handleBarChange = (value) => {
        const num = parseFloat(value);

        if (!isNaN(num)) {
            if (num < -1) {
                alert("Gauge Pressure cannot be less than -1 bar");
                return; // stops further processing
            }
            const absBar = num + 1; // convert to absolute
            setBar(num);
            setPsi(formatNumber(absBar * 14.5038));
            setAtm(formatNumber(absBar * 0.986923));
            setMmHg(formatNumber(absBar * 750.062));
            setKPa(formatNumber(absBar * 100));
        } else {
            setPsi("");
            setAtm("");
            setMmHg("");
            setKPa("");
        }
    };

    const handlePsiChange = (value) => {
        setPsi(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const absBar = num / 14.5038;    // psi → absolute bar
            const gaugeBar = absBar - 1;     // convert to gauge
            setBar(formatNumber(gaugeBar));
            setAtm(formatNumber(absBar * 0.986923));
            setMmHg(formatNumber(absBar * 750.062));
            setKPa(formatNumber(absBar * 100));
        } else {
            setBar("");
            setAtm("");
            setMmHg("");
            setKPa("");
        }
    };

    const handleAtmChange = (value) => {
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const absBar = num / 0.986923;
            const gaugeBar = absBar - 1;

            setBar(formatNumber(gaugeBar));
            setPsi(formatNumber(absBar * 14.5038));
            setAtm(num);
            setMmHg(formatNumber(absBar * 750.062));
            setKPa(formatNumber(absBar * 100));
        } else {
            setBar("");
            setPsi("");
            setMmHg("");
            setKPa("");
        }
    };

    const handleMmHgChange = (value) => {
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const absBar = num / 750.062;
            const gaugeBar = absBar - 1;

            setBar(formatNumber(gaugeBar));
            setPsi(formatNumber(absBar * 14.5038));
            setAtm(formatNumber(absBar * 0.986923));
            setMmHg(num);
            setKPa(formatNumber(absBar * 100));
        } else {
            setBar("");
            setPsi("");
            setAtm("");
            setKPa("");
        }
    };

    const handleKPaChange = (value) => {
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const absBar = num / 100;
            const gaugeBar = absBar - 1;

            setBar(formatNumber(gaugeBar));
            setPsi(formatNumber(absBar * 14.5038));
            setAtm(formatNumber(absBar * 0.986923));
            setMmHg(formatNumber(absBar * 750.062));
            setKPa(num);
        } else {
            setBar("");
            setPsi("");
            setAtm("");
            setMmHg("");
        }
    };

    return (
        <Layout
            bannerContent={
                <View>
                    <Image source={require("../../../assets/images/pressureIcon.png")}
                        style={[
                            styles.converterImage,

                        ]} />
                    <Text style={[
                        styles.converterTitle,

                    ]}>Pressure Converter</Text>
                </View>
            }
            mainContent={
                <View style={[styles.flexBox]}>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Gauge (bar) </Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={bar}
                            onChangeText={(text) => {
                                if (signNumberRegex.test(text)) {
                                    handleBarChange(text);
                                }
                            }
                            }
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {bar.toString().length > 0 && bar && (  // Only show ❌ when there's text
                            <TouchableOpacity
                                style={styles.inputIcon}
                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Pound/inch² (psi)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={psi}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                    handlePsiChange(text);
                                }
                            }}
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {psi && psi.toString().length > 0 && (  // Only show ❌ when there's text
                            <TouchableOpacity
                                style={styles.inputIcon}
                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Atmosphere (atm)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={atm}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                }
                                handleAtmChange(text);
                            }
                            }
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {atm && atm.toString().length > 0 && (  // Only show ❌ when there's text
                            <TouchableOpacity
                                style={styles.inputIcon}
                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Mercury (mmHg)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={mmHg}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                }
                                handleMmHgChange(text);
                            }
                            }
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {mmHg && mmHg.toString().length > 0 && (  // Only show ❌ when there's text
                            <TouchableOpacity
                                style={styles.inputIcon}
                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>KiloPascal (kPa)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={kPa}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                }
                                handleKPaChange(text);
                            }
                            }
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {kPa && kPa.toString().length > 0 && (  // Only show ❌ when there's text
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
