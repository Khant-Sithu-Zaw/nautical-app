import Layout from "../components/Layout";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard, Image, } from "react-native";
import styles from "../style/styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons"; // icon package
import DateTimePickerModal from "react-native-modal-datetime-picker";


export default function ETAScreen() {
    const [speed, setSpeed] = useState("");
    const [distance, setDistance] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [isPickerVisible, setIsPickerVisible] = useState(false);


    const [error, setError] = useState("");
    const [eta, setEta] = useState(null);
    const [arrivalTime, setArrivalTime] = useState("");

    const hours = selectedTime ? selectedTime.getHours().toString().padStart(2, "0") : "00";
    const minutes = selectedTime ? selectedTime.getMinutes().toString().padStart(2, "0") : "00";

    const onChange = (event, date) => {
        setShowDatePicker(false);
        if (date) {
            setSelectedDate(date);
        }
    };

    const calculateETA = () => {
        Keyboard.dismiss();
        if (isNaN(Number(hours)) ||
            isNaN(Number(minutes)) ||
            isNaN(Number(speed)) ||
            isNaN(Number(distance))) {

            setEta(null);
            setArrivalTime("");
            setError("Please enter numbers only.");
            return;
        }


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
            if (hours == "") setHours("0");
            if (minutes == "") setMinutes("0");

            depart.setHours(parseInt(hours, 10) || 0);
            depart.setMinutes(parseInt(minutes, 10) || 0);

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
        <Layout
            bannerContent={<View>
                <Image
                    source={require("../../assets/images/containerShip.jpg")}
                    style={styles.bannerImage}
                />
            </View>}
            bodyContent={<View >
                <View>
                    <Text style={styles.contentTitle}>Estimated Time Arrival by conditions</Text>
                    <View
                        style={
                            styles.titleLine
                        }
                    />
                </View>
                <View style={styles.inputForm}>
                    <View style={styles.leftInput}>
                        <Text style={styles.label} >
                            Departure Date
                        </Text>
                    </View>
                    <View style={styles.rightInput}>
                        <TouchableOpacity
                            style={styles.dateInput}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Ionicons name="calendar-outline" size={15} color="#333" style={styles.icon} />
                            <Text style={styles.dateText}>
                                {selectedDate ? selectedDate.toDateString() : "Select Date"}
                            </Text>
                        </TouchableOpacity>

                        {showDatePicker && (
                            <DateTimePicker
                                value={selectedDate || new Date()}
                                mode="date"
                                display="calendar"
                                onChange={onChange}
                            />
                        )}
                    </View>
                    <View style={styles.leftInput}>
                        <Text style={[styles.label]} >
                            Departure Time
                        </Text>

                    </View>
                    <View style={[styles.rightInput, styles.flexBox]}>
                        <TouchableOpacity
                            style={styles.dateInput}
                            onPress={() => setIsPickerVisible(true)}
                        >
                            <Text style={styles.dateText}>
                                {selectedTime
                                    ? selectedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
                                    : "Select Time"}
                            </Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isPickerVisible}
                            mode="time"
                            is24Hour={true}
                            onConfirm={(date) => {
                                setSelectedTime(date);
                                setIsPickerVisible(false);
                            }}
                            onCancel={() => setIsPickerVisible(false)}
                        />

                    </View>

                    <View style={styles.leftInput}>
                        <Text style={styles.label} >
                            Speed (knots)
                        </Text>
                    </View>
                    <View style={styles.rightInput}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter Speed (knots)"
                            keyboardType="numeric"
                            value={speed}
                            onChangeText={setSpeed}
                            placeholderTextColor="#9b9898ff"
                        />
                    </View>
                    <View style={styles.leftInput}>
                        <Text style={styles.label} >
                            Distance (NM)
                        </Text>
                    </View>
                    <View style={styles.rightInput}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter Distance (NM)"
                            keyboardType="numeric"
                            value={distance}
                            onChangeText={setDistance}
                            placeholderTextColor="#9b9898ff"
                        />
                    </View>

                    <View style={styles.leftInput}>

                    </View>
                    <View style={styles.rightInput}>
                        <TouchableOpacity style={styles.btn} onPress={calculateETA}>
                            <Text style={styles.btnText}>Calculate ETA</Text>
                        </TouchableOpacity>
                    </View>


                    <Text style={[styles.resultText, styles.fontJacques]}>
                        Duration : <Text style={styles.data}>{eta || "--"}</Text>
                    </Text>
                    {/* {arrivalTime && <View><Text style={[styles.resultText, styles.fontJacques, styles.data]}>{arrivalTime}</Text></View>} */}
                    <Text style={[styles.resultText, styles.fontJacques]}>Your estimated arrival time is here.</Text>
                    <Text style={[styles.resultText, styles.fontJacques]}>
                        {arrivalTime || "--"}
                    </Text>
                </ View>
            </ View>}
        />
    );

}