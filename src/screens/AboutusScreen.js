import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Alert, Image, TextInput, Linking } from "react-native";
import Layout from "../components/Layout";
import styles from "../style/styles";

import { scale, moderateScale, verticalScale } from '../utils/scale';

export default function AboutusScreen() {
    const MAX_LENGTH = 120;
    const [message, setMessage] = useState("");

    const handleSendEmail = () => {
        if (!message.trim()) {
            Alert.alert("Error", "Please enter a message");
            return;
        }

        const subject = "Feedback from Seaman ToolBox App";
        const body = encodeURIComponent(message);
        const receiverEmail = "khantsithuzaw10@gmail.com";

        const emailUrl = `mailto:${receiverEmail}?subject=${encodeURIComponent(
            subject
        )}&body=${body}`;

        Linking.canOpenURL(emailUrl)
            .then((supported) => {
                if (!supported) {
                    Alert.alert("Error", "No email app found");
                } else {
                    return Linking.openURL(emailUrl);
                }
            })
            .catch((err) => console.error("Error:", err));
    };

    return (
        <Layout
            bannerContent={
                <View style={styles.bannerContent}>
                    <Image source={require("../../assets/images/splash-logo.png")} style={styles.splashLogo} />

                    <Text style={styles.bannerText}>
                        Designed for seafarers, this app works both online and offline to support daily calculation tasks and learning. Access nautical tools and tutorials in this box anytime for a better experience at sea
                    </Text>
                </View>
            }
            bodyContent={
                <View>

                    <Text style={[styles.contentTitle, { marginBottom: verticalScale(10) }]}>" We welcome your feedback to improve this tool and make it more useful !! "</Text    >

                    <View style={[styles.flexBox, styles.relativeHolder, { alignItems: "flex-start", justifyContent: "center" }]}>


                        <TextInput
                            style={[styles.textInput, {
                                textAlignVertical: "top",
                                height: 110,
                                width: "90%",
                            }]}
                            placeholder="Suggestions & Complaints"
                            keyboardType="default"
                            value={message}
                            onChangeText={setMessage}
                            placeholderTextColor="#9b9898ff"
                            multiline
                            numberOfLines={6}
                            maxLength={MAX_LENGTH}
                        />
                        <Text style={[styles.maxText, styles.commentBoxIcon, { color: message.length >= MAX_LENGTH ? "red" : "#666" }]}>
                            {message.length}/{MAX_LENGTH}
                        </Text>


                        <Text onPress={handleSendEmail} style={[styles.commentBoxIcon, styles.sendEmoji]}>📤</Text>
                    </View>

                    <View style={[styles.flexBox, { alignItems: "flex-start", justifyContent: "flex-start", marginTop: verticalScale(20), marginBottom: verticalScale(5) }]}>
                        <View style={[styles.lftBox, { marginTop: verticalScale(3) }]}>
                            <Image source={require("../../assets/images/developerIcon.png")} style={styles.aboutIcon} />
                        </View>

                        <View style={[styles.rhtBox, { margin: moderateScale(5) }]}>
                            <Text style={{ fontSize: moderateScale(10), color: "#205E95" }}>Developed by.</Text>
                            <Text style={{ fontSize: moderateScale(12), color: "#205E95", fontWeight: '800' }}>Khant Sithu Zaw</Text>
                            <Text style={{ fontSize: moderateScale(9), color: "#205E95" }}>Developer,Seafarer</Text>
                        </View>
                        <Image source={require("../../assets/images/developer.jpg")} style={[styles.aboutUsImg, { marginLeft: scale(12) }]} />
                        {/* <Image source={require("../../assets/images/.png")}
                        /> */}
                    </View>
                    <View style={[styles.flexBox, { alignItems: "flex-start", justifyContent: "flex-start", flexDirection: "row-reverse", marginVertical: verticalScale(10) }]}>

                        <View style={styles.rhtBox}>
                            <View style={styles.rhtBox}>
                                <Text style={{ fontSize: moderateScale(10), color: "#205E95" }}>Designed by.</Text>
                                <Text style={{ fontSize: moderateScale(12), color: "#205E95", fontWeight: '800' }}>Khin Saw Hnin</Text>
                                <Text style={{ fontSize: moderateScale(9), color: "#205E95" }}>UI/UX Designer,Developer</Text>
                            </View>
                        </View>
                        <View style={styles.lftBox}>
                            <Image source={require("../../assets/images/figmaIcon.png")} style={styles.aboutIcon} />
                        </View>
                        <Image source={require("../../assets/images/designer.jpg")} style={styles.aboutUsImg} />
                    </View>
                </ View>
            }
            cardStyle={{ top: verticalScale(-76), paddingBottom: verticalScale(10), }}
        />
    )
}

