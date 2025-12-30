// src/components/HomeHeader.js
import React from "react";
import { View, TextInput, Image, Text, TouchableOpacity } from "react-native";
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
            {/* <View style={styles.searchWrapper}>
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

                <View
                    style={
                        styles.searchBoxLine
                    }
                />
                {searchText.length > 0 ? (
                    <TouchableOpacity
                        onPress={() => setSearchText("")}
                        style={styles.crossWrapper}
                    >
                        <Text style={[styles.headerEmoji, styles.clrBtn]}>❌</Text>
                    </TouchableOpacity>
                ) : (
                    <Image
                        source={require("../../assets/images/searchIcon.png")}
                        style={styles.searchIcon}
                    />
                )}
            </View> */}

        </View >

    );
}


