const express = require('express');
const Negotiation = require('../models/Negotiation');
const User = require('../models/User');
const router = express.Router();
const Session = require('../models/Session');

// Iniciar negociação
router.post('/start', async (req, res) => {
  const { user1Id, user2Id, user1Credits, user2Credits, language } = req.body;

  try {
    // Buscar os usuários
    const user1 = await User.findById(user1Id);
    const user2 = await User.findById(user2Id);

    if (!user1 || !user2) {
      return res.status(404).json({ error: 'Usuários não encontrados' });
    }

    // Criar a negociação com idioma e data/hora
    const negotiation = new Negotiation({
      user1: user1Id,
      user2: user2Id,
      user1Credits,
      user2Credits,
      language,
      createdAt: new Date(), // Data e hora da negociação
    });

    await negotiation.save();

    res.status(201).json({
      message: 'Negociação iniciada',
      negotiation,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Aceitar negociação
router.post('/accept', async (req, res) => {
  const { negotiationId } = req.body;

  try {
    const negotiation = await Negotiation.findById(negotiationId);

    if (!negotiation) {
      return res.status(404).json({ error: 'Negociação não encontrada' });
    }

    // Atualizar o status da negociação para 'confirmada'
    negotiation.status = 'confirmed';
    await negotiation.save();

    // Atualizar os créditos dos usuários
    const user1 = await User.findById(negotiation.user1);
    const user2 = await User.findById(negotiation.user2);

    user1.credits -= negotiation.user1Credits;
    user2.credits -= negotiation.user2Credits;

    await user1.save();
    await user2.save();

    // Criar a sessão real com idioma e data/hora de início
    const newSession = new Session({
      user1: negotiation.user1,
      user2: negotiation.user2,
      language: negotiation.language, // Idioma da sessão
      credits: negotiation.user1Credits + negotiation.user2Credits,
      startTime: new Date(), // Data e hora da sessão
    });

    await newSession.save();

    res.status(200).json({
      message: 'Negociação confirmada, sessão criada',
      session: newSession,
      user1,
      user2,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rejeitar negociação
router.post('/reject', async (req, res) => {
  const { negotiationId } = req.body;

  try {
    const negotiation = await Negotiation.findById(negotiationId);

    if (!negotiation) {
      return res.status(404).json({ error: 'Negociação não encontrada' });
    }

    // Atualizar o status da negociação para 'rejeitada'
    negotiation.status = 'rejected';
    await negotiation.save();

    res.status(200).json({
      message: 'Negociação rejeitada',
      negotiation,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
