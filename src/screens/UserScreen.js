import React from 'react'
import { View, Text, Pressable, } from "react-native";
import styles from "../style/styles";
export default function UserScreen({ navigation }) {

    return (
        <View style={{ flex: 1, backgroundColor: "#3C78AD", justifyContent: "center", alignItems: "center" }}>
            <Pressable onPress={() => navigation.navigate("Setup Profile")}>
                {({ pressed }) => (
                    <Text
                        style={[
                            styles.linkText,
                            {
                                textDecorationLine: pressed ? "underline" : "none",
                            }
                        ]}
                    >
                        Set up Profile{"\n"}<Text>Get a Curriculum Vitae</Text>
                    </Text>
                )}
            </Pressable>
        </View>
    );
}

