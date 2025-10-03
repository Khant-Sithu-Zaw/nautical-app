import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView } from "react-native";

import styles from "../../style/styles";


export default function PressureConverter({ numberRegex, formatNumber }) {
    const [bar, setBar] = useState("");
    const [psi, setPsi] = useState("");
    const [atm, setAtm] = useState("");
    const [mmHg, setMmHg] = useState("");
    const [kPa, setKPa] = useState("");

    const resetAll = () => {
        setBar("");
        setPsi("");
        setAtm("");
        setMmHg("");
        setKPa("");
    };

    const handleBarChange = (value) => {
        setBar(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            setPsi(formatNumber(num * 14.5038));     // 1 bar = 14.5038 psi
            setAtm(formatNumber(num * 0.986923));    // 1 bar = 0.986923 atm
            setMmHg(formatNumber(num * 750.062));    // 1 bar = 750.062 mmHg
            setKPa(formatNumber(num * 100));         // 1 bar = 100 kPa
        } else {

            setPsi("");
            setAtm("");
            setMmHg("");
            setKPa("");
        }
    };

    const handlePsiChange = (value) => {
        setPsi(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const barVal = num / 14.5038;
            setBar(formatNumber(barVal));
            setAtm(formatNumber(barVal * 0.986923));
            setMmHg(formatNumber(barVal * 750.062));
            setKPa(formatNumber(barVal * 100));
        } else {
            setBar("");

            setAtm("");
            setMmHg("");
            setKPa("");
        }
    };

    const handleAtmChange = (value) => {
        setAtm(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const barVal = num / 0.986923;
            setBar(formatNumber(barVal));
            setPsi(formatNumber(barVal * 14.5038));
            setMmHg(formatNumber(barVal * 750.062));
            setKPa(formatNumber(barVal * 100));
        } else {
            setBar("");
            setPsi("");

            setMmHg("");
            setKPa("");
        }
    };

    const handleMmHgChange = (value) => {
        setMmHg(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const barVal = num / 750.062;
            setBar(formatNumber(barVal));
            setPsi(formatNumber(barVal * 14.5038));
            setAtm(formatNumber(barVal * 0.986923));
            setKPa(formatNumber(barVal * 100));
        } else {
            setBar("");
            setPsi("");
            setAtm("");

            setKPa("");
        }
    };

    const handleKPaChange = (value) => {
        setKPa(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            const barVal = num / 100;
            setBar(formatNumber(barVal));
            setPsi(formatNumber(barVal * 14.5038));
            setAtm(formatNumber(barVal * 0.986923));
            setMmHg(formatNumber(barVal * 750.062));
        } else {
            setBar("");
            setPsi("");
            setAtm("");
            setMmHg("");

        }
    };

    return (
        <View style={styles.inputForm}>

            {/* Bar */}
            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="Bar"
                    keyboardType="decimal-pad"
                    value={bar}
                    placeholderTextColor="#9b9898ff"
                    maxLength={8}
                    onChangeText={(text) => {
                        if (numberRegex.test(text)) handleBarChange(text);
                    }}
                />
                <TouchableOpacity style={styles.inputIcon} onPress={resetAll}>
                    <Text style={styles.inputIconText}>bar</Text>
                </TouchableOpacity>
            </View>

            {/* psi */}
            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="lb/inch²"
                    keyboardType="decimal-pad"
                    value={psi}
                    placeholderTextColor="#9b9898ff"
                    maxLength={8}
                    onChangeText={(text) => {
                        if (numberRegex.test(text)) handlePsiChange(text);
                    }}
                />
                <TouchableOpacity style={styles.inputIcon} onPress={resetAll}>
                    <Text style={styles.inputIconText}>psi</Text>
                </TouchableOpacity>
            </View>

            {/* atm */}
            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="atmosphere"
                    keyboardType="decimal-pad"
                    value={atm}
                    placeholderTextColor="#9b9898ff"
                    maxLength={8}
                    onChangeText={(text) => {
                        if (numberRegex.test(text)) handleAtmChange(text);
                    }}
                />
                <TouchableOpacity style={styles.inputIcon} onPress={resetAll}>
                    <Text style={styles.inputIconText}>atm</Text>
                </TouchableOpacity>
            </View>

            {/* mmHg */}
            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="mmHg 🌡"
                    keyboardType="decimal-pad"
                    value={mmHg}
                    maxLength={8}
                    placeholderTextColor="#9b9898ff"
                    onChangeText={(text) => {
                        if (numberRegex.test(text)) handleMmHgChange(text);
                    }}
                />
                <TouchableOpacity style={styles.inputIcon} onPress={resetAll}>
                    <Text style={styles.inputIconText}>mHg</Text>
                </TouchableOpacity>
            </View>

            {/* kPa */}
            <View style={[styles.SideInput, styles.flexBox]}>
                <TextInput
                    style={[styles.textInput, styles.inputUnit]}
                    placeholder="kiloPascal"
                    keyboardType="decimal-pad"
                    value={kPa}
                    placeholderTextColor="#9b9898ff"
                    maxLength={8}
                    onChangeText={(text) => {
                        if (numberRegex.test(text)) handleKPaChange(text);
                    }}
                />
                <TouchableOpacity style={styles.inputIcon} onPress={resetAll}>
                    <Text style={styles.inputIconText}>kPa</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
