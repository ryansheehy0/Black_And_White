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
    getPostsByLike(pageNumber: Int!): [Post]
    getPostsByDatePosted(pageNumber: Int!): [Post]
    getCurrentUserPostsByLike(pageNumber: Int!): [Post]
    getCurrentUserPostsByDatePosted(pageNumber: Int!): [Post]
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    signUp(username: String!, password: String!): Auth
    likePost(postId: ID!): Post
    addPost(postText: String!): Post
  }
`

module.exports = typeDefs;