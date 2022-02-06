const MongoUser = require('../mongomodels/user');
const User = require('../sqlmodels/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const con = require("../database");

const errorMessage500 = "Désolé, nous avons rencontré un problème veuillez réessayer plus tard !";

// CREATE
const signup = async (req, res, next) => {
  const {username, email, password} = req.body;
  // récupérer le hash du password qu'envoie l'utilisateur
  try {
    const hash = await bcrypt.hash(password, 10);
    const mySQLQueryResult = new Promise((acc, rej) => {
      con.query(
        "INSERT INTO users (username, password, email) VALUES (?,?,?)",
        [username, hash, email],
          err => {
              if (err) return rej(false);
              acc(true);
          },
      );
    });
    mySQLQueryResult.then(result => res.status(201).json({message: 'Compte créé !', success: true}))
      .catch(err => {
        console.error("prob with mysql");
        res.status(500).json({ message: errorMessage500 });
      });
  } catch (error) {
    console.error("prob with bcrypt");
    console.error(error);
    res.status(500).json({message:errorMessage500, success: false});
  }
};

// TODO READ 
const login = async (req, res, next) => {
  const {username} = req.body;

  try {
    const compare = await bcrypt.compare(req.body.password, username.password)
    const mySQLQueryFind = new Promise((acc, rej) => {
      con.query(
        "SELECT * FROM users WHERE username = ?;",
        [username, compare],
        err => {
          if (err) return rej(false);
          acc(true);
        },
          res.status(200).json({
            userId: username._id,
            token: jwt.sign(
              { userId: username._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          })
      )
    });
    mySQLQueryFind.then(result => res.status(201).json({message: 'Utilisateur connecté'}))
      .catch(err => {
        console.error("prob with mysql");
        res.status(500).json({ message: errorMessage500 });
      });
  } catch (error) {
    console.error("prob with bcrypt");
    console.error(error);
    res.status(500).json({message:errorMessage500, success: false});
  }
};
     
      


  // if (process.env.USED_DATABASE === "MongoDB") {
  //   MongoUser.findOne({ email: req.body.email })
  //   .then(user => {
  //     if (!user) {
  //       return res.status(401).json({ error: 'Utilisateur non trouvé !' });
  //     }
  //     bcrypt.compare(req.body.password, user.password)
  //       .then(valid => {
  //         if (!valid) {
  //           return res.status(401).json({ error: 'Mot de passe incorrect !' });
  //         }
  //         res.status(200).json({
  //           userId: user._id,
  //           token: jwt.sign(
  //             { userId: user._id },
  //             'RANDOM_TOKEN_SECRET',
  //             { expiresIn: '24h' }
  //           )
  //         });
  //       })
  //       .catch(error => res.status(500).json({ error }));
  //   })
  //   .catch(error => res.status(500).json({ error }));
// DELETE

module.exports = {
  signup,
  login
};