const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  longURL: {
    type: String,
    required: true,
  },
  shortURL: {
    type: String,
    unique: true,
  },
  clickCount: {
    type: String,
    default: 0,
  }
});

const URL = mongoose.model('urlshort', UrlSchema);

module.exports = URL;
