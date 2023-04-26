import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import PapaParse from "papaparse";
import { encryptAnswers, generateShortUniqueId } from "../utils/helpers";
import { sendSMS } from "../utils/sendSMS";
import { saveBudgetRequestToLocalDB } from "../utils/database";

const CSVMenuScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [updateStatusInput, setUpdateStatusInput] = useState("");
  const [buttonStatus, setButtonStatus] = useState({});
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});

    if (result.type === "success") {
      const fileExtension = result.name.split(".").pop();
      if (fileExtension.toLowerCase() === "csv") {
        readCSVFile(result.uri);
      } else {
        alert("Please select a .csv file");
      }
    }
  };

  const readCSVFile = async (uri) => {
    const content = await FileSystem.readAsStringAsync(uri);
    parseCSV(content);
  };

  const parseCSV = (csvContent) => {
    PapaParse.parse(csvContent, {
      header: true,
      complete: (results) => {
        const modifiedData = results.data.map((row) => ({ ...row, status: 0 }));
        setData(modifiedData);
      },
      error: (err) => {
        console.error("Error parsing CSV:", err);
      },
    });
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Not sent";
      case 1:
        return "Pending";
      case 2:
        return "Approved";
      case 3:
        return "Rejected";
      default:
        return "Unknown";
    }
  };

  const updateStatus = () => {
    const id = parseInt(updateStatusInput.slice(0, -1), 10);
    const status = parseInt(updateStatusInput.slice(-1), 10);

    if (id && status >= 0 && status <= 3) {
      setData((prevData) =>
        prevData.map((row) => {
          if (row.Id === id) {
            return { ...row, status };
          } else {
            return row;
          }
        })
      );
      setUpdateStatusInput("");
    } else {
      alert("Invalid input. Please enter a valid ID and status code.");
    }
  };

  const renderItem = ({ item }) => {
    const combinedColumns = [
      item.Organisation,
      item.Project,
      item.Fund,
      item.Chapter,
      item.Part,
      item.Type,
      item.Item,
    ].join("");

    const fullString = [
      combinedColumns,
      item.Fiscalyear,
      item.Description,
      item.Amount,
      item.Continuous,
      item.Expectedpaymentamount,
      item.Expectedpaymentdate,
    ].join(";");

    const handleButtonClick = async (itemId) => {
      const uniqueId = generateShortUniqueId();
      const formData = uniqueId + ";" + fullString;
      const budgetRequest = {
        formData,
        status: "pending",
      };
      console.log(encryptAnswers(formData));
      await saveBudgetRequestToLocalDB(budgetRequest);
      sendSMS(encryptAnswers(formData));

      // Update button status
      setButtonStatus((prevStatus) => ({
        ...prevStatus,
        [itemId]: { color: "green", text: "Sent" },
      }));
    };

    return (
      <View style={styles.widgetContainer}>
        <View style={{ flexDirection: "row", padding: 10 }}>
          <Text style={{ flex: 1 }}>{item.Id}</Text>
          <Text style={{ flex: 5 }}>{item.Description}</Text>
          <Pressable
            style={[
              styles.button,
              { backgroundColor: buttonStatus[item.Id]?.color || "#007AFF" },
            ]}
            onPress={() => handleButtonClick(item.Id)}
          >
            <Text style={{ color: "white" }}>
              {buttonStatus[item.Id]?.text || "Send"}
            </Text>
          </Pressable>
        </View>
        <Text>Status: {getStatusText(item.status)}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, { alignSelf: "flex-start" }]}
          onPress={() => navigation.navigate("Response Code Screen")}
        >
          <Text style={styles.buttonText}>Enter a response code</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { alignSelf: "flex-end" }]}
          onPress={pickDocument}
        >
          <Text style={styles.buttonText}>Upload CSV</Text>
        </Pressable>
      </View>
      {/* <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "black",
            padding: 5,
            flex: 1,
            marginRight: 10,
          }}
          value={updateStatusInput}
          onChangeText={setUpdateStatusInput}
          keyboardType="numeric"
          placeholder="Enter ID and status code"
        />
        <Button onPress={updateStatus}>Update Status</Button>
      </View> */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 5,
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
  widgetContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default CSVMenuScreen;
