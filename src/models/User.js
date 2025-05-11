// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  languageNative: {
    type: String, // Idioma nativo do usuário
    required: true,
  },
  languagesLearning: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Language', // Idiomas que o usuário quer aprender
  }],
  languagesTeaching: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Language', // Idiomas que o usuário pode ensinar
  }],
  credits: {
    type: Number,
    default: 100, // Começa com 100 créditos
  },
  profilePicture: {
    type: String,
    default: '', // Foto de perfil opcional
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
