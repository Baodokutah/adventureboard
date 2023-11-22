const { models } = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
const Notification = require("../models/Notification");

async function getUserInfo(req, res) {
    try {
        UserInfo = await User.findOne({ token: req.params.token }, {token: 0});
        res.status(200).json({
            success: true,
            message: 'Found user info',
            User: UserInfo,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        })
    }
}

async function getUserPosts(req, res) {
    try {
        UserInfo = await User.findById(req.params.uid, {mail: 0, notification: 0, token: 0});
        UserPosts = await Post.find(
            { author: UserInfo._id },
            {content: 0, joined_users: 0, comments: 0}
        ).populate({
            path: 'author',
            select: 'name'
        });
        res.status(200).json({
            success: true,
            message: 'Found user with posts',
            User: UserInfo,
            Posts: UserPosts,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
}

module.exports = { getUserPosts, getUserInfo }