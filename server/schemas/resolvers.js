const { User, Post } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const pageLength = 10

const resolvers = {
  Query: {
    getPostsByLike: async (_parent, {pageNumber}) => {
      const posts = await Post.find({}).sort({likes: "desc"}).skip(pageNumber * pageLength).limit(pageLength)
      return posts
    },
    getPostsByDatePosted: async (_parent, {pageNumber}) => {
      const posts = await Post.find({}).sort({datePosted: "desc"}).skip(pageNumber * pageLength).limit(pageLength)
      return posts
    },
    getCurrentUserPostsByLike: async (_parent, {pageNumber}, context) => {
      const user = await User.findById(context.user._id).populate("posts")
      if(!user) throw AuthenticationError
      // Sort the posts by number of likes
      const sortedPosts = user.posts.sort((a, b) => b.likes - a.likes) // highest to lowest
      // Apply the skip and limit
      const offset = pageNumber * pageLength
      return sortedPosts.slice(offset, offset + pageLength)
    },
    getCurrentUserPostsByDatePosted: async (_parent, {pageNumber}, context) => {
      const user = await User.findById(context.user._id).populate("posts")
      if(!user) throw AuthenticationError
      // Sort the posts by number of likes
      const sortedPosts = user.posts.sort((a, b) => b.datePosted - a.datePosted) // highest to lowest
      // Apply the skip and limit
      const offset = pageNumber * pageLength
      return sortedPosts.slice(offset, offset + pageLength)
    },
  },
  Mutation: {
    login: async (_parent, { username, password }) => {
      // Get the user
      const user = await User.findOne({ username })
      if(!user) throw AuthenticationError

      // Check if the password is correct
      const isCorrectPassword = await user.isCorrectPassword(password)
      if(!isCorrectPassword) throw AuthenticationError

      const token = signToken(user)
      return { token, user }
    },
    signUp: async (_parent, { username, password }) => {
      // Check if user doesn't exists
      const user = await User.findOne({ username })
      if(user) throw AuthenticationError

      // Create new user
      const newUser = await User.create({username, password})
      const token = signToken(newUser)
      return { token, user: newUser }
    },
    togglePostsLike: async (_parent, {postId}, context) => {
      // Check if there is a user
      const user = await User.findById(context.user._id)
      if(!user) throw AuthenticationError
      // Check if the user has already liked that post
      let isPostAlreadyLiked = false
      user.likedPosts.forEach(likedPost => {
        if(likedPost.equals(postId)){
          return isPostAlreadyLiked = true
        }
      })
      if(isPostAlreadyLiked){ // It is liked so need to toggle to unlike
        // Unlike the post
          // remove post from user's likedPosts
          let filter = {_id: context.user._id}
          let update = {$pullAll: {likedPosts: [postId] }}
          await User.findOneAndUpdate(filter, update)
          // update post with 1 less like
          filter = {_id: postId}
          update = {$inc: {likes: -1}}
          const updatedPost = await Post.findOneAndUpdate(filter, update, { new: true })
          // Send the updated post
          return updatedPost
      }else{ // It is un-liked so need to toggle to liked
        // Like the post
          // update post with 1 more like
          let filter = {_id: postId}
          let update = {$inc: {likes: 1}}
          const updatedPost = await Post.findOneAndUpdate(filter, update, { new: true })
          // add liked post to user's likedPosts
          filter = {_id: context.user._id}
          update = {$push: {likedPosts: updatedPost._id}}
          await User.findOneAndUpdate(filter, update)
          // Send the updated post
          return updatedPost
      }
    },
    addPost: async (_parent, {postText}, context) => {
      // Check if the user is correct
      const user = await User.findById(context.user._id)
      if(!user) throw AuthenticationError
      // Create new post
      const newPost = await Post.create({username: user.username, postText})
      // Add newly created post to user's posts
        const filter = {_id: context.user._id}
        const update = {$push: {posts: newPost._id}}
        await User.findOneAndUpdate(filter, update)
      // return new post
      return newPost
    }
  }
}

module.exports = resolvers;