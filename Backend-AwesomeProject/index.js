const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const path = require("path");
const CryptoJS = require("crypto-js");

/* Env Variables*/
require('dotenv').config()
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const uri = process.env.URI;

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// Authentication
var basicAuth = require('basic-auth');

// Create a middleware function for authentication
function auth(req, res, next) {
  // Get the authorization header
  var authHeader = req.headers.authorization;
  // If the header is missing, send a 401 response
  if (!authHeader) {
    var err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    next(err);
    return;
  }
  // Parse the header using the basic-auth module
  var auth = basicAuth(req);
  // If the header is invalid, send a 401 response
  if (!auth || !auth.name || !auth.pass) {
    var err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    next(err);
    return;
  }
  // Compare the username and password with your own credentials
  if (auth.name == process.env.HTTP_USER && auth.pass == process.env.HTTP_PASSWORD) {
    // If they match, call next() to continue
    next();
  } else {
    // If they don't match, send a 401 response
    var err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    next(err);
  }
}

// Swagger Documentation Setup
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const SWAGGER_OPTIONS = require("./swagger-options.js");
const swaggerDocument = swaggerJsdoc(SWAGGER_OPTIONS);

/**
 * @swagger
 * /api-docs:
 *   get:
 *     summary: Get Swagger docs [HTML Page]
 *     description: Returns the Interactive Swagger documentation for the API. This allows testing all endpoints of the system.
 *     tags:
 *       - Documentation
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Interactive Swagger documentation Page
 *       402:
 *         description: Unauthorized. An HTTP Auth Password and username might be needed.
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const { PricingV2TrunkingCountryInstanceOriginatingCallPrices } = require("twilio/lib/rest/pricing/v2/country");
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
/**
 * @swagger
 * /:
 *   get:
 *     summary: View Budget Requests [HTML Page]
 *     description: Get an HTML page of budgets with the ability to accept or reject them. This route should be used in a browser, not as an API.
 *     tags:
 *       - Data
 *     responses:
 *       200:
 *         description: The HTML page listing budget requests
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       500:
 *         description: Internal server error
 */
app.get("/",auth,(req, res) => {
  const filePath = path.join(__dirname, "data.html");
  res.sendFile(filePath);
});

