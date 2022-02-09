const MongoUser = require('../mongomodels/user');
const User = require('../sqlmodels/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const con = require("../database");
const user = require('../mongomodels/user');

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
    // 1- récupérer le password envoyé par le user dans la requête
  const username = req.body.username;
  const password = req.body.password;
  try {
    const mySQLQuery2 = new Promise( (accept, reject) => {
      con.query(
        "SELECT password,id FROM users WHERE username = ?",
        [username],
        async (err, result) => {
          if (err) reject(err);
          if (result.length < 1) {
           accept({
             statusCode: 404,
             msg: "Utilisateur non trouvé !",
             success: false
           });
          }
          const userIdFromMySQL = result[0].id;
          const hashFromMySQL = result[0].password;
          // on veut comparer le hash depuis la requête avec celui obtenu depuis la base de données
          try {
            const hashComparison = await bcrypt.compare(password, hashFromMySQL);
            // TODO dans le frontend, feedback à l'utilisateur si mauvais mot de passe
            if (!hashComparison) {
              accept({
                statusCode: 401,
                msg: "Mot de passe incorrect !",
                success: false
              });
            } else {
              accept({
                statusCode: 200,
                msg: {
                  userId: userIdFromMySQL,
                  token: jwt.sign(
                    { userId: userIdFromMySQL },
                    // TODO token secret from env
                    process.env.TOKEN,
                    { expiresIn: '24h' }
                  )
                },
                success: true
              });
            }
          } catch (err) {
            console.error(err);
            reject(err);
          }
        }
      );
    });
    mySQLQuery2.then(result => res.status(result.statusCode).json({message: result.msg, success: result.success}))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: errorMessage500 });
    });
  } catch (error) {
    console.error("prob with bcrypt");
    console.error(error);
    res.status(500).json({message:errorMessage500, success: false});
  } 
  
};
     
// TODO delete user

module.exports = {
  signup,
  login
};