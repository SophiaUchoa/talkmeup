const express = require('express');
const Session = require('../models/Session');
const User = require('../models/User');  // Para verificar se os usuários existem
const router = express.Router();

// Rota para criar uma nova sessão de aprendizado
router.post('/create', async (req, res) => {
  const { user1, user2, language, credits } = req.body;

  // Validação simples dos dados recebidos
  if (!user1 || !user2 || !language || credits <= 0) {
    return res.status(400).json({ error: 'Dados inválidos. Verifique os campos.' });
  }

  try {
    // Verifica se os usuários existem no banco
    const userExists1 = await User.findById(user1);
    const userExists2 = await User.findById(user2);

    if (!userExists1 || !userExists2) {
      return res.status(404).json({ error: 'Usuário(s) não encontrado(s)' });
    }

    const newSession = new Session({ user1, user2, language, credits });
    await newSession.save();
    res.status(201).json(newSession);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para listar todas as sessões
router.get('/', async (req, res) => {
  try {
    const sessions = await Session.find().populate('user1 user2', 'name email'); // Apenas campos necessários
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
