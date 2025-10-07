// Layout.js
import React from "react";
import { View, } from "react-native";
import styles from "../style/styles";
import Card from "./Card";
export default function Layout({ bannerContent, bodyContent, mainContent, cardBackground, extraContent, cardStyle, }) {
    return (
        <View style={styles.screenContainer}>
            <View style={[styles.flexBox]}>
                {bannerContent}
            </View>

            {/* Screen content */}
            <View style={[styles.layoutContent]}>

                {mainContent}

            </View>
            <View style={styles.extraOptionalContent}>

                {extraContent}

            </View>
        </View>
    );
}


