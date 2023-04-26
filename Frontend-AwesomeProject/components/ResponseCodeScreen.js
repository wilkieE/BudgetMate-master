import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import {
  getBudgetRequestsFromLocalDB,
  setBudgetRequestsToLocalDB,
} from "../utils/database";

const ResponseCodeScreen = () => {
  const [code, setCode] = useState("");
  const handleUpdateStatus = async () => {
    try {
      const budgetRequests = await getBudgetRequestsFromLocalDB();
      console.log(budgetRequests);
      const requestId = code.split(";")[0].toLowerCase();
      const statusCode = code.split(";")[1];

      let status;
      if (statusCode === "1") {
        status = "submitted";
      } else if (statusCode === "2") {
        status = "rejected";
      } else if (statusCode === "3") {
        status = "approved";
      } else {
        Alert.alert("Invalid status code");
        return;
      }
      let idFound = false;

      const updatedRequests = budgetRequests.map((item) => {
        if (!item.formData) {
          return item;
        }
        const dataFields = item.formData.split(";");
        const id = dataFields[0];
        const description = dataFields[3];
        if (id === requestId) {
          idFound = true;
          if (item.status === status) {
            Alert.alert(`${description} already confirmed as ${item.status}`);
            return item;
          }
          item.status = status;
          Alert.alert(`${description} updated to ${item.status}`);
          console.log(item);
          return item;
        }
        return item;
      });

      if (!idFound) {
        Alert.alert(`Budget Request not found`);
        return;
      }

      // const filteredRequests = updatedRequests.filter((item) => item !== null);

      await setBudgetRequestsToLocalDB(updatedRequests);
    } catch (error) {
      console.error("Error updating budget request status: ", error);
      // Display error message to the user using Alert or some other UI component
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Response Code</Text>
      <TextInput
        style={styles.textInput}
        value={code}
        onChangeText={setCode}
        placeholder="paste response code here"
      />
      <Pressable style={styles.button} onPress={handleUpdateStatus}>
        <Text style={styles.buttonText}>Update Status</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F2F2F2",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
    width: "100%",
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

export default ResponseCodeScreen;
