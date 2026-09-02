const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to MyDuka M-Pesa API</h1>");
});

// Middleware to generate OAuth token
const generateToken = async (req, res, next) => {
  try {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;

    console.log("Consumer Key:", consumerKey);
    console.log("Consumer Secret exists:", !!consumerSecret);
    console.log("CALLBACK URL:", process.env.MPESA_CALLBACK_URL);

    const auth = Buffer.from(
      `${consumerKey}:${consumerSecret}`
    ).toString("base64");

    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    console.log("Access Token Response:", response.data);

    req.accessToken = response.data.access_token;
    next();
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      error: "Failed to generate access token",
    });
  }
};

// Test token route
app.get("/token", generateToken, (req, res) => {
  res.json({
    access_token: req.accessToken,
  });
});

// STK Push route
app.post("/api/stk", generateToken, async (req, res) => {
  try {
    const phone = `254${req.body.phone.substring(1)}`;
    const amount = req.body.amount;

    // Generate timestamp (YYYYMMDDHHmmss)
    const date = new Date();

    const timestamp =
      date.getFullYear().toString() +
      String(date.getMonth() + 1).padStart(2, "0") +
      String(date.getDate()).padStart(2, "0") +
      String(date.getHours()).padStart(2, "0") +
      String(date.getMinutes()).padStart(2, "0") +
      String(date.getSeconds()).padStart(2, "0");

    // Sandbox credentials
    const shortCode = process.env.MPESA_PAYBILL;
    const passkey = process.env.MPESA_PASSKEY;

    const password = Buffer.from(
      shortCode + passkey + timestamp
    ).toString("base64");

    console.log({
      BusinessShortCode: shortCode,
      Timestamp: timestamp,
      PhoneNumber: phone,
    });
    console.log("STK CONFIG:", {
     shortCode,
     passkeyExists: !!passkey,
     passkeyLength: passkey?.length,
    timestamp,
    callbackURL: process.env.MPESA_CALLBACK_URL
     });
    
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: shortCode,
        PhoneNumber: phone,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: "MYDUKA",
        TransactionDesc: "Inventory Payment",
      },
      {
        headers: {
          Authorization: `Bearer ${req.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(400).json({
      error: "Failed to initiate STK Push",
      details: error.response?.data || error.message,
    });
  }
});

// Callback route
app.post("/api/callback", async (req, res) => {
    
    await axios.post(
        "http://localhost:5000/payments/callback",
        req.body
    );

  console.log("M-Pesa Callback:");
  console.log(JSON.stringify(req.body, null, 2));

  res.json({
    ResultCode: 0,
    ResultDesc: "Accepted",
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
