const mongoose = require("mongoose");

const postsModel = mongoose.Schema({
  caption: String,
  username: String,
  imageUrl: String,
});

module.exports = mongoose.model("posts", postsModel);
