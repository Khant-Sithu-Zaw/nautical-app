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
import { levels, ranks } from "../utils/constants";
import ClearableInput from "../components/ClearableInput";
import { validateEmail } from "../utils/methods";
export default function ProfileScreen({ navigation }) {

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
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (result.canceled) return;
        setUser({ ...user, image: result.assets[0].uri });
    };
    const loadUser = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("userProfile");
            if (jsonValue != null) {
                const data = JSON.parse(jsonValue);

                setUser(new User(data));
                setCertificates(data.certificates || []);
                setSkills(data.skills || []);
                setSeaTimeRecords(data.seaTimeRecords || []);
            }
        } catch (e) {
            console.log("Failed to load user:", e);
        }
    };

    const saveUser = async () => {
        if (certificates.length === 0) {
            alert("Please add at least one certificate before saving.");
            return;
        }

        if (skills.length === 0) {
            alert("Please add at least one skill before saving.");
            return;
        }

        // All good → proceed to save
        try {
            const fullUser = {
                ...user,
                certificates,
                skills,
                seaTimeRecords
            };

            await AsyncStorage.setItem("userProfile", JSON.stringify(fullUser));
            alert("Profile saved successfully!");
            navigation.goBack();
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
            <ClearableInput
                value={user.name}
                onChangeText={(text) => setUser({ ...user, name: text })}
                placeholder="Your Full Name"
                maxLength={40}
                inputStyle={styles.profileInput}
                validate="text"
            />
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

            <ClearableInput
                value={user.nationality}
                onChangeText={(text) => setUser({ ...user, nationality: text })}
                placeholder="Your Nationality"
                maxLength={30}
                inputStyle={styles.profileInput}
                validate="text"
            />

            <DropdownPicker
                options={ranks}
                selected={user.rank}
                onSelect={(opt) => setUser({ ...user, rank: opt })}
                placeholder="Select Your Rank"
                viewStyle={{ marginTop: verticalScale(10) }}
                textboxStyle={{ width: "97%", fontSize: moderateScale(14) }}
                placeholder="Select Your Rank"
            />
            <ClearableInput
                value={user.passport}
                onChangeText={(text) => setUser({ ...user, passport: text })}
                placeholder="Your Passport Number"
                maxLength={15}
                inputStyle={styles.profileInput}
                validate="none"
            />

            <ClearableInput
                value={user.sirb}
                onChangeText={(text) => setUser({ ...user, sirb: text })}
                placeholder="Your SIRB/CDC Number"
                maxLength={20}
                inputStyle={styles.profileInput}
                validate="number"
            />

            <ClearableInput
                value={user.address}
                onChangeText={(text) => setUser({ ...user, address: text })}
                placeholder="Your Home Address"
                maxLength={100}
                multiline
                numberOfLines={4}
                inputStyle={[styles.profileInput, {
                    textAlignVertical: "top",
                    height: verticalScale(80),
                }]}
                validate="none"
            />
            <ClearableInput
                value={user.email}
                onChangeText={(text) => setUser({ ...user, email: text })}
                onBlur={() => {
                    if (!validateEmail(user.email)) {
                        Alert.alert("Invalid email format");
                    }
                }}
                placeholder="Your Email Address"
                inputStyle={[styles.profileInput]}
                validate="none"
            />

            <ClearableInput
                value={user.phone}
                onChangeText={(text) => setUser({ ...user, phone: text })}
                placeholder="Your Phone Number"
                inputStyle={[styles.profileInput]}
                validate="none"
                maxLength={15}
            />

            <ClearableInput
                value={user.objective}
                onChangeText={(text) => setUser({ ...user, objective: text })}
                placeholder="Objective in Maritime Career"
                inputStyle={[styles.profileInput, {
                    textAlignVertical: "top",
                    height: verticalScale(120),
                }]}
                validate="none"
                multiline
                numberOfLines={6}
                maxLength={200}
            />
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
                    <View key={index} >
                        <ClearableInput
                            value={cert.title}
                            onChangeText={(text) =>
                                updateCertificate(index, "title", text)
                            }
                            placeholder="Enter Certificate Title"
                            inputStyle={styles.profileInput}
                            validate="none"
                            maxLength={35}
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
                    <View key={index}>

                        <ClearableInput
                            value={skil.skillName}
                            onChangeText={(text) => updateSkill(index, "skillName", text)}
                            placeholder="Enter Skill Title"
                            inputStyle={styles.profileInput}
                            validate="none"
                            maxLength={40}
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
                    <View key={index} >

                        <ClearableInput
                            value={record.vesselName}
                            onChangeText={(text) => updateSeaTime(index, "vesselName", text)}
                            placeholder="Enter Vessel Name"
                            inputStyle={styles.profileInput}

                            validate="none"
                            maxLength={35}
                        />
                        <DropdownPicker
                            options={ranks}
                            selected={record.rank} // use record.rank, not user.rank
                            onSelect={(opt) => updateSeaTime(index, "rank", opt)} // update the specific sea time record
                            viewStyle={{ marginTop: verticalScale(10) }}
                            textboxStyle={{ width: "97%", fontSize: moderateScale(14) }}
                            placeholder="Select Your Rank"
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


            <View style={[styles.sectionContainer]}>
                <TouchableOpacity style={styles.userBtn} onPress={saveUser}>
                    <Text style={styles.btnText}>Save Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.btnText}>Cancel Setup</Text>
                </TouchableOpacity>
            </View>
        </ScrollView >
    );
}


