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
        backgroundColor: "#3C78AD",
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
        width: scale(35),
        height: verticalScale(35),
        resizeMode: "contain",
        marginRight: scale(10)

    },
    headerTitle: {
        fontSize: moderateScale(15),
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
        left: scale(4),
        height: verticalScale(1),
        backgroundColor: "white",
        width: "94%",
    }, searchIcon: {
        position: "absolute",
        right: scale(5),
        top: "50%", // percentage must be a string
        transform: [{ translateY: verticalScale(-14) }], // adjust with number, not %
        width: scale(18),
        height: verticalScale(18),

    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#477DAD",
        paddingTop: verticalScale(18),
        paddingBottom: verticalScale(65),
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
        borderRadius: moderateScale(20),
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        padding: verticalScale(20),
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        marginVertical: verticalScale(20),
        height: verticalScale(160),
    },
    homeContent: {
        color: "#477DAD", fontSize: 14,
        zIndex: 2
    },
    homeBgImg: {
        width: scale(52),
        height: verticalScale(52),
        bottom: verticalScale(30),
        position: "absolute",
        resize: "contain",
        right: scale(35),
        zIndex: 1
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
        width: scale(30),
        height: verticalScale(30)
    }
    ,
    screenButton: {
        width: "30%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: moderateScale(10),
        borderRadius: moderateScale(20),
        marginVertical: verticalScale(8),
    },
    buttonText: {
        color: "#205E95",
        fontSize: moderateScale(12),
        textAlign: "center",
    },

    screenContainer: {
        width: "100%",
        paddingTop: verticalScale(20)
    },
    extraOptionalContent: {
        position: "absolute",
        bottom: verticalScale(220),
        left: 0,
        right: 0,
        alignItems: "center",

    },
    bannerContainer: {
        width: "100%",

    },
    bannerContent: {
        paddingTop: verticalScale(40),
        backgroundColor: "#3C78AD",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: verticalScale(100),
    },
    bannerText: {
        fontSize: moderateScale(14),
        paddingHorizontal: scale(20),
        textAlign: "center",
        color: "#fff",
        fontWeight: "bold",
        lineHeight: moderateScale(25),
        letterSpacing: moderateScale(0.5),
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
        top: verticalScale(-90),
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
        backgroundColor: "#3C78AD",
        display: "flex",
        paddingHorizontal: scale(20)
    },

    btnIcon: {
        width: scale(55),
        height: verticalScale(55)
    },
    homeImage: {

        width: scale(100), height: verticalScale(93), resizeMode: "contain",
        marginRight: scale(20)
    },
    title: {
        color: "#477DAD",
        marginBottom: verticalScale(10),
        fontSize: moderateScale(16),
        fontWeight: "bold"
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
        marginHorizontal: scale(2),
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
        flexWrap: "wrap",
        justifyContent: "center"
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
        paddingVertical: verticalScale(5),
        color: "#000"
    },
    inputUnit: {
        width: "70%",
        borderTopRightRadius: moderateScale(0),
        borderBottomRightRadius: moderateScale(0),
    },
    inputIcon: {
        width: "30%",
        borderWidth: moderateScale(1),
        backgroundColor: "#205E95",
        borderTopRightRadius: moderateScale(10),
        borderBottomRightRadius: moderateScale(10),
        borderColor: "#205E95",
        justifyContent: "center",
        paddingVertical: verticalScale(5.5),
    },
    inputIconText: {
        color: "#fff",
        fontSize: moderateScale(12),
        textAlign: "center",
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
    SideInput: {
        width: "47%",
        marginBottom: verticalScale(20),
    },

    coverterTitle: {
        fontSize: moderateScale(13),
        fontWeight: "bold",
        color: "#205E95",
        marginBottom: verticalScale(10),
        width: "100%",

    },
    homeBanner: {
        width: "100%",
        paddingVertical: verticalScale(50),
        backgroundColor: "#3C78AD",
    },
    notFoundText: {
        color: "#205E95", textAlign: "center", marginTop: verticalScale(80),
        fontSize: moderateScale(16), fontWeight: "bold",
    },
    inDevText: {
        color: "#fff", textAlign: "center", fontWeight: "bold",
        fontSize: moderateScale(30),
    },
    clearBtn: {
        position: "absolute",
        right: scale(6),
        top: "7%", // percentage must be a string
        transform: [{ translateY: verticalScale(-7) }], // adjust with number, not %
        fontSize: moderateScale(12),
    }
    , emojiTxt: {
        fontSize: moderateScale(10),
    }
    ,

    aboutIcon: {
        width: scale(50),
        height: verticalScale(50),
        resizeMode: "contain",
        marginHorizontal: scale(2),

    }, maxText: {
        left: scale(20),
    },
    commentBoxIcon: {
        position: "absolute",
        bottom: verticalScale(3), // percentage must be a string
        fontSize: moderateScale(10),
    }, sendEmoji: {
        right: scale(20),
        fontSize: moderateScale(16),
    },
    aboutUsImg: {
        width: scale(80),
        height: verticalScale(80),
        borderRadius: moderateScale(50),
        resizeMode: "cover",
    }
});

export default styles;
