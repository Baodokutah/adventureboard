require('dotenv').config();
const express = require('express');
const router = express.Router();

// models
const Post = require("../models/Post");
const User = require("../models/User");
const Notification = require("../models/Notification");

//controllers
const userCtl = require('../controllers/userController');
const notiCtl = require('../controllers/notiController');

router.post('/send', notiCtl.sendNoti);
router.post('/remove', notiCtl.removeNoti);

module.exports = router;