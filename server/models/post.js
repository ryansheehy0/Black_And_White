const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const postSchema = new Schema({
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
  },
  expires: {
    type: Date,
  },
}, { toJSON: { virtuals: true } });

postSchema.virtual('timeLimitLeft').get(function () {
  const currentTime = new Date();
  const timeLeft = this.expires - currentTime;
  return timeLeft > 0 ? timeLeft : 0;
});

postSchema.pre('save', function (next) {
  if (!this.expires) {
    this.expires = new Date(this.datePosted.getTime() + this.timeLimit);
  }
  next();
});

// Function to delete an individual post if it has expired
postSchema.methods.deleteIfExpired = async function () {
  const currentTime = new Date();
  if (this.expires <= currentTime) {
    await this.remove();
    console.log(`Post with ID ${this._id} deleted.`);
  }
};

const Post = mongoose.model('Post', postSchema);

module.exports = Post;