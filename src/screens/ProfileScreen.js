import React, { useState, useEffect } from "react";
import {
    View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, FlatList
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "../models/User";
import { Certificate } from "../models/Certificate";
import { Skill } from "../models/Skill";
import { SeaTimeRecord } from "../models/SeaTimeRecord";
import styles from "../style/styles";
import { scale, moderateScale, verticalScale } from '../utils/scale';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropdownPicker from '../components/DropdownPicker';
import dropdownStyles from "../style/pickupstyle";
import { levels } from "../utils/constants";
export default function ProfileScreen() {
    const MAX_LENGTH = 200;
    const [user, setUser] = useState(new User());
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [activeField, setActiveField] = useState(null);
    const [certificates, setCertificates] = useState([]);
    const [skills, setSkills] = useState([]);
    const [seaTimeRecords, setSeaTimeRecords] = useState([]);
    const openPicker = (fieldName) => {
        setActiveField(fieldName);
        setPickerVisible(true);
    };
    const hidePicker = () => setPickerVisible(false);
    useEffect(() => {
        loadUser();
    }, []);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (result.canceled) return;
        setUser({ ...user, image: result.assets[0].uri });
    };
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
    const handleConfirm = (date) => {
        const formatted = date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });

        if (activeField === "birthday") {
            setUser({ ...user, birthday: formatted });
        }

        else if (activeField.startsWith("issued_")) {
            let index = parseInt(activeField.split("_")[1]);
            updateCertificate(index, "issuedDate", formatted);
        }

        else if (activeField.startsWith("expired_")) {
            let index = parseInt(activeField.split("_")[1]);
            updateCertificate(index, "expiredDate", formatted);
        }
        else if (activeField.startsWith("fromDate_")) {
            let index = parseInt(activeField.split("_")[1]);
            updateSeaTime(index, "fromDate", formatted);
        }
        else if (activeField.startsWith("toDate_")) {
            let index = parseInt(activeField.split("_")[1]);
            updateSeaTime(index, "toDate", formatted);
        }
        setPickerVisible(false);
        setActiveField(null);
    };

    // Add certificate to list
    const addCertificate = () => {
        if (certificates.length > 0) {
            const last = certificates[certificates.length - 1];
            if (!last.title || !last.issuedDate) {
                alert("Title & Issued Date must be filled before adding another certificate.");
                return;
            }
        }

        setCertificates([...certificates, new Certificate()]);
    };
    //Add lists to user
    const updateCertificate = (index, field, value) => {
        const updated = [...certificates];
        updated[index][field] = value;
        setCertificates(updated);

        // Always keep user object in sync
        setUser({ ...user, certificates: updated });
    };
    // Add skills to list
    const addSkill = () => {
        if (skills.length > 0) {
            const last = skills[skills.length - 1];
            if (!last.skillName || !last.level) {
                alert("Skill Inputs must be filled before adding another.");
                return;
            }
        }

        setSkills([...skills, new Skill()]);
    };
    const updateSkill = (index, field, value) => {
        const updated = [...skills];
        updated[index][field] = value;
        setSkills(updated);

        // Always keep user object in sync
        setUser({ ...user, skills: updated });
    };
    //Add sea time record to list
    const addSeaTime = () => {
        if (seaTimeRecords.length > 0) {
            const last = seaTimeRecords[seaTimeRecords.length - 1];
            if (!last.vesselName || !last.rank || !last.fromDate || !last.toDate) {
                alert("All fields must be filled before adding another sea time record.");
                return;
            }
        }
        setSeaTimeRecords([...seaTimeRecords, new SeaTimeRecord()]);
    };

    // Update sea time record
    const updateSeaTime = (index, field, value) => {
        const updated = [...seaTimeRecords];
        updated[index][field] = value;

        // Automatically calculate duration if both dates exist
        if (field === "fromDate" || field === "toDate") {
            const from = new Date(updated[index].fromDate);
            const to = new Date(updated[index].toDate);
            if (!isNaN(from) && !isNaN(to)) {
                const diffTime = to - from; // milliseconds
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                updated[index].duration = `${diffDays} days`;
            }
        }

        setSeaTimeRecords(updated);
        setUser({ ...user, seaTimeRecords: updated });
    };
    const removeItem = (type, index) => {
        let updatedList = [];
        switch (type) {
            case "certificate":
                updatedList = [...certificates];
                updatedList.splice(index, 1);
                setCertificates(updatedList);
                setUser({ ...user, certificates: updatedList });
                break;
            case "skill":
                updatedList = [...skills];
                updatedList.splice(index, 1);
                setSkills(updatedList);
                setUser({ ...user, skills: updatedList });
                break;
            case "seaTime":
                updatedList = [...seaTimeRecords];
                updatedList.splice(index, 1);
                setSeaTimeRecords(updatedList);
                setUser({ ...user, seaTimeRecords: updatedList });
                break;
            default:
                break;
        }
    };

    return (
        <ScrollView style={styles.profileContainer}>
            <DateTimePickerModal
                isVisible={isPickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hidePicker}
                display="spinner"
            />
            <View style={styles.imgCenter}>
                <TouchableOpacity onPress={pickImage} >
                    <Image
                        source={
                            user.image
                                ? { uri: user.image }
                                : require("../../assets/images/userImg.png")
                        }
                        style={styles.profileImage}
                    />
                </TouchableOpacity>
            </View>
            <View style={[styles.section, styles.sectionContainer]}>
                <Text style={styles.sectionTitle}>Personal Information</Text>
            </View>
            {/* Personal Info */}
            <TextInput placeholder="Your Full Name" value={user.name} onChangeText={(text) => setUser({ ...user, name: text })} style={styles.profileInput} placeholderTextColor="#9b9898ff" />

            <TouchableOpacity style={[styles.profileInput,]} onPress={() => openPicker("birthday")}>
                <Text
                    style={[
                        { fontSize: moderateScale(14) },   // ✔ correct
                        !user.birthday && { color: "#9b9898ff" }
                    ]}
                >
                    {user.birthday || "Select your Birthday"}
                </Text>
            </TouchableOpacity>


            <TextInput placeholder="Your Nationality" value={user.nationality} onChangeText={(text) => setUser({ ...user, nationality: text })} style={styles.profileInput} placeholderTextColor="#9b9898ff" />
            <TextInput placeholder="Your Passport Number" value={user.passport} onChangeText={(text) => setUser({ ...user, passport: text })} style={styles.profileInput} placeholderTextColor="#9b9898ff" />
            <TextInput placeholder="Your SIRB/CDC Number" value={user.sirb} onChangeText={(text) => setUser({ ...user, sirb: text })} style={styles.profileInput} placeholderTextColor="#9b9898ff" />
            <TextInput placeholder="Your Home Address" value={user.address} onChangeText={(text) => setUser({ ...user, address: text })} style={[styles.profileInput, {
                textAlignVertical: "top",
                height: verticalScale(60),
            }]} multiline numberOfLines={2} placeholderTextColor="#9b9898ff" />

            <TextInput placeholder="Your Email Address" value={user.email} onChangeText={(text) => setUser({ ...user, email: text })} style={styles.profileInput} keyboardType="email-address" placeholderTextColor="#9b9898ff" />
            <TextInput placeholder="Your Phone Number" value={user.phone} onChangeText={(text) => setUser({ ...user, phone: text })} style={styles.profileInput} keyboardType="numeric" placeholderTextColor="#9b9898ff" />
            <TextInput placeholder="Objective in Maritime Career" value={user.objective} onChangeText={(text) => setUser({ ...user, objective: text })} style={[styles.profileInput, {
                textAlignVertical: "top",
                height: verticalScale(100),
            }]} placeholderTextColor="#9b9898ff"
                multiline
                numberOfLines={6}
                maxLength={MAX_LENGTH} />

            <View style={[styles.section, styles.sectionContainer]}>
                <Text style={styles.sectionTitle}>Certifications</Text>
                <TouchableOpacity onPress={addCertificate} >
                    <Image
                        source={

                            require("../../assets/images/addIcon.png")
                        }
                        style={styles.addIcon}
                    />
                </TouchableOpacity>

            </View>
            <View style={styles.listContainer}>
                {certificates.map((cert, index) => (
                    <View key={index} style={[styles.box, styles.flexBox]}>

                        <TextInput
                            placeholder="Certificate Title"
                            value={cert.title}
                            onChangeText={(text) =>
                                updateCertificate(index, "title", text)
                            }
                            style={styles.profileInput}
                            placeholderTextColor="#9b9898ff"
                        />

                        <TouchableOpacity
                            style={[styles.profileInput,]}

                            onPress={() => openPicker(`issued_${index}`)}
                        >
                            <Text style={[
                                { fontSize: moderateScale(14) },
                                !cert.issuedDate && { color: "#9b9898ff" }
                            ]}>
                                {cert.issuedDate || "Select Issued Date"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.profileInput,]}
                            onPress={() => openPicker(`expired_${index}`)}

                        >
                            <Text style={[
                                { fontSize: moderateScale(14) },
                                !cert.expiredDate && { color: "#9b9898ff" }
                            ]}>
                                {cert.expiredDate || "Select Expired Date"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.removeBtn, { marginRight: "auto" }]}
                            onPress={() => removeItem("certificate", index)}
                        >
                            <Text style={[styles.btnText, { textAlign: "center", fontSize: moderateScale(13), }]}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>


            <View style={[styles.section, styles.sectionContainer]}>
                <Text style={styles.sectionTitle}>SeaTime Records</Text>
                <TouchableOpacity onPress={addSeaTime} >
                    <Image
                        source={

                            require("../../assets/images/addIcon.png")
                        }
                        style={styles.addIcon}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
                {seaTimeRecords.map((record, index) => (
                    <View key={index} style={[styles.box, styles.flexBox]}>

                        <TextInput
                            placeholder="Vessel Name"
                            value={record.vesselName}
                            onChangeText={(text) => updateSeaTime(index, "vesselName", text)}
                            style={styles.profileInput}
                            placeholderTextColor="#9b9898ff"
                        />

                        <TextInput
                            placeholder="Rank"
                            value={record.rank}
                            onChangeText={(text) => updateSeaTime(index, "rank", text)}
                            style={styles.profileInput}
                            placeholderTextColor="#9b9898ff"
                        />

                        <TouchableOpacity
                            style={styles.profileInput}
                            onPress={() => openPicker(`fromDate_${index}`)}
                        >
                            <Text style={{ fontSize: moderateScale(14), color: record.fromDate ? "black" : "#9b9898ff" }}>
                                {record.fromDate || "Select From Date"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.profileInput}
                            onPress={() => openPicker(`toDate_${index}`)}
                        >
                            <Text style={{ fontSize: moderateScale(14), color: record.toDate ? "black" : "#9b9898ff" }}>
                                {record.toDate || "Select To Date"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.removeBtn, { marginRight: "auto" }]}
                            onPress={() => removeItem("seaTime", index)}
                        >
                            <Text style={[styles.btnText, { textAlign: "center", fontSize: moderateScale(13), }]}>Remove</Text>
                        </TouchableOpacity>

                    </View>
                ))}
            </View>

            <View style={[styles.section, styles.sectionContainer]}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <TouchableOpacity onPress={addSkill} >
                    <Image
                        source={

                            require("../../assets/images/addIcon.png")
                        }
                        style={styles.addIcon}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
                {skills.map((skil, index) => (
                    <View key={index} style={[styles.box, styles.flexBox]}>
                        <TextInput
                            placeholder="Skill Title"
                            value={skil.skillName}
                            onChangeText={(text) => updateSkill(index, "skillName", text)}
                            style={styles.profileInput}
                            placeholderTextColor="#9b9898ff"
                        />
                        <DropdownPicker
                            options={levels}
                            selected={skil.level}
                            viewStyle={
                                { marginTop: verticalScale(10) }
                            }
                            textboxStyle={{ width: "97%", fontSize: moderateScale(14) }}
                            placeholder="Select Your Level"
                            onSelect={(value) => updateSkill(index, "level", value)}
                        />
                        <TouchableOpacity
                            style={[styles.removeBtn, { marginRight: "auto" }]}
                            onPress={() => removeItem("skill", index)}
                        >
                            <Text style={[styles.btnText, { textAlign: "center", fontSize: moderateScale(13), }]}>Remove</Text>
                        </TouchableOpacity>

                    </View>
                ))}
            </View>
            <View style={[styles.sectionContainer]}>
                <TouchableOpacity style={styles.userBtn} onPress={saveUser}>
                    <Text style={styles.btnText}>Save Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.userBtn} onPress={saveUser}>
                    <Text style={styles.btnText}>Cancel Setup</Text>
                </TouchableOpacity>
            </View>
        </ScrollView >
    );
}


