

const typeDefs = `
type User {
  _id: ID
  username: String
  password: String
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
    getPost: [Post]
  }
`;


module.exports = typeDefs;
