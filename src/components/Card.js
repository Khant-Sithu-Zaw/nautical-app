// Card.js
import React from "react";
import { View, ImageBackground } from "react-native";
import styles from "../style/styles";

export default function Card({ children, style, backgroundImage }) {
    if (backgroundImage) {
        return (
            <ImageBackground
                source={backgroundImage}
                style={[styles.card, style]}
                imageStyle={{ borderRadius: 12 }} // keep rounded corners
            >
                {children}
            </ImageBackground>
        );
    }

    return (<View style={[styles.card, style]}>{children}</View>);

}
