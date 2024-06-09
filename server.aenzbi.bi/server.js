const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const { Client } = require('pg');
const mongoose = require('mongoose');
const paypal = require('paypal-rest-sdk');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'https://aenzbi-app.vercel.app', // Allow requests only from your Vercel app
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const secretKey = 'YOUR_SECRET_KEY';

// MySQL setup
const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'aenzbi_db'
});

mysqlConnection.connect(err => {
  if (err) throw err;
  console.log('MySQL connected');
});

// PostgreSQL setup
const pgClient = new Client({
  user: 'your_pg_user',
  host: 'localhost',
  database: 'aenzbi_db',
  password: 'your_pg_password',
  port: 5432,
});

pgClient.connect(err => {
  if (err) throw err;
  console.log('PostgreSQL connected');
});

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/aenzbi_db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// PayPal setup
paypal.configure({
  'mode': 'sandbox', // sandbox or live
  'client_id': 'YOUR_PAYPAL_CLIENT_ID',
  'client_secret': 'YOUR_PAYPAL_CLIENT_SECRET'
});

// Dummy data and modules
const sales = [];
const stocks = [];
const products = [];
const users = [];
const properties = [];
const reports = [];
const payments = [];
const tables = [];
const accounting = [];
const hotelManagement = [];

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    req.userId = decoded.id;
    next();
  });
};

// Authentication Endpoint
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  // Authenticate user (dummy authentication)
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: 86400 });
    res.status(200).send({ auth: true, token: token });
  } else {
    res.status(401).send({ auth: false, token: null });
  }
});

// Sales Endpoint
app.post('/sales', verifyToken, (req, res) => {
  sales.push(req.body);
  res.status(200).send({ message: 'Sale recorded' });
});

// Stock Endpoint
app.post('/stocks', verifyToken, (req, res) => {
  stocks.push(req.body);
  res.status(200).send({ message: 'Stock movement recorded' });
});

// Product Endpoint
app.post('/products', verifyToken, (req, res) => {
  products.push(req.body);
  res.status(200).send({ message: 'Product added' });
});

// User Management Endpoint
app.post('/users', verifyToken, (req, res) => {
  users.push(req.body);
  res.status(200).send({ message: 'User added' });
});

// Property Configuration Endpoint
app.post('/properties', verifyToken, (req, res) => {
  properties.push(req.body);
  res.status(200).send({ message: 'Property configured' });
});

// Report Endpoint
app.post('/reports', verifyToken, (req, res) => {
  reports.push(req.body);
  res.status(200).send({ message: 'Report generated' });
});

// Payment Mode Endpoint
app.post('/payments', verifyToken, (req, res) => {
  payments.push(req.body);
  res.status(200).send({ message: 'Payment recorded' });
});

// Restaurant Table Management Endpoint
app.post('/tables', verifyToken, (req, res) => {
  tables.push(req.body);
  res.status(200).send({ message: 'Table added/updated' });
});

// Accounting Endpoint
app.post('/accounting', verifyToken, (req, res) => {
  accounting.push(req.body);
  res.status(200).send({ message: 'Accounting record added' });
});

// Hotel Management Endpoint
app.post('/hotel', verifyToken, (req, res) => {
  hotelManagement.push(req.body);
  res.status(200).send({ message: 'Hotel management record added' });
});

// Replication Endpoint
app.post('/replication', verifyToken, (req, res) => {
  // Replicate data (dummy implementation)
  res.status(200).send({ message: 'Data replicated' });
});

// Fiscalization Transaction Endpoint
app.post('/fiscalize', verifyToken, (req, res) => {
  // Handle fiscalization transaction (dummy implementation)
  res.status(200).send({ message: 'Fiscalization transaction recorded' });
});

// PayPal Payment Endpoint
app.post('/pay/paypal', verifyToken, (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "https://aenzbi-app.vercel.app/success",
        "cancel_url": "https://aenzbi-app.vercel.app/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "item",
                "sku": "item",
                "price": "1.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "1.00"
        },
        "description": "This is the payment description."
    }]
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.json({ forwardLink: payment.links[i].href });
        }
      }
    }
  });
});

// Credit Card Payment Endpoint
app.post('/pay/creditcard', verifyToken, async (req, res) => {
  const { token, amount } = req.body;
  try {
    const charge = await stripe.charges.create({
      amount: amount,
      currency: 'usd',
      source: token,
      description: 'Example charge',
    });
    res.status(200).send({ success: true, charge });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

// Data Endpoint
app.get('/api/data', verifyToken, (req, res) => {
  res.json({ message: 'This is the data from the server' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
