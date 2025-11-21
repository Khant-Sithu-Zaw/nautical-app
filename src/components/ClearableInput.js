import React from "react";
import { View, TextInput, TouchableOpacity, Image, StyleSheet, Text, Alert } from "react-native";
import styles from "../style/styles";
export default function ClearableInput({
    value,
    onChangeText,
    placeholder,
    wrapperStyle,
    inputStyle,
    placeholderTextColor = "#9b9898ff",
    maxLength,
    keyboardType = "default",
    multiline = false,
    numberOfLines,
    editable = true,
    validate = "none"
}) {
    const handleChange = (text) => {
        if (validate === "number" && /[^0-9]/.test(text)) {
            Alert.alert("Invalid Input", "Only numbers allowed");
            return;
        } else if (validate === "text" && /[^a-zA-Z\s]/.test(text)) {
            Alert.alert("Invalid Input", "Only letters allowed");
            return;
        }

        onChangeText(text);
    };
    return (
        <View style={[clearableInput.wrapper, wrapperStyle]}>
            <TextInput
                value={value}
                onChangeText={handleChange}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                style={inputStyle}
                maxLength={maxLength}
                keyboardType={keyboardType}
                multiline={multiline}
                numberOfLines={numberOfLines}
                editable={editable}
            />

            {value?.length > 0 && (
                <TouchableOpacity
                    style={[styles.clearBtn]}
                    onPress={() => onChangeText("")}
                >
                    <Text style={[styles.closeIcon]}>❌</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const clearableInput = StyleSheet.create({
    wrapper: {
        width: "100%",
        position: "relative",

    },


});
