import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "../../style/styles";
import Layout from "../Layout";
import { numberRegex, } from "../../utils/constants";
import { formatNumber } from "../../utils/methods"
export default function DistanceConverter() {
    const [nm, setNm] = useState("");
    const [km, setKm] = useState("");
    const [mile, setMile] = useState("");
    const resetAll = () => {
        setNm("");
        setKm("");
        setMile("");
    };

    const handleNmChange = (value) => {
        setNm(value);

        const num = parseFloat(value);
        if (!isNaN(num)) {
            setKm(formatNumber(num * 1.852));
            setMile(formatNumber(num * 1.15078));

        } else {
            setKm(""); setMile("");
        }
    };

    const handleKmChange = (value) => {
        setKm(value);

        const num = parseFloat(value);
        if (!isNaN(num)) {
            const nmVal = num / 1.852;
            setNm(formatNumber(nmVal));
            setMile(formatNumber(num * 0.621371));

        } else {
            setNm(""); setMile("");
        }
    };

    const handleMileChange = (value) => {
        setMile(value);

        const num = parseFloat(value);
        if (!isNaN(num)) {
            const nmVal = num / 1.15078;
            setNm(formatNumber(nmVal));
            setKm(formatNumber(num * 1.60934));

        } else {
            setNm(""); setKm("");
        }
    };


    return (
        <Layout
            bannerContent={
                <View>
                    <Image source={require("../../../assets/images/distanceIcon.png")}
                        style={[
                            styles.converterImage,

                        ]} />
                    <Text style={[
                        styles.converterTitle,

                    ]}>Distance Converter</Text>
                </View>
            }
            mainContent={
                <View style={[styles.flexBox]}>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Nautical Mile (NM)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={nm}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                    handleNmChange(text);
                                }
                            }
                            }
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {nm && nm.toString().length > 0 && (  // Only show ❌ when there's text
                            <TouchableOpacity
                                style={styles.inputIcon}
                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Kilometer (km)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={km}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                    handleKmChange(text);
                                }
                            }}
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {km && km.toString().length > 0 && (  // Only show ❌ when there's text
                            <TouchableOpacity
                                style={styles.inputIcon}
                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Mile (mile)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={mile}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                }
                                handleMileChange(text);
                            }
                            }
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {mile && mile.toString().length > 0 && (  // Only show ❌ when there's text
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
