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
        console.log("User found");
        const userdata = await User.findOne({ _id: context.user._id })
          .populate('posts')
          .populate('likedPosts');
        console.log("User data:", userdata);
        return userdata;
      } else {
        console.log("User not found");
        throw new AuthenticationError('You must be logged in');
      }
  
    }
  

  },//query close


  Mutation: {  //mutation open

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

