const mongoose  = require("mongoose");

const postSchema = new mongoose.Schema({
    type: String,
    tittle: String,
    content: String,
    author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    tags: [String],
    joined_users:{users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }], quantity: {type:Number,default:0}}, // Same shit
    comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }],
    created_at: {type: Date, default: Date.now},
    max_quantity: {type:Number,default:0}, // Hiện tại chưa chạy được
});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;