import React, { useState, useEffect } from "react";
import {
    View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, FlatList
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "../models/User";
import Certificate from "../models/Certificate";
import SeaTimeRecord from "../models/SeaTimeRecord";
export default function ProfileScreen() {
    const [user, setUser] = useState(new User());
    const [certTitle, setCertTitle] = useState("");
    const [certIssuedBy, setCertIssuedBy] = useState("");
    const [certExpiry, setCertExpiry] = useState("");
    const [seaVessel, setSeaVessel] = useState("");
    const [seaRank, setSeaRank] = useState("");
    const [seaFrom, setSeaFrom] = useState("");
    const [seaTo, setSeaTo] = useState("");
    const [seaDuration, setSeaDuration] = useState("");
    const [skillInput, setSkillInput] = useState("");

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("userProfile");
            if (jsonValue != null) {
                setUser(new User(JSON.parse(jsonValue)));
            }
        } catch (e) {
            console.log("Failed to load user:", e);
        }
    };

    const saveUser = async () => {
        try {
            await AsyncStorage.setItem("userProfile", JSON.stringify(user));
            alert("Profile saved successfully!");
        } catch (e) {
            console.log("Failed to save user:", e);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) return;
        setUser({ ...user, image: result.assets[0].uri });
    };

    // Add certificate
    const addCertificate = () => {
        if (certTitle && certIssuedBy && certExpiry) {
            const newCert = new Certificate({ title: certTitle, issuedBy: certIssuedBy, expiryDate: certExpiry });
            setUser({ ...user, certificates: [...user.certificates, newCert] });
            setCertTitle(""); setCertIssuedBy(""); setCertExpiry("");
        }
    };

    // Add sea time record
    const addSeaTime = () => {
        if (seaVessel && seaRank && seaFrom && seaTo && seaDuration) {
            const newSea = new SeaTimeRecord({ vesselName: seaVessel, rank: seaRank, fromDate: seaFrom, toDate: seaTo, duration: seaDuration });
            setUser({ ...user, seaTimeRecords: [...user.seaTimeRecords, newSea] });
            setSeaVessel(""); setSeaRank(""); setSeaFrom(""); setSeaTo(""); setSeaDuration("");
        }
    };

    // Add skill
    const addSkill = () => {
        if (skillInput) {
            setUser({ ...user, skills: [...user.skills, skillInput] });
            setSkillInput("");
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.center}>
                <TouchableOpacity onPress={pickImage}>
                    <Image
                        source={
                            user.image
                                ? { uri: user.image }
                                : require("../../assets/images/master.png")
                        }
                        style={styles.profileImage}
                    />
                </TouchableOpacity>
                <Text style={styles.tapText}>Tap to upload image</Text>
            </View>

            {/* Personal Info */}
            <TextInput placeholder="Name" value={user.name} onChangeText={(text) => setUser({ ...user, name: text })} style={styles.input} />
            <TextInput placeholder="Birthday" value={user.birthday} onChangeText={(text) => setUser({ ...user, birthday: text })} style={styles.input} />
            <TextInput placeholder="Nationality" value={user.nationality} onChangeText={(text) => setUser({ ...user, nationality: text })} style={styles.input} />
            <TextInput placeholder="Passport" value={user.passport} onChangeText={(text) => setUser({ ...user, passport: text })} style={styles.input} />
            <TextInput placeholder="SIRB" value={user.sirb} onChangeText={(text) => setUser({ ...user, sirb: text })} style={styles.input} />
            <TextInput placeholder="Address" value={user.address} onChangeText={(text) => setUser({ ...user, address: text })} style={styles.input} />
            <TextInput placeholder="Objective" value={user.objective} onChangeText={(text) => setUser({ ...user, objective: text })} style={styles.input} />
            <TextInput placeholder="Email" value={user.email} onChangeText={(text) => setUser({ ...user, email: text })} style={styles.input} keyboardType="email-address" />
            <TextInput placeholder="Phone" value={user.phone} onChangeText={(text) => setUser({ ...user, phone: text })} style={styles.input} keyboardType="numeric" />

            {/* Certificates */}
            <Text style={styles.sectionTitle}>Certificates</Text>
            {user.certificates.map((c, i) => (
                <Text key={i}>{`${c.title} - ${c.issuedBy} (Exp: ${c.expiryDate})`}</Text>
            ))}
            <TextInput placeholder="Certificate Title" value={certTitle} onChangeText={setCertTitle} style={styles.input} />
            <TextInput placeholder="Issued By" value={certIssuedBy} onChangeText={setCertIssuedBy} style={styles.input} />
            <TextInput placeholder="Expiry Date" value={certExpiry} onChangeText={setCertExpiry} style={styles.input} />
            <TouchableOpacity style={styles.addButton} onPress={addCertificate}><Text style={styles.addText}>Add Certificate</Text></TouchableOpacity>

            {/* Sea Time Records */}
            <Text style={styles.sectionTitle}>Sea Time Records</Text>
            {user.seaTimeRecords.map((s, i) => (
                <Text key={i}>{`${s.vesselName} - ${s.rank} (${s.fromDate} → ${s.toDate}, ${s.duration})`}</Text>
            ))}
            <TextInput placeholder="Vessel Name" value={seaVessel} onChangeText={setSeaVessel} style={styles.input} />
            <TextInput placeholder="Rank" value={seaRank} onChangeText={setSeaRank} style={styles.input} />
            <TextInput placeholder="From Date" value={seaFrom} onChangeText={setSeaFrom} style={styles.input} />
            <TextInput placeholder="To Date" value={seaTo} onChangeText={setSeaTo} style={styles.input} />
            <TextInput placeholder="Duration" value={seaDuration} onChangeText={setSeaDuration} style={styles.input} />
            <TouchableOpacity style={styles.addButton} onPress={addSeaTime}><Text style={styles.addText}>Add Sea Time</Text></TouchableOpacity>

            {/* Skills */}
            <Text style={styles.sectionTitle}>Skills</Text>
            {user.skills.map((s, i) => (<Text key={i}>- {s}</Text>))}
            <TextInput placeholder="Skill" value={skillInput} onChangeText={setSkillInput} style={styles.input} />
            <TouchableOpacity style={styles.addButton} onPress={addSkill}><Text style={styles.addText}>Add Skill</Text></TouchableOpacity>

            {/* Save */}
            <TouchableOpacity style={styles.saveButton} onPress={saveUser}>
                <Text style={styles.saveText}>Save Profile</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    center: { alignItems: "center", marginBottom: 15 },
    profileImage: { width: 120, height: 120, borderRadius: 60, borderWidth: 2, borderColor: "#ccc" },
    tapText: { marginTop: 5, fontSize: 14, color: "#777" },
    input: { width: "100%", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginTop: 10 },
    sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 15 },
    addButton: { marginTop: 8, backgroundColor: "#3C78AD", padding: 10, borderRadius: 6, alignItems: "center" },
    addText: { color: "#fff", fontWeight: "600" },
    saveButton: { marginTop: 20, backgroundColor: "#3C78AD", padding: 15, borderRadius: 8, alignItems: "center" },
    saveText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
