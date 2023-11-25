const { models, isValidObjectId } = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
const Notification = require("../models/Notification");

async function sendNoti(req, res) {
    try {
        if (!req.body.pid || !isValidObjectId(req.body.pid) || !req.body.token || !req.body.content) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"    
            })
        }
        
        let PostInfo;
        try {
            PostInfo = await Post.findById(req.body.pid, { joined_users: 1, author: 1 });
            if (!PostInfo) {
                return res.status(404).json({
                    success: false,
                    message: 'Post doesn\'t exist!'
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        }

        UserInfo = await User.findOne({ _id: PostInfo.author }, { token: 1 })
        if (UserInfo.token == req.body.token) {
            if (req.body.content == "") {
                return res.status(400).json({
                    success: false,
                    message: "Notification message can't be empty!"
                })
            }
            noti = await Notification.create({
                content: req.body.content,
                post: req.body.pid
            })
            PostInfo.joined_users.forEach(async userID => {
                await User.findByIdAndUpdate(userID, { $push: { notification: noti._id } })
            })
            res.status(200).json({
                success: true,
                message: "Send notification success!"
            })
        }
        else {
            res.status(403).json({
                success: false,
                message: 'Invalid token!'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
};

async function removeNoti(req, res) {
    try {
        if (!req.body.nid || !isValidObjectId(req.body.nid) || !req.body.token) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"    
            })
        }

        let NotiInfo;
        try{
            NotiInfo = await User.findOne({ token: req.body.token, notification: { $in: req.body.nid }}, { notification: 1 })
            if (!NotiInfo)
                return res.status(404).json({
                        success: false,
                        message: 'Notification doesn\'t exist!'
                    });
        } catch (error) {
            console.error(error)
            res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        }

        await User.findOneAndUpdate({ token: req.body.token }, { $pull: { notification: req.body.nid }})
        res.status(200).json({
            success: true,
            message: "Remove notification success!"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
};

module.exports = { sendNoti, removeNoti }