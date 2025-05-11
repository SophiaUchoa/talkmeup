const express = require("express");
const connectDB = require("./db");
const authRoutes = require('./src/routes/authRoutes.js');
const userRoutes = require('./src/routes/userRoutes');
const settingsRoutes = require('./src/routes/settingsRoutes.js');
const languageRoutes = require('./src/routes/userLanguages.js');
const learningRoutes = require('./src/routes/learningRoutes.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require("dotenv").config();

connectDB(); // Conectar ao MongoDB

const app = express();
app.use(bodyParser.json());

// Registrar rotas
app.use('/users', userRoutes);
app.use('/settings', settingsRoutes);
app.use('/languages', languageRoutes);
app.use('/colearning', learningRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));

// Conexão com MongoDB Atlas
mongoose.connect('mongodb+srv://mariagomes:poliglotastalkmeup@talkmeup.mfott.mongodb.net/',
    //'mongodb+srv://poliglotas:poliglotasfmm123@talkmeup.mfott.mongodb.net/talkmeup?retryWrites=true&w=majority', 
    {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Atlas conectado'))
  .catch((err) => console.error('Erro ao conectar:', err));