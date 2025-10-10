// components/selectStyle.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
} from "react-native";
import { moderateScale, scale } from "../utils/scale";
import selectStyle from "../style/selectStyle";
import styles from "../style/styles";
export default function Dropdown({
  data = [],
  labelKey = "name",
  valueKey = "timezone_offset",
  placeholder = "Select",
  searchable = false,
  onSelect,
}) {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredData = data.filter((item) =>
    item[labelKey].toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (item) => {
    setSelectedItem(item);
    onSelect(item);
    setVisible(false);
  };

  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity
        style={[selectStyle.dropdownButton, styles.flexBox, { justifyContent: "space-between", }]}
        onPress={() => setVisible(true)}
      >
        <Text
          style={[
            selectStyle.dropdownText,
            !selectedItem && { color: "#9b9898ff" }
          ]}
        >
          {selectedItem ? selectedItem[labelKey] : placeholder}
        </Text>
        <Text style={{ fontSize: moderateScale(9) }}>▼</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <View style={selectStyle.modalOverlay}>
          <View style={selectStyle.modalContainer}>
            {searchable && (
              <TextInput
                style={selectStyle.searchInput}
                placeholder="Search..."
                value={search}
                onChangeText={setSearch}
              />
            )}
            <FlatList
              data={filteredData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={selectStyle.item}
                  onPress={() => handleSelect(item)}
                >
                  <Text>{item[labelKey]}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={selectStyle.closeBtn}
              onPress={() => setVisible(false)}
            >
              <Text style={{ color: "white" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

