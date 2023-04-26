import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Platform,
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import {
  getOrganizationCode,
  saveBudgetRequestToLocalDB,
} from "../utils/database";
import { requestForms } from "../utils/forms";
import { encryptAnswers, generateShortUniqueId } from "../utils/helpers";
import { sendSMS } from "../utils/sendSMS";
import DatePicker from "./DatePicker";
import ProgressIndicator from "./ProgressIndicator";

const RequestForm = ({ navigation }) => {
  const minimumBugetlineCodeLength = 6;
  const [formIndex, setFormIndex] = useState(0);
  const [formResults, setFormResults] = useState([]);
  const [currentResult, setCurrentResult] = useState("");
  const { forms } = requestForms;
  const [orgCode, setOrgCode] = useState("");
  const [MultiDropdownPicker, setMultiDropdownPicker] = useState(null);

  useEffect(() => {
    const importMultiDropdownPicker = async () => {
      let MultiDropdownPickerComponent;
      if (Platform.OS === "ios") {
        MultiDropdownPickerComponent = (
          await import("./IOSMultiDropdownPicker")
        ).default;
      } else {
        MultiDropdownPickerComponent = (await import("./MultiDropdownPicker"))
          .default;
      }
      setMultiDropdownPicker(() => MultiDropdownPickerComponent);
    };

    // Only import the component if it has not been imported before
    if (!MultiDropdownPicker) {
      importMultiDropdownPicker();
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchOrgCode = async () => {
        try {
          const code = await getOrganizationCode();
          setOrgCode(code);
        } catch (error) {
          Alert.alert("Please set organization code", "", [
            {
              text: "OK",
              onPress: () => navigation.navigate("Organisation Code Screen"),
            },
          ]);
          console.log(
            "Request form component had an Error fetching organization code: ",
            error
          );
        }
      };

      fetchOrgCode();
    }, [])
  );

  const handleNextForm = () => {
    //Check if current question has been answered before going to next question
    if (!currentResult) {
      Alert.alert("Error", "Please complete this form before proceeding");
      return;
    }
    //Save the current answer to the answers array, clear the current answer variable and move to the next question
    const newFormResults = [...formResults];
    newFormResults[formIndex] = currentResult;
    setFormResults(newFormResults);
    setFormIndex((prevIndex) => prevIndex + 1);
    setCurrentResult("");
  };

  const handleLastForm = (result) => {
    const newFormResults = [...formResults];
    newFormResults[formIndex] = result;
    setFormResults(newFormResults);
    setCurrentResult("");
  };

  const handlePrevForm = () => {
    if (formIndex === 0) {
      return;
    }
    setFormIndex((prevIndex) => prevIndex - 1);
  };
  const handleFormChange = (result) => {
    setCurrentResult(result);
  };
  const handleFirstFormChange = (result) => {
    if (result.length > minimumBugetlineCodeLength)
      setCurrentResult(`${orgCode}${result}`);
  };

  const handleFormSubmit = async () => {
    const uniqueId = generateShortUniqueId();
    const formData = uniqueId + ";" + formResults.join(";");
    const budgetRequest = {
      formData,
      status: "pending",
    };
    await saveBudgetRequestToLocalDB(budgetRequest);
    console.log(formData);
    sendSMS(encryptAnswers(formData));
  };

  return (
    <View style={styles.background}>
      <ProgressIndicator
        totalQuestions={forms.length}
        currentQuestion={formIndex}
      ></ProgressIndicator>
      <View style={styles.appContainer}>
        {formIndex < forms.length ? (
          <View style={{ flex: 1 }}>
            <View style={styles.container}>
              <View style={styles.containerChild}>
                <Text style={styles.title}>{forms[formIndex].screenName}</Text>
                {formIndex === 0 && MultiDropdownPicker && (
                  <MultiDropdownPicker
                    options={forms[formIndex].options}
                    onOptionChange={handleFirstFormChange}
                  />
                )}
                {formIndex === 1 && MultiDropdownPicker && (
                  <MultiDropdownPicker
                    options={forms[formIndex].options}
                    onOptionChange={handleFormChange}
                  />
                )}
                {formIndex === 2 && (
                  <TextInput
                    style={styles.textInput}
                    placeholder={forms[formIndex].options.placeholder}
                    onChangeText={handleFormChange}
                    maxLength={forms[formIndex].options.maxLength}
                  />
                )}
                {formIndex === 3 && (
                  <TextInput
                    keyboardType="numeric"
                    returnKeyType="done"
                    style={styles.textInput}
                    placeholder={forms[formIndex].options.placeholder}
                    onChangeText={handleFormChange}
                    maxLength={forms[formIndex].options.maxLength}
                  />
                )}
                {formIndex === 4 && (
                  <View>
                    {forms[formIndex].options.isContinuingPayment.map(
                      (option) => (
                        <Pressable
                          key={option.code}
                          style={[
                            styles.optionButton,
                            currentResult === option.code &&
                              styles.optionButtonSelected,
                          ]}
                          onPress={() => handleFormChange(option.code)}
                        >
                          <View
                            style={[
                              styles.radioOuter,
                              currentResult === option.code &&
                                styles.radioOuterSelected,
                            ]}
                          >
                            <View
                              style={[
                                styles.radioInner,
                                currentResult === option.code &&
                                  styles.radioInnerSelected,
                              ]}
                            />
                          </View>
                          <Text
                            style={[
                              styles.optionText,
                              currentResult === option.code && {
                                color: "#fff",
                              },
                            ]}
                          >
                            {option.name}
                          </Text>
                        </Pressable>
                      )
                    )}
                  </View>
                )}
                {formIndex === 5 && (
                  <TextInput
                    keyboardType="numeric"
                    returnKeyType="done"
                    style={styles.textInput}
                    placeholder={forms[formIndex].options.placeholder}
                    onChangeText={handleFormChange}
                    maxLength={forms[formIndex].options.maxLength}
                  />
                )}
                {formIndex === 6 && (
                  <View>
                    <DatePicker onChange={handleLastForm} />
                  </View>
                )}
              </View>
              <View style={styles.buttonContainer}>
                {formIndex > 0 ? (
                  <Pressable
                    style={[styles.button, { alignSelf: "flex-start" }]}
                    onPress={handlePrevForm}
                  >
                    <Text style={styles.buttonText}>Prev Form</Text>
                  </Pressable>
                ) : (
                  <View style={{ width: 100 }} />
                )}
                {formIndex < requestForms.forms.length - 1 ? (
                  <Pressable
                    style={[styles.button, { alignSelf: "flex-end" }]}
                    onPress={handleNextForm}
                  >
                    <Text style={styles.buttonText}>Next Form</Text>
                  </Pressable>
                ) : (
                  <Pressable
                    style={[styles.button, { alignSelf: "flex-end" }]}
                    onPress={handleFormSubmit}
                  >
                    <Text style={styles.buttonText}>Submit Form</Text>
                  </Pressable>
                )}
              </View>
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.formCompletedText}>Form Completed</Text>
            <Text>Your answers: {formResults.join(";")}</Text>
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, { alignSelf: "flex-start" }]}
                onPress={handlePrevForm}
              >
                <Text style={styles.buttonText}>Go back</Text>
              </Pressable>
              <Pressable
                style={[styles.button, { alignSelf: "flex-end" }]}
                onPress={handleFormSubmit}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  appContainer: {
    flex: 1,
    margin: 20,
    // marginTop: 10,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingTop: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
  containerChild: { height: "88%", marginBottom: "2%" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  formContainer: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
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
    marginBottom: 16,
  },
  formItem: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  item: {
    fontSize: 16,
    color: "gray",
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  optionButtonSelected: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
  },
  radioOuterSelected: {
    borderColor: "#007AFF",
  },
  radioInnerSelected: {
    backgroundColor: "#007AFF",
  },
  formCompletedText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default RequestForm;
