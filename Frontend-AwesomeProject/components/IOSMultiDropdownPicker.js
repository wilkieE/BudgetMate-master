import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const IOSMultiDropdownPicker = ({ options, onOptionChange }) => {
  const [selectedOptions, setSelectedOptions] = useState(
    Object.fromEntries(Object.keys(options).map((key) => [key, ""]))
  );

  const [selectedCode, setSelectedCode] = useState("");
  useEffect(() => {
    const allSelected = Object.values(selectedOptions).every(
      (option) => option !== ""
    );
    if (allSelected) {
      const code = Object.keys(options)
        .map((optionName) => selectedOptions[optionName].code || "")
        .join("");
      setSelectedCode(code);
      onOptionChange(code);
    } else {
      setSelectedCode("");
    }
  }, [selectedOptions]);

  const handleOptionChange = (optionName, optionValue) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [optionName]: optionValue,
    }));
  };

  const placeholder = {
    label: `Select a value`,
    value: "",
    color: "#9EA0A4",
  };

  return (
    <View style={styles.container}>
      {Object.entries(options).map(([optionName, optionValues]) => (
        <View style={styles.pickerContainer} key={optionName}>
          <Text style={styles.pickerTitle}>{optionName}:</Text>
          <RNPickerSelect
            placeholder={placeholder}
            onValueChange={(value) => handleOptionChange(optionName, value)}
            items={optionValues.map((option) => ({
              label: option.name,
              value: option,
            }))}
            style={{
              ...pickerSelectStyles,
              inputIOS: styles.picker,
              inputAndroid: styles.picker,
            }}
          />
        </View>
      ))}
      <Text style={styles.resultText}>
        {selectedCode ? `Code: ${selectedCode}` : "Please select all options"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 0,
    backgroundColor: "white",
  },
  pickerContainer: {
    marginBottom: 0,
  },
  pickerTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 2,
  },
  picker: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "white",
    paddingHorizontal: 10,
    fontSize: 16,
    color: "gray",
  },
  resultText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    color: "gray",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    color: "gray",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  placeholder: {
    color: "#9EA0A4",
  },
});

export default IOSMultiDropdownPicker;
