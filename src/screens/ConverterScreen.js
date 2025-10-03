import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Modal } from "react-native";
import { scale, verticalScale, moderateScale } from '../utils/scale';
import dropdownStyles from "../style/pickupstyle";
import styles from "../style/styles";
import Layout from "../components/Layout";
import TemperatureConverter from "../components/converters/TemperatureConverter";
import SpeedConverter from "../components/converters/SpeedConverter";
import DistanceConverter from "../components/converters/DistanceConverter";
import LengthConverter from "../components/converters/LengthConverter";
import { categoryOptions } from "../utils/constants";
import WeightConverter from "../components/converters/WeightConverter";
import VolumeConverter from "../components/converters/VolumeConverter";
import PressureConverter from "../components/converters/PressureConverter";
import PowerConverter from "../components/converters/PowerConverter";
export default function ConverterScreen() {

    const temperatureRegex = /^-?\d*\.?\d*$/;
    const numberRegex = /^\d*\.?\d*$/;

    const [selectedCategory, setSelectedCategory] = useState("Temperature");
    const [showCountModal, setShowCountModal] = useState(false);


    function formatNumber(value) {
        const num = parseFloat(value);
        if (isNaN(num)) return "";

        // If number is too large or too small, use scientific notation
        if (Math.abs(num) >= 1e6 || (Math.abs(num) > 0 && Math.abs(num) < 1e-2)) {
            return num.toExponential(2); // e.g., "1.23e+08"
        }

        // Otherwise, round to 2 decimal places
        return num.toFixed(2);
    }


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
                {/* Dropdown */}
                <View style={{ alignItems: "center", marginBottom: verticalScale(12) }}>

                    <TouchableOpacity style={[dropdownStyles.customPicker, { alignItems: "center", flexDirection: "row", justifyContent: "space-between", width: scale(180) }]} onPress={() => setShowCountModal(true)}>
                        <Text style={[dropdownStyles.pickerText, { color: selectedCategory ? "black" : "gray" }]}>
                            {selectedCategory || "Select Conversion Category "}
                        </Text>
                        <Text>▼</Text>
                    </TouchableOpacity>

                    {/* Modal */}
                    <Modal visible={showCountModal} transparent animationType="fade" onRequestClose={() => setShowCountModal(false)}>
                        <TouchableOpacity style={dropdownStyles.modalOverlay} onPress={() => setShowCountModal(false)} activeOpacity={1}>
                            <View style={dropdownStyles.modalContent}>
                                <ScrollView>
                                    {categoryOptions.map((opt, i) => (
                                        <TouchableOpacity key={i} style={dropdownStyles.option} onPress={() => { setSelectedCategory(opt); setShowCountModal(false); }}>
                                            <Text style={dropdownStyles.optionText}>{opt}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View>
                <ScrollView
                    style={{ height: verticalScale(242), overflow: "hidden" }}
                    showsVerticalScrollIndicator={true}
                >
                    {selectedCategory === "Temperature" && (
                        <TemperatureConverter
                            temperatureRegex={temperatureRegex}
                            formatNumber={formatNumber}
                            numberRegex={numberRegex}
                        />
                    )}

                    {selectedCategory === "Speed" && (
                        <SpeedConverter
                            formatNumber={formatNumber}
                            numberRegex={numberRegex}

                        />
                    )}

                    {selectedCategory === "Distance" && (
                        <DistanceConverter formatNumber={formatNumber}
                            numberRegex={numberRegex} />
                    )}

                    {selectedCategory === "Length | Depth" && (
                        <LengthConverter
                            formatNumber={formatNumber}
                            numberRegex={numberRegex}
                        />
                    )}
                    {selectedCategory === "Weight" && (
                        <WeightConverter
                            formatNumber={formatNumber}
                            numberRegex={numberRegex}
                        />
                    )}
                    {selectedCategory === "Volume" && (
                        <VolumeConverter
                            formatNumber={formatNumber}
                            numberRegex={numberRegex}
                        />
                    )}
                    {selectedCategory === "Pressure" && (
                        <PressureConverter
                            formatNumber={formatNumber}
                            numberRegex={numberRegex}
                        />
                    )}
                    {selectedCategory === "Energy | Power" && (
                        <PowerConverter
                            formatNumber={formatNumber}
                            numberRegex={numberRegex}
                        />
                    )}
                </ScrollView>


            </ View>}

            cardStyle={{ top: verticalScale(-120) }}
            cardBackground={require("../../assets/images/water.png")}

        />
    );
}




