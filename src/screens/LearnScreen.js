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
            <View
                style={
                    styles.homeTop
                }
            >

            </View>
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
                                style={[styles.pressableCard, {
                                    width
                                        : "85%"
                                }]}
                                onPress={() => navigation.navigate("Topic Screen", { course: tool })}

                            >
                                {({ pressed }) => (
                                    <Card
                                        style={[styles.cardItem, {
                                            backgroundColor: pressed ? "#3C78AD" : "#fff",
                                        }]}
                                    >
                                        <Text
                                            style={[styles.cardCourse, {

                                                color: pressed ? "#fff" : "#205E95",
                                                fontWeight: "bold",

                                            }]}
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

