require('dotenv').config();
const express = require('express');
const router = express.Router();

// models
const Post = require("../models/Post");
const User = require("../models/User");
const Notification = require("../models/Notification");

//controllers
const userCtl = require('../controllers/userController');

router.get('/:uid', userCtl.getUserPosts);
router.get('/:token', userCtl.getUserInfo);

// testing purpose only
router.get('/', (req, res) => {
    User.find({ name: 'Kao Gia Bỉm' }, {'_id': 0, 'notification': 0}).then((users) => {
        res.status(200).json({
            success: true,
            message: 'Found user with posts',
            User: users,
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: 'Can not find that user',
            error: err.message,
        })
    })
});

module.exports = router;