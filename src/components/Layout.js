// Layout.js
import React from "react";
import { View } from "react-native";
import styles from "../style/styles";
import Card from "./Card";
export default function Layout({ bannerContent, bodyContent, cardBackground, extraContent, cardStyle, }) {
    return (
        <View style={styles.screenContainer}>
            <View style={styles.bannerContainer}>
                {bannerContent}
            </View>

            {/* Screen content */}
            <View style={styles.content}>
                <Card style={cardStyle} backgroundImage={cardBackground}>
                    {bodyContent}
                </Card>
            </View>
            <View style={styles.extraOptionalContent}>

                {extraContent}

            </View>
        </View>
    );
}


