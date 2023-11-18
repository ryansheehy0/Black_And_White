const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const Post = require('./post');

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
    set: async function (password) {
        const saltRounds = 10;
      return await bcrypt.hash(password, saltRounds);
    },
  },
  
});

// Need a method that sees if a password is correct (use bcrypt compare)posts: [Post],
  //likedPosts: [Schema.Types.ObjectId],

const User = mongoose.model('User', userSchema);

module.exports = User;