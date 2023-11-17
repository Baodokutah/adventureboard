const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
        min: 1,
        max: 200,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    origin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    },
    replied: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }]
}, {timestamps: true});

module.exports = mongoose.model("Comment", CommentSchema);