require('dotenv').config()
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Successfully connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});



router.get('/', async(req, res) => {
  res.send('Welcome to users route');
  const users = await User.find();
  res.json(users);
});


module.exports = router;
