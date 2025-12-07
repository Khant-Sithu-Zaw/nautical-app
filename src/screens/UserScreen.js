import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Alert, Image, Platform, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as IntentLauncher from "expo-intent-launcher";
import styles from "../style/styles";
import { menuItems } from "../utils/constants";
import Card from "../components/Card";
import generateCVHtml from "../utils/generateCVHtml";
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";
// import * as FileSystem from "expo-file-system";
import * as FileSystem from "expo-file-system/legacy";

export default function UserScreen({ navigation }) {
    const [userExists, setUserExists] = useState(false);
    const [user, setUser] = useState(null);
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

    // const exportCV = async () => {
    //     if (!user) {
    //         Alert.alert('Error', 'User data not loaded yet');
    //         return;
    //     }

    //     try {
    //         const html = generateCVHtml(user);

    //         // Generate PDF
    //         const { uri } = await Print.printToFileAsync({ html });
    //         console.log('Temporary PDF URI:', uri);

    //         // Ask user to share/save PDF
    //         await Sharing.shareAsync(uri);

    //         Alert.alert('Success', 'PDF exported successfully!');
    //     } catch (err) {
    //         console.log('PDF Error', err);
    //         Alert.alert('Error', 'Could not export PDF');
    //     }
    // };
    const exportCV = async () => {
        if (!user) return;

        try {
            const html = generateCVHtml(user);

            const { uri: tempUri } = await Print.printToFileAsync({ html });

            // ---------- iOS ----------
            if (Platform.OS === "ios") {
                await Sharing.shareAsync(tempUri);
                Alert.alert("Exported!");
                return;
            }

            // ---------- ANDROID ----------
            // build filename = date + username
            // ---------- ANDROID ----------
            const today = new Date().toISOString().slice(0, 10);

            const safeName = (user?.name ?? "CV").replace(/\s+/g, "_");

            const fileName = `${today}_${safeName}.pdf`;


            const downloads = FileSystem.documentDirectory + "CVs/";

            const finalPath = downloads + fileName;

            // make sure folder exists
            await FileSystem.makeDirectoryAsync(downloads, { intermediates: true }).catch(() => { });

            // read PDF and save manually
            const base64 = await FileSystem.readAsStringAsync(tempUri, {
                encoding: "base64",
            });

            await FileSystem.writeAsStringAsync(finalPath, base64, {
                encoding: "base64",
            });


            // Save to storage for viewing later
            await AsyncStorage.setItem("latestPDF", finalPath);



            // open pdf
            // await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
            //     data: finalPath,
            //     flags: 1,
            //     type: "application/pdf",
            // });


            // open viewer safely
            await Sharing.shareAsync(finalPath, {
                mimeType: "application/pdf",
                dialogTitle: "Open CV",
            });
        } catch (err) {
            console.log("PDF Error", err);
            Alert.alert("Error exporting file");
        }
        ToastAndroid.show("Saved to Downloads", ToastAndroid.SHORT);
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

