// routes/userLearningTeachingRoutes.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Rota para listar usuários que querem aprender ou ensinar um idioma
router.get('/:languageId', async (req, res) => {
  const { languageId } = req.params;

  try {
    // Procurar usuários que querem aprender o idioma
    const usersLearning = await User.find({
      languagesLearning: languageId,
    });

    // Procurar usuários que podem ensinar o idioma
    const usersTeaching = await User.find({
      languagesTeaching: languageId,
    });

    res.json({
      usersLearning,
      usersTeaching,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
