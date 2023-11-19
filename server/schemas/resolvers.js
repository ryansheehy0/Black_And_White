

const { User, Post } = require('../models');
const { signToken } = require('../utils/auth');

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
      const token = signToken(userAdded);
      console.log(userAdded);
      return { token, userAdded };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });
let i =0;
      if (!user) {
        console.log("error");
      }
      else {
       
console.log(i++);
        console.log("found!")
      }

      const correctPw = await user.isCorrectPassword(password)
      console.log(correctPw);

      if (!correctPw) {
        console.log("error");
      }
      else {
        console.log("correct password!")
      
      }

      return { user };
    },






    /*login: async (parent, { username, password }) => {
      const userLogin = await User.findOne({ username });
      console.log(userLogin);
      const correctPw = await userLogin.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }/*const token = signToken(user);
      const token = signToken(userLogin);
      console.log(userLogin);
      return { token, userLogin };
    },*/
    addPost: async (parent, { postText, timeLimit, likes }, context) => {
      const postAdded = await Post.create({ postText, timeLimit, likes });
      console.log(postAdded);
      return postAdded;
    },
  },
};

module.exports = resolvers;