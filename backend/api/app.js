const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('../routes');

require('dotenv').config();

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/api', routes);

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  console.log(`Connected to MongoDB`);
});

module.exports = (req, res) => {
  app(req, res);
};
