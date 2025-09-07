import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList } from "react-native";
import styles from "../style/styles";
import { screens } from "../utils/constants";
export default function HomeScreen({ navigation }) {

    const [searchText, setSearchText] = useState("");
    const filteredScreens = screens.filter(screen =>
        screen.name.toLowerCase().includes(searchText.toLowerCase())
    );
    return (
        <View style={styles.homeContainer}>

            <TextInput
                style={styles.searchInput}
                placeholder="Search ..."
                value={searchText}
                onChangeText={setSearchText}
                placeholderTextColor="#ccc"
                autoFocus={false}
            />

            <FlatList
                style={{ width: "80%" }}
                data={filteredScreens}
                keyExtractor={(item) => item.route}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.screenButton}
                        onPress={() => navigation.navigate(item.route)}
                    >
                        <Text style={styles.buttonText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />

        </View>
    );
}


