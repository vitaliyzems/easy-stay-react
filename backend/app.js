require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

// const port = 8888;
const app = express();

app.use(express.static('../frontend/build'));

app.use(cookieParser());
app.use(express.json());

app.use('/api', routes);

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  console.log(`Connected to MongoDB`);
});

module.exports.app = (req, res) => {
  app(req, res);
};
