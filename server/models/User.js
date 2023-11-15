const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
// Initialize the auto-increment plugin
autoIncrement.initialize(db);

const UserSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    min: 3,
    max: 50,
    unique: true
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
});

UserSchema.plugin(autoIncrement.plugin, 'User');

module.exports = mongoose.model("User", UserSchema);
