import React, { useState } from "react";
import { View, Text, Image, Pressable, ScrollView, Modal } from "react-native";
import { scale, verticalScale, moderateScale } from '../utils/scale';
import dropdownStyles from "../style/pickupstyle";
import styles from "../style/styles";
import Layout from "../components/Layout";
import TemperatureConverter from "../components/converters/TemperatureConverter";
import SpeedConverter from "../components/converters/SpeedConverter";
import DistanceConverter from "../components/converters/DistanceConverter";
import LengthConverter from "../components/converters/LengthConverter";
import { categoryOptions } from "../utils/constants";
import WeightConverter from "../components/converters/WeightConverter";
import VolumeConverter from "../components/converters/VolumeConverter";
import PressureConverter from "../components/converters/PressureConverter";
import PowerConverter from "../components/converters/PowerConverter";
import Card from "../components/Card";

export default function ConverterScreen() {

  const temperatureRegex = /^-?\d*\.?\d*$/;
  const numberRegex = /^\d*\.?\d*$/;
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Temperature");
  const [showCountModal, setShowCountModal] = useState(false);
  const [isPressed, setIsPressed] = React.useState(false);

  function formatNumber(value) {
    const num = parseFloat(value);
    if (isNaN(num)) return "";

    // If number is too large or too small, use scientific notation
    if (Math.abs(num) >= 1e6 || (Math.abs(num) > 0 && Math.abs(num) < 1e-2)) {
      return num.toExponential(2); // e.g., "1.23e+08"
    }

    // Otherwise, round to 2 decimal places
    return num.toFixed(2);
  }


  return (
    <Layout
      mainContent={
        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",

          }}
          showsVerticalScrollIndicator={false}
        >

          {categoryOptions.length > 0 ? (
            categoryOptions.map((tool, index) => (
              <Pressable
                key={index}
                style={styles.flexItem}

              >
                {({ pressed }) => (
                  <Card
                    style={{
                      backgroundColor: pressed ? "#3C78AD" : "#fff", // Blue while pressing
                    }}
                  >
                    <Image
                      source={tool.image}
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
                      {tool.name}
                    </Text>
                  </Card>
                )}
              </Pressable>
            ))
          ) : (
            <Text>No categories available</Text>
          )}
        </ScrollView >
      }
    />
  );
}




