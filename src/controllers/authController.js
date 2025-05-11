// Lógica para gerar e validar tokens
const PasswordReset = require("../models/PasswordReset"); 
const crypto = require("crypto");

// 🔹 Gerar Token e salvar no banco
async function generateResetToken(req, res) {
  const { email } = req.body;

  const token = crypto.randomBytes(32).toString("hex"); // Gera token aleatório

  try {
    await PasswordReset.create({ email, token });
    res.json({ message: "Token gerado!", token });
  } catch (error) {
    console.error("Erro ao gerar token:", error);
    res.status(500).json({ message: "Erro interno ao gerar token." });
  }
}

// 🔹 Validar Token
async function validateResetToken(req, res) {
  const { email, token } = req.body;

  try {
    const resetEntry = await PasswordReset.findOne({ email, token });

    if (!resetEntry) {
      return res.status(400).json({ message: "Token inválido ou expirado." });
    }

    res.json({ message: "Token válido!" });
  } catch (error) {
    console.error("Erro ao validar token:", error);
    res.status(500).json({ message: "Erro interno ao validar token." });
  }
}

module.exports = {
  generateResetToken,
  validateResetToken
};
