
const { User, Post } = require('../models');

const resolvers = {
  Query: {
    //all users
    getUser: async () => {
      const users = await User.find({});
      console.log(users);
      return await User.find({});
    },

//get one user by id
    getUserById: async (parent, args) => {
      const userbyid = await User.findById(args._id);
      console.log(userbyid);
      return userbyid;
    },

    //get all posts

    getPost: async () => {
      const posts = await Post.find({});
      console.log(posts);
      return await Post.find({});      
     },

//get post by id
     getPostById: async (parent, args) => {
      const postbyid =  await Post.findById(args._id);
      console.log(postbyid);
      return postbyid;
     },
    //get post by user id
    getPostByUserId: async (parent, args) => {  
      const postbyuserid = await Post.find({userId: args._id});
      console.log(postbyuserid);
      return postbyuserid;
    },
    //get all post liked by  a user
    getLikedPost: async (parent, args) => {

},
Mutation: {  
 
  //add user
    addUser: async (parent, {username, password}) => {
    const useradded = await User.create({username, password});
    console.log(useradded);
    return useradded;
    },

    //login user
    login: async (parent, {username, password}) => {
    const userlogin = await User.findOne({username});
    console.log(userlogin);
    return userlogin;
    },

    //add post
    addPost: async (parent, {postText, timeLimit, likes}) => {
      const postadded = await Post.create({postText, timeLimit, likes});
      console.log(postadded);
      return postadded;
    }

    //todo add likes to post
//TODO add liked post_id to a user
//TODO add user'd post_id to a user
    
  }

  }

};

module.exports = resolvers;
