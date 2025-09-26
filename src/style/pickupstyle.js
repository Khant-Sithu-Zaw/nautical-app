import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/scale';
const dropdownStyles = StyleSheet.create({
    customPicker: {
        borderWidth: scale(1),
        borderColor: "#ccc",
        borderRadius: moderateScale(5),
        paddingVertical: verticalScale(6),
        borderRadius: moderateScale(10),
        paddingHorizontal: scale(10),
        backgroundColor: "#fff",
        borderColor: "#205E95",

    },
    pickerText: {
        fontSize: moderateScale(12),
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        width: scale(200),
        maxHeight: verticalScale(200),
        borderRadius: moderateScale(8),
        padding: moderateScale(10),
    },
    option: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    optionText: {
        fontSize: moderateScale(14),
        color: "#205E95"
    },
});
export default dropdownStyles;