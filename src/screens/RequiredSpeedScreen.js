import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard, Image, Button } from "react-native";
import styles from "../style/styles";
import Layout from "../components/Layout";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { handleNumberChange } from "../utils/methods";
import Card from "../components/Card";
import { RadioButton } from "../components/RadioButton";

export default function RequiredSpeedScreen() {
    const [speed, setSpeed] = useState("");
    const [distance, setDistance] = useState("");
    const [currentDirection, setCurrentDirection] = useState("with");
    const [currentSpeed, setCurrentSpeed] = useState("");
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
                hidePicker(); // ✅ ensure modal closes
                alert("Current time must be before Arrival time!");
                return;
            }
            setCurrentTime(date);
        } else if (activePicker === "arrival") {
            // Prevent selecting before current time
            if (currentTime && date <= currentTime) {
                hidePicker();
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
            alert("Inputs can't be empty!");
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
                                const cleaned = handleNumberChange(text, "Distance");
                                setDistance(cleaned);
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
                        <Text style={styles.label}>Sea Current</Text>
                    </View>
                    <View style={[styles.rightItem, styles.inputContainer]}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                            <RadioButton
                                label="With Ship"
                                value="with"
                                selectedValue={currentDirection}
                                onSelect={setCurrentDirection}
                            />
                            <RadioButton
                                label="Against Ship"
                                value="against"
                                selectedValue={currentDirection}
                                onSelect={setCurrentDirection}
                            />
                        </View>
                    </View>
                    <View style={[styles.leftItem, styles.inputLabel]}>
                        <Text style={styles.label}>Current Speed</Text>
                    </View>
                    <View style={[styles.rightItem, styles.inputContainer]}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Differ STW & SOG (optional)"
                            keyboardType="decimal-pad"
                            value={currentSpeed}
                            onChangeText={(text) => {
                                const cleaned = handleNumberChange(text, "Current Speed");
                                setCurrentSpeed(cleaned);
                            }}
                            placeholderTextColor="#9b9898ff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {currentSpeed && (
                            <TouchableOpacity onPress={() => setDistance("")}>
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    {/* Date & Time Input */}
                    <View style={[styles.leftItem, styles.inputLabel]}>
                        <Text style={styles.label}>Departure Time</Text>
                    </View>

                    <View style={[styles.rightItem, styles.inputContainer]}>
                        <TouchableOpacity style={styles.dateInput} onPress={() => showPicker("current")}
                        >
                            <Image
                                source={require("../../assets/images/calenderIcon.png")}
                                style={styles.dateIcon}
                            />
                            <Text
                                style={[
                                    styles.dateText,
                                    !currentTime && { color: "#9b9898ff" }, // apply placeholder color if no date
                                ]}
                            >
                                {currentTime
                                    ? currentTime.toLocaleString()
                                    : "Datetime not selected"}
                            </Text>
                        </TouchableOpacity>

                        {currentTime && (
                            <TouchableOpacity onPress={() => setCurrentTime(null)}>
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    {/* Date & Time Input */}
                    <View style={[styles.leftItem, styles.inputLabel]}>
                        <Text style={styles.label}>Arrival Time</Text>
                    </View>

                    <View style={[styles.rightItem, styles.inputContainer]}>
                        <TouchableOpacity style={styles.dateInput} onPress={() => showPicker("arrival")}
                        >
                            <Image
                                source={require("../../assets/images/calenderIcon.png")}
                                style={styles.dateIcon}
                            />
                            <Text
                                style={[
                                    styles.dateText,
                                    !arrivalTime && { color: "#9b9898ff" }, // apply placeholder color if no date
                                ]}
                            >
                                {arrivalTime
                                    ? arrivalTime.toLocaleString()
                                    : "Datetime not selected"}
                            </Text>
                        </TouchableOpacity>

                        {arrivalTime && (
                            <TouchableOpacity onPress={() => setArrivalTime(null)}>
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
                            Required Speed to travel in time
                        </Text>
                        <Text style={[
                            styles.resultText,
                        ]}> {speed || "--"} Knot(s)
                        </Text>
                    </Card>


                    <TouchableOpacity style={styles.calculateBtn} onPress={calculateSpeed}>
                        <Text style={styles.calculateTxt}>Calculate Speed</Text>
                    </TouchableOpacity>
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
