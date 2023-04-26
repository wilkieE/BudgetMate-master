import React, { useState } from "react";
import { View, Platform, Text, Pressable, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = ({ onChange }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    const formattedDate = currentDate.toISOString().substr(0, 10);
    onChange(formattedDate);
  };

  const showPicker = () => {
    setShow(true);
  };

  return (
    <View style={{ height: 500, marginTop: 10, alignItems: "center" }}>
      <Text
        style={{
          marginTop: 40,
          marginBottom: 80,
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        Current Payment Date:{" "}
        {date.toLocaleDateString() || "Please select a date"}
      </Text>
      <Pressable style={styles.button} onPress={showPicker}>
        <Text style={styles.buttonText}>Change Date</Text>
      </Pressable>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});

export default DatePicker;
