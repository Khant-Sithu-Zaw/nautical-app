import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../../style/styles";

export default function PowerConverter({ numberRegex, formatNumber }) {
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
        <View style={styles.inputForm}>

            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="kiloWatt"
                    keyboardType="decimal-pad"
                    value={kW}
                    maxLength={8}
                    placeholderTextColor="#9b9898ff"
                    onChangeText={(text) => {
                        if (numberRegex.test(text)) handleKWChange(text);
                    }}
                />
                <TouchableOpacity style={styles.inputIcon} onPress={resetAll}>
                    <Text style={styles.inputIconText}>kW</Text>
                </TouchableOpacity>
            </View>

            {/* HP */}
            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="🐎Power "
                    keyboardType="decimal-pad"
                    value={hp}
                    maxLength={8}
                    placeholderTextColor="#9b9898ff"
                    onChangeText={(text) => {
                        if (numberRegex.test(text)) handleHPChange(text);
                    }}
                />
                <TouchableOpacity style={styles.inputIcon} onPress={resetAll}>
                    <Text style={styles.inputIconText}>HP</Text>
                </TouchableOpacity>
            </View>

            {/* Joules */}
            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="Joules/sec"
                    keyboardType="decimal-pad"
                    value={joules}
                    maxLength={8}
                    placeholderTextColor="#9b9898ff"
                    onChangeText={(text) => {
                        if (numberRegex.test(text)) handleJoulesChange(text);
                    }}
                />
                <TouchableOpacity style={styles.inputIcon} onPress={resetAll}>
                    <Text style={styles.inputIconText}>J/s</Text>
                </TouchableOpacity>
            </View>

            {/* BTU */}
            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="BTU/hour"
                    keyboardType="decimal-pad"
                    value={btu}
                    maxLength={8}
                    placeholderTextColor="#9b9898ff"
                    onChangeText={(text) => {
                        if (numberRegex.test(text)) handleBTUChange(text);
                    }}
                />
                <TouchableOpacity style={styles.inputIcon} onPress={resetAll}>
                    <Text style={styles.inputIconText}>BTU</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
