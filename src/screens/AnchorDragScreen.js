
import styles from "../style/styles";
import Layout from "../components/Layout";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard, Image, } from "react-native";

export default function AnchorDragScreen() {
    const [lengthOverall, setLengthOverall] = useState(""); // string
    const [shackle, setShackle] = useState(""); // string
    const [radius, setRadius] = useState("");
    const LENGTH_PER_SHACKLE = 27.5;
    const NAUTICAL_MILE = 1852;

    const calculateRadius = () => {
        Keyboard.dismiss();

        const lengthNum = parseFloat(lengthOverall);
        const shackleNum = parseFloat(shackle);

        if (!lengthNum || !shackleNum) {
            setRadius("");
            return;
        }

        const chainLength = shackleNum * LENGTH_PER_SHACKLE;
        const halfLOA = lengthNum / 2;

        const totalMeters = chainLength + halfLOA;

        const radiusNM = totalMeters / NAUTICAL_MILE;

        setRadius(radiusNM.toFixed(2));
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
                        />
                    </View>
                    <View style={styles.leftInput}>
                        <Text style={styles.label} >
                            Shackles
                        </Text>
                    </View>
                    <View style={styles.rightInput}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Counts of Shackles"
                            keyboardType="numeric"
                            value={shackle}
                            onChangeText={setShackle}
                            placeholderTextColor="#9b9898ff"
                        />
                    </View>
                    <View style={styles.leftInput}>

                    </View>
                    <View style={styles.rightInput}>
                        <TouchableOpacity style={styles.btn} onPress={calculateRadius}>
                            <Text style={styles.btnText}>Calculate</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.resultText, styles.fontJacques]}>
                        Swing Circle Radius : <Text style={styles.data}>{radius || "--"}</Text>
                    </Text>
                </ View>
            </ View>}
        />
    );
}
