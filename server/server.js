const express = require('express')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const path = require("path")
//const { authMiddleware } = require("./utils/auth")
// Import the two parts of a GraphQL schema
const {typeDefs, resolvers} = require("./schemas")
const db = require('./config/connection')
const { authMiddleware } = require('./utils/auth')
// Create the apollo server
const server = new ApolloServer({typeDefs, resolvers, context: authMiddleware})
const PORT = process.env.PORT || 3001
const app = express();
// Create a new instance of an Apollo server with the GraphQL schema
  async function startApolloServer(){
  await server.start()
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));
  // If production server(with Heroku) then use the built react app which is in the dist folder
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')))
    app.get('*', (req, res) => { // Any routes are redirected to the index.html. This is because react is a Single Page Application and doesn't need different html files.
      res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    })
  }
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Server is running ${PORT}`)
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    })
  })
};
startApolloServer()