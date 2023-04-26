import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BudgetMate</Text>
      <Text style={styles.description}>
        Welcome to the BudgetMate! This app is designed to make it easy for you
        to fill out a request form and generate a unique request code. Once the
        code is generated, you can send it using SMS to complete the request
        process.
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Menu Screen")} // Update this line
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
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

export default HomeScreen;
