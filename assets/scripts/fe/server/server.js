// -------------------------------
// Import Node Modules
// -------------------------------

require("dotenv").config();
const cors = require("cors");
const Pusher = require("pusher");
const express = require("express");
const bodyParser = require("body-parser");
const multipart = require("connect-multiparty");

// ------------------------------
// Create express app
// ------------------------------

const app = express();

// ------------------------------
// Load the middlewares
// ------------------------------

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ------------------------------
// Load Middlewares
// ------------------------------

const multipartMiddleware = multipart();

// -------------------------------
// Create Pusher Client
// -------------------------------

const pusher = new Pusher({
    appId: `${process.env.PUSHER_APP_ID}`,
    key: `${process.env.PUSHER_API_KEY}`,
    secret: `${process.env.PUSHER_API_SECRET}`,
    cluster: `${process.env.PUSHER_APP_CLUSTER}`,
    encrypted: true
});

// -------------------------------
// Assign port
// -------------------------------

app.listen("3120");
console.log("Listening on localhost:3120");