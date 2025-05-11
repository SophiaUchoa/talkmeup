// Modelo do Mongoose para tokens de recuperação
const mongoose = require("mongoose");

const passwordResetSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 } // expira após 1 hora
});

module.exports = mongoose.model("PasswordReset", passwordResetSchema);
