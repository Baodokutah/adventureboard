const { models, isValidObjectId } = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
const Notification = require("../models/Notification");
const Comment = require("../models/Comment");

function getAllCTXHPost(req,res){
    Post.find({ type: 'CTXH' }).populate('author').then(
        (CTXHposts) => {
            res.status(200).json({
                success: true,
                message: 'A list of CTXHposts',
                Post: CTXHposts,
            })
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Server error.Please try again',
                error: error.message,
            })
})
}

function getAllBTLPost(req,res){
    Post.find({ type: 'Group' }).populate('author').then(
        (CTXHposts) => {
            res.status(200).json({
                success: true,
                message: 'A list of CTXHposts',
                Post: CTXHposts,
            })
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Server error.Please try again',
                error: error.message,
            })
})
}
// // http method: GET
function getPostById(req, res) {
    Post.findById(req.params.id)
        .populate('author')
        .populate('joined_users.users')
        .populate({ 
            path: 'comments',
            populate: {
                path: 'author'
            }
          })
        .then((post)=>{
            if(!post){
                return res.status(404).json({message: 'No post found', postId: req.params.postId});
            }
            res.status(200).json({
                success: true,
                message: 'Post found',
                Services: post
            })
        })
        .catch((error)=>{
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
            })
        })
}


// // http method: POST
function createPost(req,res) {
    const newPost = new Post(req.body);
    newPost.save()
        .then((savedPost)=> {
            res.status(201).json({
                success: true,
                message: 'Post have been created',
                newPost: savedPost
            })
        })
        .catch((err)=> {
            res.status(500).json({
                success: false,
                message: 'Can not create Post',
            })
        })
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

module.exports = {getAllCTXHPost, getAllGroupPost, getPostById, createPost, updatePost, deletePost}