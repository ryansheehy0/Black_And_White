const jwt = require('jsonwebtoken');
require("dotenv").config()
const { GraphQLError } = require('graphql');

// set token secret and expiration date
const secret = process.env.JWT_SECRET
const expiration = '2h'

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req }) {
    let token = req.headers.authorization || req.body.token || req.query.token;
   // console.log("HERE IS THE TOKEN",token)
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim()
    }
   //console.log("HERE IS THE TOKEN after if!!!!!!!!",token)
    if (!token) {
      return req
    }
    //console.log("HERE IS THE TOKEN after if!!!!!!!!",token)
    // verify token and get user data out of it
    try {
      ///console.log(  secret, token)
      const { data } = jwt.verify(token, secret, { maxAge: expiration })
      //console.log("this is data: ", data)
      req.user = data
    } catch (err) {
      //console.log(err)
      console.log('Invalid token')
    }

    // send to next endpoint
    return req
  },
  signToken: function ({ username, _id }) {
    const payload = { username, _id }
    //console.log("This payload: ", payload)
    //console.log("This  is secret!!!!!!!! ", secret)
    return jwt.sign({data: payload}, secret, { expiresIn: expiration })
  },
}