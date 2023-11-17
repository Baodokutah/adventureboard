require('dotenv').config()
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    await User.create(
      {
        name: "Kao Gia Bỉm",
        mail: "kaogiabim@gmail.com",
        avatar: "xyz.abcd"
      }
    );
    await User.create(
      {
        mail: "meomaybe@gmail.com",
        name: "Mẹo Mày Bé",
        avatar: "abcd.xyz"
      }
    );
    res.send("Add data success!");
  } catch (err) {
    res.send("Error: " + err);
  }
});

module.exports = router;
