
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
    const [radiusNM, setRadiusNm] = useState("");
    const NAUTICAL_MILE = 1852;
    const [shackleCount, setShackleCount] = useState("");
    const [shackleLength, setShackleLength] = useState("27.5 meters");
    const [showCountModal, setShowCountModal] = useState(false);
    const [showLengthModal, setShowLengthModal] = useState(false);

    const calculateRadius = () => {
        Keyboard.dismiss();

        const lengthNum = parseFloat(lengthOverall);
        const shackleNum = parseFloat(shackleCount);
        const length = parseFloat(shackleLength);
        if (!lengthNum || !shackleCount) {
            alert("Please fill the inputs");
            return;
        }
        if (isNaN(lengthNum)) {
            alert("Please enter numeric value for LOA");
            return;
        }

        const chainLength = shackleNum * length;

        const totalMeters = chainLength + lengthNum;

        setRadius(totalMeters.toFixed(3));
        setRadiusNm((totalMeters.toFixed(3) / NAUTICAL_MILE).toFixed(3));
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
                        {lengthOverall && lengthOverall.toString().length > 0 && (
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
                            Swing radius to be considered
                        </Text>
                        <Text style={[
                            styles.resultText,
                        ]}> {radius || "--"} Meter(s)
                        </Text>
                        <Text style={[
                            styles.resultText,
                        ]}> Or
                        </Text>
                        <Text style={[
                            styles.resultText,
                        ]}> {radiusNM || "--"} NMile(s)
                        </Text>
                    </Card>


                    <TouchableOpacity style={styles.calculateBtn} activeOpacity={0.8} onPress={calculateRadius}>
                        <Text style={styles.calculateTxt}>Calculate Swing Radius</Text>
                    </TouchableOpacity>
                </View>
            }
        />
    );
}
