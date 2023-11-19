const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const post = require('./post');


const userSchema = new Schema({
  username: {
    type: String,
    maxlength: 64,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    set: async function (password) {
        const saltRounds = 10;
      return await bcrypt.hash(password, saltRounds);
    },
  },
  posts:[
    {   type: Schema.Types.ObjectId,
        ref:"post"}
       ],
  likedPosts: [{type:Schema.Types.ObjectId,
                ref:"post", }
              ],

  
});

// Need a method that sees if a password is correct (use bcrypt compare)
const User = mongoose.model('User', userSchema);

module.exports = User;