

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  postText: {
    type: String,
    maxlength: 255,
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
  
});
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
/*postText: {
  type: String,
  maxlength: 255,
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
}*/