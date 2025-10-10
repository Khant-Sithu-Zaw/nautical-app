import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Modal,
    ScrollView
} from "react-native";
import styles from "../style/styles";
import countriesData from "../utils/countries.json";
import Layout from "../components/Layout";
import Card from "../components/Card";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { moderateScale, scale } from "../utils/scale";
import dropdownStyles from "../style/pickupstyle";
import Dropdown from "../components/Dropdown";
export default function TimeZoneScreen() {

    const [timeLabel, setTimeLabel] = useState("Universal Time");
    const [dateTime, setDateTime] = useState(null);
    const [isPickerVisible, setPickerVisible] = useState(false);

    const [showTimeType, setShowTimeType] = useState(false);
    // Toggle picker
    const showPicker = () => setPickerVisible(true);
    const hidePicker = () => setPickerVisible(false);

    // When a country is selected
    const convertTime = () => {

    };
    const handleSelectCountry = (item) => {

    };
    // Handle datetime confirm
    const handleDateTimeConfirm = (date) => {
        setDateTime(date);
        hidePicker();
    };
    const toggleTimeLabel = () => {
        setTimeLabel(prev => (prev === "UTC" ? "Local" : "UTC"));
    };


    return (
        <Layout
            mainContent={
                <View style={[styles.flexBox]}>
                    <View style={[styles.leftItem, styles.inputLabel]}>
                        <Text style={styles.label}>Base TimeZone</Text>
                    </View>
                    <View style={[styles.rightItem, styles.inputContainer,]}>
                        <TouchableOpacity
                            style={[styles.flexBox, dropdownStyles.customPicker,]}
                            onPress={() => setShowTimeType(true)}
                        >
                            <Text
                                style={[
                                    dropdownStyles.pickerText,
                                    { color: timeLabel ? "black" : "#9b9898ff" }
                                ]}
                            >
                                {timeLabel || "Select Time Type"}
                            </Text>
                            <Text style={{ fontSize: moderateScale(9) }}>▼</Text>
                        </TouchableOpacity>
                        {/* Modal */}
                        <Modal
                            visible={showTimeType}
                            transparent
                            animationType="fade"
                            onRequestClose={() => setShowTimeType(false)}
                        >
                            <TouchableOpacity
                                style={dropdownStyles.modalOverlay}
                                onPress={() => setShowTimeType(false)}
                                activeOpacity={1}
                            >
                                <View style={dropdownStyles.modalContent}>
                                    <ScrollView>
                                        {["Universal Time", "Local Time"].map((opt, i) => (
                                            <TouchableOpacity
                                                key={i}
                                                style={dropdownStyles.option}
                                                onPress={() => {
                                                    setTimeLabel(opt);
                                                    setShowTimeType(false);
                                                }}
                                            >
                                                <Text style={dropdownStyles.optionText}>{opt}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                    <View style={[styles.leftItem, styles.inputLabel]}>
                        <Text style={styles.label}>Date & Time</Text>
                    </View>
                    <View style={[styles.rightItem, styles.inputContainer,]}>
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
                                    : "Select Date&time"}
                            </Text>
                        </TouchableOpacity>

                        {dateTime && (
                            <TouchableOpacity onPress={() => setDateTime(null)}>
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Country Selector */}
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

                    {/* Shared DateTime Picker */}
                    <DateTimePickerModal
                        isVisible={isPickerVisible}
                        mode="datetime"
                        onConfirm={handleDateTimeConfirm}
                        onCancel={hidePicker}
                    />

                    {/* Result Card */}
                    <Card style={styles.cardExtend}>

                        <Text style={styles.resultText}></Text>
                    </Card>

                    <TouchableOpacity style={styles.calculateBtn} onPress={convertTime}>

                        <Text style={styles.calculateTxt}>
                            {timeLabel === "UTC" ? "Convert to Local" : "Convert to UTC"}
                        </Text>
                    </TouchableOpacity>
                </View >
            }
        />
    );
}
