import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../style/styles";
export default function UserScreen({ navigation }) {
    const [userExists, setUserExists] = useState(false);
    useEffect(() => {
        const checkUser = async () => {
            const data = await AsyncStorage.getItem("userProfile"); //  ✅ your key
            setUserExists(!!data);
        };

        // Refresh every time screen comes into focus
        const focusSubscription = navigation.addListener("focus", checkUser);

        return focusSubscription;
    }, [navigation]);

    const deleteProfile = () => {
        Alert.alert(
            "Delete Profile",
            "Are you sure you want to delete your profile?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        await AsyncStorage.removeItem("userProfile"); //  ✅ your key
                        setUserExists(false);
                    }
                }
            ]
        );
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#3C78AD",
                justifyContent: "center",
                alignItems: "center",
            }}
        >

            {!userExists ? (
                // ❌ No profile → show setup option
                <Pressable onPress={() => navigation.navigate("Setup Profile")}>
                    {({ pressed }) => (
                        <Text
                            style={[
                                styles.linkText,
                                { textDecorationLine: pressed ? "underline" : "none" },
                            ]}
                        >
                            Set up Profile{"\n"}
                            <Text>Get a Curriculum Vitae</Text>
                        </Text>
                    )}
                </Pressable>
            ) : (
                // ✅ Profile exists → show view + delete
                <>
                    <Pressable onPress={() => navigation.navigate("Setup Profile")}>
                        {({ pressed }) => (
                            <Text
                                style={[
                                    styles.linkText,
                                    { textDecorationLine: pressed ? "underline" : "none" },
                                ]}
                            >
                                View Your Profile
                            </Text>
                        )}
                    </Pressable>

                    <Pressable
                        style={{ marginTop: 20 }}
                        onPress={deleteProfile}
                    >
                        <Text style={[styles.linkText,]}>
                            Delete Profile
                        </Text>
                    </Pressable>
                </>
            )}
        </View>
    );
}

