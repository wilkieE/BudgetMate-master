These are the docs for the BudgetMate mobile app. To see the docs for the BudgetMate backend system, read the [ReadMe.md File for the backend](https://github.com/Hackathonypmf/Hackathon/blob/master/Backend-AwesomeProject/readme.md) or visit [backend docs](https://hackathon-backend-production-d077.up.railway.app/api-docs/).    
  
  
# BudgetMate Mobile App

  
    
BudgetMate is a crossplatform IOS/Android/Web app built for the Yemen Ministry of Finance (MoF). It was developed using Expo/React Native and allows spending units to create budget requests using user-friendly inputs as well as CSV files.

## App Screenshots
<img src="https://user-images.githubusercontent.com/48595932/226315228-3f25c397-37c6-4fd9-bba1-04fc9a210d8e.jpg" width="19.5%"/> <img src="https://user-images.githubusercontent.com/48595932/226315198-ede5399a-b59a-41ab-a839-2407cbc31ca5.jpg" width="19.4%"/> <img src="https://user-images.githubusercontent.com/48595932/226315137-a18fb144-d47b-40e2-9ab7-1995329264c1.jpg" width="19.4%"/> <img src="https://user-images.githubusercontent.com/48595932/226314898-932d4728-fdd3-47d7-86d6-6df5388d14a6.jpg" width="19.5%"/> <img src="https://user-images.githubusercontent.com/48595932/226315170-8cca3ec7-139a-42f0-9761-eb1ed1c9391c.jpg" width="19.5%"/>


## Usage
### Set up organization code
You will need to set up your organization code the first time you open the app. This is a one-time step that ensures your budget requests are generated with the correct code.

### View budget requests
1. Tap on the "Previous Requests" button on the home screen.
2. Here, You can view a list of all your previous budget requests and their status. you can also update the status of your requests using the response code and create new budget requests.

### Create a budget request using the request form
1. Tap on the "Get started" button on the home screen.
2. Fill out the form with the necessary details.
3. Once you have filled out all the fields, tap on the "Sumbit form" button.
4. The app will encrypt the budget request and direct you to your default SMS app.
5. Press send to send the encrypted request to the server via SMS.

### Generate Budget Requests from CSV Files
BudgetMate also allows users to generate budget requests from CSV files.This feature is especially useful for users who need to submit multiple budget requests at once or who have a large amount of data to input. By importing budget requests from CSV files, users can save time and minimize errors in data entry.
However, it is important that the CSV file is in the correct format(Here is a [sample CSV file](https://github.com/Hackathonypmf/Hackathon/files/10979277/test_data.1.csv) that you can use as a template for your budget requests).
To generate budget requests from CSV files, follow these steps:

1. Prepare your CSV file with the necessary details for your budget requests.
2. Tap on the "CSV Menu" button on the home screen.
3. Select the CSV file from your device's storage.
4. The app will parse the CSV file and generate budget requests based on the data.
5. Review the generated budget requests and make any necessary edits before submitting them.
6. Once you are satisfied with the generated requests, tap on the "Send Requests" button to submit them to the server.

### Request Code Screen
The Request Code screen allows users to update the status of their budget requests based on the response code received from the server. This feature makes it easy for users to stay up-to-date on the status of their budget requests.
To use this feature, follow these steps:

1. Open the app and navigate to the Request Code screen.
2. Enter the request code received via SMS into the input field.
3. The app will parse the request code and find the budget request with the matching unique ID on the local mobile database.
4. The app will update the status of the budget request based on the code received. The status will be set to "Submitted" if the code corresponds to an acknowledged request, "Approved" if the code corresponds to an approved request, and "Rejected" if the code corresponds to a rejected request.
5. You can view the updated status of the budgetrequest on the Previous Requests screen.

## Installation
You can use the following commands to run the app in a development environment
1. Navigate to the frontend folder `cd .\Frontend-AwesomeProject\`
2. Install the dependencies: `npm install`
3. Start the Expo development server: `npx expo start`
4. Use the Expo app on your mobile device to scan the QR code and open the app.

## Building the Expo App for Distribution on iOS and Android

BudgetMate is built with React Native Expo, which allows for easy distribution of the app on iOS and Android. To build the app for distribution on each platform, you will need to use two different branches of the project - one for iOS and one for Android. Follow these instructions to build the app for each platform:

## Prerequisites

1. Install the latest EAS CLI: `npm install -g eas-cli`
2. Log in to your Expo account: `eas login`
3. Configure the project: `eas build:configure`

## Build the App

4. Run a build:
 - [Build for Android Emulator/device or iOS Simulator](https://docs.expo.dev/build/setup/)

- Build for app stores:
  ```
  eas build --platform all
  ```

5. Wait for the build to complete: `eas build:list`


## Deploy the App

6. Deploy the build:
- Distribute your app to an app store:
  - [Submit your app to app stores with EAS Submit](https://docs.expo.dev/submit/introduction/)
- Install and run the app:
  - Visit your build dashboard and click the "Install" button on your build details page.


