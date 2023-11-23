const typeDefs = `
  type Post {
    _id: ID
    username: String
    postText: String
    datePosted: String
    timeLimit: Int
    likes: Int
    usersWhoLiked: [User]
    liked: Boolean
  }

  type User {
    _id: ID
    username: String
    password: String
    posts: [Post]
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
    togglePostsLike(postId: ID!): Post
    addPost(postText: String!): Post
  }
`

module.exports = typeDefs;