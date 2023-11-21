const db = require('../config/connection');
const bcrypt = require('bcrypt');
const { Post, User } = require('../models');
const cleanDB = require('./cleanDB');
const userData = require('./userData.json');
const postData = require('./postData.json');

db.once('open', async () => {
  await cleanDB("User", "users");
  await cleanDB("Post", "posts");

  // Bulk create each model
  const users = await User.create(userData);
  const posts = await Post.create(postData);
  // Bulk create post documents
  

  for (const newUser of users) {
    // Randomly add each post to a user's posts array
    const randomPost = posts[Math.floor(Math.random() * posts.length)];
    newUser.posts.push(randomPost._id);
    await newUser.save();
  }

  for (const newPost of posts) {
    // Randomly add each post to a user's likedPosts array
    const randomUser = users[Math.floor(Math.random() * users.length)];
    randomUser.likedPosts.push(newPost._id);
    await randomUser.save();

    // Reference the likedPost on the post model
    newPost.likedBy = randomUser._id;
    await newPost.save();
  }

  

  console.log('Seeding complete!');
  process.exit(0);
});