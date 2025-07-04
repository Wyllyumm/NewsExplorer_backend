const mongoose = require("mongoose");
const validator = require("validator");

const newsArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  source: { id: String, name: String },
  description: { type: String, required: true },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  urlToImage: { type: String, required: true },
  publishedAt: Date,
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    default: [],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = mongoose.model("newsArticle", newsArticleSchema);
