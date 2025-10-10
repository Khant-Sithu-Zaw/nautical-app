import React, { useState } from 'react'
import { handleNumberChange } from "../utils/methods";
import Card from "../components/Card";
import { View, Text, TouchableOpacity, TextInput, Modal, Image, Keyboard, ScrollView } from "react-native";
import styles from "../style/styles";
import countriesData from "../utils/countries.json";
import timeInput from "../utils/constants";
import Layout from '../components/Layout'
import Dropdown from '../components/Dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
export default function TimeZoneScreen() {
    const [dateTime, setDateTime] = useState(null);
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [timezone, setTimeZone] = useState("");
    const [time, setTime] = useState("");

    const showPicker = () => setPickerVisible(true);
    const hidePicker = () => setPickerVisible(false);
    const calculateTime = () => { }
    const handleSelectCountry = (item) => {
        setTimeZone(item.name);
        console.log("Selected:", item); // You can use item.timezone_offset, item.latlong
    };

    const handleDateTimeConfirm = (date) => {
        setDateTime(date);
        hidePicker();
    };
    const handleSelectTimeZone = (zone) => {
        setTime(zone)
    };
    return (
        <Layout
            mainContent={
                <View style={[styles.flexBox]}>
                    <View style={[styles.leftItem, styles.inputLabel]}>
                        <Text style={styles.label}>Time Zone</Text>
                    </View>
                    <View style={[styles.rightItem, styles.inputContainer]}>
                        <Dropdown
                            data={timeInput}
                            labelKey="name"
                            valueKey="timezone_offset"
                            placeholder="Select UTC or Local"
                            searchable={false}
                            onSelect={handleSelectCountry}
                        />
                    </View>
                    <View style={[styles.leftItem, styles.inputLabel]}>
                        <Text style={styles.label}>Choose Time</Text>
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
                        {/* DateTime Picker */}
                        <DateTimePickerModal
                            isVisible={isPickerVisible}
                            mode="datetime"
                            onConfirm={handleDateTimeConfirm}
                            onCancel={hidePicker}
                        />
                    </View>
                    <View style={[styles.leftItem, styles.inputLabel]}>
                        <Text style={styles.label}>Country</Text>
                    </View>
                    <View style={[styles.rightItem, styles.inputContainer]}>
                        <Dropdown
                            data={countriesData.countries}
                            labelKey="name"
                            valueKey="timezone_offset"
                            placeholder="Select country"
                            searchable={true}
                            onSelect={handleSelectCountry}
                        />
                    </View>

                    <Card
                        style={styles.cardExtend}>
                        <Text
                            style={[
                                styles.cardText,

                            ]}
                        >
                            UTC
                        </Text>
                        <Text style={[
                            styles.resultText,
                        ]}>  {time || "--"}
                        </Text>

                    </Card>


                    <TouchableOpacity style={styles.calculateBtn} onPress={calculateTime}>
                        <Text style={styles.calculateTxt}>Convert TimeZone</Text>
                    </TouchableOpacity>
                </ View>
            }
        />
    )
}

