const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./Models/transaction.js');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/backend/test', (req, res) => {
    res.json('test ok');
});

app.post('/backend/transaction', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const {name, description, datetime} = res.body;
    const transaction = await Transaction.create({name, description, datetime, price})
    res.json(transaction);
});

app.get('/backend/transactions', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions);
})

app.listen(4040, () => { // something here is messed up
    console.log('Server is running on http://localhost:4040');
});

