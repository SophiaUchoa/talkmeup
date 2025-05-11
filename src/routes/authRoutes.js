const express = require("express");
const crypto = require("crypto");
const PasswordReset = require("../models/PasswordReset"); // Removido .ts

const router = express.Router();

// 🔹 Rota para login (exemplo)
router.post("/login", (req, res) => {
  res.send("Login route");
});

// 🔹 Gerar Token e salvar no banco
async function generateResetToken(req, res) {
  const { email } = req.body;
  console.log("📩 Recebendo solicitação de reset para:", email);

  const token = crypto.randomBytes(32).toString("hex"); // Gera token aleatório
  console.log("🔑 Token gerado:", token);

  try {
    const result = await PasswordReset.create({ email, token }); // Salva no banco
    console.log("✅ Token salvo no banco:", result);
    
    res.json({ message: "Token gerado!", token });
  } catch (error) {
    console.error("❌ Erro ao gerar token:", error.message);
    res.status(500).json({ message: "Erro ao gerar o token", error: error.message });
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
    res.status(500).json({ message: "Erro ao validar o token", error: error.message });
  }
}

// 🔹 Definir as rotas corretamente
router.post("/generate-reset-token", generateResetToken);
router.post("/validate-reset-token", validateResetToken);

module.exports = router;
