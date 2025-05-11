const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  user1: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  user2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  language: { type: String, required: true }, // Idioma da sessão
  credits: { type: Number, required: true },
  startTime: { type: Date, required: true }, // Data e hora do início da sessão
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
