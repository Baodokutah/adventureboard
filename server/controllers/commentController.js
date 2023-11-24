const { models } = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

async function createComment(req) {
    cmtOwner = await User.findOne({ token: req.body.token });
    if (!cmtOwner) return null;
    return await Comment.create({
        author: cmtOwner._id,
        content: req.body.content,
    });
}

async function createCommentInPost(req, res) {
    if (!req.body.token || !req.body.content || !req.body.pid)
        return res.status(400).json({
            success: false,
            message: "Bad Request"    
        })
    if (req.body.content == "")
        return res.status(400).json({
            success: false,
            message: "Comment can't be empty"
        })
    try{
        comment = await createComment(req);
        if(!comment)
            return res.status(400).json({
                success: false,
                message: "Invalid Token"    
            })
        await Comment.findByIdAndUpdate(comment._id, { origin: comment._id });
        await Post.findByIdAndUpdate(req.body.pid, { $push: { comments: comment._id }});
        return res.status(200).json({
            success: true,
            message: 'Send comment success',
            Comment: comment,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        })
    }
}

async function replyComment(req, res) {
    if (!req.body.token || !req.body.content || !req.body.cid)
        return res.status(400).json({
            success: false,
            message: "Bad Request"    
        })
    if (req.body.content == "")
        return res.status(400).json({
            success: false,
            message: "Reply can't be empty"
        })
    try {
        comment = await createComment(req);
        if(!comment)
            return res.status(400).json({
                success: false,
                message: "Invalid Token"    
            })
        await Comment.findByIdAndUpdate(comment._id, { origin: req.body.cid });
        await Comment.findByIdAndUpdate(req.body.cid, { $push: { replied: comment._id }});
        return res.status(200).json({
            success: true,
            message: 'Send reply success',
            Comment: comment,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        })
    }
}

module.exports = { createCommentInPost, replyComment }