import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../../style/styles";

export default function WeightConverter({ numberRegex, formatNumber }) {
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
        <View style={styles.inputForm}>


            {/* Metric Ton */}
            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="Metric Ton"
                    keyboardType="decimal-pad"
                    value={metricTon}
                    maxLength={8}
                    onChangeText={(text) => {
                        if (numberRegex.test(text)) handleMetricTonChange(text);
                    }}
                />
                <TouchableOpacity style={styles.inputIcon} onPress={resetAll}>
                    <Text style={styles.inputIconText}>MT</Text>
                </TouchableOpacity>
            </View>

            {/* Long Ton */}
            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="Long Ton"
                    keyboardType="decimal-pad"
                    value={longTon}
                    maxLength={8}
                    onChangeText={(text) => {
                        if (numberRegex.test(text)) handleLongTonChange(text);
                    }}
                />
                <TouchableOpacity style={styles.inputIcon} onPress={resetAll}>
                    <Text style={styles.inputIconText}>LT</Text>
                </TouchableOpacity>
            </View>

            {/* Short Ton */}
            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="Short Ton"
                    keyboardType="decimal-pad"
                    value={shortTon}
                    maxLength={8}
                    onChangeText={(text) => {
                        if (numberRegex.test(text)) handleShortTonChange(text);
                    }}
                />
                <TouchableOpacity style={styles.inputIcon} onPress={resetAll}>
                    <Text style={styles.inputIconText}>ST</Text>
                </TouchableOpacity>
            </View>

            {/* Kilogram */}
            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="Kilogram"
                    keyboardType="decimal-pad"
                    value={kilogram}
                    maxLength={8}
                    onChangeText={(text) => {
                        if (numberRegex.test(text)) handleKilogramChange(text);
                    }}
                />
                <TouchableOpacity style={styles.inputIcon} onPress={resetAll}>
                    <Text style={styles.inputIconText}>kg</Text>
                </TouchableOpacity>
            </View>

            {/* Pound */}
            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="Pound"
                    keyboardType="decimal-pad"
                    value={pound}
                    maxLength={8}
                    onChangeText={(text) => {
                        if (numberRegex.test(text)) handlePoundChange(text);
                    }}
                />
                <TouchableOpacity style={styles.inputIcon} onPress={resetAll}>
                    <Text style={styles.inputIconText}>lb</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
