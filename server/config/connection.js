const mongoose = require('mongoose')
require("dotenv").config()
console.log(process.env.DB_NAME);
mongoose.connect(process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/black_and_whiteDB`);

module.exports = mongoose.connection