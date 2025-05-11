const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Buscar usuários que ensinam um idioma específico
router.get('/teaching/:lang', async (req, res) => {
  const users = await User.find({ languagesTeaching: req.params.lang });
  res.json(users);
});

// Buscar usuários que querem aprender um idioma específico
router.get('/learning/:lang', async (req, res) => {
  const users = await User.find({ languagesLearning: req.params.lang });
  res.json(users);
});

module.exports = router;
