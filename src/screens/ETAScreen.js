import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, Keyboard } from "react-native";
import styles from "../style/styles";
import DateTimePicker from "@react-native-community/datetimepicker";
export default function ETAScreen() {
    const [speed, setSpeed] = useState("");
    const [distance, setDistance] = useState("");
    const [eta, setEta] = useState(null);
    const [arrivalTime, setArrivalTime] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date());
    const [hours, setHours] = useState(currentTime.getHours().toString().padStart(2, "0"));
    const [minutes, setMinutes] = useState(currentTime.getMinutes().toString().padStart(2, "0"));
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const onChange = (event, changedDate) => {
        if (event.type === "set") {
            // user pressed OK
            const currentDate = changedDate || selectedDate;
            setSelectedDate(currentDate);
        }
        // hide picker whether canceled or confirmed
        setShow(false);
    };
    const calculateETA = () => {
        Keyboard.dismiss();
        if (!speed || !distance || !(hours && minutes)) return;

        const etaHours = parseFloat(distance) / parseFloat(speed);

        if (!isNaN(etaHours)) {
            // calculate days and hours from ETA
            const etaDays = Math.floor(etaHours / 24);
            const etaWholeHours = Math.floor(etaHours % 24);
            const etaMinutes = Math.round((etaHours - Math.floor(etaHours)) * 60);

            let etaDisplay = "";
            if (etaDays > 0) {
                etaDisplay = `${etaDays} day(s) ${etaWholeHours} hour(s) ${etaMinutes} min(s)`;
            } else {
                etaDisplay = `${etaWholeHours} hour(s) ${etaMinutes} min(s)`;
            }

            setEta(etaDisplay);

            // start from selected date
            const depart = new Date(selectedDate); // or selectedDate if that's your state
            depart.setHours(parseInt(hours));
            depart.setMinutes(parseInt(minutes));

            // add ETA
            depart.setDate(depart.getDate() + etaDays);
            depart.setHours(depart.getHours() + etaWholeHours);
            depart.setMinutes(depart.getMinutes() + etaMinutes);

            // format arrival in DD/MM/YYYY HH:MM
            const arrival = `${depart.getDate().toString().padStart(2, "0")}/${(depart.getMonth() + 1).toString().padStart(2, "0")
                }/${depart.getFullYear()} ${depart.getHours().toString().padStart(2, "0")}:${depart.getMinutes().toString().padStart(2, "0")
                }`;

            setArrivalTime(arrival);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>🕒 ETA Calculator</Text>
            {/* Time Picker */}
            <View style={{ padding: 20 }}>
                <Button title="Select Departure Date" onPress={() => setShow(true)} />

                {show && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display="calendar"
                        onChange={onChange}
                    />
                )}

                <Text style={{ marginTop: 20 }}>
                    Selected Date: {selectedDate.toDateString()}
                </Text>
            </View>
            <View style={styles.timeContainer}>
                <Text>Departure </Text>
                <TextInput
                    style={styles.timeInput}
                    placeholder="00"
                    keyboardType="numeric"
                    value={hours}
                    onChangeText={setHours}
                    maxLength={2}

                />
                <Text>Hour:</Text>
                <TextInput
                    style={styles.timeInput}
                    placeholder="00"
                    keyboardType="numeric"
                    value={minutes}
                    onChangeText={setMinutes}
                    maxLength={2}
                />
                <Text>Mins</Text>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Speed (knots)"
                keyboardType="numeric"
                value={speed}
                onChangeText={setSpeed}
            />
            <TextInput
                style={styles.input}
                placeholder="Distance (Nautical Miles)"
                keyboardType="numeric"
                value={distance}
                onChangeText={setDistance}
            />

            <TouchableOpacity style={styles.button} onPress={calculateETA}>
                <Text style={styles.buttonText}>Calculate ETA</Text>
            </TouchableOpacity>

            {eta && <Text>Duration: {eta}</Text>}
            {arrivalTime && <Text>Arrival Time: {arrivalTime}</Text>}
        </View>
    );
}
