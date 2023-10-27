const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URL , { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });
