require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const path = require('path');

const port = 8888;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
//   app.listen(port, () => {
//     console.log(`Server started on port ${port}`);
//   });
// });

// mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
//   console.log(`Connected to MongoDB`);
// });

// module.exports = app;

const startApp = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);

    if (process.env.NODE_ENV === 'production') {
      console.log(`Connected to MongoDB`);
    } else {
      app.listen(port, () => {
        console.log(`Server started on port ${port}`);
      });
    }
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
};

console.log(process.env.NODE_ENV);

startApp();
