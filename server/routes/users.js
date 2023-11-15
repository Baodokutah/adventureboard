require('dotenv').config()
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async(req, res) => {
  const users = await User.aggregate([
    {
      $match: {
        name: "Kao Gia Bỉm"
      }
    },
    {
      $project: {
        _id: 0,
        __v: 0
      }
    }
  ]);
  if (users) {
    res.json(users);
  }
  else {
    res.send("Not finding any user.")
  }
});


module.exports = router;
