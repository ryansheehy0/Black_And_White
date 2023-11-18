
const { User,Post } = require('../models');

const resolvers = {
  Query: {
    getUser: async () => {
      const users = await User.find({});
      console.log(users);
      return await User.find({});
    
    },
    getPost: async () => {
      const posts = await Post.find({});
      console.log(posts);
      return await Post.find({});      
     }
}
};

module.exports = resolvers;