app.get('/login', (req, res) => {
res.sendFile('login.html', { root: __dirname });
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
  const expenseSchema = new mongoose.Schema({
    code: String,
    name: String,
  });
  const organizationSchema = new mongoose.Schema({
    code: String,
    name: String,
  });

  const projectSchema = new mongoose.Schema({
    code: String,
    name: String,
  });

  const fundSchema = new mongoose.Schema({
    code: String,
    name: String,
  });

  const phoneNumberSchema = new mongoose.Schema({
    code: String,
    name: String,
  });

  const budgetSchema = new mongoose.Schema({
    _id: String,
    number: String,
    user: String,
    organization: String,
    project: String,
    fund: String,
    Expense: String,
    chapter: Number,
    part: Number,
    type: Number,
    item: Number,
    fiscalYearQuarter: String,
    description: String,
    amount: Number,
    isApproved: Boolean,
    expectedPaymentAmount: Number,
    expectedPaymentDate: Date,
    status: String,
  });

  const Organization = mongoose.model("Organization", organizationSchema);
  const Project = mongoose.model("Project", projectSchema);
  const Fund = mongoose.model("Fund", fundSchema);
  const PhoneNumber = mongoose.model("PhoneNumber", phoneNumberSchema);
  const Budget = mongoose.model("Budget", budgetSchema);
  const Expense = mongoose.model("Expense", expenseSchema);
  const expense = [
    { code: "1000", name: "Workers' wages and compensation" },
    { code: "1100", name: "Salaries, wages, etc" },
    { code: "1110", name: "basic salary" },
    { code: "1111", name: "basic salary" },
    { code: "1120", name: "Contractual and temporary salaries and wages" },
    { code: "1123", name: "Contractual and temporary fees" },
    { code: "1130", name: "Bonuses and overtime wages" },
    { code: "1131", name: "Overtime wages" },
    { code: "1132", name: "Rewards" },
    { code: "1140", name: "Allowances" },
    { code: "1141", name: "The nature of the work" },
    { code: "1142", name: "Change appearance" },
    { code: "1143", name: "Country suit" },
    { code: "1144", name: "Housing allowance" },
    { code: "1145", name: "Update allowance" },
    { code: "1150", name: "In-kind advantages" },
    { code: "1200", name: "Social contributions" },
    { code: "1230", name: "Other social contributions" },
    { code: "1231", name: "The government's share of pensions" },
    { code: "1232", name: "The government's share in social insurance" },
    { code: "2000", name: "Expenses on goods, services and property" },
    { code: "2100", name: "Goods and services" },
    { code: "2120", name: "Office supplies" },
    { code: "2121", name: "Stationery and stationery, books and publications" },
    { code: "2130", name: "Telecommunications" },
    { code: "2131", name: "Publishing, advertising, magazines and newspapers" },
    { code: "2132", name: "Post and Communications" },
    { code: "2140", name: "Hospitality" },
    { code: "2141", name: "Conferences, celebrations and hospitality" },
    { code: "2143", name: "Cleaning expenses" },
    { code: "2144", name: "Other expenses" },
    { code: "2150", name: "Public transportation and transfers" },
    { code: "2151", name: "Mission transport" },
    { code: "2152", name: "Internal transfers" },
    { code: "2153", name: "Attending conferences and international transfers" },
    { code: "2160", name: "Leases of productive assets" },
    { code: "2161", name: "Building rent" },
    { code: "2180", name: "Other commodity and service expenses" },
    {
      code: "2181",
      name: "Medicines, medical supplies, raw materials and support",
    },
    { code: "2182", name: "Food and apparel" },
    { code: "2183", name: "Other expenses" },
    { code: "2100", name: "Unallocated expenses" },
    { code: "2200", name: "Maintenance" },
    { code: "2210", name: "Infrastructure maintenance" },
    { code: "2212", name: "Maintenance of public facilities" },
    { code: "2213", name: "Building maintenance and small improvements" },
    { code: "2220", name: "Maintenance of vehicles, equipment and furniture" },
    { code: "2221", name: "Fuels and oils" },
    { code: "2222", name: "Transportation spare parts and maintenance" },
    {
      code: "2223",
      name: "Maintenance and spare parts for machinery, equipment and furniture",
    },
  ];
/*   Expense.insertMany(expense)
    .then(() => {
      console.log("Expenses inserted");
    })
    .catch((err) => {
      console.error(err);
    }); */

  // Insert documents into organizations collection
  const organizations = [
    { code: "E1", name: "Aden University" },
    { code: "E2", name: "Example Organization 2" },
    { code: "E3", name: "Example Organization 3" },
    { code: "E4", name: "Example Organization 4" },
  ];
/*   Organization.insertMany(organizations)
    .then(() => {
      console.log("Organizations inserted");
    })
    .catch((err) => {
      console.error(err);
    }); */

  // Insert documents into projects collection
  const projects = [
    { code: "P1", name: "Employee's Salary" },
    { code: "P2", name: "Example Project 2" },
    { code: "P3", name: "Example Project 3" },
    { code: "P4", name: "Example Project 4" },
  ];
/*   Project.insertMany(projects)
    .then(() => {
      console.log("Projects inserted");
    })
    .catch((err) => {
      console.error(err);
    }); */

  // Insert documents into phonenumbers collection
  const phonenumbers = [
    { code: "+905338852939", name: "Danial" },
    { code: "+77717920281", name: "Zak" },
    { code: "+256776734087", name: "Kanye" },
    { code: "+905338777696", name: "Jyro" },
  ];
/*   PhoneNumber.insertMany(phonenumbers)
    .then(() => {
      console.log("Phone numbers inserted");
    })
    .catch((err) => {
      console.error(err);
    }); */

  // Insert documents into names collection
  const funds = [
    { code: "F1", name: "Salary Fund" },
    { code: "F2", name: "Example Fund 2" },
    { code: "F3", name: "Example Fund 3" },
    { code: "F4", name: "Example Fund 4" },
  ];
/*   Fund.insertMany(funds)
    .then(() => {
      console.log("Funds inserted");
    })
    .catch((err) => {
      console.error(err);
    }); */
});
/* Twilio Credentials */
const accountSid = process.env.TWILIO_ACCOUNTSID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTHTOKEN; // Your Auth Token from www.twilio.com/console
const tclient = require("twilio")(accountSid, authToken);

