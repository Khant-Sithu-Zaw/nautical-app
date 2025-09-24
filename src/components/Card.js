// Card.js
import React from "react";
import { View } from "react-native";
import styles from "../style/styles";

export default function Card({ children, style }) {
    return (
        <View style={[styles.card]}>
            {children}
        </View>
    );
}
