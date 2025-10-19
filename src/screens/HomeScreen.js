import React, { useContext, useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Animated, Easing } from "react-native";
import styles from "../style/styles";
import { screens, safetyTips } from "../utils/constants";
import { SearchContext } from "../context/SearchContext";
import { DateTime } from "luxon";
import { scale, moderateScale, verticalScale } from '../utils/scale';
export default function HomeScreen({ navigation }) {
    const { searchText } = useContext(SearchContext);
    const [randomTip, setRandomTip] = useState("");
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(10)).current;
    const [utcTime, setUtcTime] = useState(DateTime.utc());
    const getRandomTip = () => {
        const index = Math.floor(Math.random() * safetyTips.length);
        setRandomTip(safetyTips[index]);
    };

    const animateTip = () => {
        // Fade out first
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease),
            }),
            Animated.timing(translateY, {
                toValue: 10,
                duration: 400,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease),
            }),
        ]).start(() => {
            getRandomTip();
            // Reset position below for fade-in
            translateY.setValue(10);
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 900,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.ease),
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 900,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.ease),
                }),
            ]).start();
        });
    };

    useEffect(() => {
        getRandomTip();
        // Fade in the first tip gently
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
            }),
        ]).start();



        const interval = setInterval(animateTip, 30000); // every 60s
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        const utcInterval = setInterval(() => {
            setUtcTime(DateTime.utc());
        }, 1000);

        return () => clearInterval(utcInterval);
    }, []);
    const filteredScreens = screens.filter(screen =>
        screen.name.toLowerCase().includes(searchText.toLowerCase())
    );
    return (
        <View >
            <View style={styles.homeTop}>
                <View style={[styles.flexBox, { justifyContent: "space-around" }]}>
                    <Image
                        source={require("../../assets/images/master.png")}
                        style={styles.homeImage}
                    />
                    <Text style={styles.headerTitle}>Hello seafarers, Welcome!</Text>

                </View>
                <View style={styles.homeContainer}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                        <Text style={styles.title}>Safety Tip for you!
                        </Text>
                        <Text style={styles.dateUTC}> {utcTime.toFormat("yyyy-LL-dd HH:mm:ss ")}</Text>
                    </View>
                    <Animated.Text
                        style={[
                            styles.homeContent,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY }],
                            },
                        ]}
                    >
                        {randomTip}
                    </Animated.Text>
                </View>

            </View>
            <View style={[styles.flexBox, styles.screenContainer, { justifyContent: 'flex-start' }]}>
                {filteredScreens.length > 0 ? (
                    filteredScreens.map((tool, index) => (
                        <TouchableOpacity
                            key={tool.route}
                            style={styles.screenButton}
                            onPress={() => navigation.navigate(tool.route)}
                        >
                            <Image
                                source={tool.image}
                                style={styles.btnIcon}
                            />
                            <Text style={styles.buttonText}>{tool.name}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.notFoundText}>Oops. Not Found !!</Text>
                )}
            </View>
        </View >
    );
}
