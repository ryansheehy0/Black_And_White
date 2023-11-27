const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Post = require('./post')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    maxLength: 64,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts:[{
    type: Schema.Types.ObjectId,
    ref: "Post"
  }],
  likedPosts: [{
    type:Schema.Types.ObjectId,
    ref: "Post",
  }]
})

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  // Update expires field for each post
  await Promise.all(this.posts.map(async (postId) => {
    const post = await Post.findById(postId);
    if (post && !post.expires) {
      post.expires = new Date(post.datePosted.getTime() + post.timeLimit);
      await post.save();
    }
  }));

  next();
});

// Function to remove expired posts from user's posts and likedPosts
userSchema.methods.removeExpiredPosts = async function () {
  const currentTime = new Date();
  
  // Remove expired posts from user's posts
  this.posts = this.posts.filter(postId => {
    const post = Post.findById(postId);
    return post && post.expires > currentTime;
  });

  // Remove expired posts from user's likedPosts
  this.likedPosts = this.likedPosts.filter(postId => {
    const post = Post.findById(postId);
    return post && post.expires > currentTime;
  });

  await this.save();
};

userSchema.methods.deleteExpiredPosts = async function () {
  await this.removeExpiredPosts();

  // Continue with any additional logic you may have for the user
};

userSchema.methods.addPost = function (post) {
  this.posts.push(post);
};

userSchema.methods.addLikedPost = function (post) {
  this.likedPosts.push(post);
};

const User = mongoose.model('User', userSchema);

module.exports = { User, Post };