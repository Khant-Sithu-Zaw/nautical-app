import Layout from "../components/Layout";
import React, { useState, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Image,
} from "react-native";
import styles from "../style/styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { numberRegex, signNumberRegex, weatherOptions } from "../utils/constants";
import Card from "../components/Card";
import DropdownPicker from "../components/DropdownPicker";
export default function ETAScreen() {
    const [speed, setSpeed] = useState("");
    const [distance, setDistance] = useState("");
    const [dateTime, setDateTime] = useState(null);
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [duration, setDuration] = useState(null);
    const [arrivalTime, setArrivalTime] = useState("");
    const [currentSpeedSign, setCurrentSpeedSign] = useState("+");
    const [currentSpeed, setCurrentSpeed] = useState("");
    const [trafficDelay, setTrafficDelay] = useState("");
    const hintTimerRef = useRef(null);
    const [showHint, setShowHint] = useState(false);
    const [hintShown, setHintShown] = useState(false); // prevent showing again
    const [selectedWeather, setSelectedWeather] = useState(weatherOptions[0]);
    const showPicker = () => setPickerVisible(true);
    const hidePicker = () => setPickerVisible(false);

    const handleDateTimeConfirm = (date) => {
        setDateTime(date);
        hidePicker();
    };

    const calculateETA = () => {
        Keyboard.dismiss();


        if (!dateTime || speed === "" || distance === "" || speed.trim() === "" || distance.trim() === "") {
            alert("Please fill all both inputs!");
            return;
        }
        if (!currentSpeed.trim()) {
            setCurrentSpeed("0");
            setCurrentSpeedSign("+");
        }

        if (!signNumberRegex.test(currentSpeed.trim())) {
            alert("Invalid current format. Only numeric values allowed.");
            return;
        }

        const currentSpeedNum = Number(currentSpeed);

        if (isNaN(currentSpeedNum)) {
            alert("Invalid Water Current!");
            return;
        }
        const speedNum = Number(speed);

        if (isNaN(speedNum)) {
            alert("Invalid ship's base speed!");
            return;
        }



        if (selectedWeather.loss >= 100) {
            alert("Weather loss cannot be 100% or more!");
            return;
        }

        let spd = speedNum * (1 - selectedWeather.loss / 100);
        spd = spd + currentSpeedNum;
        const dist = parseFloat(distance);

        if (isNaN(Number(spd)) || isNaN(Number(dist)) || Number(spd) <= 0 || Number(dist) <= 0) {
            alert(`Inputs cannot be less than 0!`);
            return;
        }
        const traffic = parseFloat(trafficDelay) || 0;
        const etaHours = (dist / spd) + traffic;
        if (!isNaN(etaHours)) {
            const etaDays = Math.floor(etaHours / 24);
            const etaWholeHours = Math.floor(etaHours % 24);
            const etaMinutes = Math.round((etaHours - Math.floor(etaHours)) * 60);

            let etaDisplay = "";
            if (etaDays > 0) {
                etaDisplay = `${etaDays} day(s) ${etaWholeHours} hour(s) ${etaMinutes} min(s)`;
            } else {
                etaDisplay = `${etaWholeHours} hour(s) ${etaMinutes} min(s)`;
            }

            setDuration(etaDisplay);

            const depart = new Date(dateTime);
            depart.setDate(depart.getDate() + etaDays);
            depart.setHours(depart.getHours() + etaWholeHours);
            depart.setMinutes(depart.getMinutes() + etaMinutes);

            const arrival = `${depart
                .getDate()
                .toString()
                .padStart(2, "0")}/${(depart.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}/${depart.getFullYear()} ${depart
                        .getHours()
                        .toString()
                        .padStart(2, "0")}:${depart.getMinutes().toString().padStart(2, "0")}`;

            setArrivalTime(arrival);
        }
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
                                    setDistance(text);
                                }

                            }}
                            placeholderTextColor="#9b9898ff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {distance && distance.toString().length > 0 && (
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
                                    setSpeed(text);
                                }
                            }}
                            placeholderTextColor="#9b9898ff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {speed && speed.toString().length > 0 && (
                            <TouchableOpacity onPress={() => setSpeed("")}>
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    {/* Date & Time Input */}
                    <View style={[styles.leftItem, styles.inputLabel]}>
                        <Text style={styles.label}>Departure Time</Text>
                    </View>

                    <View style={[styles.rightItem, styles.inputContainer]}>
                        <TouchableOpacity style={styles.dateInput} onPress={showPicker}>
                            <Image
                                source={require("../../assets/images/calenderIcon.png")}
                                style={styles.dateIcon}
                            />
                            <Text
                                style={[
                                    styles.dateText,
                                    !dateTime && { color: "#9b9898ff" }, // apply placeholder color if no date
                                ]}
                            >
                                {dateTime
                                    ? dateTime.toLocaleString()
                                    : "Select Datetime "}
                            </Text>
                        </TouchableOpacity>

                        {dateTime && (
                            <TouchableOpacity onPress={() => setDateTime(null)}>
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={[styles.leftItem, styles.inputLabel]}>
                        <Text style={styles.label}>Traffic Delay</Text>
                    </View>
                    <View style={[styles.rightItem, styles.inputContainer]}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter Duration in hours"
                            keyboardType="decimal-pad"
                            value={trafficDelay}

                            onChangeText={(text) => {
                                if (numberRegex.test(text)) {
                                    setTrafficDelay(text);
                                }

                            }}
                            placeholderTextColor="#9b9898ff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {trafficDelay && trafficDelay.toString().length > 0 && (
                            <TouchableOpacity onPress={() => setTrafficDelay("")}>
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={[styles.leftItem, styles.inputLabel]}>
                        <Text style={styles.label}>Weather & Wind </Text>
                    </View>
                    <View style={[styles.rightItem, styles.inputContainer,]}>
                        <DropdownPicker
                            options={weatherOptions.map(o => o.label)} // only labels for dropdown
                            selected={`${selectedWeather.label} (${selectedWeather.loss}% Loss)`}       // display selected label
                            onSelect={(label) => {
                                const selected = weatherOptions.find(o => o.label === label);
                                setSelectedWeather(selected);       // save full object with loss
                            }}
                        />
                    </View>
                    <View style={[styles.leftItem, styles.inputLabel]}>
                        <Text style={styles.label}>Set Speed(kn)</Text>
                    </View>
                    <View style={[styles.rightItem, styles.inputContainer,]}>
                        <View style={{ position: "relative" }}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="(±)Water Current Speed"
                                keyboardType="decimal-pad"
                                value={currentSpeed}
                                onChangeText={(text) => {
                                    if (signNumberRegex.test(text)) {
                                        setCurrentSpeed(text);
                                        setCurrentSpeedSign(text.startsWith("-") ? "-" : "+");
                                        if (text.length > 0) {
                                            setShowHint(true);
                                            if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
                                            hintTimerRef.current = setTimeout(() => setShowHint(false), 2000);
                                        } else {
                                            setShowHint(false);
                                        }
                                    }
                                }}
                                placeholderTextColor="#9b9898ff"
                                maxLength={8}
                                textContentType="none"
                            />
                            {currentSpeed && currentSpeed.toString().length > 0 && (
                                <TouchableOpacity onPress={() => setCurrentSpeed("")}>
                                    <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                                </TouchableOpacity>
                            )}
                            {/* Inline hint text */}
                            {showHint && (
                                <View style={styles.hintBubble}>
                                    <Text style={styles.hintBubbleText}>
                                        {currentSpeedSign === "-"
                                            ? "Current Against ship"
                                            : "Current With ship"}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                    <Card
                        style={styles.cardExtend}>
                        <Text
                            style={[
                                styles.cardText,

                            ]}
                        >
                            Rough Estimated Arrival Time
                        </Text>
                        <Text style={[
                            styles.resultText,
                        ]}>Arrival {arrivalTime || "--"}
                        </Text>

                        <Text style={[
                            styles.resultText,
                        ]}>Duration {duration || "--"}
                        </Text>
                    </Card>
                    <TouchableOpacity style={styles.calculateBtn} activeOpacity={0.8} onPress={calculateETA}>
                        <Text style={styles.calculateTxt}>Calculate ETA</Text>
                    </TouchableOpacity>
                    {/* DateTime Picker */}
                    <DateTimePickerModal
                        isVisible={isPickerVisible}
                        mode="datetime"
                        date={dateTime || new Date()}
                        onConfirm={handleDateTimeConfirm}
                        onCancel={hidePicker}
                    />
                </View>
            }
        />
    );
}
