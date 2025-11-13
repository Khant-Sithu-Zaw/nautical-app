import React from 'react'
import { View, Text, TouchableOpacity, Image, Pressable, ScrollView } from "react-native";
import styles from "../style/styles";
import { scale, moderateScale, verticalScale } from '../utils/scale';
import { courses } from '../utils/constants';
import Card from "../components/Card";
export default function ProfileScreen({ navigation }) {

    return (
        <View style={{ flex: 1, backgroundColor: "#3C78AD" }}>


            {/* 👆 marginBottom = height of your footer */}
            <ScrollView
                contentContainerStyle={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    paddingBottom: verticalScale(70),
                    paddingTop: verticalScale(20),
                }}
                showsVerticalScrollIndicator={false}
            >

            </ScrollView>


        </View>
    );
}

