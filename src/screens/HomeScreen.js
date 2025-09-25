import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, Animated, Image } from "react-native";
import styles from "../style/styles";
import { screens } from "../utils/constants";
import { useContext, useRef } from "react";
import { SearchContext } from "../context/SearchContext";
import Carousel from "react-native-reanimated-carousel";
import { verticalScale, } from '../utils/scale';
const { width } = Dimensions.get("window");
export default function HomeScreen({ navigation }) {

    const { searchText } = useContext(SearchContext);
    const carouselRef = useRef(null);
    const filteredScreens = screens.filter(screen =>
        screen.name.toLowerCase().includes(searchText.toLowerCase())
    );
    // Split into chunks of 4
    const chunkArray = (arr, size) =>
        arr.reduce((acc, _, i) => {
            if (i % size === 0) acc.push(arr.slice(i, i + size));
            return acc;
        }, []);

    let chunkedData = chunkArray(filteredScreens, 4);

    // If no results, insert one card with an empty array so renderCard works
    if (chunkedData.length === 0) {
        chunkedData = [[]];
    }

    // Render one card with up to 4 buttons
    const renderCard = ({ item }) => (
        <View style={[styles.card, { marginHorizontal: 10, top: 0, minHeight: verticalScale(500), position: "relative" }]}>
            {item.length > 0 ? (
                item.map((tool) => (
                    <TouchableOpacity
                        key={tool.route}
                        style={styles.screenButton}
                        onPress={() => navigation.navigate(tool.route)}
                    >
                        <Text style={styles.buttonText}>{tool.name}</Text>
                    </TouchableOpacity>
                ))
            ) : (
                <Text style={styles.notFoundText}>
                    Oops.Not Found !!
                </Text>
            )}
            <Image
                source={require("../../assets/images/master.png")}
                style={styles.cardImage}
            />
        </View>
    );
    return (

        <View style={styles.homeContainer}>
            <View style={styles.homeTop} />
            <View >
                <Carousel
                    ref={carouselRef}
                    width={width * 0.86}
                    height={600}
                    data={chunkedData}
                    renderItem={renderCard}
                    style={styles.carouselWrapper}
                    customConfig={() => ({ type: "positive", viewCount: 1 })}
                    loop={false}
                    enabled={chunkedData.length > 1}
                />

                {chunkedData.length > 1 && (
                    <View style={styles.carouselContent}>
                        <TouchableOpacity
                            style={styles.leftArrow}
                            onPress={() => carouselRef.current?.prev()}
                        >
                            <Image
                                source={require("../../assets/images/leftArrow.png")} // 👈 your left arrow image
                                style={styles.arrowIcon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.rightArrow}
                            onPress={() => carouselRef.current?.next()}
                        >
                            <Image
                                source={require("../../assets/images/rightArrow.png")} // 👈 your left arrow image
                                style={styles.arrowIcon}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </View>

        </View >
    );
}


