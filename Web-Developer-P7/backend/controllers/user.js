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
    const signUpSQLQueryResult = new Promise((acc, rej) => {
      con.query(
        "INSERT INTO users (username, password, email) VALUES (?,?,?)",
        [username, hash, email],
          err => {
              if (err) return rej(false);
              acc(true);
          },
      );
    });
    signUpSQLQueryResult.then(result => res.status(201).json({message: 'Compte créé !', success: true}))
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

const constructAuthResponse = (authed, userId, username) => {
  let authResponse = {
    statusCode: 401,
    message: "Mot de passe incorrect !",
    success: false
  };
  if(authed) {
    authResponse = {
      statusCode: 200,
      message: {
        userId: userId,
        username: username,
        token: jwt.sign(
          { userId: userId },
          // TODO token secret from env
          process.env.TOKEN,
          { expiresIn: '24h' }
        )
      },
      success: true
    };
  }
  return authResponse;
}

const login = async (req, res, next) => {
    // 1- récupérer le password envoyé par le user dans la requête
  const username = req.body.username;
  const password = req.body.password;
  try {
    const loginMySQLQuery = new Promise( (accept, reject) => {
      con.query(
        "SELECT password,id FROM users WHERE username = ?",
        [username],
        async (err, result) => {
          if (err) reject(err);
          if (result.length < 1) {
           accept({
             statusCode: 404,
             message: "Utilisateur non trouvé !",
             success: false
           });
          }
          const userIdFromMySQL = result[0].id;
          const hashFromMySQL = result[0].password;
          // on veut comparer le hash depuis la requête avec celui obtenu depuis la base de données
          try {
            const hashComparison = await bcrypt.compare(password, hashFromMySQL);
            accept(constructAuthResponse(hashComparison, userIdFromMySQL, username));
          } catch (err) {
            console.error(err);
            reject(err);
          }
        }
      );
    });
    loginMySQLQuery.then(result => {
      res.status(result.statusCode).json({message: result.message, success: result.success});
    })
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

const deleteOne = (req, res, next) => {
  const userId = req.params.id;
  console.log(req.params.id);
  // TODO verify JWT here
  try {
    con.query(
      "DELETE FROM users WHERE username = ?",
      [userId],
    )
  } catch (error) {
    console.log(error)
    res.status(401).json({message:"UNAUTHORIZED", success: false});
  }
  res.status(200).json({message:"ACCOUNT DELETED", success: true});
}
   
const checkAuth = (req, res, response) => {
  // 1- ✅ extraire le token 
  // 2- ✅ verifier le couple token + userId
  // 3- ✅ gestion succès + err  (ne pas oublier de renvoyer la réponse appropriée dans les deux cas)
  const token = req.headers.authorization.split(' ')[1];
  const userId = req.query.userId;
  const decodedToken = jwt.verify(token, process.env.TOKEN);
  constructAuthResponse(decodedToken, userId);
}

module.exports = {
  signup,
  login,
  deleteOne,
  checkAuth
};