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
import { levels, levelMap, ranks } from "../utils/constants";
import ClearableInput from "../components/ClearableInput";
import { validateEmail, validateRequiredFields } from "../utils/methods";
export default function ProfileScreen({ navigation }) {
    const [isUpdate, setIsUpdate] = useState(false); // <-- new state
    const [user, setUser] = useState(new User());
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [activeField, setActiveField] = useState(null);
    const [certificates, setCertificates] = useState([]);
    const [skills, setSkills] = useState([]);
    // const [seaTimeRecords, setSeaTimeRecords] = useState([]);
    const [seaTimeRecords, setSeaTimeRecords] = useState([new SeaTimeRecord()]);
    // const [hobbies, setHobbies] = useState([]);
    const openPicker = (fieldName) => {
        setActiveField(fieldName);
        setPickerVisible(true);
    };
    const hidePicker = () => setPickerVisible(false);
    useEffect(() => {
        loadUser();
    }, []);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsEditing: true,
            aspect: [1, 1],
            base64: true
        });

        if (!result.canceled) {
            const base64 = result.assets[0].base64;

            setUser((prev) => ({
                ...prev,
                image: `data:image/jpeg;base64,${base64}`
            }));
        }
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
                setIsUpdate(true);
            }
        } catch (e) {
            console.log("Failed to load user:", e);
        }
    };

    // const saveUser = async () => {
    //     if (!validateRequiredFields(user)) return;
    //     if (certificates.length === 0) {
    //         alert("Please add at least one certificate before saving.");
    //         return;
    //     }

    //     if (skills.length === 0) {
    //         alert("Please add at least one skill before saving.");
    //         return;
    //     }
    //     if (!user?.hobbies || user.hobbies.length === 0) {
    //         alert("Please add at least one hobby before saving.");
    //         return;
    //     }
    //     // All good → proceed to save
    //     try {
    //         const fullUser = {
    //             ...user,
    //             certificates,
    //             skills,
    //             seaTimeRecords
    //         };

    //         await AsyncStorage.setItem("userProfile", JSON.stringify(fullUser));
    //         alert("Profile saved successfully!");
    //         navigation.goBack();
    //     } catch (e) {
    //         console.log("Failed to save user:", e);
    //     }
    // };
    const saveUser = async () => {
        // Existing validation checks...
        if (!validateRequiredFields(user)) return;

        // --- 1. FILTERING LOGIC ---

        // Define conditions for completeness based on typical required fields:

        // Sea Time Records: Must have vesselName, rank, and at least one date.
        const cleanedSeaTimeRecords = seaTimeRecords.filter(record => {
            return (
                record.companyName &&
                record.workDescription &&
                (record.fromDate || record.toDate)

            );
        });

        // Certificates: Must have a title and an issued date.
        const cleanedCertificates = certificates.filter(cert => {
            return (
                cert.title &&
                cert.issuedDate
            );
        });

        // Skills: Must have a skillName and a level.
        const cleanedSkills = skills.filter(skill => {
            return (
                skill.skillName &&
                skill.level
            );
        });

        // --- 2. RE-VALIDATION BASED ON CLEANED ARRAYS ---

        // Re-check minimum requirements using the CLEANED arrays:
        if (cleanedCertificates.length === 0) {
            alert("Please add and complete at least one certificate before saving.");
            return;
        }

        if (cleanedSkills.length === 0) {
            alert("Please add and complete at least one skill before saving.");
            return;
        }

        // If you enforce a minimum of one sea time record:
        // if (cleanedSeaTimeRecords.length === 0) {
        //     alert("Please add and complete at least one sea time record before saving.");
        //     return;
        // }

        if (!user?.hobbies || user.hobbies.length === 0) {
            alert("Please add at least one hobby before saving.");
            return;
        }

        // All good → proceed to save
        try {
            const fullUser = {
                ...user,
                // 3. Use the CLEANED arrays for saving
                certificates: cleanedCertificates,
                skills: cleanedSkills,
                seaTimeRecords: cleanedSeaTimeRecords
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
            if (!last.companyName || !last.fromDate || !last.toDate || !last.workDescription) {
                alert("All fields must be filled before adding another sea time record.");
                return;
            }
        }
        setSeaTimeRecords([...seaTimeRecords, new SeaTimeRecord()]);
    };

    const updateSeaTime = (index, field, value) => {
        const updated = [...seaTimeRecords];
        updated[index][field] = value;
        setSeaTimeRecords(updated);
        setUser({ ...user, seaTimeRecords: updated });
    };


    const addHobby = () => {
        const hobbyList = user.hobbies || [];

        // If last hobby is empty, prevent adding another
        if (hobbyList.length > 0 && hobbyList[hobbyList.length - 1].trim() === "") {
            alert("Please fill the hobby before adding another.");
            return;
        }

        setUser((prev) => ({
            ...prev,
            hobbies: [...prev.hobbies, ""],
        }));
    };

    const updateHobby = (index, value) => {
        const updated = [...user.hobbies];
        updated[index] = value;

        setUser((prev) => ({
            ...prev,
            hobbies: updated,
        }));
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
            case "hobby":
                updatedList = [...user.hobbies];
                updatedList.splice(index, 1);

                setUser({
                    ...user,
                    hobbies: updatedList,
                });
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
            <ClearableInput
                value={user.edu}
                onChangeText={(text) => setUser({ ...user, edu: text })}
                placeholder="Your Highest Education"
                inputStyle={[styles.profileInput]}
                validate="none"
                multiline
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
                placeholder="Overview about yourself"
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
                            selected={skil.level} // this should already hold a string like "Beginner"
                            viewStyle={{ marginTop: verticalScale(10) }}
                            textboxStyle={{ width: "97%", fontSize: moderateScale(14) }}
                            placeholder="Select Your Level"
                            onSelect={(value) => updateSkill(index, "level", value)} // just save the string
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
                <Text style={styles.sectionTitle}>Work Experience</Text>
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
                            value={record.companyName}
                            onChangeText={(text) => updateSeaTime(index, "companyName", text)}
                            placeholder="Enter Company Name"
                            inputStyle={styles.profileInput}
                            validate="none"
                            maxLength={35}
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
                        <ClearableInput
                            value={record.workDescription}
                            onChangeText={(text) => {
                                if (text.length > 300) {
                                    alert("You can type maximum 300 characters.");
                                    return;
                                }
                                updateSeaTime(index, "workDescription", text);
                            }}

                            placeholder="About Your Work Onboard"
                            inputStyle={styles.profileInput}
                            validate="none"
                            maxLength={300}
                            multiline
                            numberOfLines={8}
                            inputStyle={[styles.profileInput, {
                                textAlignVertical: "top",
                                height: verticalScale(150),
                            }]}
                        />
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
                <Text style={styles.sectionTitle}>Hobbies/Interests</Text>
                <TouchableOpacity onPress={addHobby} >
                    <Image
                        source={

                            require("../../assets/images/addIcon.png")
                        }
                        style={styles.addIcon}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>

                {user.hobbies.map((hobby, index) => (
                    <View key={index}>
                        <ClearableInput
                            value={hobby}
                            onChangeText={(text) => updateHobby(index, text)}
                            placeholder="Enter your Hobby"
                            inputStyle={styles.profileInput}
                            validate="none"
                            maxLength={50}
                        />
                        <TouchableOpacity
                            style={[styles.removeBtn, { marginRight: "auto" }]}
                            onPress={() => removeItem("hobby", index)}
                        >
                            <Text style={[styles.btnText, { textAlign: "center", fontSize: moderateScale(13), }]}>
                                Remove
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}

            </View>
            <View style={[styles.sectionContainer]}>
                <TouchableOpacity style={styles.userBtn} onPress={saveUser}>
                    <Text style={styles.btnText}>
                        {isUpdate ? "Update" : "Save"}  {/* dynamic text */}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.btnText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </ScrollView >
    );
}


