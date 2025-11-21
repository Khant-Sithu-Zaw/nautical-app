import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/scale';
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    // Splash Screen starts
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: "#477DAD",
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
    // Splash Screen ends
    // Header starts
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
        fontWeight: "bold",
        letterSpacing: moderateScale(0.25),
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
    },
    searchIcon: {
        position: "absolute",
        right: scale(5),
        top: "50%", // percentage must be a string
        transform: [{ translateY: verticalScale(-14) }], // adjust with number, not %
        width: scale(18),
        height: verticalScale(18),

    },
    headerEmoji: {
        top: "50%", // percentage must be a string
        transform: [{ translateY: verticalScale(-20) }],
        fontSize: moderateScale(11),
        right: scale(5),
    },
    clrBtn: {
        position: "absolute",
    },
    // Header ends

    // Footer starts
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3C78AD",
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
    // Footer ends
    // HomeScreen starts
    homeImage: {

        width: scale(115), height: verticalScale(108), resizeMode: "contain",

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

    screenButton: {
        width: "33.33%",
        display: "flex",
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
    homeTop: {
        width: "100%",
        backgroundColor: "#3C78AD",
        display: "flex",
        paddingHorizontal: scale(20),
        minHeight: verticalScale(300),
    },
    btnIcon: {
        width: scale(55),
        height: verticalScale(55)
    },
    title: {
        color: "#477DAD",
        marginBottom: verticalScale(10),
        fontSize: moderateScale(16),
        fontWeight: "bold"
    },
    dateUTC: {
        color: "#205E95",
        fontSize: moderateScale(11),
        paddingTop: verticalScale(6),
    },
    // HomeScreen ends

    //Card starts
    card: {
        backgroundColor: "#fff",
        boxShadow: "0px 8px 10px rgba(0,0,0,0.2)",
        paddingVertical: verticalScale(13),
        paddingHorizontal: scale(10),
        alignItems: "center",
        borderRadius: moderateScale(15),
        elevation: moderateScale(5), // for Android shadow
    },
    cardExtend: {
        width: "90%",
        marginVertical: verticalScale(30),
        borderRadius: moderateScale(10),
    },

    cardImage: {
        width: scale(50),
        height: verticalScale(50)
    },
    cardText: {
        fontSize: moderateScale(15),
        textAlign: "center",
        color: "#205E95",
        fontWeight: "bold",
    },
    cardItem: {
        elevation: 3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: scale(25),
        paddingVertical: verticalScale(10),

    },
    //Card ends
    // BackIcon starts
    backContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: scale(15),
    },
    backIcon: {
        width: scale(20),
        textAlign: "center",
        height: verticalScale(23),
        marginRight: scale(8),
        marginLeft: scale(-10),
        tintColor: "#fff",
    },
    // BackIcon ends
    // Common starts
    screenContainer: {
        width: "100%",
        backgroundColor: "#fff",
        height: "100%"
    },

    layoutContent: {
        paddingVertical: verticalScale(28),

    },

    flexItem: {
        width: "36%",
        marginBottom: verticalScale(25),
        marginHorizontal: scale(22),

    },

    flexBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    converterImage: {
        marginVertical: verticalScale(5),
        width: scale(60),
        height: verticalScale(60),
        resizeMode: "contain",
        marginHorizontal: "auto"
    },
    converterTitle: {
        fontSize: moderateScale(18),
        color: "#205E95",
        marginBottom: verticalScale(10),
        width: "100%",
        fontFamily: 'TimeNewRoman',
    },
    leftItem: {
        width: "55%",
        paddingHorizontal: scale(20),
        marginBottom: verticalScale(20)
    },

    label: {
        fontSize: moderateScale(14),
        color: "#205E95",
        fontFamily: 'TimeNewRoman',
    },
    inputLabel: {
        width: "42%",
        paddingRight: scale(8),
        paddingLeft: scale(17),
    },
    rightItem: {
        width: "45%",
        paddingRight: scale(17),
        position: "relative",
        marginBottom: verticalScale(20)
    },
    inputContainer: {
        width: "58%",
    },
    textInput: {
        fontSize: moderateScale(12),
        borderColor: "#205E95",
        borderWidth: moderateScale(1),
        backgroundColor: "#fff",
        borderRadius: moderateScale(6),
        paddingHorizontal: scale(8),
        paddingVertical: verticalScale(7),
        color: "#000",
    },
    hintBubble: {
        position: "absolute",
        bottom: verticalScale(-18), // above sign button
        left: scale(1), // adjust horizontally
        zIndex: 10,
        color: "#fff"
    },
    hintBubbleText: {
        color: "#6d6d6dff",
        fontSize: moderateScale(11)
    },
    crossEmoji: {
        top: "50%",
        transform: [{ translateY: verticalScale(-33) }],
        fontSize: moderateScale(7),
        right: scale(-4),
        zIndex: 10,
        width: scale(34),
        textAlign: "center",
        paddingVertical: verticalScale(11),

    },
    //dateTime Input
    dateInput: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: moderateScale(1),
        borderColor: "#205E95",
        borderRadius: moderateScale(6),
        paddingVertical: verticalScale(7),
        paddingHorizontal: scale(8),
        backgroundColor: "#fff",
        width: "100%",
    },
    dateText: {
        fontSize: moderateScale(12),
        color: "#636060ff",
    },
    dateIcon: {
        width: scale(21),
        height: verticalScale(21),
        marginRight: scale(6)
    },
    resultText: {
        color: "#205E95",
        fontSize: moderateScale(16),
        marginVertical: verticalScale(5),
        textAlign: "center",

        width: "100%",
        fontFamily: 'TimeNewRoman',
    },
    calculateBtn: {
        backgroundColor: "#477DAD",
        padding: moderateScale(10),
        borderRadius: moderateScale(15),
        width: "90%"
    },
    calculateTxt: {
        fontSize: moderateScale(13),
        textAlign: "center",
        color: "#fff",
        fontWeight: "bold",

    },
    bannerText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: moderateScale(16),
        moderateScale: moderateScale(13),
        lineHeight: moderateScale(23)
    },
    bannerContent: {
        backgroundColor: "#3C78AD",
        display: "flex",
        direction: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingTop: verticalScale(40),
        paddingBottom: verticalScale(26),
        paddingHorizontal: scale(20),
        margin: "auto"
    },
    mainContent: {
        backgroundColor: "#fff",
        paddingHorizontal: scale(20),
    }
    ,
    anchorLogo: {
        marginVertical: verticalScale(30),
        width: scale(70)
    },
    contentTitle: {
        paddingHorizontal: scale(20),
        fontWeight: "bold",
        fontSize: moderateScale(16),
        textAlign: "center",

    },
    relativeHolder: {
        position: "relative",
        alignContent: "center"
    },
    commentBoxIcon: {
        position: "absolute",
        bottom: verticalScale(7),
        right: scale(45),
    },
    sendEmoji: {
        marginLeft: scale(20),
    }
    ,
    maxText: {
        paddingRight: scale(25),
        fontSize: moderateScale(12),
    },
    lftBox: {
        paddingLeft: scale(40),
    },
    rhtBox: {
        paddingRight: scale(25)
    },
    aboutIcon: {
        width: scale(50),
        height: verticalScale(50),
        resizeMode: "contain",
        marginHorizontal: scale(2),
    },
    //Profile Main Screen
    linkText: {
        color: "#ffffff",
        fontSize: moderateScale(20),
        textAlign: "center",
        lineHeight: moderateScale(28),
        marginVertical: verticalScale(10),
    },
    //profile setup
    addIcon: {
        width: scale(25),
        height: verticalScale(25),
        resizeMode: "contain",

    },
    profileContainer: {
        flex: 1, padding: moderateScale(20), backgroundColor: "#fff", marginBottom: verticalScale(40),
    },
    imgCenter: {
        alignItems: "center", marginBottom: verticalScale(15)
    },
    profileImage: {
        width: scale(120), height: verticalScale(120), borderRadius: moderateScale(70), borderWidth: scale(2), borderColor: "#3C78AD", resizeByMode: "contain"
    },
    profileInput: {
        width: "100%", borderWidth: scale(1), borderColor: "#3C78AD", borderRadius: moderateScale(6), paddingHorizontal: scale(10), paddingVertical: verticalScale(6), marginTop: verticalScale(10), fontSize: moderateScale(14), color: "#000"
    },
    section: {
        borderBottomWidth: scale(2), borderBottomColor: "#3C78AD", marginTop: verticalScale(15), marginBottom: verticalScale(10),
    },
    sectionContainer: {
        paddingBottom: verticalScale(4), display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingRight: scale(2),
    },
    box: {
        borderBottomWidth: scale(2), borderBottomColor: "#205E95", paddingBottom: verticalScale(10), marginBottom: verticalScale(10), borderStyle: "dotted",
    },
    sectionTitle: {
        fontSize: moderateScale(18), fontWeight: "bold", color: "#205E95",
    },
    addButton: {
        marginTop: verticalScale(8), backgroundColor: "#3C78AD", padding: moderateScale(10), borderRadius: moderateScale(6), alignItems: "center"
    },
    addText: {
        color: "#fff", fontWeight: "600"
    },
    userBtn: {
        marginTop: verticalScale(20), backgroundColor: "#3C78AD", padding: moderateScale(15), borderRadius: moderateScale(18), alignItems: "center", marginBottom: verticalScale(180), width: "46%"
    },
    btnText: {
        color: "#fff", fontWeight: "600", fontSize: moderateScale(16)
    },
    removeBtn: {
        width: "30%",
        backgroundColor: "#3C78AD",
        padding: moderateScale(8), borderRadius: moderateScale(8),
        marginTop: verticalScale(12),
    },
    clearBtn: {
        position: "absolute",
        right: scale(5),
        padding: moderateScale(6),
        top: "54%",
        transform: [{ translateY: verticalScale(-12) }],
    },
    closeIcon: {
        fontSize: moderateScale(10),
    }
});

export default styles;
