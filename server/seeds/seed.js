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
  

  /*for (const newUser of users) {
    // Randomly add each post to a user's posts array
    const randomPost = posts[Math.floor(Math.random() * posts.length)];
    newUser.posts.push(randomPost._id);
    await newUser.save();
  }*/

  for (const newUser of users) {
    // Randomly add multiple posts to a user's posts array
    const numPostsToAdd = Math.floor(Math.random() * posts.length) + 1; // Generate a random number of posts to add
    const randomPosts = []; // Array to store the random posts
  
    // Loop to randomly select posts
    for (let i = 0; i < numPostsToAdd; i++) {
      const randomPost = posts[Math.floor(Math.random() * posts.length)];
      randomPosts.push(randomPost._id);
    }
  
    newUser.posts = randomPosts; // Assign the random posts array to the user's posts array
    await newUser.save();
  }

  
  
  for (const newPost of posts) {
    // Randomly select a user who likes the post
    const randomUser = users[Math.floor(Math.random() * users.length)];
    // Add the post to the user's likedPosts array
    randomUser.likedPosts.push(newPost._id);
    // Increment the likes field in the post
    newPost.likes++;
    // Save the changes to the user and post
    await randomUser.save();
    await newPost.save();
  }
  

  console.log('Seeding complete!');
  process.exit(0);
});