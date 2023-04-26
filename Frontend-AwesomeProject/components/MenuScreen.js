import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";
import {
  clearLocalStorage,
  getBudgetRequestsFromLocalDB,
  saveBudgetRequestToLocalDB,
} from "../utils/database";
import {
  encryptAnswers,
  generateShortUniqueId,
  submitAnswerstoServer,
} from "../utils/helpers";
import { sendSMS } from "../utils/sendSMS";
import DocPicker from "./DocPicker";

const MenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu Actions</Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Budget Requests Screen")}
      >
        <Icon name="list" size={24} color="#FFFFFF" />
        <Text style={styles.buttonText}>View Budget Requests</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Organisation Code Screen")}
      >
        <Icon name="cog" size={24} color="#FFFFFF" />
        <Text style={styles.buttonText}>Set Organisation Code</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Request Form")}
      >
        <Icon name="magic" size={24} color="#FFFFFF" />
        <Text style={styles.buttonText}>Make a new request</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("CSV Menu")}
      >
        <Icon name="file-text" size={24} color="#FFFFFF" />
        <Text style={styles.buttonText}>Import from CSV</Text>
      </Pressable>

      {/* <Pressable
        style={styles.button}
        onPress={async () => {
          const fakeFormResults =
            "E1P1F1A1111;2024-Q1;Purchase of laptops;200000;Yes;4000000;2023-04-20";
          const uniqueId = generateShortUniqueId();
          const formData = uniqueId + ";" + fakeFormResults;
          const budgetRequest = {
            formData,
            status: "pending",
          };
          await saveBudgetRequestToLocalDB(budgetRequest);
        }}
      >
        <Icon name="magic" size={24} color="#FFFFFF" />
        <Text style={styles.buttonText}>Generate a test request</Text>
      </Pressable> */}

      <Pressable style={styles.button} onPress={() => clearLocalStorage()}>
        <Icon name="trash" size={24} color="#FFFFFF" />
        <Text style={styles.buttonText}>Clear Local storage</Text>
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
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    marginLeft: 10,
  },
});

export default MenuScreen;
