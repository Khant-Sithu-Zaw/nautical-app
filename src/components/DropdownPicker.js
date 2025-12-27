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
    Platform
} from "react-native";
import { moderateScale, verticalScale } from "../utils/scale";
import dropdownStyles from "../style/pickupstyle";

const screenHeight = Dimensions.get("window").height;

export default function DropdownPicker({ label, options, selected, onSelect, fromParents, placeholder = "Select", viewStyle = {}, textboxStyle = {} }) {
    const [showModal, setShowModal] = useState(false);
    const [pickerLayout, setPickerLayout] = useState(null);
    const pickerRef = useRef(null);

    const openDropdown = () => {
        if (pickerRef.current) {
            UIManager.measureInWindow(findNodeHandle(pickerRef.current), (x, y, width, height) => {
                setPickerLayout({ x, y, width, height });
                setShowModal(true);
            });
        }
    };

    const closeDropdown = () => setShowModal(false);

    const maxHeight = verticalScale(200);
    const spacing = Platform.OS === "ios" ? verticalScale(0) : verticalScale(32);

    return (
        <View style={[viewStyle]}>
            {label && <Text style={{ fontWeight: "bold", marginBottom: 5 }}>{label}</Text>}

            <TouchableOpacity
                ref={pickerRef}
                style={[
                    dropdownStyles.customPicker,
                    fromParents,
                    { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }
                ]}
                onPress={openDropdown}
            >
                <Text
                    style={[
                        dropdownStyles.pickerText,
                        { color: selected ? "black" : "gray" },
                        textboxStyle
                    ]}
                >
                    {selected || placeholder}
                </Text>
                <Text style={{ fontSize: moderateScale(9) }}>▼</Text>
            </TouchableOpacity>

            {showModal && pickerLayout && (
                <Modal transparent animationType="fade" visible={showModal} onRequestClose={closeDropdown}>
                    <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPressOut={closeDropdown}>
                        <View
                            style={{
                                position: "absolute",
                                top: pickerLayout.y + pickerLayout.height + spacing + maxHeight > screenHeight
                                    ? pickerLayout.y - maxHeight - spacing
                                    : pickerLayout.y + pickerLayout.height + spacing,
                                left: pickerLayout.x,
                                width: pickerLayout.width,
                                maxHeight: maxHeight,
                                backgroundColor: "#477DAD",
                                borderRadius: moderateScale(8),
                                borderWidth: 1,
                                borderColor: "#477DAD",
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
                                            closeDropdown();
                                        }}
                                    >
                                        <Text
                                            style={[
                                                dropdownStyles.optionText,
                                                String(selected).trim() === String(opt).trim() && { fontWeight: "bold" },
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
