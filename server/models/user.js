const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Post = require('./Post')

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
    type: Schema.Types.ObjectId,
    ref: "Post",
  }]
})

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 12
    this.password = await bcrypt.hash(this.password, saltRounds)
  }
  next()
})

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User