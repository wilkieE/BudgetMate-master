# BudgetMate Backend

BudgetMate Backend Server for Yemen's MoF System. This uses a MongoDB backend and can communicate with an SMS Gateway to receive and send out messages. It has been built and tested with twilio, but it can be switched out for any other gateway.

It is an express app that receives encrypted budget requests (typically from an SMS gateway) and decrypts them using a server-side encryption key. It also allows for the creation and retrieval of budget, organization, project, and fund data. This app uses mongoose to interact with a MongoDB database.

## Requirements
- [Node.js](https://nodejs.org/en/) version 14 or higher.
- [MongoDB](https://www.mongodb.com/) instance: You will need a MongoDB instance to connect to. You can sign up for a free MongoDB Atlas account and create a new cluster. Once your cluster is created, you can find the connection URL in the "Connect" section. Be sure to whitelist your IP address or allow connections from anywhere (0.0.0.0) in your cluster settings.
- [Twilio](https://twilio.com) account with SMS Enabled - Optional: This is the gateway used to send out reminders, but it can be ignored if reminders are not being sent out, or swapped for another gateway. 
If you decide to use twilio, you will need to create a free Twilio account and obtain your Account SID and Auth Token from the Twilio Console. You will also need to purchase a phone number from Twilio and set it as the value for `TWILIO_PHONENUMBER` in your .env file.
- AES Encryption Key. This can be any random key, and needs to be the same as what is used in the front end of the app. This will also go into the .env file.

## Setup
1. Download and Unzip or Clone the Hackathon repository to your chosen environment.

    ````
    git clone https://github.com/Hackathonypmf/Hackathon.git
    cd Hackathon
    ````
2. Install NodeJS dependencies by running npm install:
    ````
    npm install
    ````
3. Copy the .env.sample file to .env and fill in the values needed:
    ```
    USERNAME = ''
    PASSWORD = ''
    URI = ''

    # Twilio details
    TWILIO_ACCOUNTSID = ""
    TWILIO_AUTHTOKEN = ""
    TWILIO_NUMBER = ""

    #HTTP AUTH Credentials. used by basic-auth. Fill in any values you would like to use
    HTTP_USER = ""
    HTTP_PASSWORD = ""

    #ENCRYPTION KEY FOR AES ENCRYPTION> SHOULD BE THE SAME AS FRONT END
    ENCRYPT_KEY = ""`
    ```
4. Start the server by running `npm start`
5. If it is running well, then the terminal should show what port it has connected to, and a message saying it has connected to MongoDB:
    ```
    Server started on port: 3000
    Connected to MongoDB
    ```
6. If the message saying `Connected to MongoDB` is not shown, check the connection to the database and the database credentials to make sure it is up and running.

## Usage

Once the server is running, full documentation of all api routes can be accessed at `/api-docs`. It contains an interactive Swagger UI page that lists all endpoints, mentions what paramters they accept, and has example inputs and outputs.

it also contains response codes and allows use of many features.

you can also access the dashboard by visiting the home route (`/`). This displays a table incoming budget requests, with options to approve and reject them. Further details can be accessed at `/api-docs`, or on our currently live implementation at [https://hackathon-backend-production-d077.up.railway.app/api-docs](https://hackathon-backend-production-d077.up.railway.app/api-docs) 
