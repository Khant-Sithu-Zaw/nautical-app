import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "../../style/styles";
import Layout from "../Layout";
import { numberRegex, } from "../../utils/constants";
import { formatNumber } from "../../utils/methods";
export default function VolumeConverter() {
    const [liters, setLiters] = useState("");
    const [cubicMeters, setCubicMeters] = useState("");
    const [gallonsUS, setGallonsUS] = useState("");
    const [barrels, setBarrels] = useState("");

    const resetAll = () => {
        setLiters("");
        setCubicMeters("");
        setGallonsUS("");
        setBarrels("");
    };

    const handleLitersChange = (value) => {
        setLiters(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            setCubicMeters(formatNumber(num / 1000));                // 1 m³ = 1000 L
            setGallonsUS(formatNumber(num / 3.78541));               // 1 US gal = 3.78541 L
            setBarrels(formatNumber(num / 158.987));                 // 1 barrel = 158.987 L
        } else {

            setCubicMeters("");
            setGallonsUS("");
            setBarrels("");
        }
    };

    const handleCubicMetersChange = (value) => {
        setCubicMeters(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const litersVal = num * 1000;
            setLiters(formatNumber(litersVal));
            setGallonsUS(formatNumber(litersVal / 3.78541));

            setBarrels(formatNumber(litersVal / 158.987));
        } else {
            setLiters("");

            setGallonsUS("");
            setBarrels("");
        }
    };

    const handleGallonsUSChange = (value) => {
        setGallonsUS(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const litersVal = num * 3.78541;
            setLiters(formatNumber(litersVal));
            setCubicMeters(formatNumber(litersVal / 1000));

            setBarrels(formatNumber(litersVal / 158.987));
        } else {
            setLiters("");
            setCubicMeters("");

            setBarrels("");
        }
    };


    const handleBarrelsChange = (value) => {
        setBarrels(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const litersVal = num * 158.987;
            setLiters(formatNumber(litersVal));
            setCubicMeters(formatNumber(litersVal / 1000));
            setGallonsUS(formatNumber(litersVal / 3.78541));

        } else {
            setLiters("");
            setCubicMeters("");
            setGallonsUS("");

        }
    };

    return (
        <Layout
            bannerContent={
                <View>
                    <Image source={require("../../../assets/images/volumeIcon.png")}
                        style={[
                            styles.converterImage,

                        ]} />
                    <Text style={[
                        styles.converterTitle,

                    ]}>Volume Converter</Text>
                </View>
            }
            mainContent={
                <View style={[styles.flexBox]}>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Liters (l)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={liters}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                    handleLitersChange(text);
                                }
                            }
                            }
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {liters && liters.toString().length > 0 && (  // Only show ❌ when there's text
                            <TouchableOpacity
                                style={styles.inputIcon}
                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Cubic Meters (m³)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={cubicMeters}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                    handleCubicMetersChange(text);
                                }
                            }}
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {cubicMeters && cubicMeters.toString().length > 0 && (  // Only show ❌ when there's text
                            <TouchableOpacity
                                style={styles.inputIcon}
                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>US Gallon (gal)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={gallonsUS}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                }
                                handleGallonsUSChange(text);
                            }
                            }
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {gallonsUS && gallonsUS.toString().length > 0 && (  // Only show ❌ when there's text
                            <TouchableOpacity
                                style={styles.inputIcon}
                                onPress={resetAll}
                            >
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem]}>
                        <Text style={[styles.label]}>Barrels (bbl)</Text>
                    </View>
                    <View style={[styles.rightItem]}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Enter value"
                            keyboardType="decimal-pad"
                            value={barrels}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                }
                                handleBarrelsChange(text);
                            }
                            }
                            placeholderTextColor="#bfbebeff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {barrels && barrels.toString().length > 0 && (  // Only show ❌ when there's text
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
