// src/components/HomeHeader.js
import React from "react";
import { View, TextInput, Image, Text } from "react-native";
import styles from "../style/styles";
import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

export default function HomeHeader() {

    const { searchText, setSearchText } = useContext(SearchContext);
    return (

        <View style={styles.headContainer}>

            {/* Logo */}
            <View style={styles.logoWrapper} >
                <Image
                    source={require("../../assets/images/anchor.png")}
                    style={styles.logo}
                />
                <Text style={styles.headerTitle}>Nautical Tools</Text>
                {/* Search Box */}
            </View>
            <View style={styles.searchWrapper}>
                <TextInput
                    style={
                        styles.searchBox
                    }

                    placeholder="Search"
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholderTextColor="#b2afafff"
                    caretColor="#fff"          // For iOS
                    selectionColor="#fff"
                />
                {/* Fake ::after line */}
                <View
                    style={
                        styles.searchBoxLine
                    }
                />
                <Image
                    source={require("../../assets/images/searchIcon.png")}
                    style={
                        styles.searchIcon
                    }
                />
            </View>

        </View>

    );
}


