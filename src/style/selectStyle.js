import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/scale';
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const selectStyle = StyleSheet.create({
    dropdownButton: {
        borderColor: "#205E95",
        borderWidth: moderateScale(1),
        backgroundColor: "#fff",
        borderRadius: moderateScale(6),
        paddingHorizontal: scale(8),
        paddingVertical: verticalScale(6),
        color: "#000",

        width: "100%",
        alignSelf: "center",
        maxHeight: 250, // limit height
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    dropdownText: {
        fontSize: scale(12),
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        paddingHorizontal: scale(20),
    },
    modalContainer: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: scale(10),
        maxHeight: "80%",

    },
    searchInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: scale(8),
        marginBottom: scale(10),
    },
    item: {
        padding: scale(12),
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    closeBtn: {
        padding: scale(10),
        backgroundColor: "#3C78AD",
        borderRadius: 6,
        alignItems: "center",
        marginTop: scale(10),
    },
});
export default selectStyle;