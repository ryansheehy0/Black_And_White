const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const postSchema = require('./post.js');

const userSchema = new Schema({
  username: {
    type: String,
    maxlength: 64,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [postSchema],
  likedPosts: [Schema.Types.ObjectId],
});

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified or is new
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Method to check if a password is correct using bcrypt compare
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
