import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "../../style/styles";
import Layout from "../Layout";
import { numberRegex, } from "../../utils/constants";
import { formatNumber } from "../../utils/methods"
export default function PowerConverter() {
    const [kW, setKW] = useState("");
    const [hp, setHP] = useState("");
    const [MW, setMW] = useState("");
    const [btu, setBTU] = useState("");

    const resetAll = () => {
        setKW("");
        setHP("");
        setMW("");
        setBTU("");
    };

    const handleKWChange = (value) => {
        setKW(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            setHP(formatNumber(num * 1.34102));       // kW → HP
            setMW(formatNumber(num / 1000));         // kW → MW
            setBTU(formatNumber(num * 3412.142));     // kW → BTU/h
        } else {

            setHP("");
            setMW("");
            setBTU("");
        }
    };

    const handleHPChange = (value) => {
        setHP(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const kWVal = num / 1.34102;
            setKW(formatNumber(kWVal));
            setMW(formatNumber(kWVal / 1000));
            setBTU(formatNumber(kWVal * 3412.142));
        } else {
            setKW("");
            setMW("");
            setBTU("");
        }
    };

    const handleMWattChange = (value) => {
        setMW(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const kWVal = num * 1000;                 // MW → kW
            setKW(formatNumber(kWVal));
            setHP(formatNumber(kWVal * 1.34102));
            setBTU(formatNumber(kWVal * 3412.142));
        } else {
            setKW("");
            setHP("");
            setBTU("");
        }
    };

    const handleBTUChange = (value) => {
        setBTU(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const kWVal = num / 3412.142;
            setKW(formatNumber(kWVal));
            setHP(formatNumber(kWVal * 1.34102));
            setMW(formatNumber(kWVal / 1000));
        } else {
            setKW("");
            setHP("");
            setMW("");
        }
    };

    return (
        <Layout
            bannerContent={
                <View>
                    <Image source={require("../../../assets/images/energyIcon.png")}
                        style={[
                            styles.converterImage,

                        ]} />
                    <Text style={[
                        styles.converterTitle,

                    ]}>Energy Converter</Text>
                </View>
            }
            mainContent={
                <View style={[styles.flexBox]}>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>KiloWatt (kW)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={kW}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                    handleKWChange(text);
                                }
                            }
                            }
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {kW && kW.toString().length > 0 && (  // Only show ❌ when there's text
                            <TouchableOpacity

                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Horse Power (Hp)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={hp}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                    handleHPChange(text);
                                }
                            }}
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {hp && hp.toString().length > 0 && (  // Only show ❌ when there's text
                            <TouchableOpacity
                                style={styles.inputIcon}
                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>MegaWatt (MW)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={MW}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                }
                                handleMWattChange(text);
                            }
                            }
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {MW && MW.toString().length > 0 && (  // Only show ❌ when there's text
                            <TouchableOpacity
                                style={styles.inputIcon}
                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>British Thermal </Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter BTU value"
                            keyboardType="decimal-pad"
                            value={btu}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                }
                                handleBTUChange(text);
                            }
                            }
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {btu && btu.toString().length > 0 && (  // Only show ❌ when there's text
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
