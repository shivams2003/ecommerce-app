const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(`sk_test_51OTpQOSDwnmMr1K0BB6Ss6
DiVhEXR7SkvRvRhTdxOYAdjU5YRayKgaLhGOyPRFDi8W4naib3hAt15gxW5wuFiMkp00LLtfxwn8`);
// Setting up the API
// - App config
const app = express();
// - Middleware
app.use(cors({origin: true}));
app.use(express.json());
// - API routes
app.get("/", (request, response) => {
  response.status(200).send("hello world");
});
app.post("/payment/create", async (request, response) => {
  const total = request.query.total;
  //   console.log("Payment request received for amount - ", total);
  // create a paymentIntent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // in subunits of the currency
    currency: "inr",
  });
  // sending a response
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
    amount: paymentIntent.amount,
    timestamp: paymentIntent.created,
  });
});
// - Listen command
exports.api = functions.https.onRequest(app);
