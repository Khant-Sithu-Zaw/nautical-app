import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Alert, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../style/styles";
import { menuItems } from "../utils/constants";
import Card from "../components/Card";
export default function UserScreen({ navigation }) {
    const [userExists, setUserExists] = useState(false);
    useEffect(() => {
        const checkUser = async () => {
            const data = await AsyncStorage.getItem("userProfile");

            if (!data) {
                // ❌ No saved user → go to Profile Setup Automatically
                navigation.navigate("Profile Setup");
                return;
            }

            // ✅ Data exists → show user screen UI
            setUserExists(true);
        };

        const focusSubscription = navigation.addListener("focus", checkUser);

        return focusSubscription;
    }, [navigation]);

    const exportCV = () => {

    };
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
                backgroundColor: "#477DAD",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
            }}
        >
            {userExists && (
                <>
                    {menuItems(navigation, deleteProfile, exportCV).map((item, index) => (
                        <Pressable key={index} onPress={item.onPress} style={styles.profileBtn}>
                            {({ pressed }) => (
                                <Card
                                    style={{
                                        backgroundColor: pressed ? "#3C78AD" : "#fff", // Blue while pressing
                                    }}
                                >
                                    <Image
                                        source={item.image}
                                        style={[
                                            styles.cardImage,
                                            { tintColor: pressed ? "#fff" : "#3C78AD" }, // Change image color while pressing
                                        ]}
                                        resizeMode="contain"
                                    />
                                    <Text

                                        style={[
                                            styles.cardText,
                                            { color: pressed ? "#fff" : "#3C78AD" }, // Change text color while pressing
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                </Card>
                            )}
                        </Pressable>
                    ))}
                </>
            )}
        </View>
    );
}

