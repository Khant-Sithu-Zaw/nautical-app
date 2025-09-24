import React, { useState } from "react";
import { View, Text, TextInput, Image } from "react-native";
import styles from "../style/styles";
import Layout from "../components/Layout";
export default function ConverterScreen() {
    const [fah, setFah] = useState("");
    const [cel, setCel] = useState("");

    const [knots, setKnots] = useState("");
    const [kmh, setKmh] = useState("");

    const [nm, setNm] = useState("");
    const [km, setKm] = useState("");
    // Temperature
    const handleFahChange = (value) => {
        if (isNaN(Number(value))) return; // Prevent non-numeric input
        setFah(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            setCel(((num - 32) * 5 / 9).toFixed(2));
        } else {
            setCel("");
        }
    };

    const handleCelChange = (value) => {
        if (isNaN(Number(value))) return;
        setCel(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            setFah((num * 9 / 5 + 32).toFixed(2));
        } else {
            setFah("");
        }
    };

    // Speed
    const handleKnotsChange = (value) => {
        if (isNaN(Number(value))) return;
        setKnots(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            setKmh((num * 1.852).toFixed(2));
        } else {
            setKmh("");
        }
    };

    const handleKmhChange = (value) => {
        if (isNaN(Number(value))) return;
        setKmh(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            setKnots((num / 1.852).toFixed(2));
        } else {
            setKnots("");
        }
    };

    // Distance
    const handleNmChange = (value) => {
        if (isNaN(Number(value))) return;
        setNm(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            setKm((num * 1.852).toFixed(2));
        } else {
            setKm("");
        }
    };

    const handleKmChange = (value) => {
        if (isNaN(Number(value))) return;
        setKm(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            setNm((num / 1.852).toFixed(2));
        } else {
            setNm("");
        }
    };
    return (
        <Layout
            bannerContent={<View>
                <Image
                    source={require("../../assets/images/conversion.jpg")}
                    style={styles.bannerImage}
                />
            </View>}
            bodyContent={<View >
                <View>
                    <Text style={styles.contentTitle}>🔄 Easy Unit Converter ToolBox</Text>
                    <View
                        style={
                            styles.titleLine
                        }
                    />
                </View>
                <View style={styles.inputForm}>
                    <Text style={styles.coverterTitle}>❶ Temperature Conversion</Text>
                    <View style={[styles.rhtSideInput, styles.flexBox]}>

                        <TextInput
                            style={[styles.textInput, styles.inputUnit]}
                            placeholder="Fahrenheit"
                            keyboardType="numeric"
                            value={fah}
                            onChangeText={handleFahChange}
                            placeholderTextColor="#9b9898ff"
                            maxLength={9}
                        />
                        <Text style={styles.inputIcon}>℉</Text>
                    </View>
                    <View style={[styles.rhtSideInput, styles.flexBox]}>

                        <TextInput
                            style={[styles.textInput, styles.inputUnit]}
                            placeholder="Celsius"
                            keyboardType="numeric"
                            value={cel}
                            onChangeText={handleCelChange}
                            placeholderTextColor="#9b9898ff"
                            maxLength={9}
                        />
                        <Text style={styles.inputIcon}>℃</Text>
                    </View>
                    <Text style={styles.coverterTitle}>❷ Speed Conversion</Text>
                    <View style={[styles.rhtSideInput, styles.flexBox]}>

                        <TextInput
                            style={[styles.textInput, styles.inputUnit]}
                            placeholder="Knots"
                            keyboardType="numeric"
                            value={knots}
                            onChangeText={handleKnotsChange}
                            placeholderTextColor="#9b9898ff"
                            maxLength={9}
                        />
                        <Text style={styles.inputIcon}>kn</Text>
                    </View>
                    <View style={[styles.rhtSideInput, styles.flexBox]}>
                        <TextInput
                            style={[styles.textInput, styles.inputUnit]}
                            placeholder="Km/hour"
                            keyboardType="numeric"
                            value={kmh}
                            onChangeText={handleKmhChange}
                            placeholderTextColor="#9b9898ff"
                            maxLength={9}
                        />
                        <Text style={styles.inputIcon}>km/h</Text>
                    </View>
                    <Text style={styles.coverterTitle}>❸ Distance Conversion</Text>
                    <View style={[styles.rhtSideInput, styles.flexBox]}>

                        <TextInput
                            style={[styles.textInput, styles.inputUnit]}
                            placeholder="N Miles"
                            keyboardType="numeric"
                            value={nm}
                            onChangeText={handleNmChange}
                            placeholderTextColor="#9b9898ff"
                            maxLength={9}
                        />
                        <Text style={styles.inputIcon}>NM</Text>
                    </View>
                    <View style={[styles.rhtSideInput, styles.flexBox]}>

                        <TextInput
                            style={[styles.textInput, styles.inputUnit]}
                            placeholder="Kilometers"
                            keyboardType="numeric"
                            value={km}
                            onChangeText={handleKmChange}
                            placeholderTextColor="#9b9898ff"
                            maxLength={9}
                        />
                        <Text style={styles.inputIcon}>km</Text>
                    </View>
                </ View>
            </ View>}
        />
    );
}




