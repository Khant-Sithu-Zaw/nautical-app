import Layout from "../components/Layout";
import React, { useState } from "react";
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
import { handleNumberChange } from "../utils/methods";
import Card from "../components/Card";
export default function ETAScreen() {
    const [speed, setSpeed] = useState("");
    const [distance, setDistance] = useState("");
    const [dateTime, setDateTime] = useState(null);
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [duration, setDuration] = useState(null);
    const [arrivalTime, setArrivalTime] = useState("");

    const showPicker = () => setPickerVisible(true);
    const hidePicker = () => setPickerVisible(false);

    const handleDateTimeConfirm = (date) => {
        setDateTime(date);
        hidePicker();
    };

    const calculateETA = () => {
        Keyboard.dismiss();
        if (!dateTime) {
            alert("Please select Date & Time first!");
            return;
        }
        if (!speed || !distance) {
            alert("Please enter both speed and distance!");
            return;
        }
        if (isNaN(Number(speed)) || isNaN(Number(distance))) {
            setArrivalTime("");
            setDuration("");
            alert(`Please enter number only !`);
            return;

        }

        const etaHours = parseFloat(distance) / parseFloat(speed);
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
                    {/* Date & Time Input */}
                    <View style={[styles.leftItem, styles.inputLabel]}>
                        <Text style={styles.label}>Date & Time</Text>
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
                                    : "Datetime not selected"}
                            </Text>
                        </TouchableOpacity>

                        {dateTime && (
                            <TouchableOpacity onPress={() => setDateTime(null)}>
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>

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
                        <Text style={styles.label}>Speed (knots)</Text>
                    </View>
                    <View style={[styles.rightItem, styles.inputContainer]}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter vessel speed"
                            keyboardType="decimal-pad"
                            value={speed}
                            onChangeText={(text) => {
                                const cleaned = handleNumberChange(text, "Speed");
                                setSpeed(cleaned);
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
                    <Card
                        style={styles.cardExtend}>
                        <Text
                            style={[
                                styles.cardText,

                            ]}
                        >
                            Estimated arrival time is here!
                        </Text>
                        <Text style={[
                            styles.resultText,
                        ]}> {arrivalTime || ""}
                        </Text>

                        <Text style={[
                            styles.resultText,
                        ]}> Duration takes  {duration || "--"}
                        </Text>
                    </Card>
                    <TouchableOpacity style={styles.calculateBtn} onPress={calculateETA}>
                        <Text style={styles.calculateTxt}>Calculate ETA</Text>
                    </TouchableOpacity>
                    {/* DateTime Picker */}
                    <DateTimePickerModal
                        isVisible={isPickerVisible}
                        mode="datetime"
                        onConfirm={handleDateTimeConfirm}
                        onCancel={hidePicker}
                    />
                </View>
            }
        />
    );
}
