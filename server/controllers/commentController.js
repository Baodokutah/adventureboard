const { models } = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

async function createComment(req) {
    cmtOwner = await User.findOne({ token: req.body.token });
    return await Comment.create({
        author: cmtOwner._id,
        content: req.body.content,
    });
}

async function createCommentInPost(req, res) {
    try{
        comment = await createComment(req);
        await Comment.findByIdAndUpdate(comment._id, { origin: comment._id });
        await Post.findByIdAndUpdate(req.body.pid, { $push: { comments: comment._id }});
        res.status(200).json({
            success: true,
            message: 'Send comment success',
            Comment: comment,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        })
    }
}

async function replyComment(req, res) {
    try {
        comment = await createComment(req);
        await Comment.findByIdAndUpdate(comment._id, { origin: req.body.cid });
        await Comment.findByIdAndUpdate(req.body.cid, { $push: { replied: comment._id }});
        res.status(200).json({
            success: true,
            message: 'Send reply success',
            Comment: comment,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        })
    }
}

module.exports = { createCommentInPost, replyComment }