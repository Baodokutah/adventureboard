const mongoose  = require("mongoose");

const notificationSchema = new mongoose.Schema({
    post: {
        postId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        }},
    // tittle: String,
    content: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});

const Notification = mongoose.model('Notification',notificationSchema);
module.exports = Notification;