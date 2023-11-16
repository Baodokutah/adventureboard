const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    mail: String,
    name: String,
    avatar: String,
    notification: {
        notificationId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Notification',
        }},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});

const User = mongoose.model('User',userSchema);
module.exports = User;