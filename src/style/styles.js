import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/scale';
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: "#3C78ADB2",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        position: "relative",
    },
    splashLogo: {
        width: scale(140),
        height: verticalScale(107),
        marginBottom: verticalScale(20),
    },
    splashSpinner: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    spinnerImg: {
        width: scale(27),
        height: verticalScale(26),
        position: "absolute",
        top: 0,
    },
    spinnerGray: {
        right: moderateScale(-4),
        zIndex: 1,
    },
    spinnerWhite: {
        left: moderateScale(-4),
        zIndex: 2,
    },
    headContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#477DAD",
        paddingTop: verticalScale(50),
        paddingBottom: verticalScale(30),
        paddingHorizontal: scale(15)
    },
    logoWrapper: {
        width: "42%",
        flexDirection: "row",
        alignItems: "center",
    },

    logo: {
        width: scale(18),
        height: verticalScale(20),
        resizeMode: "contain",

    },
    headerTitle: {
        fontSize: moderateScale(15),
        marginHorizontal: scale(15),
        color: "#fff",
    },
    searchWrapper: {
        width: "46%",
        position: "relative"
    },
    searchBox: {
        fontSize: moderateScale(14),
        paddingVertical: 0,
        position: "relative",
        color: "white",

    },
    searchBoxLine: {
        position: "absolute",
        bottom: -moderateScale(1),
        left: 0,
        right: 0,
        height: verticalScale(1),
        backgroundColor: "white",
        width: "100%",
        // width: scale(160)
    }, searchIcon: {
        position: "absolute",
        right: scale(10),
        top: "50%", // percentage must be a string
        transform: [{ translateY: verticalScale(-7) }], // adjust with number, not %
        width: scale(13),
        height: verticalScale(13),

    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#477DAD",
        paddingTop: verticalScale(10),
        paddingBottom: verticalScale(50),
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    tabButton: {
        width: "33%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    footerText: {
        color: "#fff",
        fontSize: moderateScale(14),
        fontWeight: "bold",
    },
    homeContainer: {
        flex: 1,
        alignItems: "center",
        position: "relative",

    },
    tabActive: {
        backgroundColor: "#fff",
        padding: moderateScale(6),
        borderRadius: moderateScale(50),

    },
    tab: {
        backgroundColor: "transparent",
        padding: moderateScale(6),
        flex: 3
    },
    tabImg: {
        width: scale(24),
        height: verticalScale(24)
    }
    , flatList: {
        width: "80%",
        display: "flex",

    },
    screenButton: {
        width: scale(240),
        backgroundColor: "#6f9abf",
        padding: moderateScale(10),
        borderRadius: moderateScale(20),
        marginVertical: verticalScale(8),
    },
    buttonText: {
        color: "#fff",
        fontSize: moderateScale(16),
        textAlign: "center",
    },

    screenContainer: {
        width: "100%",
        alignItems: "center",
        flex: 1,

    },
    bannerContainer: {
        width: "100%",
        zIndex: -1,
    },
    bannerImage: {
        width: "100%",
        height: verticalScale(250),
        resizeMode: "cover",
    },
    content: {
        position: "relative",
        width: "86%",

    }
    , card: {
        backgroundColor: "#fff",
        position: "absolute",
        top: verticalScale(-50),
        left: 0,
        right: 0,
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        paddingTop: verticalScale(20),
        paddingBottom: verticalScale(30),
        alignItems: "center",
        paddingHorizontal: scale(18),
        borderRadius: moderateScale(20),
        elevation: moderateScale(5), // for Android shadow

    },

    homeTop: {
        width: "100%",
        height: verticalScale(150), // Blue banner height
        backgroundColor: "#477DAD",
        position: "relative",
    },

    carouselWrapper: {

        alignSelf: "center",
        height: verticalScale(600),             // same as carousel height
        width: width * 0.86,     // same as carousel width
        position: "relative",
        marginTop: verticalScale(-140), // ✅ lifts carousel into the blue area
    },
    carouselContent: {
        flexDirection: "row",
        marginTop: verticalScale(10),
        position: "absolute",
        transform: [{ translateY: verticalScale(-60) }],
        top: "40%", // adjust based on carousel height
        zIndex: 10,
        width: "86%",
        justifyContent: "space-between",

    },

    leftArrow: {
        left: scale(-15),
    },
    rightArrow: {
        right: scale(-15),
    },
    arrowIcon: {
        width: scale(50),          // white arrow
        height: verticalScale(50),
        resizeMode: "contain",
    },
    cardImage: {
        position: "absolute",
        bottom: verticalScale(5),
        left: "50%", // center horizontally
        transform: [{ translateX: scale(-88) }], // half of width (212 / 2 = 106) to center exactly
        opactiy: 0.5,
        width: scale(212), height: verticalScale(196), resizeMode: "contain"
    },
    title: {
        position: "relative",
    },
    contentTitle: {
        fontWeight: "bold",
        fontSize: moderateScale(13),
        textAlign: "center",
        marginBottom: verticalScale(20),
        color: "#205E95"
    },
    titleLine: {
        position: "absolute",
        bottom: verticalScale(10),
        left: 0,
        right: 0,
        height: verticalScale(2),
        backgroundColor: "#205E95",
        width: "100%",
        borderRadius: moderateScale(2),
    },
    inputForm: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignContent: "center",
        alignItems: "center",

    },
    leftInput: {
        width: "42%",
        marginBottom: verticalScale(15),
    },
    rightInput: {
        width: "58%",
        marginBottom: verticalScale(15),
    },
    label: {
        fontSize: moderateScale(12),
        color: "#205E95",
        fontWeight: "bold",
        fontFamily: 'JacquesFrancois',
    },
    dateInput: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: moderateScale(1),
        borderColor: "#205E95",
        borderRadius: moderateScale(10),
        paddingVertical: verticalScale(6),
        paddingHorizontal: scale(12),
        backgroundColor: "#fff",
        width: "100%",
    },
    dateText: {
        fontSize: moderateScale(12),
        color: "#636060ff",
    },
    icon: {
        marginRight: scale(2),
    },

    dropdown: {
        height: verticalScale(32),
        borderColor: "#205E95",
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(10),
        width: scale(50),
        fontSize: moderateScale(12),
        textAlign: "center",
        marginRight: scale(5),
    },
    dropdownText: {   // <-- this controls font size inside the dropdown
        fontSize: moderateScale(12),
        textAlign: "center",
        borderColor: "#205E95",
        borderWidth: moderateScale(1)
    },

    placeholderStyle: {   // placeholder font size
        fontSize: moderateScale(12),
        textAlign: "center",
        letterSpacing: moderateScale(2),
    },
    dropdownItem: {
        fontSize: moderateScale(12),
        textAlign: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#205E95",
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(8),
        borderStyle: "dotted"
    },
    dropdownPopup: {
        borderWidth: moderateScale(1),
        borderColor: "#ccc",
        borderRadius: moderateScale(8),
        backgroundColor: "#fff",
    },

    selectedTextStyle: {  // selected value style
        fontSize: moderateScale(12),
        textAlign: "center",
    },
    timeInput: {
        fontSize: moderateScale(12),
        borderColor: "#205E95",
        borderWidth: moderateScale(1),
        padding: moderateScale(5),
        width: scale(40),
        textAlign: "center",
        borderRadius: moderateScale(5),
    },
    flexBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

    }
    , relativeHolder: {
        position: "relative",
    },
    textInput: {

        fontSize: moderateScale(12),
        borderColor: "#205E95",
        borderWidth: moderateScale(1),
        backgroundColor: "#fff",
        borderRadius: moderateScale(10),
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(6),
    },
    inputUnit: {
        width: "70%",
        borderTopRightRadius: moderateScale(0),
        borderBottomRightRadius: moderateScale(0),
    },
    inputIcon: {
        width: "30%",
        fontSize: moderateScale(12),
        color: "#205E95",
        backgroundColor: "#205E95",
        borderTopRightRadius: moderateScale(10),
        borderBottomRightRadius: moderateScale(10),
        paddingVertical: verticalScale(6),
        textAlign: "center",
        borderColor: "#205E95",
        borderWidth: moderateScale(1),
        color: "#fff",

    },
    btn: {
        backgroundColor: "#477DAD",
        padding: moderateScale(10),
        borderRadius: moderateScale(15),

    },
    btnText: {
        fontSize: moderateScale(13),
        textAlign: "center",
        color: "#fff",
        fontWeight: "bold",

    },
    resultText: {
        color: "#205E95",
        fontSize: moderateScale(13),
        marginVertical: verticalScale(5),
        textAlign: "center",
        width: "100%"
    }
    , fontJacques: {
        fontFamily: 'JacquesFrancois',
    }
    , data: {
        fontWeight: "900"
    },
    lftSideInput: {
        width: "47%",
    },
    rhtSideInput: {
        width: "47%",
    },
    coverterTitle: {
        fontSize: moderateScale(14),
        fontWeight: "bold",
        color: "#205E95",
        marginBottom: verticalScale(20),

    },
    homeBanner: {
        width: "100%",
        paddingVertical: verticalScale(50),
        backgroundColor: "#3C78AD",
    },
    notFoundText: {
        color: "#143880ff", textAlign: "center", marginTop: verticalScale(80),
        fontSize: moderateScale(16), fontWeight: "bold",
    },
    inDevText: {
        color: "#fff", textAlign: "center", fontWeight: "bold",
        fontSize: moderateScale(30),
    }
});

export default styles;
