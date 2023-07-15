require("dotenv").config();

const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    maxLength: 100,
    required: [true, "You need a title"],
  },
  content: {
    type: String,
    required: [true, "You need some content"],
  },
  excerpt: {
    type: String,
    maxLength: 500,
    required: [true, "Please add an excerpt"],
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  actors: {
    type: [String],
    required: true,
    validate: {
      validator: function (array) {
        return array.length >= 2;
      },
      message: "You must add at least 3",
    },
  },
  status: {
    type: String,
    required: true,
    enum: ["draft", "public"],
    default: "draft",
    index: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

articleSchema.plugin(aggregatePaginate);

const Article = mongoose.model("Article", articleSchema);

module.exports = { Article };
