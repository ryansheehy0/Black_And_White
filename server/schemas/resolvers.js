const { User, Post } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const pageLength = 10

const resolvers = {
  Query: {
    getPostsByLike: async (_parent, {pageNumber}, context) => {
      const user = await User.findById(context.user._id)
      if(!user) throw AuthenticationError
      // Get posts by like
      let posts = await Post.find({}).sort({likes: "desc"}).skip(pageNumber * pageLength).limit(pageLength)
      // See which posts are liked by the user
      posts = posts.map(post => {
        for(let i=0; i < post.usersWhoLiked.length; i++){
          const userWhoLikedPost = post.usersWhoLiked[i]
          if(userWhoLikedPost.equals(user._id)){
            // You need to convert post to object instead of mongoose obj
            return {...post.toObject(), liked: true}
          }
        }
        return {...post.toObject(), liked: false}
      })

      return posts
    },
    getPostsByDatePosted: async (_parent, {pageNumber}, context) => {
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
      const userId = context.user._id
      // Check if there is a user
      const user = await User.findById(userId)
      if(!user) throw AuthenticationError
      // Get the liked post
      const post = await Post.findById(postId).populate("usersWhoLiked")
      // Check if the user has already liked that post
      let isPostAlreadyLiked = false
      for(let i=0; post.usersWhoLiked.length; i++){
        const userWhoLiked = post.usersWhoLiked[i]
        if(userWhoLiked._id.equals(userId)){
          isPostAlreadyLiked = true
          break
        }
      }
      if(isPostAlreadyLiked){ // It is liked so need to toggle to unlike
        // Unlike the post
          // remove user from usersWhoLiked and update post with 1 less like
          const filter = {_id: postId}
          const update = {
            $inc: {likes: -1},
            $pullAll: {usersWhoLiked: [userId]}
          }
          const updatedPost = await Post.findOneAndUpdate(filter, update, { new: true })
          // Send the updated post
          return updatedPost
      }else{ // It is un-liked so need to toggle to liked
        // Like the post
          // Add user to usersWhoLiked and update post with 1 more like
          let filter = {_id: postId}
          let update = {
            $inc: {likes: 1},
            $push: {usersWhoLiked: userId}
          }
          const updatedPost = await Post.findOneAndUpdate(filter, update, { new: true })
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