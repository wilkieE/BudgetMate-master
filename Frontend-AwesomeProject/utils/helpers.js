import AsyncStorage from "@react-native-async-storage/async-storage";

import CryptoJS from "crypto-js";

// Helper function to encrypt answers with AES encryption
//sample AES Cipher text
// "U2FsdGVkX1+0/7Fbnngio/hkKobzL5f3WNVSCGjij0VehfYcPrp4iTNK83ZrC3GylZhjx+3OvPWU86obmZOc1et1X+rOvTVUONHwDZx9Guw="
export const encryptAnswers = (answers) => {
  //TODO: change test key
  const key =
    "bf187f79a936437faba8cbb827da67da954f40d61096d9c8df62a327140129ef";
  const data = JSON.stringify(answers);
  const ciphertext = CryptoJS.AES.encrypt(data, key);
  return ciphertext.toString();
};

export const submitAnswerstoServer = async (answers) => {
  console.log(answers);
  const apiUrl = `http://192.168.137.2:3000/budgetReceive`;
  const smsBody = answers;

  try {
    const formData = encryptAnswers(`${answers}`);
    // const data = {
    //   sid: "your_sms_sid",
    //   from: "905338777696", // Replace with phone number
    //   body: `${formData}`,
    // };
    // const encryptedMessage =
    //   "sid=152138&from=905338777696&body=E1P1F1A1111;2024-Q1;Purchase of laptops;200000;Yes;4000000;2023-04-20";
    const response = await fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `sid=1513&from=905338777696&body=${smsBody}`,
    });
    if (response.ok) {
      const responseJson = await response.json();
      console.log(`Survey results sent: ${responseJson.message}`);
    } else {
      const errorJson = await response.json();
      console.log(`Error sending survey results: ${errorJson.error}`);
    }
  } catch (error) {
    console.log(`Error sending survey results: ${error.message}`);
  }
};

export const saveAnswersLocally = async (answers) => {
  try {
    await AsyncStorage.setItem("answers", JSON.stringify(answers));
    console.log("Answers stored successfully");
  } catch (error) {
    console.error("Error storing answers:", error);
  }
};

export const extractSubstrings = async (arr) => {
  const result = [];
  arr.forEach((obj) => {
    const formData = obj.formData;
    const parts = formData.split(";");
    const data = {
      uniqueRequestId: parts[0],
      description: parts[3],
      amount: parts[4],
      date: parts[7].substring(0, 10),
      status: obj.status,
    };
    result.push(data);
  });
  return result;
};

// export const generateShortUniqueId = () => {
//   //generate a 10 character long id
//   const timestamp = new Date().getTime().toString(36);
//   const random = Math.random().toString(36).substring(2, 7);
//   const uniqueId = timestamp + random;
//   return uniqueId;
// };

export const generateShortUniqueId = () => {
  //generate a 5 character long id
  const timestamp = new Date().getTime().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  const uniqueId = timestamp.slice(-2) + random;
  return uniqueId;
};
