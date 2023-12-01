const { models, isValidObjectId } = require("mongoose");
const Int32 = require("mongoose-int32").loadType(mongoose);
const Post = require("../models/Post");
const User = require("../models/User");
const Notification = require("../models/Notification");
const Comment = require("../models/Comment");

// Post query
async function getAllCTXHPost(req,res){
    try {
        CTXHposts = await Post.find(
            { types: 'CTXH' },
            { title: 1, author: 1, tags: 1, date: 1},
            { sort: {date: -1}}
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
            { title: 1, author: 1, tags: 1, date: 1},
            { sort: {date: -1}}
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

async function getPostFromSearch(req, res) {
    if (req.params.type != "CTXH" && req.params.type != "Group")
        return res.status(400).json({
            success: false,
            message: "Invalid Type"
        });
        try {
            keywords = (req.body.keyword ? req.body.keyword : "");
            tag = (Array.isArray(req.body.tags) ? req.body.tags : []);
            posts = await Post.find(
                {
                    types: req.params.type,
                    tags: { $all: tag },
                    title: { $regex: keywords, $options: 'i' }
                },
                { title: 1, author: 1, tags: 1, date: 1}
            ).populate({
                path: 'author',
                select: 'name'
            });
            return res.status(200).json({
                success: true,
                message: 'A list of Searched posts',
                Posts: posts,
                tags: tag,
                keyword: keywords
            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: err.message,
            })
        }
}

// Post creation and modify
async function createPost(req, res) {
    if (!req.body.type || !req.body.token || !req.body.title || !req.body.maxuser)
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
    if (req.body.maxuser < 1)
        return res.status(400).json({
            success: false,
            message: "Invalid Number of Allowed Users"
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
            content: (req.body.content)? req.body.content : "",
            tags: (req.body.tags)? req.body.tags : [],
            maxuser: req.body.maxuser,
            joined_users: (req.body.type == 'Group')? [postOwner._id]:[]
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
            content: (req.body.content)? req.body.content : "",
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
async function deletePost(req, res) {
    try {
        if(!req.body.pid || !req.body.token)
        return res.status(404).json({success:false,message:'Bad request'
        })
        let postInfo;
        let userInfo;
        try {
            postInfo = await Post.findById(req.body.pid)
        } catch (error) {
            return res.status(500).json({success:false,message:'Post does not exist'})
        }

        try {
            userInfo = await User.findOne({token: req.body.token})
        } catch (error) {
            return res.status(500).json({success:false,message:'User does not exist'})
        }
        console.log(userInfo)
        console.log(postInfo)
        if(userInfo._id.toString != postInfo.author._id.toString){
            return res.status(404).json({success:false,message: 'This is not user\'s Post'})
        }

        try {
            await Comment.findByIdAndDelete({ $in: postInfo.comments })
        } catch (error) {
            return res.status(500).json({success:false,message:'Remove comment failed'})
        }

        try {
            await Post.findByIdAndDelete(req.body.pid)
        } catch (error) {
            return res.status(500).json({success:false,message: 'Delete post failed'})
        }

        return res.status(200).json({success:true,message: 'Successfully deleted post'})

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
};

// Join post
async function joinPost(req, res) {
    try {
        if (!req.body.pid || !isValidObjectId(req.body.pid) || !req.body.token) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"    
            })
        }
        
        let PostInfo;
        try {
            PostInfo = await Post.findById(req.body.pid, { joined_users: 1, author: 1, maxuser: 1 });
            if (!PostInfo) {
                return res.status(404).json({
                    success: false,
                    message: 'Post doesn\'t exist!'
                });
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        let UserInfo;
        try{
            UserInfo = await User.findOne({ token: req.body.token }, { _id: 1 })
            if (!UserInfo) {
                return res.status(403).json({
                    success: false,
                    message: 'Invalid token!'
                });
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (PostInfo.joined_users.includes( UserInfo._id )) {
            return res.status(400).json({
                success: false,
                message: 'You have joined this post'
            })
        }
        else if (PostInfo.joined_users.length == PostInfo.maxuser) {
            return res.status(400).json({
                success: false,
                message: 'Member limit exceed!'
            })
        }
        else {
            await Post.findByIdAndUpdate(req.body.pid, { $push: { joined_users: UserInfo._id } })
            user_join = await User.findById(UserInfo._id, { name: 1 })
            noti = await Notification.create({
                success: true,
                content: `User ${user_join.name} have joined your post!`,
                post: req.body.pid
            })
            await User.findByIdAndUpdate(PostInfo.author, { $push: { notification: noti } })
            return res.status(200).json({
                success: true,
                message: "Join post success!"
            })
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
};

// Remove member
async function removeMem(req, res) {
    try {
        if (!req.body.pid || !isValidObjectId(req.body.pid) || !req.body.token || !req.body.uid || !isValidObjectId(req.body.uid)) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"    
            })
        }

        let PostInfo;
        try {
            PostInfo = await Post.findById(req.body.pid, { joined_users: 1, author: 1 });
            if (!PostInfo)
                return res.status(404).json({
                    success: false,
                    message: 'Post doesn\'t exist!'
                });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        let UserInfo;
        try {
            UserInfo = await User.findOne({ token: req.body.token }, { _id: 1, name: 1 });
            if (!UserInfo)
                return res.status(404).json({
                    success: false,
                    message: 'Invalid token!'
                });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
        
        if (UserInfo._id == req.body.uid) {
            if (!PostInfo.joined_users.includes( req.body.uid )) {
                return res.status(404).json({
                    success: false,
                    message: 'You haven\'t joined this post yet!'
                })
            }
            else {
                await Post.findByIdAndUpdate(req.body.pid, { $pull: { joined_users: req.body.uid }})
                noti = await Notification.create({
                    success: true,
                    content: "Bạn đã rời khỏi nhóm!",
                    post: req.body.pid
                })
                await User.findByIdAndUpdate(req.body.uid, { $push: { notification: noti._id }})
                return res.status(200).json({
                    success: true,
                    message: "Leave post success!"
                })
            }
        }
        else if (UserInfo._id.toString() != PostInfo.author.toString() ) {
            return res.status(403).json({
                success: false,
                message: "Forbidden"
            })
        }
        else {
            if (!PostInfo.joined_users.includes( req.body.uid )) {
                return res.status(404).json({
                    success: false,
                    message: 'Member doesn\'t exist!'
                })
            }
            else {
                await Post.findByIdAndUpdate(req.body.pid, { $pull: { joined_users: req.body.uid }})
                noti = await Notification.create({
                    success: true,
                    content: `${UserInfo.name} đã xóa bạn khỏi nhóm của họ`,
                    post: req.body.pid
                })

                await User.findByIdAndUpdate(req.body.uid, { $push: { notification: noti._id }})
                return res.status(200).json({
                    success: true,
                    message: "Remove member success!"
                })
            }
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
};

module.exports = { getAllCTXHPost, getAllGroupPost, getPostById, getPostFromSearch, createPost, updatePost, deletePost, joinPost, removeMem }