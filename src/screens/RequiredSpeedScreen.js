import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard, Image, Button } from "react-native";
import styles from "../style/styles";
import Layout from "../components/Layout";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { handleNumberChange } from "../utils/methods";
import { signNumberRegex, weatherOptions, numberRegex } from "../utils/constants";
import Card from "../components/Card";
import { RadioButton } from "../components/RadioButton";
import { scale } from "../utils/scale";
import DropdownPicker from "../components/DropdownPicker";

export default function RequiredSpeedScreen() {
	const [speed, setSpeed] = useState("");
	const [distance, setDistance] = useState("");
	const [currentSpeed, setCurrentSpeed] = useState("");
	// Two states for times
	const [currentTime, setCurrentTime] = useState(null);
	const [arrivalTime, setArrivalTime] = useState(null);
	const [currentSpeedSign, setCurrentSpeedSign] = useState("+");
	// Picker state
	const [isPickerVisible, setPickerVisible] = useState(false);
	const [activePicker, setActivePicker] = useState(null); // "current" or "arrival"
	const hintTimerRef = useRef(null);
	const [showHint, setShowHint] = useState(false);
	const [hintShown, setHintShown] = useState(false); // prevent showing again
	const [selectedWeather, setSelectedWeather] = useState(weatherOptions[0]);
	const showPicker = (type) => {
		setActivePicker(type);
		setPickerVisible(true);
	};

	const hidePicker = () => {
		setPickerVisible(false);
		setActivePicker(null);
	};

	const handleDateTimeConfirm = (date) => {
		if (activePicker === "current") {
			// Prevent selecting after arrival time
			if (arrivalTime && date >= arrivalTime) {
				hidePicker(); // ✅ ensure modal closes
				alert("Current time must be before Arrival time!");
				return;
			}
			setCurrentTime(date);
		} else if (activePicker === "arrival") {
			// Prevent selecting before current time
			if (currentTime && date <= currentTime) {
				hidePicker();
				alert("Arrival time must be after Current time!");
				return;
			}
			setArrivalTime(date);
		}
		hidePicker();
	};

	const calculateSpeed = () => {
		Keyboard.dismiss();

		if (!currentTime || !arrivalTime || distance === "" || distance.trim() === "") {
			alert("Please fill all the inputs.");
			return;
		}
		if (currentSpeed.trim() === "" || currentSpeed === "") {
			setCurrentSpeed("0");
			setCurrentSpeedSign("+");
		}
		const distanceNum = Number(distance);
		// Convert safely first
		const currentSpeedNum = Number(currentSpeed);
		if (
			isNaN(currentSpeedNum) ||
			isNaN(distanceNum) ||
			currentSpeed.trim() === "-" || isNaN(distanceNum)
		) {
			alert("Invalid Inputs! Accepts number only.");
			return;
		}

		if (distanceNum <= 0) {
			alert("Please enter distance greater than 0.");
			return;
		}

		const timeDiffHours = (arrivalTime - currentTime) / (1000 * 60 * 60); // ms → hours
		if (timeDiffHours <= 0) {
			setSpeed("Invalid");
			return;
		}

		let requiredSpeed = distanceNum / timeDiffHours; // knots
		if (currentSpeedNum > 0) {
			// with the ship
			requiredSpeed = requiredSpeed - currentSpeedNum;
		} else if (currentSpeedNum < 0) {
			// against the ship
			requiredSpeed = requiredSpeed + Math.abs(currentSpeedNum);
		}

		const adjustedSTW = requiredSpeed / (1 - selectedWeather.loss / 100);

		setSpeed(adjustedSTW.toFixed(2));

	};


	return (
		<Layout
			mainContent={
				<View style={[styles.flexBox]}>

					{/* Distance Input */}

					<View style={[styles.leftItem, styles.inputLabel]}>
						<Text style={styles.label}>Distance (NM)</Text>
					</View>
					<View style={[styles.rightItem, styles.inputContainer]}>
						<TextInput
							style={styles.textInput}
							placeholder="Enter nautical miles"
							keyboardType="decimal-pad"
							value={distance}

							onChangeText={(text) => {
								if (numberRegex.test(text)) {
									setDistance(text);
								}

							}}
							placeholderTextColor="#9b9898ff"
							maxLength={8}
							textContentType="none"
						/>
						{distance && distance.toString().length > 0 && (
							<TouchableOpacity onPress={() => setDistance("")}>
								<Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
							</TouchableOpacity>
						)}
					</View>

					{/* Date & Time Input */}
					<View style={[styles.leftItem, styles.inputLabel]}>
						<Text style={styles.label}>Departure Time</Text>
					</View>

					<View style={[styles.rightItem, styles.inputContainer]}>
						<TouchableOpacity style={styles.dateInput} onPress={() => showPicker("current")}
						>
							<Image
								source={require("../../assets/images/calenderIcon.png")}
								style={styles.dateIcon}
							/>
							<Text
								style={[
									styles.dateText,
									!currentTime && { color: "#9b9898ff" }, // apply placeholder color if no date
								]}
							>
								{currentTime
									? currentTime.toLocaleString()
									: "Select Datetime"}
							</Text>
						</TouchableOpacity>

						{currentTime && (
							<TouchableOpacity onPress={() => setCurrentTime(null)}>
								<Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
							</TouchableOpacity>
						)}
					</View>
					{/* Date & Time Input */}
					<View style={[styles.leftItem, styles.inputLabel]}>
						<Text style={styles.label}>Arrival Time</Text>
					</View>

					<View style={[styles.rightItem, styles.inputContainer]}>
						<TouchableOpacity style={styles.dateInput} onPress={() => showPicker("arrival")}
						>
							<Image
								source={require("../../assets/images/calenderIcon.png")}
								style={styles.dateIcon}
							/>
							<Text
								style={[
									styles.dateText,
									!arrivalTime && { color: "#9b9898ff" }, // apply placeholder color if no date
								]}
							>
								{arrivalTime
									? arrivalTime.toLocaleString()
									: "Select Datetime"}
							</Text>
						</TouchableOpacity>

						{arrivalTime && (
							<TouchableOpacity onPress={() => setArrivalTime(null)}>
								<Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
							</TouchableOpacity>
						)}
					</View>
					<View style={[styles.leftItem, styles.inputLabel]}>
						<Text style={styles.label}>Weather & Wind </Text>
					</View>
					<View style={[styles.rightItem, styles.inputContainer,]}>
						<DropdownPicker
							options={weatherOptions.map(o => o.label)} // only labels for dropdown
							selected={`${selectedWeather.label} (${selectedWeather.loss}% Loss)`}       // display selected label
							onSelect={(label) => {
								const selected = weatherOptions.find(o => o.label === label);
								setSelectedWeather(selected);       // save full object with loss
							}}
						/>
					</View>
					<View style={[styles.leftItem, styles.inputLabel]}>
						<Text style={styles.label}>Set Speed(kn)</Text>
					</View>
					<View style={[styles.rightItem, styles.inputContainer,]}>
						<View style={{ position: "relative" }}>
							<TextInput
								style={styles.textInput}
								placeholder="(±)Water Current Speed"
								keyboardType="decimal-pad"
								value={currentSpeed}
								onChangeText={(text) => {
									if (signNumberRegex.test(text)) {
										setCurrentSpeed(text);
										setCurrentSpeedSign(text.startsWith("-") ? "-" : "+");
										if (text.length > 0) {
											setShowHint(true);
											if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
											hintTimerRef.current = setTimeout(() => setShowHint(false), 2000);
										} else {
											setShowHint(false);
										}
									}
								}}
								placeholderTextColor="#9b9898ff"
								maxLength={8}
								textContentType="none"
							/>
							{currentSpeed && currentSpeed.toString().length > 0 && (
								<TouchableOpacity onPress={() => setCurrentSpeed("")}>
									<Text style={[styles.crossEmoji, styles.clrBtn]}>❌</Text>
								</TouchableOpacity>
							)}
							{/* Inline hint text */}
							{showHint && (
								<View style={styles.hintBubble}>
									<Text style={styles.hintBubbleText}>
										{currentSpeedSign === "-"
											? "Current Against ship"
											: "Current With ship"}
									</Text>
								</View>
							)}
						</View>
					</View>
					<Card
						style={styles.cardExtend}>
						<Text
							style={[
								styles.cardText,

							]}
						>
							Required Speed to reach on time
						</Text>
						<Text style={[
							styles.resultText,
						]}> {speed || "--"} Knot(s)
						</Text>
					</Card>


					<TouchableOpacity style={styles.calculateBtn} activeOpacity={0.8} onPress={calculateSpeed}>
						<Text style={styles.calculateTxt}>Calculate Speed</Text>
					</TouchableOpacity>
					{/* DateTime Picker with restrictions */}
					<DateTimePickerModal
						isVisible={isPickerVisible}
						mode="datetime"
						onConfirm={handleDateTimeConfirm}
						onCancel={hidePicker}
						{...(activePicker === "arrival" && currentTime
							? { minimumDate: currentTime }
							: {})}
						{...(activePicker === "current" && arrivalTime
							? { maximumDate: arrivalTime }
							: {})}
					/>
				</View >
			}
		/>
	);
}
