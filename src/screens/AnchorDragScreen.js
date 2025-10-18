
import styles from "../style/styles";
import dropdownStyles from "../style/pickupstyle";
import Layout from "../components/Layout";
import React, { useState } from "react";
import {
    View, Text, TextInput, TouchableOpacity, Keyboard, Image, Modal,
    ScrollView,
} from "react-native";
import { handleNumberChange } from "../utils/methods";
import { countOptions, shackleLengthOptions } from "../utils/constants";
import Card from "../components/Card";
import { moderateScale, scale } from "../utils/scale";
import DropdownPicker from '../components/DropdownPicker';
export default function AnchorDragScreen() {
    const [lengthOverall, setLengthOverall] = useState(""); // string

    const [radius, setRadius] = useState("");

    const NAUTICAL_MILE = 1852;
    const [shackleCount, setShackleCount] = useState(null);
    const [shackleLength, setShackleLength] = useState("27.5 meters");
    const [showCountModal, setShowCountModal] = useState(false);
    const [showLengthModal, setShowLengthModal] = useState(false);

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
            mainContent={
                <View style={[styles.flexBox]}>
                    {/* Distance Input */}

                    <View style={[styles.leftItem, styles.inputLabel]}>
                        <Text style={styles.label}>LOA (meters)</Text>
                    </View>
                    <View style={[styles.rightItem, styles.inputContainer]}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Length of vessel"
                            keyboardType="decimal-pad"
                            value={lengthOverall}
                            onChangeText={(text) => {
                                const cleaned = handleNumberChange(text, "LOA");
                                setLengthOverall(cleaned);
                            }}
                            placeholderTextColor="#9b9898ff"
                            maxLength={8}
                            textContentType="none"
                        />
                        {lengthOverall && (
                            <TouchableOpacity onPress={() => setLengthOverall("")}>
                                <Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={[styles.leftItem, styles.inputLabel]}>
                        <Text style={styles.label}>Shackle Counts</Text>
                    </View>
                    <View style={[styles.rightItem, styles.inputContainer]}>
                        <DropdownPicker
                            options={countOptions}
                            selected={shackleCount}
                            onSelect={(opt) => setShackleCount(opt)}
                        />

                    </View>
                    <View style={[styles.leftItem, styles.inputLabel]}>
                        <Text style={styles.label}>1 Shackle(m)
                        </Text>
                    </View>
                    <View style={[styles.rightItem, styles.inputContainer]}>
                        <DropdownPicker
                            options={shackleLengthOptions}
                            selected={shackleLength}
                            onSelect={(opt) => setShackleLength(opt)}
                        />

                    </View>
                    <Card
                        style={styles.cardExtend}>
                        <Text
                            style={[
                                styles.cardText,

                            ]}
                        >
                            Swing radius using Turning cirle
                        </Text>
                        <Text style={[
                            styles.resultText,
                        ]}> {radius || "--"} NM(s)
                        </Text>
                    </Card>


                    <TouchableOpacity style={styles.calculateBtn} onPress={calculateRadius}>
                        <Text style={styles.calculateTxt}>Calculate Swing Radius</Text>
                    </TouchableOpacity>
                </View>
            }
        />
    );
}
