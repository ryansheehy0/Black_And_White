const mongoose = require('mongoose')
const User = require("./user")

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
    expires: 24 * 60 * 60 // 1 day
  },
  likes: {
    type: Number,
    default: 0,
  },
  usersWhoLiked: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }]
},{
  toJSON: { virtuals: true }
})

postSchema.virtual("timeLimit").get(function() {
  const currentTime = new Date().getTime()
  const expirationTime = this.datePosted.getTime()
  const startingTime = 24 * 60 * 60 * 1000 // 1 day
  const timeLimit = startingTime - (currentTime - expirationTime)
  if(timeLimit < 0) return 0
  return timeLimit
})

postSchema.pre("remove", async function(next){
  try{
    await User.updateMany({}, {$pull: {posts: this._id}})
    next()
  }catch(error){
    next(error)
  }
})

postSchema.set("toObject", { getters: true })

const Post = mongoose.model('Post', postSchema)

module.exports = Post