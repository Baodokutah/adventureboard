const mongoose  = require("mongoose");

const notificationSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
});

module.exports = mongoose.model('Notification', notificationSchema);