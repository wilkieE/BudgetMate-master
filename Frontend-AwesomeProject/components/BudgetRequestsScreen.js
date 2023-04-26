import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { getBudgetRequestsFromLocalDB } from "../utils/database";
import { extractSubstrings } from "../utils/helpers";
import { useFocusEffect } from "@react-navigation/native";

const BudgetRequestsScreen = ({ navigation }) => {
  const [budgetRequests, setBudgetRequests] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const getBudgetRequests = async () => {
        try {
          const savedBudgetRequests = await getBudgetRequestsFromLocalDB();
          setBudgetRequests(await extractSubstrings(savedBudgetRequests));
        } catch (error) {
          console.log(
            "Budget request screen ran into an Error getting budget requests from async storage: ",
            error
          );
        }
      };
      getBudgetRequests();
    }, [])
  );

  const renderHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.cell, styles.headerCell]}>Description</Text>
      <Text style={[styles.cell, styles.headerCell]}>Amount</Text>
      <Text style={[styles.cell, styles.headerCell]}>Date</Text>
      <Text style={[styles.cell, styles.headerCell]}>Status</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.cell}>
        <Text style={styles.title}>{item.description}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.amount}>{item.amount}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.cell}>
        <Text
          style={[
            styles.status,
            {
              color:
                item.status === "pending"
                  ? "black"
                  : item.status === "approved"
                  ? "green"
                  : item.status === "rejected"
                  ? "#FF0000"
                  : "#F0C808",
            },
          ]}
        >
          {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {budgetRequests.length > 0 ? (
        <View>
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, { alignSelf: "flex-start" }]}
              onPress={() => navigation.navigate("Response Code Screen")}
            >
              <Text style={styles.buttonText}>Enter a response code</Text>
            </Pressable>
            <Pressable
              style={[styles.button, { alignSelf: "flex-end" }]}
              onPress={() => navigation.navigate("Request Form")}
            >
              <Text style={styles.buttonText}>New Request</Text>
            </Pressable>
          </View>
          <FlatList
            data={budgetRequests}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.text}>No old budget requests.</Text>
          <Pressable
            style={[styles.button, { marginTop: 20 }]}
            onPress={() => navigation.navigate("Request Form")}
          >
            <Text style={styles.buttonText}>Make a New Request</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
  },
  item: {
    flexDirection: "row",
    padding: 10,
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
  cell: {
    width: "25%",
    // borderWidth: 1,
    alignItems: "center",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
  },
  status: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    paddingHorizontal: 5,
    marginTop: 5,
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

export default BudgetRequestsScreen;
