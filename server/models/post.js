const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
  username: {
    type: String,
    maxLength: 64,
    unique: true,
    required: true,
  },
  postText: {
    type: String,
    maxLength: 255,
    required: true,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
  timeLimit: {
    type: Number,
    default: 24 * 60 * 60 * 1000, // Default to 1 day in milliseconds
  },
  likes: {
    type: Number,
    default: 0,
  }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post