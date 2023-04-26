import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrgCodeInput = () => {
  const [orgCode, setOrgCode] = useState("");
  const [saved, setSaved] = useState(false);

  const saveOrgCode = async () => {
    try {
      await AsyncStorage.setItem("orgCode", orgCode);
      setSaved(true);
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
  };

  const handleTextInputPress = () => {
    setOrgCode("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Organization Code</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setOrgCode(text)}
        value={orgCode}
        maxLength={2}
        placeholder="e.g. AB"
        onPressIn={handleTextInputPress}
      />
      <Pressable style={styles.button} onPress={saveOrgCode}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
      {saved && <Text style={styles.savedText}>Organization code saved!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
    paddingVertical: 12,
    fontSize: 16,
    color: "#333333",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    marginBottom: 20,
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
  savedText: {
    color: "green",
    marginTop: 10,
  },
});

export default OrgCodeInput;
