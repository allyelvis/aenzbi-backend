const functions = require("functions");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const JWT_SECRET = functions.config().jwt.secret || "default_secret_key";

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.post("/auth/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "password") {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
        return res.json({ token });
    }
    res.status(401).json({ error: "Invalid credentials" });
});

app.post("/sales", authenticateToken, (req, res) => {
    const { product_id, quantity } = req.body;
    if (!product_id || !quantity) {
        return res.status(400).json({ error: "Missing product or quantity" });
    }
    res.json({ message: "Sales transaction recorded", product_id, quantity });
});

app.get("/products", (req, res) => {
    res.json([{ id: 1, name: "Product A" }, { id: 2, name: "Product B" }]);
});

app.get("/users/me", authenticateToken, (req, res) => {
    res.json({ user: req.user });
});

app.get("/", (req, res) => {
    res.send("AENZBi Backend is running...");
});

exports.api = functions.https.onRequest(app);
