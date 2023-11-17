const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 50,
    },
    mail: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    avatar: {
        type: String,
        default: "https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg"
    },
    token: {
        type: String,
        required: true,
    },
    notification: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification',
    }],
});

module.exports = mongoose.model("User", UserSchema);
