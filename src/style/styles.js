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
        width: scale(16),
        height: verticalScale(23),
        marginRight: scale(8),
        tintColor: "#fff",
    },
    // BackIcon ends
    // Common starts
    screenContainer: {
        width: "100%",
        // paddingTop: verticalScale(15),
        // paddingHorizontal: scale(10),
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
        fontFamily: 'JacquesFrancois',
    },
    leftItem: {
        width: "50%",
        paddingHorizontal: scale(20),
        marginBottom: verticalScale(20)
    },

    label: {
        fontSize: moderateScale(13),
        color: "#205E95",
        fontFamily: 'JacquesFrancois',
    },
    inputLabel: {
        width: "40%",
        paddingRight: scale(10),
        paddingLeft: scale(17),
    },
    rightItem: {
        width: "50%",
        paddingRight: scale(20),
        position: "relative",
        marginBottom: verticalScale(20)
    },
    inputContainer: {
        width: "60%",
    },
    textInput: {
        fontSize: moderateScale(12),
        borderColor: "#205E95",
        borderWidth: moderateScale(1),
        backgroundColor: "#fff",
        borderRadius: moderateScale(6),
        paddingHorizontal: scale(8),
        paddingVertical: verticalScale(6),
        color: "#000",
    },
    signBtn: {
        position: "absolute",
        width: scale(28),
        height: verticalScale(33),
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0,
        backgroundColor: "#477DAD",
        borderRadius: moderateScale(6),
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        left: scale(0),
        top: "50%",
        transform: [{ translateY: -verticalScale(16) }], // half of button height
        zIndex: 1
    },
    signTxt: {
        fontSize: moderateScale(12),
        color: "#ffffff"
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
        transform: [{ translateY: verticalScale(-31) }],
        fontSize: moderateScale(7),
        right: scale(-2),
        zIndex: 10,
        width: scale(28),
        height: verticalScale(28),
        textAlign: "center",
        paddingTop: verticalScale(9)
    },
    //dateTime Input
    dateInput: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: moderateScale(1),
        borderColor: "#205E95",
        borderRadius: moderateScale(6),
        paddingVertical: verticalScale(6),
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
        marginRight: scale(3)
    },
    resultText: {
        color: "#205E95",
        fontSize: moderateScale(16),
        marginVertical: verticalScale(5),
        textAlign: "center",
        width: "100%",
        fontFamily: 'JacquesFrancois',
    },
    calculateBtn: {
        backgroundColor: "#477DADC7",
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
    bannerText:{
        color:"#fff",
        textAlign:"center",
        fontWeight: "bold",
        fontSize:moderateScale(16),
        moderateScale:moderateScale(13),
        lineHeight:moderateScale(23)
    },
    bannerContent:{
         backgroundColor: "#3C78AD",
         display:"flex",
         direction:"column",
         justifyContent:"center",
         alignItems:"center",
         width:"100%",
        paddingTop: verticalScale(40),
        paddingBottom:verticalScale(26),
        paddingHorizontal: scale(20),
        margin:"auto"
    },
    mainContent:{
        backgroundColor:"#fff",
        paddingHorizontal:scale(20),
    }
    ,
    anchorLogo:{
        marginVertical:scale(30),
        width:scale(70)
    },
    contentTitle:{
        paddingHorizontal:scale(20),
        fontWeight:"bold",
        fontSize:moderateScale(16),
        textAlign:"center",
        
    },
    relativeHolder:{
        position:"relative",
        alignContent:"center"
    },
    commentBoxIcon:{
        position:"absolute",
         top:70,
          right:45,
        
    },
    sendEmoji:{
        marginLeft:moderateScale(20),
       
    }
    ,
    maxText:{
        
        paddingRight:moderateScale(20)
    },
    lftBox:{
        paddingLeft:moderateScale(40),
    },
    rhtBox:{
        paddingRight:moderateScale(25)
    }
});

export default styles;
