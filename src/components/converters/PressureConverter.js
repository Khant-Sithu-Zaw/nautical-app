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
            setBar(num);
            setPsi(formatNumber(num * 14.5038));
            setAtm(formatNumber(num * 0.986923));
            setMmHg(formatNumber(num * 750.062));
            setKPa(formatNumber(num * 100));
        } else {

            setPsi("");
            setAtm("");
            setMmHg("");
            setKPa("");
        }
    };

    const handlePsiChange = (value) => {
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const gaugeBar = num / 14.5038; // psi → gauge bar (no +1)
            setBar(formatNumber(gaugeBar));
            setPsi(num);
            setAtm(formatNumber(gaugeBar * 0.986923));
            setMmHg(formatNumber(gaugeBar * 750.062));
            setKPa(formatNumber(gaugeBar * 100));
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
            const gaugeBar = num / 0.986923; // atm → gauge bar
            setBar(formatNumber(gaugeBar));
            setPsi(formatNumber(gaugeBar * 14.5038));
            setAtm(num);
            setMmHg(formatNumber(gaugeBar * 750.062));
            setKPa(formatNumber(gaugeBar * 100));
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
            const gaugeBar = num / 750.062; // mmHg → gauge bar
            setBar(formatNumber(gaugeBar));
            setPsi(formatNumber(gaugeBar * 14.5038));
            setAtm(formatNumber(gaugeBar * 0.986923));
            setMmHg(num);
            setKPa(formatNumber(gaugeBar * 100));
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
            const gaugeBar = num / 100; // kPa → gauge bar
            setBar(formatNumber(gaugeBar));
            setPsi(formatNumber(gaugeBar * 14.5038));
            setAtm(formatNumber(gaugeBar * 0.986923));
            setMmHg(formatNumber(gaugeBar * 750.062));
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
                        <Text style={[styles.label]}>Bar</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={bar}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                    handleBarChange(text);
                                }
                            }}

                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {bar.toString().length > 0 && (
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
                        {psi.toString().length > 0 && (// Only show ❌ when there's text
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
                        {atm.toString().length > 0 && (  // Only show ❌ when there's text
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
                        {mmHg.toString().length > 0 && (  // Only show ❌ when there's text
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
                        {kPa.toString().length > 0 && (  // Only show ❌ when there's text
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
