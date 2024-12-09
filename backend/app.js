require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const path = require('path');

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/api', routes);

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  console.log(`Connected to MongoDB`);
});

module.exports = app;
