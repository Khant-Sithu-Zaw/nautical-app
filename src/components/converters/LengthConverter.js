import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "../../style/styles";
import Layout from "../Layout";
import { numberRegex, } from "../../utils/constants";
import { formatNumber } from "../../utils/methods"
export default function LengthConverter() {
    const [meter, setMeter] = useState("");
    const [fathom, setFathom] = useState("");
    const [feet, setFeet] = useState("");
    const [cable, setCable] = useState("");
    const resetAll = () => {
        setMeter("");
        setFathom("");
        setFeet("");
        setCable("")
    };
    const handleMeterChange = (value) => {
        setMeter(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            setFathom(formatNumber(num / 1.8288));   // 1 fathom = 1.8288 m
            setFeet(formatNumber(num * 3.28084));    // 1 m = 3.28084 ft
            setCable(formatNumber(num / 185.2));     // 1 cable = 185.2 m
        } else {

            setFathom("");
            setFeet("");
            setCable("")
        }
    };
    const handleFathomChange = (value) => {
        setFathom(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const meters = num * 1.8288;
            setMeter(formatNumber(meters));
            setFeet(formatNumber(meters * 3.28084));
            setCable(formatNumber(meters / 185.2));
        } else {
            setMeter("");

            setFeet("");
            setCable("")
        }
    };
    const handleFeetChange = (value) => {
        setFeet(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const meters = num / 3.28084;
            setMeter(formatNumber(meters));
            setFathom(formatNumber(meters / 1.8288));
            setCable(formatNumber(meters / 185.2));
        } else {
            setMeter("");
            setFathom("");

            setCable("")
        }
    };
    const handleCableChange = (value) => {
        setCable(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const meters = num * 185.2;
            setMeter(formatNumber(meters));
            setFathom(formatNumber(meters / 1.8288));
            setFeet(formatNumber(meters * 3.28084));
        } else {
            setMeter("");
            setFathom("");
            setFeet("");

        }
    };
    return (
        <Layout
            bannerContent={
                <View>
                    <Image source={require("../../../assets/images/depthIcon.png")}
                        style={[
                            styles.converterImage,

                        ]} />
                    <Text style={[
                        styles.converterTitle,

                    ]}>Length Converter</Text>
                </View>
            }
            mainContent={
                <View style={[styles.flexBox]}>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Meters (m)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={meter}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                    handleMeterChange(text);
                                }
                            }
                            }
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {meter && meter.toString().length > 0 && (  // Only show ❌ when there's text
                            <TouchableOpacity
                                style={styles.inputIcon}
                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Fathom (ftm)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={fathom}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                    handleFathomChange(text);
                                }
                            }}
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {fathom && fathom.toString().length > 0 && (  // Only show ❌ when there's text
                            <TouchableOpacity
                                style={styles.inputIcon}
                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Feet (ft)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={feet}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                    handleFeetChange(text);
                                }

                            }
                            }
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {feet && feet.toString().length > 0 && (  // Only show ❌ when there's text
                            <TouchableOpacity
                                style={styles.inputIcon}
                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Cable (cab)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={cable}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                    handleCableChange(text);
                                }

                            }
                            }
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {cable && cable.toString().length > 0 && (  // Only show ❌ when there's text
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
