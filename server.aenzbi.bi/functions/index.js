const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// Example environment variable (JWT secret)
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

// Authentication Endpoint
app.post("/auth/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "password") {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } else {
        res.status(401).send("Invalid credentials");
    }
});

// Sales Endpoint
app.post("/sales", (req, res) => {
    res.send("Sales transaction recorded");
});

// Product Endpoint
app.get("/products", (req, res) => {
    res.json([{ id: 1, name: "Product A" }, { id: 2, name: "Product B" }]);
});

// Export Express App as Cloud Function
exports.api = functions.https.onRequest(app);
