import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "../../style/styles";
import Layout from "../Layout";
import { numberRegex, } from "../../utils/constants";
import { formatNumber } from "../../utils/methods"
export default function PowerConverter() {
    const [kW, setKW] = useState("");
    const [hp, setHP] = useState("");
    const [joules, setJoules] = useState("");
    const [btu, setBTU] = useState("");

    const resetAll = () => {
        setKW("");
        setHP("");
        setJoules("");
        setBTU("");
    };

    const handleKWChange = (value) => {
        setKW(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            setHP(formatNumber(num * 1.34102));       // kW → HP
            setJoules(formatNumber(num * 1000));      // kW → Joules/s
            setBTU(formatNumber(num * 3412.142));     // kW → BTU/h
        } else {

            setHP("");
            setJoules("");
            setBTU("");
        }
    };

    const handleHPChange = (value) => {
        setHP(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const kWVal = num / 1.34102;
            setKW(formatNumber(kWVal));
            setJoules(formatNumber(kWVal * 1000));
            setBTU(formatNumber(kWVal * 3412.142));
        } else {
            setKW("");

            setJoules("");
            setBTU("");
        }
    };

    const handleJoulesChange = (value) => {
        setJoules(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const kWVal = num / 1000;
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
            setJoules(formatNumber(kWVal * 1000));
        } else {
            setKW("");
            setHP("");
            setJoules("");

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
                        {kW.length > 0 && (  // Only show ❌ when there's text
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
                        {hp.length > 0 && (  // Only show ❌ when there's text
                            <TouchableOpacity
                                style={styles.inputIcon}
                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Joules per second (j/s)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={joules}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                }
                                handleJoulesChange(text);
                            }
                            }
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {joules.length > 0 && (  // Only show ❌ when there's text
                            <TouchableOpacity
                                style={styles.inputIcon}
                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>British Thermal Unit (BTU)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
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
                        {btu.length > 0 && (  // Only show ❌ when there's text
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
