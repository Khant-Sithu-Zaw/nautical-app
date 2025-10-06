import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/scale';
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const radio = StyleSheet.create({
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    outerCircle: {
        height: verticalScale(20),
        width: scale(20),
        borderRadius: moderateScale(10),
        borderWidth: scale(2),
        borderColor: "#333",
        alignItems: "center",
        justifyContent: "center",
        marginRight: scale(6),
    }
    , innerCircle: {
        height: verticalScale(10),
        width: scale(10),
        borderRadius: moderateScale(5),
        backgroundColor: "#333",
    }
    , radioText: {
        color: "#205E95",
        fontSize: 11
    }
});

export default radio;