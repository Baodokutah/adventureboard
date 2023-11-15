const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

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
});

UserSchema.plugin(AutoIncrement, { inc_field: 'uid' });

module.exports = mongoose.model("User", UserSchema);
