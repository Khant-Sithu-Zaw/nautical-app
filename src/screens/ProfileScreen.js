import React, { useState, useEffect, useRef } from "react";
import {
    View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "../models/User";
import { CDC } from "../models/CDC";
import { Certificate } from "../models/Certificate";
import { Skill } from "../models/Skill";
import { SeaTimeRecord } from "../models/SeaTimeRecord";
import { Education } from "../models/Education";
import styles from "../style/styles";
import { scale, moderateScale, verticalScale } from '../utils/scale';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropdownPicker from '../components/DropdownPicker';
import dropdownStyles from "../style/pickupstyle";
import { levels, levelMap, ranks, martialSts, genders, kins, vesselTypeOptions } from "../utils/constants";
import ClearableInput from "../components/ClearableInput";
import FloatingScrollButton from '../components/FloatingScrollButton';
import { validateEmail } from "../utils/methods";
export default function ProfileScreen({ navigation }) {
    const [isUpdate, setIsUpdate] = useState(false); // <-- new state
    const [user, setUser] = useState(new User());
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [activeField, setActiveField] = useState(null);
    const [educations, setEducations] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [skills, setSkills] = useState([]);
    const [seaTimeRecords, setSeaTimeRecords] = useState([]);
    // const [seaTimeRecords, setSeaTimeRecords] = useState([[new SeaTimeRecord()]]);
    const sectionPositions = useRef({});
    const scrollRef = useRef(null);
    const currentOffset = useRef(0);
    const registerSection = (key) => (event) => {
        sectionPositions.current[key] = event.nativeEvent.layout.y;
    };

    // ✅ MUST be here
    const scrollToNextSection = () => {
        const positions = Object.values(sectionPositions.current).sort(
            (a, b) => a - b
        );

        const target = positions.find(
            (y) => y > currentOffset.current + 10
        );

        if (target !== undefined) {
            scrollRef.current?.scrollTo({ y: target, animated: true });
        }
    };

    const scrollToPreviousSection = () => {
        const positions = Object.values(sectionPositions.current).sort(
            (a, b) => a - b
        );

        const target = positions
            .filter((y) => y < currentOffset.current - 10)
            .pop();

        if (target !== undefined) {
            scrollRef.current?.scrollTo({ y: target, animated: true });
        }
    };
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
                setEducations(data.educations || []);
                setCertificates(data.certificates || []);
                setSkills(data.skills || []);
                setSeaTimeRecords(data.seaTimeRecords || []);
                setIsUpdate(true);
            }
        } catch (e) {
            console.log("Failed to load user:", e);
        }
    };


    const saveUser = async () => {

        // --- 1. FILTERING LOGIC ---

        // Educations: Must have a degree and a school.
        const cleanedEducations = educations.filter(edu => {
            return (
                edu.eduName &&
                edu.eduFromDate &&
                edu.eduToDate
            );
        });


        // Sea Time Records: Must have vesselName, rank, and at least one date.
        const cleanedSeaTimeRecords = seaTimeRecords.filter(record => {
            return (
                record.companyName &&
                record.shipName &&
                record.fromDate &&
                record.toDate &&
                record.shipType &&
                record.imoNo &&
                record.position &&
                record.grt &&
                record.enginePowerKW

            );
        });

        // Certificates: Must have a title and an issued date.
        const cleanedCertificates = certificates.filter(cert => {
            return (
                cert.title &&
                cert.issuedDate &&
                cert.expiredDate &&
                cert.country
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
        if (cleanedEducations.length === 0) {
            alert("Please add and complete at least one education history before saving.");
            return;
        }
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
                educations: cleanedEducations,
                certificates: cleanedCertificates,
                skills: cleanedSkills,
                seaTimeRecords: cleanedSeaTimeRecords
            };

            await AsyncStorage.setItem("userProfile", JSON.stringify(fullUser));
            console.log(fullUser.educations);
            alert("Profile saved successfully!");
            navigation.goBack();
        } catch (e) {
            console.log("Failed to save user:", e);
        }
    };

    const handleConfirm = (date) => {
        const formatted = date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
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
        else if (activeField.startsWith("cdc_")) {
            const field = activeField.replace("cdc_", ""); // issuedDate | expiredDate

            setUser(prev =>
                new User({
                    ...prev,
                    cdc: new CDC({
                        ...prev.cdc,
                        [field]: formatted,
                    }),
                })
            );
        }
        else if (activeField.startsWith("pp_")) {
            const field = activeField.replace("pp_", ""); // issuedDate | expiredDate

            setUser(prev =>
                new User({
                    ...prev,
                    passport: {
                        ...prev.passport,
                        [field]: formatted,
                    },
                })
            );
        }
        else if (activeField.startsWith("eduFromDate_")) {
            let index = parseInt(activeField.split("_")[1]);
            updateEducation(index, "eduFromDate", formatted);
        }
        else if (activeField.startsWith("eduToDate_")) {
            let index = parseInt(activeField.split("_")[1]);
            updateEducation(index, "eduToDate", formatted);
        }

        setPickerVisible(false);
        setActiveField(null);
    };
    const addEducation = () => {
        if (educations.length > 0) {
            const last = educations[educations.length - 1];
            if (!last.eduName || !last.eduFromDate || !last.eduToDate) {
                alert("Education Name & Both Start & End Date must be filled before adding another education.");
                return;
            }
        }

        setEducations([...educations, new Education()]);
    }

    const updateEducation = (index, field, value) => {
        const updated = [...educations];
        updated[index][field] = value;
        setEducations(updated);

        // Always keep user object in sync
        setUser({ ...user, educations: updated });
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
            if (!last.companyName || !last.fromDate || !last.toDate || !last.shipName || !last.position || !last.shipType || !last.imoNo || !last.grt || !last.enginePowerKW) {
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
            case "education":
                updatedList = [...educations];
                updatedList.splice(index, 1);
                setEducations(updatedList);
                setUser({ ...user, educations: updatedList });
                break;
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
        <>
            <ScrollView style={styles.profileContainer} ref={scrollRef} onScroll={(e) => {
                currentOffset.current = e.nativeEvent.contentOffset.y;
            }}
                scrollEventThrottle={16}>
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
                <View style={[styles.section, styles.sectionContainer]} onLayout={registerSection('personal')}>
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
                    options={genders}
                    selected={user.gender}
                    onSelect={(opt) => setUser({ ...user, gender: opt })}
                    placeholder="Select Your Gender"
                    viewStyle={{ marginTop: verticalScale(10) }}
                    textboxStyle={{ width: "97%", fontSize: moderateScale(14) }}
                />
                <DropdownPicker
                    options={martialSts}
                    selected={user.martialSts}
                    onSelect={(opt) => setUser({ ...user, martialSts: opt })}
                    placeholder="Select Martial Status"
                    viewStyle={{ marginTop: verticalScale(10) }}
                    textboxStyle={{ width: "97%", fontSize: moderateScale(14) }}

                />
                <DropdownPicker
                    options={ranks}
                    selected={user.rank}
                    onSelect={(opt) => setUser({ ...user, rank: opt })}
                    placeholder="Select Your Rank"
                    viewStyle={{ marginTop: verticalScale(10) }}
                    textboxStyle={{ width: "97%", fontSize: moderateScale(14) }}

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
                    value={user.height}
                    onChangeText={(text) => setUser({ ...user, height: text })}
                    placeholder="Your Height (in cm)"
                    inputStyle={[styles.profileInput]}
                    validate="none"
                    keyboardType="numeric"
                    maxLength={15}
                />
                <ClearableInput
                    value={user.weight}
                    onChangeText={(text) => setUser({ ...user, weight: text })}
                    placeholder="Your Weight (in kg)"
                    inputStyle={[styles.profileInput]}
                    validate="none"
                    keyboardType="numeric"
                    maxLength={15}
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
                <View style={styles.groupedInput}>
                    {/* 1. SIRB Number */}
                    <ClearableInput
                        value={user.cdc.sirb}
                        onChangeText={(text) => setUser({
                            ...user,
                            cdc: { ...user.cdc, sirb: text }
                        })}
                        placeholder="SIRB Number"
                        maxLength={20}
                        inputStyle={[styles.profileInput, { borderColor: '#f68700ff' }]}
                        validate="number"
                        wrapperStyle={{ width: "49%" }}
                    />

                    {/* 2. Place of Issue */}
                    <ClearableInput
                        value={user.cdc.issuedPlace}
                        onChangeText={(text) => setUser({
                            ...user,
                            cdc: { ...user.cdc, issuedPlace: text }
                        })}
                        placeholder="Place of Issued"
                        maxLength={20}
                        inputStyle={[styles.profileInput, { borderColor: '#f68700ff' }]}
                        wrapperStyle={{ width: "49%", }}
                    />

                    {/* 3. Issued Date */}
                    <TouchableOpacity
                        style={[styles.profileInput, { width: "49%", borderColor: '#f68700ff' }]}
                        onPress={() => openPicker("cdc_issuedDate")}
                    >
                        <Text style={[
                            { fontSize: moderateScale(14) },
                            !user.cdc.issuedDate && { color: "#9b9898ff" }
                        ]}>
                            {user.cdc.issuedDate || "SIRB Issued Date"}
                        </Text>
                    </TouchableOpacity>

                    {/* 4. Expired Date */}
                    <TouchableOpacity
                        style={[styles.profileInput, { width: "49%", borderColor: '#f68700ff' }]}
                        onPress={() => openPicker("cdc_expiredDate")}
                    >
                        <Text style={[
                            { fontSize: moderateScale(14) },
                            !user.cdc.expiredDate && { color: "#9b9898ff" }
                        ]}>
                            {user.cdc.expiredDate || "SIRB Expired Date"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.groupedInput}>
                    {/* 1. Passport Number */}
                    <ClearableInput
                        value={user.passport.pno}
                        onChangeText={(text) => setUser({
                            ...user,
                            passport: { ...user.passport, pno: text }
                        })}
                        placeholder="Passport Number"
                        maxLength={20}
                        inputStyle={[styles.profileInput, { borderColor: '#27a5f4ff' }]}
                        wrapperStyle={{ width: "49%" }}
                    />

                    {/* 2. Place of Issue */}
                    <ClearableInput
                        value={user.passport.issuedPlace}
                        onChangeText={(text) => setUser({
                            ...user,
                            passport: { ...user.passport, issuedPlace: text }
                        })}
                        placeholder="Place of Issued"
                        maxLength={20}
                        inputStyle={[styles.profileInput, { borderColor: '#27a5f4ff' }]}
                        wrapperStyle={{ width: "49%" }}
                    />

                    {/* 3. Issued Date */}
                    <TouchableOpacity
                        style={[styles.profileInput, { width: "49%", borderColor: '#27a5f4ff', justifyContent: 'center' }]}
                        onPress={() => openPicker("pp_issuedDate")} // Use a specific key for passport
                    >
                        <Text style={[
                            { fontSize: moderateScale(14) },
                            !user.passport.issuedDate && { color: "#9b9898ff" }
                        ]}>
                            {user.passport.issuedDate || "Issued Date"}
                        </Text>
                    </TouchableOpacity>

                    {/* 4. Expired Date */}
                    <TouchableOpacity
                        style={[styles.profileInput, { width: "49%", borderColor: '#27a5f4ff', justifyContent: 'center' }]}
                        onPress={() => openPicker("pp_expiredDate")} // Use a specific key for passport
                    >
                        <Text style={[
                            { fontSize: moderateScale(14) },
                            !user.passport.expiredDate && { color: "#9b9898ff" }
                        ]}>
                            {user.passport.expiredDate || "Expired Date"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.groupedInput}>

                    <DropdownPicker
                        options={kins}
                        selected={user.kin.kinType}
                        onSelect={(opt) => setUser({ ...user, kin: { ...user.kin, kinType: opt } })}
                        fromParents={{ borderColor: '#c6b904ff' }}
                        placeholder="Select Next of Kin"
                        viewStyle={{ marginTop: verticalScale(10), }}
                        textboxStyle={{ width: "97%", fontSize: moderateScale(14), }}

                    />

                    {/* 2. Place of Issue */}
                    <ClearableInput
                        value={user.kin.kinName}
                        onChangeText={(text) => setUser({
                            ...user,
                            kin: { ...user.kin, kinName: text }
                        })}
                        placeholder="Enter Next of Kin Name"
                        maxLength={25}
                        inputStyle={[styles.profileInput, { borderColor: '#c6b904ff' }]}
                    />

                    <ClearableInput
                        value={user.kin.kinPhone}
                        onChangeText={(text) => setUser({
                            ...user,
                            kin: { ...user.kin, kinPhone: text }
                        })}
                        placeholder="Enter Phone Number"
                        maxLength={20}
                        inputStyle={[styles.profileInput, { borderColor: '#c6b904ff' }]}
                    />
                    <ClearableInput
                        value={user.kin.kinAddr}
                        onChangeText={(text) => setUser({ ...user, kin: { ...user.kin, kinAddr: text } })}
                        placeholder="Enter Full Address"
                        maxLength={80}
                        multiline
                        numberOfLines={4}
                        inputStyle={[styles.profileInput, {
                            textAlignVertical: "top",
                            borderColor: '#c6b904ff',
                            height: verticalScale(70),
                        }]}
                        validate="none"
                    />
                </View>
                <View style={[styles.section, styles.sectionContainer]} onLayout={registerSection('education')}>
                    <Text style={styles.sectionTitle}>Education History</Text>
                    <TouchableOpacity onPress={addEducation} >
                        <Image
                            source={

                                require("../../assets/images/addIcon.png")
                            }
                            style={styles.addIcon}
                        />
                    </TouchableOpacity>

                </View>
                <View style={styles.listContainer}>
                    {educations.map((edu, index) => (
                        <View key={index} >
                            <ClearableInput
                                value={edu.eduName}
                                onChangeText={(text) =>
                                    updateEducation(index, "eduName", text)
                                }
                                placeholder="Enter Education Name"
                                inputStyle={styles.profileInput}
                                validate="none"
                                maxLength={80}
                                multiline
                            />
                            <View style={styles.groupedInput}>
                                <TouchableOpacity
                                    style={[styles.profileInput, { width: "49%" }]}

                                    onPress={() => openPicker(`eduFromDate_${index}`)}
                                >
                                    <Text style={[
                                        { fontSize: moderateScale(14) },
                                        !edu.eduFromDate && { color: "#9b9898ff" }
                                    ]}>
                                        {edu.eduFromDate || "Select Start Date"}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.profileInput, { width: "49%" }]}
                                    onPress={() => openPicker(`eduToDate_${index}`)}

                                >
                                    <Text style={[
                                        { fontSize: moderateScale(14) },
                                        !edu.eduToDate && { color: "#9b9898ff" }
                                    ]}>
                                        {edu.eduToDate || "Select End Date"}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={[styles.removeBtn, { marginRight: "auto" }]}
                                onPress={() => removeItem("education", index)}
                            >
                                <Text style={[styles.btnText, { textAlign: "center", fontSize: moderateScale(13), }]}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <View style={[styles.section, styles.sectionContainer]} onLayout={registerSection('certificate')}>
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
                            <ClearableInput
                                value={cert.country}
                                onChangeText={(text) =>
                                    updateCertificate(index, "country", text)
                                }
                                placeholder="Enter Issued Country"
                                inputStyle={styles.profileInput}
                                validate="none"
                                maxLength={35}
                            />
                            <View style={styles.groupedInput}>
                                <TouchableOpacity
                                    style={[styles.profileInput, { width: "49%" }]}

                                    onPress={() => openPicker(`issued_${index}`)}
                                >
                                    <Text style={[
                                        { fontSize: moderateScale(14) },
                                        !cert.issuedDate && { color: "#9b9898ff" }
                                    ]}>
                                        {cert.issuedDate || "Issued Date"}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.profileInput, { width: "49%" }]}
                                    onPress={() => openPicker(`expired_${index}`)}

                                >
                                    <Text style={[
                                        { fontSize: moderateScale(14) },
                                        !cert.expiredDate && { color: "#9b9898ff" }
                                    ]}>
                                        {cert.expiredDate || "Expired Date"}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={[styles.removeBtn, { marginRight: "auto" }]}
                                onPress={() => removeItem("certificate", index)}
                            >
                                <Text style={[styles.btnText, { textAlign: "center", fontSize: moderateScale(13), }]}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <View style={[styles.section, styles.sectionContainer]} onLayout={registerSection('skill')}>
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

                <View style={[styles.section, styles.sectionContainer]} onLayout={registerSection('seaservice')}>
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
                                value={record.companyName}
                                onChangeText={(text) => updateSeaTime(index, "companyName", text)}
                                placeholder="Enter Company Name"
                                inputStyle={styles.profileInput}
                                validate="none"
                                maxLength={35}
                            />
                            <ClearableInput
                                value={record.shipName}
                                onChangeText={(text) => updateSeaTime(index, "shipName", text)}
                                placeholder="Enter Vessel Name"
                                inputStyle={styles.profileInput}
                                validate="none"
                                maxLength={35}
                            />
                            <ClearableInput
                                value={record.imoNo}
                                onChangeText={(text) => updateSeaTime(index, "imoNo", text)}
                                placeholder="Enter IMO Number"
                                inputStyle={styles.profileInput}
                                validate="none"
                                maxLength={35}
                            />
                            <DropdownPicker
                                options={vesselTypeOptions}
                                selected={record.shipType}
                                onSelect={(opt) => updateSeaTime(index, "shipType", opt)}
                                placeholder="Select Vessel Type"
                                viewStyle={{ marginTop: verticalScale(10), }}
                                textboxStyle={{ width: "97%", fontSize: moderateScale(14), }}

                            />

                            <DropdownPicker
                                options={ranks}
                                selected={record.position}
                                onSelect={(opt) => updateSeaTime(index, "position", opt)}
                                placeholder="Select Your Rank"
                                viewStyle={{ marginTop: verticalScale(10), }}
                                textboxStyle={{ width: "97%", fontSize: moderateScale(14), }}

                            />

                            <View style={styles.groupedInput}>
                                <ClearableInput
                                    value={record.grt}
                                    onChangeText={(text) => updateSeaTime(index, "grt", text)}
                                    placeholder="Gross Tonnage"
                                    maxLength={20}
                                    inputStyle={[styles.profileInput,]}
                                    validate="number"
                                    wrapperStyle={{ width: "49%" }}
                                    keyboardType="number"
                                />

                                {/* 2. Place of Issue */}
                                <ClearableInput
                                    value={record.enginePowerKW}
                                    onChangeText={(text) => updateSeaTime(index, "enginePowerKW", text)}
                                    placeholder="Engine Power(KW)"
                                    maxLength={20}
                                    inputStyle={[styles.profileInput,]}
                                    validate="number"
                                    wrapperStyle={{ width: "49%", }}
                                    keyboardType="number"
                                />
                                <TouchableOpacity
                                    style={[styles.profileInput, { width: "49%" }]}
                                    onPress={() => openPicker(`fromDate_${index}`)}
                                >
                                    <Text style={{ fontSize: moderateScale(14), color: record.fromDate ? "black" : "#9b9898ff" }}>
                                        {record.fromDate || "From Date"}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.profileInput, { width: "49%" }]}
                                    onPress={() => openPicker(`toDate_${index}`)}
                                >
                                    <Text style={{ fontSize: moderateScale(14), color: record.toDate ? "black" : "#9b9898ff" }}>
                                        {record.toDate || "To Date"}
                                    </Text>
                                </TouchableOpacity>
                            </View>


                            <TouchableOpacity
                                style={[styles.removeBtn, { marginRight: "auto" }]}
                                onPress={() => removeItem("seaTime", index)}
                            >
                                <Text style={[styles.btnText, { textAlign: "center", fontSize: moderateScale(13), }]}>Remove</Text>
                            </TouchableOpacity>

                        </View>
                    ))}
                </View>

                <View style={[styles.section, styles.sectionContainer]} onLayout={registerSection('hobby')}>
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
            <FloatingScrollButton
                onScrollUp={scrollToPreviousSection}
                onScrollDown={scrollToNextSection}
            />
        </>
    );
}


