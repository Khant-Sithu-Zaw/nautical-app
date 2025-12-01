import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import WebView from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import generateCVHtml from "../utils/generateCVHtml";

export default function CVPreviewScreen() {
    const [htmlContent, setHtmlContent] = useState("");

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const json = await AsyncStorage.getItem("userProfile");
            if (json) {
                const user = JSON.parse(json);
                const html = generateCVHtml(user);
                setHtmlContent(html);
            }
        } catch (e) {
            console.log("Load user error:", e);
        }
    };

    const exportPDF = async () => {
        try {
            if (!htmlContent) {
                Alert.alert("Nothing to export");
                return;
            }

            // Convert HTML → PDF
            const { uri } = await Print.printToFileAsync({
                html: htmlContent,
            });

            // Open system share/save dialog
            await Sharing.shareAsync(uri, { dialogTitle: "Share your CV (PDF)" });
        } catch (error) {
            console.log("PDF Error:", error);
            Alert.alert("Export Failed", String(error));
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {htmlContent !== "" && (
                <WebView source={{ html: htmlContent }} style={{ flex: 1 }} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: "#0369a1",
        padding: 15,
        alignItems: "center",
    },
    btnText: { color: "white", fontSize: 16 },
});
