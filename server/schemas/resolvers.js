const { User, Post } = require('../models');
const { signToken, } = require('../utils/auth');

const resolvers = {


  Query: {  // query open


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


    // get specfic user's data

    me: async (parent, args, context) => {
      if (context.user) {
        console.log("user found");
        const userdata= User.findOne({ _id: context.user._id })
          .populate('posts')
          .populate('likedPosts');
          console.log("userdata"+userdata);
      }
      console.log("not found");
      throw new AuthenticationError('You must be logged in');
    },
    

  

  },//query close


  Mutation: {//mutation open

    addUser: async (parent, { username, password }) => {
      const userAdded = await User.create({ username, password });
      const token = signToken(userAdded);
      console.log(userAdded);
      return { token, userAdded };
    },


    addPost: async (parent, { postText, timeLimit, likes }, context) => {
      const postAdded = await Post.create({ postText, timeLimit, likes });
      console.log(postAdded);
      return postAdded;
    },


  }, //mutation close


};



module.exports = resolvers;

