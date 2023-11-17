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
    default: ""
  },
  notification: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification',
  }]
});

module.exports = mongoose.model("User", UserSchema);
