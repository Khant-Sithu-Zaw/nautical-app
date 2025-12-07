import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Alert, Image, Platform, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../style/styles";
import { menuItems } from "../utils/constants";
import Card from "../components/Card";
import generateCVHtml from "../utils/generateCVHtml";
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system/legacy";

export default function UserScreen({ navigation }) {
    const [userExists, setUserExists] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
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
            setUser(JSON.parse(data));
        };

        const focusSubscription = navigation.addListener("focus", checkUser);

        return focusSubscription;
    }, [navigation]);

    const exportCV = async () => {
        if (!user) return;

        try {
            setLoading(true);

            const html = generateCVHtml(user);
            const { uri: tempUri } = await Print.printToFileAsync({ html });

            await Sharing.shareAsync(tempUri, {
                mimeType: "application/pdf",
                dialogTitle: "Save or Share your CV",
            });
        } catch (err) {
            console.log("PDF Error", err);
            Alert.alert("Error exporting file");
        } finally {
            setLoading(false);
        }
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
            {loading && (
                <View style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000,
                }}>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={{ color: "#fff", marginTop: 10 }}>Processing...</Text>
                </View>
            )}
        </View>
    );
}

