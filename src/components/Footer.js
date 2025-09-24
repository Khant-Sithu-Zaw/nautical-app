import React, { useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";

import homeIcon from "../../assets/images/homeIcon.png";
import homeIconActive from "../../assets/images/homeIconActive.png";
import learnIcon from "../../assets/images/learnIcon.png";
import learnIconActive from "../../assets/images/learnIconActive.png";
import profileIcon from "../../assets/images/profileIcon.png";
import profileIconActive from "../../assets/images/profileIconActive.png";
import styles from "../style/styles";

export default function Footer({ navigation }) {
    const [activeTab, setActiveTab] = useState("home");

    const tabs = [
        { key: "home", icon: homeIcon, iconActive: homeIconActive, screen: "Home" },
        { key: "learn", icon: learnIcon, iconActive: learnIconActive, screen: "LearnScreen" },
        { key: "aboutus", icon: profileIcon, iconActive: profileIconActive, screen: "AboutusScreen" },
    ];

    return (
        <View style={styles.footer}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab.key}
                    style={styles.tabButton}
                    onPress={() => {
                        setActiveTab(tab.key);
                        navigation.navigate(tab.screen);

                    }}
                >
                    <View style={activeTab === tab.key ? styles.tabActive : styles.tab}>
                        <Image
                            source={activeTab === tab.key ? tab.iconActive : tab.icon}
                            style={styles.tabImg}
                        />
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}
