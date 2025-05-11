const mongoose = require('mongoose');

const negotiationSchema = new mongoose.Schema({
  user1: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  user2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  user1Credits: { type: Number, required: true },
  user2Credits: { type: Number, required: true },
  language: { type: String, required: true }, // Idioma negociado
  status: { type: String, enum: ['pending', 'confirmed', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }, // Data e hora da negociação
});

const Negotiation = mongoose.model('Negotiation', negotiationSchema);

module.exports = Negotiation;