/**
 * @swagger
 * /budgets:
 *   get:
 *     summary: Get Budget Request with the specified status.
 *     description: This returns pending budgets if no status is specified, and returns budgets matching a particular status if it is submitted
 *     tags:
 *       - Budgets
 *     parameters:
 *       - name: status
 *         in: query
 *         description: "The status of the budgets to retrieve. options are: Approved, Pending, and Rejected."
 *         required: false
 *         schema:
 *           type: string
 *           example: "Approved"
 *     responses:
 *       200:
 *         description: A list of budgets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Budget'
 *       500:
 *         description: Internal server error
 */
app.get("/budgets",auth, async (req, res) => {
  const status = req.query.status || "Pending"; // Default to "Pending" if status is not specified
  const Budget = mongoose.model("Budget");
  try {
    const budgets = await Budget.find({ status });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/**
 * @swagger
 * /collections/{collectionName}/{code}:
 *   delete:
 *     summary: Delete a row from a collection
 *     description: "This route deletes a row from a collection based on the collection name and code. collections include: Project, Organization,PhoneNumber,and Fund, and Expenses. Others can be added."
 *     tags:
 *       - Collections
 *     parameters:
 *       - name: collectionName
 *         in: path
 *         description: "The name of the collection to delete from"
 *         required: true
 *         schema:
 *           type: string
 *           example: "Organization"
 *       - name: code
 *         in: path
 *         description: "The code of the row to delete"
 *         required: true
 *         schema:
 *           type: string
 *           example: "E5"
 *     responses:
 *       200:
 *         description: Row deleted successfully
 *       404:
 *         description: Collection not found
 *       500:
 *         description: Internal server error
 */
app.delete("/collections/:collectionName/:code", async (req, res) => {
  const Project = mongoose.model("Project");
  const Fund = mongoose.model("Fund");
  const Organization = mongoose.model("Organization");
  const PhoneNumber = mongoose.model("PhoneNumber");
  const Expense = mongoose.model("Expense");
  const collectionName = req.params.collectionName;
  const code = req.params.code;
  
  let collection;
  switch (collectionName) {
    case "Organization":
      collection = Organization;
      break;
    case "Project":
      collection = Project;
      break;
    case "Fund":
      collection = Fund;
      break;
    case "PhoneNumber":
      collection = PhoneNumber;
      break;
    case "Expense":
      collection = Expense;
      break;
    default:
      res.status(404).send("Collection not found");
      return;
  }

  try {
    await collection.deleteOne({ code: code });
    res.send("Row deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
    return;
  }
});

/**
 * @swagger
 * /collections/{collectionName}:
 *   post:
 *     summary: Add a document to a collection
 *     description: "This route adds a document to a collection based on the collection name"
 *     tags:
 *       - Collections
 *     parameters:
 *       - name: collectionName
 *         in: path
 *         description: The name of the collection to add to
 *         required: true
 *         schema:
 *           type: string
 *           example: "Organization"
 *     requestBody:
 *       description: The document to add to the collection
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "AB"
 *               name:
 *                 type: string
 *                 example: "Acme Business"
 *     responses:
 *       200:
 *         description: Document added successfully
 *       400:
 *         description: Code must be two characters
 *       404:
 *         description: Collection not found
 *       500:
 *         description: Internal server error
 */
app.post("/collections/:collectionName", async (req, res) => {
  const Project = mongoose.model("Project");
  const Fund = mongoose.model("Fund");
  const Organization = mongoose.model("Organization");
  const PhoneNumber = mongoose.model("PhoneNumber");
  const Expense = mongoose.model("Expense");
  const collectionName = req.params.collectionName;

  let collection;
  switch (collectionName) {
    case "Organization":
      collection = Organization;
      break;
    case "Project":
      collection = Project;
      break;
    case "Fund":
      collection = Fund;
      break;
    case "PhoneNumber":
      collection = PhoneNumber;
      break;
    case "Expense":
      collection = Expense;
      break;
    default:
      res.status(404).send("Collection not found");
      return;
  }

  const code = req.body.code.toUpperCase();
  const name = req.body.name;
/*   if (code.length !== 2) {
    res.status(400).send("Code must be two characters");
    return;
  } */

  try {
    const doc = new collection({ code: code, name: name });
    await doc.save();
    res.send("Document added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
    return;
  }
});

/**
 * @swagger
 * /collections/{collectionName}:
 *   get:
 *     summary: Get all documents in a collection.
 *     description: Collections are the groups of objects in Budgetmate's database. This returns all records in a particular collection.
 *     tags:
 *       - Collections
 *     parameters:
 *       - name: collectionName
 *         in: path
 *         description: The name of the collection to retrieve from. The options include Organization, Project, Fund, PhoneNumber, and Expense
 *         required: true
 *         schema:
 *           type: string
 *           example: "Organization"
 *     responses:
 *       200:
 *         description: A list of documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                     example: "org1"
 *                   name:
 *                     type: string
 *                     example: "Organization 1"
 *       404:
 *         description: Collection not found
 */
app.get("/collections/:collectionName",auth, async (req, res) => {
  const Project = mongoose.model("Project");
  const Fund = mongoose.model("Fund");
  const Organization = mongoose.model("Organization");
  const PhoneNumber = mongoose.model("PhoneNumber");
  const Expense = mongoose.model("Expense");
  const collectionName = req.params.collectionName;
  let collection;
  switch (collectionName) {
    case "Organization":
      collection = Organization;
      break;
    case "Project":
      collection = Project;
      break;
    case "Fund":
      collection = Fund;
      break;
    case "PhoneNumber":
      collection = PhoneNumber;
      break;
    case "Expense":
      collection = Expense;
      break;
    default:
      res.status(404).send("Collection not found");
      return;
  }

  try {
    const docs = await collection.find({}, "code name").lean();
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
    return;
  }
});

/**
 * @swagger
 * /collections:
 *   get:
 *     summary: Get collections
 *     description: Get the collections page
 *     tags:
 *       - Collections
 *     responses:
 *       200:
 *         description: The collections page
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       500:
 *         description: Internal server error
 */
app.get('/collections',auth, (req, res) => {
  res.sendFile(path.join(__dirname, 'collections.html'));
});

/**
 * @swagger
 * /budgets/{id}:
 *   patch:
 *     summary: Update the status of a budget
 *     description: This updates the status of a budget and sends an SMS notification if the status is Approved or Rejected
 *     tags:
 *       - Budgets
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the budget to update
 *         required: true
 *         schema:
 *           type: string
 *           example: "61f7d3c1d7f1a8d8c8e7e2f3"
 *     requestBody:
 *       description: The new status of the budget
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: Approved
 *     responses:
 *       200:
 *         description: The updated budget
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Budget'
 *       404:
 *         description: Budget not found
 *       500:
 *         description: Internal server error
 */
app.patch("/budgets/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const Budget = mongoose.model("Budget");
  console.log('trying to update budget with id: ',id);
  try {
    const budget = await Budget.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    console.log('Finished updating, now trying to send SMS for budget id: ',id);
    // Send SMS if budget is approved or rejected
    if (status === "Approved" || status === "Rejected") {
      const PhoneNumber = mongoose.model("PhoneNumber");

      const statusId = (status === "Approved")? 3:2;
      console.log('the budget object is this: ',budget.user);
      const phone = await PhoneNumber.findOne({ name: budget.user });
      if (phone) {
        console.log('About to send to this no.:', phone);
        // const message = `Your budget for ${budget.description} has been ${status}.`;
        const message = `${id};${statusId} - Enter the code into the app to update the status of the budgetline`;
        //  Serverside enccryption
/*         const key = process.env.ENCRYPT_KEY;
        const encryptedMessage = CryptoJS.AES.encrypt(message, key).toString(); */
        tclient.messages.create({
          to: phone.code,
          from: process.env.TWILIO_NUMBER, // Your Twilio phone number
          body: message,
        });
      }
    }
  } catch (error) {
    console.log('Error Caught on UpdateBudget:',error);
    res.status(500).json({ message: error.message });
    return;
  }
});

/**
 * @swagger
 * /budgetReceive2:
 *   post:
 *     summary: Receive a BudgetRequest, save it, and send SMS confirming receipt.
 *     description: This route receives an encrypted budget request (typically from the SMS Gateway, but can be done with curl) and decrypts it using the server-side encryption key. 
 *     tags:
 *       - Budgets
 *     requestBody:
 *       description: The encrypted SMS message and the number it is from.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               From:
 *                 type: string
 *                 example: "+256776734087"
 *               Body:
 *                 type: string
 *                 example: "U2FsdGVkX1+rEO/vxS9UwAAYyRTRQqQ9Y9I+EIfLUV5U2+K1oPrdN91LC+Lh+ErH4PQ1hC+6brhTmaTQk2lI8nTNyD1PafljEEhgUNnKx5Y="
 *     responses:
 *       200:
 *         description:  the id of the budget request that was sent, and a status code. the status code is usually 1 to indicate that it is pending.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 requestId:
 *                   type: string
 *                   example: "612bc"
 *                 budg:
 *                   type: string
 *                   example: "3"
 *       401:
 *         description: User not found. The number should be registered in the database
 *       500:
 *         description: Internal server error
 */
app.post("/budgetReceive2", async (req, res) => {
  console.log('|');console.log('|');console.log('|');console.log('|');console.log('|');
  const currentTime = new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' });
  console.log(`[${currentTime}] This is a log message.`);
  console.log('\n\n\n New budgetReceive2 Fired:');
  // console.log(req);
  console.log("from number:",req.body.From);
  console.log("encrypted message:",req.body.Body);
  const fromNumber = req.body.From;
  var message;
  // const message = req.body.Body;
  //  Serverside decryption
  try {
    const encryptedMessage = req.body.Body.replace(/^"|"$/g, '');
    const key = process.env.ENCRYPT_KEY;
    message = CryptoJS.AES.decrypt(encryptedMessage, key).toString(CryptoJS.enc.Utf8).replace(/^"|"$/g, '');;
    console.log(`Incoming SMS from ${fromNumber} with message: ${message}`);
} catch (error) {
  console.log('Error while decrypting:',error.message);
  console.log('Full Error:',error);
  res.status(200).send(`Error Decrypting`);
  return;
}

  const Project = mongoose.model("Project");
  const Fund = mongoose.model("Fund");
  const Organization = mongoose.model("Organization");
  const Budget = mongoose.model("Budget");
  const PhoneNumber = mongoose.model("PhoneNumber");
  const Expense = mongoose.model("Expense");
  // Find user by phone number
  const phoneNumber = await PhoneNumber.findOne({ code: fromNumber });
  if (!phoneNumber) {
    console.error(`User with phone number ${fromNumber} not found`);
    res.status(401).send(`User with phone number ${fromNumber} not found`);
    return;
  }
  console.log('phone number found for: ',phoneNumber.name)
  const user = phoneNumber.name;

  //error check
  if (!message) {
    console.log("Error: message is undefined");
    return;
  }
  const [
    requestId,
    budgetLineCode,
    fiscalYearQuarter,
    description,
    amount,
    isApproved,
    expectedPaymentAmount,
    expectedPaymentDate,
  ] = message.split(";");
  console.log(`RequestId: ${requestId}`);

  console.log(`budgetLineCode: ${budgetLineCode}`);

  // Query database for organization, project, and fund names
  const organizationCode = budgetLineCode.substr(0, 2);
  console.log(`organizationCode: ${organizationCode}`);
  
  const projectCode = budgetLineCode.substr(2, 2);
  console.log(`projectCode: ${projectCode}`);
  
  const fundCode = budgetLineCode.substr(4, 2);
  console.log(`fundCode: ${fundCode}`);
  
  const [chapterNum, partNum, typeNum, itemNum] = budgetLineCode
    .slice(6)
    .split("")
    .map((str) => parseInt(str));
  console.log(`chapterNum: ${chapterNum}`);
  console.log(`partNum: ${partNum}`);
  console.log(`typeNum: ${typeNum}`);
  console.log(`itemNum: ${itemNum}`);
  
  const expenses = budgetLineCode.slice(6);
  console.log(`expenses: ${expenses}`);
  
  const expense = await Expense.findOne({ code: expenses });
  console.log(`expense: ${expense}`);
  
  const organization = await Organization.findOne({ code: organizationCode });
  
  if (!organization) {
    console.log('invalid organisation code:',organizationCode)
    res.status(402).send(`Invalid organization code: ${organizationCode}`);
    return;
  }
  console.log(`organization: ${organization}`);
  
  // TODO:
  // Find project with matching code
  const project = await Project.findOne({ code: projectCode });
  
  if (!project) {
    console.log('invalid Project:',project)
    res.status(400).send(`Project with code ${projectCode} not found`);
    return;
  }
  console.log(`project: ${project.name}`);
  
  // Find fund with matching code
  const fund = await Fund.findOne({ code: fundCode });
  
  if (!fund) {
    console.log('invalid Project:',fund)
    res.status(400).send(`Fund with code ${fundCode} not found`);
    return;
  }
  console.log(`fund: ${fund}`);
  
  // const latestBudget = await Budget.findOne().sort({ $natural: -1 });
  // console.log(`latestBudget: ${latestBudget}`);
  
  // const nextId = latestBudget
  //   ? parseInt(latestBudget._id.toString().substr(-5)) + 1
  //   : 1;
  // console.log(`nextId: ${nextId}`);
  console.log('making new budget with id ',requestId);
  try {
    const budget = new Budget({
      // _id: nextId.toString().padStart(5, "0"),
      _id: requestId,
      number: fromNumber,
      user,
      organization: organization.name,
      project: project.name,
      fund: fund.name,
      Expense: expense.name,
      chapter: chapterNum,
      part: partNum,
      type: typeNum,
      item: itemNum,
      fiscalYearQuarter,
      description,
      amount,
      isApproved: isApproved === "Yes",
      expectedPaymentAmount,
      expectedPaymentDate,
      status: "Pending",
    });
    console.log(`budget ${budget} created, trying to save now.`);
 
    await budget.save();
    console.log(`Budget with ID ${budget._id} saved. Trying to Send Text to `,fromNumber);
    const message = `${budget._id};1 - Budgetline received, pending decisions`;
    //  Serverside enccryption
/*     const key = process.env.ENCRYPT_KEY; */
/*     const encryptedMessage = CryptoJS.AES.encrypt(message, key).toString();
    console.log('the encrypted message is',encryptedMessage); */

    tclient.messages.create({
      to: fromNumber,
      from: process.env.TWILIO_NUMBER, // Your Twilio phone number
      body: message,
    });
    // res.status(200).json({ message: `Budget with ID ${budget._id} saved` });
    console.log('done sending text. Budget Saved!');
    res.status(200).json({ message: `${requestId};${1}` });
  } catch (error) {
    console.error('Failed to save or send budget: ',error);
    res.status(500).json({ error: error.message });
    return;
  }

});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port:", process.env.PORT || 3000);
});

