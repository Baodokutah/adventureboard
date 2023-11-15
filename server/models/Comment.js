const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  author: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
    min: 1,
    max: 200,
  },
}, {timestamps: true});

module.exports = mongoose.model("User", CommentSchema);
