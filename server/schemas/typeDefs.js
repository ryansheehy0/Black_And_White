const { gql } = require('apollo-server-express');

const typeDefs = gql `
type User {
  _id: ID
  username: String
  password: String
  posts: [Post]
  likedPosts: [Post]
}

type Post {
  _id: ID
  postText: String
  datePosted: Int
  timeLimit: Int
  likes: Int
}
  
  type Query {
    getUser: [User]
    getUserById(_id: ID): User
    getPost: [Post]
    getPostById(_id: ID): Post
    getPostByUserId(_id: ID): [Post]}
    
      

   type Mutation {
    
      addUser(username: String, password: String): User
      login(username: String, password: String): User
      addPost(postText: String): Post}
    
  
  
`;


module.exports = typeDefs;
