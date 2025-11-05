import React, { useLayoutEffect } from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import styles from "../style/styles";
import Card from "../components/Card";
export default function TopicScreen() {
    const route = useRoute();
    const { course } = route.params || {}; // safely read params
    const navigation = useNavigation();

    // Set dynamic header title
    useLayoutEffect(() => {
        if (course?.name) {
            navigation.setOptions({ title: course.name });
        }
    }, [navigation, course]);

    // Handle missing course
    if (!course) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Course not found</Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.courseList}
            contentContainerStyle={{}}
        >
            {course.topics && course.topics.length > 0 ? (
                course.topics.map((topic, index) => (
                    <Pressable
                        key={index}
                        // onPress={() => navigation.navigate("Topic Detail", { topic })}
                        style={[styles.pressableCard, {
                            width
                                : "100%"
                        }]}
                    >
                        {({ pressed }) => (
                            <Card
                                style={[styles.cardItem, {
                                    backgroundColor: pressed ? "#3C78AD" : "#fff",
                                }]}
                            >
                                <Text
                                    style={[styles.cardTopic, {

                                        color: pressed ? "#fff" : "#205E95",
                                        fontWeight: "bold",

                                    }]}
                                >
                                    {`Topic ${index + 1}: ${topic}`}
                                </Text>

                            </Card>
                        )}
                    </Pressable>
                ))
            ) : (
                <Text style={{ textAlign: "center", marginTop: 20 }}>
                    No topics available for this course.
                </Text>
            )}
        </ScrollView>
    );
}
