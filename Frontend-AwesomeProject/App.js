import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RequestForm from "./components/RequestForm";
import HomeScreen from "./components/HomeScreen";
import BudgetRequestsScreen from "./components/BudgetRequestsScreen";
import OrganisationCodeScreen from "./components/OrganisationCodeScreen";
import ResponseCodeScreen from "./components/ResponseCodeScreen";
import CSVMenuScreen from "./components/CSVMenuScreen";
import MenuScreen from "./components/MenuScreen";

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Welcome to the Mof Survey!</Text>
//       <View style={{ marginTop: 30 }}></View>

//       <Pressable
//         style={styles.navButton}
//         onPress={() => navigation.navigate("Request Form")}
//       >
//         <Text style={[styles.navButtonText, { color: "#fff" }]}>
//           Make a Request
//         </Text>
//       </Pressable>
//       <View style={{ marginTop: 30 }}></View>

//       <Pressable
//         style={styles.navButton}
//         onPress={() => navigation.navigate("Phone Number Input")}
//       >
//         <Text style={[styles.navButtonText, { color: "#fff" }]}>
//           Enter phone number
//         </Text>
//       </Pressable>
//       <View style={{ marginTop: 30 }}></View>

//       <Pressable
//         style={styles.navButton}
//         onPress={() => submitAnswerstoServer([1, 2, 3, 4], "mike")}
//       >
//         <Text style={[styles.navButtonText, { color: "#fff" }]}>Test API</Text>
//       </Pressable>
//     </View>
//   );
// }

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Request Form"
          component={RequestForm}
          options={{ title: "Request Form" }}
        />
        <Stack.Screen
          name="Budget Requests Screen"
          component={BudgetRequestsScreen}
          options={{ title: "Previous Budget Requests" }}
        />
        <Stack.Screen
          name="Organisation Code Screen"
          component={OrganisationCodeScreen}
          options={{ title: "Organisation Code" }}
        />
        <Stack.Screen
          name="Response Code Screen"
          component={ResponseCodeScreen}
          options={{ title: "Response Code" }}
        />
        <Stack.Screen
          name="CSV Menu"
          component={CSVMenuScreen}
          options={{ title: "CSV Menu" }}
        />
        <Stack.Screen name="Menu Screen" component={MenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
