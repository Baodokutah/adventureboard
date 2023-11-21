require('dotenv').config();
const express = require('express');
const router = express.Router();

// models
const Post = require("../models/Post");
const User = require("../models/User");
const Notification = require("../models/Notification");

//controllers
const userCtl = require('../controllers/userController');
const commentCtl = require('../controllers/commentController');

router.post('/create', commentCtl.createCommentInPost);
router.post('/reply', commentCtl.replyComment);

module.exports = router;