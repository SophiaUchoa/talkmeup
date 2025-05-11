const express = require('express');
const Credit = require('../models/Credit');
const router = express.Router();

// Adicionar créditos após uma sessão
router.post('/add', async (req, res) => {
  const { user, creditsOffered, session } = req.body;

  if (!user || !creditsOffered || !session) {
    return res.status(400).json({ message: 'Dados incompletos' });
  }

  try {
    const newCredit = new Credit({ user, creditsOffered, session });
    await newCredit.save();

    res.status(201).json({
      message: 'Créditos adicionados com sucesso',
      data: {
        user: newCredit.user,
        session: newCredit.session,
        credits: newCredit.creditsOffered
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
