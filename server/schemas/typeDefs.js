const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Post {
    _id: ID
    postText: String
    datePosted: Int
    timeLimit: Int
    likes: Int
  }

  type User {
    _id: ID
    username: String
    password: String
    posts: [Post]
    likedPosts: [Post]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getUser: [User]
    getUserById(_id: ID): User
    getPost: [Post]
    getPostById(_id: ID): Post
    me: User
  }

  type Mutation {
    
    login(username: String!, password: String!): Auth
    addUser(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
//addUser(username: String, password: String): User
    //addPost(postText: String): Post