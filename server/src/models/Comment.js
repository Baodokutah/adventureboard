const mongoose  = require("mongoose");

const commentSchema = new mongoose.Schema({
    author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    content: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});

const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;