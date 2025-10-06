// SplashScreen.js
import React, { useEffect, useRef } from "react";
import { View, Image, Animated, Dimensions } from "react-native";
import styles from "../style/styles";
import WaveBottom from "../components/WaveBottom";
import { verticalScale, moderateScale } from '../utils/scale';

export default function SplashScreen() {
    const whiteAnim = useRef(new Animated.Value(0)).current;
    const grayAnim = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        const loopAnimation = Animated.loop(
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(whiteAnim, {
                        toValue: moderateScale(-20),
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(grayAnim, {
                        toValue: moderateScale(20),
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(whiteAnim, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(grayAnim, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]),
            ])
        );
        loopAnimation.start();

    }, []);

    return (
        <View style={styles.container} className="flex w-100 h-100 justify-content-center align-items-center bg-thir position-relative">
            <Image
                source={require("./../../assets/images/splash-logo.png")}
                style={styles.splashLogo}
            />
            <View style={styles.splashSpinner}>
                <Animated.Image
                    source={require("./../../assets/images/spinnerGray.png")}
                    style={[
                        styles.spinnerImg,
                        styles.spinnerGray,
                        { transform: [{ translateX: grayAnim }] },
                    ]}
                />
                <Animated.Image
                    source={require("./../../assets/images/spinnerWhite.png")}
                    style={[
                        styles.spinnerImg,
                        styles.spinnerWhite,
                        { transform: [{ translateX: whiteAnim }] },
                    ]}
                />
            </View>
            <WaveBottom
                fill="#FFFFFF78"
                height={verticalScale(80)}
                amplitude={verticalScale(12)}
                speed={1000}
                points={6}
            />
        </View>
    );
}

