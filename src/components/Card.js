// Card.js
import React from "react";
import { View, ImageBackground } from "react-native";
import styles from "../style/styles";

export default function Card({ children, style }) {


    return (<View style={[styles.card, style]}>{children}</View>);

}
