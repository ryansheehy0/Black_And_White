
const { User, Post } = require('../models');

const resolvers = {
  Query: {
    getUser: async () => {
      const users = await User.find({});
      console.log(users);
      return users;
    },
    getUserById: async (parent, args) => {
      const userById = await User.findById(args._id);
      console.log(userById);
      return userById;
    },
    getPost: async () => {
      const posts = await Post.find({});
      console.log(posts);
      return posts;
    },
    getPostById: async (parent, args) => {
      const postById = await Post.findById(args._id);
      console.log(postById);
      return postById;
    },
    getPostByUserId: async (parent, args) => {
      const postByUserId = await Post.find({ userId: args._id });
      console.log(postByUserId);
      return postByUserId;
    },
  },
  Mutation: {
    addUser: async (parent, { username, password }) => {
      const userAdded = await User.create({ username, password });
      console.log(userAdded);
      return userAdded;
    },
    login: async (parent, { username, password }) => {
      const userLogin = await User.findOne({ username });
      console.log(userLogin);
      return userLogin;
    },
    addPost: async (parent, { postText, timeLimit, likes }) => {
      const postAdded = await Post.create({ postText, timeLimit, likes });
      console.log(postAdded);
      return postAdded;
    },
  },
};

module.exports = resolvers;