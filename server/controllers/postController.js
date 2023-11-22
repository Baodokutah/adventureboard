const { models } = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

// Post query
async function getAllCTXHPost(req,res){
    try {
        CTXHposts = await Post.find(
            { types: 'CTXH' },
            { title: 1, author: 1, tags: 1, date: 1}
        ).populate({
            path: 'author',
            select: 'name'
        });
        res.status(200).json({
            success: true,
            message: 'A list of CTXHposts',
            Posts: CTXHposts,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        })
    }
}

async function getAllGroupPost(req,res){
    try {
        CTXHposts = await Post.find(
            { types: 'Group' },
            { title: 1, author: 1, tags: 1, date: 1}
        ).populate({
            path: 'author',
            select: 'name'
        });
        res.status(200).json({
            success: true,
            message: 'A list of Groupposts',
            Posts: CTXHposts,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        })
    }
}

async function getPostById(req, res) {
    try {
        posts = await Post.findById(req.params.pid)
        .populate({
            path: 'author',
            select: '-token' 
        }).populate({
            path: 'joined_users',
            select: '-token'
        }).populate({
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
}

// Post creation and modify
async function createPost(req, res) {
    try {
        postOwner = await User.findOne({ token: req.body.token });
        post = await Post.create({
            types: req.body.type,
            author: postOwner._id,
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags
        });

        res.status(200).json({
            success: true,
            message: 'Post successfully created',
            Post: post._id,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        })
    }
}

// // http method: PUT
function updatePost(req,res) {
    Post.findByIdAndUpdate(req.params.id,req.body, {new:true})
        .then((post) => {
            if(!post){
                return res.status(404).json({success:false,message:'Can not find service', updatePost: post});
            }
            res.status(200).json({success:true,message:'Post has been updated',})
        })
        .catch((err) => {
            res.status(500).json({success:false,message:'Error updating Service',})
        })
}
// // http method: DELETE
function deletePost(req, res) {
    Post.findByIdAndDelete(req.params.id)
        .then((post) =>{
            if(!post){
                return res.status(404).json({success:false,message:'Post not found',ServiceId:service});
            }
            res.status(204).json({success:true,message:'Post have been deleted',})
        })
        .catch((err) => {
            res.status(500).json({success:false,message:'Post error',err:err.message});
        })
}

module.exports = {getAllCTXHPost, getAllGroupPost, getPostById, createPost}