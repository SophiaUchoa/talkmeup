const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Criar usuário
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar se todos os campos obrigatórios foram preenchidos
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    // Verificar se o email já está registrado
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email já registrado' });
    }

    // Criptografar a senha antes de salvar
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword // Salvar a senha criptografada
    });

    const saved = await newUser.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login com senha criptografada
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Comparar a senha fornecida com a armazenada no banco
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Retornar os dados do usuário, exceto a senha
    res.json({
      message: 'Login bem-sucedido',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar todos os usuários (debug)
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
