import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard, Image, Button } from "react-native";
import styles from "../style/styles";
import Layout from "../components/Layout";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function RequiredSpeedScreen() {
    const [speed, setSpeed] = useState("");
    const [distance, setDistance] = useState("");

    // Two states for times
    const [currentTime, setCurrentTime] = useState(null);
    const [arrivalTime, setArrivalTime] = useState(null);

    // Picker state
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [activePicker, setActivePicker] = useState(null); // "current" or "arrival"

    const showPicker = (type) => {
        setActivePicker(type);
        setPickerVisible(true);
    };

    const hidePicker = () => {
        setPickerVisible(false);
        setActivePicker(null);
    };

    const handleDateTimeConfirm = (date) => {
        if (activePicker === "current") {
            // Prevent selecting after arrival time
            if (arrivalTime && date >= arrivalTime) {
                alert("Current time must be before Arrival time!");
                return;
            }
            setCurrentTime(date);
        } else if (activePicker === "arrival") {
            // Prevent selecting before current time
            if (currentTime && date <= currentTime) {
                alert("Arrival time must be after Current time!");
                return;
            }
            setArrivalTime(date);
        }
        hidePicker();
    };

    const calculateSpeed = () => {
        Keyboard.dismiss();
        if (!currentTime || !arrivalTime || !distance) {
            setSpeed("--");
            return;
        }

        const timeDiffHours = (arrivalTime - currentTime) / (1000 * 60 * 60); // ms → hours
        if (timeDiffHours <= 0) {
            setSpeed("Invalid");
            return;
        }

        const distanceNum = Number(distance);
        if (isNaN(distanceNum) || distanceNum <= 0) {
            setSpeed("--");
            return;
        }

        const requiredSpeed = distanceNum / timeDiffHours; // knots
        setSpeed(requiredSpeed.toFixed(2));
    };


    return (
        <Layout
            bannerContent={
                <View>
                    <Image
                        source={require("../../assets/images/shipSpeed.jpg")}
                        style={styles.bannerImage}
                    />
                </View>
            }
            bodyContent={
                <View>
                    <View>
                        <Text style={styles.contentTitle}>🚢 Required Speed to Travel Calculation</Text>
                        <View style={styles.titleLine} />
                    </View>
                    <View style={styles.inputForm}>

                        {/* Current Time */}
                        <View style={styles.leftInput}>
                            <Text style={styles.label}>Current Time</Text>
                        </View>
                        <View style={[styles.rightInput, styles.relativeHolder]}>
                            <TouchableOpacity
                                style={styles.dateInput}
                                onPress={() => showPicker("current")}
                            >
                                <Text style={styles.dateText}>
                                    {currentTime ? currentTime.toLocaleString() : "Datetime not selected"}
                                </Text>

                            </TouchableOpacity>
                            {currentTime && (
                                <TouchableOpacity style={styles.clearBtn} onPress={() => setCurrentTime(null)}>
                                    <Text style={styles.emojiTxt}>❌</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Arrival Time */}
                        <View style={styles.leftInput}>
                            <Text style={styles.label}>Arrival Time</Text>
                        </View>
                        <View style={[styles.rightInput, styles.relativeHolder]}>

                            <TouchableOpacity
                                style={styles.dateInput}
                                onPress={() => showPicker("arrival")}
                            >
                                <Text style={styles.dateText}>
                                    {arrivalTime ? arrivalTime.toLocaleString() : "Datetime not selected"}
                                </Text>

                            </TouchableOpacity>
                            {arrivalTime && (
                                <TouchableOpacity style={styles.clearBtn} onPress={() => setArrivalTime(null)}>
                                    <Text style={styles.emojiTxt}>❌</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Distance */}
                        <View style={styles.leftInput}>
                            <Text style={styles.label}>Distance (NM)</Text>
                        </View>
                        <View style={styles.rightInput}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter distance in NM"
                                keyboardType="numeric"
                                value={distance}
                                onChangeText={setDistance}
                                placeholderTextColor="#9b9898ff"
                            />
                        </View>

                        {/* Button */}
                        <View style={styles.leftInput}></View>
                        <View style={styles.rightInput}>
                            <TouchableOpacity style={styles.btn} onPress={calculateSpeed}>
                                <Text style={styles.btnText}>Calculate Speed</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Result */}
                        <Text style={[styles.resultText, styles.fontJacques]}>
                            Required Speed : <Text style={styles.data}>{speed || "--"}</Text> knots
                        </Text>
                    </View>

                    {/* DateTime Picker with restrictions */}
                    <DateTimePickerModal
                        isVisible={isPickerVisible}
                        mode="datetime"
                        onConfirm={handleDateTimeConfirm}
                        onCancel={hidePicker}
                        {...(activePicker === "arrival" && currentTime
                            ? { minimumDate: currentTime }
                            : {})}
                        {...(activePicker === "current" && arrivalTime
                            ? { maximumDate: arrivalTime }
                            : {})}
                    />

                </View>
            }
        />
    );
}
