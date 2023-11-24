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
        return res.status(200).json({
            success: true,
            message: 'A list of CTXHposts',
            Posts: CTXHposts,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        })
    }
}

async function getAllGroupPost(req,res){
    try {
        Groupposts = await Post.find(
            { types: 'Group' },
            { title: 1, author: 1, tags: 1, date: 1}
        ).populate({
            path: 'author',
            select: 'name'
        });
        return res.status(200).json({
            success: true,
            message: 'A list of Groupposts',
            Posts: Groupposts,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        })
    }
}

async function getPostById(req, res) {
    try {
        post = await Post.findById(req.params.pid)
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
        
        if(!post)
            return res.status(404).json({
                success: false,
                message: "Post Not Found"    
            })
        
        return res.status(200).json({
            success: true,
            message: 'Got post',
            Post: post,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        })
    }
}

// Post creation and modify
async function createPost(req, res) {
    if (!req.body.type || !req.body.token || !req.body.title)
        return res.status(400).json({
            success: false,
            message: "Bad Request"    
        })
    if (req.body.title == "")
        return res.status(400).json({
            success: false,
            message: "Post title can't be empty"
        })
    if (req.body.type != "CTXH" && req.body.type != "Group")
        return res.status(400).json({
            success: false,
            message: "Invalid Type"
        })
    try {
        postOwner = await User.findOne({ token: req.body.token });
        if(!postOwner)
            return res.status(404).json({
                success: false,
                message: "Invalid Token"    
            })

        post = await Post.create({
            types: req.body.type,
            author: postOwner._id,
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags
        });

        return res.status(200).json({
            success: true,
            message: 'Post successfully created',
            Post: post._id,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        })
    }
}

async function updatePost(req,res) {
    if (!req.body.token || !req.body.title)
        return res.status(400).json({
            success: false,
            message: "Bad Request"    
        })
    if (req.body.title == "")
        return res.status(400).json({
            success: false,
            message: "Post title can't be empty"
        })
    try {
        post = await Post.findById(req.body.pid).populate('author', 'token');
        if(!post)
            return res.status(404).json({
                success: false,
                message: "Post Not Found"    
            })
        if(post.author.token != req.body.token)
            return res.status(401).json({
                success: false,
                message: "Not Post Owner"    
            })

        await Post.findByIdAndUpdate(req.body.pid, {
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags
        })
        return res.status(200).json({
            success: true,
            message: 'Post successfully updated',
            Post: post._id,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        })
    }
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

module.exports = {getAllCTXHPost, getAllGroupPost, getPostById, createPost, updatePost}