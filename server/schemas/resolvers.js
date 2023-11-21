const { User, Post } = require('../models');
const { signToken, } = require('../utils/auth');

const pageLength = 10

const resolvers = {
  Query: {
    getPostsByLike: async (_parent, {pageNumber}) => {
      const posts = await Post.find({}).sort({likes: "asc"}).skip(pageNumber * pageLength).limit(pageLength).exec()
      return posts
    },
    getPostsByDatePosted: async (_parent, {pageNumber}) => {
      // TODO: Sort by most recent date
      const posts = await Post.find({}).sort({likes: "asc"}).skip(pageNumber * pageLength).limit(pageLength).exec()
      return posts
    },
    getCurrentUserPostsByLike: async (_parent, {pageNumber}, context) => {
      const user = await User.findById(context._id).populate("posts", "Post")
      // Sort the posts by number of likes
      const sortedPosts = user.posts.sort((a, b) => b - a) // highest to lowest
      // Apply the skip and limit
      const offset = pageNumber * pageLength
      return sortedPosts.slice(offset, offset + pageLength)
    },
    getCurrentUserPostsByLike: async (_parent, {pageNumber}, context) => {
      // TODO: Sort by most recent date
      const user = await User.findById(context._id).populate("posts", "Post")
      // Sort the posts by number of likes
      const sortedPosts = user.posts.sort((a, b) => b - a) // highest to lowest
      // Apply the skip and limit
      const offset = pageNumber * pageLength
      return sortedPosts.slice(offset, offset + pageLength)
    },
  },
  Mutation: {

    /*addUser: async (parent, { username, password }) => {
      const userAdded = await User.create({ username, password });
      const token = signToken(userAdded);
      console.log(userAdded);
      return { token, userAdded };
    },


    addPost: async (parent, { postText, timeLimit, likes }, context) => {
      const postAdded = await Post.create({ postText, timeLimit, likes });
      console.log(postAdded);
      return postAdded;
    },*/

    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });
      
      if (!user) {
        throw new AuthenticationError("The credentials you provided are incorrect");
      }
      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
          throw new AuthenticationError("The credentials you provided are incorrect");
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },


  }, //mutation close


};



module.exports = resolvers;

