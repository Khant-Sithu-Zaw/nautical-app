import React, { useState } from "react";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
// import { scale, verticalScale, moderateScale } from '../utils/scale';
// import dropdownStyles from "../style/pickupstyle";
import styles from "../style/styles";
import Layout from "../components/Layout";
import { categoryOptions } from "../utils/constants";
import Card from "../components/Card";

export default function ConverterScreen({ navigation }) {


  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Temperature");
  const [showCountModal, setShowCountModal] = useState(false);
  const [isPressed, setIsPressed] = React.useState(false);




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
                onPress={() => navigation.navigate(tool.name)}
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




