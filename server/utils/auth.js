const jwt = require('jsonwebtoken');
require("dotenv").config()
const { GraphQLError } = require('graphql');

// set token secret and expiration date
const secret = process.env.JWT_SECRET
const expiration = '2h'

// Middleware to check and delete expired posts
const deleteExpiredPostsMiddleware = async (req, res, next) => {
  try {
    // Check and delete expired posts
    const expiredPosts = await Post.find({ expires: { $lte: new Date() } });
    
    // Delete expired posts
    await Promise.all(expiredPosts.map(async (post) => {
      await post.remove();
      console.log(`Expired post with ID ${post._id} deleted.`);
    }));

    // Continue with the next middleware or route handler
    next();
  } catch (error) {
    // Handle errors appropriately
    console.error('Error checking and deleting expired posts:', error);
    next(error);
  }
};

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
      const { data } = jwt.verify(token, secret, { maxAge: expiration })
      req.user = data
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