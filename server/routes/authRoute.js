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

router.post('/', async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'User created',
            ID: req.body.Customer,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        })
    }
});

router.get('/post/:pid', async (req, res) => {
    try {
        posts = await Post.findById(req.params.pid)
        .populate({ path: 'author', select: '-token' })
        .populate({
            path: 'joined_users', select: '-token'
        })
        .populate({
            path: 'comments',
            populate: [
                { path: 'author', select: '-token' }, 
                { path: 'replied', populate: { path: 'author', select: '-token' } }
            ]
        })
        
        res.status(200).json({
            success: true,
            message: 'Got post',
            Post: posts,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        })
    }
})

module.exports = router;
