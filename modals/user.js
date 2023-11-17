const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    maxlength: 64,
    unique: true,
    required: true,
  },
  encryptedPassword: {
    type: String,
    maxlength: 255,
    required: true,
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  likedPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
