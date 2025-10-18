import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/scale';
const dropdownStyles = StyleSheet.create({
    customPicker: {
        borderWidth: scale(1),
        borderColor: "#205E95",
        borderRadius: moderateScale(6),
        paddingVertical: verticalScale(6),
        paddingHorizontal: scale(10),
        // backgroundColor: "#fff",
        justifyContent: "space-between",
    },
    pickerText: {
        fontSize: moderateScale(12),
        color: "#000",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "transparent", // keeps full-screen clickable area
    },
    modalContent: {
        // backgroundColor: "#477DAD",
        borderRadius: moderateScale(10),
        padding: moderateScale(8),
        elevation: 6,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    option: {
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(12),
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        backgroundColor: "#477DAD",
    },
    optionText: {
        fontSize: moderateScale(12),
        color: "#fff",
    },
});
export default dropdownStyles;