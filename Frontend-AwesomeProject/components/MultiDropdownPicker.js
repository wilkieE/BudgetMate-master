import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const MultiDropdownPicker = ({ options, onOptionChange }) => {
  const [selectedOptions, setSelectedOptions] = useState(
    Object.fromEntries(Object.keys(options).map((key) => [key, ""]))
  );
  const [selectedCode, setSelectedCode] = useState("");

  const [firstSelectedOptions, setFirstSelectedOptions] = useState(
    Object.fromEntries(Object.keys(options).map((key) => [key, null]))
  );

  useEffect(() => {
    const allSelected = Object.values(selectedOptions).every(
      (option) => option !== null && option.code !== "" && option.code !== null
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
    if (!optionValue) {
      setSelectedOptions((prevState) => ({
        ...prevState,
        [optionName]: null,
      }));
      return;
    }
    setSelectedOptions((prevState) => ({
      ...prevState,
      [optionName]: optionValue.code === null ? null : optionValue,
    }));

    if (
      optionValue &&
      firstSelectedOptions[optionName] === null &&
      optionValue === options[optionName][0]
    ) {
      setSelectedCode("");
      onOptionChange("");
      setFirstSelectedOptions((prevState) => ({
        ...prevState,
        [optionName]: optionValue,
      }));
    }
  };

  const showPicker = (optionName) => {
    setFirstSelectedOptions((prevState) => ({
      ...prevState,
      [optionName]: null,
    }));
    handleOptionChange(optionName, null);
  };

  const handleTextInputChange = (optionName, text) => {
    handleOptionChange(optionName, { code: text, name: text });
    if (text.length === 2) {
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      {Object.entries(options).map(([optionName, optionValues]) => (
        <View style={styles.pickerContainer} key={optionName}>
          <Text style={styles.pickerTitle}>{optionName}:</Text>
          {firstSelectedOptions[optionName] === options[optionName][0] &&
          options[optionName][0].name === "Enter manually" ? (
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                value={selectedOptions[optionName]}
                onChangeText={(text) => handleTextInputChange(optionName, text)}
                maxLength={2}
                placeholder="e.g. AB"
                // onPressIn={handleTextInputPress}
              />
              <Pressable
                style={styles.button}
                onPress={() => showPicker(optionName)}
              >
                <Text style={styles.buttonText}>Show Picker</Text>
              </Pressable>
            </View>
          ) : (
            <Picker
              selectedValue={selectedOptions[optionName]}
              onValueChange={(itemValue) =>
                handleOptionChange(optionName, itemValue)
              }
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label={`Select a ${optionName}:`} value="" />
              {optionValues.map((option) => (
                <Picker.Item
                  key={option.code}
                  label={option.name}
                  value={option}
                />
              ))}
            </Picker>
          )}
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
    // //removed flex to fix dropdown styling bug
    // flex: 1,
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
  },
  pickerItem: {
    fontSize: 16,
    color: "gray",
  },
  resultText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
    fontSize: 16,
    color: "#333333",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    // marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MultiDropdownPicker;
