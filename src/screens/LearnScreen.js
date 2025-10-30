import React from 'react'
import { View, Text, TouchableOpacity, Image, Pressable, ScrollView } from "react-native";
import styles from "../style/styles";
import { scale, moderateScale, verticalScale } from '../utils/scale';
import { courses } from '../utils/constants';
import Card from "../components/Card";
export default function LearnScreen({ navigation }) {

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {/* Title (optional) */}
            <Text
                style={
                    styles.homeTop
                }
            >

            </Text>

            {/* Scrollable area */}
            <View style={{ flex: 1, marginBottom: 80 }}>
                {/* 👆 marginBottom = height of your footer */}
                <ScrollView
                    contentContainerStyle={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        paddingBottom: verticalScale(70),
                        paddingTop: verticalScale(20),
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {courses.length > 0 ? (
                        courses.map((tool, index) => (
                            <Pressable
                                key={index}
                                style={[
                                    {
                                        width: "85%",
                                        marginTop: verticalScale(10),
                                        marginBottom: verticalScale(20),
                                    },
                                ]}
                                onPress={() => navigation.navigate("CourseScreen")}
                            // onPress={() => navigation.navigate(tool.name)}
                            >
                                {({ pressed }) => (
                                    <Card
                                        style={{
                                            backgroundColor: pressed ? "#3C78AD" : "#fff",
                                            elevation: 3,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            paddingHorizontal: scale(25),
                                            paddingVertical: verticalScale(10),
                                        }}
                                    >
                                        <Text
                                            style={{

                                                color: pressed ? "#fff" : "#205E95",
                                                fontSize: moderateScale(16),
                                                fontWeight: "bold",

                                            }}
                                        >
                                            {tool.name}
                                        </Text>
                                        <Image
                                            source={require("../../assets/images/rightArrow.png")}
                                            style={[styles.arrow, { tintColor: pressed ? "#fff" : "#205E95" }]}
                                        />
                                    </Card>
                                )}
                            </Pressable>
                        ))
                    ) : (
                        <Text>No courses available</Text>
                    )}
                </ScrollView>
            </View>
        </View>
    );
}

