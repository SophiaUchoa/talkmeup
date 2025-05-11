const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Listar os idiomas de um usuário específico (learning e teaching)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id, 'languageNative languagesLearning languagesTeaching');

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({
      message: 'Idiomas listados com sucesso',
      data: {
        languageNative: user.languageNative,
        languagesLearning: user.languagesLearning,
        languagesTeaching: user.languagesTeaching
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
