import React from 'react'
import { View, Text, TouchableOpacity, Dimensions, Animated, Image } from "react-native";
import styles from "../style/styles";
import { scale, moderateScale, verticalScale } from '../utils/scale';
export default function LearnScreen() {
    return (
        <View style={styles.container}><Text style={{ fontSize: moderateScale(40), color: "#fff", }}> {"Learning Feature\n In Development"}</Text>
        </View>
    )
}

