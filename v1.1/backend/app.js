const express = require('express');
const env = require('dotenv').config();

const app = express();
// on dit explicitement à Express d'être capable de lire les JSON envoyés dans une requête
app.use(express.json());

// on set le CORS et certains headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

const con = require("./database");
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const { authMiddleware } = require('./middleware/auth');

con.connect(function(err) {
  if (err) {
    console.log('Connexion à MySQL échouée !');
    console.error(err);
    // si la connection à la base de données échoue, on renvoie une réponse d'erreur 500 par défaut
    app.use((req, res, next) => {
      res.status(500).json({message: "Une erreur est survenue, veuillez réessayer plus tard.", success: false});
    });
  } else {
    console.log('Connexion à MySQL réussie !');
  }
});

app.use('/api/posts', postRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/comments', commentRoutes);

module.exports = {
  app,
  env
};