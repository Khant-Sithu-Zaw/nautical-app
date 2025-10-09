import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "../../style/styles";
import Layout from "../Layout";
import { numberRegex, } from "../../utils/constants";
import { formatNumber } from "../../utils/methods";
export default function WeightConverter() {
    const [metricTon, setMetricTon] = useState("");
    const [longTon, setLongTon] = useState("");
    const [shortTon, setShortTon] = useState("");
    const [kilogram, setKilogram] = useState("");
    const [pound, setPound] = useState("");

    const resetAll = () => {
        setMetricTon("");
        setLongTon("");
        setShortTon("");
        setKilogram("");
        setPound("");
    };

    const handleMetricTonChange = (value) => {
        setMetricTon(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            setLongTon(formatNumber(num * 0.98420653));  // 1 MT = 0.98420653 LT
            setShortTon(formatNumber(num * 1.10231131)); // 1 MT = 1.10231131 ST
            setKilogram(formatNumber(num * 1000));       // 1 MT = 1000 kg
            setPound(formatNumber(num * 2204.62262185)); // 1 MT = 2204.62262185 lb
        } else {

            setLongTon("");
            setShortTon("");
            setKilogram("");
            setPound("");
        }
    };

    const handleLongTonChange = (value) => {
        setLongTon(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const mt = num / 0.98420653;
            setMetricTon(formatNumber(mt));
            setShortTon(formatNumber(mt * 1.10231131));
            setKilogram(formatNumber(mt * 1000));
            setPound(formatNumber(mt * 2204.62262185));
        } else {
            setMetricTon("");

            setShortTon("");
            setKilogram("");
            setPound("");
        }
    };

    const handleShortTonChange = (value) => {
        setShortTon(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const mt = num / 1.10231131;
            setMetricTon(formatNumber(mt));
            setLongTon(formatNumber(mt * 0.98420653));
            setKilogram(formatNumber(mt * 1000));
            setPound(formatNumber(mt * 2204.62262185));
        } else {
            setMetricTon("");
            setLongTon("");

            setKilogram("");
            setPound("");
        }
    };

    const handleKilogramChange = (value) => {
        setKilogram(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const mt = num / 1000;
            setMetricTon(formatNumber(mt));
            setLongTon(formatNumber(mt * 0.98420653));
            setShortTon(formatNumber(mt * 1.10231131));
            setPound(formatNumber(num * 2.20462262185));
        } else {
            setMetricTon("");
            setLongTon("");
            setShortTon("");

            setPound("");
        }
    };

    const handlePoundChange = (value) => {
        setPound(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const kg = num / 2.20462262185;
            const mt = kg / 1000;
            setMetricTon(formatNumber(mt));
            setLongTon(formatNumber(mt * 0.98420653));
            setShortTon(formatNumber(mt * 1.10231131));
            setKilogram(formatNumber(kg));
        } else {
            setMetricTon("");
            setLongTon("");
            setShortTon("");
            setKilogram("");

        }
    };

    return (
        <Layout
            bannerContent={
                <View>
                    <Image source={require("../../../assets/images/weightIcon.png")}
                        style={[
                            styles.converterImage,

                        ]} />
                    <Text style={[
                        styles.converterTitle,

                    ]}>Weight Converter</Text>
                </View>
            }
            mainContent={
                <View style={[styles.flexBox]}>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Metric Ton (MT)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={metricTon}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                    handleMetricTonChange(text);
                                }
                            }
                            }
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {metricTon.length > 0 && (  // Only show ❌ when there's text
                            <TouchableOpacity
                                style={styles.inputIcon}
                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Long Ton (LT)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={longTon}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                    handleLongTonChange(text);
                                }
                            }}
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {longTon.length > 0 && (  // Only show ❌ when there's text
                            <TouchableOpacity
                                style={styles.inputIcon}
                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Short Ton (ST)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={shortTon}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                }
                                handleShortTonChange(text);
                            }
                            }
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {shortTon.length > 0 && (  // Only show ❌ when there's text
                            <TouchableOpacity
                                style={styles.inputIcon}
                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Kilogram (kg)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={kilogram}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                }
                                handleKilogramChange(text);
                            }
                            }
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {kilogram.length > 0 && (  // Only show ❌ when there's text
                            <TouchableOpacity
                                style={styles.inputIcon}
                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Pound (lb)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={pound}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                }
                                handlePoundChange(text);
                            }
                            }
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {pound.length > 0 && (  // Only show ❌ when there's text
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
