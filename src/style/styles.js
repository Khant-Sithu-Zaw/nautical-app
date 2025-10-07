import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/scale';
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    // Splash Screen starts
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
        letterSpacing: moderateScale(0.25)
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
    // Header ends

    // Footer starts
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
    title: {
        color: "#477DAD",
        marginBottom: verticalScale(10),
        fontSize: moderateScale(16),
        fontWeight: "bold"
    },
    // HomeScreen ends

    //Card starts
    card: {
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        paddingVertical: verticalScale(13),
        paddingHorizontal: scale(10),
        alignItems: "center",
        borderRadius: moderateScale(20),
        elevation: moderateScale(5), // for Android shadow
    },
    cardImage: {
        width: scale(50),
        height: verticalScale(50)
    },
    cardText: {
        fontSize: moderateScale(15),
        textAlign: "center",
        color: "#205E95"
    },
    //Card ends
    // BackIcon starts
    backContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: scale(10),
    },
    backIcon: {
        width: scale(11),
        height: verticalScale(17),
        marginRight: scale(8),
        tintColor: "#fff",
    },
    // BackIcon ends
    // Common starts
    screenContainer: {
        width: "100%",
        paddingTop: verticalScale(15),
        paddingHorizontal: scale(10)
    },

    layoutContent: {
        paddingVertical: verticalScale(28)
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

});

export default styles;
