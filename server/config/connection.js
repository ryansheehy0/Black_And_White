const mongoose = require('mongoose')
require("dotenv").config()

mongoose.connect(process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/black_and_white`);

module.exports = mongoose.connection