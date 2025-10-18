// components/DropdownPicker.js
import React, { useRef, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Modal,
    Dimensions,
    findNodeHandle,
    UIManager,
} from "react-native";
import dropdownStyles from "../style/pickupstyle";
import { moderateScale, verticalScale, scale } from "../utils/scale";

const screenHeight = Dimensions.get("window").height;

export default function DropdownPicker({ label, options, selected, onSelect }) {
    const [showModal, setShowModal] = useState(false);
    const [pickerLayout, setPickerLayout] = useState(null);
    const pickerRef = useRef(null);

    // Measure picker position to place dropdown below it
    const openDropdown = () => {
        if (pickerRef.current) {
            UIManager.measureInWindow(findNodeHandle(pickerRef.current), (x, y, width, height) => {
                setPickerLayout({ x, y, width, height });
                setShowModal(true);
            });
        }
    };

    return (
        <View>
            {label && <Text style={{ fontWeight: "bold", marginBottom: 5 }}>{label}</Text>}

            <TouchableOpacity
                ref={pickerRef}
                style={[
                    dropdownStyles.customPicker,
                    {
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    },
                ]}
                onPress={openDropdown}
            >
                <Text style={[dropdownStyles.pickerText, { color: selected ? "black" : "gray" }]}>
                    {selected || "Select"}
                </Text>
                <Text style={{ fontSize: moderateScale(9) }}>▼</Text>
            </TouchableOpacity>

            {showModal && pickerLayout && (
                <Modal
                    transparent
                    animationType="fade"
                    visible={showModal}
                    onRequestClose={() => setShowModal(false)}
                >
                    {/* Tap outside to close */}
                    <TouchableOpacity

                        activeOpacity={0.9}
                        style={{ flex: 1 }}
                        onPressOut={() => setShowModal(false)}
                    >
                        {/* Dropdown positioned below picker */}
                        <View
                            style={{
                                position: "absolute",
                                top:
                                    pickerLayout.y + pickerLayout.height > screenHeight - verticalScale(200)
                                        ? pickerLayout.y - verticalScale(200) // If near bottom, show above
                                        : pickerLayout.y + pickerLayout.height,
                                left: pickerLayout.x,
                                width: pickerLayout.width,
                                backgroundColor: "#477DAD",
                                borderRadius: moderateScale(8),
                                borderWidth: 1,
                                borderColor: "#477DAD",
                                maxHeight: verticalScale(200),
                                shadowColor: "#000",
                                shadowOpacity: 0.15,
                                shadowRadius: 6,
                                elevation: 5,
                                overflow: "hidden",
                            }}
                        >
                            <ScrollView>
                                {options.map((opt, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        style={[
                                            dropdownStyles.option,
                                            i === options.length - 1 && { borderBottomWidth: 0 },
                                        ]}
                                        onPress={() => {
                                            onSelect(opt);
                                            setShowModal(false); // 👈 closes immediately
                                        }}
                                    >
                                        <Text
                                            style={[
                                                dropdownStyles.optionText,
                                                selected === opt && { fontWeight: "bold" } // highlight selected
                                            ]}
                                        >
                                            {opt}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </TouchableOpacity>
                </Modal>
            )}
        </View>
    );
}
