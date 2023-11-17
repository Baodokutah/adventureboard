require('dotenv').config();
const express = require('express');
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Notification = require("../models/Notification");

router.get('/', async (req, res) => {
    try {
        user = await User.create({
            name: "Kao Gia Bỉm",
            mail: "kaogiabim@gmail.com",
            avatar: "xyz.abcd",
            token: "bruh"
        });
        await Post.create({
            types: 'CTXH',
            title: 'ABCD',
            content: 'xyz\nefgh',
            author: user._id
        });
        res.status(200).json({
            success: true,
            message: 'User created',
            User: user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        })
    }
});

module.exports = router;
