// Layout.js
import React from "react";
import { View } from "react-native";
import styles from "../style/styles";
import Card from "./Card";
export default function Layout({ bannerContent, bodyContent }) {
    return (
        <View style={styles.screenContainer}>
            <View style={styles.bannerContainer}>
                {bannerContent}
            </View>

            {/* Screen content */}
            <View style={styles.content}>
                <Card>
                    {bodyContent}
                </Card>
            </View>

        </View>
    );
}


