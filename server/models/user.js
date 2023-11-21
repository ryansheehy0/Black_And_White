const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const Post = require('./Post');


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
    /*set: async function (newpassword) {
        const saltRounds = 10;
      return await bcrypt.hash(newpassword, saltRounds);
    },*/
  },
  posts:[
    {   type: Schema.Types.ObjectId,
        ref:"Post"}
       ],
  likedPosts: [{type:Schema.Types.ObjectId,
                ref:"Post", }
              ]

  
});

userSchema.pre('save', async function (next) {
  //console.log('pre save');
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    console.log(this.password);
  }

  next();
});


userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};


// Need a method that sees if a password is correct (use bcrypt compare)
const User = mongoose.model('User', userSchema);

module.exports = User;