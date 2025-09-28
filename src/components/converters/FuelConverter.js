import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../../style/styles";

export default function FuelConverter({ numberRegex, formatNumber }) {
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
        <View style={styles.inputForm}>


            {/* Liters */}
            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="Liters"
                    keyboardType="decimal-pad"
                    value={liters}
                    maxLength={8}
                    placeholderTextColor="#9b9898ff"
                    onChangeText={(text) => {
                        if (numberRegex.test(text)) handleLitersChange(text);
                    }}
                />
                <TouchableOpacity style={styles.inputIcon} onPress={resetAll}>
                    <Text style={styles.inputIconText}>L</Text>
                </TouchableOpacity>
            </View>

            {/* Cubic Meters */}
            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="CubicMeter"
                    keyboardType="decimal-pad"
                    value={cubicMeters}
                    maxLength={8}
                    placeholderTextColor="#9b9898ff"
                    onChangeText={(text) => {
                        if (numberRegex.test(text)) handleCubicMetersChange(text);
                    }}
                />
                <TouchableOpacity style={styles.inputIcon} onPress={resetAll}>
                    <Text style={styles.inputIconText}>m³</Text>
                </TouchableOpacity>
            </View>

            {/* Gallons US */}
            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="US Gallons"
                    keyboardType="decimal-pad"
                    value={gallonsUS}
                    maxLength={8}
                    placeholderTextColor="#9b9898ff"
                    onChangeText={(text) => {
                        if (numberRegex.test(text)) handleGallonsUSChange(text);
                    }}
                />
                <TouchableOpacity style={styles.inputIcon} onPress={resetAll}>
                    <Text style={styles.inputIconText}>gal</Text>
                </TouchableOpacity>
            </View>

            {/* Barrels */}
            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="Barrels"
                    keyboardType="decimal-pad"
                    value={barrels}
                    maxLength={8}
                    placeholderTextColor="#9b9898ff"
                    onChangeText={(text) => {
                        if (numberRegex.test(text)) handleBarrelsChange(text);
                    }}
                />
                <TouchableOpacity style={styles.inputIcon} onPress={resetAll}>
                    <Text style={styles.inputIconText}>bbl</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
