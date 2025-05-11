// models/Language.js
const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Language = mongoose.model('Language', languageSchema);

module.exports = Language;
