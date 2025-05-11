// models/Credit.js
const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  creditsOffered: {
    type: Number,
    required: true,
  },
  creditsUsed: {
    type: Number,
    default: 0,
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true,
  },
});

const Credit = mongoose.model('Credit', creditSchema);

module.exports = Credit;
