import React, { useState } from 'react'
import Layout from '../components/Layout'
import { View, Text, TouchableOpacity, TextInput, Modal, Image, Keyboard, ScrollView } from "react-native";
import dropdownStyles from "../style/pickupstyle";
import { scale, moderateScale } from '../utils/scale';
import styles from "../style/styles";
import { fuelUnit, handleNumberChange } from '../utils/constants';
export default function FuelConsumptionScreen() {
    const [speed, setSpeed] = useState("");
    const [distance, setDistance] = useState("");
    const [rate, setRate] = useState("");
    const [price, setPrice] = useState("");
    const [selectedUnit, setSelectedUnit] = useState("(kg/h)");
    const [showCountModal, setShowCountModal] = useState(false);
    const [cost, setCost] = useState(false);
    const [fuel, setFuel] = useState(false);
    const [voyage, setVoyage] = useState(false);

    const calculateCost = () => {
        Keyboard.dismiss();

        const dist = parseFloat(distance);
        const spd = parseFloat(speed);
        const rateVal = parseFloat(rate);
        const priceVal = parseFloat(price);

        if (isNaN(dist) || isNaN(spd) || isNaN(rateVal) || isNaN(priceVal) || spd === 0) {
            alert("Please fill all inputs correctly.");
            return;
        }

        const timeHours = dist / spd; // voyage time in hours
        setVoyage(timeHours.toFixed(2));

        let fuelMT = 0;

        if (selectedUnit === "(kg/h)") {
            fuelMT = (rateVal * timeHours) / 1000; // kg/h → MT
        } else if (selectedUnit === "(MT/day)") {
            fuelMT = (rateVal / 24 * timeHours);   // MT/day → MT
        } else {
            alert("Selected unit not supported.");
            return;
        }
        const totalCost = fuelMT * priceVal;

        setFuel(fuelMT.toFixed(2));
        setCost(totalCost.toFixed(2));

    };

    return (
        <Layout
            bannerContent={
                <View>
                    <Image
                        source={require("../../assets/images/bunkering.jpg")}
                        style={styles.bannerImage}
                    />
                </View>
            }
            bodyContent={
                <View>
                    <View>
                        <Text style={styles.contentTitle}>⛽ Fuel Consumption Calculator</Text>
                        <View style={styles.titleLine} />
                    </View>
                    <View style={styles.inputForm}>

                        <View style={styles.leftInput}>
                            <Text style={styles.label}>Distance</Text>
                        </View>
                        <View style={[styles.rightInput, styles.relativeHolder]}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter distance in NM"
                                keyboardType="decimal-pad"
                                value={distance}
                                maxLength={8}
                                onChangeText={(text) => {
                                    const cleaned = handleNumberChange(text, "Distance");
                                    setDistance(cleaned);
                                }}

                                placeholderTextColor="#9b9898ff"

                            />
                        </View>

                        <View style={styles.leftInput}>
                            <Text style={styles.label}>Speed</Text>
                        </View>
                        <View style={[styles.rightInput, styles.relativeHolder]}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter speed in knots"
                                keyboardType="decimal-pad"
                                value={speed}
                                maxLength={8}
                                onChangeText={(text) => {
                                    const cleaned = handleNumberChange(text, "Speed");
                                    setSpeed(cleaned);
                                }}
                                placeholderTextColor="#9b9898ff"
                            />
                        </View>


                        <View style={[styles.leftInput, styles.flexBox]}>
                            <Text style={[styles.label, { marginRight: scale(5) }]}>Rate</Text>

                            <TouchableOpacity style={[dropdownStyles.customPicker, { paddingVertical: 0, paddingHorizontal: 0, flexDirection: "row", justifyContent: "space-between", borderWidth: 0 }]} onPress={() => setShowCountModal(true)}>
                                <Text style={[dropdownStyles.pickerText, { fontSize: moderateScale(10), color: selectedUnit ? "black" : "gray" }]}>
                                    {selectedUnit || "Select Conversion Category "}
                                </Text>
                                <Text style={{ fontSize: scale(9) }}>▼</Text>
                            </TouchableOpacity>

                            {/* Modal */}
                            <Modal visible={showCountModal} transparent animationType="fade" onRequestClose={() => setShowCountModal(false)}>
                                <TouchableOpacity style={dropdownStyles.modalOverlay} onPress={() => setShowCountModal(false)} activeOpacity={1}>
                                    <View style={dropdownStyles.modalContent}>
                                        <ScrollView>
                                            {fuelUnit.map((opt, i) => (
                                                <TouchableOpacity key={i} style={dropdownStyles.option} onPress={() => { setSelectedUnit(opt); setShowCountModal(false); }}>
                                                    <Text style={dropdownStyles.optionText}>{opt}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    </View>
                                </TouchableOpacity>
                            </Modal>

                        </View>
                        <View style={styles.rightInput}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Fuel Consumption Rate"
                                keyboardType="decimal-pad"
                                value={rate}
                                maxLength={8}
                                onChangeText={(text) => {
                                    const cleaned = handleNumberChange(text, "Fuel Usage Rate");
                                    setRate(cleaned);
                                }}
                                placeholderTextColor="#9b9898ff"
                            />
                        </View>
                        <View style={styles.leftInput}>
                            <Text style={styles.label}>Fuel Price</Text>
                        </View>
                        <View style={styles.rightInput}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Price per Metric Ton"
                                keyboardType="decimal-pad"
                                value={price}
                                maxLength={8}
                                onChangeText={(text) => {
                                    const cleaned = handleNumberChange(text, "Price");
                                    setPrice(cleaned);
                                }}

                                placeholderTextColor="#9b9898ff"
                            />
                        </View>
                        {/* Button */}
                        <View style={styles.leftInput}></View>
                        <View style={styles.rightInput}>
                            <TouchableOpacity style={styles.btn} onPress={calculateCost}>
                                <Text style={styles.btnText}>Generate Result</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Result */}
                        <Text style={[styles.resultText, styles.fontJacques]}>
                            Required Fuel : <Text style={styles.data}>{fuel || "--"}</Text> Metric Ton(s)
                        </Text>
                        <Text style={[styles.resultText, styles.fontJacques]}>
                            Total Cost : <Text style={styles.data}>{cost || "--"}</Text> Dollar(s)
                        </Text>
                        <Text style={[styles.resultText, styles.fontJacques]}>
                            Voyage Time : <Text style={styles.data}>{voyage || "--"}</Text> Hour(s)
                        </Text>
                    </View>



                </View>
            }
        />
    )
}
