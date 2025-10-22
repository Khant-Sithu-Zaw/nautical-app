import React, { useState } from "react";
import { View, Text, TextInput, Image } from "react-native";
import styles from "../../style/styles";
import Layout from "../Layout";
import { numberRegex, } from "../../utils/constants";
import { formatNumber } from "../../utils/methods"
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
        <Layout
            bannerContent={
                <View>
                    <Image source={require("../../../assets/images/speedIcon.png")}
                        style={[
                            styles.converterImage,

                        ]} />
                    <Text style={[
                        styles.converterTitle,

                    ]}>Speed Converter</Text>
                </View>
            }
            mainContent={
                <View style={[styles.flexBox]}>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Knots (KN)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={knots}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                    handleKnotsChange(text);
                                }
                            }
                            }
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {knots && knots.toString().length > 0 && (  // Only show ❌ when there's text
                            <TouchableOpacity
                                style={styles.inputIcon}
                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Kilometer per hour (km/h)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={kmh}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                    handleKmhChange(text);
                                }
                            }}
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {kmh && kmh.toString().length > 0 && (  // Only show ❌ when there's text
                            <TouchableOpacity
                                style={styles.inputIcon}
                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Mile per hour (mph)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={mph}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                }
                                handleMphChange(text);
                            }
                            }
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {mph && mph.toString().length > 0 && (  // Only show ❌ when there's text
                            <TouchableOpacity
                                style={styles.inputIcon}
                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Meter per second (ms)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={ms}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                }
                                handleMsChange(text);
                            }
                            }
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {ms && ms.toString().length > 0 && (  // Only show ❌ when there's text
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
