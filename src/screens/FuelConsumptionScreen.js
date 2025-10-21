import React, { useState } from 'react'
import Layout from '../components/Layout'
import { View, Text, TouchableOpacity, TextInput, Modal, Image, Keyboard, ScrollView } from "react-native";
import dropdownStyles from "../style/pickupstyle";
import { scale, moderateScale } from '../utils/scale';
import styles from "../style/styles";
import { fuelUnit, numberRegex } from '../utils/constants';
import Card from "../components/Card";
import DropdownPicker from '../components/DropdownPicker';
export default function FuelConsumptionScreen() {
    const [speed, setSpeed] = useState("");
    const [distance, setDistance] = useState("");
    const [rate, setRate] = useState("");
    const [price, setPrice] = useState("");
    const [selectedUnit, setSelectedUnit] = useState("(kg/h)");
    const [showCountModal, setShowCountModal] = useState(false);
    const [cost, setCost] = useState(false);
    const [fuel, setFuel] = useState(false);

    const calculateCost = () => {
        Keyboard.dismiss();
        if (speed === "" || distance === "" || rate === "" || price === "" || speed.trim() === "" || distance.trim() === "" || rate.trim() === "" || price.trim() === "") {
            alert("Please fill all the inputs.");
            return;
        }
        const dist = parseFloat(distance);
        const spd = parseFloat(speed);
        const rateVal = parseFloat(rate);
        const priceVal = parseFloat(price);

        if (isNaN(dist) || isNaN(spd) || isNaN(rateVal) || isNaN(priceVal) || spd === 0 || dist === 0 || rateVal === 0 || priceVal === 0) {
            alert("Please enter only digits greater than 0.");
            return;
        }
        const timeHours = dist / spd; // voyage time in hours

        let fuelMT = 0;

        if (selectedUnit === "(kg/h)") {
            fuelMT = (rateVal * timeHours) / 1000; // kg/h → MT
        } else if (selectedUnit === "(MT/day)") {
            fuelMT = (rateVal / 24 * timeHours);   // MT/day → MT
        } else {
            alert("Selected unit not supported.");
            return;
        }
        setFuel(fuelMT.toFixed(2));
        const totalCost = fuelMT.toFixed(2) * priceVal;
        setCost(totalCost.toFixed(2));
    };

    return (
        <Layout
            mainContent={
                <View style={[styles.flexBox]}>
                    {/* Distance Input */}

                    <View style={[styles.leftItem, styles.inputLabel]}>
                        <Text style={styles.label}>Distance (NM)</Text>
                    </View>
                    <View style={[styles.rightItem, styles.inputContainer]}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter nautical miles"
                            keyboardType="decimal-pad"
                            value={distance}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                }
                                setDistance(text);
                            }}
                            placeholderTextColor="#9b9898ff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {distance && (
                            <TouchableOpacity onPress={() => setDistance("")}>
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem, styles.inputLabel]}>
                        <Text style={styles.label}>Speed (knots)</Text>
                    </View>
                    <View style={[styles.rightItem, styles.inputContainer]}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter vessel speed"
                            keyboardType="decimal-pad"
                            value={speed}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                }
                                setSpeed(text);
                            }}

                            placeholderTextColor="#9b9898ff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {speed && (
                            <TouchableOpacity onPress={() => setSpeed("")}>
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem, styles.inputLabel]}>
                        <Text style={styles.label}>Unit of Rate</Text>
                    </View>
                    <View style={[styles.rightItem, styles.inputContainer]}>
                        <DropdownPicker
                            options={fuelUnit}
                            selected={selectedUnit}
                            onSelect={(opt) => setSelectedUnit(opt)}
                        />
                    </View>
                    <View style={[styles.leftItem, styles.inputLabel]}>
                        <Text style={styles.label}>Rate Value</Text>
                    </View>
                    <View style={[styles.rightItem, styles.inputContainer]}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Fuel Consumption Rate"
                            keyboardType="decimal-pad"
                            value={rate}
                            maxLength={8}
                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                }
                                setRate(text);
                            }}

                            placeholderTextColor="#9b9898ff"
                        />
                        {rate && (
                            <TouchableOpacity onPress={() => setRate("")}>
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem, styles.inputLabel]}>
                        <Text style={styles.label}>Fuel Price</Text>
                    </View>
                    <View style={[styles.rightItem, styles.inputContainer]}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Price per Metric Ton"
                            keyboardType="decimal-pad"
                            value={price}
                            maxLength={8}

                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                }
                                setPrice(text);
                            }}
                            placeholderTextColor="#9b9898ff"
                        />
                        {price && (
                            <TouchableOpacity onPress={() => setPrice("")}>
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <Card
                        style={styles.cardExtend}>
                        <Text
                            style={[
                                styles.cardText,

                            ]}
                        >
                            Estimated Fuel Total Cost
                        </Text>
                        <Text style={[
                            styles.resultText,
                        ]}>  {cost || "--"}
                        </Text>
                        <Text
                            style={[
                                styles.cardText,

                            ]}
                        >
                            Estimated Fuel Amount for Voyage
                        </Text>
                        <Text style={[
                            styles.resultText,
                        ]}>{fuel || "--"} MT
                        </Text>
                    </Card>


                    <TouchableOpacity style={styles.calculateBtn} activeOpacity={0.8} onPress={calculateCost}>
                        <Text style={styles.calculateTxt}>Calculate Cost</Text>
                    </TouchableOpacity>
                </ View>
            }
        />
    )
}
