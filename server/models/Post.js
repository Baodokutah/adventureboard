const mongoose  = require("mongoose");
const Int32 = require("mongoose-int32").loadType(mongoose);

const PostSchema = new mongoose.Schema({
    types: {
        type: String,
        enum: ['CTXH', 'Group'],
        required: true,
    },
    title: {
        type: String,
        required: true,
        min: 1,
        max: 100,
    },
    content: {
        type: String,
        required: true,
        min: 1,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    tags: {
        type: [String],
    },
    joined_users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    maxuser: {
        type: Int32,
        required: true,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        min: 1
    }],
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
});

module.exports = mongoose.model('Post', PostSchema);