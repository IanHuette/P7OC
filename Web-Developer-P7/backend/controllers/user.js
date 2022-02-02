const MongoUser = require('../mongomodels/user');
const User = require('../sqlmodels/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// TODO CREATE
const signup = (req, res, next) => {
  // console.log(req.body); process.exit();
  bcrypt.hash(req.body.password, 10)
    .then(hash => {

      if (process.env.USED_DATABASE === "MongoDB") {
        const user = new MongoUser({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      } else if (process.env.USED_DATABASE === "MySQL") {
          // récupérer depuis la requête (req) les informations suivantes: password email username
          // hasher le password: ce sera ce hash que tu enregistreras pour le password en bdd
          // passer toutes les informations récupérées depuis la requête au modèle user lors de sa création
          const sqlUser = new User(email, password, username);
          const userSavedOK = sqlUser.save();
          if (userSavedOK) {
            res.status(201).json({message: 'Compte créé !', success: true});
          } else {
            res.status(400).json({message: 'Problème lors de la création du compte, réessayez plus tard !', success: false});
          }
      }

    })
    .catch(error => res.status(500).json({ error: "NO DATABASE CONNECTIVITY" }));
};

// TODO READ 
const login = (req, res, next) => {
  if (process.env.USED_DATABASE === "MongoDB") {
    MongoUser.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
  } else if (process.env.USED_DATABASE === "MySQL") {
    // TODO same logic but with my SQL
    


  } else {
    res.status(500).json({ error: "NO DATABASE CONNECTIVITY" });
  }
};

// DELETE

module.exports = {
  signup,
  login
};