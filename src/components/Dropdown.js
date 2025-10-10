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
import { scale } from "../utils/scale";
import selectStyle from "../style/selectStyle";
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
        style={selectStyle.dropdownButton}
        onPress={() => setVisible(true)}
      >
        <Text style={selectStyle.dropdownText}>
          {selectedItem ? selectedItem[labelKey] : placeholder}
        </Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="slide">
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

