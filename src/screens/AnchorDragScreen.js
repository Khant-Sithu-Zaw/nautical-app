
import styles from "../style/styles";
import dropdownStyles from "../style/pickupstyle";
import Layout from "../components/Layout";
import React, { useState } from "react";
import {
    View, Text, TextInput, TouchableOpacity, Keyboard, Image, Modal,
    ScrollView,
} from "react-native";

export default function AnchorDragScreen() {
    const [lengthOverall, setLengthOverall] = useState(""); // string

    const [radius, setRadius] = useState("");

    const NAUTICAL_MILE = 1852;
    const [shackleCount, setShackleCount] = useState(null);
    const [shackleLength, setShackleLength] = useState(null);
    const [showCountModal, setShowCountModal] = useState(false);
    const [showLengthModal, setShowLengthModal] = useState(false);

    const shackleLengthOptions = [
        "15 meters",
        "20 meters",
        "25 meters",
        "27.5 meters",
        "30 meters"
    ];
    const countOptions = [
        "4 shackles",
        "5 shackles",
        "6 shackles",
        "7 shackles",
        "8 shackles",
        "9 shackles",
        "10 shackles",
        "11 shackles",
        "12 shackles",
        "13 shackles",
        "14 shackles",
        "15 shackles",
        "16 shackles",
    ];

    const calculateRadius = () => {
        Keyboard.dismiss();

        const lengthNum = parseFloat(lengthOverall);
        const shackleNum = parseFloat(shackleCount);
        const length = parseFloat(shackleLength);
        if (!lengthNum) {
            setRadius("");
            return;
        }

        const chainLength = shackleNum * length;
        const halfLOA = lengthNum / 2;

        const totalMeters = chainLength + halfLOA;

        const radiusNM = totalMeters / NAUTICAL_MILE;

        setRadius(radiusNM.toFixed(3));
    };

    return (
        <Layout
            bannerContent={<View>
                <Image
                    source={require("../../assets/images/anchorDrag.jpg")}
                    style={styles.bannerImage}
                />
            </View>}
            bodyContent={<View >
                <View>
                    <Text style={styles.contentTitle}>⛓️ Turning Circle Method Calculation</Text>
                    <View
                        style={
                            styles.titleLine
                        }
                    />
                </View>
                <View style={styles.inputForm}>

                    <View style={styles.leftInput}>
                        <Text style={styles.label} >
                            Length Overall
                        </Text>
                    </View>
                    <View style={styles.rightInput}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter LOA of Ship(m)"
                            keyboardType="numeric"
                            value={lengthOverall}
                            onChangeText={setLengthOverall}
                            placeholderTextColor="#9b9898ff"
                            maxLength={5}
                        />
                    </View>
                    <View style={styles.leftInput}>
                        <Text style={styles.label} >
                            Shackle Counts
                        </Text>
                    </View>
                    <View style={styles.rightInput}>
                        <TouchableOpacity
                            style={dropdownStyles.customPicker}
                            onPress={() => setShowCountModal(true)}
                        >
                            <Text
                                style={[
                                    dropdownStyles.pickerText,
                                    { color: shackleCount ? "black" : "gray" }
                                ]}
                            >
                                {shackleCount || "Select Shackle Counts"}
                            </Text>
                        </TouchableOpacity>
                        {/* Modal */}
                        <Modal
                            visible={showCountModal}
                            transparent
                            animationType="fade"
                            onRequestClose={() => setShowCountModal(false)}
                        >
                            <TouchableOpacity
                                style={dropdownStyles.modalOverlay}
                                onPress={() => setShowCountModal(false)}
                                activeOpacity={1}
                            >
                                <View style={dropdownStyles.modalContent}>
                                    <ScrollView>
                                        {countOptions.map((opt, i) => (
                                            <TouchableOpacity
                                                key={i}
                                                style={dropdownStyles.option}
                                                onPress={() => {
                                                    setShackleCount(opt);
                                                    setShowCountModal(false);
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
                    <View style={styles.leftInput}>
                        <Text style={styles.label} >
                            1 Shackle(m)
                        </Text>
                    </View>
                    <View style={styles.rightInput}>
                        <TouchableOpacity
                            style={dropdownStyles.customPicker}
                            onPress={() => setShowLengthModal(true)}
                        >
                            <Text
                                style={[
                                    dropdownStyles.pickerText,
                                    { color: shackleLength ? "black" : "gray" }
                                ]}
                            >
                                {shackleLength || "Length of a shackle"}
                            </Text>


                        </TouchableOpacity>
                        {/* Modal */}
                        <Modal
                            visible={showLengthModal}
                            transparent
                            animationType="fade"
                            onRequestClose={() => setShowLengthModal(false)}
                        >
                            <TouchableOpacity
                                style={dropdownStyles.modalOverlay}
                                onPress={() => setShowLengthModal(false)}
                                activeOpacity={1}
                            >
                                <View style={dropdownStyles.modalContent}>
                                    <ScrollView>
                                        {shackleLengthOptions.map((opt, i) => (
                                            <TouchableOpacity
                                                key={i}
                                                style={dropdownStyles.option}
                                                onPress={() => {
                                                    setShackleLength(opt);
                                                    setShowLengthModal(false);
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
                    <View style={styles.leftInput}>

                    </View>
                    <View style={styles.rightInput}>
                        <TouchableOpacity style={styles.btn} onPress={calculateRadius}>
                            <Text style={styles.btnText}>Calculate</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.resultText, styles.fontJacques]}>
                        Swing Circle Radius : <Text style={styles.data}>{radius || "--"} NM</Text>
                    </Text>
                </ View>
            </ View>}
        />
    );
}
