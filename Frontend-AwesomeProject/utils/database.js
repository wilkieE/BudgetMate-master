import AsyncStorage from "@react-native-async-storage/async-storage";

// Save the budget request to the local database
export const saveBudgetRequestToLocalDB = async (budgetRequest) => {
  try {
    const budgetRequests = await getBudgetRequestsFromLocalDB();
    budgetRequests.push(budgetRequest);
    await AsyncStorage.setItem(
      "budgetRequests",
      JSON.stringify(budgetRequests)
    );
    console.log("Budget request stored successfully");
  } catch (error) {
    console.error(error);
  }
};

// Get all the budget requests from the local database
export const getBudgetRequestsFromLocalDB = async () => {
  try {
    const budgetRequests = await AsyncStorage.getItem("budgetRequests");
    return budgetRequests != null ? JSON.parse(budgetRequests) : [];
  } catch (error) {
    console.log("Error getting budget requests from async storage: ", error);
    return [];
  }
};

export const setBudgetRequestsToLocalDB = async (budgetRequests) => {
  try {
    await AsyncStorage.setItem(
      "budgetRequests",
      JSON.stringify(budgetRequests)
    );
    console.log("Budget requests saved successfully to database");
  } catch (error) {
    console.log("Error saving budget requests to async storage: ", error);
  }
};

// Update the status of the budget request in the local database
export const updateBudgetRequestStatus = async (
  budgetRequestIndex,
  newStatus
) => {
  try {
    const budgetRequests = await getBudgetRequestsFromLocalDB();
    budgetRequests[budgetRequestIndex].status = newStatus;
    await AsyncStorage.setItem(
      "budgetRequests",
      JSON.stringify(budgetRequests)
    );
  } catch (error) {
    console.error(error);
  }
};

//get organisation code
export const getOrganizationCode = async () => {
  try {
    const value = await AsyncStorage.getItem("orgCode");
    if (value !== null) {
      return value;
    } else {
      // If organization code is not found in local storage, handle the error accordingly
      throw new Error("Organization code not found in local storage");
    }
  } catch (error) {
    // Handle AsyncStorage errors
    throw new Error("Error fetching organization code");
  }
};

export const clearLocalStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log("Local storage cleared successfully.");
  } catch (error) {
    console.log("Error clearing local storage:", error);
  }
};
