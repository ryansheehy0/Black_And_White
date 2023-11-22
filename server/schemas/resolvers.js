

const { User, Post } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const pageLength = 10

const resolvers = {
  Query: {
    getPostsByLike: async (_parent, {pageNumber}) => {
      const posts = await Post.find({}).sort({likes: "asc"}).skip(pageNumber * pageLength).limit(pageLength)
      return posts
    },
    
// converted  datePosted field typefrom int to string,
 //other wise NULL in the datePosted (working sorted by datePosted  from most recent )

    getPostsByDatePosted: async (_parent, { pageNumber }) => {
      const posts = await Post.find({})
        .sort({ datePosted: "desc" })
        .skip(pageNumber * pageLength)
        .limit(pageLength);
      
      // Convert the datePosted field to a string representation
      const formattedPosts = posts.map(post => ({
        ...post.toObject(),
        datePosted: post.datePosted.toString()
      }));
    
      return formattedPosts;
    },
    
    /*getCurrentUserPostsByLike: async (_parent, {pageNumber}, context) => {
      const user = await User.findById(context._id).populate("posts", "Post")
      if(!user) throw AuthenticationError
      // Sort the posts by number of likes
      const sortedPosts = user.posts.sort((a, b) => b - a) // highest to lowest
      // Apply the skip and limit
      const offset = pageNumber * pageLength
      return sortedPosts.slice(offset, offset + pageLength)
    },*/
  
     
 //working need to fix the pagination
getCurrentUserPostsByLike: async (_parent, { pageNumber }, context) => {
  console.log("in the function")

  const user = await User.findById(context.user._id).populate("posts", "likes");
  console.log("this is user!!! ", user)
  if (!user) throw AuthenticationError;

  // Sort the posts by number of likes (descending order)
  const sortedPosts = user.posts.sort((a, b) => b.likes.length - a.likes.length);
console.log(sortedPosts);
  // Apply the skip and limit
  const offset = pageNumber * pageLength;
console.log(offset)
  const pagePosts = sortedPosts.slice(offset, offset + pageLength);
console.log(pagePosts)
  return sortedPosts;
  //return pagePosts;
},



  },//close query
  




  Mutation: {

    //user login
    login: async (_parent, { username, password }) => {
      const user = await User.findOne({ username })
      if(!user) throw AuthenticationError
      console.log("USER!!: ", user)
      const isCorrectPassword = await user.isCorrectPassword(password)
      if(!isCorrectPassword) throw AuthenticationError

      const token = signToken(user)
      return { token, user }
    },
    // signup for new user
    signUp: async (_parent, { username, password }) => {
      // Check if user doesn't exists
      const user = await User.findOne({ username })
      if(user) throw AuthenticationError

      // Create new user
      const newUser = await User.create({username, password})

      const token = signToken(newUser)
      return { token, newUser }
    },

    //toggleing the likes for post

    togglePostsLike: async (_parent, {postId}, context) => {
      // Check if there is a user
      const user = await User.findById(context._id).populate("likedPosts", "Post")
      if(!user) throw AuthenticationError
      // Check if the user has already liked liked that post
        // Get a new array with just the likedPosts id
        const idOfLikedPosts = user.likedPosts.map(likedPost => {return likedPost._id})
      if(idOfLikedPosts.includes(postId)){ // It is liked so need to toggle to unlike
        // Unlike the post
          // remove post from user's likedPosts
          let filter = {_id: context._id}
          let update = {$pull: {likedPosts: {_id: postId }}}
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
            // Find liked post
            const likedPost = await Post.findById(postId)
          filter = {_id: context._id}
          update = {$push: {likedPosts: likedPost}}
          await User.findOneAndUpdate(filter, update)
          // Send the updated post
          return updatedPost
      }
    },

    // add new post by user
    
    addPost: async (_parent, {postText}, context) => {
      // Check if the user is correct
      // Create new post
        // (use Post.create)
      // Add newly created post to user's posts
        // (use findOneAndUpdate with $push)
      // return new post
    }
  }
}

module.exports = resolvers;