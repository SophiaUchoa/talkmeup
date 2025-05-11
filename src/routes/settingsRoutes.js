const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Obter configurações do usuário
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar configurações
router.put('/:id', async (req, res) => {
  const { password, email } = req.body;

  try {
    // Validação de dados
    if (password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(password, salt); // Criptografando a senha
    }

    if (email) {
      const userWithEmail = await User.findOne({ email });
      if (userWithEmail) return res.status(400).json({ error: 'Email já em uso' });
    }

    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Usuário não encontrado' });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
