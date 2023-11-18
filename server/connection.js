const mongoose = require('mongoose')
require("dotenv").config()
console.log(process.env.DB_NAME);
mongoose.connect(process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${process.env.DB_NAME}`)

module.exports = mongoose.connection