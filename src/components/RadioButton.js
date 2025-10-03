import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import radio from "../style/radioBtn";
export const RadioButton = ({ label, value, selectedValue, onSelect }) => (
    <TouchableOpacity
        style={
            radio.radioContainer
        }
        onPress={() => onSelect(value)}
    >
        <View
            style={
                radio.outerCircle

            }
        >
            {selectedValue === value ? (
                <View
                    style={
                        radio.innerCircle
                    }
                />
            ) : null}
        </View>
        <Text style={radio.radioText}>{label}</Text>
    </TouchableOpacity>
);
