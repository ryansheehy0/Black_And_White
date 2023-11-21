const jwt = require('jsonwebtoken');
require("dotenv").config()
const { GraphQLError } = require('graphql');

// set token secret and expiration date
const secret = 'mysecretsshhhhh'
const expiration = '2h'

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req }) {
    let token = req.headers.authorization

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim()
    }

    if (!token) {
      return req
    }

    // verify token and get user data out of it
    try {
      const user = jwt.verify(token, secret, { maxAge: expiration })
      req.user = user
    } catch {
      console.log('Invalid token')
    }

    // send to next endpoint
    return req
  },
  signToken: function ({ username, _id }) {
    const payload = { username, _id }

    return jwt.sign(payload, secret, { expiresIn: expiration })
  },
}